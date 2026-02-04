"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import PulsingCircle from "./pulsing-circle"
import { useMobile } from "../hooks/use-mobile"

type BackgroundType = "video1" | "video3" | "video2"

const MissionStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentBackground, setCurrentBackground] = useState<BackgroundType>("video1")
  const [isActive, setIsActive] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  const handleBackgroundChange = () => {
    const backgrounds: BackgroundType[] = ["video1", "video3", "video2"]
    const currentIndex = backgrounds.indexOf(currentBackground)
    const nextIndex = (currentIndex + 1) % backgrounds.length
    setCurrentBackground(backgrounds[nextIndex])

    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      audio.volume = 0.1
      audio.play().catch(() => {})
    } catch (e) {}
  }

  const getLogoStyle = () => {
    switch (currentBackground) {
      case "video1":
      case "video2":
      case "video3":
        return {
          filter: "drop-shadow(0 0 15px #ffffff) drop-shadow(0 0 30px #ffffff)",
          animation: "pulse 2s infinite",
        }
      default:
        return {
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
          color: "#000000",
        }
    }
  }

  const getBannerStyle = () => {
    switch (currentBackground) {
      case "video1":
      case "video2":
      case "video3":
        return {
          background: "rgba(255, 255, 255, 0.9)",
          color: "#000",
          border: "2px solid #ffffff",
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.7)",
        }
      default:
        return {
          background: "#fff",
          color: "#000",
          border: "2px solid #000000",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }
    }
  }

  const renderBackground = () => {
    switch (currentBackground) {
      case "video1":
        return (
          <motion.div
            key="video1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 overflow-hidden"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => {
                if (videoRef.current) {
                  videoRef.current.playbackRate = 0.8
                }
              }}
            >
              <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/deepmind.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        )
      case "video2":
        return (
          <motion.div
            key="video2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 overflow-hidden"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={(e) => {
                const video = e.target as HTMLVideoElement
                video.playbackRate = 0.6
              }}
            >
              <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/pexels-deepmind-growth.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-purple-900/30" />
          </motion.div>
        )
      case "video3":
        return (
          <motion.div
            key="video3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 overflow-hidden"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={(e) => {
                const video = e.target as HTMLVideoElement
                video.playbackRate = 1.2
              }}
            >
              <source src="https://ampd-asset.s3.us-east-2.amazonaws.com/pexel-deepmind-colors.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-cyan-900/25" />
          </motion.div>
        )
      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-white"
          />
        )
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden" ref={containerRef}>
      <AnimatePresence mode="wait">{renderBackground()}</AnimatePresence>

      <div className="absolute inset-0 z-5 bg-linear-to-br from-white/5 via-transparent to-black/5 backdrop-blur-[0.5px]" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="min-h-screen bg-transparent w-full flex items-center justify-center relative overflow-visible">
            <div className="relative z-10 text-center space-y-6 sm:space-y-8 w-full">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={getLogoStyle()}
              >
                <img
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
                  alt="Digital Canvas"
                  className={`${isMobile ? "w-80 max-w-[90vw]" : "w-[600px] max-w-[80vw]"} h-auto mx-auto transition-all duration-500`}
                />
              </motion.div>

              <motion.div
                className="relative text-white p-4 sm:p-6 transform shadow-2xl mx-auto transition-all duration-500 max-w-[95vw] sm:max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={getBannerStyle()}
              >
                <p
                  className="text-lg sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-center leading-tight"
                  style={{ fontFamily: "Arial Black, sans-serif" }}
                >
                  The Creative Layer of{" "}
                  <span className="bg-white/5 text-black border px-1 py-1 sm:px-2 sm:py-1 md:px-3 md:py-2 font-menda-black inline-block mt-1 sm:mt-0">
                    434 MEDIA
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-30">
        <div
          className="relative w-20 h-20 flex items-center justify-center cursor-pointer group"
          onClick={handleBackgroundChange}
        >
          <PulsingCircle />

          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0 rounded-full border border-white/10"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-110 transition-transform duration-300"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle-text" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-sm fill-black/70 font-geist-mono drop-shadow-lg">
              <textPath href="#circle-text" startOffset="0%">
                434 MEDIA• Creative • House
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes flicker {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}

export default MissionStatement
