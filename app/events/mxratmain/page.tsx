import type { Metadata } from "next"
import MxratmainClient from "@/components/mxratmain/mxratmain-client"

export const metadata: Metadata = {
  title: "MXR @MAIN | Holiday Party by 434 Media",
  description:
    "A holiday party for molecules & musicians, scientists & screwups, techies & teachers, founders & funders, gamers & grunts. If you belong to something, you belong. Dec 12, 2025 at 300 Main Rooftop.",
  keywords: [
    "MXR at Main",
    "434 Media",
    "Digital Canvas",
    "holiday party",
    "300 Main Rooftop",
    "community event",
  ],
  authors: [{ name: "434 Media" }],
  creator: "Digital Canvas",
  publisher: "434 Media",
  openGraph: {
    title: "MXR @MAIN | Holiday Party",
    description:
      "A holiday party for molecules & musicians, scientists & screwups, techies & teachers, founders & funders, gamers & grunts. If you belong to something, you belong.",
    type: "website",
    locale: "en_US",
    siteName: "Digital Canvas",
    url: "https://digitalcanvas.community/events/mxratmain",
  },
  twitter: {
    card: "summary_large_image",
    title: "MXR @MAIN | Holiday Party by 434 Media",
    description:
      "A holiday party for molecules & musicians, scientists & screwups, techies & teachers, founders & funders, gamers & grunts.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://digitalcanvas.community/events/mxratmain",
  },
}

export default function MxratmainPage() {
  return <MxratmainClient />
}
