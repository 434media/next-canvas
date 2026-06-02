import { NextResponse } from "next/server"

const EVENT_NAME = "More Human Than Human"

/**
 * DECOMMISSIONED — More Human Than Human (Feb 28, 2026) is over and is no
 * longer accepting registrations. This POST handler now returns 410 Gone so
 * lingering integrations get a clear, intentional response and the active
 * Firestore service account can't accidentally write into a closed event.
 *
 * To rebuild a similar one-off registration flow, model it on
 * `app/api/lead-with-ops/register/route.ts`.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: `${EVENT_NAME} is over. Registrations are closed.`,
    },
    { status: 410 },
  )
}
