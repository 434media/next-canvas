import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Demo Days | Digital Canvas",
  description:
    "Where the cohort ships. One evening of curated pitches to an accredited investor audience and partner capital across San Antonio and Texas. Not a pitch event — a room where conversations start.",
  keywords:
    "Digital Canvas demo day, San Antonio demo day, AI builder demo, investor pitch event, accredited investor network, cohort demo",
  alternates: {
    canonical: "/demo-days",
  },
  openGraph: {
    title: "Demo Days | Digital Canvas",
    description:
      "Curated pitches to an accredited investor audience and partner capital across San Antonio and Texas. A room where conversations start.",
    url: `${siteUrl}/demo-days`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/demo-days",
        width: 1200,
        height: 630,
        alt: "Digital Canvas — Demo Days",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo Days | Digital Canvas",
    description:
      "Curated pitches to an accredited investor audience and partner capital across San Antonio and Texas. A room where conversations start.",
    images: ["/api/og/demo-days"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function DemoDaysLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
