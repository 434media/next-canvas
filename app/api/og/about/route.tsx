import { ImageResponse } from "next/og"

export const runtime = "edge"

const DC_LOGO = "https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"

export async function GET(request: Request) {
  const origin = new URL(request.url).origin
  const fontData = await fetch(`${origin}/fonts/GeistPixel-Square.ttf`).then((r) =>
    r.arrayBuffer()
  )

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
            background: "linear-gradient(to right, #fbbf24, #88FF00, #fbbf24)",
          }}
        />

        {/* Ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Ambient glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(136,255,0,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            padding: "56px 80px 0",
          }}
        >
          <img src={DC_LOGO} alt="Digital Canvas" width={200} height={62} />
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "32px 80px 0",
            flex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#fbbf24",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "0.35em",
                color: "#fbbf24",
                textTransform: "uppercase",
                fontFamily: "GeistPixel",
              }}
            >
              About
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "72px",
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              marginBottom: "16px",
              maxWidth: "1000px",
              fontFamily: "GeistPixel",
              textTransform: "uppercase",
            }}
          >
            Built in San Antonio.
          </div>
          <div
            style={{
              fontSize: "52px",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              marginBottom: "36px",
              maxWidth: "1000px",
              fontFamily: "GeistPixel",
              textTransform: "uppercase",
            }}
          >
            By the partners who run the ecosystem.
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              maxWidth: "880px",
              marginBottom: "36px",
              fontFamily: "monospace",
            }}
          >
            Led by Marcos Resendez — Founder &amp; CEO of 434 Media and angel investor. Operated by DevSA and 434 Media with an accredited investor network as the third pillar.
          </div>

          {/* Partner tags */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {[
              { label: "DevSA", color: "#FF006E" },
              { label: "Capital Partner Network", color: "#fbbf24" },
              { label: "434 Media", color: "#88FF00" },
            ].map((p) => (
              <div
                key={p.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: p.color,
                  border: `1px solid ${p.color}40`,
                  padding: "8px 16px",
                  fontFamily: "GeistPixel",
                }}
              >
                <div style={{ width: "6px", height: "6px", backgroundColor: p.color, borderRadius: "50%" }} />
                {p.label}
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
              fontSize: "13px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              fontFamily: "GeistPixel",
            }}
          >
            digitalcanvas.community
          </div>
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              fontFamily: "GeistPixel",
            }}
          >
            San Antonio · Builder Program
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GeistPixel",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  )
}
