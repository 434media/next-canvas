import { ImageResponse } from "next/og"

export const alt = "MXR@MAIN - Christmas Party"
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
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      {/* Decorative Christmas elements */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "#c41e3a",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: "#228b22",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 100,
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#ffd700",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 50,
          width: 70,
          height: 70,
          borderRadius: "50%",
          backgroundColor: "#c41e3a",
          opacity: 0.8,
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
          width="70"
          height="70"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
          style={{ marginBottom: 20 }}
        />

        {/* Event type badge */}
        <div
          style={{
            fontSize: 18,
            color: "#228b22",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          Christmas Party 2024
        </div>

        {/* MXR text */}
        <div
          style={{
            fontSize: 160,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#c41e3a",
            textAlign: "center",
            lineHeight: 0.85,
          }}
        >
          MXR
        </div>

        {/* @MAIN text */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "#228b22",
            textAlign: "center",
            lineHeight: 1,
            marginTop: -10,
          }}
        >
          @MAIN
        </div>

        {/* Date and location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 30,
            fontSize: 22,
            color: "#666666",
          }}
        >
          <span>December 19, 2024</span>
          <span style={{ color: "#c41e3a" }}>•</span>
          <span>San Antonio, TX</span>
        </div>
      </div>

      {/* Bottom ribbon accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "linear-gradient(90deg, #c41e3a, #228b22, #c41e3a)",
        }}
      />
    </div>,
    {
      ...size,
    },
  )
}
