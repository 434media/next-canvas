import type React from "react"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "The Lighthouse Workshop | Hood Kid · Good Kid",
  description:
    "Lived experience to C-suite strategy. The Lighthouse Workshop blends street-level instinct with leadership principles — a Digital Canvas workshop offering for teams that lead.",
  keywords:
    "Lighthouse Workshop, Hood Kid Good Kid, leadership workshop, executive workshop, San Antonio leadership, Digital Canvas workshops, Earned Not Given",
  alternates: {
    canonical: "/workshops/hoodkidgoodkid",
  },
  openGraph: {
    title: "The Lighthouse Workshop | Hood Kid · Good Kid",
    description:
      "Lived experience to C-suite strategy. The Lighthouse Workshop blends street-level instinct with leadership principles. A Digital Canvas workshop offering.",
    url: `${siteUrl}/workshops/hoodkidgoodkid`,
    siteName: "Digital Canvas",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lighthouse Workshop | Hood Kid · Good Kid",
    description:
      "Lived experience to C-suite strategy. The Lighthouse Workshop blends street-level instinct with leadership principles.",
    creator: "@434media",
    site: "@434media",
  },
}

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
