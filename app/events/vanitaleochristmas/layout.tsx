import type React from "react"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Vanita Leo Christmas Laptop Giveaway | Closing the Digital Divide",
  description:
    "Join us December 19th at Velocity TX for a special Christmas laptop giveaway. 50 free Chromebooks for women in underserved communities. Featuring Vanita Leo.",
  keywords: [
    "Vanita Leo",
    "Chromebook giveaway",
    "Digital divide",
    "Velocity TX",
    "San Antonio",
    "Women in tech",
    "Technology access",
  ],
  authors: [{ name: "434 Media" }],
  creator: "Digital Canvas",
  publisher: "434 Media",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/events/vanitaleochristmas",
  },
  openGraph: {
    title: "Vanita Leo Christmas Laptop Giveaway",
    description: "50 free Chromebooks for women in underserved communities. December 19th, 9AM-12PM at Velocity TX.",
    url: `${siteUrl}/events/vanitaleochristmas`,
    siteName: "Vanita Leo Christmas",
    images: [
      {
        url: "https://ampd-asset.s3.us-east-2.amazonaws.com/vanitachristmas.png",
        width: 1200,
        height: 630,
        alt: "Vanita Leo Christmas Chromebook Giveaway",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanita Leo Christmas Laptop Giveaway",
    description: "50 free Chromebooks for women in underserved communities. December 19th, 9AM-12PM at Velocity TX.",
    images: ["https://ampd-asset.s3.us-east-2.amazonaws.com/vanitachristmas.png"],
    creator: "@digitalcanvas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function VanitaLeoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Vanita Leo Christmas Laptop Giveaway",
    description:
      "A special Christmas laptop giveaway providing 50 free Chromebooks to women in underserved San Antonio communities. Equipping aspiring women in technology with critical tools for success.",
    startDate: "2025-12-19T09:00:00-06:00",
    endDate: "2025-12-19T12:00:00-06:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Velocity TX CRC",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    organizer: [
      {
        "@type": "Person",
        name: "Vanita Leo",
      },
      {
        "@type": "Organization",
        name: "Velocity TX",
      },
      {
        "@type": "Organization",
        name: "Digital Canvas / 434 Media",
        url: "https://434media.com/",
      },
    ],
    sponsor: [
      {
        "@type": "Organization",
        name: "Velocity TX",
      },
      {
        "@type": "Organization",
        name: "Que es SDOH",
      },
      {
        "@type": "Organization",
        name: "Human-IT",
      },
      {
        "@type": "Organization",
        name: "Levantatech",
      },
      {
        "@type": "Organization",
        name: "434 Media",
      },
      {
        "@type": "Organization",
        name: "DevSA",
      },
    ],
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/vanitachristmas.png",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-12-14T00:00:00-06:00",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative">
        {children}
      </div>
    </>
  )
}
