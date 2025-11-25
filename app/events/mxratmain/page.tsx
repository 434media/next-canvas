"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

export default function MxrAtMainPage() {
  return (
    <main className="relative min-h-screen w-full bg-white text-black overflow-hidden pt-16">
      {/* Hero Section - Full viewport height minus navbar */}
      <section className="relative h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        
        {/* Container to match navbar width */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-between relative z-10 pt-24 lg:pt-0">
          
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-start flex-none lg:flex-1 z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start w-full"
            >
              {/* Event Title */}
              <h1 className="font-menda-black flex flex-col items-center w-fit pr-0 -mt-10 md:mt-0 mb-2 lg:mb-6 text-left">
                <span className="block text-[#c41e3a] text-[4.4rem] sm:text-[5rem] md:text-[6rem] lg:text-[11.9rem] leading-[0.9] tracking-tighter">
                  MXR
                </span>
                <span className="block text-[#c41e3a] text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] leading-[0.85] tracking-tighter -mt-2 lg:-mt-4">
                  @MAIN
                </span>
              </h1>

              {/* Event Description */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-3 mb-4 lg:mb-8"
              >
                <p className="text-xs sm:text-base lg:text-xl text-black/80 leading-tight max-w-[230px] lg:max-w-xl font-bold">
                  A holiday party for molecules & musicians, scientist & screwups, techies & teachers, founders & funders, gamers & grunts.
                </p>
                <p className="text-xs sm:text-base lg:text-xl text-black/80 leading-tight max-w-md lg:max-w-xl font-bold">
                  If you belong to something, <span className="block md:inline">you belong.</span>
                </p>
              </motion.div>

              {/* RSVP Link */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mb-4 lg:mb-10"
              >
                <Link
                  href="/events/mxratmain/rsvp"
                  className="group inline-flex items-center gap-2 text-lg sm:text-2xl lg:text-4xl font-(--font-menda-black) tracking-tight text-[#c41e3a] hover:text-[#c41e3a]/90 transition-colors duration-300"
                >
                  <span className="relative">
                    RSVP
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-[#c41e3a] to-[#228b22] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </span>
                  <svg
                    className="w-4 h-4 lg:w-8 lg:h-8 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              {/* Brought to you by */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-1 lg:gap-2"
              >
                <p className="text-[10px] lg:text-base text-black/60 uppercase tracking-tighter md:tracking-widest font-bold">
                  A free community experience <span className="block md:inline">brought to you by</span>
                </p>
                <p className="font-menda-black">
                  434 MEDIA
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="w-full lg:w-1/2 flex-1 lg:h-full relative flex items-end justify-center lg:justify-end min-h-0">
             <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxratmain-tower.png"
                alt="MXR@MAIN - 434 MEDIA Building"
                fill
                className="object-contain object-bottom-right lg:object-right scale-[1.32] -mt-20 md:mt-0 ml-2 md:ml-0 lg:scale-105 origin-bottom-right lg:origin-center translate-x-4 lg:translate-x-0"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
