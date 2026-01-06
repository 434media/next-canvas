"use client"

import { motion } from "motion/react"
import FeedItem from "./feed-item"
import type { FeedItem as FeedItemType } from "../../data/feed-data"
import type { TransformedFeedItem } from "@/lib/api-feed"

interface FeedListProps {
  items: (FeedItemType | TransformedFeedItem)[]
}

export default function FeedList({ items }: FeedListProps) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 border border-gray-200 bg-gray-50 rounded-sm"
      >
        <p className="text-lg font-medium text-gray-700">No items match your filters</p>
        <p className="text-sm text-gray-500 mt-2">Try adjusting your filter selections</p>
      </motion.div>
    )
  }

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="border border-gray-200 rounded-sm bg-white divide-y divide-gray-200"
    >
      {items.map((item, index) => (
        <FeedItem key={item.id} item={item} index={index} />
      ))}
    </motion.ul>
  )
}
