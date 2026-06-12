"use client"

import { useCallback, useRef } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DigitalCanvasParticles from "../components/hero-particles"

const stages = [
  {
    number: "01",
    label: "Workshop",
    duration: "One weekend",
    description:
      "Free, industry-themed build weekend. Underwriter keynote opens with real pain points. Builders ship working prototypes with AI tools — Cursor, Claude, Codex, Gemini.",
    accent: "#88FF00",
  },
  {
    number: "02",
    label: "Bridge",
    duration: "Six weeks",
    description:
      "Committed builders work from DevSA's downtown coworking. Sponsor office hour, pitch coaching from our investor partners, peer review, investor mixer, dress rehearsal.",
    accent: "#FF006E",
  },
  {
    number: "03",
    label: "Demo Day",
    duration: "One evening",
    description:
      "Curated pitches to an accredited investor audience and partner capital across Texas. Warm room. Follow-up conversations continue organically.",
    accent: "#fbbf24",
  },
]

const doors = [
  {
    number: "01",
    label: "For Builders",
    href: "/builders",
    description:
      "Build something real with AI tools. Pitch real investors. Free workshop. Six-week build bridge. Demo day to an accredited investor audience.",
    cta: "Apply to a cohort",
    accent: "#88FF00",
  },
  {
    number: "02",
    label: "For Underwriters",
    href: "/underwriters",
    description:
      "Author the painpoints. Own the vertical. Source talent. Underwrite a cohort and get first-look access to builders solving real problems in your industry.",
    cta: "Underwrite a vertical",
    accent: "#FF006E",
  },
  {
    number: "03",
    label: "For Investors",
    href: "/demo-days",
    description:
      "Pre-curated dealflow from San Antonio's industry strengths — cyber, military, health and science. Attend demo day. No sourcing cost.",
    cta: "Attend demo day",
    accent: "#fbbf24",
  },
]

const verticals = [
  {
    number: "01",
    name: "Cybersecurity",
    status: "Anchor vertical",
    description:
      "Where SA's tech economy concentrates. 16th Air Force, USAA, JBSA, and the deep contractor ecosystem that surrounds them.",
    accent: "#FF006E",
    opacity: 1,
  },
  {
    number: "02",
    name: "Health · Science",
    status: "On deck",
    description:
      "UT Health, BAMC, military health, the South Texas Medical Center. Regulated, payer-driven, ripe for AI-native tooling.",
    accent: "#fbbf24",
    opacity: 0.85,
  },
  {
    number: "03",
    name: "Aerospace",
    status: "Planned",
    description:
      "Port San Antonio anchors one of the world's largest MRO hubs. Boeing, StandardAero, and Lockheed move airframes through scheduling, supply chain, and documentation work begging for AI-native operators.",
    accent: "#88FF00",
    opacity: 0.65,
  },
  {
    number: "04",
    name: "Agents + Workflows",
    status: "Meta layer",
    description:
      "The meta layer cutting across every vertical. Builders shipping agentic loops, domain RAG, and system-to-system glue that move AI from prototype into production work.",
    accent: "#a3a3a3",
    opacity: 0.45,
  },
]

const whyNowShifts = [
  {
    headline: "AI tools collapsed the build cycle.",
    context:
      "Workshop-week prototypes are demo-day credible. Cursor, Claude, Codex, Gemini.",
  },
  {
    headline: "San Antonio's verticals are under-served.",
    context:
      "Cyber, military, health and science, regulated industries — where SA leads, national accelerators skip.",
  },
  {
    headline: "The infrastructure already operates.",
    context:
      "An accredited investor network plus DevSA's coworking and 20+ tech groups. Digital Canvas is the program layer on top.",
  },
]

