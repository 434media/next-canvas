"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { NewsletterTemplate } from "@/components/thefeed/newsletter-template"
import type { FeedItem } from "@/data/feed-data"
import type { TransformedFeedItem } from "@/lib/api-feed"

interface ClientPageProps {
  item: FeedItem | TransformedFeedItem
}

export default function FeedDetailClientPage({ item }: ClientPageProps) {
  const typeColors = {
    video: "bg-black text-white",
    article: "bg-gray-100 text-gray-800",
    podcast: "bg-gray-800 text-white",
    newsletter: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/thefeed"
          className="inline-flex items-center gap-2 mb-10 text-sm text-gray-500 hover:text-black transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>

        {/* Header */}
        <header className="border-b border-gray-200 pb-10 mb-12">
          {/* Meta Row */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-sm text-gray-500 font-medium">{item.date}</span>
            <span className="text-gray-300">•</span>
            <span className={`text-[11px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm ${typeColors[item.type]}`}>
              {item.type}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6 text-gray-900">
            {item.title}
          </h1>

          {/* Summary */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            {item.summary}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 block mb-2">Authors</span>
              <div className="flex flex-wrap gap-2">
                {item.authors.map((author) => (
                  <span key={author} className="font-medium text-gray-700">{author}</span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 block mb-2">Topics</span>
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
        </header>

        {/* Content */}
        {item.newsletterContent ? (
          <NewsletterTemplate content={item.newsletterContent} />
        ) : (
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-700 prose-p:leading-relaxed">
            <div className="border border-gray-200 rounded-sm p-8 bg-gray-50 mb-8">
              <p className="text-center text-gray-500 font-medium">
                Content for this feed item would be displayed here
              </p>
            </div>

            <div className="space-y-5 text-gray-700 leading-relaxed">
              <p>
                This is a placeholder for the full content of the newsletter or article. In a real implementation, you
                would fetch the full content from your CMS or database and render it here.
              </p>
              <p>
                The content could include rich text, images, videos, code snippets, and other media elements that make
                up the complete story.
              </p>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <NewsletterFooterCTA />
      </article>
    </div>
  )
}

function NewsletterFooterCTA() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setEmail("")
        formRef.current?.reset()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="mt-16 pt-10 border-t border-gray-200">
      <div className="bg-gray-900 text-white p-8 md:p-10 rounded-sm">
        {isSuccess ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-5">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">You're Subscribed!</h2>
            <p className="text-gray-400 text-sm">Check your inbox for confirmation</p>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
              Stay Updated
            </h2>
            <p className="mb-6 text-gray-400 text-sm md:text-base leading-relaxed">
              See how we blend creativity with community impact through innovative storytelling and design.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 text-sm font-medium placeholder:text-gray-400"
              />
              {error && <p className="text-sm text-red-400 text-left">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-white text-gray-900 text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
          </div>
        )}
      </div>
    </footer>
  )
}
