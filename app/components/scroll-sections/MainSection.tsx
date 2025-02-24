"use client"

import type React from "react"

import { motion } from "motion/react"
import { SocialIcon } from "../social-icon"

type SocialPlatform = "instagram" | "discord" | "x";

const socialLinks: { platform: SocialPlatform; href: string }[] = [
  { platform: "instagram", href: "https://instagram.com/digitalcanvas" },
  { platform: "discord", href: "https://discord.gg/digitalcanvas" },
  { platform: "x", href: "https://x.com/digitalcanvas" },
]

export const SocialSection: React.FC = () => {
  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-700 p-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 text-center"
      >
        Connect with fellow designers, developers, photographers, videographers, and digital artists
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center space-x-6 mt-4"
      >
        {socialLinks.map((item) => (
          <SocialIcon key={item.platform} {...item} />
        ))}
      </motion.div>
    </motion.div>
  )
}

