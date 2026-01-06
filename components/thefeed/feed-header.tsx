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
      className="border-b-4 border-black pb-8 mb-10"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-menda-black uppercase tracking-tight leading-none">
        The Feed
        <sup className="text-xl md:text-2xl lg:text-3xl ml-2 font-mono font-medium text-gray-500">({totalCount})</sup>
      </h1>
      <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed font-normal">
        Explore our latest newsletters, articles, videos, and podcasts from the Digital Canvas community.
      </p>
    </motion.div>
  )
}
