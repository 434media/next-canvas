"use client"

import { useRef, useState, useCallback } from "react"
import { toPng } from "html-to-image"

/* ─── Schedule Data ─── */
interface ScheduleItem {
  time: string
  title: string
  speaker: string
  type: "keynote" | "talk" | "lightning" | "community" | "break" | "intro"
}

const schedule: ScheduleItem[] = [
  { time: "1:10 - 1:50", title: "Key AI Skills for Leaders", speaker: "Wes Etheredge", type: "talk" },
  { time: "1:50 - 1:55", title: "ACM UTSA", speaker: "Alekzander Brysch", type: "community" },
  { time: "1:55 - 2:15", title: "How Do Agents Actually Work?", speaker: "Samad Ahmed", type: "talk" },
  { time: "2:15 - 2:35", title: "GitHub Copilot SDK", speaker: "Daniel Ward", type: "talk" },
  { time: "2:35 - 2:40", title: "AI-April", speaker: "Geeks &&", type: "community" },
  { time: "2:40 - 2:55", title: "GTM Research in the Age of AI", speaker: "Serena Hernandez", type: "lightning" },
  { time: "2:55 - 3:15", title: "Godot Audio Stack", speaker: "Werner Mendizabal", type: "talk" },
  { time: "3:15 - 3:20", title: "VelociCode II", speaker: "ACM-SA", type: "community" },
  { time: "3:20 - 3:35", title: "What\u2019s Left When the Code Writes Itself?", speaker: "Angel Escobedo", type: "talk" },
  { time: "3:35 - 3:40", title: "Chaincraft", speaker: "Ryan Beltr\u00e1n", type: "community" },
  { time: "3:40 - 3:45", title: "PyTexas Conference", speaker: "Alamo Python", type: "community" },
  { time: "3:50 - 4:20", title: "We Can\u2019t Do This Without YOU", speaker: "Dirce E. Hernandez", type: "talk" },
  { time: "4:20 - 4:40", title: "Proving Humanity in an Agentic Internet", speaker: "Jacqueline Suttin", type: "talk" },
  { time: "4:40 - 4:45", title: "Dream It, Ship It", speaker: "Jesse Hernandez", type: "lightning" },
]

const scheduleTypeColors: Record<ScheduleItem["type"], string> = {
  keynote: "#fbbf24",
  talk: "#00f2ff",
  lightning: "#ff9900",
  community: "#a78bfa",
  break: "#525252",
  intro: "#34d399",
}

const scheduleTypeLabels: Record<ScheduleItem["type"], string> = {
  keynote: "Keynote",
  talk: "Session",
  lightning: "Lightning",
  community: "Spotlight",
  break: "Break",
  intro: "",
}

/* ─── Aztec Corner SVG ─── */
function AztecCornerSVG({ size = 80 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h6v64H0z" fill="#262626" />
      <path d="M0 0h64v6H0z" fill="#262626" />
      <path d="M12 12h3v20h-3z" fill="#ff9900" opacity="0.7" />
      <path d="M12 12h20v3H12z" fill="#ff9900" opacity="0.7" />
      <path d="M22 22h2v10h-2z" fill="#00f2ff" opacity="0.5" />
      <path d="M22 22h10v2H22z" fill="#00f2ff" opacity="0.5" />
    </svg>
  )
}

