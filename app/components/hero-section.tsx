"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { WireframeBackground } from "./wireframe-background"
import { HeroText } from "./hero-text"

const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <motion.section className="mt-16 md:mt-10 relative min-h-screen flex items-center overflow-hidden" style={{ opacity, scale }}>
      {/* Added top padding to prevent overlap with navbar */}
      <div className="absolute inset-0 pt-32 sm:pt-36"></div>

      <WireframeBackground />

      {/* Enhanced content container with parallax and adjusted positioning */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-24 sm:mt-28 md:mt-32"
        style={{ y }}
      >
        <HeroText />

        {/* Floating action indicators */}
        <motion.div
          className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-4 text-white/40"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent" />
            <motion.div
              className="text-sm font-medium tracking-wider"
              style={{ writingMode: "vertical-rl" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              SCROLL TO EXPLORE
            </motion.div>
            <motion.i
              className="ri-arrow-down-line text-xl"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced wireframe grid overlay with interactive elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <motion.div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
          }}
        >
          {/* Grid intersection highlights */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${(i % 4) * 25 + 12.5}%`,
                top: `${Math.floor(i / 4) * 33 + 16.5}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 15px rgba(59, 130, 246, 0.5)",
                  "0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Ambient light effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.section>
  )
}

export default HeroSection
