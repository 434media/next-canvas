"use client"

import { motion } from "motion/react"

// Aztec-inspired geometric pattern for background
function AztecBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#fbbf24 1px, transparent 1px),
            linear-gradient(90deg, #fbbf24 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#fbbf24]/5 blur-[200px]" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#ff9900]/5 blur-[200px]" />
    </div>
  )
}

// Corner decoration component
function AztecCornerLarge({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h8v64H0z" fill="#333" />
        <path d="M0 0h64v8H0z" fill="#333" />
        <path d="M16 16h4v24h-4z" fill="#fbbf24" opacity="0.6" />
        <path d="M16 16h24v4H16z" fill="#fbbf24" opacity="0.6" />
        <path d="M28 28h2v12h-2z" fill="#ff9900" opacity="0.4" />
        <path d="M28 28h12v2H28z" fill="#ff9900" opacity="0.4" />
      </svg>
    </div>
  )
}

// Border decoration
function AztecBorder() {
  return (
    <div className="h-1 w-full bg-linear-to-r from-[#fbbf24] via-[#ff9900] to-[#fbbf24] opacity-60" />
  )
}

export function RegistrationSection() {
  return (
    <section id="register" className="relative py-20 sm:py-28 bg-[#0a0a0a] overflow-hidden" data-bg-type="dark">
      <AztecBackground />
      
      {/* Large corner decorations */}
      <div className="absolute top-0 left-0 z-10"><AztecCornerLarge position="top-left" /></div>
      <div className="absolute top-0 right-0 z-10"><AztecCornerLarge position="top-right" /></div>
      <div className="absolute bottom-0 left-0 z-10"><AztecCornerLarge position="bottom-left" /></div>
      <div className="absolute bottom-0 right-0 z-10"><AztecCornerLarge position="bottom-right" /></div>
      
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="max-w-md mx-auto mb-8">
            <AztecBorder />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[0.9] mb-4">
            Sold Out
          </h2>
          <p className="text-[#a3a3a3] text-sm sm:text-base leading-[1.7] font-normal max-w-xl mx-auto">
            This event has reached venue capacity.{" "}
            Can&apos;t make it in person? Watch every session{" "}
            <strong className="text-[#ff5f56] font-bold">streamed live</strong>{" "}
            on the DEVSA YouTube channel.
          </p>
          <p className="text-[#ff9900] text-xs sm:text-sm font-semibold mt-3 uppercase tracking-widest leading-relaxed">
            February 28, 2026 &bull; Geekdom &bull; Free Event
          </p>
        </motion.div>

        {/* Live Stream Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="border border-[#333] bg-[#111] p-4 sm:p-6">
            {/* Live badge + title row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5f56] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff5f56]" />
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[#ff5f56] font-bold leading-none">
                  Live Stream
                </span>
              </div>
              <a
                href="https://www.youtube.com/live/JOx9ObjlKAg?si=eXnLWhFAoPiF2EQH"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[#a3a3a3] hover:text-[#ff5f56] font-semibold text-[10px] sm:text-xs uppercase tracking-widest transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#ff5f56]">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814Z" />
                  <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568Z" fill="#0a0a0a" />
                </svg>
                <span>Open on YouTube</span>
                <svg 
                  className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* YouTube Embed */}
            <div className="relative w-full aspect-video bg-black border border-[#222]">
              <iframe
                src="https://www.youtube.com/embed/JOx9ObjlKAg?si=eXnLWhFAoPiF2EQH"
                title="More Human Than Human — Live Stream on DEVSA YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-md mx-auto mt-12 sm:mt-14"
        >
          <AztecBorder />
        </motion.div>
      </div>
    </section>
  )
}
