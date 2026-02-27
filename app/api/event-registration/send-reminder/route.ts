import { NextResponse } from "next/server"
import { Resend } from "resend"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// Initialize Firebase Admin
function getFirestoreDb() {
  if (getApps().length === 0) {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"
    const serviceAccount = JSON.parse(raw.replace(/\n/g, "\\n"))
    initializeApp({
      credential: cert(serviceAccount),
    })
  }
  return getFirestore()
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Protect with a secret key so only you can trigger this
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    if (secret !== process.env.REMINDER_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch all registrants from Firestore
    const db = getFirestoreDb()
    const registrationsSnapshot = await db
      .collection("event-registrations")
      .where("event", "==", "MoreHumanThanHuman2026")
      .get()

    if (registrationsSnapshot.empty) {
      return NextResponse.json(
        { error: "No registrants found" },
        { status: 404 }
      )
    }

    const registrants = registrationsSnapshot.docs.map((doc) => ({
      email: doc.data().email as string,
      firstName: doc.data().firstName as string,
    }))

    console.log(`Found ${registrants.length} registrants to email`)

    // Resend batch supports up to 100 emails per call
    const BATCH_SIZE = 100
    const results: { successful: number; failed: number; errors: string[] } = {
      successful: 0,
      failed: 0,
      errors: [],
    }

    for (let i = 0; i < registrants.length; i += BATCH_SIZE) {
      const batch = registrants.slice(i, i + BATCH_SIZE)

      const emails = batch.map((registrant) => ({
        from: "DEVSA <hello@send.devsa.community>",
        to: registrant.email,
        subject: "Tomorrow: See you at More Human Than Human! 🚀",
        html: generateReminderEmail(registrant.firstName),
      }))

      try {
        const batchResult = await resend.batch.send(emails)
        console.log(
          `Batch ${Math.floor(i / BATCH_SIZE) + 1} sent:`,
          batchResult
        )
        results.successful += batch.length
      } catch (batchError) {
        console.error(
          `Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`,
          batchError
        )
        results.failed += batch.length
        results.errors.push(
          `Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${String(batchError)}`
        )
      }
    }

    return NextResponse.json(
      {
        message: "Reminder emails processed",
        totalRegistrants: registrants.length,
        successful: results.successful,
        failed: results.failed,
        errors: results.errors.length > 0 ? results.errors : undefined,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Send reminder error:", error)
    return NextResponse.json(
      { error: "Failed to send reminder emails" },
      { status: 500 }
    )
  }
}

function generateReminderEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tomorrow: See you at More Human Than Human!</title>
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
              <h2 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                Hi ${firstName}! 👋
              </h2>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #a3a3a3;">
                We are officially <strong style="color: #ffffff;">24 hours away</strong> from <strong style="color: #fbbf24;">More Human Than Human</strong>, San Antonio's first AI conference powered by DEVSA! We are incredibly excited to bring this community together at Geekdom to dive into the tools and workflows redefining our tech landscape.
              </p>

              <p style="margin: 0 0 8px 0; font-size: 16px; line-height: 1.6; color: #a3a3a3;">
                Here is everything you need to know for tomorrow:
              </p>
            </td>
          </tr>

          <!-- The Logistics -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px 32px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; border: 1px solid #333;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px 0; font-family: monospace; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #fbbf24; font-weight: 700;">
                      📍 The Logistics
                    </p>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">When</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
                          <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Tomorrow, Saturday, Feb 28th</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">Doors Open</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
                          <span style="font-size: 14px; color: #ffffff; font-weight: 600;">12:30 PM</span>
                          <br><span style="font-size: 12px; color: #737373;">Join us early for drinks, snacks, &amp; networking!</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">Sessions</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
                          <span style="font-size: 14px; color: #ffffff; font-weight: 600;">1:00 PM – 5:00 PM</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">Where</span>
                        </td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #222; text-align: right;">
                          <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Geekdom, 3rd Floor</span>
                          <br><span style="font-size: 12px; color: #737373;">110 East Houston Street, SA 78205</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="font-family: monospace; font-size: 11px; color: #525252; text-transform: uppercase;">Parking</span>
                        </td>
                        <td style="padding: 8px 0; text-align: right;">
                          <span style="font-size: 13px; color: #a3a3a3;">City Tower Garage or St. Mary's Parking Garage</span>
                          <br><span style="font-size: 12px; color: #737373;">No more than $10 on a Saturday!</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- The Sessions -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px 32px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <h3 style="margin: 0 0 16px 0; font-family: monospace; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #fbbf24;">
                🎤 The Sessions
              </h3>
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #a3a3a3;">
                We have a heavy-hitting lineup of local talent ready to share their insights:
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Wes Etheredge</span>
                    <br><span style="font-size: 13px; color: #737373;">Mastering the "AI Thought Partner" framework.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Jacqueline Suttin</span>
                    <br><span style="font-size: 13px; color: #737373;">Securing an agentic internet with MAGEN Trust.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Werner Mendizabal</span>
                    <br><span style="font-size: 13px; color: #737373;">Building unified audio ecosystems in Godot.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Daniel Ward</span>
                    <br><span style="font-size: 13px; color: #737373;">Zero to AI Agent in 10 minutes with GitHub Copilot SDK.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Samad Ahmed</span>
                    <br><span style="font-size: 13px; color: #737373;">A live-code autopsy of an AI agent from scratch.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Dirce Hernandez</span>
                    <br><span style="font-size: 13px; color: #737373;">Why AI development must be a "team sport" for security.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Angel Escobedo</span>
                    <br><span style="font-size: 13px; color: #737373;">Architecture and judgment as the new "hard skills."</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #1a1a1a;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Serena Hernandez</span>
                    <br><span style="font-size: 13px; color: #737373;">10x market validation with AI GTM research.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <span style="font-size: 14px; color: #ffffff; font-weight: 600;">Jesse Hernandez</span>
                    <br><span style="font-size: 13px; color: #737373;">A live workshop on the v0 by Vercel workflow.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- The Afterparty -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px 32px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <h3 style="margin: 0 0 16px 0; font-family: monospace; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #fbbf24;">
                🍻 The Afterparty
              </h3>
              <p style="margin: 0 0 0 0; font-size: 15px; line-height: 1.6; color: #a3a3a3;">
                Once we wrap up at 5:00 PM, join us at the <strong style="color: #ffffff;">Double Standard patio</strong> (street level of the Rand Building) for drinks and networking to close out the day.
              </p>
            </td>
          </tr>

          <!-- Livestream Note -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px 40px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0a0a0a; border: 1px solid #333;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #737373;">
                      <strong style="color: #a3a3a3;">Note for those who missed a spot:</strong> If you know someone who couldn't register, the event is sold out at the venue, but they can still catch the full program via the live stream on the <a href="https://www.youtube.com/@devsatx" style="color: #ff9900; text-decoration: none; font-weight: 600;">DEVSA YouTube channel</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="background-color: #111111; padding: 0 32px 40px 32px; border-left: 1px solid #333; border-right: 1px solid #333;">
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #ffffff; font-weight: 600;">
                We can't wait to see you all tomorrow! 🚀
              </p>
              <p style="margin: 0 0 4px 0; font-size: 15px; color: #ff9900; font-weight: 500; font-style: italic;">
                Stay building,
              </p>
              <p style="margin: 0; font-size: 15px; color: #a3a3a3; font-weight: 600;">
                The DEVSA Team
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
                Your Direct Connection to the Tech Community
              </p>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #333;">
                &copy; ${new Date().getFullYear()} Digital Canvas Network. All rights reserved.
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
