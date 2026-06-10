"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import UnderwritersOrbit from "@/components/underwriters-orbit"

const ACCENT = "#FF006E"

const youGet = [
  {
    title: "Named vertical exclusivity",
    description:
      "Cohort runs as a single industry vertical, branded for your company for the cohort window (e.g., 'Cybersecurity Cohort, powered by [you]').",
  },
  {
    title: "Painpoint authorship",
    description:
      "Your team frames the keynote and the problem set every builder responds to. Every prototype is a response to your real-world pain.",
  },
  {
    title: "First-look access",
    description:
      "See every builder and prototype before demo day. Talent pipeline, M&A signal, partnership candidates — direct line, no intermediaries.",
  },
  {
    title: "Investor-grade media",
    description:
      "Branded recap content, builder profiles, and demo footage produced by 434 Media. Assets you can use across owned and paid channels.",
  },
  {
    title: "Demo day presence",
    description:
      "Sponsor recognition in front of an accredited investor audience. The room sees who powered the work.",
  },
  {
    title: "Office hour residency",
    description:
      "Your domain experts host one session with the cohort. The highest-bandwidth touchpoint between your team and the builders — direct Q&A, expertise transfer, the kind of access where partnerships often start. ~60 minutes mid-bridge, format flexible.",
  },
]

