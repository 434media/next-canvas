"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  icon: string
  delay: number
  scale: number
}

const creativeIcons = [
  "ri-palette-line",
  "ri-code-s-slash-line",
  "ri-camera-line",
  "ri-film-line",
  "ri-brush-line",
  "ri-magic-line",
  "ri-pencil-ruler-2-line",
  "ri-compasses-2-line",
  "ri-lightbulb-line",
  "ri-rocket-line",
]

export const WireframeBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  // Generate particles only on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true)

    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: (i * 7 + 10) % 100, // Use deterministic positioning based on index
          y: (i * 11 + 15) % 100,
          icon: creativeIcons[i % creativeIcons.length],
          delay: i * 0.3,
          scale: 0.5 + (i % 3) * 0.25,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Enhanced Grid Background with pulsing nodes */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgba(200, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom right, rgba(200, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      >
        {/* Pulsing grid intersection nodes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              boxShadow: [
                "0 0 0 rgba(59, 130, 246, 0)",
                "0 0 20px rgba(59, 130, 246, 0.6)",
                "0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Mouse-following gradient */}
      {/* <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.1) 30%, transparent 60%)`,
        }}
        transition={{ type: "spring", damping: 15 }}
      /> */}

      {/* Floating creative tool particles - only render on client */}
      {isClient &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-blue-400/20 pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.scale * 24}px`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.6, 0.2],
              scale: [particle.scale, particle.scale * 1.3, particle.scale],
            }}
            transition={{
              duration: 8 + particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          >
            <i className={particle.icon} />
          </motion.div>
        ))}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Animated flowing lines */}
        <motion.path
          d="M0,100 Q400,150 800,100 T1600,100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M0,200 Q400,250 800,200 T1600,200"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M0,300 Q600,350 1200,300 T2400,300"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6,
            delay: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Vertical flowing lines */}
        <motion.path
          d="M200,0 Q250,400 200,800 T200,1600"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5,
            delay: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-blue-400/20 pointer-events-none"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
            width: `${20 + (i % 3) * 10}px`,
            height: `${20 + (i % 3) * 10}px`,
            borderRadius: i % 2 === 0 ? "50%" : "0%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{
            duration: 10 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Interactive mouse trail effect */}
      {/* <motion.div
        className="absolute w-32 h-32 pointer-events-none"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full border border-blue-400/30 rounded-full animate-pulse" />
        <div
          className="absolute inset-4 border border-purple-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute inset-8 border border-teal-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </motion.div> */}
    </div>
  )
}
