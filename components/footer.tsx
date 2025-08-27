"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { motion, useAnimation } from "motion/react"

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
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-white/50 text-sm"
              whileHover={{ color: "rgba(255,255,255,0.7)" }}
              transition={{ duration: 0.2 }}
            >
              &copy; 2025 434 MEDIA All rights reserved.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
