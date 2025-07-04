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
      icon: "ri-discord-fill",
      href: "https://discord.gg/SCfmebDfW6",
      label: "Discord",
      color: "hover:text-indigo-400",
      description: "Join our community",
      bgColor: "from-indigo-500/20 to-indigo-600/20",
    },
    {
      icon: "ri-instagram-line",
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
      description: "Follow our journey",
      bgColor: "from-pink-500/20 to-pink-600/20",
    },
    {
      icon: "ri-twitter-x-line",
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
      description: "Latest updates",
      bgColor: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: "ri-linkedin-fill",
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-500",
      description: "Professional network",
      bgColor: "from-blue-500/20 to-blue-700/20",
    },
    {
      icon: "ri-youtube-fill",
      href: "#",
      label: "YouTube",
      color: "hover:text-red-400",
      description: "Video content",
      bgColor: "from-red-500/20 to-red-600/20",
    },
    {
      icon: "ri-github-fill",
      href: "#",
      label: "GitHub",
      color: "hover:text-gray-300",
      description: "Open source",
      bgColor: "from-gray-500/20 to-gray-600/20",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
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
              Empowering San Antonio&apos;s creative tech community through collaboration, innovation, and continuous
              learning.
            </motion.p>

            {/* Featured Education Series */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Floating particles in education section */}
              {isClient && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-xl flex items-center">
                    <motion.i
                      className="ri-graduation-cap-line mr-3 text-blue-400 text-2xl"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    Education Series
                  </h3>
                  <motion.span
                    className="bg-gradient-to-r from-blue-400 to-purple-400 text-xs px-3 py-1.5 rounded-full text-white font-bold"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(59, 130, 246, 0)",
                        "0 0 20px rgba(59, 130, 246, 0.5)",
                        "0 0 0 rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    NEW
                  </motion.span>
                </div>

                <h4 className="text-white font-semibold text-lg mb-3">Prompt to Product: Build Smarter in 6 Weeks</h4>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  Master the art of turning ideas into reality with AI-powered development tools and modern workflows.
                  Join our comprehensive program designed for creators and innovators.
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/events/prompt-to-product"
                      className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                      Learn More
                      <motion.i
                        className="ri-arrow-right-line ml-2"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/events/prompt-to-product"
                      className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      Enroll Now
                      <motion.i
                        className="ri-external-link-line ml-2"
                        animate={{ rotate: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Middle Column - Enhanced Social Links */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <h3 className="text-white font-bold text-2xl mb-8 flex items-center">
              <motion.i
                className="ri-links-line mr-3 text-blue-400 text-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              Connect With Us
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 ${social.color} relative overflow-hidden`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  variants={itemVariants}
                  custom={index}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${social.bgColor} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon container with enhanced effects */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                      <i className={`${social.icon} text-2xl`}></i>

                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-current rounded-lg blur-lg opacity-0 group-hover:opacity-20"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="font-semibold text-white group-hover:text-current transition-colors duration-300">
                      {social.label}
                    </div>
                    <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                      {social.description}
                    </div>
                  </div>

                  <motion.i
                    className="ri-external-link-line text-white/40 group-hover:text-current transition-colors duration-300 relative z-10"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* Floating particles on hover */}
                  {isClient && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-current rounded-full"
                          style={{
                            left: `${30 + i * 20}%`,
                            top: `${40 + (i % 2) * 20}%`,
                          }}
                          animate={{
                            y: [-10, -20],
                            x: [0, (i - 1) * 10],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
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
                  Get the latest updates on events, workshops, and community news. Join our newsletter for exclusive
                  content and early access to new programs.
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
                    Weekly community highlights
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <i className="ri-check-line text-teal-400 mr-2"></i>
                    Early access to events
                  </div>
                  <div className="flex items-center text-white/60 text-sm">
                    <i className="ri-check-line text-teal-400 mr-2"></i>
                    Exclusive learning resources
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
