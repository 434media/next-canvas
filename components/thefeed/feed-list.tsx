"use client"

import { motion } from "motion/react"
import FeedItem from "./feed-item"
import type { FeedItem as FeedItemType } from "../../data/feed-data"

interface FeedListProps {
  items: FeedItemType[]
}

export default function FeedList({ items }: FeedListProps) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 border-4 border-black bg-gray-50"
      >
        <p className="text-xl font-mono">No items match your filters.</p>
        <p className="text-sm text-gray-600 mt-2">Try adjusting your filter selections.</p>
      </motion.div>
    )
  }

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="border-4 border-black bg-white"
    >
      {items.map((item, index) => (
        <FeedItem key={item.id} item={item} index={index} />
      ))}
    </motion.ul>
  )
}
