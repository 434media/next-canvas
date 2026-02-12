"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { toPng } from "html-to-image"
import { motion, AnimatePresence } from "motion/react"

/* ─── Speaker Data ─── */
interface Speaker {
  id: string
  name: string
  title: string
  company: string
  image: string
  sessionTitle: string
  description: string
  objectPosition?: string
}

const speakers: Speaker[] = [
  {
    id: "wes-etheredge",
    name: "Wes Etheredge",
    title: "AI, Analytics, and Cloud Leader",
    company: "",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/Wes.jpg",
    sessionTitle: "Key AI Skills for Leaders",
    description:
      "This session introduces a framework for different levels of AI interaction, exploring how to leverage AI as a \"Thought Partner\" and diving into three essential methods leaders must master to align their organizational goals with agentic tools.",
  },
  {
    id: "werner-mendizabal",
    name: "Werner Mendizabal",
    title: "Senior Software Engineer",
    company: "Walt Disney Company",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/werner.jpeg",
    sessionTitle: "Godot Audio Stack",
    description:
      "Building a unified audio ecosystem for Godot: godot-csound for real-time synthesis, godot-lv2-host and godot-vst3-host for loading real audio plugins, and godot-distrho to explore plugin-style workflows. This talk focuses on real-time procedural music, interactive sound design, and using the same instruments in a DAW and in-game.",
  },
  {
    id: "dirce-hernandez",
    name: "Dirce E. Hernandez",
    title: "Cybersecurity, Information Security, and GRC Leader",
    company: "",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/dirce.jpg",
    sessionTitle: "We Can't Do This Without YOU!",
    description:
      "A deep dive into the importance of the unsung heroes of tech—the Security and GRC professionals who were once pushed aside but are now central to the AI revolution. We’ll explore why the relationship between developers and security teams has never been more critical, using Cyber Threat Intelligence as a prime example of why AI development must be a team sport.",
  },
  {
    id: "serena-hernandez",
    name: "Serena Hernandez",
    title: "Product Marketing Manager",
    company: "NMI",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/sayp.jpeg",
    sessionTitle: "Build for the Right Market: GTM Research in the Age of AI",
    description:
      "Every winning go-to-market (GTM) strategy starts with research—but not the slow, outdated kind. In this lightning session, Serena Hernandez shares how she uses software and AI tools like Claude, Gong, Crayon CI, and n8n workflows to transform how product marketing validates markets, understands customer pain points, monitors competitors, and defines ideal customer profiles (ICPs).",
  },
  {
    id: "daniel-ward",
    name: "Daniel Ward",
    title: "Software Consultant",
    company: "Lean TECHniques",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/ward.jpeg",
    sessionTitle: "GitHub Copilot SDK",
    description:
      "What if adding a custom AI agent to your app took less time than your next standup? This session shows you how to go from zero to a working AI agent embedded in your application in 10 minutes or less, live on stage. You'll leave with working knowledge of how to use the GitHub Copilot SDK.",
    objectPosition: "center center",
  },
  {
    id: "jacqueline-suttin",
    name: "Jacqueline Suttin",
    title: "Founder",
    company: "MAGEN Trust",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/jacqueline.jpeg",
    sessionTitle: "Proving Humanity in an Agentic Internet",
    description:
      "As AI agents become capable of writing code, filing forms, scraping systems, and acting autonomously across the web, the internet is quietly losing a foundational assumption: that most traffic is human. We'll explore how MAGEN Trust approaches the problem differently: treating human verification as a dynamic, behavioral, upstream security layer rather than a challenge-response gate.",
    objectPosition: "center center",
  },
  {
    id: "samad-ahmed",
    name: "Samad Ahmed",
    title: "Founder & CEO",
    company: "Chamoy",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/samad.jpeg",
    sessionTitle: "How Do Agents Actually Work?",
    description:
      "Let's build an agent from scratch! We'll implement perception (what can I see?), planning (what should I do?), action (execute safely), memory (what happened before?), and reflection (did it work?), the core loop that makes agents autonomous. Live code showing how these components wire together, when they fail, and how to make them production-ready.",
  },
  {
    id: "angel-escobedo",
    name: "Angel Escobedo",
    title: "Lead Software Developer",
    company: "Webhead",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/angel.jpeg",
    sessionTitle: "What's Left When the Code Writes Itself?",
    description:
      "AI can scaffold a project, write boilerplate, and debug faster than most of us. So what's left? Everything that actually matters. The real shift isn't fewer engineers, it's fewer coding tasks. What remains is architecture, trade-off analysis, system design, and the judgment to know what to build and why.",
    objectPosition: "center center",
  },
  {
    id: "jesse-hernandez",
    name: "Jesse Hernandez",
    title: "Web Developer",
    company: "434 MEDIA",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/hat-jesse-headshot.jpg",
    sessionTitle: "Dream It, Ship It",
    description:
      "Moving from a product idea to a live production environment used to require hours of scaffolding, database configuration, and UI tinkering. Today, that workflow is being compressed into minutes. In this live workshop, we'll explore importing existing GitHub repos, provisioning AWS databases on the fly, and shipping a full-stack React application without ever leaving the v0 interface.",
  },
]

