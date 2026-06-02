/**
 * Email templates for the Lead with Ops. Layer in AI. event (June 18, 2026).
 *
 * Three templates:
 *  - inviteEmailHtml         — promotional invite (broadcast)
 *  - confirmationEmailHtml   — fires automatically on successful registration
 *  - kbygEmailHtml           — know before you go (sent ~24h before the event)
 *
 * Each function returns a complete HTML document. Pass to Resend as the `html` field.
 *
 * Design system — kept consistent across all three:
 *  - Logo image (hosted SVG) at the top instead of text wordmark.
 *  - Black/white core palette: #0a0a0a / #111 background, white/gray text.
 *  - Green (#88FF00) + magenta (#FF006E) used as inline accents only.
 *  - GeistPixel-Square loaded via @font-face with monospace fallbacks for the
 *    headlines, eyebrows, and CTA — clients that block @font-face still get
 *    a clean monospace render.
 *  - No outer gradient bars. Thin solid dividers only.
 */

interface InviteOpts {
  firstName?: string
  registrationUrl: string
}

interface ConfirmationOpts {
  firstName: string
  fullName: string
}

interface KbygOpts {
  firstName: string
}

const LOGO_URL =
  "https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
const FONT_URL =
  "https://www.digitalcanvas.community/fonts/GeistPixel-Square.ttf"

const PIXEL_STACK = "'GeistPixelSquare', 'Courier New', monospace"
const SANS_STACK = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

/* ----------------------------------------------------------------------
 * Shared shell — logo header, thin dividers, footer with VIP@434MEDIA.COM.
 * No outer gradient bars; the body controls all visual emphasis.
 * -------------------------------------------------------------------- */

