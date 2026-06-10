import { NextResponse } from "next/server"
import { checkBotId } from "botid/server"
import { getDigitalCanvasDb } from "@/lib/firebase-admin"

const isDevelopment = process.env.NODE_ENV === "development"

const SITE_SOURCE = "DigitalCanvas"
const SITE_TAGS = ["web-digitalcanvas", "newsletter-signup"]

/**
 * Newsletter signup endpoint — all signups across the site funnel through
 * here (workshops waitlist, feed signup, footer popup, etc.).
 *
 * Writes to the `digitalcanvas` Firestore database, `newsletter-signups`
 * collection. The parent 434 Media admin app reads from this collection
 * directly via the shared service account and owns all downstream delivery
 * (Mailchimp broadcasts, segmentation, unsubscribes). This route has no
 * Mailchimp coupling of its own.
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

    return NextResponse.json({ message: "Newsletter subscription successful" }, { status: 200 })
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    return NextResponse.json(
      { error: "An error occurred while subscribing to the newsletter" },
      { status: 500 },
    )
  }
}
