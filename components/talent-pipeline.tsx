"use client"

import { motion } from "motion/react"
import { talentPipeline } from "@/data/proof-points"

type Props = {
  accent: string
  eyebrow?: string
  title: string
  titleMuted: string
  intro?: string
}

// Light-theme section. Renders DevSA's reach SORTED BY WHAT IT PROVES — the
// cyber cluster (DEFCON + BSides) leads as the anchor vertical. Shared by the
// builders and underwriters pages so the pipeline lives in one place.
export default function TalentPipeline({
  accent,
  eyebrow = "Talent pipeline",
  title,
  titleMuted,
  intro,
}: Props) {
  // Lime reads poorly as small text on white — fall back to ink for labels.
  const labelColor = accent === "#88FF00" ? "#0a0a0a" : accent

  return (
    <section className="relative bg-[#f4f4f2] py-20 md:py-28 px-6 border-t border-[#e5e5e3]">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/50 font-bold">
              {eyebrow}
            </p>
          </div>
          <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-[#0a0a0a] uppercase tracking-wide leading-tight max-w-3xl">
            {title} <span className="text-black/40 font-medium">{titleMuted}</span>
          </h2>
          {intro && (
            <p className="text-black/55 text-sm md:text-base leading-[1.75] mt-5 max-w-2xl">
              {intro}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {talentPipeline.map((cluster, i) => {
            const isAnchor = cluster.key === "cyber"
            return (
              <motion.div
                key={cluster.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="relative bg-white border border-black/10 p-6 md:p-7 flex flex-col"
              >
                {isAnchor && (
                  <span
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  />
                )}
                {isAnchor && (
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.25em] mb-3 block"
                    style={{ color: labelColor }}
                  >
                    Anchor vertical
                  </span>
                )}
                <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.15em] text-[#0a0a0a] font-bold mb-2">
                  {cluster.label}
                </h3>
                <p className="text-black/55 text-sm leading-[1.7] mb-5 flex-1">
                  {cluster.note}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.communities.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/55 border border-black/10 px-2 py-1"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-black/35 mt-6 max-w-2xl leading-relaxed">
          Communities bridged through DevSA. Each cohort recruits from the clusters
          that fit its vertical.
        </p>
      </div>
    </section>
  )
}