function shell(opts: { title: string; previewText: string; body: string }): string {
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
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: ${SANS_STACK};">
  <span style="display: none; max-height: 0; overflow: hidden; opacity: 0; visibility: hidden; color: transparent;">${opts.previewText}</span>
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">

          <!-- Logo -->
          <tr>
            <td style="padding: 8px 32px 24px 32px;">
              <img src="${LOGO_URL}" alt="Digital Canvas" width="200" height="62" style="display: block; max-width: 200px; height: auto; border: 0;" />
            </td>
          </tr>

          <!-- Thin divider above body -->
          <tr>
            <td style="padding: 0 32px;">
              <div style="height: 1px; background-color: #222;"></div>
            </td>
          </tr>

          ${opts.body}

          <!-- Footer -->
          <tr>
            <td style="padding: 32px;">
              <div style="height: 1px; background-color: #222; margin-bottom: 24px;"></div>
              <p style="margin: 0 0 8px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #525252; font-weight: 700;">
                Presented by Digital Canvas · 434 Media
              </p>
              <p style="margin: 0; font-size: 12px; color: #737373;">
                Questions? <a href="mailto:VIP@434MEDIA.COM" style="color: #88FF00; text-decoration: none;">VIP@434MEDIA.COM</a>
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #333;">
                &copy; ${year} Digital Canvas · 434 Media. All rights reserved.
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
 * Event-details block — reused across all three templates.
 * Single bordered table; no color treatments.
 * -------------------------------------------------------------------- */

const EVENT_DETAILS_BLOCK = `
<table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #222; background-color: #0a0a0a;">
  <tr>
    <td style="padding: 20px 24px;">
      <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #525252; font-weight: 700;">
        Event Details
      </p>
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #222;">
            <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Date</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
            <span style="font-size: 14px; color: #ffffff; font-weight: 600;">June 18, 2026</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #222;">
            <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Time</span>
          </td>
          <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
            <span style="font-size: 14px; color: #ffffff; font-weight: 600;">11:30 AM &ndash; 1:00 PM</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">
            <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Location</span>
          </td>
          <td style="padding: 8px 0; text-align: right;">
            <span style="font-size: 14px; color: #ffffff; font-weight: 600;">VelocityTX</span>
            <br /><span style="font-size: 12px; color: #737373;">Lunch provided</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`.trim()

/* ----------------------------------------------------------------------
 * Template 1 — Promotional invite (broadcast)
 * -------------------------------------------------------------------- */

export function inviteEmailHtml(opts: InviteOpts): string {
  const greeting = opts.firstName ? `Hi ${escapeHtml(opts.firstName)},` : "Hi there,"
  const body = `
<!-- Eyebrow + title -->
<tr>
  <td style="padding: 32px 32px 0 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #525252; font-weight: 700;">
      Executive Working Lunch &nbsp;·&nbsp; June 18 &nbsp;·&nbsp; VelocityTX
    </p>
    <h1 style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 34px; font-weight: 800; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
      Lead with Ops.<br />
      <span style="color: #88FF00;">Layer in AI.</span>
    </h1>
  </td>
</tr>

<!-- Greeting + lede -->
<tr>
  <td style="padding: 28px 32px 0 32px;">
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: #d4d4d4;">
      ${greeting}
    </p>
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: #a3a3a3;">
      Many business leaders understand the potential of AI. Far fewer have a clear framework for aligning AI initiatives with business strategy, operational priorities, and measurable outcomes.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.7; color: #a3a3a3;">
      On <strong style="color: #ffffff;">June 18</strong>, we're hosting a working lunch with <strong style="color: #ffffff;">Adam Carroll, Founder of Carroll Strategy &amp; Operations</strong>, for a practical discussion focused on three critical questions:
    </p>
  </td>
</tr>

<!-- Questions -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0 10px 16px; border-left: 2px solid #88FF00;">
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #d4d4d4;">How does AI support business strategy?</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0 10px 16px; border-left: 2px solid #FF006E;">
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #d4d4d4;">Where can AI create measurable ROI?</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0 10px 16px; border-left: 2px solid #88FF00;">
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #d4d4d4;">How do you implement AI across the enterprise?</p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Not a demo -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 12px 0; font-size: 15px; line-height: 1.7; color: #a3a3a3;">
      This is not a product demo or software pitch.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: #a3a3a3;">
      It's an executive-level conversation designed for CEOs, Presidents, Operators, and business leaders looking for clarity before making AI investments.
    </p>
    <p style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 18px; line-height: 1.3; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
      Lead with Ops. <span style="color: #88FF00;">Layer in AI.</span>
    </p>
  </td>
</tr>

<!-- Event details -->
<tr>
  <td style="padding: 0 32px 28px 32px;">
    ${EVENT_DETAILS_BLOCK}
  </td>
</tr>

<!-- CTA -->
<tr>
  <td style="padding: 0 32px 0 32px;">
    <p style="margin: 0 0 16px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #FF006E; font-weight: 700;">
      Executive seating is limited
    </p>
    <table role="presentation" style="border-collapse: collapse;">
      <tr>
        <td style="background-color: #88FF00; padding: 14px 28px;">
          <a href="${opts.registrationUrl}" style="font-family: ${PIXEL_STACK}; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #0a0a0a; text-decoration: none; display: inline-block;">
            Reserve Your Seat &rarr;
          </a>
        </td>
      </tr>
    </table>
    <p style="margin: 16px 0 0 0; font-size: 12px; line-height: 1.5; color: #525252;">
      Or copy the link: <a href="${opts.registrationUrl}" style="color: #88FF00; word-break: break-all; text-decoration: none;">${opts.registrationUrl}</a>
    </p>
  </td>
</tr>

<!-- Closing -->
<tr>
  <td style="padding: 28px 32px 8px 32px;">
    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #a3a3a3;">
      We hope you'll join us.
    </p>
  </td>
</tr>
`.trim()

  return shell({
    title: "Limited Seating: Lead with Ops. Layer in AI. featuring Adam Carroll | June 18",
    previewText: "An executive working lunch focused on AI strategy, operational alignment, and implementation.",
    body,
  })
}

/* ----------------------------------------------------------------------
 * Template 2 — Registration confirmation
 * -------------------------------------------------------------------- */

export function confirmationEmailHtml(opts: ConfirmationOpts): string {
  const body = `
<!-- Eyebrow + title -->
<tr>
  <td style="padding: 32px 32px 0 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #88FF00; font-weight: 700;">
      Registration Confirmed
    </p>
    <h1 style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 32px; font-weight: 800; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
      Lead with Ops.<br />
      <span style="color: #88FF00;">Layer in AI.</span>
    </h1>
  </td>
</tr>

<!-- Greeting + lede -->
<tr>
  <td style="padding: 28px 32px 0 32px;">
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: #d4d4d4;">
      Hi ${escapeHtml(opts.firstName)},
    </p>
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: #a3a3a3;">
      Thank you for registering for <strong style="color: #ffffff;">Lead with Ops. Layer in AI.</strong> featuring <strong style="color: #ffffff;">Adam Carroll, Founder of Carroll Strategy &amp; Operations</strong>.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: #88FF00; font-weight: 600;">
      Your seat has been reserved.
    </p>
  </td>
</tr>

<!-- Registered name card -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #222;">
      <tr>
        <td style="padding: 18px 24px;">
          <p style="margin: 0 0 4px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #525252; font-weight: 700;">
            Registered
          </p>
          <p style="margin: 0; font-size: 16px; color: #ffffff; font-weight: 600;">
            ${escapeHtml(opts.fullName)}
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Event details -->
<tr>
  <td style="padding: 0 32px 28px 32px;">
    ${EVENT_DETAILS_BLOCK}
  </td>
</tr>

<!-- Audience + agenda preview -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 1.7; color: #a3a3a3;">
      This session is designed for CEOs, Presidents, Operators, Founders, and business leaders seeking clarity on how AI can support business strategy, operational execution, and measurable outcomes.
    </p>
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #525252; font-weight: 700;">
      We'll explore
    </p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid #88FF00;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4;">How AI supports business strategy</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid #FF006E;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4;">Where AI can create measurable ROI</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid #88FF00;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4;">How to implement AI across the enterprise</p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Plan-change note -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.7; color: #737373;">
      Space is intentionally limited to encourage discussion and interaction among attendees.
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.7; color: #737373;">
      If your plans change, please let us know so we can offer your seat to another participant — reply to this email or write to <a href="mailto:VIP@434MEDIA.COM" style="color: #88FF00; text-decoration: none;">VIP@434MEDIA.COM</a>.
    </p>
    <p style="margin: 0; font-size: 15px; color: #ffffff; font-weight: 600;">
      We look forward to seeing you on June 18.
    </p>
  </td>
</tr>
`.trim()

  return shell({
    title: "Registration Confirmed | Lead with Ops. Layer in AI. | June 18",
    previewText: "Your registration is confirmed. Executive seating is limited and lunch will be provided at VelocityTX on June 18.",
    body,
  })
}

/* ----------------------------------------------------------------------
 * Template 3 — Know before you go (~24 hours before event)
 * -------------------------------------------------------------------- */

export function kbygEmailHtml(opts: KbygOpts): string {
  const body = `
<!-- Eyebrow + title -->
<tr>
  <td style="padding: 32px 32px 0 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #FF006E; font-weight: 700;">
      Tomorrow · Know Before You Go
    </p>
    <h1 style="margin: 0; font-family: ${PIXEL_STACK}; font-size: 32px; font-weight: 800; line-height: 1.1; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff;">
      Lead with Ops.<br />
      <span style="color: #88FF00;">Layer in AI.</span>
    </h1>
  </td>
</tr>

<!-- Greeting -->
<tr>
  <td style="padding: 28px 32px 0 32px;">
    <p style="margin: 0 0 18px 0; font-size: 16px; line-height: 1.7; color: #d4d4d4;">
      Hi ${escapeHtml(opts.firstName)},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.7; color: #a3a3a3;">
      Looking forward to seeing you tomorrow at <strong style="color: #ffffff;">VelocityTX</strong> for the executive working lunch with <strong style="color: #ffffff;">Adam Carroll</strong>. Here's everything you need to know before you arrive.
    </p>
  </td>
</tr>

<!-- Logistics -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #222;">
      <tr>
        <td style="padding: 20px 24px;">
          <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #525252; font-weight: 700;">
            Logistics
          </p>
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Date</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; text-align: right;">
                <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Thursday, June 18, 2026</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Doors Open</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; text-align: right;">
                <span style="font-size: 14px; color: #ffffff; font-weight: 600;">11:15 AM</span>
                <br /><span style="font-size: 12px; color: #737373;">Arrive early for coffee and intros.</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Program</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; text-align: right;">
                <span style="font-size: 14px; color: #ffffff; font-weight: 600;">11:30 AM &ndash; 1:00 PM</span>
                <br /><span style="font-size: 12px; color: #737373;">Lunch served at start.</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Venue</span>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #222; text-align: right;">
                <span style="font-size: 14px; color: #ffffff; font-weight: 600;">VelocityTX</span>
                <br /><span style="font-size: 12px; color: #737373;">[CONFIRM VENUE ADDRESS]</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <span style="font-family: ${PIXEL_STACK}; font-size: 11px; color: #525252; text-transform: uppercase;">Parking</span>
              </td>
              <td style="padding: 10px 0; text-align: right;">
                <span style="font-size: 13px; color: #a3a3a3;">[CONFIRM PARKING NOTES]</span>
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
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #525252; font-weight: 700;">
      Agenda
    </p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #222;">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: #88FF00; font-weight: 700;">11:30</span>
          <span style="font-size: 14px; color: #ffffff; margin-left: 12px;">Working lunch served</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #222;">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: #88FF00; font-weight: 700;">11:45</span>
          <span style="font-size: 14px; color: #ffffff; margin-left: 12px;">Conversation opens with Adam Carroll</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #222;">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: #88FF00; font-weight: 700;">12:30</span>
          <span style="font-size: 14px; color: #ffffff; margin-left: 12px;">Group discussion + peer Q&amp;A</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0;">
          <span style="font-family: ${PIXEL_STACK}; font-size: 12px; color: #88FF00; font-weight: 700;">1:00</span>
          <span style="font-size: 14px; color: #ffffff; margin-left: 12px;">Wrap and close</span>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- What to bring -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 14px 0; font-family: ${PIXEL_STACK}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #FF006E; font-weight: 700;">
      What to bring
    </p>
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid #FF006E;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4;">An operational question you want to answer</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid #FF006E;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4;">A current AI decision you're navigating</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0 8px 16px; border-left: 2px solid #FF006E;">
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4;">Business cards (optional)</p>
        </td>
      </tr>
    </table>
  </td>
</tr>

<!-- Format note + closing -->
<tr>
  <td style="padding: 0 32px 24px 32px;">
    <p style="margin: 0 0 18px 0; font-size: 14px; line-height: 1.7; color: #737373;">
      This is an off-the-record, peer-level conversation. No product demos, no pitch decks. Come ready to engage and exchange perspective with other operators.
    </p>
    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.7; color: #737373;">
      If your plans change, please reply to this email so we can offer the seat to another attendee.
    </p>
    <p style="margin: 0; font-size: 15px; color: #ffffff; font-weight: 600;">
      See you tomorrow.
    </p>
  </td>
</tr>
`.trim()

  return shell({
    title: "Tomorrow: What to know before Lead with Ops. Layer in AI.",
    previewText: "Logistics, agenda, and what to bring for tomorrow's working lunch with Adam Carroll at VelocityTX.",
    body,
  })
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
