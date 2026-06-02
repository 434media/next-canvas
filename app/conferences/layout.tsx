import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Conferences | Digital Canvas",
  description:
    "Tech conferences powered by the Digital Canvas partner network. More Human Than Human and the gatherings that anchor San Antonio's builder ecosystem.",
  keywords:
    "Digital Canvas conferences, San Antonio AI conference, More Human Than Human, MHTH, DevSA conference, AI ecosystem San Antonio, tech conferences Texas",
  alternates: {
    canonical: "/conferences",
  },
  openGraph: {
    title: "Conferences | Digital Canvas",
    description:
      "Tech conferences powered by the Digital Canvas partner network — anchored by More Human Than Human and the gatherings shaping San Antonio's builder ecosystem.",
    url: `${siteUrl}/conferences`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/conferences",
        width: 1200,
        height: 630,
        alt: "Digital Canvas Conferences — San Antonio tech gatherings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conferences | Digital Canvas",
    description:
      "Tech conferences powered by the Digital Canvas partner network — anchored by More Human Than Human.",
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
