/**
 * Resend send helpers + shared constants for the Lead with Ops. Layer in AI.
 * event (June 18, 2026). This is the single source of truth for:
 *   - the event id / Firestore collection
 *   - the verified sender + subjects
 *   - the KBYG delivery cutoff (`KBYG_SCHEDULED_AT`)
 *   - the actual Resend send calls (KBYG + confirmation)
 *
 * Both the batch scheduler (app/api/lead-with-ops/schedule-kbyg) and the
 * per-registration flow (app/api/lead-with-ops/register) import from here so
 * they always agree on the cutoff time and the idempotency key — which is what
 * prevents a registrant from being double-sent the KBYG email.
 */
import type { Resend } from "resend"
import {
  kbygEmailHtml,
  kbygEmailText,
  confirmationEmailHtml,
  confirmationEmailText,
  reminderEmailHtml,
  reminderEmailText,
  generateLeadWithOpsIcs,
  buildListUnsubscribeHeader,
} from "@/lib/emails/lead-with-ops"

export const EVENT_ID = "LeadWithOpsLayerInAI-2026-06-18"
export const EVENT_NAME = "Lead with Ops. Layer in AI."
export const EVENT_DATE = "2026-06-18"
export const EVENT_COLLECTION = "event-registrations"

// Sender — 434 Media verified Resend domain (send.434media.com).
export const EMAIL_FROM = "Digital Canvas <hello@send.434media.com>"

export const KBYG_SUBJECT = "Tomorrow: What to know before Lead with Ops. Layer in AI."
export const CONFIRMATION_SUBJECT =
  "Registration Confirmed | Lead with Ops. Layer in AI. | June 18"
export const REMINDER_SUBJECT = "Save the date: Lead with Ops. Layer in AI. is June 18"

/**
 * KBYG delivery cutoff — June 17, 2026 9:00 AM CDT (UTC-5) = 14:00 UTC, the day
 * before the event. The batch scheduler hands every existing registrant a KBYG
 * email scheduled for this instant. It is also the pivot for the registration
 * flow:
 *   - register BEFORE this time → confirmation now + KBYG scheduled for this time
 *   - register AT/AFTER this time → KBYG sent immediately, confirmation skipped
 */
export const KBYG_SCHEDULED_AT = "2026-06-17T14:00:00Z"

/**
 * Save-the-date reminder delivery time — Friday June 12, 2026 12:00 PM CDT
 * (UTC-5) = 17:00 UTC, roughly six days before the event. Like the KBYG cutoff,
 * this is the pivot for the registration flow: registrations before this time
 * are folded into the reminder batch; registrations after it skip the reminder
 * (it would already have gone out).
 */
export const REMINDER_SCHEDULED_AT = "2026-06-12T17:00:00Z"

// Campus map PDF, fetched by Resend from Firebase Storage at send time and
// attached to every KBYG email.
export const CAMPUS_MAP_URL =
  "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2FVTX-Campus-Map-2025.pdf?alt=media"
export const CAMPUS_MAP_FILENAME = "VelocityTX-Campus-Map.pdf"

/**
 * Stable per-recipient idempotency key for the KBYG send. Reused by both the
 * batch scheduler and the registration flow so that even if both attempt a send
 * for the same person, Resend collapses them into one email (within its
 * idempotency window) instead of delivering twice.
 */
export function kbygIdempotencyKey(email: string): string {
  return `kbyg-${EVENT_ID}-${email}`
}

/** Stable per-recipient idempotency key for the reminder send. */
export function reminderIdempotencyKey(email: string): string {
  return `reminder-${EVENT_ID}-${email}`
}

/**
 * Send (or schedule) the KBYG email to one recipient.
 * Pass `scheduledAt` (ISO 8601) to schedule for later; omit it to send now.
 * Returns Resend's `{ data, error }` result — callers decide how to handle it.
 */
export function sendKbyg(
  resend: Resend,
  opts: { email: string; firstName: string; scheduledAt?: string },
) {
  return resend.emails.send(
    {
      from: EMAIL_FROM,
      to: opts.email,
      subject: KBYG_SUBJECT,
      html: kbygEmailHtml({ firstName: opts.firstName, email: opts.email }),
      text: kbygEmailText({ firstName: opts.firstName, email: opts.email }),
      attachments: [{ filename: CAMPUS_MAP_FILENAME, path: CAMPUS_MAP_URL }],
      headers: { "List-Unsubscribe": buildListUnsubscribeHeader(opts.email) },
      ...(opts.scheduledAt ? { scheduledAt: opts.scheduledAt } : {}),
    },
    { idempotencyKey: kbygIdempotencyKey(opts.email) },
  )
}

/**
 * Send (or schedule) the save-the-date reminder to one recipient.
 * Pass `scheduledAt` (ISO 8601) to schedule for later; omit it to send now.
 * No attachment — the reminder re-shares the calendar deep links in its body.
 */
export function sendReminder(
  resend: Resend,
  opts: { email: string; firstName: string; scheduledAt?: string },
) {
  return resend.emails.send(
    {
      from: EMAIL_FROM,
      to: opts.email,
      subject: REMINDER_SUBJECT,
      html: reminderEmailHtml({ firstName: opts.firstName, email: opts.email }),
      text: reminderEmailText({ firstName: opts.firstName, email: opts.email }),
      headers: { "List-Unsubscribe": buildListUnsubscribeHeader(opts.email) },
      ...(opts.scheduledAt ? { scheduledAt: opts.scheduledAt } : {}),
    },
    { idempotencyKey: reminderIdempotencyKey(opts.email) },
  )
}

/**
 * Send the registration-confirmation email (with .ics calendar attachment).
 */
export function sendConfirmation(
  resend: Resend,
  opts: { email: string; firstName: string; fullName: string },
) {
  return resend.emails.send({
    from: EMAIL_FROM,
    to: opts.email,
    subject: CONFIRMATION_SUBJECT,
    html: confirmationEmailHtml({
      firstName: opts.firstName,
      fullName: opts.fullName,
      email: opts.email,
    }),
    text: confirmationEmailText({
      firstName: opts.firstName,
      fullName: opts.fullName,
      email: opts.email,
    }),
    attachments: [
      {
        filename: "lead-with-ops.ics",
        content: Buffer.from(generateLeadWithOpsIcs()).toString("base64"),
      },
    ],
    headers: { "List-Unsubscribe": buildListUnsubscribeHeader(opts.email) },
  })
}