const successDimensions = [
  {
    title: "Talent pipeline",
    description:
      "Builders working through painpoints you authored — vetted by the prototype they shipped, not a résumé. A warmer top of funnel than cold outbound for AI-native hires in your domain.",
  },
  {
    title: "Brand surface area",
    description:
      "Investor-grade recap content, builder profiles, and demo day footage produced by 434 Media — assets you redeploy across owned, paid, and earned channels. Your company shows up where the SA capital network is paying attention.",
  },
  {
    title: "First-look conversations",
    description:
      "A direct line to every builder before demo day. Whether the result is partnership, acquisition, technology licensing, advisor pickup, or warm pass — you're in the conversation first.",
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
    caption: "Methodist Healthcare's bilingual social-determinants program recap",
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

const cohortStages = [
  {
    label: "Workshop Weekend",
    description:
      "DevSA hosts the free, industry-themed build weekend. Your keynote opens with the pain points. Builders use AI tools — Cursor, Claude, Codex, Gemini — to ship working prototypes in a prompt-to-production format.",
  },
  {
    label: "Six-Week Bridge",
    description:
      "Committed builders work out of the DevSA downtown coworking space. Touchpoints include your office hour, pitch coaching from our investor partners, peer review, and an investor mixer.",
  },
  {
    label: "Demo Day",
    description:
      "Curated pitches to an accredited investor audience. Warm conversations continue organically with the builders solving problems in your space.",
  },
]

const faqs = [
  {
    q: "What does it cost?",
    a: "Pricing is sized to a corporate marketing or innovation budget, not a venture allocation. Specifics depend on cohort scope and underwriter timing. Full term sheet shared on a 30-minute qualifying call.",
  },
  {
    q: "What does 'named exclusivity' mean?",
    a: "Your company is the only corporate underwriter for that vertical cohort window. Other underwriters can co-sponsor adjacent verticals but won't share the cohort.",
  },
  {
    q: "What's the term length?",
    a: "A single cohort runs roughly 10–12 weeks end-to-end: workshop weekend, six-week bridge, demo day, plus media production. Multi-cohort arrangements available on request.",
  },
  {
    q: "How are builders selected for our cohort?",
    a: "Builders self-select into the workshop weekend (open). Cohort commitment happens at the end of the weekend with a three-question application. Your team sees every cohort member before demo day.",
  },
  {
    q: "What if a builder solves our problem? Do we get rights or first refusal?",
    a: "Builders retain 100% IP. Your first-look access is conversational — a direct line to talk before anyone else. Whether that leads to a partnership, acquisition, hire, or referral is up to you both. Structured first-look windows are available for underwriters that want a more formal arrangement — discussed on the call.",
  },
  {
    q: "Can we co-underwrite with another company?",
    a: "Default is single underwriter per cohort — your vertical, your brand. Co-underwriting requests are reviewed case-by-case where the second sponsor is non-competitive (e.g., a tooling partner alongside an industry anchor). Brought up on a call.",
  },
  {
    q: "What deliverables do we actually receive?",
    a: "Branded recap content, builder profiles, demo day footage, talent pipeline summary, and a post-cohort report. Produced by 434 Media. Detailed deliverables list lives in the term sheet.",
  },
  {
    q: "What's the time commitment from our team?",
    a: "Light. Two hours for the keynote (Friday evening of the workshop weekend), one hour for a cohort office hour mid-bridge, and demo day attendance (2–3 hours). Optional informal touchpoints with builders during the bridge.",
  },
]

const whyNow = [
  {
    title: "AI tools have collapsed the build cycle",
    description:
      "Workshop-week prototypes are demo-day credible. The bottleneck moved from build velocity to problem-market fit — which is exactly what your painpoint authorship solves.",
  },
  {
    title: "SA's verticals are under-served",
    description:
      "Cyber, military, health and science, regulated industries — national accelerators default to consumer/SaaS and skip the verticals where San Antonio leads.",
  },
  {
    title: "Infrastructure already operates",
    description:
      "A robust accredited investor network and DevSA (20+ tech communities, downtown coworking) already run the capital and community sides of San Antonio's ecosystem. Digital Canvas is the program layer — not net-new infrastructure to stand up.",
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

export default function UnderwritersPage() {
  return (
    <div className="bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 overflow-hidden">
        {/* Orbital halo particles — particles orbit a magenta focal point; cursor moves the gravity well */}
        <UnderwritersOrbit />

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
                For Underwriters
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
                  Cohort 1 anchor slot open
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide leading-[1.15] font-black mb-6 max-w-4xl"
            >
              Underwrite a cohort.{" "}
              <span className="text-white/30 font-medium">Own the vertical.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mb-10"
            >
              A localized, vertical-focused builder program putting San Antonio
              talent in front of capital. Underwriting a cohort makes your company
              the named industry partner — the source of the painpoints, the first
              audience for the solutions, and the first hand raised when something
              is worth a deeper conversation.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="#talk"
              className="group inline-flex items-center justify-between gap-3 text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
              style={{ backgroundColor: ACCENT }}
            >
              Schedule a call
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#faq"
              className="group inline-flex items-center justify-between gap-3 border border-[#333] text-white/70 hover:text-white hover:border-white/50 px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200"
            >
              Read the FAQ
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What you get */}
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
              What you get
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Six deliverables.{" "}
              <span className="text-white/30 font-medium">
                Sized to a corporate marketing or innovation budget — not a
                venture allocation.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            {youGet.map((item, i) => {
              const isFeature = item.title === "Office hour residency"
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="relative bg-[#0a0a0a] p-8 md:p-10"
                >
                  {isFeature && (
                    <span
                      className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
                      style={{ backgroundColor: ACCENT }}
                      aria-hidden="true"
                    />
                  )}
                  {isFeature && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF006E]/80 mb-3 block">
                      Primary access · Highest touch
                    </span>
                  )}
                  <span
                    className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block"
                    style={{ color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-[1.75] ${isFeature ? "text-white/60" : "text-white/40"}`}>
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What success looks like — three modes of value an underwriter can model */}
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
              What success looks like
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Three modes of value.{" "}
              <span className="text-white/30 font-medium">
                Each one builds into the marketing or innovation case for the spend.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {successDimensions.map((item, i) => (
              <motion.div
                key={item.title}
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
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-[1.75]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Made by 434 Media — production proof */}
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
              Made by 434 Media
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Production you can point to.{" "}
              <span className="text-white/30 font-medium">
                Investor-grade media isn't a promise — it's a portfolio.
              </span>
            </h2>
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
                  <p className="text-white/50 text-sm leading-[1.7]">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 text-center"
          >
            Cohort recaps, builder profiles, and demo footage produced to the same standard.
          </motion.p>
        </div>
      </section>

      {/* How a cohort runs */}
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
              How a cohort runs
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Seven weeks from keynote to demo day.{" "}
              <span className="text-white/30 font-medium">
                You author the start. Your team sees the finish.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {cohortStages.map((stage, i) => (
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

      {/* Why now */}
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
              Why now
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Three structural shifts{" "}
              <span className="text-white/30 font-medium">
                make a vertical-focused, AI-native cohort in San Antonio possible
                in 2026 — and difficult to replicate after.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-px bg-[#222] border border-[#222]">
            {whyNow.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0a0a0a] p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-4">
                  <span
                    className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold mb-3 block"
                    style={{ color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold">
                    {item.title}
                  </h3>
                </div>
                <p className="md:col-span-8 text-white/40 text-sm md:text-base leading-[1.75]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-20 md:py-28 px-6 border-t border-[#222]">
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
              The questions most underwriters ask.{" "}
              <span className="text-white/30 font-medium">
                Anything else lives in the term sheet — start with a call.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-px bg-[#222] border border-[#222]">
            {faqs.map((faq, i) => {
              const isPlaceholder = faq.a.includes("PLACEHOLDER")
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

      {/* Talk / contact */}
      <section
        id="talk"
        className="relative py-20 md:py-28 px-6 border-t border-[#222]"
      >
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end"
          >
            <div>
              <p
                className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
                style={{ color: ACCENT }}
              >
                Next step
              </p>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-3xl text-white uppercase tracking-wide leading-tight mb-4">
                A 30-minute call.{" "}
                <span className="text-white/30 font-medium">
                  Cohort calendar, vertical fit, term sheet.
                </span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Marcos Resendez — Founder &amp; CEO, 434 Media. Angel investor
                with deep relationships across the San Antonio capital network.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <a
                href="mailto:build@434media.com?subject=Digital%20Canvas%20Underwriter%20Inquiry"
                className="group inline-flex items-center justify-between gap-3 text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
                style={{ backgroundColor: ACCENT }}
              >
                Email Marcos
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
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
          DevSA · Alamo Angels · 434 Media
        </p>
      </section>
    </div>
  )
}
