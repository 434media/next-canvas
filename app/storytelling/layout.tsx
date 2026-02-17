import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Human+ Storytelling",
  description:
    "Stories from the intersection of creativity, community, and technology. Featuring the More Human Than Human conference, The Feed, DevSA, Learn2AI, and the SDOH Accelerator.",
  keywords:
    "storytelling, human plus, creative technology, San Antonio, MHTH, DevSA, Learn2AI, SDOH Accelerator, 434 MEDIA, Digital Canvas",
  alternates: {
    canonical: "/storytelling",
  },
  openGraph: {
    title: "Human+ Storytelling | Digital Canvas",
    description:
      "Stories from the intersection of creativity, community, and technology. Real projects. Real people. San Antonio.",
    url: `${siteUrl}/storytelling`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/storytelling",
        width: 1200,
        height: 630,
        alt: "Digital Canvas — Human+ Storytelling",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Human+ Storytelling | Digital Canvas",
    description:
      "Stories from the intersection of creativity, community, and technology. Real projects. Real people. San Antonio.",
    images: ["/api/og/storytelling"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function StorytellingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
