"use client"

import { motion } from "motion/react"
import Link from "next/link"

export const HeroText = () => {
  return (
    <motion.div
      className="relative p-8 border border-blue-500/20 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Wireframe corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/40" />

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text">
          Create. Collaborate. Inspire.
        </span>
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed mb-8 sm:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Create. Collaborate. Inspire. That&apos;s the heart of our community. Share your projects, spark collaborations, and learn alongside fellow creators. 
        Whether you&apos;re a seasoned pro or just diving in, Digital Canvas provides the welcoming environment you need to ignite your creative journey.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative inline-block"
      >
        <Link href="https://discord.gg/SCfmebDfW6" passHref legacyBehavior>
          <motion.a
            className="inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Community
            {/* Wireframe button design */}
            <div className="absolute inset-0 border border-blue-500/40 rounded-lg" />
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg" />
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500/60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-500/60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-500/60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500/60" />
          </motion.a>
        </Link>
      </motion.div>
    </motion.div>
  )
}

