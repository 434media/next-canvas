import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Digital Canvas Workshops"
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
        backgroundColor: "#0a0a0a",
        position: "relative",
      }}
    >
      {/* Diagonal stripes background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.02) 35px, rgba(255,255,255,0.02) 70px)",
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
        {/* Badge */}
        <div
          style={{
            fontSize: 18,
            color: "#666666",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
            padding: "8px 24px",
            border: "1px solid #333333",
            borderRadius: 4,
          }}
        >
          Digital Canvas
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          WORKSHOPS
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#888888",
            marginTop: 30,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Creative experiences and hands-on learning
        </div>
      </div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 60,
          height: 60,
          borderTop: "3px solid #ffffff",
          borderLeft: "3px solid #ffffff",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 60,
          height: 60,
          borderBottom: "3px solid #ffffff",
          borderRight: "3px solid #ffffff",
        }}
      />
    </div>,
    {
      ...size,
    },
  )
}
