import { NextResponse } from "next/server"
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

const COLLECTION_NAME = "sponsor-inquiries"

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
    const { firstName, lastName, company, email, phone, message, source } = body

    // Validation
    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 })
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
      return NextResponse.json({ error: "Last name is required" }, { status: 400 })
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Work email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!company || typeof company !== "string" || company.trim().length === 0) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const fullName = `${firstName.trim()} ${lastName.trim()}`
    const sourceTag = source || "sponsor-devsa"

    // Save to Firestore
    try {
      const db = getFirestoreDb()
      const inquiryRef = db.collection(COLLECTION_NAME)

      // Create inquiry document
      await inquiryRef.add({
        email: normalizedEmail,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName,
        company: company.trim(),
        phone: phone?.trim() || null,
        message: message?.trim() || null,
        source: sourceTag,
        tags: ["sponsor-inquiry", sourceTag],
        submittedAt: new Date().toISOString(),
        pageUrl: request.headers.get("referer") || null,
        status: "new",
      })

      console.log(`Sponsor inquiry saved for ${normalizedEmail} from ${company.trim()}`)
    } catch (firestoreError) {
      console.error("Firestore error:", firestoreError)

      // In development, continue anyway
      if (!isDevelopment) {
        return NextResponse.json(
          { error: "Service temporarily unavailable. Please try again later." },
          { status: 503 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your interest! We'll be in touch soon.",
    })
  } catch (error) {
    console.error("Sponsor inquiry error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}
