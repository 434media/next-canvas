import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFeedItemBySlug } from "@/lib/airtable-feed"
import FeedDetailClientPage from "./client-page"

// Force dynamic rendering to match the main feed page behavior
export const dynamic = 'force-dynamic'

interface FeedDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: FeedDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    let item = await getFeedItemBySlug(slug)

    // Fallback to static data if not found in Airtable
    if (!item) {
      try {
        const { feedItems } = await import('@/data/feed-data')
        item = feedItems.find((staticItem) => staticItem.slug === slug) || null
      } catch (staticErr) {
        console.error('Error loading static fallback for metadata:', staticErr)
      }
    }

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
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: "Not Found",
    }
  }
}

export default async function FeedDetailPage({ params }: FeedDetailPageProps) {
  try {
    const { slug } = await params
    let item = await getFeedItemBySlug(slug)

    // Fallback to static data if not found in Airtable
    if (!item) {
      try {
        const { feedItems } = await import('@/data/feed-data')
        item = feedItems.find((staticItem) => staticItem.slug === slug) || null
      } catch (staticErr) {
        console.error('Error loading static fallback:', staticErr)
      }
    }

    if (!item) {
      notFound()
    }

    return <FeedDetailClientPage item={item} />
  } catch (error) {
    console.error('Error fetching feed item:', error)
    notFound()
  }
}
