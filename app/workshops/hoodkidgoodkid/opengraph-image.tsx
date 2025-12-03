import { ImageResponse } from "next/og"

export const alt = "Hood Kid Good Kid Workshop"
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
          width="300"
          height="300"
          src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
          style={{ filter: "invert(1)" }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  )
}
