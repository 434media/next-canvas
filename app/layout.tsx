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

const TAGLINE = "Stories. Transactions. Loops."
const DESCRIPTION =
  "Digital Canvas is for operators and product teams shipping intentional digital products — and the autonomous workflows behind them. Design, workflows, and agents built with Claude, MCP, and small composable tools."

export const metadata: Metadata = {
  title: {
    default: `Digital Canvas | ${TAGLINE}`,
    template: "%s | Digital Canvas",
  },
  description: DESCRIPTION,
  keywords:
    "Digital Canvas, autonomous workflows, AI agents, Claude, MCP, design engineering, consulting, workshops, San Antonio, 434 Media, DevSA",
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
    title: `Digital Canvas | ${TAGLINE}`,
    description: DESCRIPTION,
    url: siteUrl,
    siteName: "Digital Canvas",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `Digital Canvas — ${TAGLINE}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Digital Canvas | ${TAGLINE}`,
    description: DESCRIPTION,
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
              description: DESCRIPTION,
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
                "Autonomous Workflows",
                "AI Agents",
                "Claude",
                "Model Context Protocol",
                "Design Engineering",
                "Editorial Typography",
                "Workshops",
                "AI Consultancy",
                "Event Production",
                "Community Building",
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
