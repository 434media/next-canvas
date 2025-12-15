import { NextResponse } from "next/server"
import Airtable from "airtable"

const airtableBaseId = process.env.AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY
const chromebookTable = process.env.CHROMEBOOK_TABLE || "Chromebook Registrations"
const TOTAL_CHROMEBOOKS = 50

if (!airtableBaseId || !airtableApiKey) {
  console.error("Airtable configuration is missing")
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
      const records = await base(chromebookTable)
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

    const { firstName, lastName, email, phone, zipCode, reason } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !zipCode || !reason) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check current inventory
    const records = await base(chromebookTable)
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
    await base(chromebookTable).create([
      {
        fields: {
          "First Name": firstName,
          "Last Name": lastName,
          Email: email,
          Phone: phone,
          "ZIP Code": zipCode,
          Reason: reason,
          Status: "Registered",
          "Registration Date": new Date().toISOString(),
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
