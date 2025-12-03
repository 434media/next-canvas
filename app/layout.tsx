import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

const mendaBlack = localFont({
  src: "../fonts/Menda-Black.otf",
  variable: "--font-menda-black",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "Digital Canvas | The Creative Layer of 434 MEDIA",
  description:
    "Digital Canvas connects our IP & client work, showcasing the stories, brands, & campaigns shaping the 434 network. From innovative properties to transformative partnerships.",
  keywords:
    "434 MEDIA, creative layer, digital canvas, IP properties, client partnerships, creative network, San Antonio",
  authors: [{ name: "434 MEDIA Team" }],
  creator: "434 MEDIA Team",
  publisher: "434 MEDIA",
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
    title: "Digital Canvas | The Creative Layer of 434 MEDIA",
    description:
      "Digital Canvas connects our IP & client work, showcasing the stories, brands, & campaigns shaping the 434 network.",
    url: siteUrl,
    siteName: "Digital Canvas",
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'Digital Canvas - The Creative Layer of 434 MEDIA',
        type: 'image/png',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Canvas | The Creative Layer of 434 MEDIA",
    description:
      "Digital Canvas connects our IP & client work, showcasing the stories, brands, & campaigns shaping the 434 network.",
    images: [`${siteUrl}/opengraph-image.png`],
    creator: '@434media',
    site: '@434media',
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
              alternateName: "434 MEDIA Digital Canvas",
              description:
                "Digital Canvas connects our IP & client work, showcasing the stories, brands, & campaigns shaping the 434 network. From innovative properties to transformative partnerships.",
              url: "https://digitalcanvas.community",
              logo: "https://devsa-assets.s3.us-east-2.amazonaws.com/digital-canvas-ymas.svg",
              foundingDate: "2020",
              parentOrganization: {
                "@type": "Organization",
                name: "434 MEDIA",
              },
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
                "https://twitter.com/434media",
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
        className={`${geistSans.variable} ${geistMono.variable} ${mendaBlack.variable} min-h-screen overflow-x-hidden scroll-auto bg-white antialiased selection:bg-sky-100 selection:text-sky-600`}
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
