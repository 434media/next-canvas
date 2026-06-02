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
            background: "linear-gradient(to right, #FF006E, #88FF00)",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,0,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,110,0.04) 1px, transparent 1px)",
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
            background: "radial-gradient(circle, rgba(255,0,110,0.08) 0%, transparent 60%)",
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
                backgroundColor: "#FF006E",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "0.35em",
                color: "#FF006E",
                textTransform: "uppercase",
                fontFamily: "GeistPixel",
              }}
            >
              The Open Onramp
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "72px",
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              marginBottom: "32px",
              maxWidth: "1000px",
              fontFamily: "GeistPixel",
              textTransform: "uppercase",
            }}
          >
            Workshops <span style={{ color: "rgba(255,255,255,0.35)" }}>by Digital Canvas</span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              maxWidth: "800px",
              marginBottom: "36px",
              fontFamily: "monospace",
            }}
          >
            Free, industry-themed workshops hosted by DevSA. The entry point for builders into a Digital Canvas cohort — and the path to demo day in front of an accredited investor audience.
          </div>

          {/* Format badges */}
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FF006E",
                border: "1px solid rgba(255,0,110,0.35)",
                padding: "8px 16px",
                fontFamily: "GeistPixel",
              }}
            >
              <div style={{ width: "6px", height: "6px", backgroundColor: "#FF006E", borderRadius: "50%" }} />
              Free · Industry-Themed
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#88FF00",
                border: "1px solid rgba(136,255,0,0.35)",
                padding: "8px 16px",
                fontFamily: "GeistPixel",
              }}
            >
              <div style={{ width: "6px", height: "6px", backgroundColor: "#88FF00", borderRadius: "50%" }} />
              Cursor · Claude · Codex · Gemini
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
