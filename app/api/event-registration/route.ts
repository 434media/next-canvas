import { NextResponse } from "next/server"
import axios from "axios"

const isDevelopment = process.env.NODE_ENV === "development"

// 434 Media API Configuration
const MEDIA_434_API_URL = "https://434media.com/api/public/email-signup"
const MEDIA_434_API_KEY = process.env.EMAIL_SIGNUP_API_KEY

// Event identifier
const EVENT_SOURCE = "MoreHumanThanHuman2026"
const EVENT_TAGS = ["web-digitalcanvas", "event-registration", "mhth-2026"]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, subscribeToFeed } = body

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

    // Build tags array
    const tags = [...EVENT_TAGS]
    if (subscribeToFeed) {
      tags.push("feed-subscriber")
    }

    // Save to 434 Media Firestore
    try {
      const response = await axios.post(
        MEDIA_434_API_URL,
        {
          email: email.toLowerCase().trim(),
          source: EVENT_SOURCE,
          tags: tags,
          metadata: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            fullName: `${firstName.trim()} ${lastName.trim()}`,
            company: company?.trim() || null,
            subscribeToFeed: Boolean(subscribeToFeed),
            registeredAt: new Date().toISOString(),
            event: "More Human Than Human 2026",
            eventDate: "2026-02-28",
          },
          pageUrl: request.headers.get("referer") || undefined,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": MEDIA_434_API_KEY || "",
          },
          validateStatus: (status) => status < 500,
        }
      )

      if (response.status >= 400) {
        console.error("434 Media API error:", response.data)
        
        // Check if it's a duplicate email
        if (response.data?.error?.includes("already") || response.data?.code === "already-exists") {
          return NextResponse.json(
            { error: "This email is already registered for the event" },
            { status: 409 }
          )
        }
        
        return NextResponse.json(
          { error: response.data?.error || "Registration failed" },
          { status: 400 }
        )
      }

      return NextResponse.json(
        {
          message: "Registration successful",
          data: {
            firstName: firstName.trim(),
            email: email.toLowerCase().trim(),
          },
        },
        { status: 200 }
      )
    } catch (apiError) {
      console.error("434 Media API request failed:", apiError)
      
      // In development, still return success for testing
      if (isDevelopment) {
        console.log("Development mode - registration data:", {
          firstName,
          lastName,
          email,
          company,
          subscribeToFeed,
        })
        return NextResponse.json(
          { message: "Registration successful (dev mode)" },
          { status: 200 }
        )
      }
      
      return NextResponse.json(
        { error: "Registration service temporarily unavailable" },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error("Error processing registration:", error)
    return NextResponse.json(
      { error: "An error occurred while processing your registration" },
      { status: 500 }
    )
  }
}
