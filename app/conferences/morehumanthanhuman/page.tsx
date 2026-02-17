import { Metadata } from "next"
import { MoreHumanThanHuman } from "@/components/aiconference/more-human-than-human"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devsa.community"

export const metadata: Metadata = {
  title: "More Human Than Human | AI Conference Powered by DEVSA | February 28, 2026 | San Antonio",
  description: "As AI shifts from a tool we use to an agent that acts, the boundary between human and machine is disappearing. Live sessions on building AI agents from scratch, embedding Copilot into apps, proving humanity in an agentic internet, AI security & leadership, and what's left when the code writes itself. February 28, 2026 at Geekdom, San Antonio.",
  keywords: [
    "AI conference",
    "artificial intelligence",
    "agentic AI",
    "AI agents",
    "San Antonio tech",
    "DEVSA",
    "More Human Than Human",
    "GitHub Copilot SDK",
    "build AI agents from scratch",
    "proving humanity agentic internet",
    "AI security GRC",
    "AI leadership skills",
    "Godot audio synthesis",
    "GTM research AI",
    "Geekdom San Antonio",
    "tech conference 2026",
    "developer conference",
    "Texas tech events",
    "autonomous AI",
    "human verification",
    "MAGEN Trust",
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
    canonical: `${siteUrl}/conferences/morehumanthanhuman`,
  },
  openGraph: {
    title: "More Human Than Human | AI Conference Powered by DEVSA | February 28, 2026 | San Antonio",
    description: "9 live sessions. Build agents from scratch, embed Copilot with the GitHub SDK, prove humanity in an agentic internet, master AI leadership skills, and explore what's left when the code writes itself. Powered by DEVSA at Geekdom.",
    url: `${siteUrl}/conferences/morehumanthanhuman`,
    siteName: "DEVSA",
    images: [
      {
        url: `${siteUrl}/api/og/morehumanthanhuman`,
        width: 1200,
        height: 630,
        alt: "More Human Than Human — AI Conference with live sessions on agentic AI, Copilot SDK, AI security & leadership | February 28, 2026 | Geekdom, San Antonio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "More Human Than Human | AI Conference Powered by DEVSA | February 28, 2026 | San Antonio",
    description: "9 live sessions — build agents from scratch, embed Copilot into apps, prove humanity in an agentic internet, AI security & leadership, and more. Powered by DEVSA at Geekdom.",
    images: [`${siteUrl}/api/og/morehumanthanhuman`],
    creator: "@deaborntx",
    site: "@devsanantonio",
  },
}

export default function MoreHumanThanHumanPage() {
  return <MoreHumanThanHuman />
}