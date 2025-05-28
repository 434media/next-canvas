"use client"

import type React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import Link from "next/link"

interface SlideoverMenuProps {
  isOpen: boolean
  onClose: () => void
}

const SlideoverMenu: React.FC<SlideoverMenuProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      description: "Join our community discussions",
    },
    {
      icon: "ri-instagram-line",
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
      description: "Follow our creative journey",
    },
    {
      icon: "ri-twitter-x-line",
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
      description: "Stay updated with latest news",
    },
    {
      icon: "ri-linkedin-fill",
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-500",
      description: "Connect professionally",
    },
    {
      icon: "ri-youtube-fill",
      href: "#",
      label: "YouTube",
      color: "hover:text-red-400",
      description: "Watch tutorials and events",
    },
    {
      icon: "ri-github-fill",
      href: "#",
      label: "GitHub",
      color: "hover:text-gray-300",
      description: "Explore our open source projects",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Enhanced backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(20px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    x: [0, (Math.random() - 0.5) * 100],
                    y: [0, (Math.random() - 0.5) * 100],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              className="w-screen max-w-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="h-full flex flex-col bg-neutral-900/95 backdrop-blur-2xl shadow-2xl overflow-y-scroll border-l border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Header */}
                <div className="px-6 py-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Image
                        src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
                        alt="Digital Canvas Logo"
                        width={150}
                        height={40}
                      />
                    </motion.div>
                    <motion.button
                      onClick={onClose}
                      className="text-white/70 hover:text-white transition-colors duration-300 relative group"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="ri-close-line text-2xl"></i>

                      {/* Button background */}
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-lg -m-2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-6 py-8 space-y-8">
                  {/* Tagline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-white/70 text-sm leading-relaxed">
                      Empowering San Antonio&apos;s creative tech community through collaboration, innovation, and continuous
                      learning.
                    </p>
                  </motion.div>

                  {/* Featured Education Series */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30 relative overflow-hidden"
                  >
                    {/* Background animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      style={{ backgroundSize: "200% 200%" }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold text-lg flex items-center">
                          <motion.i
                            className="ri-graduation-cap-line mr-2 text-blue-400"
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                          Education Series
                        </h3>
                        <motion.span
                          className="bg-gradient-to-r from-blue-400 to-purple-400 text-xs px-3 py-1 rounded-full text-white font-bold"
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

                      <h4 className="text-white font-semibold mb-2">Prompt to Product: Build Smarter in 6 Weeks</h4>
                      <p className="text-white/70 text-sm mb-4 leading-relaxed">
                        Master the art of turning ideas into reality with AI-powered development tools and modern
                        workflows.
                      </p>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href="/events/prompt-to-product"
                          className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/40"
                          onClick={onClose}
                        >
                          Learn More
                          <motion.i
                            className="ri-external-link-line ml-2"
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Connect Section with Enhanced Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-white font-semibold mb-6 text-lg flex items-center">
                      <motion.i
                        className="ri-links-line mr-2 text-blue-400"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      Connect With Us
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 ${social.color}`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <i className={`${social.icon} text-2xl`}></i>

                            {/* Hover glow effect */}
                            <motion.div
                              className="absolute inset-0 bg-current rounded-full blur-lg opacity-0 group-hover:opacity-20"
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white group-hover:text-current transition-colors duration-300">
                              {social.label}
                            </div>
                            <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300 truncate">
                              {social.description}
                            </div>
                          </div>

                          <motion.i
                            className="ri-external-link-line text-white/40 group-hover:text-current transition-colors duration-300"
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Newsletter Signup */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl p-6 border border-white/10 relative overflow-hidden"
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
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <motion.i
                          className="ri-mail-line mr-2 text-teal-400"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        Stay Updated
                      </h3>

                      {isSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-4"
                        >
                          <motion.i
                            className="ri-checkbox-circle-line text-green-400 text-3xl mb-2 block"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          />
                          <p className="text-white font-medium">Thanks for subscribing!</p>
                          <p className="text-white/70 text-sm">Check your email for confirmation.</p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                          />
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <motion.i
                                  className="ri-loader-4-line mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                />
                                Subscribing...
                              </span>
                            ) : (
                              "Subscribe to Newsletter"
                            )}
                          </motion.button>
                        </form>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                  className="px-6 py-6 border-t border-white/10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-white/50 text-sm">&copy; 2025 Digital Canvas. All rights reserved.</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideoverMenu
