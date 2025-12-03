import { ImageResponse } from "next/og"
import { readFile } from "fs/promises"
import { join } from "path"

export const runtime = "edge"

export const alt = "Hood Kid Good Kid Workshop"
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
        position: "relative",
      }}
    >
      {/* Red accent stripes - Run-DMC style */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 20,
          background: "#dc143c",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 20,
          background: "#dc143c",
        }}
      />

      {/* Side stripes */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          bottom: 20,
          width: 20,
          background: "#dc143c",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 0,
          bottom: 20,
          width: 20,
          background: "#dc143c",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Digital Canvas Logo */}
        <img
          width="70"
          height="70"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
          style={{ marginBottom: 20, filter: "invert(1)" }}
        />

        {/* Badge */}
        <div
          style={{
            fontSize: 16,
            color: "#dc143c",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontWeight: 700,
          }}
        >
          <span style={{ fontFamily: "Menda Black" }}>434 MEDIA</span> Workshop
        </div>

        {/* HOOD KID */}
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          HOOD KID
        </div>

        {/* GOOD KID */}
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "#dc143c",
            textAlign: "center",
            lineHeight: 1,
            marginTop: 10,
          }}
        >
          GOOD KID
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#888888",
            marginTop: 30,
            textAlign: "center",
            letterSpacing: "0.05em",
          }}
        >
          Creative Workshop Experience
        </div>
      </div>
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
