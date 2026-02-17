"use client"

import { motion } from "motion/react"

interface FeedHeaderProps {
  totalCount: number
}

export default function FeedHeader({ totalCount }: FeedHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-[#222] pb-8 mb-10"
    >
      <h1 className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide leading-[1.15]">
        The Feed
        <sup className="font-(family-name:--font-geist-pixel-square) text-base md:text-lg lg:text-xl ml-2 font-normal text-white/40">({totalCount})</sup>
      </h1>
      <p className="mt-5 text-base md:text-lg text-white/50 max-w-3xl leading-[1.8] font-light">
        Explore our latest newsletters, and community spotlights from the DEVSA x 434 MEDIA community.
      </p>
    </motion.div>
  )
}
