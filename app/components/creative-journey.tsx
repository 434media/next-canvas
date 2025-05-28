"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react"
import Image from "next/image"
import "remixicon/fonts/remixicon.css"

const journeyStages = [
  {
    id: "ideation",
    title: "Ideation",
    subtitle: "Where it all begins",
    description:
      "Every great project starts with a spark of inspiration. We help you capture, refine, and visualize your ideas through collaborative brainstorming and concept development.",
    tools: ["Figma", "Miro", "Notion", "Whimsical"],
    icon: "ri-lightbulb-line",
    color: "from-yellow-400 to-orange-500",
    colorHex: "#fbbf24",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/ui.avif",
    quote: "The best way to have a good idea is to have lots of ideas.",
    author: "Linus Pauling",
  },
  {
    id: "design",
    title: "Design",
    subtitle: "Bringing ideas to life",
    description:
      "Transform concepts into beautiful, functional designs that tell your story and engage your audience. Our community shares techniques for creating compelling visual experiences.",
    tools: ["Adobe Creative Suite", "Figma", "Sketch", "Framer"],
    icon: "ri-palette-line",
    color: "from-pink-400 to-purple-500",
    colorHex: "#ec4899",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/adobe.png",
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },
  {
    id: "development",
    title: "Development",
    subtitle: "Code meets creativity",
    description:
      "Build interactive experiences with cutting-edge technologies that push the boundaries of what's possible. Learn how to bring designs to life through code and interactive elements.",
    tools: ["React", "Three.js", "GSAP", "Next.js"],
    icon: "ri-code-s-slash-line",
    color: "from-blue-400 to-cyan-500",
    colorHex: "#3b82f6",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/three.png",
    quote: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    id: "media",
    title: "Media Production",
    subtitle: "Visual storytelling",
    description:
      "Capture and create stunning visuals that communicate your message with impact and emotion. Explore techniques for photography, videography, and motion graphics.",
    tools: ["Adobe Premiere", "After Effects", "DaVinci Resolve", "Cinema 4D"],
    icon: "ri-film-line",
    color: "from-green-400 to-teal-500",
    colorHex: "#10b981",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/cutpro.png",
    quote: "The best stories are the ones that transport you to another world.",
    author: "Digital Canvas Community",
  },
  {
    id: "reality",
    title: "Reality",
    subtitle: "Ideas made manifest",
    description:
      "Your vision becomes reality, ready to inspire and impact the world around you. Learn how to launch, promote, and iterate on your creative projects.",
    tools: ["Deployment", "Analytics", "Optimization", "Growth"],
    icon: "ri-rocket-line",
    color: "from-purple-400 to-pink-500",
    colorHex: "#a855f7",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/sa.jpg",
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
]

// Generate deterministic particle positions based on index
const generateParticlePositions = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // Use deterministic values based on index
    x: ((i * 13) % 100) + ((i * 7) % 10),
    y: ((i * 17) % 100) + ((i * 3) % 10),
  }))
}

