"use client"

import { motion, useAnimation, useInView } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import "remixicon/fonts/remixicon.css"

const creativeTools = [
  { icon: "ri-palette-line", name: "Design", delay: 0.2 },
  { icon: "ri-code-s-slash-line", name: "Code", delay: 0.4 },
  { icon: "ri-camera-line", name: "Photo", delay: 0.6 },
  { icon: "ri-film-line", name: "Video", delay: 0.8 },
  { icon: "ri-brush-line", name: "Art", delay: 1.0 },
  { icon: "ri-magic-line", name: "3D", delay: 1.2 },
]

const FloatingTool = ({ tool, index }: { tool: (typeof creativeTools)[0]; index: number }) => {
  // Use deterministic positioning to avoid hydration issues
  const baseX = 20 + index * 15
  const baseY = 30 + index * 10

  return (
    <motion.div
      className="absolute text-blue-400/30 text-2xl pointer-events-none"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0],
        rotate: [0, 360],
        x: [0, 50 + index * 10, -30 + index * 5, 0],
        y: [0, -30 - index * 5, 20 + index * 3, 0],
      }}
      transition={{
        duration: 4,
        delay: tool.delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 6,
        ease: "easeInOut",
      }}
      style={{
        left: `${baseX}%`,
        top: `${baseY}%`,
      }}
    >
      <i className={tool.icon} />
    </motion.div>
  )
}

// Animated letter component for text reveal
const AnimatedLetter = ({ letter, index }: { letter: string; index: number }) => {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.05 * index + 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  )
}

export const HeroText = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [buttonParticles, setButtonParticles] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [isClient, setIsClient] = useState(false)

  // Only generate random positions on the client to avoid hydration issues
  useEffect(() => {
    setIsClient(true)

    // Generate background particles
    const backgroundParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(backgroundParticles)

    // Generate button particles
    const btnParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setButtonParticles(btnParticles)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  // Split "Toolkit" into individual letters for animation
  const toolkitLetters = "Toolkit".split("")

  return (
    <motion.div
      ref={ref}
      className="relative p-8 border border-blue-500/20 rounded-lg overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{
        transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {/* Enhanced wireframe corner accents with glow */}
      <motion.div
        className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500/60"
        animate={{
          boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-500/60"
        animate={{
          boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-500/60"
        animate={{
          boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-500/60"
        animate={{
          boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
      />

      {/* Floating creative tools */}
      {creativeTools.map((tool, index) => (
        <FloatingTool key={tool.name} tool={tool} index={index} />
      ))}

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 rounded-lg"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05), rgba(20, 184, 166, 0.05))",
            "linear-gradient(225deg, rgba(168, 85, 247, 0.05), rgba(20, 184, 166, 0.05), rgba(59, 130, 246, 0.05))",
            "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05), rgba(20, 184, 166, 0.05))",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Animated particles in background - only render on client */}
      {isClient &&
        particles.map((particle, i) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x: [0, (particle.x % 2 === 0 ? 1 : -1) * 50],
              y: [0, (particle.y % 2 === 0 ? 1 : -1) * 50],
            }}
            transition={{
              duration: 3 + (particle.x % 20) / 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

      <motion.div variants={itemVariants} className="relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-4 sm:mb-6"
          variants={itemVariants}
        >
          <motion.span
            className="block bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Your Creative
          </motion.span>

          {/* Enhanced Toolkit text with 3D effect and individual letter animations */}
          <motion.div className="relative block mt-2" initial={{ perspective: 1000 }}>
            <div className="relative inline-block">
              {/* Shadow/glow effect */}
              <motion.span
                className="absolute -inset-1 block bg-gradient-to-r from-purple-500 via-blue-400 to-teal-300 text-transparent bg-clip-text blur-lg opacity-70"
                style={{ filter: "blur(8px)" }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Toolkit
              </motion.span>

              {/* Main text with letter animations */}
              <span className="relative bg-gradient-to-r from-purple-500 via-blue-400 to-teal-300 text-transparent bg-clip-text">
                {toolkitLetters.map((letter, index) => (
                  <AnimatedLetter key={index} letter={letter} index={index} />
                ))}
              </span>

              {/* Animated cursor */}
              <motion.span
                className="inline-block w-1 h-12 bg-blue-400 ml-2 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1.5 }}
              />
            </div>

            {/* 3D perspective lines */}
            <motion.div
              className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            />
          </motion.div>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed mb-4 sm:mb-6"
          variants={itemVariants}
        >
          <strong className="text-white">Explore</strong> the cutting-edge tools and technologies used by our community
          to{" "}
          <motion.span
            className="text-blue-400 font-semibold"
            animate={{
              textShadow: [
                "0 0 0 rgba(59, 130, 246, 0)",
                "0 0 20px rgba(59, 130, 246, 0.8)",
                "0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            bring ideas to life
          </motion.span>
          .
        </motion.p>

        <motion.p
          className="text-lg sm:text-xl text-neutral-400 font-light max-w-3xl leading-relaxed mb-8 sm:mb-10"
          variants={itemVariants}
        >
          <strong className="text-neutral-200">Digital Canvas</strong> is San Antonio&apos;s creative tech community where{" "}
          <strong className="text-neutral-200">
            designers, developers, photographers, videographers, and digital artists
          </strong>{" "}
          collaborate to push the boundaries of innovation.
        </motion.p>

        <motion.div variants={itemVariants} className="relative inline-block">
          <Link href="/join" passHref legacyBehavior>
            <motion.a
              className="group inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-lg transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900 relative z-10 overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                scale: { duration: 0.2 },
                boxShadow: { duration: 0.3 },
              }}
            >
              <span className="relative z-20 flex items-center">
                Join the Community
                <motion.i
                  className="ri-arrow-right-line ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </span>

              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 rounded-lg"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(20, 184, 166, 0.2))",
                    "linear-gradient(225deg, rgba(168, 85, 247, 0.2), rgba(20, 184, 166, 0.2), rgba(59, 130, 246, 0.2))",
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2), rgba(20, 184, 166, 0.2))",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Enhanced wireframe button design */}
              <div className="absolute inset-0 border border-blue-500/40 rounded-lg group-hover:border-blue-400/80 transition-colors duration-300" />
              <motion.div
                className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/60 group-hover:border-blue-400 transition-colors duration-300"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 10px rgba(59, 130, 246, 0.8)",
                    "0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/60 group-hover:border-blue-400 transition-colors duration-300"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 10px rgba(59, 130, 246, 0.8)",
                    "0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/60 group-hover:border-blue-400 transition-colors duration-300"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 10px rgba(59, 130, 246, 0.8)",
                    "0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/60 group-hover:border-blue-400 transition-colors duration-300"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 10px rgba(59, 130, 246, 0.8)",
                    "0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              />

              {/* Enhanced particle effect on hover - only render on client */}
              {isClient && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {buttonParticles.map((particle, i) => (
                    <motion.div
                      key={`btn-particle-${particle.id}`}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                      }}
                      animate={{
                        y: [-30, -60],
                        x: [0, (particle.x - 50) / 5],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1 + (particle.x % 10) / 10,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.a>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
