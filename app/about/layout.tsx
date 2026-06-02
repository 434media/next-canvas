import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "About | Digital Canvas",
  description:
    "Led by Marcos Resendez. Operated by DevSA and 434 Media with an accredited investor network as the third pillar. Digital Canvas connects San Antonio's AI-native talent to industry pain points — and the capital that funds them.",
  keywords:
    "Digital Canvas about, Marcos Resendez, San Antonio builder program founder, DevSA, 434 Media, partner program, 434 Media CEO, angel investor",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Digital Canvas",
    description:
      "Led by Marcos Resendez. Operated by DevSA and 434 Media with an accredited investor network as the third pillar. A San Antonio builder program connecting AI-native talent to industry pain points.",
    url: `${siteUrl}/about`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/about",
        width: 1200,
        height: 630,
        alt: "About Digital Canvas — Built in San Antonio by the partners who run the ecosystem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Digital Canvas",
    description:
      "Led by Marcos Resendez. Operated by DevSA and 434 Media with an accredited investor network as the third pillar. A San Antonio builder program connecting AI-native talent to industry pain points.",
    images: ["/api/og/about"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sanAntonioLocation = {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Antonio",
      addressRegion: "TX",
      addressCountry: "US",
    },
  }

  const marcosJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcos Resendez",
    jobTitle: "Founder & CEO, 434 Media · CEO, The AMPD Project · Co-Founder, Digital Canvas",
    description:
      "Producer, promoter, connector with 20+ years across media, telecommunications, and live event production. Founder & CEO of 434 Media, CEO of The AMPD Project (the arts pathway program for socially disadvantaged San Antonio youth), angel investor, and co-founder of Digital Canvas.",
    worksFor: [
      {
        "@type": "Organization",
        name: "434 Media",
        url: "https://434media.com/",
      },
      {
        "@type": "Organization",
        name: "The AMPD Project",
      },
      {
        "@type": "Organization",
        name: "Digital Canvas",
        url: siteUrl,
      },
    ],
    knowsAbout: [
      "Media & Entertainment",
      "Telecommunications",
      "Brand & Channel Building",
      "Live Event Marketing & Production",
      "Business Development",
      "Angel Investing",
    ],
    url: `${siteUrl}/about`,
    sameAs: ["https://www.linkedin.com/in/marcosresendez/"],
    homeLocation: sanAntonioLocation,
  }

  const jesseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jesse Hernandez",
    jobTitle: "Founder, DEVSA · Full-Stack Engineer, 434 Media · Co-Founder, Digital Canvas",
    description:
      "Founder of DEVSA, full-stack engineer at 434 Media, and co-founder of Digital Canvas. Builds custom browser experiences and API-backed workflows that bridge creative strategy and shipped code.",
    worksFor: [
      {
        "@type": "Organization",
        name: "434 Media",
        url: "https://434media.com/",
      },
      {
        "@type": "Organization",
        name: "Digital Canvas",
        url: siteUrl,
      },
      {
        "@type": "Organization",
        name: "DEVSA",
        url: "https://www.devsa.community/",
      },
    ],
    url: `${siteUrl}/about`,
    sameAs: ["https://www.linkedin.com/in/jessebubble/"],
    homeLocation: sanAntonioLocation,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Digital Canvas",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}/about`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marcosJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jesseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
