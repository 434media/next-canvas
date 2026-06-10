import { NextResponse } from "next/server"
import { runScheduleBatch } from "@/lib/emails/lead-with-ops-schedule"

/**
 * Schedule the save-the-date reminder to every registrant of the Lead with Ops.
 * Layer in AI. event using Resend's native `scheduledAt`.
 *
 * Resend holds each email and delivers it at the scheduled moment (default:
 * Friday June 12, 2026 12:00 PM CDT = 17:00 UTC, ~6 days before the event), so
 * the server does not need to be awake at send time. The reminder is a light
 * save-the-date nudge — it goes to ALL registrants.
 *
 * Usage:
 *   POST /api/lead-with-ops/schedule-reminder?secret=...
 *   POST /api/lead-with-ops/schedule-reminder?secret=...&dryRun=true   (list only)
 *   POST /api/lead-with-ops/schedule-reminder?secret=...&at=2026-06-12T17:00:00Z
 *   POST /api/lead-with-ops/schedule-reminder?secret=...&force=true     (reschedule)
 *
 * Auth reuses LEAD_WITH_OPS_TEST_SECRET. See lib/emails/lead-with-ops-schedule
 * for the shared scheduling + idempotency implementation.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const { status, body } = await runScheduleBatch({
    template: "reminder",
    secret: searchParams.get("secret"),
    dryRun: searchParams.get("dryRun") === "true",
    force: searchParams.get("force") === "true",
    at: searchParams.get("at"),
  })
  return NextResponse.json(body, { status })
}
