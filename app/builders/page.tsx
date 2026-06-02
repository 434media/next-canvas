"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import BuildersSparks from "@/components/builders-sparks"

const ACCENT = "#88FF00"

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

const portfolioWork = [
  {
    title: "DevSA × More Human Than Human",
    caption: "AI conference in the heart of downtown San Antonio",
    src: "https://devsa-assets.s3.us-east-2.amazonaws.com/morehuman/DevSA_MoreHuman2026_0313B.mp4",
  },
  {
    title: "SDOH Accelerator",
    caption: "Methodist Healthcare's bilingual social-determinants recap",
    src: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/SDOH%20ACCELERATOR%20PROGRAM%20RECAP_2025.mp4",
  },
  {
    title: "Learn2AI",
    caption: "Prompt engineering and AI strategy programs across SA businesses",
    src: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/Learn2AI%20-%20081825%20G.mp4",
  },
  {
    title: "Alamo Angels",
    caption: "Recap production for one of Texas' largest investor networks",
    src: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/Alamo%20Angles.mp4",
  },
]

const stages = [
  {
    label: "Workshop Weekend",
    description:
      "Industry keynote opens with real pain points. Build with the AI tools you already use — Cursor, Claude, Codex, Gemini. Ship a working prototype by Sunday night.",
  },
  {
    label: "Six-Week Bridge",
    description:
      "Work out of DevSA's downtown coworking. Office hour with the underwriter, pitch coaching from our investor partners, peer review, investor mixer, dress rehearsal.",
  },
  {
    label: "Demo Day",
    description:
      "Pitch an accredited investor audience. Curated audience. Warm room. Real follow-up conversations.",
  },
]

const youGet = [
  "A working product you built and own",
  "Real reps with AI tooling in a production context",
  "A demo day in front of an accredited investor audience",
  "Warm intros, not cold pitches",
  "Space, mentors, and a cohort that's actually building in parallel",
  "434 Media coverage — builder profile and demo footage you can use forever",
]

const whoFor = [
  "Solo builders or 2–3 person teams",
  "Comfortable shipping with AI tools (or eager to learn fast)",
  "Working in cybersecurity, military, health, science, education, or an adjacent SA-relevant vertical",
  "San Antonio-based or willing to be on-site for workshop + demo day",
]

const weAsk = [
  "Show up for the workshop weekend",
  "Engage with the bridge programming (it's there because it works)",
  "Commit to pitching on demo day",
  "Be coachable. Be present. Don't ghost the cohort.",
]

const applicationQuestions = [
  "Which of the keynote painpoints are you tackling, and how?",
  "Why you, why now?",
  "What would a working demo look like in six weeks?",
]

