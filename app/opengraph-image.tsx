import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export const runtime = "edge"

export const alt = "Digital Canvas - The Creative Layer of 434 MEDIA"
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
        backgroundColor: "#000000",
        backgroundImage: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
        position: "relative",
      }}
    >
      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
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
          width="120"
          height="120"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
          style={{
            marginBottom: 30,
            filter: "invert(1)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          DIGITAL
        </div>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1,
            marginTop: -10,
          }}
        >
          CANVAS
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#888888",
            marginTop: 30,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          The Creative Layer of{" "}
          <span style={{ fontFamily: "Menda Black" }}>434 MEDIA</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg, #ff0000, #ffffff, #0066ff)",
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
