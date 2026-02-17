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
            background: "linear-gradient(to right, #ff9900, #fbbf24, #ff9900)",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(255,153,0,0.08) 0%, transparent 60%)",
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
            Human in the Loop
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
            AI Agents
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
            White-label web development powered by structured RAG and the AI
            SDK. Your data, your brand, your customers — our infrastructure.
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "48px",
            }}
          >
            {[
              { value: "100%", label: "Human Governed" },
              { value: "AI SDK", label: "Vercel Foundation" },
              { value: "RAG", label: "Structured Context" },
              { value: "24/7", label: "Always On" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#ff9900",
                    fontFamily: "monospace",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.25)",
                    textTransform: "uppercase",
                    fontFamily: "monospace",
                  }}
                >
                  {stat.label}
                </div>
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
              color: "#ff9900",
              textTransform: "uppercase",
              fontFamily: "monospace",
              opacity: 0.5,
            }}
          >
            Coming Soon
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
