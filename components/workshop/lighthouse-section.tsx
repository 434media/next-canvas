"use client"

import { motion } from "motion/react"
import { Lightbulb, Target, TrendingUp, Radio } from 'lucide-react'

interface LighthouseSectionProps {
  theme: "good" | "hood"
}

export function LighthouseSection({ theme }: LighthouseSectionProps) {
  const isDark = theme === "hood"

  const themes = isDark
    ? [
        {
          icon: Target,
          title: "SURVIVAL → STRATEGY",
          subtitle: "The Hood Kid Way",
          description: "How adversity sharpens instincts that scale to executive decision-making",
        },
        {
          icon: Lightbulb,
          title: "AUTHENTICITY ≠ WEAKNESS",
          subtitle: "Real Recognize Real",
          description: "Why vulnerability is your competitive advantage in modern leadership",
        },
        {
          icon: TrendingUp,
          title: "EARN YOUR STRIPES",
          subtitle: "Not Given, Taken",
          description: "Building credibility through action, not titles or degrees",
        },
        {
          icon: Radio,
          title: "SYSTEMS OVER HUSTLE",
          subtitle: "API to the Streets",
          description: "Translating street-level problem-solving into scalable business systems",
        },
      ]
    : [
        {
          icon: Lightbulb,
          title: "From Adversity to Advantage",
          subtitle: "Resilience in Action",
          description: "Learn how challenges build adaptable, strategic leaders",
        },
        {
          icon: Target,
          title: "Earned Leadership",
          subtitle: "Actions Over Credentials",
          description: "Discover the mindset that drives sustainable success",
        },
        {
          icon: TrendingUp,
          title: "Building Systems That Scale",
          subtitle: "Structure Meets Street Smarts",
          description: "Transform intuition into repeatable business processes",
        },
        {
          icon: Radio,
          title: "Learn, Earn, Return",
          subtitle: "The Leadership Cycle",
          description: "Create lasting impact through authentic growth and giving back",
        },
      ]

  return (
    <section
      id="lighthouse"
      className={`relative overflow-hidden px-6 py-24 ${isDark ? "bg-[#121212]" : "bg-white"}`}
      style={{ viewTransitionName: "section-content" }}
    >
      {/* Background decorative elements */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {/* Bold rectangular blocks */}
          <div className="absolute top-20 left-10 w-32 h-2 bg-[#dc143c] rotate-12" />
          <div className="absolute top-40 right-20 w-40 h-3 bg-white rotate-[-8deg]" />
          <div className="absolute bottom-32 left-1/4 w-24 h-2 bg-[#dc143c] rotate-15" />
          
          {/* Adidas-style stripes */}
          <div className="absolute top-1/3 right-10 space-y-2 rotate-45">
            <div className="w-20 h-1 bg-white" />
            <div className="w-20 h-1 bg-white" />
            <div className="w-20 h-1 bg-white" />
          </div>
          
          {/* Bold X marks */}
          <div className="absolute bottom-20 right-1/3 text-6xl font-black text-[#dc143c] rotate-12">X</div>
          <div className="absolute top-1/4 left-1/3 text-8xl font-black text-white opacity-10 rotate-[-15deg]">X</div>
          
          {/* Vinyl records */}
          <div className="absolute top-1/2 left-20 w-16 h-16 rounded-full border-4 border-white">
            <div className="absolute inset-4 rounded-full bg-[#dc143c]" />
          </div>
          
          {/* Stars */}
          <div className="absolute bottom-40 right-40 text-4xl text-white">★</div>
          <div className="absolute top-20 right-1/4 text-3xl text-[#dc143c]">★</div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {isDark ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="brush-stroke-bg mb-6 inline-block px-6 py-2 bg-[#dc143c] text-white"
              >
                <h2
                  className="distressed-text font-(--font-menda-black) text-5xl tracking-tighter md:text-7xl lg:text-8xl"
                  data-text="THE LIGHTHOUSE"
                >
                  THE LIGHTHOUSE
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 inline-block border-8 border-white bg-black px-6 py-4"
                style={{ transform: "rotate(-1deg)" }}
              >
                <h3 className="font-(--font-menda-black) text-4xl text-white md:text-5xl">WORKSHOP</h3>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 max-w-3xl border-l-8 border-white bg-[#1a1a1a]/80 p-6 text-xl italic text-white"
              >
                <span className="neon-glow font-bold text-2xl text-white">"EARNED, NOT GIVEN."</span>
                <br />
                <span className="text-[#dc143c]">Learn → Earn → Return</span>
              </motion.p>
            </>
          ) : (
            <>
              <h2 className="mb-4 max-w-4xl font-bold text-5xl text-[#1a1a1a] md:text-6xl lg:text-7xl">
                The Lighthouse Workshop
              </h2>
              <div className="mb-6 max-w-3xl border-l-4 border-[#2563eb] bg-gray-50 p-6">
                <p className="font-semibold text-xl italic text-[#2563eb]">
                  "Learn, Earn, Return — The Modern Leadership Framework"
                </p>
              </div>
            </>
          )}

          <p
            className={`max-w-4xl text-base leading-relaxed md:text-lg lg:text-xl ${isDark ? "text-[#d4d4d4]" : "text-gray-700"}`}
          >
            {isDark ? (
              <>
                Our <span className="font-bold text-[#dc143c]">flagship keynote</span> ain't your typical corporate
                training. We break down how <span className="font-bold text-white">hood economics</span>,
                <span className="font-bold text-white"> street credibility</span>, and
                <span className="font-bold text-[#dc143c]"> raw authenticity</span> translate to C-suite success. Real
                talk for real leaders.
              </>
            ) : (
              <>
                Our flagship keynote experience blends{" "}
                <span className="font-semibold text-[#2563eb]">lived experience</span> with proven{" "}
                <span className="font-semibold text-[#1e40af]">leadership principles</span>, creating a transformative
                workshop that helps teams understand how adversity, authenticity, and adaptability drive success.
              </>
            )}
          </p>
        </motion.div>

        {/* Key themes grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {themes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden p-8 transition-all ${
                isDark ? "bg-[#1a1a1a] hover:bg-[#252525]" : "rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl"
              }`}
              style={
                isDark
                  ? {
                      border: `4px solid ${index % 2 === 0 ? "#dc143c" : "#ffffff"}`,
                      transform: `rotate(${index % 2 === 0 ? "-0.5deg" : "0.5deg"})`,
                    }
                  : {}
              }
            >
              {/* Background decorations for Hood Kid */}
              {isDark && (
                <>
                  <div
                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20"
                    style={{
                      background: index % 2 === 0 ? "#dc143c" : "#ffffff",
                    }}
                  />
                  <div className="absolute -bottom-4 -left-4 font-(--font-menda-black) text-[120px] opacity-5">
                    {index + 1}
                  </div>
                </>
              )}

              <div className="relative">
                <item.icon
                  className={`mb-4 ${
                    isDark ? (index % 2 === 0 ? "text-[#dc143c]" : "text-white") : "text-[#2563eb]"
                  }`}
                  size={isDark ? 48 : 40}
                  strokeWidth={isDark ? 2.5 : 2}
                />

                <h3
                  className={`mb-2 font-bold leading-tight ${
                    isDark ? "font-(--font-menda-black) text-2xl text-white" : "text-xl text-[#1a1a1a]"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`mb-3 font-bold text-sm ${
                    isDark ? (index % 2 === 0 ? "text-[#dc143c]" : "text-white") : "text-[#2563eb]"
                  }`}
                >
                  {item.subtitle}
                </p>

                <p className={`leading-relaxed ${isDark ? "text-[#d4d4d4]" : "text-gray-600"}`}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
