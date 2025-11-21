"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { CHRISTMAS_PARTNERS } from "@/data/christmas-partners"

export function CommunitySpotlight() {
  return (
    <section className="relative z-10 w-full py-24 px-4 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="pointer-events-auto max-w-6xl w-full bg-[#f0f0f0] text-[#1a1a1a] p-6 md:p-16 shadow-2xl relative mx-auto overflow-hidden transform md:-rotate-1"
        style={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 100px rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Paper Texture Overlay - Noise */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }} 
        />

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <h3 className="font-mono text-lg md:text-xl uppercase tracking-[0.2em] border-b-2 border-[#1a1a1a] inline-block pb-2">
            The Creative Bridge to Everything:
          </h3>
        </div>

        {/* Logos Grid */}
        <div className="relative z-10 grid grid-cols-4 md:grid-cols-6 gap-y-8 gap-x-2 md:gap-x-4 items-center justify-items-center w-full">
          {CHRISTMAS_PARTNERS.map((partner, i) => {
            // Hide slash for every 6th item on desktop (end of row)
            const showSlashDesktop = (i + 1) % 6 !== 0
            // Hide slash for every 4th item on mobile (end of row)
            const showSlashMobile = (i + 1) % 4 !== 0
            
            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.5 }}
                className="w-full flex items-center justify-center relative group h-10 md:h-12"
              >
                <a 
                  href={partner.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full h-full flex items-center justify-center hover:scale-105 transition-transform duration-300"
                >
                  {partner.logo ? (
                    <div className="relative w-full h-full max-w-[120px]">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain object-center grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <div className="font-sans font-bold text-[10px] md:text-lg tracking-tighter text-neutral-900 uppercase hover:text-red-600 transition-colors truncate px-1">
                      {partner.name}
                    </div>
                  )}
                </a>

                {/* Slash Separator - Desktop */}
                {showSlashDesktop && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-red-600 text-2xl font-light opacity-80 select-none pointer-events-none transform translate-x-1/2 italic font-serif">
                    /
                  </div>
                )}

                {/* Slash Separator - Mobile */}
                {showSlashMobile && (
                  <div className="md:hidden absolute -right-1 top-1/2 -translate-y-1/2 text-red-600 text-lg font-light opacity-80 select-none pointer-events-none transform translate-x-1/2 italic font-serif">
                    /
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 md:mt-20 text-center font-mono text-xs md:text-sm text-[#1a1a1a]/60 uppercase tracking-widest relative z-10">
          If you belong to something, you belong.
        </div>
        
        {/* Resend-style logo at bottom */}
        <div className="mt-6 md:mt-8 flex justify-center relative z-10">
           <div className="font-menda-black text-xl md:text-2xl tracking-tighter opacity-80">
             434 MEDIA
           </div>
        </div>
      </motion.div>
    </section>
  )
}
