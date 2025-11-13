import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Lighthouse Workshop | Hood Kid Good Kid",
  description:
    "Transform your team with Hood Kid | Good Kid's flagship Lighthouse Workshop. Learn how street-level instinct translates to C-suite strategy. Earned, Not Given.",
  keywords:
    "leadership workshop, business transformation, Hood Kid Good Kid, The Lighthouse Workshop, modern leadership, Learn Earn Return",
  openGraph: {
    title: "The Lighthouse Workshop | Hood Kid Good Kid",
    description: "Transform your team with our flagship workshop blending lived experience with leadership principles.",
    type: "website",
  },
}

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
