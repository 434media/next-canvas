"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import DigitalCanvasParticles from "../components/hero-particles"

const pillars = [
  {
    label: "Conferences",
    href: "/conferences",
    description: "Large-scale quarterly events designed to connect organizations with the developers, designers, and technologists building the future.",
    accent: "#ff9900",
  },
  {
    label: "Workshops",
    href: "/workshops",
    description: "Hands-on production sessions — from prompt engineering to full-stack builds — designed to move teams from concept to capability.",
    accent: "#00f2ff",
  },
  {
    label: "Stories",
    href: "/storytelling",
    description: "Original content spotlighting the builders, creators, and communities driving innovation across industries.",
    accent: "#fbbf24",
  },
  {
    label: "Agents",
    href: "/agents",
    description: "AI-driven experiences built to solve real problems — custom agents as a service, currently in development.",
    accent: "#a855f7",
  },
]

export default function Home() {
  return (
    <div>
      <DigitalCanvasParticles />

      {/* Platform context — scroll-reveal section below the hero */}
      <section className="relative bg-[#050505] py-24 md:py-32 px-6 overflow-hidden">
        {/* Top edge fade for seamless hero transition */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#ff9900] mb-5">
              Powered by 434 MEDIA x DEVSA
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.25] tracking-tight max-w-3xl">
              <span className="font-(family-name:--font-geist-pixel-square) uppercase tracking-wide">Digital Canvas</span> designs and produces conferences, workshops, and AI-driven experiences{" "}
              <span className="text-white/30 font-medium">that help organizations connect creativity, community, and technology — at&nbsp;scale.</span>
            </h2>
          </motion.div>

          {/* Pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#222] border border-[#222]">
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
                  <div
                    className="w-2 h-2 rounded-full mb-5"
                    style={{ backgroundColor: pillar.accent }}
                  />
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
        </div>
      </section>
    </div>
  )
}
