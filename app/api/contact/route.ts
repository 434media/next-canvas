import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Airtable integration
    // You'll need to add these environment variables:
    // AIRTABLE_API_KEY and AIRTABLE_BASE_ID
    const airtableApiKey = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID

    if (!airtableApiKey || !airtableBaseId) {
      console.warn("Airtable credentials not configured")
      // For now, log the submission
      console.log("Form submission:", body)
      return NextResponse.json({ success: true })
    }

    const response = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/Workshop%20Inquiries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: body.name,
          Title: body.title,
          Organization: body.organization,
          Email: body.email,
          Phone: body.phone || "",
          "Engagement Type": body.engagementType,
          Challenge: body.challenge,
          "Submitted At": new Date().toISOString(),
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Airtable API error")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}
