"use client"

import type React from "react"

import { motion } from "motion/react"
import { RiInstagramLine, RiDiscordLine, RiTwitterXLine } from "@remixicon/react"

type SocialPlatform = "instagram" | "discord" | "x"

type SocialIconProps = {
  platform: SocialPlatform
  href: string
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, href }) => {
  const icons: Record<SocialPlatform, React.ElementType> = {
    instagram: RiInstagramLine,
    discord: RiDiscordLine,
    x: RiTwitterXLine,
  }

  const Icon = icons[platform]

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="text-white hover:text-gray-300 transition-colors"
    >
      <Icon size={32} />
    </motion.a>
  )
}

