"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react"
import Image from "next/image"
import "remixicon/fonts/remixicon.css"

const ipProperties = [
  {
    id: "devsa",
    name: "DEVSA",
    tagline: "San Antonio's Developer Community",
    description:
      "Building the largest developer community in South Texas through events, education, and collaboration.",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-community.svg",
    video: "https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-video.mp4",
    color: "from-blue-500 to-cyan-500",
    stats: { members: "2,500+", events: "150+", years: "8" },
    category: "Community",
    website: "https://devsanantonio.com",
  },
  {
    id: "ampd",
    name: "AMPD Project",
    tagline: "Amplifying Creative Voices",
    description: "A multimedia platform showcasing emerging artists, musicians, and creators across Texas.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Ampd_Logo_Full.svg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/ampd-video.mp4",
    color: "from-purple-500 to-pink-500",
    stats: { artists: "500+", content: "1,000+", reach: "50K+" },
    category: "Media",
    website: "https://ampdproject.com",
  },
  {
    id: "vemosvamos",
    name: "Vemos Vamos",
    tagline: "Bridging Cultures Through Stories",
    description: "Celebrating Latino culture and stories through documentary filmmaking and community engagement.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/large.jpg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/vemos-video.mp4",
    color: "from-orange-500 to-red-500",
    stats: { films: "25+", festivals: "40+", awards: "12" },
    category: "Film",
    website: "https://vemosvamos.com",
  },
  {
    id: "txmx",
    name: "TXMX Boxing",
    tagline: "Texas Meets Mexico in the Ring",
    description:
      "Promoting boxing talent across the Texas-Mexico border with world-class events and athlete development.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/txmx-logo.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/txmx-video.mp4",
    color: "from-red-500 to-yellow-500",
    stats: { events: "30+", fighters: "100+", viewers: "1M+" },
    category: "Sports",
    website: "#",
  },
  {
    id: "salute",
    name: "Salute to Troops",
    tagline: "Honoring Our Heroes",
    description: "Supporting military families and veterans through community events and storytelling initiatives.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/salute-logo.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/salute-video.mp4",
    color: "from-green-500 to-blue-500",
    stats: { veterans: "1,000+", events: "50+", raised: "$250K+" },
    category: "Non-Profit",
    website: "#",
  },
  {
    id: "aimsatx",
    name: "AIM SATX",
    tagline: "Aiming Higher in San Antonio",
    description: "Youth development and mentorship programs focused on education, leadership, and community service.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aim-logo.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/aim-video.mp4",
    color: "from-teal-500 to-green-500",
    stats: { youth: "500+", programs: "20+", scholarships: "50+" },
    category: "Education",
    website: "#",
  },
]

const IPPortfolio = () => {
  const [activeIP, setActiveIP] = useState<string | null>(null)
  const [hoveredIP, setHoveredIP] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: ((i * 13) % 100) + ((i * 7) % 10),
      y: ((i * 17) % 100) + ((i * 3) % 10),
    }))
    setParticles(newParticles)
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const handleIPClick = (ipId: string) => {
    setActiveIP(ipId)
  }

  const handleCloseModal = () => {
    setActiveIP(null)
  }

  const activeIPData = ipProperties.find((ip) => ip.id === activeIP)

  return (
    <section className="py-16 md:py-24 bg-neutral-900 relative overflow-hidden" ref={containerRef} id="portfolio">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

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

        {isClient &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, ((particle.id * 7) % 40) - 20, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + (particle.id % 4) * 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.id * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 backdrop-blur-sm border border-white/10">
              <i className="ri-stack-line text-3xl text-white"></i>
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
              IP Portfolio
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Innovative properties that define our creative vision and drive meaningful impact across communities,
            industries, and cultures.
          </p>
        </motion.div>

        {/* IP Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {ipProperties.map((ip, index) => (
            <motion.div
              key={ip.id}
              className="group cursor-pointer"
              variants={itemVariants}
              onHoverStart={() => setHoveredIP(ip.id)}
              onHoverEnd={() => setHoveredIP(null)}
              onClick={() => handleIPClick(ip.id)}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
                {/* Animated background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${ip.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Image/Logo Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent z-10" />
                  <Image
                    src={ip.image || "/placeholder.svg"}
                    alt={ip.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Category Badge */}
                  <motion.div
                    className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${ip.color} text-white text-xs font-bold rounded-full z-20`}
                    animate={{
                      boxShadow:
                        hoveredIP === ip.id
                          ? ["0 0 0 rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.5)"]
                          : "0 0 0 rgba(255,255,255,0)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {ip.category}
                  </motion.div>

                  {/* Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <i className="ri-play-fill text-2xl text-white ml-1"></i>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {ip.name}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium mb-3">{ip.tagline}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{ip.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Object.entries(ip.stats).map(([key, value], statIndex) => (
                      <motion.div
                        key={key}
                        className="text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: statIndex * 0.1 }}
                      >
                        <div className="text-lg font-bold text-white">{value}</div>
                        <div className="text-xs text-white/60 capitalize">{key}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.div
                    className="flex items-center justify-between text-white/60 group-hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium">Explore Project</span>
                    <motion.i
                      className="ri-arrow-right-line"
                      animate={{ x: hoveredIP === ip.id ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1.5, repeat: hoveredIP === ip.id ? Number.POSITIVE_INFINITY : 0 }}
                    />
                  </motion.div>
                </div>

                {/* Hover particles */}
                {isClient && hoveredIP === ip.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [0, -30, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.5 } },
          }}
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Create Your Story?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join the 434 MEDIA network and let us help amplify your brand's unique narrative through innovative
              creative solutions.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                Start Your Project
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

      {/* Enhanced Modal for IP Details */}
      <AnimatePresence>
        {activeIP && activeIPData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              onClick={handleCloseModal}
            />

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

              {/* Header with Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={activeIPData.image || "/placeholder.svg"}
                  alt={activeIPData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>

                <motion.div
                  className={`absolute bottom-6 left-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${activeIPData.color} flex items-center justify-center shadow-2xl`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                  <i className="ri-stack-line text-4xl text-white"></i>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h2 className="text-4xl font-bold text-white mb-2">{activeIPData.name}</h2>
                      <p className="text-xl text-blue-400 mb-6">{activeIPData.tagline}</p>
                      <p className="text-white/80 text-lg leading-relaxed mb-8">{activeIPData.description}</p>

                      {/* Enhanced Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {Object.entries(activeIPData.stats).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          >
                            <div className="text-2xl font-bold text-white mb-1">{value}</div>
                            <div className="text-sm text-white/60 capitalize">{key}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {/* Video Preview */}
                      <div className="aspect-video bg-neutral-700 rounded-lg mb-6 overflow-hidden relative group">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <i className="ri-play-fill text-2xl text-white ml-1"></i>
                          </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-4">
                        <motion.button
                          className={`w-full py-4 bg-gradient-to-r ${activeIPData.color} text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        >
                          View Full Case Study
                        </motion.button>

                        {activeIPData.website !== "#" && (
                          <motion.a
                            href={activeIPData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/20 hover:border-white/30 text-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                          >
                            Visit Website
                            <i className="ri-external-link-line ml-2"></i>
                          </motion.a>
                        )}
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

export default IPPortfolio
