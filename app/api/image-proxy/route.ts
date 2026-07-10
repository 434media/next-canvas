import { NextRequest, NextResponse } from "next/server"

// Only proxy images from the hosts this app is actually expected to serve
// (kept in sync with `images.remotePatterns` in next.config). This prevents
// the proxy from being abused for server-side request forgery (SSRF) against
// internal/private endpoints. Entries beginning with "." match subdomains.
const ALLOWED_IMAGE_HOSTS = [
  "storage.googleapis.com",
  "firebasestorage.googleapis.com",
  "devsa-assets.s3.us-east-2.amazonaws.com",
  "v5.airtableusercontent.com",
  "dl.airtable.com",
  ".airtableusercontent.com",
  ".public.blob.vercel-storage.com",
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

  // Host allowlist check, inline so the comparison guards the fetch below.
  // Entries beginning with "." match subdomains (e.g. ".airtableusercontent.com").
  const host = target.hostname.toLowerCase()
  const hostAllowed = ALLOWED_IMAGE_HOSTS.some((allowed) =>
    allowed.startsWith(".") ? host.endsWith(allowed) : host === allowed
  )
  if (!hostAllowed) {
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
