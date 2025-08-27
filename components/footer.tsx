"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { motion, useAnimation } from "motion/react"

const Footer = () => {
  const [isClient, setIsClient] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setIsClient(true)
    controls.start("visible")
  }, [controls])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

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
    <footer className="bg-transparent relative overflow-hidden z-10">
      {/* Enhanced Footer Bottom - kept as requested */}
      <motion.div
        className="bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8 relative z-20"
        variants={itemVariants}
        initial="hidden"
        animate={controls}
      >
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

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-white/50 text-sm"
              whileHover={{ color: "rgba(255,255,255,0.7)" }}
              transition={{ duration: 0.2 }}
            >
              &copy; 2025 434 MEDIA All rights reserved.
            </motion.p>

            <motion.div className="flex items-center" variants={containerVariants}>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center space-x-3">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Stay Connected"
                  className="bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 w-64"
                  whileFocus={{ scale: 1.02 }}
                  variants={itemVariants}
                />
                <motion.button
                  type="submit"
                  className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  {isSubmitted ? "Thanks!" : "Subscribe"}
                </motion.button>
              </form>
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
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
