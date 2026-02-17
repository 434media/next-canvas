import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Top accent border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(to right, #ff9900, #fbbf24, #ff9900)",
          }}
        />

        {/* Ambient glow — top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(255,153,0,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Ambient glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(0,242,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            flex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              marginBottom: "24px",
              fontFamily: "monospace",
            }}
          >
            Powered by DevSA x Digital Canvas
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              marginBottom: "24px",
            }}
          >
            Quarterly Conferences
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Connecting the San Antonio tech community through quarterly
            conferences, workshops, and cultural events.
          </div>

          {/* Stat pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            {["DevSA", "PySA", "GDG", "Tech Day"].map((label) => (
              <div
                key={label}
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ff9900",
                  border: "1px solid rgba(255,153,0,0.3)",
                  padding: "6px 16px",
                  fontFamily: "monospace",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 80px",
            borderTop: "1px solid #222",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            digitalcanvas.community
          </div>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            San Antonio, TX
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