/* ─── Community Spotlight Data ─── */
interface Spotlight {
  id: string
  title: string
  description: string
  image: string
  accentColor: string
  imageBgColor?: string
}

const spotlights: Spotlight[] = [
  {
    id: "acm-utsa",
    title: "ACM UTSA",
    description:
      "Connecting the next generation of talent — from RowdyHacks and Code in Color to ACM-W and Rowdy Cybercon.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/utsa.png",
    accentColor: "#00f2ff",
  },
  {
    id: "ai-april-2",
    title: "AI-April",
    description: "Ai-April is a month of exploring innovation, ethics, and impact of ai. Feat: a showcase, workshops, build nights, and conversations shaping responsible AI in Texas.",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/ai-april.jpg",
    accentColor: "#ff9900",
  },
  {
    id: "pytexas",
    title: "PyTexas Conference",
    description:
      "This year marks the 20th year of the largest gathering of Python developers in Texas. Software development, data science, community, and Python. April 17-19 in Austin TX.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/pytexas.svg",
    accentColor: "#00f2ff",
    imageBgColor: "#ffffff",
  },
  {
    id: "velocicode-2",
    title: "VelociCode II",
    description:
      "The month-long, learning-first game jam hosted by ACM San Antonio in partnership with the Greater Gaming Society — built for folks who want a fun reason to ship a game.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/velocicode.avif",
    accentColor: "#fbbf24",
  },
  {
    id: "chaincraft",
    title: "Chaincraft",
    description:
      "Revolutionizing how we build, own, and monetize gaming.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/chain.jpg",
    accentColor: "#ff9900",
  },
]

/* ─── Aztec SVG Decorations ─── */
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

/* ─── Speaker Card (1080 × 1350) ─── */
function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: 1080,
        height: 1350,
        background: "linear-gradient(170deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
      }}
    >
      {/* ── Background grid ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#ff9900 1px, transparent 1px),
            linear-gradient(90deg, #ff9900 1px, transparent 1px)
          `,
          backgroundSize: "54px 54px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#ff9900]/8 blur-[180px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#00f2ff]/6 blur-[160px]" />

      {/* ── Corner decorations ── */}
      <div className="absolute top-0 left-0">
        <AztecCornerSVG size={96} />
      </div>
      <div className="absolute top-0 right-0 rotate-90">
        <AztecCornerSVG size={96} />
      </div>
      <div className="absolute bottom-0 right-0 rotate-180">
        <AztecCornerSVG size={96} />
      </div>
      <div className="absolute bottom-0 left-0 -rotate-90">
        <AztecCornerSVG size={96} />
      </div>

      {/* ── Outer border frame ── */}
      <div className="absolute inset-1.5 border border-[#262626]" />

      {/* ── Content wrapper ── */}
      <div className="relative flex flex-col h-full">
        {/* ── Top: Event branding bar ── */}
        <div className="flex items-center justify-between px-14 pt-12 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-[3px] w-12 bg-[#ff9900]" />
            <span
              className="uppercase tracking-[0.35em] text-[#737373]"
              style={{ fontSize: 13, fontWeight: 500, fontFamily: "monospace" }}
            >
              Speaker Spotlight
            </span>
          </div>
          <span
            className="uppercase tracking-[0.25em] text-[#525252]"
            style={{ fontSize: 12, fontWeight: 500, fontFamily: "monospace" }}
          >
            Feb 28, 2026 • <span className="text-[#ff9900]">Geekdom</span>
          </span>
        </div>

        {/* ── Speaker image ── */}
        <div className="relative mx-14 overflow-hidden" style={{ height: 620 }}>
          <div className="absolute inset-0 border border-[#333]" />
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover grayscale"
            style={{ objectPosition: speaker.objectPosition || "center top" }}
          />
          {/* Bottom gradient overlay on image */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-linear-to-r from-[#ff9900] via-[#00f2ff] to-[#ff9900]" />
        </div>

        {/* ── Text content ── */}
        <div className="flex flex-col flex-1 px-14 pt-8">
          {/* Session title */}
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-0.5 w-8 bg-[#00f2ff]" />
              <span
                className="uppercase tracking-[0.25em] text-[#00f2ff]"
                style={{ fontSize: 14, fontWeight: 600, fontFamily: "monospace" }}
              >
                Session
              </span>
            </div>
            <h2
              className="text-white uppercase"
              style={{
                fontSize: 40,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "0.025em",
              }}
            >
              {speaker.sessionTitle}
            </h2>
          </div>

          {/* Description */}
          <p
            className="text-[#a3a3a3] mb-6"
            style={{
              fontSize: 19,
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "0.005em",
            }}
          >
            {speaker.description}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Speaker info + Event name footer */}
          <div className="pb-12">
            {/* Separator */}
            <div className="h-px bg-linear-to-r from-[#ff9900]/60 via-[#333] to-transparent mb-6" />

            <div className="flex items-end justify-between">
              <div>
                <h3
                  className="text-white uppercase"
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "0.05em",
                  }}
                >
                  {speaker.name}
                </h3>
                <p
                  className="text-[#737373] mt-2"
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.35,
                  }}
                >
                  {speaker.title}
                  {speaker.company && (
                    <span className="text-[#ff9900]" style={{ fontWeight: 500 }}>
                      {" "}
                      @ {speaker.company}
                    </span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-white uppercase"
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "0.08em",
                  }}
                >
                  More Human
                </p>
                <p
                  className="text-white uppercase"
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "0.08em",
                  }}
                >
                  Than Human
                </p>
                <p
                  className="text-[#525252] uppercase mt-1"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: "0.2em",
                    fontFamily: "monospace",
                  }}
                >
                  Powered by <span className="text-[#ff9900]">DEVSA</span>
                </p>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="mt-6 h-[3px] bg-linear-to-r from-[#ff9900] via-[#00f2ff] to-[#ff9900] opacity-70" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Community Spotlight Card (1080 × 1350) ─── */
