"use client"

import type React from "react"

import { motion, type MotionValue } from "motion/react"
import Image from "next/image"

interface NavbarProps {
  isVisible: boolean
  logoScale: MotionValue<number>
}

export const Navbar: React.FC<NavbarProps> = ({ isVisible, logoScale }) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div style={{ scale: logoScale }} className="w-32">
          <Image
            src="https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg"
            alt="Digital Canvas logo"
            width={128}
            height={32}
            className="w-full"
          />
        </motion.div>
        <div className="space-x-4">
          <a href="#about" className="text-white hover:text-gray-300">
            About
          </a>
          <a href="#events" className="text-white hover:text-gray-300">
            Events
          </a>
          <a href="#partners" className="text-white hover:text-gray-300">
            Partners
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

