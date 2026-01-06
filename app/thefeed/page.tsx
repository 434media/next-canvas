"use client"

import { useState, useMemo, useEffect } from "react"
import FeedHeader from "@/components/thefeed/feed-header"
import FeedFilters from "@/components/thefeed/feed-filters"
import FeedList from "@/components/thefeed/feed-list"
import type { TransformedFeedItem } from "@/lib/api-feed"

export default function TheFeedPage() {
  const [feedItems, setFeedItems] = useState<TransformedFeedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

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

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]))
  }

  const handleAuthorToggle = (author: string) => {
    setSelectedAuthors((prev) => (prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]))
  }

  const handleClearFilters = () => {
    setSelectedTypes([])
    setSelectedTopics([])
    setSelectedAuthors([])
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 border border-red-200 bg-red-50 rounded-sm">
            <p className="text-lg font-medium text-red-600 mb-4">Error loading feed</p>
            <p className="text-sm text-red-500 mb-6">{error}</p>
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
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeedHeader totalCount={feedItems.length} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <FeedFilters
              selectedTypes={selectedTypes}
              selectedTopics={selectedTopics}
              selectedAuthors={selectedAuthors}
              onTypeToggle={handleTypeToggle}
              onTopicToggle={handleTopicToggle}
              onAuthorToggle={handleAuthorToggle}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Feed List */}
          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="border border-gray-200 bg-white p-12 rounded-sm">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-500 font-medium">Loading feed...</span>
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
