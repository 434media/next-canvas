"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react"
import Image from "next/image"
import "remixicon/fonts/remixicon.css"

const clientProjects = [
  {
    id: "velocitytx",
    name: "VelocityTX",
    industry: "Economic Development",
    tagline: "Accelerating Texas Innovation",
    description:
      "Strategic branding and digital campaigns that position VelocityTX as the premier destination for business growth and innovation in Texas.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/velocity-hero.jpg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/velocity-logo.svg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/velocity-video.mp4",
    color: "from-blue-600 to-indigo-700",
    services: ["Brand Strategy", "Digital Marketing", "Video Production", "Web Development"],
    results: { growth: "150%", reach: "2M+", campaigns: "25+" },
    year: "2024",
    website: "https://velocitytx.com",
  },
  {
    id: "methodist",
    name: "Methodist Healthcare Ministries",
    industry: "Healthcare",
    tagline: "Healing Communities with Compassion",
    description:
      "Comprehensive storytelling campaigns that showcase Methodist Healthcare's mission of providing accessible healthcare to underserved communities.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/methodist-hero.jpg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/methodist-logo.svg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/methodist-video.mp4",
    color: "from-green-600 to-teal-700",
    services: ["Documentary Production", "Community Outreach", "Digital Storytelling", "Brand Messaging"],
    results: { stories: "50+", communities: "100+", impact: "$5M+" },
    year: "2023",
    website: "https://mhm.org",
  },
  {
    id: "healthcell",
    name: "Health Cell",
    industry: "Biotechnology",
    tagline: "Revolutionizing Cellular Health",
    description:
      "Cutting-edge visual content and educational campaigns that communicate complex biotechnology innovations to diverse audiences.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/healthcell-hero.jpg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/healthcell-logo.svg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/healthcell-video.mp4",
    color: "from-purple-600 to-pink-700",
    services: ["Scientific Animation", "Educational Content", "Brand Development", "Digital Strategy"],
    results: { animations: "30+", education: "10K+", patents: "15+" },
    year: "2024",
    website: "https://healthcell.com",
  },
  {
    id: "techbloc",
    name: "TechBloc",
    industry: "Technology",
    tagline: "Building San Antonio's Tech Future",
    description:
      "Dynamic content creation and event coverage that amplifies TechBloc's mission to establish San Antonio as a major tech hub.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/techbloc-hero.jpg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/techbloc-logo.svg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/techbloc-video.mp4",
    color: "from-orange-600 to-red-700",
    services: ["Event Production", "Content Strategy", "Community Building", "Digital Marketing"],
    results: { events: "40+", members: "5K+", startups: "200+" },
    year: "2023",
    website: "https://techbloc.org",
  },
  {
    id: "alamoangels",
    name: "Alamo Angels",
    industry: "Investment",
    tagline: "Fueling Innovation Through Investment",
    description:
      "Professional content and investor relations materials that showcase Alamo Angels' impact on the startup ecosystem.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/alamo-hero.jpg",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/alamo-logo.svg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/alamo-video.mp4",
    color: "from-teal-600 to-cyan-700",
    services: ["Investor Presentations", "Portfolio Showcases", "Event Documentation", "Strategic Communications"],
    results: { investments: "$50M+", startups: "100+", exits: "25+" },
    year: "2024",
    website: "https://alamoangels.com",
  },
]