const CreativeJourney = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
    setParticles(generateParticlePositions(30))

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const stageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  // Handle stage click for mobile and desktop
  const handleStageClick = (stageId: string) => {
    setActiveStage(stageId)
  }

  // Close modal
  const handleCloseModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setActiveStage(null)
  }

  // Get active stage data
  const activeStageData = journeyStages.find((stage) => stage.id === activeStage)

  return (
    <section className="py-16 md:py-24 bg-neutral-900 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Enhanced background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating particles - Only render on client side */}
        {isClient &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, ((particle.id * 7) % 50) - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + (particle.id % 4) * 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.id * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}

        {/* Decorative geometric shapes */}
        {isClient && (
          <>
            <motion.div
              className="absolute w-64 h-64 rounded-full border border-blue-500/10"
              style={{ top: "15%", left: "10%" }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute w-96 h-96 rounded-full border border-purple-500/10"
              style={{ bottom: "10%", right: "5%" }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.3, 0.1],
                rotate: [360, 0],
              }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute w-48 h-48 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg blur-3xl"
              style={{ top: "40%", right: "20%" }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 backdrop-blur-sm border border-white/10">
              <i className="ri-compass-3-line text-3xl text-white"></i>
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            The Creative{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
              Journey
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            From spark of inspiration to digital reality. Discover how our community transforms ideas into extraordinary
            experiences using cutting-edge tools and technologies.
          </p>
        </motion.div>

        {/* Mobile Journey View */}
        {isMobile && (
          <motion.div className="relative" initial="hidden" animate={controls} variants={containerVariants}>
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-teal-500/50 rounded-full"></div>

            {/* Journey Stages - Vertical Layout */}
            <div className="space-y-16 pb-16">
              {journeyStages.map((stage, index) => (
                <motion.div key={stage.id} className="relative pl-12" variants={stageVariants}>
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute left-2.5 w-5 h-5 rounded-full bg-gradient-to-r ${stage.color} -translate-x-1/2`}
                    style={{ top: "2rem" }}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(255,255,255,0.1)",
                        "0 0 20px rgba(255,255,255,0.3)",
                        "0 0 0 rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></span>
                  </motion.div>

                  {/* Stage Content */}
                  <motion.div
                    className={`bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-xl p-5 border border-white/10 cursor-pointer`}
                    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStageClick(stage.id)}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center mr-3`}
                      >
                        <i className={`${stage.icon} text-xl text-white`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                        <p className="text-white/60 text-sm">{stage.subtitle}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                          <i className="ri-arrow-right-s-line text-white/70"></i>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {stage.tools.slice(0, 2).map((tool) => (
                        <span key={tool} className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                          {tool}
                        </span>
                      ))}
                      {stage.tools.length > 2 && (
                        <span className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                          +{stage.tools.length - 2} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Desktop Journey View - Horizontal Timeline with Refined Animations */}
        {!isMobile && (
          <motion.div
            className="relative min-h-[600px]"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Horizontal Timeline Line with Flowing Animation */}
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-teal-500/30 rounded-full"></div>

              {/* Flowing particles along the timeline */}
              {isClient && (
                <>
                  <motion.div
                    className="absolute w-4 h-4 bg-blue-400 rounded-full blur-sm"
                    style={{ top: "-6px" }}
                    animate={{
                      x: ["-20px", "calc(100vw + 20px)"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute w-3 h-3 bg-purple-400 rounded-full blur-sm"
                    style={{ top: "-5px" }}
                    animate={{
                      x: ["-20px", "calc(100vw + 20px)"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: 2,
                    }}
                  />
                  <motion.div
                    className="absolute w-2 h-2 bg-teal-400 rounded-full blur-sm"
                    style={{ top: "-4px" }}
                    animate={{
                      x: ["-20px", "calc(100vw + 20px)"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: 4,
                    }}
                  />
                </>
              )}
            </div>

            {/* Journey Stages - Horizontal Layout with Refined Hover Effects */}
            <div className="grid grid-cols-5 gap-8 items-center">
              {journeyStages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  className="relative group cursor-pointer"
                  variants={stageVariants}
                  onHoverStart={() => setHoveredStage(stage.id)}
                  onHoverEnd={() => setHoveredStage(null)}
                  onClick={() => handleStageClick(stage.id)}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Refined Glowing Border Container */}
                  <motion.div
                    className="relative p-1 rounded-2xl overflow-hidden"
                    animate={{
                      background:
                        hoveredStage === stage.id
                          ? [
                              `conic-gradient(from 0deg, transparent, ${stage.colorHex}40, transparent, ${stage.colorHex}60, transparent)`,
                              `conic-gradient(from 90deg, transparent, ${stage.colorHex}40, transparent, ${stage.colorHex}60, transparent)`,
                              `conic-gradient(from 180deg, transparent, ${stage.colorHex}40, transparent, ${stage.colorHex}60, transparent)`,
                              `conic-gradient(from 270deg, transparent, ${stage.colorHex}40, transparent, ${stage.colorHex}60, transparent)`,
                            ]
                          : `linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))`,
                    }}
                    transition={{
                      duration: hoveredStage === stage.id ? 3 : 0.5,
                      repeat: hoveredStage === stage.id ? Number.POSITIVE_INFINITY : 0,
                      ease: "linear",
                    }}
                  >
                    {/* Stage Card with Stable Animations */}
                    <motion.div
                      className="bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative overflow-hidden"
                      animate={{
                        boxShadow:
                          hoveredStage === stage.id
                            ? `0 0 30px ${stage.colorHex}40, 0 0 60px ${stage.colorHex}20`
                            : "0 4px 20px rgba(0, 0, 0, 0.3)",
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 opacity-10">
                        <Image
                          src={stage.image || "/placeholder.svg"}
                          alt={stage.title}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>

                      {/* Subtle Background Pattern */}
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          backgroundPosition: hoveredStage === stage.id ? ["0% 0%", "100% 100%"] : "0% 0%",
                        }}
                        transition={{
                          duration: 4,
                          repeat: hoveredStage === stage.id ? Number.POSITIVE_INFINITY : 0,
                          ease: "linear",
                        }}
                        style={{
                          backgroundImage: `
                            radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: "20px 20px",
                        }}
                      />

                      {/* Stage Number */}
                      <motion.div
                        className="absolute -top-3 -right-3 w-8 h-8 bg-white text-neutral-900 rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10"
                        animate={{
                          scale: hoveredStage === stage.id ? 1.1 : 1,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        {index + 1}
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 mx-auto`}
                          animate={{
                            scale: hoveredStage === stage.id ? 1.05 : 1,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <i className={`${stage.icon} text-3xl text-white`}></i>
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-2 text-center">{stage.title}</h3>
                        <p className="text-white/60 text-sm text-center mb-4">{stage.subtitle}</p>

                        {/* Tools Preview */}
                        <div className="flex flex-wrap gap-1 justify-center">
                          {stage.tools.slice(0, 2).map((tool) => (
                            <span key={tool} className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                              {tool}
                            </span>
                          ))}
                          {stage.tools.length > 2 && (
                            <span className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs">
                              +{stage.tools.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Hover Indicator */}
                        <motion.div
                          className="mt-4 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredStage === stage.id ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-white/60 text-xs">Click to explore</span>
                        </motion.div>
                      </div>

                      {/* Refined Orbiting Particles on Hover */}
                      {isClient && hoveredStage === stage.id && (
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{
                                left: "50%",
                                top: "50%",
                                backgroundColor: stage.colorHex,
                                filter: "blur(1px)",
                              }}
                              animate={{
                                x: [0, Math.cos((i * 90 * Math.PI) / 180) * 60],
                                y: [0, Math.sin((i * 90 * Math.PI) / 180) * 60],
                                opacity: [0.3, 0.8, 0.3],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Timeline Connection Node */}
                  <motion.div
                    className={`absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${stage.color} -translate-x-1/2 -translate-y-1/2 z-20 border-4 border-neutral-900`}
                    animate={{
                      scale: hoveredStage === stage.id ? 1.2 : 1,
                      boxShadow:
                        hoveredStage === stage.id ? `0 0 20px ${stage.colorHex}60` : "0 0 0 rgba(255,255,255,0.1)",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    style={{ top: "calc(50% + 120px)" }}
                  >
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Enhanced Call to Action */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.5 } },
          }}
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
            <motion.div
              className="w-16 h-16 mx-auto mb-6 relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500/30"></div>
              <div
                className="absolute inset-2 rounded-full border-4 border-dashed border-purple-500/30"
                style={{ animationDelay: "2s" }}
              ></div>
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <i className="ri-rocket-line text-2xl text-white"></i>
              </div>
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Begin Your Journey?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of creators and innovators. Learn, collaborate, and bring your creative vision to life
              with Digital Canvas.
            </p>

            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                Join the Community
                <motion.i
                  className="ri-arrow-right-line ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Full-Screen Modal for Stage Details */}
      <AnimatePresence>
        {activeStage && activeStageData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced Backdrop with Blur */}
            <motion.div
              className="absolute inset-0 bg-black/60"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-neutral-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors z-20"
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="ri-close-line text-xl"></i>
              </motion.button>

              {/* Header Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={activeStageData.image || "/placeholder.svg"}
                  alt={activeStageData.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>

                {/* Floating Icon */}
                <motion.div
                  className={`absolute bottom-6 left-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${activeStageData.color} flex items-center justify-center shadow-2xl`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                  <i className={`${activeStageData.icon} text-4xl text-white`}></i>
                </motion.div>
              </div>

              {/* Content Section */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h2 className="text-4xl font-bold text-white mb-2">{activeStageData.title}</h2>
                      <p className="text-xl text-white/60 mb-6">{activeStageData.subtitle}</p>

                      <p className="text-white/80 text-lg leading-relaxed mb-8">{activeStageData.description}</p>

                      {/* Quote Section */}
                      <motion.div
                        className="border-l-4 border-white/20 pl-6 py-4 bg-white/5 rounded-r-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p className="text-white/70 italic text-lg mb-2">"{activeStageData.quote}"</p>
                        <p className="text-white/50 text-sm">— {activeStageData.author}</p>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Popular Tools & Technologies</h3>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {activeStageData.tools.map((tool, index) => (
                          <motion.div
                            key={tool}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 hover:border-white/20 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                          >
                            <span className="text-white/90 font-medium">{tool}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-4">
                        <motion.button
                          className={`w-full py-4 bg-gradient-to-r ${activeStageData.color} text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        >
                          Explore {activeStageData.title} Resources
                        </motion.button>

                        <motion.button
                          className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/20 hover:border-white/30"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                        >
                          Join Community Discussions
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CreativeJourney
