import { NextResponse } from "next/server"
import { Resend } from "resend"
import { checkBotId } from "botid/server"
import { getDigitalCanvasDb } from "@/lib/firebase-admin"
import { confirmationEmailHtml } from "@/lib/emails/lead-with-ops"

const isDevelopment = process.env.NODE_ENV === "development"

// Event configuration — change these constants if running another cohort
// of this same lunch format.
const EVENT_ID = "LeadWithOpsLayerInAI-2026-06-18"
const EVENT_NAME = "Lead with Ops. Layer in AI."
const EVENT_DATE = "2026-06-18"
const EVENT_COLLECTION = "event-registrations"

// Sender — uses the 434 Media verified Resend domain (send.434media.com).
// Display name "Digital Canvas" shows in the recipient's inbox.
const EMAIL_FROM = "Digital Canvas <hello@send.434media.com>"

export async function POST(request: Request) {
  try {
    // Bot check — skipped in dev to avoid friction during local testing.
    if (!isDevelopment) {
      const verification = await checkBotId()
      if (verification.isBot) {
        return NextResponse.json({ error: "Bot detected. Access denied." }, { status: 403 })
      }
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      aiAdoptionLevel,
      optInForUpdates,
    }: {
      firstName?: string
      lastName?: string
      email?: string
      aiAdoptionLevel?: number | string
      optInForUpdates?: boolean
    } = body

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

    // AI adoption level — accept numeric 1-5, also accept string from form posts.
    const adoptionNumeric = typeof aiAdoptionLevel === "string"
      ? Number.parseInt(aiAdoptionLevel, 10)
      : aiAdoptionLevel
    if (
      typeof adoptionNumeric !== "number" ||
      Number.isNaN(adoptionNumeric) ||
      adoptionNumeric < 1 ||
      adoptionNumeric > 5
    ) {
      return NextResponse.json(
        { error: "AI adoption level must be a number from 1 to 5" },
        { status: 400 },
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()
    const fullName = `${trimmedFirst} ${trimmedLast}`
    const optedIn = Boolean(optInForUpdates)

    // Save to Firestore — collection: event-registrations, scoped by event id.
    // Always fail the request on Firestore errors (dev included) so the form
    // never shows a misleading success state when no data was actually saved.
    try {
      const db = getDigitalCanvasDb()
      const registrationRef = db.collection(EVENT_COLLECTION)

      const existingQuery = await registrationRef
        .where("email", "==", normalizedEmail)
        .where("event", "==", EVENT_ID)
        .get()

      if (!existingQuery.empty) {
        return NextResponse.json(
          { error: "This email is already registered for the event" },
          { status: 409 },
        )
      }

      await registrationRef.add({
        email: normalizedEmail,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        fullName,
        aiAdoptionLevel: adoptionNumeric,
        optInForUpdates: optedIn,
        event: EVENT_ID,
        eventName: EVENT_NAME,
        eventDate: EVENT_DATE,
        registeredAt: new Date().toISOString(),
        source: "web-digitalcanvas",
        tags: [
          "event-registration",
          "lead-with-ops-2026-06-18",
          ...(optedIn ? ["digital-canvas-opt-in"] : []),
        ],
        pageUrl: request.headers.get("referer") || null,
      })

      console.log(`Lead with Ops registration saved for ${normalizedEmail}`)
    } catch (firestoreError) {
      const message = firestoreError instanceof Error ? firestoreError.message : String(firestoreError)
      console.error("Firestore error:", message)
      // Surface the underlying cause in dev so config issues are obvious;
      // keep the message generic in production.
      return NextResponse.json(
        {
          error: isDevelopment
            ? `Registration could not be saved: ${message}`
            : "Registration service temporarily unavailable. Please try again or contact us directly.",
        },
        { status: 503 },
      )
    }

    // Send confirmation email — don't fail the registration if email fails.
    // Resend is instantiated inside the try block so a missing API key (e.g.
    // .env.local not loaded in dev) doesn't crash the route at module load.
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn(
          "RESEND_API_KEY not configured — confirmation email skipped",
        )
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: EMAIL_FROM,
          to: normalizedEmail,
          subject: "Registration Confirmed | Lead with Ops. Layer in AI. | June 18",
          html: confirmationEmailHtml({ firstName: trimmedFirst, fullName }),
        })
        console.log(`Confirmation email sent to ${normalizedEmail}`)
      }
    } catch (emailError) {
      console.error("Email send error:", emailError)
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        data: {
          firstName: trimmedFirst,
          email: normalizedEmail,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    )
  }
}
