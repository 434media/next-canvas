"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState, useRef } from "react"
import { Palette, Code, Camera, Film, Brush, Wand2, Ruler, Compass, Lightbulb, Rocket } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  icon: React.ComponentType<{ className?: string }>
  delay: number
  scale: number
}

const creativeIcons = [Palette, Code, Camera, Film, Brush, Wand2, Ruler, Compass, Lightbulb, Rocket]

interface WireframeBackgroundProps {
  theme?: "light" | "dark"
}

export const WireframeBackground = ({ theme = "light" }: WireframeBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  const colors =
    theme === "light"
      ? {
          grid: "rgba(251, 191, 36, 0.1)", // yellow-400 with low opacity
          nodes: "bg-yellow-400/20",
          nodeGlow: "rgba(251, 191, 36, 0.4)",
          particles: "text-amber-600/30",
          lines: {
            primary: "rgb(251, 191, 36)", // yellow-400
            secondary: "rgb(251, 146, 60)", // orange-400 (ember)
            tertiary: "rgb(244, 63, 94)", // rose-500
            quaternary: "rgb(14, 165, 233)", // sky-500 (sky blue)
          },
          shapes: "border-yellow-400/20",
        }
      : {
          grid: "rgba(200, 255, 255, 0.03)",
          nodes: "bg-blue-400/30",
          nodeGlow: "rgba(59, 130, 246, 0.6)",
          particles: "text-blue-400/20",
          lines: {
            primary: "rgb(59, 130, 246)",
            secondary: "rgb(168, 85, 247)",
            tertiary: "rgb(20, 184, 166)",
            quaternary: "rgb(56, 189, 248)", // sky-400 (sky blue)
          },
          shapes: "border-blue-400/20",
        }

  // Generate particles only on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true)

    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: (i * 7 + 10) % 100,
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
            linear-gradient(to bottom right, ${colors.grid} 1px, transparent 1px),
            linear-gradient(to bottom right, ${colors.grid} 1px, transparent 1px)
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
            className={`absolute w-1 h-1 ${colors.nodes} rounded-full`}
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 25}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              boxShadow: ["0 0 0 rgba(0, 0, 0, 0)", `0 0 20px ${colors.nodeGlow}`, "0 0 0 rgba(0, 0, 0, 0)"],
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

      {/* Floating creative tool particles - only render on client */}
      {isClient &&
        particles.map((particle) => {
          const IconComponent = particle.icon
          return (
            <motion.div
              key={particle.id}
              className={`absolute ${colors.particles} pointer-events-none`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
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
              <IconComponent className={`w-6 h-6`} />
            </motion.div>
          )
        })}

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.lines.primary} stopOpacity="0.6" />
            <stop offset="33%" stopColor={colors.lines.secondary} stopOpacity="0.4" />
            <stop offset="66%" stopColor={colors.lines.tertiary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colors.lines.quaternary} stopOpacity="0.5" />
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

        {/* New animated path with sky blue emphasis */}
        <motion.path
          d="M400,0 Q450,300 400,600 T400,1200"
          stroke={colors.lines.quaternary}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 5.5,
            delay: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className={`absolute ${colors.shapes} pointer-events-none`}
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
    </div>
  )
}
