import type React from "react"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "MXR @MAIN | Thank You - Holiday Party by 434 Media",
  description:
    "Thank you to everyone who joined us for MXR @MAIN on December 12, 2025. It was an incredible evening of connection, celebration, and community at 300 Main Rooftop.",
  keywords: [
    "MXR at Main",
    "434 Media",
    "Digital Canvas",
    "holiday party",
    "300 Main",
    "community event",
  ],
  authors: [{ name: "434 Media" }],
  creator: "Digital Canvas",
  publisher: "434 Media",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/events/mxratmain",
  },
  openGraph: {
    title: "MXR @MAIN | Thank You - Holiday Party by 434 Media",
    description:
      "Thank you to everyone who joined us for MXR @MAIN on December 12, 2025. It was an incredible evening of connection, celebration, and community.",
    url: `${siteUrl}/events/mxratmain`,
    siteName: "MXR @MAIN",
    images: [
      {
        url: '/events/mxratmain/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'MXR @MAIN - Holiday Party by 434 Media',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MXR @MAIN | Thank You - Holiday Party by 434 Media",
    description:
      "Thank you to everyone who joined us for MXR @MAIN on December 12, 2025. It was an incredible evening of connection, celebration, and community.",
    images: ['/events/mxratmain/opengraph-image.png'],
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

export default function MxratmainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "MXR @MAIN | Holiday Party by 434 MEDIA",
    description:
      "A holiday party for molecules & musicians, scientists & screwups, techies & teachers, founders & funders, gamers & grunts. If you belong to something, you belong. Dec 12, 2025 at 300 Main Rooftop, San Antonio, TX.",
    startDate: "2025-12-12T13:00:00-06:00",
    endDate: "2025-12-12T18:00:00-06:00",
    eventStatus: "https://schema.org/EventCancelled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "300 Main Rooftop",
      address: {
        "@type": "PostalAddress",
        streetAddress: "300 N Main Ave",
        addressLocality: "San Antonio",
        addressRegion: "TX",
        postalCode: "78205",
        addressCountry: "US",
      },
    },
    organizer: [
      {
        "@type": "Organization",
        name: "Digital Canvas / 434 Media",
        url: "https://434media.com/",
      },
      {
        "@type": "Organization",
        name: "Vemos Vamos",
        url: "https://vemosvamos.com/",
      },
      {
        "@type": "Organization",
        name: "DEVSA",
        url: "https://devsa.community/",
      },
    ],
    sponsor: [
      {
        "@type": "Organization",
        name: "434 Media",
        url: "https://434media.com/",
      },
    ],
    image: "/events/mxratmain/opengraph-image.png",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
