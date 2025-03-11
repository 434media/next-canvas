import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Canvas | San Antonio's Creative Tech Community",
  description: "Connect with fellow designers, developers, photographers, videographers, and digital artists in San Antonio's vibrant creative tech community.",
  keywords: "creative tech, San Antonio, coworking, community, design, development, photography, videography",
  authors: [{ name: "Digital Canvas Team" }],
  openGraph: {
    title: "Digital Canvas | San Antonio's Creative Tech Community",
    description: "Connect with fellow creatives in San Antonio's vibrant tech community.",
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
    description: "Connect with fellow creatives in San Antonio's vibrant tech community.",
    images: ["https://digitalcanvas.community/opengraph-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} min-h-screen overflow-x-hidden scroll-auto bg-gray-50 antialiased selection:bg-sky-100 selection:text-sky-600`}
        >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
