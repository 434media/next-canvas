import { Metadata } from "next"
import { MoreHumanThanHuman } from "@/components/aiconference/more-human-than-human"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devsa.community"

export const metadata: Metadata = {
  title: "More Human Than Human | AI Conference Powered by DEVSA| February 28, 2026 | San Antonio",
  description: "As AI shifts from a tool we use to an agent that acts, the boundary between human and machine is disappearing. Join San Antonio's builders, dreamers, and technologists for a deep dive into how AI is re-architecting code, security, and leadership. February 28, 2026 at Geekdom.",
  keywords: [
    "AI conference",
    "artificial intelligence",
    "agentic AI",
    "AI agents",
    "San Antonio tech",
    "DEVSA",
    "AI security",
    "AI leadership",
    "GitHub Copilot SDK",
    "tech conference 2026",
    "Geekdom San Antonio",
    "More Human Than Human",
    "developer conference",
    "Texas tech events",
    "human verification",
    "autonomous AI",
    "AI coding",
  ],
  authors: [{ name: "DEVSA", url: "https://devsa.community" }],
  creator: "Digital Canvas Network",
  publisher: "DEVSA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `${siteUrl}/events/morehumanthanhuman`,
  },
  openGraph: {
    title: "More Human Than Human | AI Conference Powered by DEVSA | Feb 28, 2026",
    description: "We aren't just talking about the future — we're demonstrating the tools that are defining it. Live demos on building AI agents, embedding Copilot into apps, proving humanity in an agentic internet, and what's left when the code writes itself.",
    url: `${siteUrl}/events/morehumanthanhuman`,
    siteName: "DEVSA",
    images: [
      {
        url: `${siteUrl}/api/og/morehumanthanhuman`,
        width: 1200,
        height: 630,
        alt: "More Human Than Human - AI Conference exploring agentic AI, security, and leadership | February 28, 2026 | Geekdom, San Antonio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "More Human Than Human | AI Conference Powered by DEVSA | Feb 28, 2026",
    description: "We aren't just talking about the future — we're demonstrating it. Build agents from scratch, embed Copilot into apps, explore AI security. Join us at Geekdom, San Antonio.",
    images: [`${siteUrl}/api/og/morehumanthanhuman`],
    creator: "@deaborntx",
    site: "@devsanantonio",
  },
}

export default function MoreHumanThanHumanPage() {
  return <MoreHumanThanHuman />
}