function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  const isAccentCyan = spotlight.accentColor === "#00f2ff"
  const secondary = isAccentCyan ? "#ff9900" : "#00f2ff"

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: 1080,
        height: 1350,
        background: "linear-gradient(170deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
      }}
    >
      {/* ── Background grid ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${spotlight.accentColor} 1px, transparent 1px),
            linear-gradient(-45deg, ${secondary} 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="absolute -top-48 -right-32 w-[600px] h-[600px] rounded-full blur-[200px]"
        style={{ background: `${spotlight.accentColor}10` }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[180px]"
        style={{ background: `${secondary}08` }}
      />

      {/* ── Corner decorations ── */}
      <div className="absolute top-0 left-0">
        <AztecCornerSVG size={96} />
      </div>
      <div className="absolute top-0 right-0 rotate-90">
        <AztecCornerSVG size={96} />
      </div>
      <div className="absolute bottom-0 right-0 rotate-180">
        <AztecCornerSVG size={96} />
      </div>
      <div className="absolute bottom-0 left-0 -rotate-90">
        <AztecCornerSVG size={96} />
      </div>

      {/* ── Outer border frame ── */}
      <div className="absolute inset-1.5 border border-[#262626]" />

      {/* ── Content wrapper ── */}
      <div className="relative flex flex-col h-full">
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-14 pt-12 pb-6">
          <div className="flex items-center gap-4">
            <div className="h-[3px] w-12" style={{ background: spotlight.accentColor }} />
            <span
              className="uppercase tracking-[0.35em] text-[#737373]"
              style={{ fontSize: 13, fontWeight: 500, fontFamily: "monospace" }}
            >
              Community Spotlight
            </span>
          </div>
          <span
            className="uppercase tracking-[0.25em] text-[#525252]"
            style={{ fontSize: 12, fontWeight: 500, fontFamily: "monospace" }}
          >
            Feb 28, 2026 • <span className="text-[#ff9900]">Geekdom</span>
          </span>
        </div>

        {/* ── Organization image ── */}
        <div className="relative mx-14 overflow-hidden flex items-center justify-center" style={{ height: 560, backgroundColor: spotlight.imageBgColor || "#141414" }}>
          <div className="absolute inset-0 border border-[#333]" />
          <img
            src={spotlight.image}
            alt={spotlight.title}
            className="max-w-[80%] max-h-[80%] object-contain"
          />
          {/* Top accent line */}
          <div
            className="absolute top-0 inset-x-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, ${spotlight.accentColor}, ${secondary}, ${spotlight.accentColor})`,
            }}
          />
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* ── Text content ── */}
        <div className="flex flex-col flex-1 px-14 pt-10">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="h-0.5 w-8"
              style={{ background: spotlight.accentColor }}
            />
            <span
              className="uppercase tracking-[0.25em]"
              style={{
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "monospace",
                color: spotlight.accentColor,
              }}
            >
              Building Together
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-white uppercase tracking-wide mb-6"
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "0.02em",
            }}
          >
            {spotlight.title}
          </h2>

          {/* Description */}
          <p
            className="text-[#a3a3a3]"
            style={{
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.55,
              letterSpacing: "0.01em",
            }}
          >
            {spotlight.description}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="pb-12">
            <div
              className="h-px mb-6"
              style={{
                background: `linear-gradient(90deg, ${spotlight.accentColor}99, #333, transparent)`,
              }}
            />
            <div className="flex items-end justify-between">
              <div>
                <p
                  className="text-[#525252] uppercase"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    letterSpacing: "0.2em",
                    fontFamily: "monospace",
                  }}
                >
                  Celebrating the communities empowering
                </p>
                <p
                  className="text-[#525252] uppercase"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    letterSpacing: "0.2em",
                    fontFamily: "monospace",
                  }}
                >
                  active learners &amp; builders in San Antonio
                </p>
              </div>
              <div className="text-right">
                <p
                  className="text-white uppercase"
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "0.08em",
                  }}
                >
                  More Human
                </p>
                <p
                  className="text-white uppercase"
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "0.08em",
                  }}
                >
                  Than Human
                </p>
                <p
                  className="text-[#525252] uppercase mt-1"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: "0.2em",
                    fontFamily: "monospace",
                  }}
                >
                    Powered by <span className="text-[#ff9900]">DEVSA</span>
                </p>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div
              className="mt-6 h-[3px] opacity-70"
              style={{
                background: `linear-gradient(90deg, ${spotlight.accentColor}, ${secondary}, ${spotlight.accentColor})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Download helpers ─── */

/** Fetch image via proxy → draw to canvas (baking in grayscale if needed) → return data URL */
async function fetchImageAsDataUrl(
  src: string,
  opts?: { grayscale?: boolean }
): Promise<string> {
  const res = await fetch(`/api/image-proxy?url=${encodeURIComponent(src)}`)
  const blob = await res.blob()
  const bitmap = await createImageBitmap(blob)
  const cvs = document.createElement("canvas")
  cvs.width = bitmap.width
  cvs.height = bitmap.height
  const ctx = cvs.getContext("2d")!
  if (opts?.grayscale) ctx.filter = "grayscale(1)"
  ctx.drawImage(bitmap, 0, 0)
  bitmap.close()
  return cvs.toDataURL("image/png")
}

/**
 * Swap all <img> in an element to data URLs (via proxy), baking in grayscale.
 * Returns a restore function that puts original srcs + filters back.
 */
async function swapImagesToDataUrls(
  element: HTMLElement
): Promise<() => void> {
  const imgs = element.querySelectorAll("img")
  const originals: { img: HTMLImageElement; src: string; filter: string }[] = []

  await Promise.all(
    Array.from(imgs).map(async (img) => {
      const origSrc = img.getAttribute("src") || ""
      if (!origSrc || origSrc.startsWith("data:")) return

      const computed = getComputedStyle(img)
      const hasGrayscale = computed.filter?.includes("grayscale")

      originals.push({
        img,
        src: origSrc,
        filter: img.style.filter,
      })

      try {
        const dataUrl = await fetchImageAsDataUrl(origSrc, {
          grayscale: !!hasGrayscale,
        })
        img.src = dataUrl
        // Remove CSS grayscale since it's now baked into the pixels
        if (hasGrayscale) img.style.filter = "none"
      } catch (e) {
        console.warn("Failed to proxy image:", e)
      }
    })
  )

  // Return a function that restores original srcs and filters
  return () => {
    for (const { img, src, filter } of originals) {
      img.src = src
      img.style.filter = filter
    }
  }
}

function DownloadButton({
  cardRef,
  filename,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>
  filename: string
}) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return
    setDownloading(true)

    let restore: (() => void) | null = null
    try {
      // 1. Swap all <img> on the LIVE element to proxied data URLs
      restore = await swapImagesToDataUrls(cardRef.current)

      // 2. Small delay to let the browser re-paint with new src values
      await new Promise((r) => setTimeout(r, 100))

      const opts = { width: 1080, height: 1350, pixelRatio: 1, cacheBust: true, skipAutoScale: true }

      // 3. First call warms up html-to-image's internal font/style cache
      await toPng(cardRef.current, opts).catch(() => {})

      // 4. Second call produces a reliable capture
      const dataUrl = await toPng(cardRef.current, opts)

      // 5. Trigger download
      const link = document.createElement("a")
      link.download = `${filename}.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Download failed:", err)
    } finally {
      // 6. Always restore original image srcs
      restore?.()
      setDownloading(false)
    }
  }, [cardRef, filename])

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold border border-[#333] text-[#737373] transition-all hover:border-[#ff9900] hover:text-[#ff9900] disabled:opacity-40 disabled:cursor-wait"
    >
      {downloading ? (
        <>
          <svg
            className="animate-spin"
            width="14"
            height="14"
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PNG
        </>
      )}
    </button>
  )
}

