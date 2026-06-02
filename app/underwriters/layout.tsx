import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalcanvas.community"

export const metadata: Metadata = {
  title: "For Underwriters | Digital Canvas",
  description:
    "Underwrite a Digital Canvas cohort. Own the vertical. Author the painpoints. Source talent from a curated builder pipeline in front of an accredited investor audience.",
  keywords:
    "Digital Canvas underwriter, cohort sponsorship, San Antonio vertical, AI talent pipeline, corporate sponsorship, DevSA, 434 Media, accredited investor network",
  alternates: {
    canonical: "/underwriters",
  },
  openGraph: {
    title: "For Underwriters | Digital Canvas",
    description:
      "Own a vertical. Source talent. Solve real pain points. Underwrite a cohort and get first-look access to builders solving real problems in your industry.",
    url: `${siteUrl}/underwriters`,
    siteName: "Digital Canvas",
    images: [
      {
        url: "/api/og/underwriters",
        width: 1200,
        height: 630,
        alt: "Digital Canvas — For Underwriters",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Underwriters | Digital Canvas",
    description:
      "Own a vertical. Source talent. Solve real pain points. Underwrite a cohort and get first-look access to builders solving real problems in your industry.",
    images: ["/api/og/underwriters"],
    creator: "@434media",
    site: "@434media",
  },
}

export default function UnderwritersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
