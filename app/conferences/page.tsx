"use client"

import { useState, useEffect, useRef, useCallback, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ArrowRight } from "lucide-react"
import Link from "next/link"

// Media items from DevSA conferences — images and video from real events
const mediaItems = [
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6350.jpg", alt: "DevSA Community Space" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/gdg.jpg", alt: "GDG San Antonio Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa7.jpg", alt: "PySanAntonio Conference" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday.jpg", alt: "DevSA Tech Day" },
  { type: "video" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6956.MOV", poster: undefined, alt: "DevSA Community Space" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay1.JPG", alt: "DevSA Replay Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_7186.jpg", alt: "DevSA Community" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_1484.jpg", alt: "DevSA Community Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa8.jpg", alt: "PySanAntonio Conference" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/gdg4.jpg", alt: "GDG San Antonio" },
  { type: "video" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa3.mov", poster: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa.jpg", alt: "PySanAntonio Conference" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday2.jpg", alt: "DevSA Tech Day" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_5061.jpg", alt: "DevSA Community Space" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_2756.jpg", alt: "DevSA Community" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay7.jpg", alt: "DevSA Replay Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa5.jpg", alt: "PySanAntonio Conference" },
  { type: "video" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6982.mov", poster: undefined, alt: "DevSA Collaboration" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_5006.jpg", alt: "DevSA Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday4.JPG", alt: "DevSA Tech Day" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6429.jpg", alt: "DevSA Community" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4427.jpg", alt: "DevSA Community Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa.jpg", alt: "PySanAntonio After Party" },
  { type: "video" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa2.mov", poster: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa-mauricio.png", alt: "PySanAntonio Speaker" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay9.jpg", alt: "DevSA Replay Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4381.jpg", alt: "DevSA Community" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday5.jpg", alt: "DevSA Tech Day" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_3385.jpg", alt: "DevSA Event" },
  { type: "video" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa6.MOV", poster: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa3.jpg", alt: "PySanAntonio Conference" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay13.jpg", alt: "DevSA Replay Event" },
  { type: "image" as const, src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4665.jpg", alt: "DevSA Community Event" },
]

// ── Detect mobile vs desktop ──────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true) // default mobile-first for SSR safety
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setIsMobile(!mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return isMobile
}

/* ═══════════════════════════════════════════════════════════════
   DESKTOP — Original implementation (untouched)
   6 rows, 4x duplication, RAF scrolling, videos with autoPlay
   ═══════════════════════════════════════════════════════════════ */

const DESKTOP_ROWS = 6
const DESKTOP_ITEMS_PER_ROW = Math.ceil(mediaItems.length / DESKTOP_ROWS)
const desktopRows: (typeof mediaItems)[] = Array.from({ length: DESKTOP_ROWS }, (_, i) =>
  mediaItems.slice(i * DESKTOP_ITEMS_PER_ROW, (i + 1) * DESKTOP_ITEMS_PER_ROW)
).map(row => row.length > 0 ? row : mediaItems.slice(0, DESKTOP_ITEMS_PER_ROW))

function DesktopScrollingRow({ items, direction, speed }: { items: typeof mediaItems; direction: "left" | "right"; speed: number }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    let raf: number
    let pos = direction === "left" ? 0 : el.scrollWidth / 2

    const animate = () => {
      if (direction === "left") {
        pos += speed
        if (pos >= el.scrollWidth / 2) pos = 0
      } else {
        pos -= speed
        if (pos <= 0) pos = el.scrollWidth / 2
      }
      el.scrollLeft = pos
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    const pause = () => cancelAnimationFrame(raf)
    const resume = () => { raf = requestAnimationFrame(animate) }

    el.addEventListener("mouseenter", pause)
    el.addEventListener("mouseleave", resume)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("mouseenter", pause)
      el.removeEventListener("mouseleave", resume)
    }
  }, [direction, speed])

  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div
      ref={scrollRef}
      className="flex gap-3 overflow-x-hidden"
      style={{ scrollBehavior: "auto" }}
    >
      {repeated.map((item, i) => (
        <div
          key={`${item.src}-${i}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#111]"
        >
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.poster}
              muted
              autoPlay
              loop
              playsInline
              className="h-full w-full object-cover rounded-xl"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover rounded-xl"
            />
          )}
        </div>
      ))}
    </div>
  )
}

function DesktopScrollingGrid() {
  return (
    <div className="space-y-3 py-4">
      {desktopRows.map((rowItems, idx) => (
        <DesktopScrollingRow
          key={idx}
          items={rowItems}
          direction={idx % 2 === 0 ? "left" : "right"}
          speed={0.25 + idx * 0.05}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE — Optimized for low-end devices
   4 rows, 2x duplication, CSS animation (GPU-composited),
   no videos, skeleton placeholders, IntersectionObserver,
   decoding="async", will-change, reactive reduced-motion
   ═══════════════════════════════════════════════════════════════ */

const MOBILE_ROWS = 4
const MOBILE_ITEMS_PER_ROW = Math.ceil(mediaItems.length / MOBILE_ROWS)
const mobileRows: (typeof mediaItems)[] = Array.from({ length: MOBILE_ROWS }, (_, i) =>
  mediaItems.slice(i * MOBILE_ITEMS_PER_ROW, (i + 1) * MOBILE_ITEMS_PER_ROW)
).map(row => row.length > 0 ? row : mediaItems.slice(0, MOBILE_ITEMS_PER_ROW))

// Image tile with skeleton placeholder and fade-in
function MobileTile({ item }: { item: (typeof mediaItems)[number] }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  const handleLoad = useCallback(() => setLoaded(true), [])

  // For video items, show the poster image (or a fallback) instead of loading the video
  const imgSrc = item.type === "video"
    ? (item.poster || item.src)
    : item.src

  return (
    <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl bg-[#111]">
      {!loaded && (
        <div className="absolute inset-0 rounded-xl bg-[#1a1a1a] animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={imgSrc}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        className={`h-full w-full object-cover rounded-xl transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  )
}

// CSS-animated row — GPU-composited, no JS animation loop
function MobileScrollingRow({ items, direction, speed }: { items: typeof mediaItems; direction: "left" | "right"; speed: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // IntersectionObserver — pause animation for off-screen rows
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Reactive prefers-reduced-motion listener
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const shouldAnimate = isVisible && !prefersReducedMotion
  const duration = Math.round(items.length * (6 / speed))

  // 2x duplication (instead of 4x) — CSS translateX(-50%) loops seamlessly
  const repeated = [...items, ...items]

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-3 w-max"
        style={{
          willChange: shouldAnimate ? "transform" : "auto",
          animation: shouldAnimate
            ? `scroll-${direction} ${duration}s linear infinite`
            : "none",
        }}
      >
        {repeated.map((item, i) => (
          <MobileTile key={`${item.src}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

function MobileScrollingGrid() {
  return (
    <div className="space-y-3 py-4">
      {mobileRows.map((rowItems, idx) => (
        <MobileScrollingRow
          key={idx}
          items={rowItems}
          direction={idx % 2 === 0 ? "left" : "right"}
          speed={0.25 + idx * 0.05}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Adaptive grid — renders the right variant per breakpoint
   ═══════════════════════════════════════════════════════════════ */
function ScrollingGrid() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileScrollingGrid /> : <DesktopScrollingGrid />
}

/* ── MHTH Popup CTA ─────────────────────────────────────────── */
function MHTHPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem("mhth-conf-popup-dismissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }
    const timer = setTimeout(() => setIsVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem("mhth-conf-popup-dismissed", "true")
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50 w-80 sm:w-90"
        >
          <div className="relative border border-[#333] bg-[#111] shadow-2xl shadow-black/50 overflow-hidden">
            {/* Close */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 z-10 p-1.5 text-[#666] hover:text-white hover:bg-[#333] transition-colors"
              aria-label="Dismiss popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff9900] via-[#fbbf24] to-[#ff9900]" />

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[#ff9900]/30 bg-[#ff9900]/10">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="https://devsa-assets.s3.us-east-2.amazonaws.com/HEAD_v01.mp4" type="video/mp4" />
                  </video>
                </div>
                <div>
                  <p className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-wider text-[#666] mb-1">
                    Upcoming Conference
                  </p>
                  <h3 className="text-base font-bold text-white leading-tight">
                    More Human Than Human
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#999] leading-relaxed mb-4 line-clamp-2">
                Join San Antonio's builders, dreamers, and technologist as we explore how AI is transforming the way we write code, test, automate, and ship.
              </p>

              <div className="flex items-center justify-between">
                <p className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-wider text-[#666]">
                  Feb 28, 2026
                </p>
                <Link
                  href="/conferences/morehumanthanhuman"
                  onClick={handleDismiss}
                  className="inline-flex items-center gap-2 bg-[#fbbf24] text-[#0a0a0a] font-semibold text-xs uppercase tracking-wider px-4 py-2 hover:bg-[#ff9900] transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ConferencesPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState("submitting")
    setErrorMessage("")

    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      source: "conferences",
    }

    try {
      const res = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Something went wrong")
      }

      setFormState("success")
      form.reset()
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong")
      setFormState("error")
    }
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* MHTH Popup CTA */}
      <MHTHPopup />

      {/* Hero — Scrolling media grid */}
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        {/* Heading — overlaid on the top-left like Shopify */}
        <div className="relative z-20 container mx-auto px-6 pt-28 md:pt-36 pb-0">
          <motion.div
            className="max-w-lg md:max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#ff9900] block mb-4">
              Powered by DevSA x 434 MEDIA
            </span>
            <h1 className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide leading-tight mb-6">
              Quarterly Conferences
            </h1>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
              Every quarter, DEVSA x 434 MEDIA bring together hundreds of developers, designers, and technologists from across all industries for hands-on sessions, lightning talks, and real community.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/conferences/morehumanthanhuman"
                className="inline-flex items-center gap-3 bg-[#ff9900] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-3 px-6 transition-all hover:bg-[#fbbf24] hover:scale-[1.02]"
              >
                More Human Than Human
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scrolling grid — adaptive: desktop (original) / mobile (optimized) */}
        <div
          aria-label="Scrolling animation showcasing DevSA conference and event photos"
          className="relative group mt-10 md:mt-14 w-full mb-px"
        >
          <ScrollingGrid />

          {/* Edge fades */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-1/4 z-10 bg-linear-to-b from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/4 z-10 bg-linear-to-t from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 md:w-48 z-10 bg-linear-to-r from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 md:w-48 z-10 bg-linear-to-l from-[#0a0a0a] to-transparent" />

          {/* Hover spotlight radial glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none mix-blend-darken transition-opacity duration-1000 opacity-0 group-hover:opacity-60"
            style={{ background: "radial-gradient(circle at 50% 50%, white, rgb(10, 10, 10) 30%)" }}
          />
        </div>
      </section>

      {/* Sponsor CTA */}
      <section className="relative py-20 px-6" id="sponsor">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              Interested in Sponsoring?
            </h2>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#ff9900] to-[#00f2ff] opacity-60 mb-8" />
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Partner with Digital Canvas to support San Antonio&apos;s thriving tech community and gain visibility among hundreds of local technologists across all industries.
            </p>
          </motion.div>

          {formState === "success" ? (
            <motion.div
              className="border border-[#ff9900]/40 bg-[#ff9900]/5 p-8 md:p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex w-12 h-12 border-2 border-[#ff9900] mb-6 items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-lg text-white uppercase tracking-wide mb-3">
                Message Sent
              </h3>
              <p className="text-white/60 text-sm">
                Thank you for your interest! We&apos;ll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="border border-[#333] bg-[#111] p-8 md:p-12 space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
                  placeholder="Acme Corp"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors placeholder:text-white/20"
                    placeholder="(210) 555-0100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#ff9900] transition-colors resize-none placeholder:text-white/20"
                  placeholder="Tell us which conference you're interested in sponsoring, your goals, and how we can help..."
                />
              </div>

              {formState === "error" && (
                <p className="text-red-400 text-sm font-(family-name:--font-geist-pixel-square)">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full bg-linear-to-r from-[#ff9900] to-[#fbbf24] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-4 px-8 transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? "Sending..." : "Contact Us to Sponsor"}
              </button>

              <p className="text-white/30 text-[10px] text-center font-(family-name:--font-geist-pixel-square) uppercase tracking-widest">
                Powered by DevSA x 434 MEDIA
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  )
}
