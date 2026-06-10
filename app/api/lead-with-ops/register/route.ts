import { NextResponse } from "next/server"
import { Resend } from "resend"
import { checkBotId } from "botid/server"
import { getDigitalCanvasDb } from "@/lib/firebase-admin"
import type { DocumentReference } from "firebase-admin/firestore"
import {
  EVENT_ID,
  EVENT_NAME,
  EVENT_DATE,
  EVENT_COLLECTION,
  KBYG_SCHEDULED_AT,
  sendConfirmation,
  sendKbyg,
} from "@/lib/emails/lead-with-ops-resend"

const isDevelopment = process.env.NODE_ENV === "development"

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
    // Captured outside the try so the email step below can stamp it with the
    // scheduled/sent KBYG id.
    let registrationDocRef: DocumentReference | null = null
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

      registrationDocRef = await registrationRef.add({
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

    // Email step — never fail the registration if email fails. Resend is
    // instantiated inside the try block so a missing API key (e.g. .env.local
    // not loaded in dev) doesn't crash the route at module load.
    //
    // The KBYG cutoff (KBYG_SCHEDULED_AT, Wed June 17) splits the behavior:
    //  - BEFORE the cutoff → send the confirmation now (plain-text alternative,
    //    .ics "Add to calendar" attachment, List-Unsubscribe header) AND schedule
    //    the KBYG for the cutoff, so this registrant joins the day-before batch.
    //  - AT/AFTER the cutoff → the KBYG batch has already gone out, so a late
    //    registrant skips the now-stale confirmation and instead gets the KBYG
    //    logistics email immediately.
    //
    // The save-the-date reminder is deliberately NOT sent here. A new registrant
    // just received the confirmation, which already serves as their save-the-date;
    // a near-duplicate reminder a day or two later would be noise. The reminder is
    // a one-time re-warm of the registrant list, sent only via the batch scheduler
    // (POST /api/lead-with-ops/schedule-reminder).
    //
    // The KBYG send is stamped onto the Firestore doc (kbygScheduled) so the batch
    // scheduler skips them on a re-run, and the send carries a stable idempotency
    // key so they can never be double-sent.
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY not configured — registration emails skipped")
      } else {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const pastKbygCutoff = Date.now() >= Date.parse(KBYG_SCHEDULED_AT)

        if (pastKbygCutoff) {
          // Late registrant — KBYG immediately, no confirmation.
          const { data, error } = await sendKbyg(resend, {
            email: normalizedEmail,
            firstName: trimmedFirst,
          })
          if (error || !data) throw new Error(error ? JSON.stringify(error) : "No data from Resend")
          await registrationDocRef?.update({
            kbygScheduled: {
              id: data.id,
              scheduledAt: new Date().toISOString(),
              scheduledFor: "immediate-on-registration",
            },
          })
          console.log(`KBYG (immediate) sent to ${normalizedEmail} — confirmation skipped (post-cutoff)`)
        } else {
          // Normal path — confirmation now + KBYG scheduled for the cutoff.
          const confirmation = await sendConfirmation(resend, {
            email: normalizedEmail,
            firstName: trimmedFirst,
            fullName,
          })
          if (confirmation.error) {
            console.error("Confirmation email error:", confirmation.error)
          } else {
            console.log(`Confirmation email sent to ${normalizedEmail}`)
          }

          const { data, error } = await sendKbyg(resend, {
            email: normalizedEmail,
            firstName: trimmedFirst,
            scheduledAt: KBYG_SCHEDULED_AT,
          })
          if (error || !data) throw new Error(error ? JSON.stringify(error) : "No data from Resend")
          await registrationDocRef?.update({
            kbygScheduled: {
              id: data.id,
              scheduledAt: KBYG_SCHEDULED_AT,
              scheduledFor: KBYG_SCHEDULED_AT,
            },
          })
          console.log(`KBYG scheduled for ${normalizedEmail} at ${KBYG_SCHEDULED_AT}`)
        }
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
