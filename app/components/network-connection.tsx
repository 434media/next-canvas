"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "motion/react"
import "remixicon/fonts/remixicon.css"

const networkNodes = [
  {
    id: "434media",
    name: "434 MEDIA",
    type: "hub",
    description: "Creative Network Hub",
    position: { x: 50, y: 50 },
    color: "from-blue-500 to-purple-600",
    icon: "ri-global-line",
    size: "large",
  },
  {
    id: "digitalcanvas",
    name: "Digital Canvas",
    type: "creative",
    description: "Creative Layer",
    position: { x: 50, y: 30 },
    color: "from-teal-400 to-blue-500",
    icon: "ri-palette-line",
    size: "medium",
  },
  {
    id: "devsa",
    name: "DEVSA",
    type: "ip",
    description: "Developer Community",
    position: { x: 20, y: 20 },
    color: "from-blue-500 to-cyan-500",
    icon: "ri-code-s-slash-line",
    size: "small",
  },
  {
    id: "ampd",
    name: "The AMPD Project",
    type: "ip",
    description: "Creative Platform",
    position: { x: 80, y: 20 },
    color: "from-purple-500 to-pink-500",
    icon: "ri-music-line",
    size: "small",
  },
  {
    id: "vemosvamos",
    name: "Vemos Vamos",
    type: "ip",
    description: "Documentary Films",
    position: { x: 15, y: 60 },
    color: "from-orange-500 to-red-500",
    icon: "ri-film-line",
    size: "small",
  },
  {
    id: "velocitytx",
    name: "VelocityTX",
    type: "client",
    description: "Economic Development",
    position: { x: 85, y: 60 },
    color: "from-green-500 to-teal-500",
    icon: "ri-rocket-line",
    size: "small",
  },
  {
    id: "methodist",
    name: "Methodist Healthcare",
    type: "client",
    description: "Healthcare Ministry",
    position: { x: 30, y: 80 },
    color: "from-green-600 to-blue-600",
    icon: "ri-heart-pulse-line",
    size: "small",
  },
  {
    id: "techbloc",
    name: "TechBloc",
    type: "client",
    description: "Tech Community",
    position: { x: 70, y: 80 },
    color: "from-orange-600 to-red-600",
    icon: "ri-building-line",
    size: "small",
  },
]

const connections = [
  { from: "434media", to: "digitalcanvas", strength: "strong" },
  { from: "digitalcanvas", to: "devsa", strength: "medium" },
  { from: "digitalcanvas", to: "ampd", strength: "medium" },
  { from: "digitalcanvas", to: "vemosvamos", strength: "medium" },
  { from: "digitalcanvas", to: "velocitytx", strength: "strong" },
  { from: "digitalcanvas", to: "methodist", strength: "strong" },
  { from: "digitalcanvas", to: "techbloc", strength: "strong" },
  { from: "devsa", to: "techbloc", strength: "weak" },
  { from: "ampd", to: "vemosvamos", strength: "weak" },
]

