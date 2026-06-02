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
            background: "linear-gradient(to right, #FF006E, #ffffff, #FF006E)",
          }}
        />

        {/* Scan line effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,110,0.015) 3px, rgba(255,0,110,0.015) 4px)",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(255,0,110,0.10) 0%, transparent 60%)",
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
              For Underwriters
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "76px",
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              marginBottom: "16px",
              maxWidth: "1000px",
              fontFamily: "GeistPixel",
              textTransform: "uppercase",
            }}
          >
            Underwrite a cohort.
          </div>
          <div
            style={{
              fontSize: "56px",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              marginBottom: "36px",
              maxWidth: "1000px",
              fontFamily: "GeistPixel",
              textTransform: "uppercase",
            }}
          >
            Own the vertical.
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              maxWidth: "780px",
              marginBottom: "36px",
              fontFamily: "monospace",
            }}
          >
            Author the painpoints. Source the talent. First-look access to builders solving real problems in your industry, in front of an accredited investor audience.
          </div>

          {/* Vertical tags */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {["Cybersecurity", "Military", "Health · Science", "Education · CPG"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,0,110,0.25)",
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
