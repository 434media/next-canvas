import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "AI Agents",
  description:
    "White-label web development powered by structured RAG and the AI SDK. Human-in-the-loop AI agents for custom websites, CMS, payments, and email — coming soon from Digital Canvas.",
  keywords:
    "AI agents, white-label web development, RAG, AI SDK, human in the loop, CMS, custom websites, Digital Canvas, San Antonio",
  alternates: {
    canonical: "/agents",
  },
  openGraph: {
    title: "AI Agents | Digital Canvas",
    description:
      "White-label web development powered by structured RAG and the AI SDK. Human-in-the-loop AI agents — coming soon.",
    url: `${siteUrl}/agents`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/agents",
        width: 1200,
        height: 630,
        alt: "Digital Canvas AI Agents — Coming Soon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents | Digital Canvas",
    description:
      "White-label web development powered by structured RAG and the AI SDK. Human-in-the-loop AI agents — coming soon.",
    images: ["/api/og/agents"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
