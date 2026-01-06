"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { FeedItem as FeedItemType } from "@/data/feed-data"
import type { TransformedFeedItem } from "@/lib/api-feed"

interface FeedItemProps {
  item: FeedItemType | TransformedFeedItem
  index: number
}

export default function FeedItem({ item, index }: FeedItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const typeColors = {
    video: "bg-black text-white",
    article: "bg-white text-black border-2 border-black",
    podcast: "bg-gray-800 text-white",
    newsletter: "bg-gray-200 text-black border-2 border-black",
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-gray-200 last:border-b-0 relative group hover:bg-gray-50/50 transition-colors"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left py-6 md:py-8 px-4 md:px-6 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-start gap-4 md:gap-6">
          {/* Date and Title Container */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Date */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-mono font-medium">{item.date}</span>
              <span className="text-gray-300">•</span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-widest font-mono font-semibold px-2.5 py-0.5 rounded-sm",
                  typeColors[item.type],
                )}
              >
                {item.type}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-gray-900 group-hover:text-black transition-colors">
              {item.title}
            </h3>
          </div>

          {/* Expand Icon */}
          <div className="flex items-center justify-center shrink-0 w-8 h-8 mt-1">
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 group-hover:text-black transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="stroke-current" strokeWidth="2">
                <path d="M 0 9 L 18 9" />
                <path d="M 9 0 L 9 18" />
              </svg>
            </motion.div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-8 space-y-5">
              <div className="h-px bg-gray-200" />

              {/* Summary */}
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono font-semibold text-gray-500 block mb-2">Summary</span>
                <div 
                  className="text-base leading-relaxed text-gray-700 prose prose-sm max-w-none [&_p]:mb-3 [&_p]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.summary }}
                />
              </div>

              {/* Authors & Topics Row */}
              <div className="flex flex-wrap gap-8">
                {/* Authors */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-mono font-semibold text-gray-500 block mb-2">Author</span>
                  <div className="flex flex-wrap gap-2">
                    {item.authors.map((author) => (
                      <span key={author} className="text-sm font-medium text-gray-800">
                        {author}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-mono font-semibold text-gray-500 block mb-2">Topics</span>
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs font-medium uppercase tracking-wide px-2.5 py-1 bg-gray-100 text-gray-700 rounded-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Link */}
              <Link
                href={item.link}
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors rounded-sm"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
