import { NextResponse } from "next/server"
import { Resend } from "resend"
import {
  inviteEmailHtml,
  confirmationEmailHtml,
  kbygEmailHtml,
} from "@/lib/emails/lead-with-ops"

/**
 * Test send endpoint — fires any of the three Lead with Ops email templates
 * to the team for preview before broadcasting to a real list.
 *
 * Usage:
 *   POST /api/lead-with-ops/send-test?template=invite&secret=...
 *   POST /api/lead-with-ops/send-test?template=confirmation&secret=...
 *   POST /api/lead-with-ops/send-test?template=kbyg&secret=...
 *
 * Optional recipient override — sends only to a single address instead of
 * the default test list (marcos + jesse):
 *   POST /api/lead-with-ops/send-test?template=invite&to=jesse@434media.com&secret=...
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

type TemplateKey = "invite" | "confirmation" | "kbyg"

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

  if (!template || !["invite", "confirmation", "kbyg"].includes(template)) {
    return NextResponse.json(
      { error: "Missing or invalid `template` query param. Use: invite | confirmation | kbyg" },
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

  // Site URL — used in the invite template so the RSVP link points at
  // the live registration page (or local dev origin for testing).
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
  const registrationUrl = `${siteUrl}/workshops/lead-with-ops`

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

  // Build subject + HTML per template. Each recipient gets a personalized
  // greeting so the test send mirrors what a real attendee would receive.
  const results: { recipient: string; status: "sent" | "failed"; error?: string }[] = []

  for (const recipient of recipients) {
    let subject = ""
    let html = ""
    if (template === "invite") {
      subject = "Limited Seating: Lead with Ops. Layer in AI. featuring Adam Carroll | June 18"
      html = inviteEmailHtml({
        firstName: recipient.firstName,
        registrationUrl,
      })
    } else if (template === "confirmation") {
      subject = "Registration Confirmed | Lead with Ops. Layer in AI. | June 18"
      html = confirmationEmailHtml({
        firstName: recipient.firstName,
        fullName: `${recipient.firstName} ${recipient.lastName}`,
      })
    } else {
      subject = "Tomorrow: What to know before Lead with Ops. Layer in AI."
      html = kbygEmailHtml({ firstName: recipient.firstName })
    }

    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: recipient.email,
        subject,
        html,
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
      registrationUrl,
      results,
    },
    { status: anyFailed ? 207 : 200 },
  )
}
