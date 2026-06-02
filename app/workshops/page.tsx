"use client"
import { useState, useEffect, type FormEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react"
import WorkshopsFlow from "@/components/workshops-flow"

const proofPhotos = [
  {
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/replay9.jpg",
    alt: "Build with Gemini event",
  },
  {
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/morehuman/0P3A9580.jpg",
    alt: "More Human Than Human conference, San Antonio",
  },
  {
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/shebuilds/8O8A0023+2.jpg",
    alt: "Loveable SheBuilds event",
  },
  {
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/pysa/pysa.jpg",
    alt: "PySanAntonio conference",
  },
  {
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/morehuman/0P3A9743.jpg",
    alt: "More Human Than Human conference, San Antonio",
  },
]

const path = [
  {
    label: "Workshop Weekend",
    duration: "Sat–Sun",
    description:
      "DevSA hosts at the downtown coworking space. Underwriter keynote opens with real industry pain points. Build with Cursor, Claude, Codex, or Gemini. Ship a working prototype by Sunday night.",
  },
  {
    label: "Commit to the Cohort",
    duration: "Monday",
    description:
      "By Monday morning, decide whether to continue. Three short answers and you're in: which painpoint, why you, what would a working demo look like in six weeks.",
  },
  {
    label: "Six-Week Bridge",
    duration: "Six Weeks",
    description:
      "Work from DevSA's space alongside the cohort. Sponsor office hour, pitch coaching from our investor partners, peer review, investor mixer, dress rehearsal. The community shows up while you build.",
  },
  {
    label: "Demo Day",
    duration: "One Evening",
    description:
      "Pitch an accredited investor audience plus partner capital — Capital Factory, Venture STX, Bexar County and more. Warm room. Real follow-up conversations.",
  },
]

export default function WorkshopsPage() {
  const [waitlistState, setWaitlistState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [waitlistError, setWaitlistError] = useState("")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? null : (i - 1 + proofPhotos.length) % proofPhotos.length))
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? null : (i + 1) % proofPhotos.length))
    }
    window.addEventListener("keydown", onKey)
    // Prevent body scroll while lightbox is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex])

  async function handleWaitlist(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setWaitlistState("submitting")
    setWaitlistError("")

    const form = e.currentTarget
    const email = (form.elements.namedItem("waitlistEmail") as HTMLInputElement).value

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tags: ["workshop-waitlist", "digital-canvas-cohort"] }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || "Something went wrong")
      }

      setWaitlistState("success")
      form.reset()
    } catch (err) {
      setWaitlistError(err instanceof Error ? err.message : "Something went wrong")
      setWaitlistState("error")
    }
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-24 px-6">
        {/* Directional flow particles — current flows rightward, cursor diverts it like a stone in a river */}
        <WorkshopsFlow />

        <div className="relative z-10 max-w-4xl w-full mx-auto pointer-events-none">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF006E]" />
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/60">
                The Open Onramp
              </span>
            </div>
            <h1 className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl text-white uppercase tracking-wide leading-[1.2] font-black mb-6">
              Workshops{" "}
              <span className="text-white/40 font-medium">by Digital Canvas</span>
            </h1>
            <div className="h-px w-48 mx-auto bg-linear-to-r from-[#FF006E] to-[#88FF00] opacity-60 mb-7" />
            <p className="text-white/50 text-sm md:text-base leading-[1.8] font-medium max-w-2xl mx-auto">
              The entry point for builders into a Digital Canvas cohort, hosted by DEVSA — and the path to Demo
              Day in front of an accredited investor audience.
            </p>
          </motion.div>

          {/* Proof strip — DevSA community moments pulled forward as concrete evidence */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="pointer-events-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-8 bg-white/15" />
              <p className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                Hosted by DEVSA
              </p>
              <span className="h-px w-8 bg-white/15" />
            </div>
            <div className="grid grid-cols-5 gap-1.5 md:gap-3">
              {proofPhotos.map((img, i) => (
                <motion.button
                  type="button"
                  key={img.src}
                  onClick={() => setLightboxIndex(i)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.07 }}
                  className="relative aspect-square overflow-hidden group cursor-zoom-in block w-full p-0 border-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF006E]"
                  aria-label={`View larger image: ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 opacity-65 group-hover:opacity-100"
                    sizes="(max-width: 768px) 20vw, 180px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hosted by DevSA */}
      <section className="relative py-20 md:py-24 px-6 border-t border-[#222]">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center"
          >
            <div className="md:col-span-4 flex md:justify-start justify-center">
              <a
                href="https://www.devsa.community/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-48 md:w-56"
              >
                <div className="relative h-20">
                  <Image
                    src="https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-logo.svg"
                    alt="DevSA logo"
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    sizes="240px"
                    unoptimized
                  />
                </div>
              </a>
            </div>
            <div className="md:col-span-8">
              <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#FF006E] mb-4 font-bold">
                Hosted by DevSA
              </p>
              <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
                Find your people.{" "}
                <span className="text-white/40 font-medium">Build your future.</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
                DevSA is the bridge across San Antonio&apos;s tech ecosystem — 20+ grassroots groups, local builders, and industry partners connected through one platform. They don&apos;t replace the communities doing the work; they host them, connect them, and help them grow. The workshop weekend and the six-week bridge both run out of DevSA&apos;s downtown coworking — so when you commit, the platform that already powers SA&apos;s builders is where you build.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Path to demo day */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#88FF00] mb-4 font-bold">
              Path to Demo Day
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Four stages.{" "}
              <span className="text-white/40 font-medium">
                Start at a workshop. End in a room full of investors.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            {path.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="bg-[#0a0a0a] p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-[#88FF00] font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88FF00]" />
                  <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 ml-auto">
                    {stage.duration}
                  </span>
                </div>
                <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                  {stage.label}
                </h3>
                <p className="text-white/40 text-sm leading-[1.75]">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222] overflow-hidden" id="waitlist">
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            className="border border-[#FF006E]/30 bg-[#0a0a0a] p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#FF006E] mb-4 font-bold">
              Get the next open call
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight mb-6">
              One email when{" "}
              <span className="text-white/40 font-medium">the next workshop opens</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-[1.8] mb-8 max-w-xl">
              No newsletter spam. We email when a workshop is on the calendar — vertical, date, RSVP. Cohort opens get the same notification.
            </p>

            {waitlistState === "success" ? (
              <div className="flex items-center gap-3 text-[#FF006E] font-(family-name:--font-geist-pixel-square) text-xs uppercase tracking-widest">
                <span className="inline-block w-2 h-2 bg-[#FF006E]" />
                You&apos;re on the list. See you at the next workshop.
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="waitlistEmail"
                  required
                  placeholder="you@company.com"
                  className="flex-1 bg-[#0a0a0a] border border-[#333] text-white text-sm px-4 py-4 focus:outline-none focus:border-[#FF006E] transition-colors placeholder:text-white/20"
                />
                <button
                  type="submit"
                  disabled={waitlistState === "submitting"}
                  className="bg-[#FF006E] text-[#0a0a0a] font-(family-name:--font-geist-pixel-square) font-bold text-xs uppercase tracking-widest py-4 px-8 transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {waitlistState === "submitting" ? "Adding..." : "Join Waitlist"}
                </button>
              </form>
            )}
            {waitlistState === "error" && (
              <p className="text-red-400 text-sm font-(family-name:--font-geist-pixel-square) mt-4">
                {waitlistError}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Final CTA — apply / see demo day */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end"
          >
            <div>
              <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#88FF00] mb-4 font-bold">
                Ready to build?
              </p>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-3xl text-white uppercase tracking-wide leading-tight">
                See the full path.{" "}
                <span className="text-white/40 font-medium">
                  Or check what demo day looks like.
                </span>
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <Link
                href="/builders"
                className="group inline-flex items-center justify-between gap-3 bg-[#88FF00] text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
              >
                How to apply
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/demo-days"
                className="group inline-flex items-center justify-between gap-3 border border-[#333] text-white/70 hover:text-white hover:border-white/50 px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200"
              >
                Demo day details
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Powered by */}
      <section className="relative py-16 md:py-20 px-6 border-t border-[#222] text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
          Powered by
        </p>
        <p className="font-(family-name:--font-geist-pixel-square) text-white/70 text-sm md:text-base tracking-wide">
          DevSA · Capital Partner · 434 Media
        </p>
      </section>

      {/* Lightbox — full-size viewer for the DevSA proof strip */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(null)
              }}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white p-2 transition-colors"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) =>
                  i === null ? null : (i - 1 + proofPhotos.length) % proofPhotos.length,
                )
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7 md:w-9 md:h-9" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) =>
                  i === null ? null : (i + 1) % proofPhotos.length,
                )
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7 md:w-9 md:h-9" />
            </button>

            <motion.div
              key={proofPhotos[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative flex flex-col items-center justify-center max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ height: "min(80vh, 800px)" }}>
                <Image
                  src={proofPhotos[lightboxIndex].src}
                  alt={proofPhotos[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  unoptimized
                  priority
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                  {String(lightboxIndex + 1).padStart(2, "0")} / {String(proofPhotos.length).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-white/15" />
                <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60">
                  {proofPhotos[lightboxIndex].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
