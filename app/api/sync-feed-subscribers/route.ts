import { NextResponse } from "next/server"
import Airtable from "airtable"
import axios from "axios"
import crypto from "crypto"

const airtableBaseId = process.env.MXR_AIRTABLE_BASE_ID
const airtableApiKey = process.env.AIRTABLE_API_KEY
const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
const mailchimpListId = process.env.MAILCHIMP_AUDIENCE_ID

// Table name in MXR Airtable base - adjust if different
const RSVP_TABLE = "RSVP"
// Field name for the checkbox - adjust if different
const JOIN_FEED_FIELD = "Join The Feed"

if (!airtableBaseId || !airtableApiKey) {
  console.error("Airtable configuration is missing: MXR_AIRTABLE_BASE_ID and AIRTABLE_API_KEY are required")
}

const base = airtableBaseId && airtableApiKey ? new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId) : null
const mailchimpDatacenter = mailchimpApiKey ? mailchimpApiKey.split("-").pop() : null

interface SyncResult {
  email: string
  name: string
  status: "success" | "exists" | "error"
  message?: string
}

export async function GET(request: Request) {
  try {
    if (!base) {
      return NextResponse.json({ error: "Airtable configuration error" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    // Preview mode - just show who would be synced
    if (action === "preview") {
      // Get all records with Join The Feed checked
      const records = await base(RSVP_TABLE)
        .select({
          filterByFormula: `{${JOIN_FEED_FIELD}} = TRUE()`,
          fields: ["Name", "Email", JOIN_FEED_FIELD],
        })
        .all()

      const subscribers = records.map((record) => ({
        name: record.fields["Name"] || "",
        email: record.fields["Email"] || "",
        joinFeed: record.fields[JOIN_FEED_FIELD] || false,
      }))

      return NextResponse.json({
        message: "Preview of subscribers to sync to Mailchimp",
        count: subscribers.length,
        subscribers,
      })
    }

    // List all tables (for debugging)
    if (action === "tables") {
      // Airtable doesn't have a direct API to list tables, 
      // but we can try to access known tables
      const knownTables = ["RSVP", "Computer Giveaway", "Christmas Waitlist"]
      const tableStatus: Record<string, string> = {}

      for (const tableName of knownTables) {
        try {
          const records = await base(tableName).select({ maxRecords: 1 }).all()
          tableStatus[tableName] = `Found (${records.length > 0 ? "has records" : "empty"})`
        } catch (error: any) {
          tableStatus[tableName] = `Error: ${error.message}`
        }
      }

      return NextResponse.json({ tables: tableStatus })
    }

    return NextResponse.json({ 
      error: "Invalid action. Use ?action=preview to see subscribers or POST to sync to Mailchimp" 
    }, { status: 400 })
  } catch (error: any) {
    console.error("Error fetching feed subscribers:", error)
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    if (!base) {
      return NextResponse.json({ error: "Airtable configuration error" }, { status: 500 })
    }

    const mailchimpEnabled = mailchimpApiKey && mailchimpListId && mailchimpDatacenter
    if (!mailchimpEnabled) {
      return NextResponse.json({ 
        error: "Mailchimp integration not configured - missing API key or Audience ID" 
      }, { status: 500 })
    }

    // Fetch all records where "Join The Feed" is checked
    const records = await base(RSVP_TABLE)
      .select({
        filterByFormula: `{${JOIN_FEED_FIELD}} = TRUE()`,
        fields: ["Name", "Email", JOIN_FEED_FIELD],
      })
      .all()

    if (records.length === 0) {
      return NextResponse.json({
        message: "No subscribers found with 'Join The Feed' checked",
        synced: 0,
      })
    }

    const results: SyncResult[] = []

    for (const record of records) {
      const email = record.fields["Email"]?.toString()
      const fullName = record.fields["Name"]?.toString().trim() || ""
      
      // Split name into first and last (best effort)
      const nameParts = fullName.split(/\s+/)
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      if (!email) {
        results.push({
          email: "missing",
          name: fullName,
          status: "error",
          message: "No email address",
        })
        continue
      }

      try {
        // Try to add subscriber to Mailchimp
        const response = await axios.post(
          `https://${mailchimpDatacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
          {
            email_address: email,
            status: "subscribed",
            tags: ["web-digitalcanvas", "newsletter-signup", "mxr-rsvp", "join-the-feed"],
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
            },
          },
          {
            auth: {
              username: "apikey",
              password: mailchimpApiKey,
            },
            headers: {
              "Content-Type": "application/json",
            },
            validateStatus: (status) => status < 500,
          }
        )

        if (response.status === 200) {
          results.push({
            email,
            name: fullName,
            status: "success",
            message: "Added to Mailchimp",
          })
        } else if (response.data?.title === "Member Exists") {
          // Member already exists, update their tags
          try {
            const emailHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex")
            
            // Update merge fields (name)
            await axios.patch(
              `https://${mailchimpDatacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/${emailHash}`,
              {
                merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName,
                },
              },
              {
                auth: {
                  username: "apikey",
                  password: mailchimpApiKey,
                },
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )

            // Add tags
            await axios.post(
              `https://${mailchimpDatacenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members/${emailHash}/tags`,
              {
                tags: [
                  { name: "web-digitalcanvas", status: "active" },
                  { name: "newsletter-signup", status: "active" },
                  { name: "mxr-rsvp", status: "active" },
                  { name: "join-the-feed", status: "active" },
                ],
              },
              {
                auth: {
                  username: "apikey",
                  password: mailchimpApiKey,
                },
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )

            results.push({
              email,
              name: fullName,
              status: "exists",
              message: "Updated existing member with tags and name",
            })
          } catch (updateError: any) {
            console.error(`Failed to update member ${email}:`, updateError)
            results.push({
              email,
              name: fullName,
              status: "error",
              message: `Update failed: ${updateError.message}`,
            })
          }
        } else {
          results.push({
            email,
            name: fullName,
            status: "error",
            message: response.data?.detail || "Unknown error",
          })
        }
      } catch (error: any) {
        console.error(`Error syncing ${email}:`, error)
        results.push({
          email,
          name: fullName,
          status: "error",
          message: error.message,
        })
      }
    }

    const successCount = results.filter((r) => r.status === "success").length
    const existsCount = results.filter((r) => r.status === "exists").length
    const errorCount = results.filter((r) => r.status === "error").length

    return NextResponse.json({
      message: "Sync completed",
      summary: {
        total: records.length,
        added: successCount,
        updated: existsCount,
        errors: errorCount,
      },
      results,
    })
  } catch (error: any) {
    console.error("Error syncing feed subscribers:", error)
    return NextResponse.json(
      { error: "An error occurred while syncing", details: error.message },
      { status: 500 }
    )
  }
}
