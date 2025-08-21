"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import PulsingCircle from "./pulsing-circle"
import { useMobile } from "../hooks/use-mobile"
import { Vortex } from "./vortex"
import { WavyBackground } from "./wavy-background"

// Background environment types
type BackgroundType = "comic" | "video1" | "crt" | "video3" | "vortex" | "video2" | "wavy"

const MissionStatement = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentBackground, setCurrentBackground] = useState<BackgroundType>("comic")
  const [isActive, setIsActive] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
    }> = []

    const createParticles = () => {
      particles.length = 0
      const particleCount = 30

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: getParticleColor(),
          alpha: Math.random() * 0.8 + 0.2,
        })
      }
    }

    const getParticleColor = () => {
      switch (currentBackground) {
        case "crt":
          return "#00ff00"
        case "vortex":
          return "#6366f1"
        case "comic":
          return "#fbbf24"
        case "video1":
        case "video2":
        case "video3":
          return "#ffffff"
        case "wavy":
          return "#38bdf8"
        default:
          return "#6b7280"
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentBackground])

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
    const backgrounds: BackgroundType[] = ["comic", "video1", "crt", "video3", "vortex", "video2", "wavy"]
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
      case "crt":
        return {
          filter: "drop-shadow(0 0 10px #00ff00) contrast(1.2) brightness(1.1)",
          fontFamily: "monospace",
        }
      case "vortex":
        return {
          filter: "drop-shadow(0 0 20px #6366f1) drop-shadow(0 0 40px #4f46e5)",
          animation: "pulse 2s infinite",
        }
      case "comic":
        return {
          filter: "drop-shadow(4px 4px 0px #000) drop-shadow(8px 8px 0px #fbbf24)",
        }
      case "video1":
      case "video2":
      case "video3":
        return {
          filter: "drop-shadow(0 0 15px #ffffff) drop-shadow(0 0 30px #ffffff)",
          animation: "pulse 2s infinite",
        }
      case "wavy":
        return {
          filter: "drop-shadow(0 0 15px #38bdf8) drop-shadow(0 0 30px #818cf8)",
          animation: "pulse 3s infinite",
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
      case "crt":
        return {
          background: "rgba(0, 255, 0, 0.1)",
          border: "2px solid #00ff00",
          color: "#00ff00",
          fontFamily: "monospace",
          textShadow: "0 0 10px #00ff00",
        }
      case "vortex":
        return {
          background: "linear-gradient(45deg, #6366f1, #4f46e5)",
          border: "2px solid #818cf8",
          boxShadow: "0 0 40px rgba(99, 102, 241, 0.8)",
        }
      case "comic":
        return {
          background: "#fbbf24",
          color: "#000",
          border: "4px solid #000",
          boxShadow: "8px 8px 0px #000",
        }
      case "video1":
      case "video2":
      case "video3":
        return {
          background: "rgba(255, 255, 255, 0.9)",
          color: "#000",
          border: "2px solid #ffffff",
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.7)",
        }
      case "wavy":
        return {
          background: "rgba(56, 189, 248, 0.15)",
          color: "#ffffff",
          border: "2px solid #38bdf8",
          boxShadow: "0 0 30px rgba(56, 189, 248, 0.5)",
          backdropFilter: "blur(10px)",
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
      case "crt":
        return (
          <motion.div
            key="crt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black"
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 255, 0, 0.03) 2px,
                  rgba(0, 255, 0, 0.03) 4px
                ),
                radial-gradient(ellipse at center, rgba(0, 255, 0, 0.1) 0%, transparent 70%),
                #000000
              `,
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  repeating-linear-gradient(
                    90deg,
                    transparent 0px,
                    rgba(0, 255, 0, 0.1) 1px,
                    transparent 2px
                  )
                `,
              }}
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                mixBlendMode: "screen",
              }}
              animate={{
                opacity: [0.2, 0.6, 0.1, 0.4],
                scale: [1, 1.01, 0.99, 1],
              }}
              transition={{
                duration: 0.08,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                mixBlendMode: "screen",
              }}
              animate={{
                opacity: [0, 0, 0, 0.3, 0, 0, 0, 0.1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                times: [0, 0.1, 0.2, 0.21, 0.22, 0.5, 0.7, 0.71, 1],
              }}
            />

            <div className="absolute inset-0 opacity-40">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-green-400 font-mono text-xs"
                  style={{ left: `${i * 3.33}%`, top: "-100px" }}
                  animate={{
                    y: [0, window.innerHeight + 100],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                    ease: "linear",
                  }}
                >
                  {Array.from({ length: 15 })
                    .map(() => String.fromCharCode(0x30a0 + Math.random() * 96))
                    .join("")}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="absolute inset-0 bg-green-500 mix-blend-multiply"
              animate={{
                opacity: [0, 0, 0, 0.08, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Number.POSITIVE_INFINITY,
                times: [0, 0.94, 0.96, 0.98, 1],
              }}
            />
          </motion.div>
        )
      case "vortex":
        return (
          <motion.div
            key="vortex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{ backgroundColor: "#1e1b4b" }}
          >
            <Vortex
              backgroundColor="transparent"
              particleCount={1200}
              baseHue={240}
              baseSpeed={0.15}
              rangeSpeed={3}
              baseRadius={1.5}
              rangeRadius={4}
            />
          </motion.div>
        )
      case "comic":
        return (
          <motion.div
            key="comic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, #ff6b6b 0%, transparent 25%),
                radial-gradient(circle at 80% 80%, #4ecdc4 0%, transparent 25%),
                radial-gradient(circle at 60% 40%, #45b7d1 0%, transparent 25%),
                radial-gradient(circle at 30% 70%, #96ceb4 0%, transparent 25%),
                radial-gradient(circle at 70% 20%, #feca57 0%, transparent 25%),
                #ffd93d
              `,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  repeating-linear-gradient(
                    45deg,
                    transparent 0px,
                    rgba(0, 0, 0, 0.15) 1px,
                    transparent 12px
                  ),
                  repeating-linear-gradient(
                    -45deg,
                    transparent 0px,
                    rgba(0, 0, 0, 0.08) 1px,
                    transparent 18px
                  ),
                  radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.1) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.1) 2px, transparent 2px)
                `,
                backgroundSize: "20px 20px, 25px 25px, 15px 15px, 15px 15px",
              }}
            />
          </motion.div>
        )
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
      case "wavy":
        return (
          <motion.div
            key="wavy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <WavyBackground
              colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
              waveWidth={50}
              backgroundFill="#0f172a"
              blur={10}
              speed="fast"
              waveOpacity={0.6}
              className="absolute inset-0"
            />
          </motion.div>
        )
      default:
        return (
          <motion.div
            key="comic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 overflow-hidden"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, #ff6b6b 0%, transparent 25%),
                radial-gradient(circle at 80% 80%, #4ecdc4 0%, transparent 25%),
                radial-gradient(circle at 60% 40%, #45b7d1 0%, transparent 25%),
                radial-gradient(circle at 30% 70%, #96ceb4 0%, transparent 25%),
                radial-gradient(circle at 70% 20%, #feca57 0%, transparent 25%),
                #ffd93d
              `,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `
                  repeating-linear-gradient(
                    45deg,
                    transparent 0px,
                    rgba(0, 0, 0, 0.15) 1px,
                    transparent 12px
                  ),
                  repeating-linear-gradient(
                    -45deg,
                    transparent 0px,
                    rgba(0, 0, 0, 0.08) 1px,
                    transparent 18px
                  ),
                  radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.1) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.1) 2px, transparent 2px)
                `,
                backgroundSize: "20px 20px, 25px 25px, 15px 15px, 15px 15px",
              }}
            />
          </motion.div>
        )
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden" ref={containerRef}>
      <AnimatePresence mode="wait">{renderBackground()}</AnimatePresence>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-5"
        style={{ mixBlendMode: currentBackground === "comic" ? "multiply" : "screen" }}
      />

      <div className="absolute inset-0 z-5 bg-gradient-to-br from-white/5 via-transparent to-black/5 backdrop-blur-[0.5px]" />

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
        @keyframes crt-flicker {
          0% { opacity: 1; }
          98% { opacity: 1; }
          99% { opacity: 0.98; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}

export default MissionStatement
