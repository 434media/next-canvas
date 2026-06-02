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
            background: "linear-gradient(to right, #88FF00, #fbbf24, #88FF00)",
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
            background: "radial-gradient(circle, rgba(136,255,0,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Ambient glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(255,0,110,0.06) 0%, transparent 60%)",
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
                backgroundColor: "#88FF00",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "0.35em",
                color: "#88FF00",
                textTransform: "uppercase",
                fontFamily: "GeistPixel",
              }}
            >
              Conferences
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
            Where the ecosystem{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>shows up.</span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              maxWidth: "820px",
              marginBottom: "36px",
              fontFamily: "monospace",
            }}
          >
            Tech conferences powered by the Digital Canvas partner network — anchored by More Human Than Human and the gatherings shaping San Antonio's builder ecosystem.
          </div>

          {/* Conference tags */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {["More Human Than Human", "DevSA", "434 Media"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(136,255,0,0.3)",
                  padding: "8px 14px",
                  fontFamily: "GeistPixel",
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