const NetworkConnection = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeConnections, setActiveConnections] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    if (hoveredNode) {
      const relatedConnections = connections
        .filter((conn) => conn.from === hoveredNode || conn.to === hoveredNode)
        .map((conn) => `${conn.from}-${conn.to}`)
      setActiveConnections(relatedConnections)
    } else {
      setActiveConnections([])
    }
  }, [hoveredNode])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const getNodeSize = (size: string) => {
    switch (size) {
      case "large":
        return "w-24 h-24"
      case "medium":
        return "w-16 h-16"
      case "small":
        return "w-12 h-12"
      default:
        return "w-12 h-12"
    }
  }

  const getConnectionOpacity = (from: string, to: string) => {
    const connectionId = `${from}-${to}`
    const reverseConnectionId = `${to}-${from}`

    if (activeConnections.includes(connectionId) || activeConnections.includes(reverseConnectionId)) {
      return 1
    }
    return hoveredNode ? 0.1 : 0.3
  }

  const getConnectionWidth = (strength: string) => {
    switch (strength) {
      case "strong":
        return 3
      case "medium":
        return 2
      case "weak":
        return 1
      default:
        return 2
    }
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-900 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Network grid background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating data particles */}
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
                y: [0, -100, 0],
                x: [0, ((particle.id * 7) % 50) - 25, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + (particle.id % 4) * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: particle.id * 0.2,
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
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 backdrop-blur-sm border border-white/10">
              <i className="ri-share-line text-3xl text-white"></i>
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            The{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
              434 Network
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Discover how Digital Canvas connects our innovative IP properties with transformative client partnerships,
            creating a powerful ecosystem of creativity and impact.
          </p>
        </motion.div>

        {/* Interactive Network Visualization */}
        <motion.div
          className="relative w-full h-[600px] bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {connections.map((connection, index) => {
              const fromNode = networkNodes.find((node) => node.id === connection.from)
              const toNode = networkNodes.find((node) => node.id === connection.to)

              if (!fromNode || !toNode) return null

              const x1 = (fromNode.position.x / 100) * 100
              const y1 = (fromNode.position.y / 100) * 100
              const x2 = (toNode.position.x / 100) * 100
              const y2 = (toNode.position.y / 100) * 100

              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="url(#connectionGradient)"
                  strokeWidth={getConnectionWidth(connection.strength)}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: getConnectionOpacity(connection.from, connection.to),
                  }}
                  transition={{
                    pathLength: { duration: 1, delay: index * 0.1 },
                    opacity: { duration: 0.3 },
                  }}
                />
              )
            })}

            {/* Animated data flow particles */}
            {isClient && activeConnections.length > 0 && (
              <>
                {connections
                  .filter((conn) => activeConnections.includes(`${conn.from}-${conn.to}`))
                  .map((connection, index) => {
                    const fromNode = networkNodes.find((node) => node.id === connection.from)
                    const toNode = networkNodes.find((node) => node.id === connection.to)

                    if (!fromNode || !toNode) return null

                    return (
                      <motion.circle
                        key={`particle-${connection.from}-${connection.to}`}
                        r="3"
                        fill="rgb(59, 130, 246)"
                        initial={{
                          cx: `${fromNode.position.x}%`,
                          cy: `${fromNode.position.y}%`,
                        }}
                        animate={{
                          cx: [`${fromNode.position.x}%`, `${toNode.position.x}%`],
                          cy: [`${fromNode.position.y}%`, `${toNode.position.y}%`],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                          delay: index * 0.3,
                        }}
                      />
                    )
                  })}
              </>
            )}
          </svg>

          {/* Network Nodes */}
          {networkNodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              variants={nodeVariants}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Node Circle */}
              <motion.div
                className={`${getNodeSize(node.size)} rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center relative overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300`}
                animate={{
                  boxShadow:
                    hoveredNode === node.id
                      ? ["0 0 0 rgba(59, 130, 246, 0)", "0 0 30px rgba(59, 130, 246, 0.6)"]
                      : "0 0 0 rgba(59, 130, 246, 0)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  style={{ backgroundSize: "200% 200%" }}
                />

                {/* Icon */}
                <i
                  className={`${node.icon} text-white relative z-10 ${node.size === "large" ? "text-3xl" : node.size === "medium" ? "text-2xl" : "text-xl"}`}
                ></i>

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
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
              </motion.div>

              {/* Node Label */}
              <motion.div
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                <div className="bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap border border-white/20">
                  <div className="font-semibold">{node.name}</div>
                  <div className="text-white/70">{node.description}</div>
                </div>
              </motion.div>

              {/* Connection indicator */}
              {hoveredNode === node.id && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="w-full h-full rounded-full border-2 border-blue-400/50 animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Legend */}
          <motion.div
            className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <h4 className="text-white font-semibold mb-3 text-sm">Network Legend</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mr-2"></div>
                <span className="text-white/80">434 MEDIA Hub</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 mr-2"></div>
                <span className="text-white/80">Creative Layer</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mr-2"></div>
                <span className="text-white/80">IP Properties</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-teal-500 mr-2"></div>
                <span className="text-white/80">Client Partners</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Instructions */}
          <motion.div
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <div className="text-white/80 text-xs text-center">
              <i className="ri-cursor-line mr-1"></i>
              Hover over nodes to explore connections
            </div>
          </motion.div>
        </motion.div>

        {/* Network Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.5 } },
          }}
        >
          {[
            { label: "IP Properties", value: "6", icon: "ri-stack-line", color: "from-purple-500 to-pink-500" },
            { label: "Client Partners", value: "5", icon: "ri-briefcase-line", color: "from-blue-500 to-cyan-500" },
            { label: "Active Projects", value: "15+", icon: "ri-rocket-line", color: "from-green-500 to-teal-500" },
            { label: "Network Reach", value: "1M+", icon: "ri-global-line", color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-xl border border-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)" }}
            >
              <motion.div
                className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <i className={`${stat.icon} text-2xl text-white`}></i>
              </motion.div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 2 } },
          }}
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Join the Network</h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Become part of the 434 MEDIA ecosystem and leverage our connected network of creative talent, innovative
              properties, and strategic partnerships.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                Connect With Us
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
    </section>
  )
}

export default NetworkConnection
