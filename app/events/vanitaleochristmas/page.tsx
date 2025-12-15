import type { Metadata } from "next"
import VanitaLeoClient from "./vanitaleo-client"

export const metadata: Metadata = {
  title: "Vanita Leo Christmas Laptop Giveaway | Closing the Digital Divide",
  description:
    "Equipping aspiring women in technology from historically under-resourced San Antonio neighborhoods with critical tools for success.",
  openGraph: {
    title: "Vanita Leo Christmas Laptop Giveaway",
    description: "Equipping aspiring women in technology from historically under-resourced San Antonio neighborhoods with critical tools for success.",
    type: "website",
    images: ['/events/vanitaleochristmas/opengraph-image.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanita Leo Christmas Laptop Giveaway",
    description: "Equipping aspiring women in technology from historically under-resourced San Antonio neighborhoods with critical tools for success.",
    images: ['/events/vanitaleochristmas/opengraph-image.png'],
  },
}

export default function VanitaLeoPage() {
  return <VanitaLeoClient />
}
