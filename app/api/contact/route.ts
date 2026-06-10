import { type NextRequest, NextResponse } from "next/server"
import { getDigitalCanvasDb } from "@/lib/firebase-admin"

/**
 * Contact form submissions land in the `contact-submissions` collection on
 * the `digitalcanvas` Firestore database. This is the only persistence layer
 * — Airtable was removed; the parent admin app reads from Firestore directly.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    try {
      const db = getDigitalCanvasDb()
      await db.collection("contact-submissions").add({
        name: body.name || null,
        title: body.title || null,
        organization: body.organization || null,
        email: body.email || null,
        phone: body.phone || null,
        engagementType: body.engagementType || null,
        challenge: body.challenge || null,
        submittedAt: new Date().toISOString(),
        pageUrl: request.headers.get("referer") || null,
        source: "contact",
      })
    } catch (firestoreError) {
      const message =
        firestoreError instanceof Error ? firestoreError.message : String(firestoreError)
      console.error("Digital Canvas Firestore error (contact):", message)
      return NextResponse.json(
        { error: "Contact form temporarily unavailable. Please try again." },
        { status: 503 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}
