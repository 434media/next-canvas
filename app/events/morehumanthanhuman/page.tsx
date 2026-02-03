import { Metadata } from "next"
import { MoreHumanThanHuman } from "@/components/aiconference/more-human-than-human"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devsa.community"

export const metadata: Metadata = {
  title: "More Human Than Human | AI Conference | February 28, 2026 | San Antonio",
  description: "San Antonio's premier AI conference exploring how artificial intelligence is reshaping code, security, and leadership. Join builders, dreamers, and technologists as AI shifts from tool to agent. February 28, 2026 at Geekdom.",
  keywords: [
    "AI conference",
    "artificial intelligence",
    "San Antonio tech",
    "DEVSA",
    "machine learning",
    "agentic AI",
    "AI security",
    "tech conference 2026",
    "Geekdom San Antonio",
    "More Human Than Human",
    "AI leadership",
    "developer conference",
    "Texas tech events",
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
    title: "More Human Than Human | AI Conference | Feb 28, 2026",
    description: "San Antonio's premier AI conference. As AI shifts from tool to agent, the boundary between human and machine is disappearing. Join us at Geekdom for live demos, expert speakers, and the tools defining our future.",
    url: `${siteUrl}/events/morehumanthanhuman`,
    siteName: "DEVSA",
    images: [
      {
        url: `${siteUrl}/api/og/morehumanthanhuman`,
        width: 1200,
        height: 630,
        alt: "More Human Than Human - AI Conference | February 28, 2026 | Geekdom, San Antonio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "More Human Than Human | AI Conference | Feb 28, 2026",
    description: "San Antonio's premier AI conference. As AI shifts from tool to agent, join builders and technologists at Geekdom. Live demos, expert speakers, networking.",
    images: [`${siteUrl}/api/og/morehumanthanhuman`],
    creator: "@deaborntx",
    site: "@devsanantonio",
  },
}

export default function MoreHumanThanHumanPage() {
  return <MoreHumanThanHuman />
}