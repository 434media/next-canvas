import { NextResponse } from "next/server"
import { runScheduleBatch } from "@/lib/emails/lead-with-ops-schedule"

/**
 * Schedule the "Know Before You Go" (KBYG) email to every registrant of the
 * Lead with Ops. Layer in AI. event using Resend's native `scheduledAt`.
 *
 * Resend holds each email and delivers it at the scheduled moment (default:
 * June 17, 2026 9:00 AM CDT = 14:00 UTC, the day before the event), so the
 * server does not need to be awake at send time. KBYG is transactional event
 * logistics — it goes to ALL registrants regardless of the marketing opt-in.
 *
 * Usage:
 *   POST /api/lead-with-ops/schedule-kbyg?secret=...
 *   POST /api/lead-with-ops/schedule-kbyg?secret=...&dryRun=true   (list only)
 *   POST /api/lead-with-ops/schedule-kbyg?secret=...&at=2026-06-17T14:00:00Z
 *   POST /api/lead-with-ops/schedule-kbyg?secret=...&force=true     (reschedule)
 *
 * Auth reuses LEAD_WITH_OPS_TEST_SECRET. See lib/emails/lead-with-ops-schedule
 * for the shared scheduling + idempotency implementation.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const { status, body } = await runScheduleBatch({
    template: "kbyg",
    secret: searchParams.get("secret"),
    dryRun: searchParams.get("dryRun") === "true",
    force: searchParams.get("force") === "true",
    at: searchParams.get("at"),
  })
  return NextResponse.json(body, { status })
}
