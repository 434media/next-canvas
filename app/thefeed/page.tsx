"use client"

import { useState, useMemo, useEffect } from "react"
import FeedHeader from "@/components/thefeed/feed-header"
import FeedFilters from "@/components/thefeed/feed-filters"
import FeedList from "@/components/thefeed/feed-list"
import type { FeedItem } from "@/data/feed-data"

export default function TheFeedPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  // Fetch feed items from API on component mount
  useEffect(() => {
    async function fetchFeedItems() {
      try {
        setIsLoading(true)
        
        // Try to fetch from API first
        const response = await fetch('/api/feed')
        const result = await response.json()
        
        if (result.success && result.data && result.data.length > 0) {
          setFeedItems(result.data)
        } else {
          // Fallback to static data if API returns no items or fails
          const { feedItems: staticItems } = await import('@/data/feed-data')
          setFeedItems(staticItems)
        }
      } catch (err) {
        console.error('Error fetching feed items:', err)
        // Fallback to static data on error
        try {
          const { feedItems: staticItems } = await import('@/data/feed-data')
          setFeedItems(staticItems)
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
      // Items are already sorted by published_date desc from Airtable, so no need to reverse
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
          <div className="text-center py-12 border-4 border-red-500 bg-red-50">
            <p className="text-xl font-mono text-red-600">Error loading feed: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-red-600 text-white font-mono hover:bg-red-700"
            >
              Retry
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
              <div className="border-4 border-black bg-white p-8">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono">Loading feed...</span>
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
