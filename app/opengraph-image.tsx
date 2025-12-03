import { ImageResponse } from "next/og"

export const alt = "Digital Canvas - The Creative Layer of 434 MEDIA"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
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
          The Creative Layer
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
    },
  )
}
