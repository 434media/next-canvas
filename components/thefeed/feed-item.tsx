"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { FeedItem as FeedItemType } from "../../data/feed-data"

interface FeedItemProps {
  item: FeedItemType
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
      className="border-b-2 border-black last:border-b-0"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left py-6 hover:bg-gray-50 transition-colors px-4 -mx-4"
      >
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Date */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-3 h-3 border-2 border-black bg-white" />
            <span className="text-xs uppercase tracking-wider font-mono">{item.date}</span>
          </div>

          {/* Title */}
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
          </div>

          {/* Type Badge */}
          <div className={cn("text-xs uppercase tracking-wider font-mono px-3 py-1 shrink-0", typeColors[item.type])}>
            {item.type}
          </div>

          {/* Expand Icon */}
          <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-current">
              <path d="M 0 10 L 20 10" strokeWidth="2" />
              <path d="M 10 0 L 10 20" strokeWidth="2" />
            </svg>
          </motion.div>
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
            <div className="px-4 pb-6 space-y-4">
              <div className="h-px bg-black mb-4" />

              {/* Summary */}
              <div>
                <span className="text-xs uppercase tracking-wider font-mono font-bold block mb-2">Summary:</span>
                <p className="text-sm leading-relaxed text-gray-700">{item.summary}</p>
              </div>

              {/* Authors */}
              <div>
                <span className="text-xs uppercase tracking-wider font-mono font-bold block mb-2">Author:</span>
                <div className="flex flex-wrap gap-2">
                  {item.authors.map((author) => (
                    <span key={author} className="text-sm">
                      {author}
                    </span>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div>
                <span className="text-xs uppercase tracking-wider font-mono font-bold block mb-2">Topic:</span>
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs uppercase tracking-wider font-mono px-2 py-1 border-2 border-black bg-white"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <Link
                href={item.link}
                className="inline-block mt-4 px-6 py-3 bg-black text-white text-sm uppercase tracking-wider font-mono font-bold hover:bg-gray-800 transition-colors border-2 border-black"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