const ClientShowcase = () => {
  const [activeClient, setActiveClient] = useState<string | null>(null)
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isClient, setIsClient] = useState(false)

  const industries = ["all", "Economic Development", "Healthcare", "Biotechnology", "Technology", "Investment"]

  useEffect(() => {
    setIsClient(true)
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: ((i * 11) % 100) + ((i * 5) % 10),
      y: ((i * 19) % 100) + ((i * 3) % 10),
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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

  const filteredClients =
    selectedFilter === "all" ? clientProjects : clientProjects.filter((client) => client.industry === selectedFilter)

  const handleClientClick = (clientId: string) => {
    setActiveClient(clientId)
  }

  const handleCloseModal = () => {
    setActiveClient(null)
  }

  const activeClientData = clientProjects.find((client) => client.id === activeClient)

  return (
    <section className="py-16 md:py-24 bg-neutral-800 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-25"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {isClient &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-purple-400/20 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, ((particle.id * 9) % 60) - 30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 10 + (particle.id % 5) * 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.id * 0.4,
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
              rotate: [0, -5, 0, 5, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full p-4 backdrop-blur-sm border border-white/10">
              <i className="ri-briefcase-line text-3xl text-white"></i>
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Client{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 text-transparent bg-clip-text">
              Success Stories
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Transformative partnerships that drive growth, innovation, and meaningful impact across diverse industries
            and communities.
          </p>
        </motion.div>

        {/* Industry Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
          }}
        >
          {industries.map((industry, index) => (
            <motion.button
              key={industry}
              onClick={() => setSelectedFilter(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedFilter === industry
                  ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white border-transparent shadow-lg"
                  : "bg-white/5 text-white/70 border-white/20 hover:bg-white/10 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {industry === "all" ? "All Industries" : industry}
            </motion.button>
          ))}
        </motion.div>

        {/* Client Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <AnimatePresence mode="wait">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                className="group cursor-pointer"
                variants={itemVariants}
                layout
                onHoverStart={() => setHoveredClient(client.id)}
                onHoverEnd={() => setHoveredClient(null)}
                onClick={() => handleClientClick(client.id)}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                  />

                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent z-10" />
                    <Image
                      src={client.image || "/placeholder.svg"}
                      alt={client.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Year Badge */}
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold rounded-full z-20 border border-white/20"
                      animate={{
                        boxShadow:
                          hoveredClient === client.id
                            ? ["0 0 0 rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.4)"]
                            : "0 0 0 rgba(255,255,255,0)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {client.year}
                    </motion.div>

                    {/* Client Logo */}
                    <motion.div
                      className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg p-2 z-20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain p-1"
                      />
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
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                        {client.name}
                      </h3>
                      <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                        {client.industry}
                      </span>
                    </div>

                    <p className="text-purple-400 text-sm font-medium mb-3">{client.tagline}</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">{client.description}</p>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {client.services.slice(0, 3).map((service, serviceIndex) => (
                        <motion.span
                          key={service}
                          className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: serviceIndex * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                        >
                          {service}
                        </motion.span>
                      ))}
                      {client.services.length > 3 && (
                        <span className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">
                          +{client.services.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Results Preview */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {Object.entries(client.results)
                        .slice(0, 3)
                        .map(([key, value], resultIndex) => (
                          <motion.div
                            key={key}
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: resultIndex * 0.1 }}
                          >
                            <div className="text-sm font-bold text-white">{value}</div>
                            <div className="text-xs text-white/60 capitalize">{key}</div>
                          </motion.div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <motion.div
                      className="flex items-center justify-between text-white/60 group-hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">View Case Study</span>
                      <motion.i
                        className="ri-arrow-right-line"
                        animate={{ x: hoveredClient === client.id ? [0, 5, 0] : 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: hoveredClient === client.id ? Number.POSITIVE_INFINITY : 0,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Hover particles */}
                  {isClient && hoveredClient === client.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/50 rounded-full"
                          style={{
                            left: `${15 + i * 12}%`,
                            top: `${25 + (i % 3) * 25}%`,
                          }}
                          animate={{
                            y: [0, -40, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.2, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.8 } },
          }}
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Tell Your Story?</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Partner with Digital Canvas and join our portfolio of successful brands making a meaningful impact in
              their industries.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                Start Your Partnership
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

      {/* Enhanced Modal for Client Details */}
      <AnimatePresence>
        {activeClient && activeClientData && (
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
              className="relative bg-neutral-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
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

              {/* Header with Hero Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={activeClientData.image || "/placeholder.svg"}
                  alt={activeClientData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>

                {/* Client Logo */}
                <motion.div
                  className="absolute bottom-6 left-6 w-20 h-20 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={activeClientData.logo || "/placeholder.svg"}
                    alt={`${activeClientData.name} logo`}
                    fill
                    className="object-contain p-2"
                  />
                </motion.div>

                {/* Industry Badge */}
                <motion.div
                  className={`absolute bottom-6 right-6 px-4 py-2 bg-gradient-to-r ${activeClientData.color} text-white rounded-full font-semibold shadow-lg`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {activeClientData.industry}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h2 className="text-4xl font-bold text-white mb-2">{activeClientData.name}</h2>
                      <p className="text-xl text-purple-400 mb-6">{activeClientData.tagline}</p>
                      <p className="text-white/80 text-lg leading-relaxed mb-8">{activeClientData.description}</p>

                      {/* Services */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Services Provided</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {activeClientData.services.map((service, index) => (
                            <motion.div
                              key={service}
                              className="p-3 bg-white/5 rounded-lg border border-white/10 text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                            >
                              <span className="text-white/90 text-sm font-medium">{service}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Key Results</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(activeClientData.results).map(([key, value], index) => (
                            <motion.div
                              key={key}
                              className="text-center p-4 bg-white/5 rounded-lg border border-white/10"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            >
                              <div className="text-2xl font-bold text-white mb-1">{value}</div>
                              <div className="text-sm text-white/60 capitalize">{key}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column */}
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

                      {/* Project Timeline */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Project Timeline</h4>
                        <div className="space-y-3">
                          {[
                            { phase: "Discovery & Strategy", duration: "2 weeks" },
                            { phase: "Creative Development", duration: "4 weeks" },
                            { phase: "Production & Implementation", duration: "6 weeks" },
                            { phase: "Launch & Optimization", duration: "2 weeks" },
                          ].map((phase, index) => (
                            <motion.div
                              key={phase.phase}
                              className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                            >
                              <span className="text-white/90 text-sm">{phase.phase}</span>
                              <span className="text-white/60 text-xs">{phase.duration}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-4">
                        <motion.button
                          className={`w-full py-4 bg-gradient-to-r ${activeClientData.color} text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0, duration: 0.5 }}
                        >
                          View Full Case Study
                        </motion.button>

                        {activeClientData.website !== "#" && (
                          <motion.a
                            href={activeClientData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/20 hover:border-white/30 text-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.5 }}
                          >
                            Visit Client Website
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

export default ClientShowcase
