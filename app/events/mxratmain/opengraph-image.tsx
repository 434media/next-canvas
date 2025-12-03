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
          width="300"
          height="300"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
        />
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
