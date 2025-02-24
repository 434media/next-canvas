"use client"

import type React from "react"

import { motion } from "motion/react"
import Image from "next/image"

export const Hero: React.FC = () => {
  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mx-auto mb-16"
      >
        <Image
          src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
          alt="Digital Canvas logo"
          width={400}
          height={100}
          className="w-full"
          priority
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 text-center"
      >
        Where Creativity Meets Technology
      </motion.h2>
    </motion.div>
  )
}