const faqs = [
  {
    q: "Does Digital Canvas take equity?",
    a: "No. Builders keep 100% of their company and IP. We don't charge tuition or take equity. The cost is your time and your commitment to demo day.",
  },
  {
    q: "What if I'm not a technical founder?",
    a: "AI tools — Cursor, Claude, Codex, Gemini — lower the bar significantly. If you can write a clear prompt, read code at a high level, and iterate against feedback, you can ship a working prototype. Prior software experience helps but isn't required.",
  },
  {
    q: "Is the workshop weekend remote-friendly?",
    a: "Workshop weekend is in-person at DevSA's downtown San Antonio coworking space. Demo day is in-person. The six-week bridge has flexible space access — the cohort works from DevSA when possible, with mentorship and milestones running on a regular schedule.",
  },
  {
    q: "What if I commit but can't finish?",
    a: "Life happens. Tell us early. A soft readiness check ahead of demo day means we can slot a builder into the next cohort if they need more time. Better that than burning audience attention with a half-ready demo.",
  },
  {
    q: "What does the workshop weekend actually look like?",
    a: "Friday evening: underwriter keynote frames the painpoints. Saturday + Sunday: open builds. Mentors circulate. Sunday evening: prototype demos to the cohort. Monday morning: those who want in submit the three-question application.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs
    .filter((f) => !f.a.includes("PLACEHOLDER"))
    .map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
}

export default function BuildersPage() {
  return (
    <div className="bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 overflow-hidden">
        {/* Spark-trail particles — particles drift with fading green trails behind them */}
        <BuildersSparks />

        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${ACCENT}66, transparent)` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 flex-wrap mb-8"
            >
              <span
                className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold"
                style={{ color: ACCENT }}
              >
                For Builders
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="hidden sm:inline-block h-px w-6 bg-white/15" />
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: ACCENT }}
                />
                <span className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/55 font-bold">
                  Cohort 1 underwriter in conversations
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide leading-[1.15] font-black mb-6 max-w-4xl"
            >
              Build something real.{" "}
              <span className="text-white/30 font-medium">Pitch real investors.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mb-10"
            >
              A free, AI-native builder cohort for San Antonio. Six weeks. One demo
              day. A curated audience drawn from an accredited investor network
              plus partner capital across Texas. No equity. No tuition. We ask
              you to commit to the demo.
            </motion.p>
          </div>

          {/* Proof strip — DevSA community moments showing the room you'd build in */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pointer-events-auto mb-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-white/15" />
              <p className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                Where the cohort builds · DevSA Downtown
              </p>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-5 gap-1.5 md:gap-3 max-w-3xl">
              {proofPhotos.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.06 }}
                  className="relative aspect-square overflow-hidden group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 opacity-65 group-hover:opacity-100"
                    sizes="(max-width: 768px) 18vw, 130px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="#how-to-join"
              className="group inline-flex items-center justify-between gap-3 text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
              style={{ backgroundColor: ACCENT }}
            >
              How to join
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/demo-days"
              className="group inline-flex items-center justify-between gap-3 border border-[#333] text-white/70 hover:text-white hover:border-white/50 px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200"
            >
              See demo day
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What you'll do */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              What you'll do
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Workshop. Bridge. Demo Day.{" "}
              <span className="text-white/30 font-medium">
                Seven weeks of focused build, mentorship, and access.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0a0a0a] p-8 md:p-10"
              >
                <span
                  className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block"
                  style={{ color: ACCENT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
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

      {/* What you get + Who for + What we ask — 3-col bullets */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {[
            { title: "What you get", items: youGet, accent: ACCENT },
            { title: "Who this is for", items: whoFor, accent: "#FF006E" },
            { title: "What we ask back", items: weAsk, accent: "#fbbf24" },
          ].map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p
                className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.4em] mb-5 font-bold"
                style={{ color: col.accent }}
              >
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-white/60 text-sm leading-[1.6]"
                  >
                    <span
                      className="mt-2 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: col.accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What you walk away with — 434 Media coverage, reframed for builders */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              Coverage that compounds
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Your build, on the record.{" "}
              <span className="text-white/30 font-medium">
                Builder profile and demo footage you can use forever — same bar as the work below.
              </span>
            </h2>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/30 mt-5">
              Builder profiles + demo coverage produced by 434 Media
            </p>
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
                  <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.15em] text-white font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to join */}
      <section
        id="how-to-join"
        className="relative py-20 md:py-28 px-6 border-t border-[#222]"
      >
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              How to join
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Two steps.{" "}
              <span className="text-white/30 font-medium">
                Workshop is open. Cohort is opt-in after you've experienced it.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-[#0a0a0a] p-8 md:p-10"
            >
              <span
                className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block"
                style={{ color: ACCENT }}
              >
                Step 01
              </span>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                RSVP to the workshop
              </h3>
              <p className="text-white/50 text-sm leading-[1.75] mb-4">
                Workshops are open. Light intake: name, contact, a few words on
                what brings you. No idea required yet — you'll get one from the
                keynote.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                Open calls shared across DevSA + Digital Canvas social channels.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0a0a0a] p-8 md:p-10"
            >
              <span
                className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block"
                style={{ color: ACCENT }}
              >
                Step 02
              </span>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                Commit to the cohort
              </h3>
              <p className="text-white/50 text-sm leading-[1.75] mb-4">
                By Monday morning after the workshop weekend, apply to continue
                into the six-week bridge and demo day. Three short answers:
              </p>
              <ol className="space-y-2 mb-4">
                {applicationQuestions.map((q, idx) => (
                  <li
                    key={q}
                    className="flex gap-3 text-white/60 text-sm leading-normal"
                  >
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em] pt-1"
                      style={{ color: ACCENT }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                We review same-week and confirm cohort spots.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              FAQ
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              The questions most builders ask.{" "}
              <span className="text-white/30 font-medium">
                Missing something? Reach out at hello@434media.com.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-px bg-[#222] border border-[#222]">
            {faqs.map((faq, i) => {
              const isPlaceholder = faq.a.startsWith("PLACEHOLDER")
              return (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-[#0a0a0a] p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
                >
                  <div className="md:col-span-5">
                    <span
                      className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold mb-3 block"
                      style={{ color: ACCENT }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-(family-name:--font-geist-pixel-square) text-base md:text-lg uppercase tracking-tight text-white font-bold leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <p
                    className={`md:col-span-7 text-sm md:text-base leading-[1.75] ${
                      isPlaceholder ? "text-white/40 italic" : "text-white/60"
                    }`}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Powered by */}
      <section className="relative py-16 md:py-20 px-6 border-t border-[#222] text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
          Powered by
        </p>
        <p className="font-(family-name:--font-geist-pixel-square) text-white/70 text-sm md:text-base tracking-wide">
          DevSA · Capital Partner Network · 434 Media
        </p>
      </section>
    </div>
  )
}
