import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { GeistPixelSquare, GeistPixelGrid, GeistPixelCircle, GeistPixelTriangle, GeistPixelLine } from "geist/font/pixel"
import { Dancing_Script } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const mendaBlack = localFont({
  src: "../fonts/Menda-Black.otf",
  variable: "--font-menda-black",
  display: "swap",
})

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: {
    default: "Digital Canvas | Powered by 434 MEDIA x DEVSA",
    template: "%s | Digital Canvas",
  },
  description:
    "Powered by 434 MEDIA x DEVSA, Digital Canvas designs and produces conferences, workshops, and AI-driven experiences that help organizations connect creativity, community, and technology — at scale.",
  keywords:
    "Digital Canvas, San Antonio, tech conferences, workshops, AI agents, creative technology, community, storytelling, 434 MEDIA, DEVSA",
  authors: [{ name: "Digital Canvas" }],
  creator: "Digital Canvas",
  publisher: "Digital Canvas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Digital Canvas | Powered by 434 MEDIA x DEVSA",
    description:
      "Powered by 434 MEDIA x DEVSA, Digital Canvas designs and produces conferences, workshops, and AI-driven experiences that help organizations connect creativity, community, and technology — at scale.",
    url: siteUrl,
    siteName: "Digital Canvas",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Canvas - Powered by 434 MEDIA x DEVSA, Digital Canvas designs and produces conferences, workshops, and AI-driven experiences that help organizations connect creativity, community, and technology — at scale.',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Canvas | Powered by 434 MEDIA x DEVSA",
    description:
      "Powered by 434 MEDIA x DEVSA, Digital Canvas designs and produces conferences, workshops, and AI-driven experiences that help organizations connect creativity, community, and technology — at scale.",
    images: ['/opengraph-image.png'],
    creator: '@devsatx',
    site: '@devsatx',
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
    verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Digital Canvas",
              alternateName: "Digital Canvas Community",
              description:
                "Powered by DEVSA x 434 Media, Digital Canvas designs and produces conferences, workshops, and AI-driven experiences that help organizations connect creativity, community, and technology — at scale.",
              url: siteUrl,
              logo: "https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg",
              foundingDate: "2020",
              areaServed: {
                "@type": "City",
                name: "San Antonio",
                addressRegion: "TX",
                addressCountry: "US",
              },
              knowsAbout: [
                "Creative Development",
                "Brand Strategy",
                "Digital Marketing",
                "Content Creation",
                "IP Development",
                "Event Production",
                "Community Building",
                "Media Production",
                "Creative Technology",
                "Partnership Development",
              ],
              sameAs: [
                "https://twitter.com/devsatx",
                "https://linkedin.com/company/434media",
                "https://instagram.com/digitalcanvashq",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Community Support",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable} ${mendaBlack.variable} ${dancingScript.variable} min-h-screen overflow-x-hidden scroll-auto bg-white antialiased selection:bg-sky-100 selection:text-sky-600`}
      >
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-NY5R12BN23" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NY5R12BN23');
          `}
        </Script>

        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>

        <Analytics />
      </body>
    </html>
  )
}