const portfolioWork = [
  {
    title: "DevSA × More Human Than Human",
    caption: "San Antonio's premier AI conference at the Pearl",
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/morehuman/DevSA_MoreHuman2026_0313B.mp4",
  },
  {
    title: "SDOH Accelerator",
    caption: "Methodist Healthcare Ministries · $50K accelerator won by InovCares",
    src: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/SDOH%20ACCELERATOR%20PROGRAM%20RECAP_2025.mp4",
  },
  {
    title: "Learn2AI",
    caption: "Prompt engineering and AI strategy programs across SA businesses",
    src: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/Learn2AI%20-%20081825%20G.mp4",
  },
  {
    title: "Alamo Angels",
    caption: "$7M+ deployed · 140+ accredited investors · recap by 434 Media",
    src: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/Alamo%20Angles.mp4",
  },
]

const partners = [
  {
    name: "DevSA",
    role: "Community · Venue · Audience",
    logo: "https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-logo.svg",
    href: "https://www.devsa.community/",
  },
  {
    name: "Alamo Angels",
    role: "Investor Network · Pitch Coaching",
    logo: "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2Fangels-horizontal.png?alt=media",
    href: "https://alamoangels.com/",
  },
  {
    name: "434 Media",
    role: "Program Operator · Underwriter Sales · Media",
    logo: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/434media-light.svg",
    href: "https://434media.com/",
  },
]

