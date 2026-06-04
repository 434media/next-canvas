import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  confirmationEmailHtml,
  kbygEmailHtml,
  confirmationEmailText,
  kbygEmailText,
  generateLeadWithOpsIcs,
  buildListUnsubscribeHeader,
} from "@/lib/emails/lead-with-ops"

// Campus map lives in Firebase Storage alongside the flyer and dark logo.
// Resend's attachments[].path fetches the file at send time, base64-encodes
// it, and attaches it to the email — no fs / no public/ folder needed.
const CAMPUS_MAP_URL =
  "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2FVTX-Campus-Map-2025.pdf?alt=media"
const CAMPUS_MAP_FILENAME = "VelocityTX-Campus-Map.pdf"

/**
 * Test send endpoint — fires either of the two transactional Lead with Ops
 * email templates to the team for preview. The promotional INVITE is owned
 * by the 434 Media admin app and is not testable from here.
 *
 * Usage:
 *   POST /api/lead-with-ops/send-test?template=confirmation&secret=...
 *   POST /api/lead-with-ops/send-test?template=kbyg&secret=...
 *
 * Optional recipient override — sends only to a single address instead of
 * the default test list (marcos + jesse):
 *   POST /api/lead-with-ops/send-test?template=confirmation&to=jesse@434media.com&secret=...
 *
 * Secret check uses the LEAD_WITH_OPS_TEST_SECRET env var. Returns 401 if
 * the secret is missing or wrong. This prevents the endpoint from being
 * abused as an open relay.
 */

// Sender — uses the 434 Media verified Resend domain (send.434media.com).
const EMAIL_FROM = "Digital Canvas <hello@send.434media.com>"

const TEST_RECIPIENTS = [
  { email: "marcos@434media.com", firstName: "Marcos", lastName: "Resendez" },
  { email: "jesse@434media.com", firstName: "Jesse", lastName: "Hernandez" },
]

type TemplateKey = "confirmation" | "kbyg"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const template = searchParams.get("template") as TemplateKey | null
  const toOverride = searchParams.get("to")

  // Auth check — always required, even in dev, so the route never accidentally
  // becomes an open relay during local testing.
  if (!secret || secret !== process.env.LEAD_WITH_OPS_TEST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!template || !["confirmation", "kbyg"].includes(template)) {
    return NextResponse.json(
      { error: "Missing or invalid `template` query param. Use: confirmation | kbyg. (Invite broadcasts are sent from the 434 Media admin app.)" },
      { status: 400 },
    )
  }

  // Instantiate Resend inside the handler so a missing API key returns a
  // clean 503 instead of crashing module load.
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured on the server" },
      { status: 503 },
    )
  }
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Recipient list — if ?to= is provided, match against the known test list
  // (or fall back to a generic preview entry). Otherwise send to all test recipients.
  let recipients = TEST_RECIPIENTS
  if (toOverride) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(toOverride)) {
      return NextResponse.json(
        { error: "Invalid `to` email format" },
        { status: 400 },
      )
    }
    const matched = TEST_RECIPIENTS.find((r) => r.email.toLowerCase() === toOverride.toLowerCase())
    recipients = matched ? [matched] : [{
      email: toOverride,
      firstName: "Friend",
      lastName: "Preview",
    }]
  }

  // Per-template attachments:
  //  - confirmation → inline .ics file so the recipient can add the event
  //    to any calendar app (Apple Mail / Outlook recognize attachments;
  //    Google + Outlook web also have deep links in the email body).
  //  - kbyg → campus map PDF, fetched by Resend from Firebase Storage.
  type Attachment = { filename: string; path?: string; content?: string }
  let attachments: Attachment[] | undefined
  if (template === "kbyg") {
    attachments = [{ filename: CAMPUS_MAP_FILENAME, path: CAMPUS_MAP_URL }]
  } else {
    attachments = [
      {
        filename: "lead-with-ops.ics",
        content: Buffer.from(generateLeadWithOpsIcs()).toString("base64"),
      },
    ]
  }

  // Build subject + HTML + plain-text per template. Each recipient gets a
  // personalized greeting so the test send mirrors what a real attendee
  // would receive. List-Unsubscribe is per-recipient (URL keyed by email).
  const results: { recipient: string; status: "sent" | "failed"; error?: string }[] = []

  for (const recipient of recipients) {
    const fullName = `${recipient.firstName} ${recipient.lastName}`
    let subject = ""
    let html = ""
    let text = ""
    if (template === "confirmation") {
      subject = "Registration Confirmed | Lead with Ops. Layer in AI. | June 18"
      html = confirmationEmailHtml({ firstName: recipient.firstName, fullName, email: recipient.email })
      text = confirmationEmailText({ firstName: recipient.firstName, fullName, email: recipient.email })
    } else {
      subject = "Tomorrow: What to know before Lead with Ops. Layer in AI."
      html = kbygEmailHtml({ firstName: recipient.firstName, email: recipient.email })
      text = kbygEmailText({ firstName: recipient.firstName, email: recipient.email })
    }

    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: recipient.email,
        subject,
        html,
        text,
        attachments,
        headers: {
          "List-Unsubscribe": buildListUnsubscribeHeader(recipient.email),
        },
      })
      results.push({ recipient: recipient.email, status: "sent" })
    } catch (sendError) {
      console.error(`Failed to send ${template} to ${recipient.email}:`, sendError)
      results.push({
        recipient: recipient.email,
        status: "failed",
        error: String(sendError),
      })
    }
  }

  const anyFailed = results.some((r) => r.status === "failed")
  return NextResponse.json(
    {
      template,
      results,
    },
    { status: anyFailed ? 207 : 200 },
  )
}
