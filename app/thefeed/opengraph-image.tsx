import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export const runtime = "edge"

export const alt = "The Feed - Digital Canvas"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

async function loadLocalFont() {
  const fontPath = join(process.cwd(), "fonts", "Menda-Black.otf")
  const fontData = await readFile(fontPath)
  return fontData
}

export default async function Image() {
  const mendaBlackFont = await loadLocalFont()
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      {/* Dot pattern background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        {/* Digital Canvas Logo */}
        <img
          width="80"
          height="80"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
          style={{ marginBottom: 30 }}
        />

        {/* Badge */}
        <div
          style={{
            fontSize: 16,
            color: "#666666",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Digital Canvas by{" "}
          <span style={{ fontFamily: "Menda Black" }}>434 MEDIA</span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#000000",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          THE FEED
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#666666",
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Stories, updates, and community highlights
        </div>
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundColor: "#000000",
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Menda Black",
          data: mendaBlackFont,
          style: "normal",
          weight: 900,
        },
      ],
    },
  )
}
