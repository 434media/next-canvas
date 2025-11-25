import { NextResponse } from "next/server"
import Airtable from "airtable"
import axios from "axios"
import crypto from "crypto"

const isDevelopment = process.env.NODE_ENV === "development"

// Use specific MXR base ID, fallback to general one if not set (though specific is preferred)
const airtableBaseId = process.env.MXR_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY
const christmasTable = process.env.CHRISTMAS_RSVP_TABLE || "rsvp" // Default fallback
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY

if (!airtableBaseId || !airtableApiKey) {
  console.error("Airtable configuration is missing")
}

const base = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId!)

export async function POST(request: Request) {
  try {
    const { name, email, joinFeed } = await request.json()
    const turnstileToken = request.headers.get("cf-turnstile-response")
    const remoteIp = request.headers.get("CF-Connecting-IP")

    if (!airtableBaseId || !airtableApiKey) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    if (!isDevelopment) {
      if (!turnstileSecretKey) {
        console.error("Turnstile secret key is not defined")
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
      }

      // Verify Turnstile token
      if (turnstileToken) {
        const idempotencyKey = crypto.randomUUID()
        const turnstileVerification = await axios.post(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          new URLSearchParams({
            secret: turnstileSecretKey,
            response: turnstileToken,
            remoteip: remoteIp || "",
            idempotency_key: idempotencyKey,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          },
        )

        if (!turnstileVerification.data.success) {
          const errorCodes = turnstileVerification.data["error-codes"] || []
          console.error("Turnstile verification failed:", errorCodes)
          return NextResponse.json({ error: "Turnstile verification failed", errorCodes }, { status: 400 })
        }
      } else {
        return NextResponse.json({ error: "Turnstile token is missing" }, { status: 400 })
      }
    }

    // Create record in Airtable
    await base(christmasTable).create([
      {
        fields: {
          Name: name,
          Email: email,
          "Join The Feed": joinFeed,
          Status: "RSVP'd",
        },
      },
    ], { typecast: true })

    return NextResponse.json({ message: "RSVP successful" }, { status: 200 })
  } catch (error: any) {
    console.error("Error processing RSVP:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your RSVP", details: error.message },
      { status: 500 },
    )
  }
}