/* ─── Schedule Card (1080 × 1350) — rendered off-screen for PNG capture ─── */
function ScheduleCard() {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: 1080,
        height: 1350,
        background: "linear-gradient(170deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#00f2ff 1px, transparent 1px),
            linear-gradient(90deg, #00f2ff 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#00f2ff]/8 blur-[180px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#ff9900]/6 blur-[160px]" />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0"><AztecCornerSVG size={96} /></div>
      <div className="absolute top-0 right-0 rotate-90"><AztecCornerSVG size={96} /></div>
      <div className="absolute bottom-0 right-0 rotate-180"><AztecCornerSVG size={96} /></div>
      <div className="absolute bottom-0 left-0 -rotate-90"><AztecCornerSVG size={96} /></div>

      {/* Outer border frame */}
      <div className="absolute inset-1.5 border border-[#262626]" />

      {/* Content wrapper */}
      <div className="relative flex flex-col h-full">
        {/* Top: Event branding bar */}
        <div className="flex items-center justify-between px-14 pt-10 pb-2">
          <div className="flex items-center gap-4">
            <div className="h-[3px] w-12 bg-[#00f2ff]" />
            <span
              className="uppercase tracking-[0.35em] text-[#737373]"
              style={{ fontSize: 13, fontWeight: 500, fontFamily: "monospace" }}
            >
              Event Schedule
            </span>
          </div>
          <span
            className="uppercase tracking-[0.25em] text-[#737373]"
            style={{ fontSize: 12, fontWeight: 500, fontFamily: "monospace" }}
          >
            Feb 28, 2026 • <span className="text-[#ff9900]">Geekdom</span>
          </span>
        </div>

        {/* Title block */}
        <div className="px-14 pb-4">
          <h2
            className="text-white uppercase"
            style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.05, letterSpacing: "0.03em" }}
          >
            More Human
          </h2>
          <h2
            className="text-white uppercase"
            style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.05, letterSpacing: "0.03em" }}
          >
            Than Human
          </h2>
          <div className="mt-3 h-[3px] bg-linear-to-r from-[#ff9900] via-[#00f2ff] to-[#ff9900] opacity-70" />
        </div>

        {/* Schedule list */}
        <div className="flex-1 px-14 overflow-hidden">
          <div className="flex flex-col gap-0">
            {schedule.map((item, idx) => {
              const color = scheduleTypeColors[item.type]
              const label = scheduleTypeLabels[item.type]
              const isBreak = item.type === "break"

              return (
                <div key={idx}>
                  {idx > 0 && (
                    <div
                      className="h-px"
                      style={{
                        background: isBreak
                          ? "linear-gradient(90deg, #333, #737373, #333)"
                          : "linear-gradient(90deg, #1a1a1a, #262626, #1a1a1a)",
                      }}
                    />
                  )}

                  <div
                    className="flex items-center gap-5"
                    style={{
                      paddingTop: isBreak ? 12 : 9,
                      paddingBottom: isBreak ? 12 : 14,
                    }}
                  >
                    {/* Accent dot */}
                    <div
                      className="shrink-0"
                      style={{ width: 6, height: 6, backgroundColor: color, opacity: 0.9 }}
                    />

                    {/* Time */}
                    <span
                      className="shrink-0"
                      style={{
                        width: 120,
                        fontSize: 15,
                        fontWeight: 700,
                        fontFamily: "monospace",
                        color: "#d4d4d4",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.time}
                    </span>

                    {/* Title + speaker */}
                    <div className="flex-1 min-w-0">
                      <span
                        className="uppercase block"
                        style={{
                          fontSize: isBreak ? 16 : 18,
                          fontWeight: isBreak ? 500 : 800,
                          lineHeight: 1.35,
                          letterSpacing: "0.03em",
                          color: isBreak ? "#737373" : "#f5f5f5",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.title}
                      </span>
                      {item.speaker && (
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            lineHeight: 1.5,
                            color: "#ffad33",
                            fontFamily: "monospace",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.speaker}
                        </span>
                      )}
                    </div>

                    {/* Type badge */}
                    {label && (
                      <span
                        className="shrink-0 uppercase"
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: "monospace",
                          letterSpacing: "0.15em",
                          color,
                          padding: "3px 10px",
                          border: `1px solid ${color}40`,
                          backgroundColor: `${color}15`,
                        }}
                      >
                        {label}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-14 pb-10 pt-3">
          <div className="h-px bg-linear-to-r from-[#ff9900]/60 via-[#333] to-transparent mb-4" />
          <div className="flex items-end justify-between">
            <div>
              <p
                className="uppercase"
                style={{
                  fontSize: 13, fontWeight: 600, lineHeight: 1.5,
                  letterSpacing: "0.2em", fontFamily: "monospace", color: "#737373",
                }}
              >
                1:00 PM • 5:00 PM
              </p>
              <p
                className="uppercase"
                style={{
                  fontSize: 13, fontWeight: 600, lineHeight: 1.5,
                  letterSpacing: "0.2em", fontFamily: "monospace", color: "#737373",
                }}
              >
                Geekdom • San Antonio TX
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-white uppercase"
                style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.1, letterSpacing: "0.08em" }}
              >
                More Human
              </p>
              <p
                className="text-white uppercase"
                style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.1, letterSpacing: "0.08em" }}
              >
                Than Human
              </p>
              <p
                className="text-[#737373] uppercase mt-1"
                style={{
                  fontSize: 11, fontWeight: 500, lineHeight: 1.2,
                  letterSpacing: "0.2em", fontFamily: "monospace",
                }}
              >
                Powered by <span className="text-[#ff9900]">DEVSA</span>
              </p>
            </div>
          </div>
          <div className="mt-4 h-[3px] bg-linear-to-r from-[#00f2ff] via-[#ff9900] to-[#00f2ff] opacity-70" />
        </div>
      </div>
    </div>
  )
}

/* ─── Download Button with Hidden Card ─── */
export function ScheduleDownloadButton() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    setDownloading(true)

    try {
      const opts = { width: 1080, height: 1350, pixelRatio: 1, cacheBust: true, skipAutoScale: true }

      // Warm-up pass for font/style cache
      await toPng(cardRef.current, opts).catch(() => {})

      // Actual capture
      const dataUrl = await toPng(cardRef.current, opts)

      const link = document.createElement("a")
      link.download = "mhth-schedule.png"
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Schedule download failed:", err)
    } finally {
      setDownloading(false)
    }
  }, [])

  return (
    <>
      {/* Off-screen card for PNG capture — must be in DOM but not visible */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 1080,
          height: 1350,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div ref={cardRef}>
          <ScheduleCard />
        </div>
      </div>

      {/* Visible download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex items-center gap-3 border border-[#333] px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[#a3a3a3] transition-all hover:border-[#00f2ff] hover:text-[#00f2ff] hover:bg-[#00f2ff]/5 disabled:opacity-40 disabled:cursor-wait"
      >
        {downloading ? (
          <>
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
            </svg>
            Exporting…
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Schedule
          </>
        )}
      </button>
    </>
  )
}
