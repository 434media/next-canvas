"use client"
import Image from "next/image"
import { motion } from "motion/react"

export default function WorkshopsPage() {
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Tilted background effect */}
      <motion.div
        className="absolute inset-0 -rotate-3 bg-linear-to-tr from-blue-900/40 via-purple-900/30 to-teal-900/40 pointer-events-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
            alt="Digital Canvas Logo"
            width={180}
            height={54}
            className="mb-8 drop-shadow-2xl"
          />
        </motion.div>
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight tracking-tight mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          Workshops
        </motion.h1>
        <motion.div
          className="block mt-2 text-2xl md:text-3xl lg:text-4xl font-light text-white/80 tracking-wide mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="font-bold text-blue-400">Coming Soon</span>
        </motion.div>
      </div>

      {/* Ambient light effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />
    </motion.section>
  )
}
