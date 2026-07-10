import { NextRequest, NextResponse } from "next/server"

// Only proxy images from the exact hosts this app is expected to serve
// (a subset of `images.remotePatterns` in next.config). This prevents the
// proxy from being abused for server-side request forgery (SSRF) against
// internal/private endpoints. Exact-match membership only — no wildcards — so
// the allowlist is an effective barrier and cannot be widened by a lookalike
// suffix (e.g. "evil-airtableusercontent.com").
const ALLOWED_IMAGE_HOSTS = [
  "storage.googleapis.com",
  "firebasestorage.googleapis.com",
  "devsa-assets.s3.us-east-2.amazonaws.com",
  "v5.airtableusercontent.com",
  "dl.airtable.com",
]

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url")
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  // Parse and validate the URL inline, then fetch the parsed URL object — the
  // exact value gated by the host allowlist below. Fetching the parsed object
  // (rather than the raw string) keeps the request target bound to a value that
  // has passed the host check, preventing SSRF to arbitrary/internal hosts.
  let target: URL
  try {
    target = new URL(rawUrl)
  } catch {
    return NextResponse.json({ error: "Invalid url parameter" }, { status: 400 })
  }

  // Block non-web schemes (file:, data:, gopher:, etc.).
  if (target.protocol !== "https:") {
    return NextResponse.json({ error: "URL host not allowed" }, { status: 400 })
  }

  // Exact-match host allowlist, inline so it guards the fetch below.
  const host = target.hostname.toLowerCase()
  if (!ALLOWED_IMAGE_HOSTS.includes(host)) {
    return NextResponse.json({ error: "URL host not allowed" }, { status: 400 })
  }

  try {
    const response = await fetch(target)
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: response.status })
    }

    const blob = await response.arrayBuffer()
    const contentType = response.headers.get("Content-Type") || "image/jpeg"

    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch {
    return NextResponse.json({ error: "Proxy fetch failed" }, { status: 500 })
  }
}
