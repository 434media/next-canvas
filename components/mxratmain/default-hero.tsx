"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

const ornaments = [
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-main.png",
    alt: "Main Building Ornament",
    position: "top-16 left-0 md:top-20 md:left-8",
    size: "w-20 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40",
    rotate: "-rotate-12",
    delay: 0.1,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-434.png",
    alt: "434 Media Ornament",
    position: "top-16 left-16 md:top-20 md:left-auto md:right-8",
    size: "w-20 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40",
    rotate: "rotate-6",
    delay: 0.2,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-dc.png",
    alt: "TXMX Ornament",
    position: "top-16 left-50 md:top-1/3 md:left-4 lg:left-12",
    size: "w-20 h-24 md:w-24 md:h-36 lg:w-32 lg:h-48",
    rotate: "-rotate-3",
    delay: 0.3,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-txmx.png",
    alt: "Vanita Ornament",
    position: "top-16 right-50 md:top-1/3 md:right-4 lg:right-12",
    size: "w-20 h-24 md:w-24 md:h-32 lg:w-32 lg:h-40",
    rotate: "rotate-3",
    delay: 0.4,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-lola.png",
    alt: "Digital Canvas Ornament",
    position: "top-16 right-10 md:top-auto md:bottom-46 md:left-12",
    size: "w-32 h-24 md:w-28 md:h-28 lg:w-36 lg:h-32",
    rotate: "-rotate-6",
    delay: 0.5,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-devsatv.png",
    alt: "Culture Deck Ornament",
    position: "top-18 -right-6 md:top-auto md:bottom-40 md:right-8 lg:right-16",
    size: "w-28 h-16 md:w-24 md:h-20 lg:w-32 lg:h-28",
    rotate: "rotate-6",
    delay: 0.6,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-cd.png",
    alt: "DevSA Ornament",
    position: "bottom-30 -left-2 md:bottom-24 md:left-10",
    size: "w-32 h-28 md:w-24 md:h-24 lg:w-60 lg:h-40",
    rotate: "-rotate-6",
    delay: 0.7,
  },
  {
    src: "https://ampd-asset.s3.us-east-2.amazonaws.com/ornament-pysa.png",
    alt: "Pysa Ornament",
    position: "bottom-60 -right-8 md:bottom-20 md:right-91",
    size: "w-32 h-32 md:w-36 md:h-16 lg:w-44 lg:h-40",
    rotate: "rotate-3",
    delay: 0.8,
  },
]

export function DefaultHero() {
  return (
    <main className="fixed inset-0 z-30 md:relative md:inset-auto md:z-auto md:h-screen w-full bg-white text-black overflow-hidden">
      <section className="relative h-full w-full flex items-center justify-center overflow-hidden">
        {ornaments.map((ornament, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: ornament.delay,
              ease: "easeOut",
            }}
            className={`absolute ${ornament.position} ${ornament.size} ${ornament.rotate} z-10`}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              <Image
                src={ornament.src || "/placeholder.svg"}
                alt={ornament.alt}
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, 160px"
              />
            </motion.div>
          </motion.div>
        ))}

        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pt-20 md:pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="font-black flex flex-col items-center mb-4 md:mb-6 lg:mb-8">
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
              className="flex flex-col items-center gap-3 md:gap-4 mb-4 md:mb-6"
            >
              <p className="text-base md:text-lg lg:text-xl text-black/80 leading-snug max-w-lg md:max-w-2xl font-semibold text-balance">
                A holiday party for molecules & musicians, scientists & screwups, techies & teachers, founders &
                funders, gamers & grunts.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-black/70 leading-snug font-bold">
                If you belong to something, you belong.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-4 md:mb-6"
            >
              <Link
                href="/events/mxratmain/rsvp"
                className="group inline-flex items-center gap-2 md:gap-3 text-3xl md:text-4xl lg:text-5xl font-black text-[#c41e3a] hover:text-[#228b22] transition-colors duration-300"
              >
                <span className="relative">
                  RSVP
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 md:h-1.5 bg-linear-to-r from-[#c41e3a] to-[#228b22] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col items-center gap-1"
            >
              <p className="text-xs md:text-sm text-black/50 uppercase tracking-[0.2em] font-semibold">
                A free community experience by
              </p>
              <p className="font-black text-base md:text-lg text-black/80">434 MEDIA</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-[#c41e3a] via-[#228b22] to-[#c41e3a]" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-[#228b22] via-[#c41e3a] to-[#228b22]" />
      </section>
    </main>
  )
}
