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
            background: "linear-gradient(to right, #fbbf24, #00f2ff)",
          }}
        />

        {/* Ambient glow left */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "400px",
            height: "500px",
            transform: "translateY(-50%)",
            background: "radial-gradient(ellipse at left, rgba(251,191,36,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Ambient glow right */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            width: "400px",
            height: "500px",
            transform: "translateY(-50%)",
            background: "radial-gradient(ellipse at right, rgba(0,242,255,0.06) 0%, transparent 60%)",
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
            Builders x Bits
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "20px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontSize: "72px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              Human
            </div>
            <div
              style={{
                fontSize: "72px",
                fontWeight: 300,
                color: "#fbbf24",
                lineHeight: 1.1,
                letterSpacing: "0.02em",
              }}
            >
              +
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Stories from the intersection of creativity, community, and
            technology. Real projects. Real people. San Antonio.
          </div>

          {/* Story tags */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            {["MHTH Conference", "The Feed", "DevSA", "Learn2AI", "SDOH Accelerator"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "5px 14px",
                  fontFamily: "monospace",
                }}
              >
                {tag}
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
