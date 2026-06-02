import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "For Builders | Digital Canvas",
  description:
    "Free, AI-native builder cohort for San Antonio. Six weeks. One demo day. An accredited investor audience in the room. Build something real. Pitch real investors.",
  keywords:
    "Digital Canvas builders, San Antonio builder program, AI cohort, prompt to production, demo day, DevSA, 434 Media, accredited investor network",
  alternates: {
    canonical: "/builders",
  },
  openGraph: {
    title: "For Builders | Digital Canvas",
    description:
      "Build something real with AI tools. Pitch real investors. Free workshop. Six-week build bridge. Demo day in front of an accredited investor audience.",
    url: `${siteUrl}/builders`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/builders",
        width: 1200,
        height: 630,
        alt: "Digital Canvas — For Builders",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Builders | Digital Canvas",
    description:
      "Build something real with AI tools. Pitch real investors. Free workshop. Six-week build bridge. Demo day in front of an accredited investor audience.",
    images: ["/api/og/builders"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function BuildersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
