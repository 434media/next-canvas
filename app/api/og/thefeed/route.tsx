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
            background: "linear-gradient(to right, #00f2ff, #ff9900)",
          }}
        />

        {/* Scan line effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,242,255,0.01) 3px, rgba(0,242,255,0.01) 4px)",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "30%",
            width: "500px",
            height: "400px",
            background: "radial-gradient(ellipse at bottom, rgba(0,242,255,0.06) 0%, transparent 60%)",
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
            Content Hub
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              marginBottom: "24px",
            }}
          >
            The Feed
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Curated content from Digital Canvas — articles, videos, and resources
            at the intersection of creativity and technology.
          </div>

          {/* Type badges */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "40px",
            }}
          >
            {[
              { label: "Articles", color: "#ff9900" },
              { label: "Videos", color: "#00f2ff" },
              { label: "Resources", color: "#fbbf24" },
            ].map((type) => (
              <div
                key={type.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: type.color,
                  border: `1px solid ${type.color}33`,
                  padding: "5px 14px",
                  fontFamily: "monospace",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: type.color,
                    borderRadius: "50%",
                  }}
                />
                {type.label}
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
            Digital Canvas
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
