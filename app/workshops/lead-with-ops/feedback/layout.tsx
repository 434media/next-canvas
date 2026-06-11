import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Lunch and Learn Feedback | Lead with Ops. Layer in AI.",
  description:
    "Ninety seconds of feedback on the Lead with Ops. Layer in AI. executive working lunch with Adam Carroll. It shapes the next session — and tells us who'd like to keep the conversation going.",
  alternates: {
    canonical: "/workshops/lead-with-ops/feedback",
  },
  // Post-event intake form — not meant to be indexed or shared as a social card.
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Lunch and Learn Feedback | Lead with Ops. Layer in AI.",
    description:
      "Ninety seconds of feedback shapes the next session. Lead with Ops. Layer in AI. — Digital Canvas · 434 Media.",
    url: `${siteUrl}/workshops/lead-with-ops/feedback`,
    siteName: "Digital Canvas",
    locale: "en_US",
    type: "website",
  },
}

export default function LeadWithOpsFeedbackLayout({ children }: { children: React.ReactNode }) {
  return children
}
