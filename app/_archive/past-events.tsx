// PRESERVED ARCHIVE — Past Programming section
// Originally rendered on /events. Removed from /demo-days during the
// page rename so the demo-day narrative isn't diluted by unrelated past events.
// This file is in a private folder (_archive) so Next.js will not route it.
// Lift `pastEvents` + `<PastProgrammingSection />` into any future home (a
// /community page, an /archive index, etc.) when the content has a story to attach to.

"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

export const pastEvents = [
  {
    title: "More Human Than Human",
    subtitle: "AI Conference",
    date: "February 2026",
    venue: "Geekdom, San Antonio",
    description:
      "San Antonio's premier AI conference exploring how artificial intelligence is reshaping code, security, and leadership — and where the boundary between human and machine is disappearing.",
    href: "/conferences/morehumanthanhuman",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/HEAD_v01.mp4",
  },
  {
    title: "Vanita Leo Christmas",
    subtitle: "Laptop Giveaway",
    date: "December 2025",
    venue: "San Antonio",
    description:
      "Equipping aspiring women in technology from historically under-resourced San Antonio neighborhoods with critical tools for success.",
    href: "/events/vanitaleochristmas",
    image:
      "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/VanitaLeo-loop.mp4",
  },
]

export function PastProgrammingSection() {
  return (
    <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 mb-3 font-bold">
            Past programming
          </p>
          <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
            Recent Digital Canvas gatherings.{" "}
            <span className="text-white/30 font-medium">
              Conferences and community programming powered by the same partners.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {pastEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={event.href} className="group block h-full">
                <div className="relative border border-[#333] bg-[#0a0a0a] overflow-hidden transition-all duration-300 group-hover:border-[#525252] h-full flex flex-col">
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    >
                      <source src={event.image} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center bg-[#222] text-[#737373] font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-[#333]">
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="relative p-6 sm:p-8 flex-1 flex flex-col">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252] mb-3">
                      {event.date} · {event.venue}
                    </p>
                    <h3 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-2xl uppercase tracking-tight text-white font-black mb-1 group-hover:text-[#fbbf24] transition-colors leading-tight">
                      {event.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#525252] mb-4">
                      {event.subtitle}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#525252] group-hover:text-[#a3a3a3] transition-colors">
                      <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                        View
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
