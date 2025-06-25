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

  const ipChannels = [
    {
      icon: "ri-code-s-slash-line",
      href: "https://devsa.io",
      label: "DEVSA",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-500/10",
      borderColor: "hover:border-blue-400/30",
      description: "San Antonio's premier developer community",
    },
    {
      icon: "ri-music-2-line",
      href: "https://ampdproject.com",
      label: "AMPD Project",
      color: "hover:text-purple-400",
      bgColor: "hover:bg-purple-500/10",
      borderColor: "hover:border-purple-400/30",
      description: "Amplifying creative voices and projects",
    },
    {
      icon: "ri-global-line",
      href: "https://vemosvamos.com",
      label: "Vemos Vamos",
      color: "hover:text-green-400",
      bgColor: "hover:bg-green-500/10",
      borderColor: "hover:border-green-400/30",
      description: "Connecting Latino entrepreneurs and creators",
    },
    {
      icon: "ri-boxing-line",
      href: "https://txmxboxing.com",
      label: "TXMX Boxing",
      color: "hover:text-red-400",
      bgColor: "hover:bg-red-500/10",
      borderColor: "hover:border-red-400/30",
      description: "Championship boxing content and events",
    },
    {
      icon: "ri-shield-star-line",
      href: "https://salutetotroops.org",
      label: "Salute to Troops",
      color: "hover:text-yellow-400",
      bgColor: "hover:bg-yellow-500/10",
      borderColor: "hover:border-yellow-400/30",
      description: "Honoring military service and stories",
    },
    {
      icon: "ri-rocket-2-line",
      href: "https://aimsatx.com",
      label: "AIM SATX",
      color: "hover:text-teal-400",
      bgColor: "hover:bg-teal-500/10",
      borderColor: "hover:border-teal-400/30",
      description: "Advancing innovation and mentorship",
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
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Simplified backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(24px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClose}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              className="w-screen max-w-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <motion.div
                className="h-full flex flex-col bg-neutral-900/96 backdrop-blur-xl shadow-2xl overflow-y-scroll border-l border-white/15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
              >
                {/* Header */}
                <div className="px-6 py-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
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
                      className="text-white/70 hover:text-white transition-colors duration-300 relative group p-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <i className="ri-close-line text-2xl"></i>
                      <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-6 py-8 space-y-8">
                  {/* Tagline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                  >
                    <p className="text-white/70 text-sm leading-relaxed">
                      The creative layer of 434 MEDIA. We connect our IP & client work, showcasing the stories, brands,
                      & campaigns shaping the digital canvas network.
                    </p>
                  </motion.div>

                  {/* Featured Education Series */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                    className="bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-xl p-6 border border-blue-500/20 relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-bold text-lg flex items-center">
                          <i className="ri-graduation-cap-line mr-2 text-blue-400" />
                          Education Series
                        </h3>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-xs px-3 py-1 rounded-full text-white font-bold">
                          NEW
                        </span>
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
                          <i className="ri-external-link-line ml-2" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* IP Channels Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                  >
                    <h3 className="text-white font-semibold mb-6 text-lg flex items-center">
                      <i className="ri-links-line mr-2 text-blue-400" />
                      Our IP Channels
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {ipChannels.map((channel, index) => (
                        <motion.a
                          key={channel.label}
                          href={channel.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 bg-white/5 border border-white/10 ${channel.color} ${channel.bgColor} ${channel.borderColor}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="relative">
                            <i
                              className={`${channel.icon} text-2xl transition-transform duration-200 group-hover:scale-110`}
                            ></i>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white group-hover:text-current transition-colors duration-300">
                              {channel.label}
                            </div>
                            <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300 truncate">
                              {channel.description}
                            </div>
                          </div>

                          <i className="ri-external-link-line text-white/40 group-hover:text-current transition-colors duration-300" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Newsletter Signup */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                    className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl p-6 border border-white/10 relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <i className="ri-mail-line mr-2 text-teal-400" />
                        Stay Updated
                      </h3>

                      {isSubmitted ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="text-center py-4"
                        >
                          <i className="ri-checkbox-circle-line text-green-400 text-3xl mb-2 block" />
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
                            transition={{ duration: 0.2, ease: "easeOut" }}
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
                  transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
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
