import { NextResponse } from "next/server"
import axios from "axios"
import { checkBotId } from "botid/server"
import { getDigitalCanvasDb } from "@/lib/firebase-admin"

const isDevelopment = process.env.NODE_ENV === "development"

// 434 Media legacy email-signup API — forwards to the parent admin app, which
// owns Mailchimp broadcasts. Optional: skipped silently if the key isn't set.
const MEDIA_434_API_URL = "https://434media.com/api/public/email-signup"
const MEDIA_434_API_KEY = process.env.EMAIL_SIGNUP_API_KEY

const SITE_SOURCE = "DigitalCanvas"
const SITE_TAGS = ["web-digitalcanvas", "newsletter-signup"]

/**
 * Newsletter signup endpoint — all signups across the site funnel through
 * here (workshops waitlist, feed signup, footer popup, etc.).
 *
 * Persistence chain:
 *  1. CANONICAL: `digitalcanvas` Firestore database, `newsletter-signups`
 *     collection. Always required; a failure here fails the whole request so
 *     subscribers never slip into downstream systems without a DC record.
 *  2. SECONDARY: legacy 434 Media email-signup API (forwarded to the parent
 *     admin app, which owns Mailchimp broadcasts). Best-effort; a failure
 *     here is logged but doesn't fail the request.
 *
 * Mailchimp was previously called directly from here. That was removed —
 * the parent admin app now handles Mailchimp via Firestore reads + its own
 * orchestration.
 */
export async function POST(request: Request) {
  try {
    if (!isDevelopment) {
      const verification = await checkBotId()
      if (verification.isBot) {
        return NextResponse.json({ error: "Bot detected. Access denied." }, { status: 403 })
      }
    }

    const { email, tags: extraTags } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Merge client-supplied tags with the site defaults so segmented signups
    // (e.g. workshop waitlist) carry both the global and the per-source tag.
    const sanitizedExtraTags = Array.isArray(extraTags)
      ? extraTags.filter((t): t is string => typeof t === "string" && t.length > 0 && t.length < 64)
      : []
    const mergedTags = Array.from(new Set([...SITE_TAGS, ...sanitizedExtraTags]))
    const normalizedEmail = email.toLowerCase().trim()

    // 1. CANONICAL — Digital Canvas Firestore (digitalcanvas database).
    //    Fail the request if this fails. Every signup MUST land here.
    try {
      const db = getDigitalCanvasDb()
      await db.collection("newsletter-signups").add({
        email: normalizedEmail,
        tags: mergedTags,
        source: SITE_SOURCE,
        pageUrl: request.headers.get("referer") || null,
        submittedAt: new Date().toISOString(),
      })
    } catch (firestoreError) {
      const message =
        firestoreError instanceof Error ? firestoreError.message : String(firestoreError)
      console.error("Digital Canvas Firestore error (newsletter):", message)
      return NextResponse.json(
        {
          error: isDevelopment
            ? `Subscription could not be saved: ${message}`
            : "Subscription service temporarily unavailable. Please try again or contact us directly.",
        },
        { status: 503 },
      )
    }

    // 2. SECONDARY — forward to the parent admin app's email-signup API.
    //    Best-effort; logged on failure but doesn't fail the request.
    if (MEDIA_434_API_KEY) {
      try {
        const upstream = await axios.post(
          MEDIA_434_API_URL,
          {
            email: normalizedEmail,
            source: SITE_SOURCE,
            tags: mergedTags,
            pageUrl: request.headers.get("referer") || undefined,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": MEDIA_434_API_KEY,
            },
            validateStatus: (status) => status < 500,
          },
        )
        if (upstream.status >= 400) {
          console.warn("434 Media email-signup API returned non-2xx:", upstream.status, upstream.data)
        }
      } catch (upstreamError) {
        console.warn("434 Media email-signup API request failed:", upstreamError)
      }
    }

    return NextResponse.json({ message: "Newsletter subscription successful" }, { status: 200 })
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return NextResponse.json(
      { error: "An error occurred while subscribing to the newsletter" },
      { status: 500 },
    )
  }
}
