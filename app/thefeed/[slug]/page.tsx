import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { feedItems } from "../../../data/feed-data"
import { ArrowLeft } from "lucide-react"

interface FeedDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return feedItems.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: FeedDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = feedItems.find((item) => item.slug === slug)

  if (!item) {
    return {
      title: "Not Found",
    }
  }

  return {
    title: `${item.title} | The Feed - Digital Canvas`,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      images: [
        {
          url: item.ogImage,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
      images: [item.ogImage],
    },
  }
}

export default async function FeedDetailPage({ params }: FeedDetailPageProps) {
  const { slug } = await params
  const item = feedItems.find((item) => item.slug === slug)

  if (!item) {
    notFound()
  }

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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-menda-black)] uppercase tracking-tight mb-6">
            {item.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">{item.summary}</p>

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
        <div className="prose prose-lg max-w-none">
          <div className="border-4 border-black p-8 bg-gray-50 mb-8">
            <p className="text-center text-gray-600 font-mono">[Content for this feed item would be displayed here]</p>
          </div>

          <div className="space-y-6 text-gray-800 leading-relaxed">
            <p>
              This is a placeholder for the full content of the newsletter or article. In a real implementation, you
              would fetch the full content from your CMS or database and render it here.
            </p>
            <p>
              The content could include rich text, images, videos, code snippets, and other media elements that make up
              the complete story.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <footer className="mt-12 pt-8 border-t-4 border-black">
          <div className="bg-black text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-menda-black)] uppercase">
              Stay Updated
            </h2>
            <p className="mb-6">Subscribe to get the latest from Digital Canvas delivered to your inbox.</p>
            <Link
              href="/#newsletter"
              className="inline-block px-8 py-3 bg-white text-black text-sm uppercase tracking-wider font-mono font-bold hover:bg-gray-200 transition-colors"
            >
              Subscribe Now
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}
