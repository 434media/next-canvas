import { NextResponse } from "next/server"
import Airtable from "airtable"
import crypto from "crypto"

const isDevelopment = process.env.NODE_ENV === "development"

const airtableBaseId = process.env.MXR_AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY
const COMPUTER_GIVEAWAY_TABLE = "Computer Giveaway"
const WAITLIST_TABLE = "Christmas Waitlist"
const TOTAL_CHROMEBOOKS = 50

if (!airtableBaseId || !airtableApiKey) {
  console.error("Airtable configuration is missing: MXR_AIRTABLE_BASE_ID and AIRTABLE_API_KEY are required")
}

const base = airtableBaseId && airtableApiKey ? new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId) : null

export async function GET(request: Request) {
  try {
    if (!base) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    if (action === "check") {
      // Count current registrations
      const records = await base(COMPUTER_GIVEAWAY_TABLE)
        .select({
          fields: ["Email"],
        })
        .all()

      const registered = records.length
      const available = Math.max(0, TOTAL_CHROMEBOOKS - registered)

      return NextResponse.json({ 
        available, 
        registered,
        total: TOTAL_CHROMEBOOKS 
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    console.error("Error checking inventory:", error)
    return NextResponse.json(
      { error: "An error occurred while checking availability", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    if (!base) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    // Handle waitlist signups
    if (action === "waitlist") {
      const { firstName, lastName, email, phone } = await request.json()
      const turnstileToken = request.headers.get("cf-turnstile-response")
      const remoteIp = request.headers.get("CF-Connecting-IP")

      // Validate required fields
      if (!firstName || !lastName || !email || !phone) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 })
      }

      // Verify Turnstile token (skip in development)
      if (!isDevelopment) {
        if (!turnstileSecretKey) {
          console.error("Turnstile secret key is not defined")
          return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        if (!turnstileToken) {
          return NextResponse.json({ error: "Security verification is required" }, { status: 400 })
        }

        const idempotencyKey = crypto.randomUUID()
        const turnstileVerification = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: turnstileSecretKey,
              response: turnstileToken,
              remoteip: remoteIp || "",
              idempotency_key: idempotencyKey,
            }),
          }
        )

        const verificationResult = await turnstileVerification.json()

        if (!verificationResult.success) {
          const errorCodes = verificationResult["error-codes"] || []
          console.error("Turnstile verification failed:", errorCodes)
          return NextResponse.json({ error: "Security verification failed", errorCodes }, { status: 400 })
        }
      }

      // Check for duplicate email in waitlist
      const existingWaitlist = await base(WAITLIST_TABLE)
        .select({
          filterByFormula: `LOWER({Email}) = '${email.toLowerCase()}'`,
          fields: ["Email"],
        })
        .all()

      if (existingWaitlist.length > 0) {
        return NextResponse.json({ 
          error: "This email is already on the waitlist" 
        }, { status: 400 })
      }

      // Create waitlist record in Airtable
      await base(WAITLIST_TABLE).create([
        {
          fields: {
            "First Name": firstName,
            "Last Name": lastName,
            Email: email,
            "Phone Number": phone,
            "Submitted At": new Date().toLocaleString("en-US", {
              timeZone: "America/Chicago",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          },
        },
      ])

      return NextResponse.json({ 
        message: "Successfully joined the waitlist" 
      }, { status: 200 })
    }

    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      zipCode, 
      reason,
      // New fields
      levantaTechNewsletter,
      affordableInternetInterest,
      primaryLanguage,
      ethnicity,
      race,
      gender,
      streetAddress,
      city,
      state,
    } = await request.json()
    const turnstileToken = request.headers.get("cf-turnstile-response")
    const remoteIp = request.headers.get("CF-Connecting-IP")

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !zipCode || !reason || 
        !primaryLanguage || !ethnicity || !race || !gender || !streetAddress || !city || !state) {
      return NextResponse.json({ error: "All required fields must be completed" }, { status: 400 })
    }

    // Verify Turnstile token (skip in development)
    if (!isDevelopment) {
      if (!turnstileSecretKey) {
        console.error("Turnstile secret key is not defined")
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
      }

      if (!turnstileToken) {
        return NextResponse.json({ error: "Security verification is required" }, { status: 400 })
      }

      const idempotencyKey = crypto.randomUUID()
      const turnstileVerification = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecretKey,
            response: turnstileToken,
            remoteip: remoteIp || "",
            idempotency_key: idempotencyKey,
          }),
        }
      )

      const verificationResult = await turnstileVerification.json()

      if (!verificationResult.success) {
        const errorCodes = verificationResult["error-codes"] || []
        console.error("Turnstile verification failed:", errorCodes)
        return NextResponse.json({ error: "Security verification failed", errorCodes }, { status: 400 })
      }
    }

    // Check current inventory
    const records = await base(COMPUTER_GIVEAWAY_TABLE)
      .select({
        fields: ["Email"],
      })
      .all()

    const registered = records.length

    if (registered >= TOTAL_CHROMEBOOKS) {
      return NextResponse.json({ 
        error: "Sorry, all Chromebooks have been claimed",
        available: 0 
      }, { status: 400 })
    }

    // Check for duplicate email
    const existingRecord = records.find(
      (record) => record.fields.Email?.toString().toLowerCase() === email.toLowerCase()
    )

    if (existingRecord) {
      return NextResponse.json({ 
        error: "This email has already been registered" 
      }, { status: 400 })
    }

    // Create record in Airtable
    await base(COMPUTER_GIVEAWAY_TABLE).create([
      {
        fields: {
          "First Name": firstName,
          "Last Name": lastName,
          Email: email,
          Phone: phone,
          "ZIP Code": zipCode,
          Reason: reason,
          // Address fields
          "Street Address": streetAddress,
          City: city,
          State: state,
          // Demographic fields
          "Primary Language": primaryLanguage,
          Ethnicity: ethnicity,
          Race: race,
          Gender: gender,
          // Optional consents
          "Levantatech Newsletter": levantaTechNewsletter || false,
          "Affordable Internet Interest": affordableInternetInterest || false,
          "Submitted At": new Date().toLocaleString("en-US", {
            timeZone: "America/Chicago",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
      },
    ])

    const available = Math.max(0, TOTAL_CHROMEBOOKS - registered - 1)

    return NextResponse.json({ 
      message: "Registration successful",
      available 
    }, { status: 200 })
  } catch (error: any) {
    console.error("Error processing registration:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your registration", details: error.message },
      { status: 500 }
    )
  }
}
