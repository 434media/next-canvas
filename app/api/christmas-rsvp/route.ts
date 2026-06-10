import { NextResponse } from "next/server"

const EVENT_NAME = "Vanita Leo Christmas"

/**
 * DECOMMISSIONED — The Vanita Leo Christmas event has passed and is no
 * longer accepting registrations. This POST handler returns 410 Gone so any
 * lingering integrations get a clear, intentional response.
 *
 * The original implementation depended on Airtable, which has been fully
 * removed from this project. The Digital Canvas Firestore database is now
 * the single source of truth for all event capture; new one-off events
 * should model on `app/api/lead-with-ops/register/route.ts`.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: `${EVENT_NAME} is over. RSVPs are closed.`,
    },
    { status: 410 },
  )
}
