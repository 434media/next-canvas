"use client"

import { motion } from "motion/react"

// Sponsor data
const sponsors = [
  {
    name: "v0 by Vercel",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/v0.svg",
    url: "https://v0.app/ref/MVBIAI",
    invert: true,
    heightClass: "h-24 md:h-32",
  },
  {
    name: "Lean Techniques",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/lean.png",
    url: "https://www.leantechniques.com/",
    invert: false,
    heightClass: "h-24 md:h-24",
  },
]

// Partner data
const partners = [
  {
    name: "DEVSA TV",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/morehuman/devsatv-logo.PNG",
    url: "https://devsa.community",
    invert: false,
    heightClass: "h-24 md:h-28",
  },
  {
    name: "434 Media",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/434media-light.svg",
    url: "https://434media.com",
    invert: false,
    heightClass: "h-16 md:mb-4",
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
    <div className={`w-10 h-10 ${rotations[position]}`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M0 0h6v48H0z" fill="#333" />
        <path d="M0 0h48v6H0z" fill="#333" />
        <path d="M12 12h3v20h-3z" fill="#fbbf24" opacity="0.6" />
        <path d="M12 12h20v3H12z" fill="#fbbf24" opacity="0.6" />
      </svg>
    </div>
  )
}

export function SponsorsSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0a0a0a]" data-bg-type="dark">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#fbbf24 1px, transparent 1px),
              linear-gradient(90deg, #fbbf24 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#fbbf24]/5 blur-[250px]" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="h-1 w-full max-w-md mx-auto bg-linear-to-r from-[#fbbf24] via-[#ff9900] to-[#fbbf24] opacity-60 mb-8" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight mb-4">
            Sponsors & Partners
          </h2>
          <p className="text-[#a3a3a3] text-lg max-w-2xl mx-auto">
            Thank you to the organizations making this event possible
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Sponsors Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group h-full"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#fbbf24]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative border border-[#333] bg-[#111] p-8 lg:p-10 transition-all duration-300 group-hover:border-[#fbbf24]/50 h-full min-h-[400px] flex flex-col">
              <div className="absolute top-0 left-0"><AztecCorner position="top-left" /></div>
              <div className="absolute top-0 right-0"><AztecCorner position="top-right" /></div>
              <div className="absolute bottom-0 left-0"><AztecCorner position="bottom-left" /></div>
              <div className="absolute bottom-0 right-0"><AztecCorner position="bottom-right" /></div>
              
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                  Sponsors
                </h3>
              </div>  
              {/* Sponsor logos grid */}
              <div className="flex-1 flex flex-col items-center justify-center gap-10">
                {sponsors.map((sponsor) => (
                  <a
                    key={sponsor.name}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className={`${sponsor.heightClass} w-auto ${sponsor.invert ? 'invert' : ''}`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Partners Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group h-full"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#00f2ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative border border-[#333] bg-[#111] p-8 lg:p-10 transition-all duration-300 group-hover:border-[#00f2ff]/50 h-full min-h-[400px] flex flex-col">
              <div className="absolute top-0 left-0"><AztecCorner position="top-left" /></div>
              <div className="absolute top-0 right-0"><AztecCorner position="top-right" /></div>
              <div className="absolute bottom-0 left-0"><AztecCorner position="bottom-left" /></div>
              <div className="absolute bottom-0 right-0"><AztecCorner position="bottom-right" /></div>
              
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                  Partners
                </h3>
              </div>
              {/* Partner logos grid */}
              <div className="flex-1 flex flex-col items-center justify-center gap-10">
                {partners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={`${partner.heightClass} w-auto ${partner.invert ? 'invert' : ''}`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Venue Partner - Geekdom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a 
            href="https://geekdom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#333] bg-[#111] px-8 py-6 transition-all duration-300 hover:border-[#ff9900]/50"
          >
            <p className="text-[#525252] font-mono text-[10px] uppercase tracking-[0.2em] mb-2">
              Hosted At
            </p>
            <p className="text-white text-2xl font-bold uppercase tracking-wider hover:text-[#ff9900] transition-colors">
              Geekdom
            </p>
            <p className="text-[#737373] text-sm mt-2">
              San Antonio, TX • February 28, 2026
            </p>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
