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
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(to right, #ff9900, #00f2ff)",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,153,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "600px",
            height: "600px",
            transform: "translateX(-50%)",
            background: "radial-gradient(circle, rgba(255,153,0,0.06) 0%, transparent 60%)",
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
            Workshops & Outreach
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
            Two Ways to Build
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
            Hands-on workshops for the San Antonio tech community — and
            partnerships with companies who want to do the same.
          </div>

          {/* Track badges */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#ff9900",
                border: "1px solid rgba(255,153,0,0.3)",
                padding: "6px 16px",
                fontFamily: "monospace",
              }}
            >
              <div style={{ width: "6px", height: "6px", backgroundColor: "#ff9900", borderRadius: "50%" }} />
              Track 01 — Community
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#00f2ff",
                border: "1px solid rgba(0,242,255,0.3)",
                padding: "6px 16px",
                fontFamily: "monospace",
              }}
            >
              <div style={{ width: "6px", height: "6px", backgroundColor: "#00f2ff", borderRadius: "50%" }} />
              Track 02 — Sponsored
            </div>
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
            Digital Canvas Community
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
