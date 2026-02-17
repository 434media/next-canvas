import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "The Feed",
  description:
    "Curated content from Digital Canvas — articles, videos, and resources at the intersection of creativity and technology. Stay current with San Antonio's creative tech community.",
  keywords:
    "the feed, content hub, articles, videos, resources, Digital Canvas, creative technology, San Antonio",
  alternates: {
    canonical: "/thefeed",
  },
  openGraph: {
    title: "The Feed | Digital Canvas",
    description:
      "Curated content from 434 MEDIA — articles, videos, and resources at the intersection of creativity and technology.",
    url: `${siteUrl}/thefeed`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/thefeed",
        width: 1200,
        height: 630,
        alt: "The Feed — Digital Canvas Content Hub",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Feed | Digital Canvas",
    description:
      "Curated content from 434 MEDIA — articles, videos, and resources at the intersection of creativity and technology.",
    images: ["/api/og/thefeed"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function TheFeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
