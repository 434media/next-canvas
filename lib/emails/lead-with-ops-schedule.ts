/**
 * Shared batch scheduler for the Lead with Ops. Layer in AI. event emails.
 *
 * Both the reminder (save-the-date, ~6 days out) and the KBYG (know-before-you-go,
 * day before) go out the same way: hand every registrant a Resend email with a
 * future `scheduledAt`, so Resend holds and delivers them — no cron, no server
 * needing to be awake at send time. This module is the single implementation;
 * the per-template routes are thin wrappers that call runScheduleBatch().
 *
 * Idempotency:
 *  - Each registration doc is stamped (`reminderScheduled` / `kbygScheduled`)
 *    once scheduled. Re-running skips stamped recipients unless force=true.
 *  - Each Resend send carries a stable idempotency key so even a forced retry
 *    inside Resend's window won't duplicate the send.
 *  - The stored Resend email id can be passed to Resend's cancel endpoint to
 *    unschedule a recipient before the send time.
 */
import { Resend } from "resend"
import { getDigitalCanvasDb } from "@/lib/firebase-admin"
import {
  EVENT_ID,
  EVENT_COLLECTION,
  KBYG_SCHEDULED_AT,
  REMINDER_SCHEDULED_AT,
  sendKbyg,
  sendReminder,
} from "@/lib/emails/lead-with-ops-resend"

export type ScheduleTemplate = "kbyg" | "reminder"

type Stamp = { id: string; scheduledAt: string; scheduledFor: string }

const TEMPLATES = {
  kbyg: {
    label: "KBYG",
    stampField: "kbygScheduled" as const,
    defaultAt: KBYG_SCHEDULED_AT,
    send: sendKbyg,
  },
  reminder: {
    label: "reminder",
    stampField: "reminderScheduled" as const,
    defaultAt: REMINDER_SCHEDULED_AT,
    send: sendReminder,
  },
} as const

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export type ScheduleBatchResult = { status: number; body: Record<string, unknown> }

/**
 * Schedule one template to every registrant. Returns a status + JSON body for
 * the calling route to relay verbatim.
 */
export async function runScheduleBatch(opts: {
  template: ScheduleTemplate
  secret: string | null
  dryRun: boolean
  force: boolean
  at: string | null
}): Promise<ScheduleBatchResult> {
  const cfg = TEMPLATES[opts.template]

  // Auth — same gate as the test-send endpoint, never an open relay.
  if (!opts.secret || opts.secret !== process.env.LEAD_WITH_OPS_TEST_SECRET) {
    return { status: 401, body: { error: "Unauthorized" } }
  }

  // Validate the scheduled time — parseable ISO 8601, in the future.
  const scheduledAt = opts.at || cfg.defaultAt
  const scheduledMs = Date.parse(scheduledAt)
  if (Number.isNaN(scheduledMs)) {
    return {
      status: 400,
      body: { error: `Invalid \`at\` value: "${scheduledAt}". Use ISO 8601, e.g. ${cfg.defaultAt}` },
    }
  }
  if (scheduledMs <= Date.now()) {
    return { status: 400, body: { error: `Scheduled time ${scheduledAt} is in the past. Pick a future time.` } }
  }

  if (!process.env.RESEND_API_KEY) {
    return { status: 503, body: { error: "RESEND_API_KEY is not configured on the server" } }
  }

  // Load every registrant for this event.
  type RegistrationDoc = {
    email?: string
    firstName?: string
    [key: string]: unknown
  }
  let docs: { id: string; data: RegistrationDoc }[]
  try {
    const db = getDigitalCanvasDb()
    const snapshot = await db.collection(EVENT_COLLECTION).where("event", "==", EVENT_ID).get()
    docs = snapshot.docs.map((d) => ({ id: d.id, data: d.data() as RegistrationDoc }))
  } catch (firestoreError) {
    const message = firestoreError instanceof Error ? firestoreError.message : String(firestoreError)
    console.error("Firestore error loading registrants:", message)
    return { status: 503, body: { error: `Could not load registrants: ${message}` } }
  }

  // Partition: skippable (no email / already scheduled) vs. to-schedule.
  const toSchedule: { id: string; email: string; firstName: string }[] = []
  const skipped: { recipient: string; reason: string }[] = []

  for (const { id, data } of docs) {
    const email = data.email?.toLowerCase().trim()
    if (!email) {
      skipped.push({ recipient: `(doc ${id})`, reason: "missing email" })
      continue
    }
    const existing = data[cfg.stampField] as Stamp | undefined
    if (existing && !opts.force) {
      skipped.push({ recipient: email, reason: `already scheduled (${existing.scheduledFor})` })
      continue
    }
    toSchedule.push({ id, email, firstName: data.firstName?.trim() || "Friend" })
  }

  if (opts.dryRun) {
    return {
      status: 200,
      body: {
        dryRun: true,
        template: opts.template,
        event: EVENT_ID,
        scheduledAt,
        totalRegistrants: docs.length,
        wouldSchedule: toSchedule.map((r) => r.email),
        skipped,
      },
    }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const db = getDigitalCanvasDb()

  const results: { recipient: string; status: "scheduled" | "failed"; id?: string; error?: string }[] = []

  for (const { id, email, firstName } of toSchedule) {
    try {
      const { data: sendData, error: sendError } = await cfg.send(resend, { email, firstName, scheduledAt })

      if (sendError || !sendData) {
        throw new Error(sendError ? JSON.stringify(sendError) : "No data returned from Resend")
      }

      // Stamp the doc so re-runs skip it and the Resend id is recoverable for
      // cancellation. Non-fatal if this write fails — the email is scheduled.
      const stamp: Stamp = { id: sendData.id, scheduledAt, scheduledFor: scheduledAt }
      try {
        await db.collection(EVENT_COLLECTION).doc(id).update({ [cfg.stampField]: stamp })
      } catch (writeError) {
        console.error(`Scheduled ${cfg.label} for ${email} but failed to stamp doc ${id}:`, writeError)
      }

      results.push({ recipient: email, status: "scheduled", id: sendData.id })
    } catch (err) {
      console.error(`Failed to schedule ${cfg.label} for ${email}:`, err)
      results.push({ recipient: email, status: "failed", error: String(err) })
    }

    // Gentle throttle to stay under Resend's per-second send rate limit.
    await sleep(120)
  }

  const failed = results.filter((r) => r.status === "failed")
  return {
    status: failed.length > 0 ? 207 : 200,
    body: {
      template: opts.template,
      event: EVENT_ID,
      scheduledAt,
      totalRegistrants: docs.length,
      scheduledCount: results.filter((r) => r.status === "scheduled").length,
      failedCount: failed.length,
      skipped,
      results,
    },
  }
}
