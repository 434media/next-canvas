import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/footer"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

/* const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}) */

export const metadata: Metadata = {
  title: "Digital Canvas | San Antonio's Creative Tech Community",
  description:
    "Connect with fellow creators, share your projects, and dive into the dynamic intersection of art, tech, and music in San Antonio.",
  keywords: "creative tech, San Antonio, coworking, community, design, development, photography, videography",
  authors: [{ name: "Digital Canvas Team" }],
  openGraph: {
    title: "Digital Canvas | San Antonio's Creative Tech Community",
    description:
      "Connect with fellow creators, share your projects, and dive into the dynamic intersection of art, tech, and music in San Antonio.",
    url: "https://digitalcanvas.community",
    siteName: "Digital Canvas",
    images: [
      {
        url: "https://digitalcanvas.community/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Canvas - Where Creativity Meets Technology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Canvas | San Antonio's Creative Tech Community",
    description:
      "Connect with fellow creators, share your projects, and dive into the dynamic intersection of art, tech, and music in San Antonio.",
    images: ["https://digitalcanvas.community/opengraph-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-sky-100 selection:text-sky-600`}
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

        <Navbar />
        {children}
        <Footer />

        <Analytics />
      </body>
    </html>
  )
}
