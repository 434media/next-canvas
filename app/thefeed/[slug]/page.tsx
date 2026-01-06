import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getFeedItemBySlug } from "@/lib/api-feed"
import FeedDetailClientPage from "./client-page"

// Force dynamic rendering
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

    // Fallback to static data if not found in API
    if (!item) {
      try {
        const { feedItems } = await import('@/data/feed-data')
        const staticItem = feedItems.find((staticItem) => staticItem.slug === slug)
        if (staticItem) {
          item = {
            ...staticItem,
            published_date: staticItem.date,
            ogImage: staticItem.ogImage || '',
          }
        }
      } catch (staticErr) {
        console.error('Error loading static fallback for metadata:', staticErr)
      }
    }

    if (!item) {
      return {
        title: "Not Found",
      }
    }

    // Use og_title/og_description if available, otherwise fallback to title/summary
    const ogTitle = item.og_title || item.title
    const ogDescription = item.og_description || item.summary
    const ogImage = item.ogImage

    return {
      title: `${item.title} | The Feed - Digital Canvas`,
      description: item.summary,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        images: ogImage ? [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: ogTitle,
          },
        ] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: ogImage ? [ogImage] : [],
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

    // Fallback to static data if not found in API
    if (!item) {
      try {
        const { feedItems } = await import('@/data/feed-data')
        const staticItem = feedItems.find((staticItem) => staticItem.slug === slug)
        if (staticItem) {
          item = {
            ...staticItem,
            published_date: staticItem.date,
            ogImage: staticItem.ogImage || '',
          }
        }
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
