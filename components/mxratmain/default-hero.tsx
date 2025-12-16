"use client"

import Image from "next/image"
import { motion } from "motion/react"

const ornaments = [
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-main.png",
    alt: "Main Building Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.1,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-434.png",
    alt: "434 Media Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.2,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-dc.png",
    alt: "Digital Canvas Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.3,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-txmx.png",
    alt: "TXMX Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.4,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-lola.png",
    alt: "Lola Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.5,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-devsatv.png",
    alt: "DevSA TV Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.6,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-cd.png",
    alt: "Culture Deck Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.7,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-pysa.png",
    alt: "PySA Ornament",
    size: "w-16 h-20 md:w-24 md:h-28 lg:w-32 lg:h-36",
    delay: 0.8,
  },
]

export function DefaultHero() {
  return (
    <main className="fixed inset-0 z-30 md:relative md:inset-auto md:z-auto md:min-h-screen w-full bg-white text-black overflow-auto">
      <section className="relative min-h-screen w-full flex flex-col">
        {/* Top decorative bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-[#c41e3a] via-[#228b22] to-[#c41e3a]" />

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-5xl mx-auto"
          >
            <h1 className="font-black flex flex-col items-center mb-6 md:mb-8 lg:mb-10">
              <span className="block text-[#c41e3a] text-[7rem] md:text-[9rem] lg:text-[12rem] xl:text-[15.6rem] leading-[0.9] tracking-tighter drop-shadow-sm">
                MXR
              </span>
              <span className="block text-[#228b22] text-[4.5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] leading-[0.8] tracking-tighter -mt-2 md:-mt-4 lg:-mt-6 drop-shadow-sm">
                @MAIN
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl lg:text-6xl">🎄</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#c41e3a]">
                  Thank You!
                </h2>
                <span className="text-4xl md:text-5xl lg:text-6xl">🎄</span>
              </div>
              <p className="text-base md:text-lg lg:text-xl text-black/80 leading-snug max-w-lg md:max-w-2xl font-semibold text-balance">
                Thank you to everyone who joined us. 
                It was an incredible evening of connection, celebration, and community.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-black/70 leading-snug font-bold">
                You belonged, and you made it unforgettable.
              </p>
            </motion.div>
          </motion.div>
        </div>
        {/* Bottom decorative bar */}
        <div className="w-full h-2 bg-linear-to-r from-[#228b22] via-[#c41e3a] to-[#228b22]" />
      </section>
    </main>
  )
}
