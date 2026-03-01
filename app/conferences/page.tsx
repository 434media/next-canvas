"use client"

import { useState, useEffect, useRef, useMemo, type FormEvent } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Images-only from DevSA conferences — videos removed for performance
const mediaItems = [
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_7186.jpg", alt: "DevSA Community" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_1484.jpg", alt: "DevSA Community Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa8.jpg", alt: "PySanAntonio Conference" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay9.jpg", alt: "DevSA Replay Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa7.jpg", alt: "PySanAntonio Conference" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay13.jpg", alt: "DevSA Replay Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday2.jpg", alt: "DevSA Tech Day" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa.jpg", alt: "PySanAntonio After Party" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay7.jpg", alt: "GDG San Antonio" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday4.JPG", alt: "DevSA Tech Day" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_6429.jpg", alt: "DevSA Community" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4427.jpg", alt: "DevSA Community Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_4665.jpg", alt: "DevSA Community Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay1.JPG", alt: "DevSA Replay Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa5.jpg", alt: "PySanAntonio Conference" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday.jpg", alt: "DevSA Tech Day" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/techday5.jpg", alt: "DevSA Tech Day" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/gdg.jpg", alt: "GDG San Antonio Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_3385.jpg", alt: "DevSA Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/gdg4.jpg", alt: "DevSA Replay Event" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/coworking-space/IMG_5061.jpg", alt: "DevSA Community Space" },
  { src: "https://devsa-assets.s3.us-east-2.amazonaws.com/IMG_2756.jpg", alt: "DevSA Community" },
]

type MediaItem = (typeof mediaItems)[number]

// Split media into columns for the scrolling background
function splitIntoColumns(items: MediaItem[], cols: number): MediaItem[][] {
  const columns: MediaItem[][] = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => columns[i % cols].push(item))
  return columns
}

// Lazy-loaded image card — only loads src when near viewport
function LazyImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full rounded-xl overflow-hidden aspect-3/4 shrink-0 bg-[#111]"
    >
      {isVisible && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

// Pure CSS scrolling column — no JS animation runtime, fully GPU-composited
function ScrollingColumn({
  items,
  direction = "up",
  durationS = 60,
}: {
  items: MediaItem[]
  direction?: "up" | "down"
  durationS?: number
}) {
  const doubled = useMemo(() => [...items, ...items], [items])

  return (
    <div className="relative overflow-hidden h-full flex-1">
      <div
        className="flex flex-col gap-3 md:gap-4 will-change-transform"
        style={{
          animation: `hero-scroll-${direction} ${durationS}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <LazyImage key={`${item.src}-${i}`} src={item.src} alt={item.alt} />
        ))}
      </div>
    </div>
  )
}

export default function ConferencesPage() {
  const [columnCount, setColumnCount] = useState(3)
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Responsive column count: 3 on mobile, 4 on tablet, 5 on desktop
  useEffect(() => {
    function update() {
      const w = window.innerWidth
      setColumnCount(w < 640 ? 3 : w < 1024 ? 4 : 5)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const columns = useMemo(
    () => splitIntoColumns(mediaItems, columnCount),
    [columnCount]
  )

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
      {/* Hero — 3D scrolling columns with left-aligned content */}
      <section
        className="w-full relative min-h-dvh flex items-center justify-start overflow-hidden bg-[#0a0a0a]"
      >
        {/* Inject CSS keyframes once */}
        <style>{`
          @keyframes hero-scroll-up {
            from { transform: translateY(0); }
            to   { transform: translateY(-50%); }
          }
          @keyframes hero-scroll-down {
            from { transform: translateY(-50%); }
            to   { transform: translateY(0); }
          }
        `}</style>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Quarterly Tech Conferences by Digital Canvas
        </h1>

        {/* 3D Photo Carousel Background */}
        <div
          className="absolute inset-0 z-0"
          style={{ perspective: "1200px" }}
        >
          <div
            className="absolute inset-[-10%] flex gap-3 md:gap-4 px-2 md:px-4"
            style={{
              transform: "rotateX(8deg) rotateY(-6deg) rotateZ(2deg) scale(1.2)",
              transformOrigin: "center center",
            }}
          >
            {columns.map((col, i) => (
              <ScrollingColumn
                key={`${columnCount}-${i}`}
                items={col}
                direction={i % 2 === 0 ? "up" : "down"}
                durationS={55 + i * 10}
              />
            ))}
          </div>

          {/* Gradient overlays — heavy left for text readability, fading right to reveal images */}
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/70 z-10" />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.15) 65%, transparent 100%)",
            }}
          />
        </div>

        {/* Foreground hero content — left aligned */}
        <div className="relative z-20 w-full md:max-w-[55%] flex flex-col items-start text-left pl-6 sm:pl-10 md:pl-16 lg:pl-20 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#ff9900]">
                Powered by 434 MEDIA x DEVSA
              </span>
              <h2 className="font-(family-name:--font-geist-pixel-square) text-balance text-white leading-[1.2] text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-wide">
                Quarterly{" "}
                <span className="text-white/40 font-medium">Conferences</span>
              </h2>
            </div>

            <div className="space-y-6 max-w-2xl">
              <p className="text-balance text-lg md:text-xl text-white/60 leading-[1.7] font-medium">
                Designed and produced by <span className="font-(family-name:--font-geist-pixel-square) text-white uppercase tracking-wide">434 MEDIA x DEVSA</span> — connecting creativity, community, and technology across hundreds of developers, designers, and technologists every quarter.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/conferences/morehumanthanhuman"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff9900] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#fbbf24] hover:scale-[1.02]"
              >
                More Human Than Human
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#sponsor"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 bg-white/5 text-white font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-white/10 hover:border-white/20"
              >
                Become a Sponsor
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
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
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white font-black uppercase tracking-wide leading-snug mb-6">
              Interested in Sponsoring?
            </h2>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#ff9900] to-[#00f2ff] opacity-60 mb-8" />
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium max-w-lg mx-auto">
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
