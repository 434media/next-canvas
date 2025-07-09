"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation } from "motion/react"
import "remixicon/fonts/remixicon.css"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()

  // Generate deterministic particles for background
  useEffect(() => {
    setIsClient(true)
    const backgroundParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: ((i * 13) % 100) + ((i * 7) % 10),
      y: ((i * 17) % 100) + ((i * 3) % 10),
    }))
    setParticles(backgroundParticles)

    controls.start("visible")
  }, [controls])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }, 1500)
  }

  const socialLinks = [
    {
      icon: "ri-code-s-slash-line",
      href: "https://devsanantonio.com",
      label: "DEVSA",
      color: "hover:text-blue-400",
      description: "Tech Community",
      bgColor: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: "ri-music-2-line",
      href: "https://ampdproject.com",
      label: "The AMPD Project",
      color: "hover:text-purple-400",
      description: "Amplifying creativity",
      bgColor: "from-purple-500/20 to-purple-600/20",
    },
    {
      icon: "ri-global-line",
      href: "https://vemosvamos.com",
      label: "Vemos Vamos",
      color: "hover:text-green-400",
      description: "Latino entrepreneurs",
      bgColor: "from-green-500/20 to-green-600/20",
    },
    {
      icon: "ri-boxing-line",
      href: "https://txmxboxing.com",
      label: "TXMX Boxing",
      color: "hover:text-red-400",
      description: "Championship boxing",
      bgColor: "from-red-500/20 to-red-600/20",
    },
    {
      icon: "ri-shield-star-line",
      href: "https://salutetotroops.org",
      label: "Salute to Troops",
      color: "hover:text-yellow-400",
      description: "Honoring service",
      bgColor: "from-yellow-500/20 to-yellow-600/20",
    },
    {
      icon: "ri-rocket-line",
      href: "https://aimsatx.com",
      label: "AIM Health R&D Summit",
      color: "hover:text-teal-400",
      description: "Innovation & mentorship",
      bgColor: "from-teal-500/20 to-teal-600/20",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <footer className="bg-neutral-900 border-t border-white/10 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Enhanced wireframe grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Grid intersection highlights */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${(i % 4) * 25 + 12.5}%`,
                top: `${Math.floor(i / 4) * 33 + 16.5}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 15px rgba(59, 130, 246, 0.5)",
                  "0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
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
                y: [0, -50, 0],
                x: [0, ((particle.id * 7) % 30) - 15, 0],
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

        {/* Decorative geometric shapes */}
        {isClient && (
          <>
            <motion.div
              className="absolute w-64 h-64 rounded-full border border-purple-500/10"
              style={{ top: "20%", left: "5%" }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 360],
              }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute w-48 h-48 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-lg blur-3xl"
              style={{ bottom: "30%", right: "10%" }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Left Column - Brand & Education Series */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            {/* Enhanced Logo Section */}
            <motion.div className="mb-8 group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <motion.div
                className="relative inline-block"
                whileHover={{
                  filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(20, 184, 166, 0.1))",
                      "linear-gradient(225deg, rgba(168, 85, 247, 0.1), rgba(20, 184, 166, 0.1), rgba(59, 130, 246, 0.1))",
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(20, 184, 166, 0.1))",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <Image
                  src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                  alt="Digital Canvas Logo"
                  width={180}
                  height={48}
                  className="relative z-10 transition-all duration-300 group-hover:brightness-110"
                />
              </motion.div>
            </motion.div>

            <motion.p className="text-white/70 text-lg mb-8 leading-relaxed" variants={itemVariants}>
              The creative layer of 434 MEDIA. We connect our IP & client work, showcasing the stories, brands, &
              campaigns shaping the digital canvas network.
            </motion.p>
          </motion.div>

          {/* Middle Column - Enhanced Social Links */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <h3 className="text-white font-bold text-2xl mb-8 flex items-center">
              <motion.i
                className="ri-broadcast-line mr-3 text-blue-400 text-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              Our IP Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 ${social.color} relative overflow-hidden cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                  custom={index}
                >
                  {/* Enhanced animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${social.bgColor} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Additional glow layer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-current/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl"
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  {/* Icon container with enhanced effects */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.6, ease: "easeOut" },
                    }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500 relative overflow-hidden"
                      whileHover={{
                        boxShadow: [
                          "0 0 0 rgba(255,255,255,0)",
                          "0 0 20px rgba(255,255,255,0.3)",
                          "0 0 30px rgba(255,255,255,0.2)",
                        ],
                        transition: { duration: 0.8, ease: "easeOut" },
                      }}
                    >
                      <motion.i
                        className={`${social.icon} text-2xl transition-all duration-500`}
                        whileHover={{
                          textShadow: ["0 0 0 currentColor", "0 0 10px currentColor", "0 0 20px currentColor"],
                          transition: { duration: 0.6, ease: "easeOut" },
                        }}
                      />

                      {/* Animated background pulse */}
                      <motion.div
                        className="absolute inset-0 bg-current rounded-lg opacity-0 group-hover:opacity-20"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0, 0.2, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  <div className="flex-1 min-w-0 relative z-10">
                    <motion.div
                      className="font-semibold text-white group-hover:text-current transition-all duration-500"
                      whileHover={{
                        textShadow: "0 0 8px currentColor",
                        transition: { duration: 0.4 },
                      }}
                    >
                      {social.label}
                    </motion.div>
                    <motion.div
                      className="text-sm text-white/60 group-hover:text-white/90 transition-all duration-500"
                      whileHover={{
                        color: "rgba(255,255,255,0.9)",
                        transition: { duration: 0.4 },
                      }}
                    >
                      {social.description}
                    </motion.div>
                  </div>

                  <motion.i
                    className="ri-external-link-line text-white/40 group-hover:text-current transition-all duration-500 relative z-10"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, 15, 0],
                      textShadow: "0 0 8px currentColor",
                      transition: { duration: 0.5, ease: "easeOut" },
                    }}
                  />

                  {/* Enhanced floating particles on hover */}
                  {isClient && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.4 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-current rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 40}%`,
                          }}
                          animate={{
                            y: [-5, -25, -5],
                            x: [0, (i - 2) * 8, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Border glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-current opacity-0 group-hover:opacity-30 pointer-events-none"
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Enhanced Newsletter */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <h3 className="text-white font-bold text-2xl mb-8 flex items-center">
              <motion.i
                className="ri-mail-line mr-3 text-teal-400 text-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              Stay Updated
            </h3>

            <motion.div
              className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-2xl p-6 border border-white/10 relative overflow-hidden"
              whileHover={{ borderColor: "rgba(20, 184, 166, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <div className="relative z-10">
                <p className="text-white/80 mb-6 leading-relaxed">
                  Get the latest updates from the Digital Canvas network. Join our newsletter for exclusive content, IP
                  highlights, client success stories, and early access to new programs.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.i
                      className="ri-checkbox-circle-line text-green-400 text-4xl mb-4 block"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    />
                    <h4 className="text-white font-semibold text-lg mb-2">Thanks for subscribing!</h4>
                    <p className="text-white/70">Check your email for confirmation.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div className="relative" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-lg border-2 border-teal-500/0 pointer-events-none"
                        whileFocus={{ borderColor: "rgba(20, 184, 166, 0.5)" }}
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button background animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-700 opacity-0 hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />

                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <motion.i
                              className="ri-loader-4-line mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            Subscribe to Newsletter
                            <motion.i
                              className="ri-send-plane-line ml-2"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>
                )}

                {/* Newsletter benefits */}
                <motion.div className="mt-6 space-y-2" variants={itemVariants}>
                  <div className="flex items-center text-white/60 text-sm">
                    <i className="ri-check-line text-teal-400 mr-2"></i>
                    IP property highlights & updates
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <i className="ri-check-line text-teal-400 mr-2"></i>
                    Client success story features
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <i className="ri-check-line text-teal-400 mr-2"></i>
                    Behind-the-scenes network content
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Footer Bottom */}
        <motion.div className="mt-16 pt-8 border-t border-white/10 relative" variants={itemVariants}>
          {/* Decorative line animation */}
          <motion.div
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
            animate={{
              width: ["0%", "100%", "0%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-white/50 text-sm"
              whileHover={{ color: "rgba(255,255,255,0.7)" }}
              transition={{ duration: 0.2 }}
            >
              &copy; 2025 Digital Canvas. All rights reserved.
            </motion.p>

            <motion.div className="flex items-center space-x-6 text-white/50 text-sm" variants={containerVariants}>
              <motion.a
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white/80 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                Contact
              </motion.a>
            </motion.div>
          </div>

          {/* Floating "Back to Top" indicator */}
          <motion.div
            className="absolute -top-8 right-0 text-white/30"
            animate={{
              y: [0, -5, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <i className="ri-arrow-up-line text-sm"></i>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
