/**
 * Email templates + helpers for the Lead with Ops. Layer in AI. event (June 18, 2026).
 *
 * Scope: this file is now TRANSACTIONAL ONLY. The promotional broadcast
 * INVITE lives in the 434 Media admin app (with per-recipient signed
 * unsubscribe tracking). Only the two emails that fire from the registration
 * flow on THIS app live here:
 *
 * HTML templates (pass to Resend as `html`):
 *  - confirmationEmailHtml   — fires automatically on successful registration
 *  - kbygEmailHtml           — know before you go (sent ~24h before the event)
 *
 * Plain-text alternatives (pass to Resend as `text` alongside `html`):
 *  - confirmationEmailText / kbygEmailText
 *  Including a text/plain alternative is a meaningful deliverability signal —
 *  HTML-only sends are weighted toward spam by major filters.
 *
 * Calendar additions (used in the confirmation email + Resend attachments):
 *  - generateLeadWithOpsIcs()  — returns a CRLF-encoded VCALENDAR string
 *  - googleCalendarUrl()       — Google Calendar deep link
 *  - outlookCalendarUrl()      — Outlook Calendar deep link
 *
 * Unsubscribe + List-Unsubscribe header helpers:
 *  - buildUnsubscribeUrl(email)         — per-recipient unsubscribe URL
 *  - buildListUnsubscribeHeader(email)  — RFC 2369 header value (URL + mailto)
 *  Both target the same admin-app endpoint as the broadcast invite, so a
 *  recipient who unsubscribes from a transactional email lands in the same
 *  tracking system. Override the base via env var LEAD_WITH_OPS_UNSUBSCRIBE_URL.
 *
 * Color system — Carroll Strategy & Operations palette (Adam's request).
 * Digital Canvas accents (green / magenta) have been retired from this email
 * surface; the DC logo image stays at the top, but every other color slot uses
 * the Carroll system below.
 *
 * Other design rules unchanged:
 *  - Light theme: white background, dark text, subtle gray dividers.
 *  - GeistPixel-Square loaded via @font-face with monospace fallbacks.
 *  - No gradient bars.
 */

interface ConfirmationOpts {
  firstName: string
  fullName: string
  /** Used to generate the per-recipient unsubscribe URL. */
  email: string
}

interface KbygOpts {
  firstName: string
  /** Used to generate the per-recipient unsubscribe URL. */
  email: string
}

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digital-canvas-dark.svg?alt=media"
const FONT_URL =
  "https://www.digitalcanvas.community/fonts/GeistPixel-Square.ttf"

const PIXEL_STACK = "'GeistPixelSquare', 'Courier New', monospace"
const SANS_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

/* ----------------------------------------------------------------------
 * Event metadata — single source of truth for the ICS file, calendar
 * deep links, and any other "where/when is this event" lookups.
 * Times are in UTC; 11:30 AM CDT (UTC-5) = 16:30 UTC.
 * -------------------------------------------------------------------- */
const EVENT_META = {
  title: "Lead with Ops. Layer in AI. — Executive Working Lunch",
  description:
    "Executive working lunch with Adam Carroll, Founder of Carroll Strategy & Operations. Hosted by Digital Canvas + 434 Media. Practical discussion on the intersection of operations, technology, and execution.",
  location: "VelocityTX CRC, 1305 E. Houston St., San Antonio, TX 78205",
  // Compact ISO8601 (basic format) — ICS spec.
  startUtc: "20260618T163000Z",
  endUtc: "20260618T180000Z",
  // Extended ISO8601 — what Outlook/Google query strings expect.
  startIso: "2026-06-18T16:30:00Z",
  endIso: "2026-06-18T18:00:00Z",
  uid: "lead-with-ops-2026-06-18@digitalcanvas.community",
  url: "https://www.digitalcanvas.community/workshops/lead-with-ops",
}

/* ----------------------------------------------------------------------
 * Unsubscribe URL + RFC 2369 List-Unsubscribe header builders.
 *
 * The 434 Media admin app is the single source of truth for unsubscribe
 * tracking (the broadcast invite already uses it via per-recipient signed
 * URLs). Transactional sends from this app point at the same endpoint with
 * an unsigned, email-keyed URL — when a recipient clicks, they're recorded
 * in the same opt-out list, so a single unsubscribe action covers both
 * marketing and transactional mail.
 *
 * Override the base URL via env var LEAD_WITH_OPS_UNSUBSCRIBE_URL when the
 * admin-app endpoint moves; defaults to https://434media.com/unsubscribe.
 * -------------------------------------------------------------------- */

