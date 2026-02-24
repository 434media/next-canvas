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
            linear-gradient(#ff9900 1px, transparent 1px),
            linear-gradient(90deg, #ff9900 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#ff9900]/5 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00f2ff]/5 blur-[150px]" />
    </div>
  )
}

// Corner decoration component
function AztecCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }
  
  return (
    <div className={`w-12 h-12 lg:w-16 lg:h-16 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h8v64H0z" fill="#333" />
        <path d="M0 0h64v8H0z" fill="#333" />
        <path d="M16 16h4v24h-4z" fill="#ff9900" opacity="0.6" />
        <path d="M16 16h24v4H16z" fill="#ff9900" opacity="0.6" />
        <path d="M28 28h2v12h-2z" fill="#00f2ff" opacity="0.4" />
        <path d="M28 28h12v2H28z" fill="#00f2ff" opacity="0.4" />
      </svg>
    </div>
  )
}

// Border decoration
function AztecBorder() {
  return (
    <div className="h-1 w-full bg-linear-to-r from-[#ff9900] via-[#00f2ff] to-[#ff9900] opacity-60" />
  )
}

const parkingOptions = [
  {
    name: "St. Mary's Garage",
    highlight: true,
    price: "$5",
    note: "Day-of event rate",
  },
  {
    name: "City Tower Garage",
    highlight: true,
    price: "$10",
    note: "Next door to Geekdom",
  },
]

export function ParkingSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0a0a0a] overflow-hidden" data-bg-type="dark">
      <AztecBackground />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 z-10"><AztecCorner position="top-left" /></div>
      <div className="absolute top-0 right-0 z-10"><AztecCorner position="top-right" /></div>
      <div className="absolute bottom-0 left-0 z-10"><AztecCorner position="bottom-left" /></div>
      <div className="absolute bottom-0 right-0 z-10"><AztecCorner position="bottom-right" /></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="max-w-md mx-auto mb-8">
            <AztecBorder />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[0.9] mb-3">
            Downtown Parking
          </h2>
          <p className="text-[#fbbf24] text-base sm:text-lg lg:text-xl font-semibold leading-[1.4] tracking-[-0.005em] mb-4">
            Has Never Been Easier (or More Affordable)
          </p>
          <p className="text-[#ff9900] text-xs sm:text-sm font-semibold uppercase tracking-widest leading-relaxed">
            Geekdom &bull; Houston Street &bull; San Antonio TX
          </p>
        </motion.div>

        {/* Parking Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10 sm:mb-14"
        >
          <div className="border border-[#333] bg-[#111] p-6 sm:p-8 lg:p-10">
            <p className="text-[#a3a3a3] text-base sm:text-lg leading-[1.75] sm:leading-[1.7] font-normal tracking-[-0.005em] mb-4">
              The City of San Antonio offers convenient and affordable parking — including easy access to city parking garages and ample street parking — all within walking distance to Geekdom on historic Houston Street.
            </p>
            <p className="text-[#a3a3a3] text-base sm:text-lg leading-[1.75] sm:leading-[1.7] font-normal tracking-[-0.005em]">
              City garages charge a{" "}
              <strong className="text-white font-semibold">$10 flat rate</strong> on weekends.{" "}
              On the day of the event,{" "}
              <strong className="text-[#fbbf24] font-bold">St. Mary&apos;s Garage will be charging just $5</strong>.
            </p>
          </div>
        </motion.div>

        {/* Parking Options Grid */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-14">
          {parkingOptions.map((option, index) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={`border p-5 sm:p-6 text-center transition-colors ${
                option.highlight
                  ? "border-[#fbbf24]/50 bg-[#fbbf24]/5"
                  : "border-[#333] bg-[#111]"
              }`}
            >
              {option.highlight && (
                <span className="inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-[#fbbf24] font-bold mb-3 leading-none">
                  Recommended
                </span>
              )}
              <p className={`text-3xl sm:text-4xl font-black leading-none mb-2 ${
                option.highlight ? "text-[#fbbf24]" : "text-white"
              }`}>
                {option.price}
              </p>
              <p className="text-white text-sm sm:text-base font-semibold uppercase tracking-wide leading-snug mb-1">
                {option.name}
              </p>
              <p className="text-[#737373] font-mono text-[10px] uppercase tracking-[0.15em] leading-relaxed">
                {option.note}
              </p>
            </motion.div>
          ))}

          {/* City Parking Options link card */}
          <motion.a
            href="https://sapark.sanantonio.gov/Parking-Locations/Affordable-Parking"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group border border-dashed border-[#333] p-5 sm:p-6 text-center transition-all hover:border-[#ff9900] hover:bg-[#ff9900]/5"
          >
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 border border-[#333] group-hover:border-[#ff9900] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#737373] group-hover:text-[#ff9900] transition-colors">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[#a3a3a3] group-hover:text-[#ff9900] text-sm font-semibold uppercase tracking-wide leading-snug mb-1 transition-colors">
              More Options
            </p>
            <p className="text-[#525252] font-mono text-[10px] uppercase tracking-[0.15em] leading-relaxed">
              City Parking Locations
            </p>
          </motion.a>
        </div>

        {/* Bottom border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-md mx-auto mt-12 sm:mt-16"
        >
          <AztecBorder />
        </motion.div>
      </div>
    </section>
  )
}
