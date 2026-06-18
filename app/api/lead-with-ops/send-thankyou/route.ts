import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getDigitalCanvasDb } from "@/lib/firebase-admin"
import {
  EVENT_ID,
  EVENT_COLLECTION,
  sendThankYou,
} from "@/lib/emails/lead-with-ops-resend"

/**
 * Send the post-event thank-you email to registrants, personalized with each
 * recipient's first name from their registration record (unlike the test-send
 * endpoint, which addresses unknown recipients as "Friend").
 *
 * Sends immediately (no scheduling). The email carries a stable idempotency key
 * and each registrant doc is stamped `thankYouSent`, so re-running skips anyone
 * already thanked unless force=true.
 *
 * Usage:
 *   POST /api/lead-with-ops/send-thankyou?secret=...&emails=a@x.com,b@y.com
 *   POST /api/lead-with-ops/send-thankyou?secret=...&all=true
 *   POST /api/lead-with-ops/send-thankyou?secret=...&emails=...&dryRun=true
 *   POST /api/lead-with-ops/send-thankyou?secret=...&emails=...&force=true
 *
 * Provide exactly one target selector: `emails` (comma-separated) or `all=true`.
 * Auth reuses LEAD_WITH_OPS_TEST_SECRET.
 */

type RegistrationDoc = {
  email?: string
  firstName?: string
  thankYouSent?: { id: string; sentAt: string }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const dryRun = searchParams.get("dryRun") === "true"
  const force = searchParams.get("force") === "true"
  const all = searchParams.get("all") === "true"
  const emailsParam = searchParams.get("emails")

  if (!secret || secret !== process.env.LEAD_WITH_OPS_TEST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Exactly one selector.
  const requestedEmails = (emailsParam || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
  if (all === (requestedEmails.length > 0)) {
    return NextResponse.json(
      { error: "Provide exactly one selector: `emails` (comma-separated) OR `all=true`." },
      { status: 400 },
    )
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured on the server" },
      { status: 503 },
    )
  }

  // Load registrants for this event.
  let docs: { id: string; data: RegistrationDoc }[]
  try {
    const db = getDigitalCanvasDb()
    const snapshot = await db.collection(EVENT_COLLECTION).where("event", "==", EVENT_ID).get()
    docs = snapshot.docs.map((d) => ({ id: d.id, data: d.data() as RegistrationDoc }))
  } catch (firestoreError) {
    const message = firestoreError instanceof Error ? firestoreError.message : String(firestoreError)
    console.error("Firestore error loading registrants:", message)
    return NextResponse.json({ error: `Could not load registrants: ${message}` }, { status: 503 })
  }

  const byEmail = new Map(docs.filter((d) => d.data.email).map((d) => [d.data.email!.toLowerCase().trim(), d]))

  // Resolve the target set.
  const toSend: { id: string; email: string; firstName: string }[] = []
  const skipped: { recipient: string; reason: string }[] = []
  const notFound: string[] = []

  const targets = all ? [...byEmail.keys()] : requestedEmails
  for (const email of targets) {
    const doc = byEmail.get(email)
    if (!doc) {
      notFound.push(email)
      continue
    }
    if (doc.data.thankYouSent && !force) {
      skipped.push({ recipient: email, reason: `already thanked (${doc.data.thankYouSent.sentAt})` })
      continue
    }
    toSend.push({ id: doc.id, email, firstName: doc.data.firstName?.trim() || "there" })
  }

  if (dryRun) {
    return NextResponse.json({
      dryRun: true,
      event: EVENT_ID,
      wouldSend: toSend.map((r) => ({ email: r.email, firstName: r.firstName })),
      skipped,
      notFound,
    })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const db = getDigitalCanvasDb()

  const results: { recipient: string; status: "sent" | "failed"; id?: string; error?: string }[] = []

  for (const { id, email, firstName } of toSend) {
    try {
      const { data, error } = await sendThankYou(resend, { email, firstName })
      if (error || !data) {
        throw new Error(error ? JSON.stringify(error) : "No data returned from Resend")
      }

      try {
        await db.collection(EVENT_COLLECTION).doc(id).update({
          thankYouSent: { id: data.id, sentAt: new Date().toISOString() },
        })
      } catch (writeError) {
        console.error(`Sent thank-you to ${email} but failed to stamp doc ${id}:`, writeError)
      }

      results.push({ recipient: email, status: "sent", id: data.id })
    } catch (err) {
      console.error(`Failed to send thank-you to ${email}:`, err)
      results.push({ recipient: email, status: "failed", error: String(err) })
    }

    await sleep(120)
  }

  const failed = results.filter((r) => r.status === "failed")
  return NextResponse.json(
    {
      event: EVENT_ID,
      sentCount: results.filter((r) => r.status === "sent").length,
      failedCount: failed.length,
      skipped,
      notFound,
      results,
    },
    { status: failed.length > 0 ? 207 : 200 },
  )
}
