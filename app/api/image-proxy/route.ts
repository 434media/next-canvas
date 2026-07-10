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

function isAllowedImageUrl(raw: string): boolean {
  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    return false
  }
  // Block non-web schemes (file:, data:, gopher:, etc.).
  if (parsed.protocol !== "https:") return false

  const host = parsed.hostname.toLowerCase()
  return ALLOWED_IMAGE_HOSTS.some((allowed) =>
    allowed.startsWith(".") ? host.endsWith(allowed) : host === allowed
  )
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 })
  }

  if (!isAllowedImageUrl(url)) {
    return NextResponse.json({ error: "URL host not allowed" }, { status: 400 })
  }

  try {
    const response = await fetch(url)
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
