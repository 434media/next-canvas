"use client"

import { motion } from "motion/react"
import { Music, DollarSign, RefreshCw, Radio } from 'lucide-react'

interface PillarsSectionProps {
  theme: "good" | "hood"
}

export function PillarsSection({ theme }: PillarsSectionProps) {
  const isDark = theme === "hood"

  const pillars = isDark
    ? [
        {
          icon: Music,
          emoji: "🎵",
          title: "MIXTAPE MENTALITY",
          subtitle: "Curate Like Your Life Depends On It",
          description:
            "Just like a fire mixtape, leadership is about selection, sequence, and knowing your audience. Build narratives that slap.",
          tags: ["Partnership Power", "Story Architecture"],
          color: "#c8102e",
        },
        {
          icon: DollarSign,
          emoji: "💰",
          title: "COMMON CENTS",
          subtitle: "Money Talks, We Translate",
          description:
            "From corner economics to corporate finance. Master the art of turning value into revenue without losing your soul.",
          tags: ["Sales Game", "Value Flex"],
          color: "#ffd700",
        },
        {
          icon: RefreshCw,
          emoji: "🔄",
          title: "REINVENTION",
          subtitle: "Stay Fresh or Get Left",
          description:
            "The streets taught us to pivot or perish. Build identity that evolves without losing authenticity. Lame over fame.",
          tags: ["Personal Brand", "Adaptive Growth"],
          color: "#ffffff",
        },
        {
          icon: Radio,
          emoji: "📡",
          title: "API TO THE STREETS",
          subtitle: "Systems for the Culture",
          description:
            "Translate street-level instinct into repeatable systems. Bridge the gap between intuition and infrastructure.",
          tags: ["Real-World AI", "Process Design"],
          color: "#c8102e",
        },
      ]
    : [
        {
          icon: Music,
          emoji: "🎵",
          title: "Mixtape Mentality",
          subtitle: "Curation as Strategy",
          description:
            "Learn how to curate experiences, build compelling narratives, and create value through strategic selection and sequencing.",
          tags: ["Partnership Strategy", "Narrative Building"],
          color: "#2563eb",
        },
        {
          icon: DollarSign,
          emoji: "💰",
          title: "Common Cents",
          subtitle: "Financial Fluency",
          description:
            "Master the art of translating value into revenue through practical financial wisdom and effective sales strategy.",
          tags: ["Sales Excellence", "Value Communication"],
          color: "#1e40af",
        },
        {
          icon: RefreshCw,
          emoji: "🔄",
          title: "Reinvention",
          subtitle: "Adaptive Identity",
          description:
            "Embrace change and build resilience through continuous learning, authentic evolution, and strategic pivoting.",
          tags: ["Personal Branding", "Growth Mindset"],
          color: "#2563eb",
        },
        {
          icon: Radio,
          emoji: "📡",
          title: "API to the Streets",
          subtitle: "System Thinking",
          description:
            "Bridge the gap between intuition and implementation with systematic approaches to complex business challenges.",
          tags: ["AI for Business", "Process Design"],
          color: "#1e40af",
        },
      ]

  return (
    <section className={`relative overflow-hidden px-6 py-24 ${isDark ? "bg-black" : "bg-gray-50"}`}>
      {isDark && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Spray paint circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-[10%] top-[15%] h-48 w-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, #c8102e 0%, transparent 70%)',
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.08, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-[15%] top-[25%] h-56 w-56 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffd700 0%, transparent 70%)',
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-[20%] left-[20%] h-52 w-52 rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
            }}
          />
          
          {/* Vinyl record scattered */}
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            whileInView={{ opacity: 0.12, rotate: -30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-[10%] right-[10%] h-32 w-32 rounded-full border-6 border-[#ffd700] bg-black"
          >
            <div className="absolute inset-4 rounded-full border-3 border-[#c8102e]" />
            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </motion.div>
          
          {/* Graffiti stars */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 0.15, rotate: 15 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute left-[5%] bottom-[40%] font-(--font-menda-black) text-7xl text-[#c8102e]"
          >
            ★
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            whileInView={{ opacity: 0.12, rotate: -20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute right-[8%] bottom-[50%] font-(--font-menda-black) text-6xl text-[#ffd700]"
          >
            ★
          </motion.div>
          
          {/* Boombox outline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute left-[50%] top-[10%] -translate-x-1/2"
          >
            <div className="h-20 w-32 rounded-lg border-4 border-white bg-transparent p-2">
              <div className="flex h-full gap-2">
                <div className="flex-1 rounded-full border-3 border-[#c8102e]" />
                <div className="flex-1 rounded-full border-3 border-[#c8102e]" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {isDark ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-block"
              >
                <h2
                  className="distressed-text font-(--font-menda-black) text-6xl tracking-tighter text-[#ffd700] md:text-7xl lg:text-8xl"
                  data-text="THE FOUR"
                >
                  THE FOUR
                </h2>
                <div className="mt-2 h-2 w-full bg-[#c8102e]" style={{ transform: "rotate(-1deg)" }} />
                <h3 className="font-(--font-menda-black) text-5xl text-white md:text-6xl">PILLARS</h3>
              </motion.div>
              <p className="mx-auto max-w-3xl text-lg text-gray-300">
                Every workshop ties back to these <span className="font-bold text-[#c8102e]">core principles</span>.
                Learn them. Live them. Lead with them.
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-4 font-bold text-5xl text-[#1a1a1a] md:text-6xl">The Four Pillars</h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Every Hood Kid | Good Kid workshop connects to these foundational principles, creating a comprehensive
                framework for modern leadership.
              </p>
            </>
          )}
        </motion.div>

        {/* Pillars grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden p-8 transition-all ${
                isDark
                  ? "bg-black"
                  : "rounded-2xl bg-white shadow-lg hover:shadow-2xl"
              }`}
              style={
                isDark
                  ? {
                      border: `6px solid ${pillar.color}`,
                      transform: `rotate(${index % 2 === 0 ? "1deg" : "-1deg"})`,
                    }
                  : {}
              }
              whileHover={isDark ? { rotate: 0, scale: 1.02 } : { y: -5 }}
            >
              {/* Background number for Hood Kid */}
              {isDark && (
                <div
                  className="absolute -bottom-8 -right-8 font-(--font-menda-black) text-[180px] opacity-5"
                  style={{ color: pillar.color }}
                >
                  {index + 1}
                </div>
              )}

              <div className="relative">
                {/* Icon and emoji */}
                <div className="mb-6 flex items-center gap-4">
                  {isDark ? (
                    <div className="text-6xl">{pillar.emoji}</div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2563eb]/10">
                      <pillar.icon className="text-[#2563eb]" size={32} />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`mb-2 font-bold leading-tight ${
                    isDark ? "font-(--font-menda-black) text-3xl" : "text-2xl text-[#1a1a1a]"
                  }`}
                  style={isDark ? { color: pillar.color } : {}}
                >
                  {pillar.title}
                </h3>

                {/* Subtitle */}
                <p className={`mb-4 font-bold text-sm ${isDark ? "text-[#f5f5f5]" : "text-[#2563eb]"}`}>
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className={`mb-6 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {pillar.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        isDark
                          ? "bg-black border-2 hover:bg-[#1a1a1a]"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={isDark ? { borderColor: pillar.color, color: pillar.color } : {}}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
