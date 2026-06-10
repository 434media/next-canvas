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
import { BotIdClient } from "botid/client"
import { Suspense } from "react"

// API routes protected by Vercel BotID. The client component below injects
// the BotID fingerprint script and registers these paths so the client knows
// to attach a verification token on submission. Without this, every server
// `checkBotId()` call returns isBot=true and the form is rejected.
const PROTECTED_ROUTES = [
  { path: "/api/lead-with-ops/register", method: "POST" },
  { path: "/api/newsletter", method: "POST" },
  { path: "/api/sponsor-inquiry", method: "POST" },
]

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

const TAGLINE = "San Antonio · Builder Program"
const DESCRIPTION =
  "Digital Canvas is a San Antonio builder program connecting AI-native talent to industry pain points — and the capital that funds them. Free workshops, a six-week build bridge, and demo day to an accredited investor audience. Powered by DevSA and 434 Media."

export const metadata: Metadata = {
  title: {
    default: `Digital Canvas | ${TAGLINE}`,
    template: "%s | Digital Canvas",
  },
  description: DESCRIPTION,
  keywords:
    "Digital Canvas, San Antonio builder program, AI cohort, demo day, prompt to production, DevSA, 434 Media, AI workshops, builder community, accredited investor network",
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
        url: '/api/og/home',
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
    images: ['/api/og/home'],
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
              "@type": "WebSite",
              name: "Digital Canvas",
              alternateName: "Digital Canvas Community",
              url: siteUrl,
              description: DESCRIPTION,
              publisher: {
                "@type": "Organization",
                name: "434 Media",
                url: "https://434media.com/",
              },
              inLanguage: "en-US",
            }),
          }}
        />
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
                "AI Builder Program",
                "AI Cohort Programs",
                "Demo Day Production",
                "Prompt to Production",
                "AI Workshops",
                "San Antonio Tech Ecosystem",
                "Community Building",
                "Underwriter Sponsorship",
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

        {/* Vercel BotID client — registers protected API routes so form
            submissions carry a fingerprint that satisfies checkBotId() on
            the server. Renders no UI. */}
        <BotIdClient protect={PROTECTED_ROUTES} />

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
