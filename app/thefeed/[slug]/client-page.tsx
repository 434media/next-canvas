"use client"

import type React from "react"
import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { NewsletterTemplate } from "@/components/thefeed/newsletter-template"
import type { FeedItem } from "@/data/feed-data"

interface ClientPageProps {
  item: FeedItem
}

export default function FeedDetailClientPage({ item }: ClientPageProps) {
  const typeColors = {
    video: "bg-black text-white",
    article: "bg-white text-black border-2 border-black",
    podcast: "bg-gray-800 text-white",
    newsletter: "bg-gray-200 text-black border-2 border-black",
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/thefeed"
          className="inline-flex items-center gap-2 mb-8 text-sm uppercase tracking-wider font-mono hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>

        {/* Header */}
        <header className="border-b-4 border-black pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 border-2 border-black bg-white" />
            <span className="text-xs uppercase tracking-wider font-mono">{item.date}</span>
            <span className={`text-xs uppercase tracking-wider font-mono px-3 py-1 ${typeColors[item.type]}`}>
              {item.type}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-menda-black uppercase tracking-tight mb-6 text-balance">
            {item.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 text-pretty">{item.summary}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-xs uppercase tracking-wider font-mono font-bold block mb-2">Authors:</span>
              <div className="flex flex-wrap gap-2">
                {item.authors.map((author) => (
                  <span key={author}>{author}</span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-mono font-bold block mb-2">Topics:</span>
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
          </div>
        </header>

        {/* Content */}
        {item.newsletterContent ? (
          <NewsletterTemplate content={item.newsletterContent} />
        ) : (
          <div className="prose prose-lg max-w-none">
            <div className="border-4 border-black p-8 bg-gray-50 mb-8">
              <p className="text-center text-gray-600 font-mono">
                [Content for this feed item would be displayed here]
              </p>
            </div>

            <div className="space-y-6 text-gray-800 leading-relaxed">
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
    <footer className="mt-12 pt-8 border-t-4 border-black">
      <div className="bg-black text-white p-8">
        {isSuccess ? (
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-12 h-12 border-4 border-white mx-auto flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 font-menda-black uppercase">Subscribed</h2>
            <p className="text-sm uppercase tracking-wider font-mono">Check your inbox</p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 font-menda-black uppercase text-center">
              Stay Updated
            </h2>
            <p className="mb-6 text-center text-sm tracking-tight md:tracking-normal">
              See how we blend creativity with community impact through innovative storytelling and design.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white text-black border-2 border-white focus:outline-none focus:border-gray-300 disabled:opacity-50 font-mono text-sm"
              />
              {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-3 bg-white text-black text-sm uppercase tracking-wider font-mono font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
