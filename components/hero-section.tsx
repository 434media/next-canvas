"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { HeroText } from "./hero-text"
import { WireframeBackground } from "./wireframe-background"
import VideoModal from "./video-modal"
import "remixicon/fonts/remixicon.css"

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Video modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  // 434 Logo scroll animations
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const logoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.2, 0.8, 0.6])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.8, 0.4, 0.1])
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])

  // Pre-calculate scroll-based values for grid highlights
  const gridHighlightScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])
  const gridHighlightOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.2])
  const connectionLineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0])
  const connectionLineScaleX = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const handleLogoClick = () => {
    console.log("Logo clicked!") // Debug log
    setIsVideoModalOpen(true)
  }

  return (
    <>
      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900"
        style={{ opacity, scale }}
      >
        {/* Top padding to prevent navbar overlap */}
        <div className="absolute inset-0 pt-32 sm:pt-36"></div>

        {/* Enhanced Wireframe Background */}
        <WireframeBackground />

        {/* 434 Logo - Enhanced Easter Egg with STRONG Visual Cues */}
        <motion.div
          className="absolute top-1/2 right-8 md:right-16 lg:right-24 z-20 cursor-pointer group"
          style={{
            y: logoY,
            rotate: logoRotate,
            scale: logoScale,
            opacity: logoOpacity,
          }}
          onClick={handleLogoClick}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* MASSIVE Hover Glow - Much More Obvious */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: 2.5,
              opacity: 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500/60 via-purple-500/60 to-teal-500/60 blur-2xl animate-pulse" />
          </motion.div>

          {/* Expanding Ring Waves - Much More Dramatic */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-blue-400/80 animate-ping" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 2.3, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="absolute inset-0 rounded-full border-2 border-purple-400/60 animate-ping"
              style={{ animationDelay: "0.2s" }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: 2.6, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div
              className="absolute inset-0 rounded-full border border-teal-400/40 animate-ping"
              style={{ animationDelay: "0.4s" }}
            />
          </motion.div>

          {/* Pulsing Background Circle - More Intense */}
          <motion.div
            className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500/30 via-purple-500/30 to-teal-500/30"
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{
              scale: [0.9, 1.4, 1.2],
              opacity: [0, 0.8, 0.6],
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              times: [0, 0.6, 1],
            }}
          />

          {/* Main 434 Logo with Enhanced Effects */}
          <motion.img
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/434MediaICONWHITE.png"
            alt="434 MEDIA - Click to unlock easter egg"
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover rounded-full relative z-10 transition-all duration-300"
            animate={{
              filter: [
                "drop-shadow(0 0 0 rgba(59, 130, 246, 0)) brightness(1)",
                "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4)) brightness(1.1)",
                "drop-shadow(0 0 40px rgba(168, 85, 247, 0.3)) brightness(1.2)",
                "drop-shadow(0 0 20px rgba(20, 184, 166, 0.4)) brightness(1.1)",
                "drop-shadow(0 0 0 rgba(59, 130, 246, 0)) brightness(1)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              filter:
                "drop-shadow(0 0 60px rgba(59, 130, 246, 1)) drop-shadow(0 0 80px rgba(168, 85, 247, 0.8)) brightness(1.5)",
              rotate: [0, -5, 5, 0],
            }}
          />

          {/* Enhanced Orbiting Rings - More Visible on Hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            whileHover={{
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: "4px",
              scale: 1.2,
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-purple-400/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            whileHover={{
              borderColor: "rgba(168, 85, 247, 0.9)",
              borderWidth: "3px",
              scale: 1.25,
            }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-teal-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            whileHover={{
              borderColor: "rgba(20, 184, 166, 0.8)",
              borderWidth: "2px",
              scale: 1.3,
            }}
          />

          {/* CLEAR Click Indicator - Appears on Hover */}
          <motion.div
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-linear-to-r from-blue-500 to-purple-600 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/40 shadow-2xl">
              <div className="flex items-center space-x-2">
                <motion.i
                  className="ri-play-circle-line text-white text-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-white font-bold text-sm">CLICK TO PLAY</span>
                <motion.i
                  className="ri-gift-line text-yellow-300 text-lg"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Sparkles - More Obvious */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full pointer-events-none"
              style={{
                left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 80}%`,
                top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 80}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{
                scale: [0, 2, 1.5],
                opacity: [0, 1, 0.8],
                y: [0, -30, -20],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Cursor Pointer Indicator */}
          <div className="absolute inset-0 rounded-full hover:bg-white/5 transition-colors duration-200" />
        </motion.div>

        {/* Enhanced atmospheric effects */}
        <div className="absolute inset-0 z-5">
          {/* Animated grid overlay with scroll */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
            }}
          />

          {/* Scroll-responsive grid highlights */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${(i % 3) * 40 + 20}%`,
                top: `${Math.floor(i / 3) * 40 + 30}%`,
                scale: gridHighlightScale,
                opacity: gridHighlightOpacity,
              }}
              animate={{
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.6)",
                  "0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Scroll-driven connection lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: connectionLineOpacity,
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-linear-to-r from-transparent via-blue-400/40 to-transparent"
                style={{
                  top: `${30 + i * 20}%`,
                  left: "10%",
                  right: "10%",
                  scaleX: connectionLineScaleX,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Main Content - The Creative Layer */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-24 sm:mt-28 md:mt-32"
          style={{ y }}
        >
          <HeroText />
        </motion.div>

        {/* Enhanced ambient light effects with scroll */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.3]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 0.2]),
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.8]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.1]),
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/6 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0.6]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.1]),
          }}
        />
      </motion.section>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </>
  )
}

export default HeroSection
