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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://www.digitalcanvas.community' : 'http://localhost:3000'),
  title: "Digital Canvas | The Creative Layer of 434 MEDIA",
  description:
    "Digital Canvas connects our IP & client work, showcasing the stories, brands, & campaigns shaping the 434 network. From innovative properties to transformative partnerships.",
  keywords:
    "434 MEDIA, creative layer, digital canvas, IP properties, client partnerships, creative network, San Antonio",
  authors: [{ name: "434 MEDIA Team" }],
  openGraph: {
    title: "Digital Canvas | The Creative Layer of 434 MEDIA",
    description:
      "Digital Canvas connects our IP & client work, showcasing the stories, brands, & campaigns shaping the 434 network.",
    url: "https://www.digitalcanvas.community",
    siteName: "Digital Canvas",
    images: [
      {
        url: "https://www.digitalcanvas.community/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Canvas - The Creative Layer of 434 MEDIA",
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
    images: ["https://www.digitalcanvas.community/opengraph-image.png"],
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
