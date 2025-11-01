import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { feedItems } from "@/data/feed-data"
import FeedDetailClientPage from "./client-page"

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

  return <FeedDetailClientPage item={item} />
}