/* ─── Card wrapper with ref ─── */
function SpeakerCardWithDownload({ speaker }: { speaker: Speaker }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <span
          className="text-[#525252] uppercase"
          style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.2em" }}
        >
          {speaker.name}
        </span>
        <DownloadButton cardRef={ref} filename={`mhth-speaker-${speaker.id}`} />
      </div>
      <div ref={ref}>
        <SpeakerCard speaker={speaker} />
      </div>
    </div>
  )
}

function SpotlightCardWithDownload({ spotlight }: { spotlight: Spotlight }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <span
          className="text-[#525252] uppercase"
          style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.2em" }}
        >
          {spotlight.title}
        </span>
        <DownloadButton cardRef={ref} filename={`mhth-community-${spotlight.id}`} />
      </div>
      <div ref={ref}>
        <SpotlightCard spotlight={spotlight} />
      </div>
    </div>
  )
}

/* ─── Sponsor / Partner logos for video ─── */
const videoSponsors = [
  {
    name: "v0 by Vercel",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/v0.svg",
    invert: true,
  },
  {
    name: "Lean Techniques",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/lean.png",
    invert: false,
  },
]

const videoPartners = [
  {
    name: "DEVSA TV",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/devsatv-logo.PNG",
    invert: false,
  },
  {
    name: "434 Media",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/434media-light.svg",
    invert: false,
  },
]

