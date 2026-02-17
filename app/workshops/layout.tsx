import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Workshops & Outreach",
  description:
    "Hands-on workshops for the San Antonio tech community and sponsored partnerships for companies. Two tracks: community-driven Digital Canvas Workshops and employer-sponsored outreach programs.",
  keywords:
    "workshops, tech education, San Antonio, outreach, sponsored workshops, developer training, community workshops, 434 MEDIA, Digital Canvas, Hood Kid Good Kid",
  alternates: {
    canonical: "/workshops",
  },
  openGraph: {
    title: "Workshops & Outreach | Digital Canvas",
    description:
      "Hands-on workshops for the San Antonio tech community — and partnerships with companies who want to do the same.",
    url: `${siteUrl}/workshops`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/workshops",
        width: 1200,
        height: 630,
        alt: "Digital Canvas Workshops & Outreach",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workshops & Outreach | Digital Canvas",
    description:
      "Hands-on workshops for the San Antonio tech community — and partnerships with companies who want to do the same.",
    images: ["/api/og/workshops"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
