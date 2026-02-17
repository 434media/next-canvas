import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Quarterly tech conferences connecting San Antonio's creative and developer communities. Featuring DevSA, PySA, GDG, and Tech Day events with hands-on workshops, talks, and networking.",
  keywords:
    "tech conferences, San Antonio, DevSA, PySA, GDG, Tech Day, developer events, creative community, Digital Canvas",
  alternates: {
    canonical: "/conferences",
  },
  openGraph: {
    title: "Conferences | Digital Canvas",
    description:
      "Quarterly tech conferences connecting San Antonio's creative and developer communities.",
    url: `${siteUrl}/conferences`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/conferences",
        width: 1200,
        height: 630,
        alt: "Digital Canvas Conferences",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conferences | Digital Canvas",
    description:
      "Quarterly tech conferences connecting San Antonio's creative and developer communities.",
    images: ["/api/og/conferences"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function ConferencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
