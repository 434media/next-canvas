import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Workshops | Digital Canvas",
  description:
    "Free, industry-themed workshops hosted by DevSA. The open onramp into a Digital Canvas cohort — and the path to demo day in front of an accredited investor audience.",
  keywords:
    "Digital Canvas workshops, San Antonio workshops, AI builder workshop, prompt to production, DevSA workshops, cohort onramp, Cursor Claude Codex Gemini, demo day",
  alternates: {
    canonical: "/workshops",
  },
  openGraph: {
    title: "Workshops | Digital Canvas",
    description:
      "Free, industry-themed workshops hosted by DevSA. The open onramp into a Digital Canvas cohort and the path to demo day.",
    url: `${siteUrl}/workshops`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/workshops",
        width: 1200,
        height: 630,
        alt: "Digital Canvas Workshops — The Open Onramp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workshops | Digital Canvas",
    description:
      "Free, industry-themed workshops hosted by DevSA. The open onramp into a Digital Canvas cohort and the path to demo day.",
    images: ["/api/og/workshops"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const programJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: "Digital Canvas Cohort Program",
    description:
      "AI-native builder cohort program. Industry-themed workshop weekend opens the cohort, followed by a six-week build bridge, ending in demo day to an accredited investor audience and partner investors.",
    provider: [
      {
        "@type": "Organization",
        name: "Digital Canvas",
        url: siteUrl,
      },
      {
        "@type": "Organization",
        name: "DevSA",
        url: "https://www.devsa.community/",
      },
      {
        "@type": "Organization",
        name: "434 Media",
        url: "https://434media.com/",
      },
    ],
    educationalProgramMode: "in-person",
    timeToComplete: "P7W",
    termDuration: "P7W",
    occupationalCredentialAwarded:
      "Working AI-native prototype, pitch coaching, demo day presentation to accredited investors",
    programType: "Cohort",
    url: `${siteUrl}/workshops`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      category: "Free with commitment to demo day",
    },
    location: {
      "@type": "Place",
      name: "DevSA Coworking",
      address: {
        "@type": "PostalAddress",
        streetAddress: "110 E Houston St, 6th Floor",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }}
      />
      {children}
    </>
  )
}
