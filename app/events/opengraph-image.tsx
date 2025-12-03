import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export const runtime = "edge"

export const alt = "Events - Digital Canvas"
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
        backgroundColor: "#0a0a0a",
        position: "relative",
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,100,255,0.15) 0%, transparent 70%)",
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
          style={{ marginBottom: 30, filter: "invert(1)" }}
        />

        {/* Badge */}
        <div
          style={{
            fontSize: 16,
            color: "#888888",
            letterSpacing: "0.3em",
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
            fontSize: 140,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          EVENTS
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "#888888",
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Community experiences and gatherings
        </div>
      </div>

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          right: 60,
          height: 1,
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          right: 60,
          height: 1,
          backgroundColor: "rgba(255,255,255,0.1)",
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
