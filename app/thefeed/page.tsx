"use client"

import { useState, useMemo, useEffect } from "react"
import FeedHeader from "@/components/thefeed/feed-header"
import FeedList from "@/components/thefeed/feed-list"
import type { TransformedFeedItem } from "@/lib/api-feed"

export default function TheFeedPage() {
  const [feedItems, setFeedItems] = useState<TransformedFeedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTypes] = useState<string[]>([])
  const [selectedTopics] = useState<string[]>([])
  const [selectedAuthors] = useState<string[]>([])

  // Fetch feed items from 434 Media API via local route
  useEffect(() => {
    async function fetchFeedItems() {
      try {
        setIsLoading(true)
        
        const response = await fetch('/api/feed')
        const result = await response.json()
        
        if (result.success && result.data && result.data.length > 0) {
          setFeedItems(result.data)
        } else {
          // Fallback to static data if API returns no items
          const { feedItems: staticItems } = await import('@/data/feed-data')
          // Transform static items to match TransformedFeedItem shape
          setFeedItems(staticItems.map(item => ({
            ...item,
            published_date: item.date,
            ogImage: item.ogImage || '',
          })))
        }
      } catch (err) {
        console.error('Error fetching feed items:', err)
        // Fallback to static data on error
        try {
          const { feedItems: staticItems } = await import('@/data/feed-data')
          setFeedItems(staticItems.map(item => ({
            ...item,
            published_date: item.date,
            ogImage: item.ogImage || '',
          })))
        } catch (staticErr) {
          setError('Failed to load feed items')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeedItems()
  }, [])

  const filteredItems = useMemo(() => {
    return feedItems
      .filter((item) => {
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.type)
        const topicMatch = selectedTopics.length === 0 || item.topics.some((topic) => selectedTopics.includes(topic))
        const authorMatch =
          selectedAuthors.length === 0 || item.authors.some((author) => selectedAuthors.includes(author))

        return typeMatch && topicMatch && authorMatch
      })
      // Sort by published_date descending (newest first)
      .sort((a, b) => {
        const dateA = new Date(a.published_date).getTime()
        const dateB = new Date(b.published_date).getTime()
        return dateB - dateA
      })
  }, [feedItems, selectedTypes, selectedTopics, selectedAuthors])





  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 border border-red-500/30 bg-red-500/5 rounded-sm">
            <p className="text-lg font-medium text-red-400 mb-4">Error loading feed</p>
            <p className="text-sm text-red-400/60 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeedHeader totalCount={feedItems.length} />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sticky Video Sidebar */}
          <aside className="lg:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Section label */}
              <div className="border-b border-[#222] pb-3 mb-6">
                <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-white/40 font-normal">
                  / Info
                </span>
              </div>

              {/* Video container */}
              <div className="relative aspect-video w-full overflow-hidden border border-[#222] bg-black rounded-sm">
                <video
                  src="https://ampd-asset.s3.us-east-2.amazonaws.com/digitalcanvas.mov"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>

              {/* Video caption */}
              <div className="mt-4 flex items-center justify-between">
                <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-white/30 font-normal">
                  Digital Canvas
                </span>
                <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-[#ff9900]/60 font-normal">
                  434 Media
                </span>
              </div>
            </div>
          </aside>

          {/* Feed List — Topics */}
          <main className="flex-1 min-w-0">
            <div className="border-b border-[#222] pb-3 mb-6">
              <span className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.3em] text-white/40 font-normal">
                / Topics
              </span>
            </div>

            {isLoading ? (
              <div className="border border-[#222] bg-[#111] p-12 rounded-sm">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-6 h-6 border-2 border-[#333] border-t-[#ff9900] rounded-full animate-spin"></div>
                  <span className="text-sm text-white/40 font-medium">Loading feed...</span>
                </div>
              </div>
            ) : (
              <FeedList items={filteredItems} />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
