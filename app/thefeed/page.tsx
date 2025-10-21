"use client"

import { useState, useMemo } from "react"
import FeedHeader from "../../components/thefeed/feed-header"
import FeedFilters from "../../components/thefeed/feed-filters"
import FeedList from "../../components/thefeed/feed-list"
import { feedItems } from "../../data/feed-data"

export default function TheFeedPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  const filteredItems = useMemo(() => {
    return feedItems.filter((item) => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.type)
      const topicMatch = selectedTopics.length === 0 || item.topics.some((topic) => selectedTopics.includes(topic))
      const authorMatch =
        selectedAuthors.length === 0 || item.authors.some((author) => selectedAuthors.includes(author))

      return typeMatch && topicMatch && authorMatch
    })
  }, [selectedTypes, selectedTopics, selectedAuthors])

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
            <FeedList items={filteredItems} />
          </main>
        </div>
      </div>
    </div>
  )
}