const UNSUBSCRIBE_BASE =
  process.env.LEAD_WITH_OPS_UNSUBSCRIBE_URL || "https://434media.com/unsubscribe"

export function buildUnsubscribeUrl(email: string): string {
  const params = new URLSearchParams({
    email,
    source: "lead-with-ops",
  })
  return `${UNSUBSCRIBE_BASE}?${params.toString()}`
}

/**
 * List-Unsubscribe header value combining the per-recipient URL with a
 * mailto fallback. Spread into the `headers` field of resend.emails.send().
 * Most modern providers prefer the URL form; the mailto provides resilience
 * for clients that only honor mailto.
 */
export function buildListUnsubscribeHeader(email: string): string {
  return `<${buildUnsubscribeUrl(email)}>, <mailto:VIP@434MEDIA.COM?subject=Unsubscribe%20-%20Lead%20with%20Ops>`
}

/* ----------------------------------------------------------------------
 * ICS calendar file — attached to the confirmation email so any client
 * with calendar support (Gmail, Apple Mail, Outlook, etc.) surfaces an
 * "Add to calendar" affordance natively.
 * -------------------------------------------------------------------- */

export function generateLeadWithOpsIcs(): string {
  const dtstamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")

  // ICS REQUIRES CRLF line endings between fields. Some clients accept LF,
  // but Microsoft Outlook desktop in particular will reject mixed encodings.
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Digital Canvas//Lead with Ops//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${EVENT_META.uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${EVENT_META.startUtc}`,
    `DTEND:${EVENT_META.endUtc}`,
    `SUMMARY:${escapeIcs(EVENT_META.title)}`,
    `DESCRIPTION:${escapeIcs(EVENT_META.description)}`,
    `LOCATION:${escapeIcs(EVENT_META.location)}`,
    "ORGANIZER;CN=Digital Canvas:mailto:VIP@434MEDIA.COM",
    `URL:${EVENT_META.url}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
  return lines.join("\r\n")
}

/* Calendar service deep links — used in the confirmation email body. */

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_META.title,
    dates: `${EVENT_META.startUtc}/${EVENT_META.endUtc}`,
    details: EVENT_META.description,
    location: EVENT_META.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function outlookCalendarUrl(): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: EVENT_META.title,
    body: EVENT_META.description,
    startdt: EVENT_META.startIso,
    enddt: EVENT_META.endIso,
    location: EVENT_META.location,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

/* Escape values for ICS TEXT fields (commas, semicolons, backslashes, newlines). */
function escapeIcs(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n")
}

/* ----------------------------------------------------------------------
 * Carroll Strategy & Operations color system.
 * -------------------------------------------------------------------- */
const C = {
  /** Clarity White — primary background. */
  white: "#FFFFFF",
  /** Carroll Black — logo text on light fields, legal text. */
  black: "#000000",
  /** Executive Navy — primary text + headlines on light fields. */
  navy: "#041C32",
  /** Professional Gray — secondary text, captions, table labels. */
  gray: "#6F7883",
  /** Derived light gray — borders and dividers (paired with off-white). */
  border: "#E1E4EA",
  /** Off-White — subtle background separation, alternating rows. */
  offWhite: "#F4F6F9",
  /** Carroll Emerald — positive accent: growth, success, bullet borders. */
  emerald: "#1AAD9B",
  /** Carroll Mint — secondary accent (currently unused; reserved). */
  mint: "#0CBB83",
  /** Carroll Coral — sparingly: CTAs, urgency eyebrows, strong warnings. */
  coral: "#FF5757",
}

/* ----------------------------------------------------------------------
 * Shared shell — light theme. Logo, thin dividers, footer with Carroll colors.
 * -------------------------------------------------------------------- */

function shell(opts: {
  title: string
  previewText: string
  body: string
  /** Per-recipient unsubscribe URL — rendered as a visible footer line. */
  unsubscribeUrl: string
}): string {
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${opts.title}</title>
  <style>
    @font-face {
      font-family: 'GeistPixelSquare';
      src: url('${FONT_URL}') format('truetype');
      font-weight: 400 800;
      font-style: normal;
      font-display: swap;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${C.white}; font-family: ${SANS_STACK}; color: ${C.navy};">
  <span style="display: none; max-height: 0; overflow: hidden; opacity: 0; visibility: hidden; color: transparent;">${opts.previewText}</span>
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: ${C.white};">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">

          <!-- Logo (Digital Canvas dark variant from Firebase Storage) -->
          <tr>
            <td style="padding: 8px 32px 24px 32px;">
              <img src="${LOGO_URL}" alt="Digital Canvas" width="200" height="62" style="display: block; max-width: 200px; height: auto; border: 0;" />
            </td>
          </tr>

          <!-- Thin divider above body -->
          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background-color: ${C.border};"></div>
            </td>
          </tr>

          ${opts.body}

          <!-- Footer -->
          <tr>
            <td style="padding: 32px;">
              <div style="height: 1px; background-color: ${C.border}; margin-bottom: 24px;"></div>
              <p style="margin: 0 0 8px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
                Presented by Digital Canvas · 434 Media
              </p>
              <p style="margin: 0; font-size: 12px; color: ${C.gray};">
                Questions? <a href="mailto:VIP@434MEDIA.COM" style="color: ${C.emerald}; text-decoration: none; font-weight: 600;">VIP@434MEDIA.COM</a>
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: ${C.gray};">
                &copy; ${year} Digital Canvas · 434 Media. All rights reserved.
              </p>
              <p style="margin: 12px 0 0 0; font-size: 11px; color: ${C.gray};">
                You're receiving this because you opted in to the 434 Media network.
                <a href="${opts.unsubscribeUrl}" style="color: ${C.gray}; text-decoration: underline;">Unsubscribe</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ----------------------------------------------------------------------
 * Event-details block — light theme. Reused across all three templates.
 * Location updated to "VelocityTX CRC, 1305 E. Houston St."
 * -------------------------------------------------------------------- */

const EVENT_DETAILS_BLOCK = `
<table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid ${C.border}; background-color: ${C.white};">
  <tr>
    <td style="padding: 20px 24px;">
      <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
        Event Details
      </p>
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid ${C.border};">
            <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Date</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid ${C.border}; text-align: right;">
            <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">June 18, 2026</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid ${C.border};">
            <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Time</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid ${C.border}; text-align: right;">
            <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">11:30 AM &ndash; 1:00 PM</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">
            <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Location</span>
          </td>
          <td style="padding: 8px 0; text-align: right;">
            <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">VelocityTX CRC</span>
            <br /><span style="font-size: 12px; color: ${C.gray};">1305 E. Houston St.</span>
            <br /><span style="font-size: 12px; color: ${C.gray};">Lunch provided</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim()

/* ----------------------------------------------------------------------
 * Template 1 — Registration confirmation
 * (Promotional invite is owned by the 434 Media admin app — see file header.)
 * -------------------------------------------------------------------- */

export function confirmationEmailHtml(opts: ConfirmationOpts): string {
  const body = `
<!-- Eyebrow + title -->
<tr>
  <td style="padding: 32px 32px 0 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${C.emerald}; font-weight: 700;">
      Registration Confirmed
    </p>
    <h1 style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 32px; font-weight: 800; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.5px; color: ${C.navy};">
      Lead with Ops.<br />
      <span style="color: ${C.gray};">Layer in AI.</span>
    </h1>
  </td>
</tr>

<!-- Greeting + lede -->
<tr>
  <td style="padding: 28px 32px 0 32px;">
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.navy};">
      Hi ${escapeHtml(opts.firstName)},
    </p>
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.gray};">
      Thank you for registering for <strong style="color: ${C.navy};">Lead with Ops. Layer in AI.</strong> featuring <strong style="color: ${C.navy};">Adam Carroll, Founder of Carroll Strategy &amp; Operations</strong>.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: ${C.emerald}; font-weight: 700;">
      Your seat has been reserved.
    </p>
  </td>
</tr>

<!-- Registered name card -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid ${C.border};">
      <tr>
        <td style="padding: 18px 24px; border-left: 3px solid ${C.emerald};">
          <p style="margin: 0 0 4px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
            Registered
          </p>
          <p style="margin: 0; font-size: 16px; color: ${C.navy}; font-weight: 600;">
            ${escapeHtml(opts.fullName)}
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Event details -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    ${EVENT_DETAILS_BLOCK}
  </td>
</tr>

<!-- Add to calendar — Google + Outlook deep links + reference to attached .ics -->
<tr>
  <td style="padding: 0 32px 28px 32px;">
    <p style="margin: 0 0 12px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
      Add to calendar
    </p>
    <table role="presentation" style="border-collapse: collapse;">
      <tr>
        <td style="padding-right: 8px;">
          <a href="${googleCalendarUrl()}" target="_blank" style="display: inline-block; padding: 10px 18px; border: 1px solid ${C.border}; color: ${C.navy}; text-decoration: none; font-family: ${PIXEL_STACK}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
            Google
          </a>
        </td>
        <td style="padding-right: 8px;">
          <a href="${outlookCalendarUrl()}" target="_blank" style="display: inline-block; padding: 10px 18px; border: 1px solid ${C.border}; color: ${C.navy}; text-decoration: none; font-family: ${PIXEL_STACK}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
            Outlook
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 12px 0 0 0; font-size: 12px; color: ${C.gray}; line-height: 1.6;">
      Apple Calendar and other apps: open the <strong style="color: ${C.navy};">.ics attachment</strong>.
    </p>
  </td>
</tr>

<!-- Audience + agenda preview -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 1.7; color: ${C.gray};">
      This session is designed for CEOs, Presidents, Operators, Founders, and business leaders seeking clarity on how AI can support business strategy, operational execution, and measurable outcomes.
    </p>
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
      We&rsquo;ll explore
    </p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid ${C.emerald};">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${C.navy};">How AI supports business strategy</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid ${C.emerald};">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${C.navy};">Where AI can create measurable ROI</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid ${C.emerald};">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${C.navy};">How to implement AI across the enterprise</p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Plan-change note -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.7; color: ${C.gray};">
      Space is intentionally limited to encourage discussion and interaction among attendees.
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.7; color: ${C.gray};">
      If your plans change, please let us know so we can offer your seat to another participant &mdash; reply to this email or write to <a href="mailto:VIP@434MEDIA.COM" style="color: ${C.emerald}; text-decoration: none; font-weight: 600;">VIP@434MEDIA.COM</a>.
    </p>
    <p style="margin: 0; font-size: 15px; color: ${C.navy}; font-weight: 600;">
      We look forward to seeing you on June 18.
    </p>
  </td>
</tr>
`.trim()

  return shell({
    title: "Registration Confirmed | Lead with Ops. Layer in AI. | June 18",
    previewText: "Your registration is confirmed. Executive seating is limited and lunch will be provided at VelocityTX CRC on June 18.",
    body,
    unsubscribeUrl: buildUnsubscribeUrl(opts.email),
  })
}

/* ----------------------------------------------------------------------
 * Template 3 — Know before you go.
 * The send-test endpoint attaches the VelocityTX campus map PDF when
 * this template is fired.
 * -------------------------------------------------------------------- */

export function kbygEmailHtml(opts: KbygOpts): string {
  const body = `
<!-- Venue-change alert banner -->
<tr>
  <td style="padding: 32px 32px 0 32px;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 16px 20px; background-color: ${C.coral}; border-left: 4px solid ${C.navy};">
          <p style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: ${C.white}; font-weight: 800; line-height: 1.3;">
            Please Note: Change in Meeting Room
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Eyebrow + title -->
<tr>
  <td style="padding: 24px 32px 0 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${C.coral}; font-weight: 700;">
      Tomorrow · Know Before You Go
    </p>
    <h1 style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 32px; font-weight: 800; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.5px; color: ${C.navy};">
      Lead with Ops.<br />
      <span style="color: ${C.gray};">Layer in AI.</span>
    </h1>
  </td>
</tr>

<!-- Greeting -->
<tr>
  <td style="padding: 28px 32px 0 32px;">
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.navy};">
      Hi ${escapeHtml(opts.firstName)},
    </p>
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.gray};">
      Looking forward to seeing you tomorrow for the executive working lunch with <strong style="color: ${C.navy};">Adam Carroll</strong>. Here&rsquo;s everything you need to know before you arrive.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.7; color: ${C.gray};">
      <strong style="color: ${C.navy};">The meeting room has changed.</strong> We&rsquo;re now in the <strong style="color: ${C.navy};">Merchants Ice Building (Building 1), Floor 4 Conference Room</strong> at 1305 E. Houston. Please park in <strong style="color: ${C.navy};">Lot B</strong> and reference the attached map for guidance.
    </p>
  </td>
</tr>

<!-- Logistics -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid ${C.border};">
      <tr>
        <td style="padding: 20px 24px;">
          <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
            Logistics
          </p>
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Date</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border}; text-align: right;">
                <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">Thursday, June 18, 2026</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Doors Open</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border}; text-align: right;">
                <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">11:15 AM</span>
                <br /><span style="font-size: 12px; color: ${C.gray};">Arrive early for networking.</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Program</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border}; text-align: right;">
                <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">11:30 AM &ndash; 1:00 PM</span>
                <br /><span style="font-size: 12px; color: ${C.gray};">Lunch served at start.</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Venue</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border}; text-align: right;">
                <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">Merchants Ice Building</span>
                <br /><span style="font-size: 12px; color: ${C.gray};">Building 1 &middot; Floor 4 Conf. Room</span>
                <br /><span style="font-size: 12px; color: ${C.gray};">1305 E. Houston</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Parking</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid ${C.border}; text-align: right;">
                <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;">Park in Lot B</span>
                <br /><span style="font-size: 12px; color: ${C.gray};">See the attached map.</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: ${C.gray}; text-transform: uppercase;">Access</span>
              </td>
              <td style="padding: 10px 0; text-align: right;">
                <span style="font-size: 14px; color: ${C.navy}; font-weight: 600;"><a href="tel:+12108314439" style="color: ${C.navy}; text-decoration: none;">210-831-4439</a></span>
                <br /><span style="font-size: 12px; color: ${C.gray};">Call for any access issues.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Agenda -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
      Agenda
    </p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: ${C.emerald}; font-weight: 700;">11:30</span>
          <span style="font-size: 14px; color: ${C.navy}; margin-left: 12px;">Working lunch served</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: ${C.emerald}; font-weight: 700;">11:45</span>
          <span style="font-size: 14px; color: ${C.navy}; margin-left: 12px;">Conversation opens with Adam Carroll</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid ${C.border};">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: ${C.emerald}; font-weight: 700;">12:30</span>
          <span style="font-size: 14px; color: ${C.navy}; margin-left: 12px;">Group discussion + peer Q&amp;A</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: ${C.emerald}; font-weight: 700;">1:00</span>
          <span style="font-size: 14px; color: ${C.navy}; margin-left: 12px;">Wrap and close</span>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- What to bring -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.emerald}; font-weight: 700;">
      What to bring
    </p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid ${C.emerald};">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${C.navy};">An operational question you want to answer</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid ${C.emerald};">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${C.navy};">A current AI decision you&rsquo;re navigating</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid ${C.emerald};">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${C.navy};">Business cards (optional)</p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Format note + closing -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 18px 0; font-size: 14px; line-height: 1.7; color: ${C.gray};">
      This is an off-the-record, peer-level conversation. No product demos, no pitch decks. Come ready to engage and exchange perspective with other operators.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.7; color: ${C.gray};">
      If your plans change, please reply to this email so we can offer the seat to another attendee.
    </p>
    <p style="margin: 0; font-size: 15px; color: ${C.navy}; font-weight: 600;">
      See you tomorrow.
    </p>
  </td>
</tr>
`.trim()

  return shell({
    title: "Tomorrow: What to know before Lead with Ops. Layer in AI.",
    previewText: "Please note: the meeting room has changed — Merchants Ice Building, Floor 4 Conference Room. Park in Lot B. Map attached.",
    body,
    unsubscribeUrl: buildUnsubscribeUrl(opts.email),
  })
}

/* ----------------------------------------------------------------------
 * Template 4 — Save-the-date reminder.
 * A light mid-cycle nudge (sent ~6 days before, the Friday prior) that keeps
 * the event on the recipient's radar without the day-before logistics weight.
 * No attachment — re-shares the calendar deep links instead.
 * -------------------------------------------------------------------- */

export function reminderEmailHtml(opts: KbygOpts): string {
  const body = `
<!-- Eyebrow + title -->
<tr>
  <td style="padding: 32px 32px 0 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${C.emerald}; font-weight: 700;">
      Save the Date · Less Than a Week Away
    </p>
    <h1 style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 32px; font-weight: 800; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.5px; color: ${C.navy};">
      Lead with Ops.<br />
      <span style="color: ${C.gray};">Layer in AI.</span>
    </h1>
  </td>
</tr>

<!-- Greeting + lede -->
<tr>
  <td style="padding: 28px 32px 0 32px;">
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.navy};">
      Hi ${escapeHtml(opts.firstName)},
    </p>
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.gray};">
      Just a quick note to keep this on your radar &mdash; your seat for <strong style="color: ${C.navy};">Lead with Ops. Layer in AI.</strong> with <strong style="color: ${C.navy};">Adam Carroll, Founder of Carroll Strategy &amp; Operations</strong>, is reserved, and the executive working lunch is now less than a week away.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: ${C.emerald}; font-weight: 700;">
      Thursday, June 18 &mdash; we&rsquo;re looking forward to hosting you.
    </p>
  </td>
</tr>

<!-- Event details -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    ${EVENT_DETAILS_BLOCK}
  </td>
</tr>

<!-- Add to calendar — re-share Google + Outlook deep links -->
<tr>
  <td style="padding: 0 32px 28px 32px;">
    <p style="margin: 0 0 12px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gray}; font-weight: 700;">
      Not on your calendar yet?
    </p>
    <table role="presentation" style="border-collapse: collapse;">
      <tr>
        <td style="padding-right: 8px;">
          <a href="${googleCalendarUrl()}" target="_blank" style="display: inline-block; padding: 10px 18px; border: 1px solid ${C.border}; color: ${C.navy}; text-decoration: none; font-family: ${PIXEL_STACK}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
            Google
          </a>
        </td>
        <td style="padding-right: 8px;">
          <a href="${outlookCalendarUrl()}" target="_blank" style="display: inline-block; padding: 10px 18px; border: 1px solid ${C.border}; color: ${C.navy}; text-decoration: none; font-family: ${PIXEL_STACK}; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
            Outlook
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Closing -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 18px 0; font-size: 14px; line-height: 1.7; color: ${C.gray};">
      We&rsquo;ll follow up the day before with a short &ldquo;know before you go&rdquo; note &mdash; parking, arrival time, and a campus map. Nothing else needed from you until then.
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.7; color: ${C.gray};">
      If your plans change, just reply to this email so we can offer your seat to another participant.
    </p>
    <p style="margin: 0; font-size: 15px; color: ${C.navy}; font-weight: 600;">
      See you on June 18.
    </p>
  </td>
</tr>
`.trim()

  return shell({
    title: "Save the date: Lead with Ops. Layer in AI. is June 18",
    previewText: "Your seat is reserved — the executive working lunch with Adam Carroll is less than a week away at VelocityTX CRC.",
    body,
    unsubscribeUrl: buildUnsubscribeUrl(opts.email),
  })
}

/* ----------------------------------------------------------------------
 * Template 5 — Post-event thank you.
 * Sent after the event to thank attendees and drive the post-event survey.
 * No attachment; primary CTA links to the feedback page.
 * -------------------------------------------------------------------- */

const FEEDBACK_SURVEY_URL =
  "https://www.digitalcanvas.community/workshops/lead-with-ops/feedback"

export function thankYouEmailHtml(opts: KbygOpts): string {
  const body = `
<!-- Eyebrow + title -->
<tr>
  <td style="padding: 32px 32px 0 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${C.emerald}; font-weight: 700;">
      Thank You
    </p>
    <h1 style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 32px; font-weight: 800; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.5px; color: ${C.navy};">
      Lead with Ops.<br />
      <span style="color: ${C.gray};">Layer in AI.</span>
    </h1>
  </td>
</tr>

<!-- Greeting + body -->
<tr>
  <td style="padding: 28px 32px 0 32px;">
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.navy};">
      Hi ${escapeHtml(opts.firstName)},
    </p>
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: ${C.gray};">
      Thank you for joining us for <strong style="color: ${C.navy};">Lead with Ops. Layer in AI.</strong> with <strong style="color: ${C.navy};">Adam Carroll</strong>. We appreciate you investing your time to be part of the conversation and contributing to a thoughtful discussion around operations, technology strategy, AI implementation, and business outcomes.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.7; color: ${C.gray};">
      As we continue to develop future workshops and executive programming through <strong style="color: ${C.navy};">Digital Canvas, 434 Media, DevSA</strong>, and our content partners, your feedback is incredibly valuable.
    </p>
  </td>
</tr>

<!-- Survey CTA -->
<tr>
  <td style="padding: 0 32px 28px 32px;">
    <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 1.7; color: ${C.navy}; font-weight: 600;">
      We&rsquo;d appreciate your participation in our post-event survey.
    </p>
    <table role="presentation" style="border-collapse: collapse;">
      <tr>
        <td style="background-color: ${C.coral};">
          <a href="${FEEDBACK_SURVEY_URL}" target="_blank" style="display: inline-block; padding: 14px 28px; color: ${C.navy}; text-decoration: none; font-family: ${PIXEL_STACK}; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
            Take the Survey
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 12px 0 0 0; font-size: 12px; color: ${C.gray}; line-height: 1.6;">
      Or paste this link: <a href="${FEEDBACK_SURVEY_URL}" style="color: ${C.emerald}; text-decoration: none;">${FEEDBACK_SURVEY_URL}</a>
    </p>
  </td>
</tr>

<!-- Closing -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0; font-size: 15px; line-height: 1.7; color: ${C.navy}; font-weight: 600;">
      Thank you again for being part of the community. We look forward to seeing you at a future event.
    </p>
  </td>
</tr>

<!-- P.S. -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 16px 20px; background-color: ${C.offWhite}; border-left: 3px solid ${C.emerald};">
          <p style="margin: 0; font-size: 14px; line-height: 1.7; color: ${C.gray};">
            <strong style="color: ${C.navy};">P.S.</strong> If you know another executive, founder, or operator who would benefit from future programming, we&rsquo;d love an introduction.
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>
`.trim()

  return shell({
    title: "Thank you for joining us for Lead with Ops. Layer in AI.",
    previewText: "Thank you for joining the conversation. We'd value your feedback — take our short post-event survey.",
    body,
    unsubscribeUrl: buildUnsubscribeUrl(opts.email),
  })
}

/* ----------------------------------------------------------------------
 * Plain-text alternatives — sent as the `text` field alongside `html`.
 *
 * Including a text/plain part is a strong deliverability signal — providers
 * weight HTML-only mail toward spam. The plain-text view is also what gets
 * shown in clients with images disabled (often default in Outlook).
 *
 * Each text version carries the same essential information as the HTML
 * (greeting, body, event details, CTAs / next steps, contact, footer).
 * -------------------------------------------------------------------- */

export function confirmationEmailText(opts: ConfirmationOpts): string {
  return `REGISTRATION CONFIRMED

Lead with Ops. Layer in AI.

Hi ${opts.firstName},

Thank you for registering for Lead with Ops. Layer in AI. featuring Adam Carroll, Founder of Carroll Strategy & Operations.

Your seat has been reserved.

Registered: ${opts.fullName}

EVENT DETAILS
-------------
Date:     June 18, 2026
Time:     11:30 AM – 1:00 PM
Location: VelocityTX CRC, 1305 E. Houston St., San Antonio, TX 78205
Lunch:    Provided

ADD TO CALENDAR
---------------
Google Calendar: ${googleCalendarUrl()}
Outlook:         ${outlookCalendarUrl()}
Apple Calendar:  open the .ics attachment included with this email

WE'LL EXPLORE
-------------
• How AI supports business strategy
• Where AI can create measurable ROI
• How to implement AI across the enterprise

Space is intentionally limited to encourage discussion and interaction among attendees.

If your plans change, please let us know so we can offer your seat to another participant — reply to this email or write to VIP@434MEDIA.COM.

We look forward to seeing you on June 18.

—
Presented by Digital Canvas · 434 Media

You're receiving this because you opted in to the 434 Media network.
Unsubscribe: ${buildUnsubscribeUrl(opts.email)}`
}

export function kbygEmailText(opts: KbygOpts): string {
  return `** PLEASE NOTE: CHANGE IN MEETING ROOM **

TOMORROW · KNOW BEFORE YOU GO

Lead with Ops. Layer in AI.

Hi ${opts.firstName},

Looking forward to seeing you tomorrow for the executive working lunch with Adam Carroll. Here's everything you need to know before you arrive.

THE MEETING ROOM HAS CHANGED. We're now in the Merchants Ice Building (Building 1), Floor 4 Conference Room at 1305 E. Houston. Please park in Lot B and reference the attached map for guidance.

LOGISTICS
---------
Date:       Thursday, June 18, 2026
Doors Open: 11:15 AM (Arrive early for networking.)
Program:    11:30 AM – 1:00 PM (Lunch served at start.)
Venue:      Merchants Ice Building (Building 1), Floor 4 Conf. Room, 1305 E. Houston
Parking:    Park in Lot B. See the attached map.
Access:     210-831-4439 (call for any access issues).

AGENDA
------
11:30  Working lunch served
11:45  Conversation opens with Adam Carroll
12:30  Group discussion + peer Q&A
 1:00  Wrap and close

WHAT TO BRING
-------------
• An operational question you want to answer
• A current AI decision you're navigating
• Business cards (optional)

This is an off-the-record, peer-level conversation. No product demos, no pitch decks. Come ready to engage and exchange perspective with other operators.

If your plans change, please reply to this email so we can offer the seat to another attendee.

See you tomorrow.

—
Presented by Digital Canvas · 434 Media
Questions? VIP@434MEDIA.COM

You're receiving this because you opted in to the 434 Media network.
Unsubscribe: ${buildUnsubscribeUrl(opts.email)}`
}

export function reminderEmailText(opts: KbygOpts): string {
  return `SAVE THE DATE · LESS THAN A WEEK AWAY

Lead with Ops. Layer in AI.

Hi ${opts.firstName},

Just a quick note to keep this on your radar — your seat for Lead with Ops. Layer in AI. with Adam Carroll, Founder of Carroll Strategy & Operations, is reserved, and the executive working lunch is now less than a week away.

Thursday, June 18 — we're looking forward to hosting you.

EVENT DETAILS
-------------
Date:     June 18, 2026
Time:     11:30 AM – 1:00 PM
Location: VelocityTX CRC, 1305 E. Houston St., San Antonio, TX 78205
Lunch:    Provided

NOT ON YOUR CALENDAR YET?
-------------------------
Google Calendar: ${googleCalendarUrl()}
Outlook:         ${outlookCalendarUrl()}

We'll follow up the day before with a short "know before you go" note — parking, arrival time, and a campus map. Nothing else needed from you until then.

If your plans change, just reply to this email so we can offer your seat to another participant.

See you on June 18.

—
Presented by Digital Canvas · 434 Media
Questions? VIP@434MEDIA.COM

You're receiving this because you opted in to the 434 Media network.
Unsubscribe: ${buildUnsubscribeUrl(opts.email)}`
}

export function thankYouEmailText(opts: KbygOpts): string {
  return `THANK YOU

Lead with Ops. Layer in AI.

Hi ${opts.firstName},

Thank you for joining us for Lead with Ops. Layer in AI. with Adam Carroll. We appreciate you investing your time to be part of the conversation and contributing to a thoughtful discussion around operations, technology strategy, AI implementation, and business outcomes.

As we continue to develop future workshops and executive programming through Digital Canvas, 434 Media, DevSA, and our content partners, your feedback is incredibly valuable.

We'd appreciate your participation in our post-event survey:

Take the Survey: ${FEEDBACK_SURVEY_URL}

Thank you again for being part of the community. We look forward to seeing you at a future event.

P.S. If you know another executive, founder, or operator who would benefit from future programming, we'd love an introduction.

—
Presented by Digital Canvas · 434 Media
Questions? VIP@434MEDIA.COM

You're receiving this because you opted in to the 434 Media network.
Unsubscribe: ${buildUnsubscribeUrl(opts.email)}`
}

/* ----------------------------------------------------------------------
 * Small helper — escape user-provided strings before interpolating into HTML.
 * -------------------------------------------------------------------- */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
