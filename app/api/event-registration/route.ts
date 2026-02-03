import { NextResponse } from "next/server"
import { Resend } from "resend"
import { checkBotId } from "botid/server"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const isDevelopment = process.env.NODE_ENV === "development"

// Initialize Firebase Admin
function getFirestoreDb() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}")
    initializeApp({
      credential: cert(serviceAccount),
    })
  }
  return getFirestore()
}

// Resend configuration
const resend = new Resend(process.env.RESEND_API_KEY)

// Event configuration
const EVENT_NAME = "More Human Than Human"
const EVENT_COLLECTION = "event-registrations"

export async function POST(request: Request) {
  try {
    // Verify request is not from a bot using BotID
    if (!isDevelopment) {
      const verification = await checkBotId()
      if (verification.isBot) {
        return NextResponse.json({ error: "Bot detected. Access denied." }, { status: 403 })
      }
    }

    const body = await request.json()
    const { firstName, lastName, email, company, subscribeToFeed } = body

    // Validation
    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 })
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
      return NextResponse.json({ error: "Last name is required" }, { status: 400 })
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const fullName = `${firstName.trim()} ${lastName.trim()}`

    // Save to Firestore
    try {
      const db = getFirestoreDb()
      const registrationRef = db.collection(EVENT_COLLECTION)
      
      // Check for existing registration
      const existingQuery = await registrationRef
        .where("email", "==", normalizedEmail)
        .where("event", "==", "MoreHumanThanHuman2026")
        .get()

      if (!existingQuery.empty) {
        return NextResponse.json(
          { error: "This email is already registered for the event" },
          { status: 409 }
        )
      }

      // Create registration document
      await registrationRef.add({
        email: normalizedEmail,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName,
        company: company?.trim() || null,
        subscribeToFeed: Boolean(subscribeToFeed),
        event: "MoreHumanThanHuman2026",
        eventName: EVENT_NAME,
        eventDate: "2026-02-28",
        registeredAt: new Date().toISOString(),
        source: "web-digitalcanvas",
        tags: ["event-registration", "mhth-2026", ...(subscribeToFeed ? ["feed-subscriber"] : [])],
        pageUrl: request.headers.get("referer") || null,
      })

      console.log(`Registration saved for ${normalizedEmail}`)
    } catch (firestoreError) {
      console.error("Firestore error:", firestoreError)
      
      // In development, continue anyway
      if (!isDevelopment) {
        return NextResponse.json(
          { error: "Registration service temporarily unavailable" },
          { status: 503 }
        )
      }
    }

    // Send confirmation email via Resend
    try {
      await resend.emails.send({
        from: "DEVSA <hello@send.devsa.community>",
        to: normalizedEmail,
        subject: `You're Registered: ${EVENT_NAME} | February 28, 2026`,
        html: generateConfirmationEmail(firstName.trim(), fullName),
      })
      console.log(`Confirmation email sent to ${normalizedEmail}`)
    } catch (emailError) {
      console.error("Email send error:", emailError)
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        data: {
          firstName: firstName.trim(),
          email: normalizedEmail,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

function generateConfirmationEmail(firstName: string, fullName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Registered: More Human Than Human</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">
          
          <!-- Header with Aztec border -->
          <tr>
            <td style="background: linear-gradient(to right, #fbbf24, #ff9900, #fbbf24); height: 4px;"></td>
          </tr>
          
          <!-- Logo/Event Name -->
          <tr>
            <td style="background-color: #111111; padding: 40px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #fbbf24;">
                More Human<br>
                <span style="color: #ffffff;">Than Human</span>
              </h1>
              <p style="margin: 16px 0 0 0; font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #737373;">
                AI Conference • February 28, 2026 • Geekdom
              </p>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <div style="height: 1px; background-color: #333;"></div>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #111111; padding: 40px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 700; color: #ffffff;">
                You're In, ${firstName}! 🎉
              </h2>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #a3a3a3;">
                Thank you for registering for <strong style="color: #ffffff;">More Human Than Human</strong> — AI conference powered by DEVSA exploring how AI is reshaping code, security, and leadership.
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #a3a3a3;">
                As AI shifts from a tool we use to an agent that acts, the boundary between human and machine is disappearing. You'll join builders, dreamers, and technologists for a deep dive into how AI is fundamentally re-architecting the way we work.
              </p>
              
              <p style="margin: 0 0 32px 0; font-size: 15px; line-height: 1.6; color: #ff9900; font-weight: 500;">
                We aren't just talking about the future — we're demonstrating the tools that are defining it.
              </p>
              
              <!-- Event Details Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; border: 1px solid #333;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 8px 0; font-family: monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #737373;">
                      Event Details
                    </p>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">Date</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
                          <span style="font-size: 14px; color: #ffffff; font-weight: 600;">February 28, 2026</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">Location</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
                          <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Geekdom, San Antonio</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">Registered</span>
                        </td>
                        <td style="padding: 8px 0; text-align: right;">
                          <span style="font-size: 14px; color: #27ca40; font-weight: 600;">${fullName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- What to Expect -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px 40px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <h3 style="margin: 0 0 16px 0; font-family: monospace; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #fbbf24;">
                What to Expect
              </h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #a3a3a3; font-size: 15px; line-height: 2;">
                <li>Expert speakers from across the AI landscape</li>
                <li>Live demos of cutting-edge AI tools and workflows</li>
                <li>Sessions on AI security, agentic systems, and leadership</li>
                <li>Networking with San Antonio's tech community</li>
              </ul>
            </td>
          </tr>
          
          <!-- Stay Connected -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px 40px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #a3a3a3;">
                We'll send you updates as we announce speakers, sessions, and more details. Keep an eye on your inbox!
              </p>
              <p style="margin: 0; font-size: 14px; color: #737373;">
                Questions? Reply to this email or reach out to us at <a href="mailto:hello@devsa.community" style="color: #ff9900; text-decoration: none;">hello@devsa.community</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer border -->
          <tr>
            <td style="background: linear-gradient(to right, #fbbf24, #ff9900, #fbbf24); height: 4px;"></td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #525252;">
                Powered by DEVSA
              </p>
              <p style="margin: 0; font-size: 12px; color: #404040;">
                San Antonio's Developer Community
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #333;">
                © ${new Date().getFullYear()} Digital Canvas Network. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
