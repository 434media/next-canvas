import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "The Feed | Digital Canvas",
  description:
    "Field notes from the work — cohort builds, demo days, workshops, and the San Antonio builder ecosystem. Articles, videos, and resources from Digital Canvas.",
  keywords:
    "Digital Canvas feed, San Antonio tech news, AI builder articles, cohort updates, demo day coverage, DevSA articles, builder ecosystem",
  alternates: {
    canonical: "/thefeed",
  },
  openGraph: {
    title: "The Feed | Digital Canvas",
    description:
      "Field notes from the work — cohort builds, demo days, workshops, and the San Antonio builder ecosystem.",
    url: `${siteUrl}/thefeed`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/thefeed",
        width: 1200,
        height: 630,
        alt: "The Feed — Field notes from the Digital Canvas builder ecosystem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Feed | Digital Canvas",
    description:
      "Field notes from the work — cohort builds, demo days, workshops, and the San Antonio builder ecosystem.",
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
