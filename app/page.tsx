"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import DigitalCanvasParticles from "../components/hero-particles"

const pillars = [
  {
    number: "01",
    label: "Design",
    href: "/storytelling",
    description:
      "Making the web feel intentional, not incidental — using UI and the browser to tell stories. Editorial typography, scroll-based composition, interfaces that earn attention.",
    accent: "#fbbf24",
  },
  {
    number: "02",
    label: "Workflows",
    href: "/workshops",
    description:
      "Streamlined, real-world transactions — partner pipelines, content systems, event ops, custom auth. Modular systems that compound into shipped outcomes.",
    accent: "#00f2ff",
  },
  {
    number: "03",
    label: "Agents",
    href: "/agents",
    description:
      "Wrapping workflows in autonomous loops — compressing weeks of execution into hours. Built with Claude, MCP, and small composable tools that do real work.",
    accent: "#a855f7",
  },
]

export default function Home() {
  return (
    <div>
      <DigitalCanvasParticles />

      {/* Thesis — scroll-reveal section below the hero */}
      <section className="relative bg-[#050505] py-24 md:py-32 px-6 overflow-hidden">
        {/* Top edge fade for seamless hero transition */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Tagline + ICP hook */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#ff9900] mb-5">
              Stories. Transactions. Loops.
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight max-w-3xl">
              <span className="font-(family-name:--font-geist-pixel-square) uppercase tracking-wide">
                Digital Canvas
              </span>{" "}
              is for operators and product teams shipping intentional digital
              products{" "}
              <span className="text-white/30 font-medium">
                — and the autonomous workflows behind them.
              </span>
            </h2>
          </motion.div>

          {/* Triad: 01 Design · 02 Workflows · 03 Agents */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={pillar.href}
                  className="group block bg-[#0a0a0a] p-8 md:p-10 h-full transition-colors duration-300 hover:bg-[#111]"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="font-(family-name:--font-geist-pixel-square) text-xs tracking-[0.2em] font-bold"
                      style={{ color: pillar.accent }}
                    >
                      {pillar.number}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: pillar.accent }}
                    />
                  </div>
                  <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                    {pillar.label}
                  </h3>
                  <p className="text-white/40 text-sm leading-[1.75] font-normal mb-6">
                    {pillar.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-colors duration-300 group-hover:translate-x-0.5"
                    style={{ color: pillar.accent }}
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Funnel CTA — workshops on ramp, consultancy off ramp */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 md:mt-24 border-t border-[#222] pt-12 md:pt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end">
              <div>
                <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#00f2ff] mb-4">
                  Where to start
                </p>
                <h3 className="text-xl md:text-3xl font-black text-white leading-[1.3] tracking-tight">
                  Free monthly workshops.{" "}
                  <span className="text-white/30 font-medium">
                    Bite-size workflow examples by industry and AI model — ship
                    one in an hour, take the pattern home.
                  </span>
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
                <Link
                  href="/workshops"
                  className="group inline-flex items-center justify-between gap-3 bg-white text-black px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#00f2ff] transition-colors duration-200"
                >
                  Workflows by Digital Canvas
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/agents"
                  className="group inline-flex items-center justify-between gap-3 border border-[#333] text-white/70 hover:text-white hover:border-white/50 px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200"
                >
                  Work with us
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
