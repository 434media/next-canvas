"use client"

import { motion } from "motion/react"
import "remixicon/fonts/remixicon.css"

export const HeroText = () => {
  const scrollToNetwork = () => {
    const networkSection = document.getElementById("network")
    if (networkSection) {
      networkSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="text-center lg:text-left">
      {/* Main heading with enhanced typography */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          {/* Single line with proper spacing */}
          <motion.span
            className="inline-block mr-4 text-white/90 font-light"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The
          </motion.span>
          <motion.span
            className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text font-black"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            Creative Layer
          </motion.span>

          {/* Subtitle on new line with better spacing */}
          <motion.div
            className="block mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white/80 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            of{" "}
            <motion.span
              className="font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              434 MEDIA
            </motion.span>
          </motion.div>
        </motion.h1>
      </motion.div>

      {/* Enhanced subtitle with better typography hierarchy */}
      <motion.div
        className="text-xl md:text-2xl lg:text-3xl text-neutral-300 mb-12 max-w-4xl mx-auto lg:mx-0 leading-relaxed font-light"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        We connect our{" "}
        <motion.span
          className="text-blue-400 font-semibold relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          IP properties
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400/0 via-blue-400/60 to-blue-400/0 block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />
        </motion.span>{" "}
        and{" "}
        <motion.span
          className="text-purple-400 font-semibold relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          client work
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400/0 via-purple-400/60 to-purple-400/0 block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          />
        </motion.span>
        , showcasing the stories, brands, and campaigns shaping the{" "}
        <motion.span
          className="text-teal-400 font-semibold relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          Digital Canvas network
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400/0 via-teal-400/60 to-teal-400/0 block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          />
        </motion.span>
        .
      </motion.div>

      {/* Single CTA button - Learn More removed */}
      <motion.div
        className="flex justify-center lg:justify-start"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
      >
        <motion.button
          onClick={scrollToNetwork}
          className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl overflow-hidden shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center tracking-wide">
            Explore Our Network
            <i className="ri-arrow-down-line ml-3 text-xl" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  )
}
