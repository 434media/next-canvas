import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

const flyerUrl =
  "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2FInvitation%20only%20Limited%20Executive%20Seating.PNG?alt=media"

export const metadata: Metadata = {
  title: "Lead with Ops. Layer in AI. | June 18 | Digital Canvas",
  description:
    "An executive working lunch with Adam Carroll, Founder of Carroll Strategy & Operations. Explore how operators can lead with operations, layer in AI, and make technology decisions that support business outcomes. June 18, 2026 at VelocityTX.",
  keywords:
    "Lead with Ops, AI strategy, executive working lunch, San Antonio AI event, Adam Carroll, Carroll Strategy and Operations, VelocityTX, Digital Canvas, 434 Media",
  alternates: {
    canonical: "/workshops/lead-with-ops",
  },
  openGraph: {
    title: "Lead with Ops. Layer in AI. | June 18, 2026 | Executive Working Lunch",
    description:
      "Executive working lunch with Adam Carroll. AI strategy, operational alignment, and implementation. VelocityTX, June 18.",
    url: `${siteUrl}/workshops/lead-with-ops`,
    siteName: "Digital Canvas",
    images: [
      {
        url: flyerUrl,
        width: 1200,
        height: 1500,
        alt: "Lead with Ops. Layer in AI. — Executive Working Lunch, June 18, 2026, VelocityTX",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead with Ops. Layer in AI. | June 18 | Executive Working Lunch",
    description:
      "Executive working lunch with Adam Carroll. AI strategy, operational alignment, implementation. VelocityTX, June 18.",
    images: [flyerUrl],
    creator: "@434media",
    site: "@434media",
  },
}

export default function LeadWithOpsLayout({ children }: { children: React.ReactNode }) {
  return children
}