export default function Home() {
  // Cursor-following conic-gradient glow on the Hemisfair image.
  // Direct DOM mutation via ref — no re-renders on mousemove.
  const hemisfairGlowRef = useRef<HTMLDivElement>(null)

  const handleHemisfairMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      // Conic-gradient angles measure clockwise from the top (12 o'clock),
      // so rotate atan2 by +90deg to align coordinate systems.
      let cursorAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      if (cursorAngle < 0) cursorAngle += 360
      // The lit arc in the gradient pattern spans 0–45deg with the peak at
      // ~22.5deg, so shift the `from` origin back by half the arc width to
      // keep the brightest point centered on the cursor's bearing.
      const fromAngle = cursorAngle - 22.5

      const el = hemisfairGlowRef.current
      if (el) {
        el.style.setProperty("--glow-angle", `${fromAngle}deg`)
        el.style.opacity = "1"
      }
    },
    [],
  )

  const handleHemisfairLeave = useCallback(() => {
    const el = hemisfairGlowRef.current
    if (el) el.style.opacity = "0"
  }, [])

  return (
    <div>
      <DigitalCanvasParticles />

      {/* Build something real — Hemisfair image anchors the brand moment */}
      <section className="relative bg-[#050505] pt-20 md:pt-28 pb-20 md:pb-28 px-6 overflow-hidden">
        {/* Top fade transitions out of the particles hero */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Eyebrow + headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#88FF00] mb-5">
              San Antonio · Builder Program
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-4xl md:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-tight">
              Build something real.
            </h2>
          </motion.div>

          {/* Hemisfair image — DC drone logo over the Tower of the Americas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="relative w-full max-w-[560px] mx-auto mb-12 md:mb-16"
          >
            <div
              className="relative aspect-1856/2288"
              onMouseMove={handleHemisfairMove}
              onMouseLeave={handleHemisfairLeave}
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2Fdc-hemisfair.jpg?alt=media"
                alt="Digital Canvas wordmark drawn by drones above the Tower of the Americas in San Antonio at night, with a light beam connecting the tower to the wordmark"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-contain mix-blend-screen"
                style={{
                  filter: "grayscale(1) contrast(1.25) brightness(1.05)",
                }}
              />
              {/* Film-grain overlay — bumped to grungy: coarser grain, higher opacity */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-60"
                aria-hidden="true"
              >
                <filter id="dc-hemisfair-grain">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="2"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#dc-hemisfair-grain)" />
              </svg>
              {/* Cursor-following conic-gradient border glow.
                  Two mask layers + intersect composite reveal a 45°-wide arc
                  of the green border, rotated by --glow-angle so the brightest
                  point tracks the pointer. */}
              <div
                ref={hemisfairGlowRef}
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
                style={{
                  border: "2px solid transparent",
                  background: "#88FF00",
                  WebkitMask:
                    "linear-gradient(#0000, #0000), conic-gradient(from var(--glow-angle, 0deg), #0000 0deg, #fff, #0000 45deg)",
                  WebkitMaskClip: "padding-box, border-box",
                  WebkitMaskComposite: "source-in",
                  mask: "linear-gradient(#0000, #0000), conic-gradient(from var(--glow-angle, 0deg), #0000 0deg, #fff, #0000 45deg)",
                  maskClip: "padding-box, border-box",
                  maskComposite: "intersect",
                }}
              />

              {/* Soft outer glow — keeps the image grounded in the dark page bg */}
              <div className="absolute -inset-10 -z-10 bg-white/4 blur-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <p className="text-white/70 text-lg md:text-2xl leading-tight tracking-tight">
              An AI-native cohort program connecting San Antonio talent to
              industry pain points{" "}
              <span className="text-white/30">
                — and the capital that funds them.
              </span>
            </p>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/builders"
              className="group inline-flex items-center justify-between gap-3 bg-[#88FF00] text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
            >
              Apply to a cohort
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/underwriters"
              className="group inline-flex items-center justify-between gap-3 border border-[#FF006E] text-[#FF006E] hover:bg-[#FF006E] hover:text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200"
            >
              Underwrite a vertical
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Program: Workshop → Bridge → Demo Day */}
      <section className="relative bg-[#050505] py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#FF006E] mb-4">
              The Program
            </p>
            <h3 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Workshop. Bridge. Demo Day.{" "}
              <span className="text-white/30 font-medium">
                Seven weeks of focused build, mentorship, and access — ending in
                a room of accredited investors.
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0a0a0a] p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="font-(family-name:--font-geist-pixel-square) text-xs tracking-[0.2em] font-bold"
                    style={{ color: stage.accent }}
                  >
                    {stage.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: stage.accent }}
                  />
                  <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.2em] text-white/30 ml-auto">
                    {stage.duration}
                  </span>
                </div>
                <h4 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                  {stage.label}
                </h4>
                <p className="text-white/40 text-sm leading-[1.75] font-normal">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cohort verticals roadmap */}
      <section
        id="verticals"
        className="relative bg-[#050505] py-20 md:py-28 px-6 border-t border-[#222] scroll-mt-20"
      >
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#FF006E] mb-4">
              Cohort Verticals
            </p>
            <h3 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              San Antonio's economic engines.{" "}
              <span className="text-white/30 font-medium">
                One cohort per vertical, themed by industry-authored painpoints.
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#222] border border-[#222]">
            {verticals.map((vertical, i) => (
              <motion.div
                key={vertical.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: vertical.opacity, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0a0a0a] p-7 md:p-8 flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-(family-name:--font-geist-pixel-square) text-xs tracking-[0.2em] font-bold"
                    style={{ color: vertical.accent }}
                  >
                    {vertical.number}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: vertical.accent }}
                  />
                </div>
                <h4 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.15em] text-white font-bold mb-2">
                  {vertical.name}
                </h4>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
                  style={{ color: vertical.accent }}
                >
                  {vertical.status}
                </p>
                <p className="text-white/40 text-sm leading-[1.7] flex-1">
                  {vertical.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 text-center"
          >
            Cohort cadence and dates announced as underwriters confirm.
          </motion.p>
        </div>
      </section>

      {/* Why now — three structural shifts (light section) */}
      <section className="relative bg-[#f4f4f2] py-20 md:py-28 px-6 border-t border-[#e5e5e3]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#88FF00]" />
              <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/50 font-bold">
                Why Now
              </p>
            </div>
            <h3 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-[#0a0a0a] uppercase tracking-wide leading-tight max-w-3xl">
              Three structural shifts{" "}
              <span className="text-black/40 font-medium">
                make this moment possible.
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whyNowShifts.map((shift, i) => (
              <motion.div
                key={shift.headline}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-black/10 p-6 md:p-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88FF00]" />
                  <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-black/40 font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h4 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.15em] text-[#0a0a0a] leading-snug mb-3">
                  {shift.headline}
                </h4>
                <p className="text-black/55 text-sm leading-[1.7]">
                  {shift.context}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three doors: Builders · Underwriters · Investors */}
      <section className="relative bg-[#050505] py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#fbbf24] mb-4">
              Three Doors
            </p>
            <h3 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Pick your entry.{" "}
              <span className="text-white/30 font-medium">
                Digital Canvas works for builders, underwriters, and investors —
                each with their own onramp.
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {doors.map((door, i) => (
              <motion.div
                key={door.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={door.href}
                  className="group block bg-[#0a0a0a] p-8 md:p-10 h-full transition-colors duration-300 hover:bg-[#111]"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="font-(family-name:--font-geist-pixel-square) text-xs tracking-[0.2em] font-bold"
                      style={{ color: door.accent }}
                    >
                      {door.number}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: door.accent }}
                    />
                  </div>
                  <h4 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                    {door.label}
                  </h4>
                  <p className="text-white/40 text-sm leading-[1.75] font-normal mb-6">
                    {door.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-colors duration-300 group-hover:translate-x-0.5"
                    style={{ color: door.accent }}
                  >
                    {door.cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Powered by — DevSA · Alamo Angels · 434 Media */}
      <section className="relative bg-[#050505] py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-14 text-center"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 mb-4">
              Powered by
            </p>
            <h3 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-2xl uppercase tracking-wide text-white/80 leading-[1.4] max-w-2xl mx-auto">
              The community, capital, and operations that already power San
              Antonio's tech ecosystem.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {partners.map((partner, i) => {
              const cardContent = (
                <>
                  <div className="relative w-32 md:w-40 h-16 mb-5 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className={`object-contain transition-opacity duration-300 opacity-80 group-hover:opacity-100 ${partner.name === "Alamo Angels" ? "scale-110" : ""}`}
                      sizes="160px"
                      unoptimized
                    />
                  </div>
                  <p className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/40">
                    {partner.role}
                  </p>
                </>
              )

              const sharedClass =
                "group bg-[#0a0a0a] p-8 md:p-12 flex flex-col items-center justify-center text-center transition-colors duration-300 hover:bg-[#111]"
              const sharedMotion = {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-60px" },
                transition: { duration: 0.5, delay: i * 0.1 },
              }

              return (
                <motion.a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sharedMotion}
                  className={sharedClass}
                >
                  {cardContent}
                </motion.a>
              )
            })}
          </div>

          {/* Founders credit */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 md:mt-12 text-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/25 mb-3">
              Founded &amp; operated by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              <a
                href="https://www.linkedin.com/in/marcosresendez/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-(family-name:--font-geist-pixel-square) uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors"
              >
                Marcos Resendez
              </a>
              <span className="text-white/20" aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/in/jessebubble/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-(family-name:--font-geist-pixel-square) uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors"
              >
                Jesse Hernandez
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Made by 434 Media — production proof */}
      <section className="relative bg-[#050505] py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#88FF00] mb-4">
              Made by 434 Media
            </p>
            <h3 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Production with receipts.{" "}
              <span className="text-white/30 font-medium">
                The same standard goes into every cohort.
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            {portfolioWork.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="group bg-[#0a0a0a] overflow-hidden"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label={`${item.title} reel produced by 434 Media`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 md:p-8">
                  <h4 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.15em] text-white font-bold mb-2">
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-[1.7]">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-[#050505] py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end"
          >
            <div>
              <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#88FF00] mb-4">
                Get involved
              </p>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-3xl text-white uppercase tracking-wide leading-[1.3]">
                Builders apply.{" "}
                <span className="text-white/30 font-medium">
                  Underwriters claim a vertical. Investors come to demo day.
                </span>
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <Link
                href="/builders"
                className="group inline-flex items-center justify-between gap-3 bg-[#88FF00] text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
              >
                Apply to a cohort
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/underwriters"
                className="group inline-flex items-center justify-between gap-3 border border-[#FF006E] text-[#FF006E] hover:bg-[#FF006E] hover:text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200"
              >
                Underwrite a vertical
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
