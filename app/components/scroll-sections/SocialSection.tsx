"use client"

import type React from "react"
import { motion } from "motion/react"
import { SocialIcon } from "../social-icon"

type SocialPlatform = "instagram" | "discord" | "x"

const socialLinks: { platform: SocialPlatform; href: string }[] = [
  { platform: "instagram", href: "https://instagram.com/digitalcanvas" },
  { platform: "discord", href: "https://discord.gg/digitalcanvas" },
  { platform: "x", href: "https://x.com/digitalcanvas" },
]

export const SocialSection: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-800 to-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center leading-tight max-w-4xl"
      >
        Connect with fellow creatives
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mb-12"
      >
        Join our community of designers, developers, photographers, videographers, and digital artists
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex justify-center space-x-8 mt-4"
      >
        {socialLinks.map((item) => (
          <motion.div key={item.platform} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <SocialIcon {...item} />
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg text-gray-400 mt-8 text-center"
      >
        Follow us on social media for the latest updates and community highlights
      </motion.p>
    </motion.div>
  )
}

