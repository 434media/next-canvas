"use client"

import Link from "next/link"
import { motion } from "motion/react"

// Event data
const upcomingEvent = {
  title: "More Human Than Human",
  subtitle: "AI Conference",
  date: "February 28, 2026",
  venue: "Geekdom, San Antonio",
  description: "San Antonio's premier AI conference exploring how artificial intelligence is reshaping code, security, and leadership. As AI shifts from a tool we use to an agent that acts, the boundary between human and machine is disappearing.",
  tagline: "We aren't just talking about the future — we're demonstrating the tools that are defining it.",
  href: "/events/morehumanthanhuman",
  image: "https://devsa-assets.s3.us-east-2.amazonaws.com/HEAD_v01.mp4",
  status: "upcoming",
}

const pastEvents = [
  {
    title: "MXR@Main",
    subtitle: "Holiday Celebration",
    date: "December 2025",
    venue: "Main Plaza, San Antonio",
    description: "An incredible evening of connection, celebration, and community. A holiday gathering that brought together San Antonio's creative and tech community.",
    href: "/events/mxratmain",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/mxr-rsvp-desktop.jpg",
    accentColor: "#c41e3a",
  },
  {
    title: "Vanita Leo Christmas",
    subtitle: "Laptop Giveaway",
    date: "December 2025",
    venue: "San Antonio",
    description: "Equipping aspiring women in technology from historically under-resourced San Antonio neighborhoods with critical tools for success.",
    href: "/events/vanitaleochristmas",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/VanitaLeo-loop.mp4",
    accentColor: "#dc2626",
  },
]

// Aztec-inspired corner decoration
function AztecCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h6v48H0z" fill="#333" />
        <path d="M0 0h48v6H0z" fill="#333" />
        <path d="M12 12h3v20h-3z" fill="#fbbf24" opacity="0.6" />
        <path d="M12 12h20v3H12z" fill="#fbbf24" opacity="0.6" />
      </svg>
    </div>
  )
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(#fbbf24 1px, transparent 1px),
                linear-gradient(90deg, #fbbf24 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#fbbf24]/5 blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#ff9900]/5 blur-[200px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <img
              src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
              alt="Digital Canvas"
              className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] max-w-[90vw] h-auto mx-auto mb-4"
            />
            <div className="h-1 w-full max-w-xs mx-auto bg-linear-to-r from-[#fbbf24] via-[#ff9900] to-[#fbbf24] opacity-60 mt-8" />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[0.95] mt-6">
              Events
            </h1>
            <p className="text-[#a3a3a3] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal mt-6">
              Where stories come to life. Curated experiences that bring together San Antonio&apos;s builders, dreamers, and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Event - Featured */}
      <section className="relative py-16 sm:py-24">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1 bg-[#333]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#fbbf24] font-semibold">
                Upcoming Event
              </span>
              <div className="h-px flex-1 bg-[#333]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href={upcomingEvent.href} className="group block">
              <div className="relative border border-[#333] bg-[#111] overflow-hidden transition-all duration-500 group-hover:border-[#fbbf24]/50">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 z-20"><AztecCorner position="top-left" /></div>
                <div className="absolute top-0 right-0 z-20"><AztecCorner position="top-right" /></div>
                <div className="absolute bottom-0 left-0 z-20"><AztecCorner position="bottom-left" /></div>
                <div className="absolute bottom-0 right-0 z-20"><AztecCorner position="bottom-right" /></div>

                <div className="grid lg:grid-cols-2">
                  {/* Video side */}
                  <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <source src={upcomingEvent.image} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#111] lg:block hidden" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent lg:hidden" />
                    <div className="absolute inset-0 bg-black/30" />
                    
                    {/* Status badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-flex items-center gap-2 bg-[#fbbf24] text-[#0a0a0a] font-bold text-xs uppercase tracking-widest px-4 py-2">
                        <span className="w-2 h-2 bg-[#0a0a0a] rounded-full animate-pulse" />
                        Registration Open
                      </span>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="absolute inset-0 bg-linear-to-br from-[#fbbf24]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#737373] mb-4">
                        {upcomingEvent.date} • {upcomingEvent.venue}
                      </p>
                      
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[0.95] mb-2">
                        <span className="text-[#fbbf24]">{upcomingEvent.title.split(' ').slice(0, 2).join(' ')}</span>
                        <span className="block mt-1">{upcomingEvent.title.split(' ').slice(2).join(' ')}</span>
                      </h2>
                      
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#525252] mb-6">
                        {upcomingEvent.subtitle}
                      </p>
                      
                      <p className="text-[#a3a3a3] text-base leading-relaxed mb-4 font-normal">
                        {upcomingEvent.description}
                      </p>
                      
                      <p className="text-[#ff9900] text-sm font-medium leading-relaxed mb-8">
                        {upcomingEvent.tagline}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 bg-[#fbbf24] text-[#0a0a0a] font-bold text-sm uppercase tracking-widest px-6 py-3 transition-all group-hover:bg-[#ff9900]">
                          View Event
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Past Events */}
      <section className="relative py-16 sm:py-24">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1 bg-[#333]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#525252] font-semibold">
                Past Events
              </span>
              <div className="h-px flex-1 bg-[#333]" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={event.href} className="group block h-full">
                  <div className="relative border border-[#333] bg-[#111] overflow-hidden transition-all duration-300 group-hover:border-[#525252] h-full flex flex-col">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 z-20"><AztecCorner position="top-left" /></div>
                    <div className="absolute top-0 right-0 z-20"><AztecCorner position="top-right" /></div>
                    <div className="absolute bottom-0 left-0 z-20"><AztecCorner position="bottom-left" /></div>
                    <div className="absolute bottom-0 right-0 z-20"><AztecCorner position="bottom-right" /></div>

                    {/* Media */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      {event.image.endsWith('.mp4') ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        >
                          <source src={event.image} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-[#111] via-[#111]/50 to-transparent" />
                      
                      {/* Past badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center bg-[#222] text-[#737373] font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-[#333]">
                          Completed
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 sm:p-8 flex-1 flex flex-col">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#525252] mb-3">
                        {event.date} • {event.venue}
                      </p>
                      
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-[0.95] mb-1 group-hover:text-[#fbbf24] transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#525252] mb-4">
                        {event.subtitle}
                      </p>
                      
                      <p className="text-[#737373] text-sm leading-relaxed mb-6 font-normal flex-1">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-2 text-[#525252] group-hover:text-[#a3a3a3] transition-colors">
                        <span className="font-mono text-xs uppercase tracking-widest font-semibold">
                          View Event
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom border */}
      <div className="h-1 w-full bg-linear-to-r from-[#fbbf24] via-[#ff9900] to-[#fbbf24] opacity-60" />
    </main>
  )
}
