"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { feedTypes, feedTopics, feedAuthors } from "../../data/feed-data"
import { useIsMobile } from "../../hooks/use-mobile"

interface FeedFiltersProps {
  selectedTypes: string[]
  selectedTopics: string[]
  selectedAuthors: string[]
  onTypeToggle: (type: string) => void
  onTopicToggle: (topic: string) => void
  onAuthorToggle: (author: string) => void
  onClearFilters: () => void
}

export default function FeedFilters({
  selectedTypes,
  selectedTopics,
  selectedAuthors,
  onTypeToggle,
  onTopicToggle,
  onAuthorToggle,
  onClearFilters,
}: FeedFiltersProps) {
  const isMobile = useIsMobile()
  const [isTypeOpen, setIsTypeOpen] = useState(true)
  const [isTopicOpen, setIsTopicOpen] = useState(true)
  const [isAuthorOpen, setIsAuthorOpen] = useState(true)

  // Set different default states based on mobile/desktop
  useEffect(() => {
    if (isMobile !== undefined) {
      const defaultOpen = !isMobile // Open on desktop, closed on mobile
      setIsTypeOpen(defaultOpen)
      setIsTopicOpen(defaultOpen)
      setIsAuthorOpen(defaultOpen)
    }
  }, [isMobile])

  const hasActiveFilters = selectedTypes.length > 0 || selectedTopics.length > 0 || selectedAuthors.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border-4 border-black bg-white p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
        <h2 className="text-sm uppercase tracking-wider font-mono font-bold">/ Filter</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm uppercase tracking-wider font-mono hover:underline transition-all"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsTypeOpen(!isTypeOpen)}
          className="flex items-center gap-2 mb-3 text-sm uppercase tracking-wider font-mono font-bold hover:underline transition-all w-full"
        >
          <motion.div animate={{ rotate: isTypeOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          <span className="mr-2">📁</span>
          Type
        </button>
        <AnimatePresence>
          {isTypeOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 pl-8 overflow-hidden"
            >
              {feedTypes.map((type) => (
                <li key={type}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => onTypeToggle(type)}
                      className="w-4 h-4 border-2 border-black cursor-pointer accent-black"
                    />
                    <span className="text-sm capitalize group-hover:underline">{type}</span>
                  </label>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Topic Filter */}
      <div className="mb-6">
        <button
          onClick={() => setIsTopicOpen(!isTopicOpen)}
          className="flex items-center gap-2 mb-3 text-sm uppercase tracking-wider font-mono font-bold hover:underline transition-all w-full"
        >
          <motion.div animate={{ rotate: isTopicOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          <span className="mr-2">🏷️</span>
          Topic
        </button>
        <AnimatePresence>
          {isTopicOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 pl-8 overflow-hidden"
            >
              {feedTopics.map((topic) => (
                <li key={topic}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic)}
                      onChange={() => onTopicToggle(topic)}
                      className="w-4 h-4 border-2 border-black cursor-pointer accent-black"
                    />
                    <span className="text-sm group-hover:underline">{topic}</span>
                  </label>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Author Filter */}
      <div>
        <button
          onClick={() => setIsAuthorOpen(!isAuthorOpen)}
          className="flex items-center gap-2 mb-3 text-sm uppercase tracking-wider font-mono font-bold hover:underline transition-all w-full"
        >
          <motion.div animate={{ rotate: isAuthorOpen ? 0 : -90 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          <span className="mr-2">✍️</span>
          Author
        </button>
        <AnimatePresence>
          {isAuthorOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 pl-8 overflow-hidden"
            >
              {feedAuthors.map((author) => (
                <li key={author}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAuthors.includes(author)}
                      onChange={() => onAuthorToggle(author)}
                      className="w-4 h-4 border-2 border-black cursor-pointer accent-black"
                    />
                    <span className="text-sm group-hover:underline">{author}</span>
                  </label>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
