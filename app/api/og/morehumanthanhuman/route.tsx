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
        {/* Top Aztec border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(to right, #fbbf24, #ff9900, #fbbf24)",
          }}
        />

        {/* Bottom Aztec border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(to right, #fbbf24, #ff9900, #fbbf24)",
          }}
        />

        {/* Aztec corner decorations */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "80px",
            height: "80px",
            borderLeft: "8px solid #333",
            borderTop: "8px solid #333",
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              width: "40px",
              height: "40px",
              borderLeft: "4px solid #fbbf24",
              borderTop: "4px solid #fbbf24",
              opacity: 0.6,
            }}
          />
        </div>
        
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "80px",
            height: "80px",
            borderRight: "8px solid #333",
            borderTop: "8px solid #333",
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "40px",
              height: "40px",
              borderRight: "4px solid #fbbf24",
              borderTop: "4px solid #fbbf24",
              opacity: 0.6,
            }}
          />
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            width: "80px",
            height: "80px",
            borderLeft: "8px solid #333",
            borderBottom: "8px solid #333",
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              width: "40px",
              height: "40px",
              borderLeft: "4px solid #fbbf24",
              borderBottom: "4px solid #fbbf24",
              opacity: 0.6,
            }}
          />
        </div>
        
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "80px",
            height: "80px",
            borderRight: "8px solid #333",
            borderBottom: "8px solid #333",
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              width: "40px",
              height: "40px",
              borderRight: "4px solid #fbbf24",
              borderBottom: "4px solid #fbbf24",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px",
            textAlign: "center",
          }}
        >
          {/* Event title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-1px",
              lineHeight: 0.95,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#fbbf24" }}>More Human</span>
            <span style={{ color: "#ffffff", marginTop: "8px" }}>Than Human</span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#a3a3a3",
              marginTop: "24px",
              marginBottom: "0",
              textAlign: "center",
              maxWidth: "900px",
              lineHeight: 1.5,
            }}
          >
            As AI shifts from a tool we use to an agent that acts, the boundary between human and machine is disappearing.
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#ff9900",
              marginTop: "16px",
              marginBottom: "0",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            We aren&apos;t just talking about the future — we&apos;re demonstrating it.
          </p>

          {/* Session topics */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "32px",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "900px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#00f2ff",
                padding: "6px 12px",
                border: "1px solid #00f2ff",
                backgroundColor: "rgba(0, 242, 255, 0.1)",
              }}
            >
              Build Agents from Scratch
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#00f2ff",
                padding: "6px 12px",
                border: "1px solid #00f2ff",
                backgroundColor: "rgba(0, 242, 255, 0.1)",
              }}
            >
              GitHub Copilot SDK
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#00f2ff",
                padding: "6px 12px",
                border: "1px solid #00f2ff",
                backgroundColor: "rgba(0, 242, 255, 0.1)",
              }}
            >
              AI Security
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#00f2ff",
                padding: "6px 12px",
                border: "1px solid #00f2ff",
                backgroundColor: "rgba(0, 242, 255, 0.1)",
              }}
            >
              AI Leadership
            </span>
          </div>

          {/* Event details */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "28px",
              padding: "12px 28px",
              border: "1px solid #333",
              backgroundColor: "#111",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#a3a3a3",
              }}
            >
              AI Conference
            </span>
            <span style={{ color: "#333" }}>•</span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              February 28, 2026
            </span>
            <span style={{ color: "#333" }}>•</span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#a3a3a3",
              }}
            >
              Geekdom, San Antonio
            </span>
          </div>

          {/* Powered by */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "40px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#525252",
              }}
            >
              Powered by
            </span>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#737373",
                letterSpacing: "4px",
              }}
            >
              DEVSA
            </span>
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
