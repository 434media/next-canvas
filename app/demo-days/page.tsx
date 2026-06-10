"use client"

import { motion } from "motion/react"
import DemoDaysPairing from "@/components/demo-days-pairing"

const ACCENT = "#fbbf24"

const demoDayBullets = [
  {
    title: "Curated pitches",
    description:
      "8–12 cohort builders present working products built against painpoints authored by the cohort underwriter. No PowerPoint demos — live builds.",
  },
  {
    title: "Warm room",
    description:
      "An accredited investor audience and partner capital across San Antonio and Texas attend by invitation.",
  },
  {
    title: "Real follow-ups",
    description:
      "No formal Q&A theater. Conversations continue organically over food and drinks. Investors connect with the builders worth a second call.",
  },
  {
    title: "Industry-themed",
    description:
      "Each demo day is anchored to a single vertical — cybersecurity, military, health and science, education. The room knows what to expect.",
  },
]

const roomMembers = [
  {
    name: "DevSA",
    role: "Host community",
    status: "Confirmed",
  },
  {
    name: "434 Media",
    role: "Program operator",
    status: "Confirmed",
  },
  {
    name: "Alamo Angels",
    role: "Investor network · Anchor",
    status: "In conversation",
  },
  {
    name: "Cohort 1 Underwriter",
    role: "Industry vertical",
    status: "Locking",
  },
]

export default function DemoDaysPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 overflow-hidden">
        {/* Two-color pairing particles — builders (white) and investors (amber) drift independently; lines form when they cross */}
        <DemoDaysPairing />

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
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold"
                style={{ color: ACCENT }}
              >
                Demo Days
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide leading-[1.15] font-black mb-6 max-w-4xl"
            >
              Where the cohort ships.{" "}
              <span className="text-white/30 font-medium md:tracking-tight">
                In front of the people who can fund what&apos;s{" "}next.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mb-10"
            >
              A Digital Canvas demo day is the six-week cohort ending in a curated
              evening of live pitches to an accredited investor audience plus
              partner capital from across San Antonio and Texas. Not a pitch event.
              A room where conversations start.
            </motion.p>
          </div>
        </div>
      </section>

      {/* What happens at a demo day */}
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
              What happens
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              One evening.{" "}
              <span className="text-white/30 font-medium">
                Cohort builders, an investor audience, and the painpoint owners
                in the same room.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            {demoDayBullets.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
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

      {/* The room — honest "building" state */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              The room
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl mb-10">
              Building the audience for cohort 1.{" "}
              <span className="text-white/30 font-medium">
                An accredited investor network and partner capital across San Antonio and Texas.
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#222] border border-[#222]">
              {roomMembers.map((m) => {
                const statusTone =
                  m.status === "Confirmed"
                    ? { dot: "#88FF00", text: "text-[#88FF00]/80" }
                    : m.status === "In conversation"
                    ? { dot: "#fbbf24", text: "text-[#fbbf24]/80" }
                    : { dot: "#FF006E", text: "text-[#FF006E]/80" }
                return (
                  <div key={m.name} className="bg-[#0a0a0a] p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                        {m.role}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: statusTone.dot }}
                        />
                        <span
                          className={`font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold ${statusTone.text}`}
                        >
                          {m.status}
                        </span>
                      </div>
                    </div>
                    <p className="font-(family-name:--font-geist-pixel-square) text-base md:text-lg uppercase tracking-[0.12em] text-white font-bold">
                      {m.name}
                    </p>
                  </div>
                )
              })}
            </div>

            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/30 mt-6 max-w-2xl leading-relaxed">
              Additional partner capital across San Antonio and Texas in active conversations. The full lineup announces when cohort 1&apos;s underwriter and vertical lock.
            </p>
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
    </main>
  )
}
