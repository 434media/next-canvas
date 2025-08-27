"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { motion, useAnimation } from "motion/react"
import { Newsletter } from "./newsletter"

const Footer = () => {
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setIsClient(true)
    controls.start("visible")
  }, [controls])

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
              <Newsletter />
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
