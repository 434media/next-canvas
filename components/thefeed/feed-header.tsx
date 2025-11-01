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
      className="border-b-4 border-black pb-6 mb-8"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-menda-black)] uppercase tracking-tight">
        The Feed
        <sup className="text-2xl md:text-3xl lg:text-4xl ml-2 font-mono">({totalCount})</sup>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl">
        Explore our latest newsletters, articles, videos, and podcasts from the Digital Canvas community.
      </p>
    </motion.div>
  )
}