/* ─── Hype Video Animation (1080 × 1350, ~55s) ─── */
// Scene timing: 0=title(4s), 1=devsa(3s), 2-10=speakers(3.5s each=31.5s), 11=grid(5s), 12=sponsors(5s), 13=closing(5s) ≈ ~53.5s
const SCENE_DURATIONS = [4000, 3000, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 5000, 5000, 5000]
const TOTAL_SCENES = SCENE_DURATIONS.length

function HypeVideo() {
  const [scene, setScene] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startSequence = useCallback(() => {
    setScene(0)
    setIsPlaying(true)
  }, [])

  const resetSequence = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setScene(-1)
    setIsPlaying(false)
  }, [])

  // Scene advancement
  useEffect(() => {
    if (scene < 0) return
    if (scene >= TOTAL_SCENES) {
      setIsPlaying(false)
      // Stop recording if active
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop()
      }
      return
    }
    timerRef.current = setTimeout(() => setScene((s) => s + 1), SCENE_DURATIONS[scene])
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [scene])

  // Record & Download as WebM
  const startRecording = useCallback(() => {
    if (!canvasRef.current) return
    chunksRef.current = []

    // Use a canvas-based approach: capture the DOM element via a stream
    // We'll use the experimental captureStream on a canvas, but since we have a DOM element,
    // we'll leverage html2canvas frames. Instead, use the simpler approach of MediaRecorder on
    // a canvas that we draw to via getDisplayMedia or element capture.
    // For maximum compatibility, we'll do a requestAnimationFrame loop drawing toPng frames.
    // However, the most practical approach for a DOM animation is to capture via a hidden canvas.

    // Practical approach: use a 2D canvas + drawImage from toPng snapshots
    const el = canvasRef.current
    const width = 1080
    const height = 1350
    const fps = 30
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")!
    const stream = canvas.captureStream(fps)

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm"
    const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 })
    mediaRecorderRef.current = recorder

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "mhth-hype-video.webm"
      a.click()
      URL.revokeObjectURL(url)
      setIsRecording(false)
    }

    recorder.start()
    setIsRecording(true)

    // Start the animation sequence
    setScene(0)
    setIsPlaying(true)

    // Frame capture loop
    let animId: number
    const captureFrame = () => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== "recording") return
      toPng(el, { width, height, pixelRatio: 1 })
        .then((dataUrl) => {
          const img = new Image()
          img.onload = () => {
            ctx.clearRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height)
            animId = requestAnimationFrame(captureFrame)
          }
          img.src = dataUrl
        })
        .catch(() => {
          // skip frame on error
          animId = requestAnimationFrame(captureFrame)
        })
    }
    captureFrame()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {!isPlaying ? (
          <>
            <button
              onClick={startSequence}
              className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold border border-[#ff9900] text-[#ff9900] bg-[#ff9900]/10 transition-all hover:bg-[#ff9900]/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Play
            </button>
            <button
              onClick={startRecording}
              disabled={isRecording}
              className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold border border-[#00f2ff] text-[#00f2ff] bg-[#00f2ff]/10 transition-all hover:bg-[#00f2ff]/20 disabled:opacity-40"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="6" />
              </svg>
              Record &amp; Download
            </button>
          </>
        ) : (
          <button
            onClick={resetSequence}
            className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold border border-[#525252] text-[#737373] transition-all hover:border-[#ff9900] hover:text-[#ff9900]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Reset
          </button>
        )}
        <span
          className="text-[#525252] uppercase"
          style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.2em" }}
        >
          {isRecording
            ? `Recording • Scene ${Math.min(scene + 1, TOTAL_SCENES)} / ${TOTAL_SCENES}`
            : isPlaying
              ? `Scene ${Math.min(scene + 1, TOTAL_SCENES)} / ${TOTAL_SCENES}`
              : "~55 seconds"}
        </span>
      </div>

      {/* Video Canvas */}
      <div
        ref={canvasRef}
        className="relative shrink-0 overflow-hidden"
        style={{
          width: 1080,
          height: 1350,
          background: "#050505",
        }}
      >
        {/* Persistent background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#ff9900 1px, transparent 1px),
              linear-gradient(90deg, #ff9900 1px, transparent 1px)
            `,
            backgroundSize: "54px 54px",
          }}
        />

        {/* Ambient glows */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#ff9900]/8 blur-[180px]"
          animate={{ opacity: isPlaying ? [0.3, 0.8, 0.3] : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#00f2ff]/6 blur-[160px]"
          animate={{ opacity: isPlaying ? [0.2, 0.6, 0.2] : 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 z-10"><AztecCornerSVG size={80} /></div>
        <div className="absolute top-0 right-0 rotate-90 z-10"><AztecCornerSVG size={80} /></div>
        <div className="absolute bottom-0 right-0 rotate-180 z-10"><AztecCornerSVG size={80} /></div>
        <div className="absolute bottom-0 left-0 -rotate-90 z-10"><AztecCornerSVG size={80} /></div>

        {/* ── SCENES ── */}
        <AnimatePresence mode="wait">
          {/* Scene 0: Title Reveal */}
          {scene === 0 && (
            <motion.div
              key="title"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-[3px] bg-linear-to-r from-transparent via-[#ff9900] to-transparent mb-16"
                initial={{ width: 0 }}
                animate={{ width: 700 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.h1
                className="text-white text-center uppercase"
                style={{ fontSize: 108, fontWeight: 900, lineHeight: 0.92, letterSpacing: "0.03em" }}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                More Human
              </motion.h1>
              <motion.h1
                className="text-white text-center uppercase"
                style={{ fontSize: 108, fontWeight: 900, lineHeight: 0.92, letterSpacing: "0.03em" }}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Than Human
              </motion.h1>
              <motion.div
                className="h-[3px] bg-linear-to-r from-transparent via-[#00f2ff] to-transparent mt-16"
                initial={{ width: 0 }}
                animate={{ width: 700 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              />
              <motion.p
                className="text-[#525252] uppercase text-center mt-14"
                style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.35em", fontFamily: "monospace" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                AI Conference • February 28, 2026
              </motion.p>
            </motion.div>
          )}

          {/* Scene 1: Powered by DEVSA */}
          {scene === 1 && (
            <motion.div
              key="subtitle"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="text-[#737373] uppercase text-center"
                style={{ fontSize: 22, fontWeight: 500, letterSpacing: "0.35em", fontFamily: "monospace" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Powered by
              </motion.p>
              <motion.p
                className="text-[#ff9900] uppercase text-center mt-3"
                style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, letterSpacing: "0.08em" }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 180 }}
              >
                DEVSA
              </motion.p>
              <motion.div
                className="flex items-center gap-5 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="h-px w-20 bg-[#333]" />
                <p
                  className="text-[#525252] uppercase text-center"
                  style={{ fontSize: 18, fontWeight: 500, letterSpacing: "0.25em", fontFamily: "monospace" }}
                >
                  Geekdom • San Antonio, TX
                </p>
                <div className="h-px w-20 bg-[#333]" />
              </motion.div>
            </motion.div>
          )}

          {/* Scenes 2–10: Individual speakers — full bleed, alternating slide */}
          {scene >= 2 && scene <= 10 && (() => {
            const s = speakers[scene - 2]
            if (!s) return null
            const fromLeft = (scene - 2) % 2 === 0
            return (
              <motion.div
                key={`speaker-${s.id}`}
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Full-bleed speaker image — slides in from alternating sides */}
                <motion.div
                  className="relative overflow-hidden"
                  style={{ height: 880 }}
                  initial={{ x: fromLeft ? 500 : -500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: fromLeft ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover grayscale"
                    style={{ objectPosition: s.objectPosition || "center top" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-linear-to-r from-[#ff9900] via-[#00f2ff] to-[#ff9900]" />
                  {/* Side accent bar */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-[3px]"
                    style={{
                      [fromLeft ? "left" : "right"]: 0,
                      background: "linear-gradient(180deg, #ff9900, #00f2ff)",
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </motion.div>

                {/* Speaker text — maximized area */}
                <div className="flex flex-col flex-1 px-10 pt-6">
                  <motion.div
                    className="flex items-center gap-3 mb-3"
                    initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <div className="h-0.5 w-10 bg-[#00f2ff]" />
                    <span
                      className="uppercase tracking-[0.25em] text-[#00f2ff]"
                      style={{ fontSize: 15, fontWeight: 600, fontFamily: "monospace" }}
                    >
                      Speaker
                    </span>
                  </motion.div>

                  <motion.h2
                    className="text-white uppercase"
                    style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.0, letterSpacing: "0.03em" }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  >
                    {s.name}
                  </motion.h2>

                  <motion.p
                    className="text-[#737373] mt-3"
                    style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.25 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                  >
                    {s.title}
                    {s.company && (
                      <span className="text-[#ff9900]" style={{ fontWeight: 600 }}>
                        {" "}@ {s.company}
                      </span>
                    )}
                  </motion.p>

                  <div className="flex-1" />

                  <motion.div
                    className="pb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <div className="h-px bg-linear-to-r from-[#ff9900]/60 via-[#333] to-transparent mb-4" />
                    <p
                      className="text-[#a3a3a3] uppercase"
                      style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1, letterSpacing: "0.02em" }}
                    >
                      {s.sessionTitle}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })()}

          {/* Scene 11: Speaker Grid — all speakers collected at bottom */}
          {scene === 11 && (
            <motion.div
              key="grid"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Title area */}
              <div className="flex flex-col items-center pt-12 pb-6">
                <motion.div
                  className="h-[3px] bg-linear-to-r from-transparent via-[#ff9900] to-transparent mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 500 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.h2
                  className="text-white text-center uppercase"
                  style={{ fontSize: 56, fontWeight: 900, lineHeight: 0.95, letterSpacing: "0.04em" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {speakers.length} Speakers
                </motion.h2>
                <motion.p
                  className="text-[#525252] uppercase text-center mt-4"
                  style={{ fontSize: 16, fontWeight: 500, letterSpacing: "0.25em", fontFamily: "monospace" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  February 28, 2026 • Geekdom
                </motion.p>
              </div>

              {/* Speaker grid — 3 columns */}
              <div className="flex-1 px-8 pb-10 grid grid-cols-3 gap-3 content-end">
                {speakers.map((s, i) => (
                  <motion.div
                    key={s.id}
                    className="relative overflow-hidden border border-[#262626]"
                    style={{ aspectRatio: "3/4" }}
                    initial={{ opacity: 0, y: 60, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.45, ease: "easeOut" }}
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover grayscale"
                      style={{ objectPosition: s.objectPosition || "center top" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#050505] via-[#050505]/70 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-2.5">
                      <p
                        className="text-white uppercase"
                        style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.05, letterSpacing: "0.02em" }}
                      >
                        {s.name}
                      </p>
                    </div>
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-[#ff9900] to-[#00f2ff]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scene 12: Sponsors & Partners */}
          {scene === 12 && (
            <motion.div
              key="sponsors"
              className="absolute inset-0 flex flex-col items-center justify-center px-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-[3px] bg-linear-to-r from-transparent via-[#fbbf24] to-transparent mb-12"
                initial={{ width: 0 }}
                animate={{ width: 500 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              <motion.h2
                className="text-white text-center uppercase mb-3"
                style={{ fontSize: 48, fontWeight: 900, lineHeight: 0.95, letterSpacing: "0.04em" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Thank You
              </motion.h2>
              <motion.p
                className="text-[#525252] uppercase text-center mb-14"
                style={{ fontSize: 18, fontWeight: 500, letterSpacing: "0.25em", fontFamily: "monospace" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                To Our Sponsors &amp; Partners
              </motion.p>

              {/* Sponsors */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="h-0.5 w-8 bg-[#fbbf24]" />
                <span
                  className="uppercase tracking-[0.25em] text-[#fbbf24]"
                  style={{ fontSize: 14, fontWeight: 600, fontFamily: "monospace" }}
                >
                  Sponsors
                </span>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-16 mb-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {videoSponsors.map((sp) => (
                  <img
                    key={sp.name}
                    src={sp.logo}
                    alt={sp.name}
                    className={`h-20 w-auto ${sp.invert ? "invert" : ""}`}
                  />
                ))}
              </motion.div>

              {/* Partners */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                <div className="h-0.5 w-8 bg-[#00f2ff]" />
                <span
                  className="uppercase tracking-[0.25em] text-[#00f2ff]"
                  style={{ fontSize: 14, fontWeight: 600, fontFamily: "monospace" }}
                >
                  Partners
                </span>
              </motion.div>
              <motion.div
                className="flex items-center justify-center gap-16 mb-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                {videoPartners.map((pt) => (
                  <img
                    key={pt.name}
                    src={pt.logo}
                    alt={pt.name}
                    className={`h-20 w-auto ${pt.invert ? "invert" : ""}`}
                  />
                ))}
              </motion.div>

              {/* Venue */}
              <motion.p
                className="text-[#525252] uppercase text-center"
                style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.2em", fontFamily: "monospace" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                Hosted at <span className="text-[#ff9900]">Geekdom</span> • San Antonio, TX
              </motion.p>

              <motion.div
                className="h-[3px] bg-linear-to-r from-transparent via-[#fbbf24] to-transparent mt-12"
                initial={{ width: 0 }}
                animate={{ width: 500 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          )}

          {/* Scene 13: Closing */}
          {scene === 13 && (
            <motion.div
              key="closing"
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-[3px] bg-linear-to-r from-transparent via-[#ff9900] to-transparent mb-14"
                initial={{ width: 0 }}
                animate={{ width: 600 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              <motion.h2
                className="text-white text-center uppercase"
                style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: "0.03em" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                More Human
              </motion.h2>
              <motion.h2
                className="text-white text-center uppercase"
                style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.92, letterSpacing: "0.03em" }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                Than Human
              </motion.h2>

              <motion.div
                className="flex items-center gap-5 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="h-px w-16 bg-[#333]" />
                <p
                  className="text-[#525252] uppercase text-center"
                  style={{ fontSize: 18, fontWeight: 500, letterSpacing: "0.25em", fontFamily: "monospace" }}
                >
                  February 28, 2026 • Geekdom • San Antonio
                </p>
                <div className="h-px w-16 bg-[#333]" />
              </motion.div>

              <motion.p
                className="text-[#737373] uppercase text-center mt-10"
                style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.3em", fontFamily: "monospace" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6, 1] }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
              >
                Powered by <span className="text-[#ff9900]">DEVSA</span>
              </motion.p>

              <motion.div
                className="h-[3px] bg-linear-to-r from-transparent via-[#00f2ff] to-transparent mt-14"
                initial={{ width: 0 }}
                animate={{ width: 600 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Not started state */}
        {scene === -1 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-[3px] w-[500px] bg-linear-to-r from-transparent via-[#ff9900]/40 to-transparent mb-14" />
            <p
              className="text-[#525252] uppercase text-center"
              style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.06em" }}
            >
              More Human Than Human
            </p>
            <p
              className="text-[#333] uppercase text-center mt-4"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.25em", fontFamily: "monospace" }}
            >
              Press play to preview • Record &amp; Download for export
            </p>
            <div className="h-[3px] w-[500px] bg-linear-to-r from-transparent via-[#00f2ff]/40 to-transparent mt-14" />
          </div>
        )}

        {/* End state */}
        {scene >= TOTAL_SCENES && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-[3px] w-[400px] bg-linear-to-r from-transparent via-[#ff9900]/40 to-transparent mb-12" />
            <p
              className="text-[#525252] uppercase text-center"
              style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.08em" }}
            >
              Sequence Complete
            </p>
            <p
              className="text-[#333] uppercase text-center mt-3"
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.25em", fontFamily: "monospace" }}
            >
              {isRecording ? "Saving video…" : "Reset to play again"}
            </p>
            <div className="h-[3px] w-[400px] bg-linear-to-r from-transparent via-[#00f2ff]/40 to-transparent mt-12" />
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Page Shell ─── */
export default function SocialCardsPage() {
  const [activeTab, setActiveTab] = useState<"speakers" | "spotlights" | "video">("speakers")

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* ── Controls bar ── */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#222]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h1
              className="text-white uppercase tracking-wider"
              style={{ fontSize: 16, fontWeight: 700, letterSpacing: "0.08em" }}
            >
              Social Media Cards
            </h1>
            <p className="text-[#525252] text-xs mt-0.5" style={{ fontFamily: "monospace" }}>
              1080 × 1350 — Right-click → Save image / Screenshot
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("speakers")}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold border transition-all ${
                activeTab === "speakers"
                  ? "border-[#ff9900] text-[#ff9900] bg-[#ff9900]/10"
                  : "border-[#333] text-[#737373] hover:border-[#555] hover:text-white"
              }`}
            >
              Speakers ({speakers.length})
            </button>
            <button
              onClick={() => setActiveTab("spotlights")}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold border transition-all ${
                activeTab === "spotlights"
                  ? "border-[#00f2ff] text-[#00f2ff] bg-[#00f2ff]/10"
                  : "border-[#333] text-[#737373] hover:border-[#555] hover:text-white"
              }`}
            >
              Community ({spotlights.length})
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold border transition-all ${
                activeTab === "video"
                  ? "border-[#fbbf24] text-[#fbbf24] bg-[#fbbf24]/10"
                  : "border-[#333] text-[#737373] hover:border-[#555] hover:text-white"
              }`}
            >
              Video
            </button>
          </div>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="py-12">
        {activeTab === "speakers" && (
          <div className="flex flex-col items-center gap-16">
            {speakers.map((speaker) => (
              <SpeakerCardWithDownload key={speaker.id} speaker={speaker} />
            ))}
          </div>
        )}

        {activeTab === "spotlights" && (
          <div className="flex flex-col items-center gap-16">
            {spotlights.map((spotlight) => (
              <SpotlightCardWithDownload key={spotlight.id} spotlight={spotlight} />
            ))}
          </div>
        )}

        {activeTab === "video" && (
          <div className="flex flex-col items-center">
            <HypeVideo />
          </div>
        )}
      </div>
    </div>
  )
}
