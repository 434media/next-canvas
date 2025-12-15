import type { Metadata } from "next"
import VanitaLeoClient from "./vanitaleo-client"

export const metadata: Metadata = {
  title: "Vanita Leo Christmas Laptop Giveaway | Closing the Digital Divide",
  description:
    "Join us December 19th at Velocity TX for a special Christmas laptop giveaway. 50 free Chromebooks for women in underserved communities. Featuring Vanita Leo.",
  openGraph: {
    title: "Vanita Leo Christmas Laptop Giveaway",
    description: "50 free Chromebooks for women in underserved communities. December 19th, 9AM-12PM at Velocity TX.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanita Leo Christmas Laptop Giveaway",
    description: "50 free Chromebooks for women in underserved communities. December 19th, 9AM-12PM at Velocity TX.",
  },
}

export default function VanitaLeoPage() {
  return <VanitaLeoClient />
}
