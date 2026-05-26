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
            background: "linear-gradient(to right, #a855f7, #00f2ff, #a855f7)",
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
            background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 60%)",
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
            03 · Agents
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
            Autonomous Loops
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
            Wrapping workflows in autonomous loops — compressing weeks of execution into hours. Built with Claude, MCP, and small composable tools.
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
              { value: "100%", label: "Human in the Loop" },
              { value: "AI SDK", label: "Provider Agnostic" },
              { value: "RAG", label: "Structured Retrieval" },
              { value: "30D", label: "Time to First Loop" },
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
                    color: "#a855f7",
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
              color: "#a855f7",
              textTransform: "uppercase",
              fontFamily: "monospace",
              opacity: 0.6,
            }}
          >
            Stories. Transactions. Loops.
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
