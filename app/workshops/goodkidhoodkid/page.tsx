"use client"

import { useState, useEffect } from "react"
import { MixtapeToggle } from "../../../components/workshop/mixtape-toggle"
import { HeroSection } from "../../../components/workshop/hero-section"
import { LighthouseSection } from "../../../components/workshop/lighthouse-section"
import { PillarsSection } from "../../../components/workshop/pillars-section"
import { ContactSection } from "../../../components/workshop/contact-section"
import { PaymentSection } from "../../../components/workshop/payment-section"
import "./workshop.css"

export default function GoodKidHoodKidWorkshop() {
  const [theme, setTheme] = useState<"good" | "hood">("good")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleMenuEvent = (e: CustomEvent) => {
      setIsMenuOpen(e.detail.isOpen)
    }
    window.addEventListener("navbar-menu-toggle", handleMenuEvent as EventListener)
    return () => window.removeEventListener("navbar-menu-toggle", handleMenuEvent as EventListener)
  }, [])

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme((prev) => (prev === "good" ? "hood" : "good"))
      return
    }
    document.startViewTransition(() => {
      setTheme((prev) => (prev === "good" ? "hood" : "good"))
    })
  }

  const isDark = theme === "hood"

  return (
    <>
      {/* Fixed Theme Toggle - Top Right */}
      <div className="fixed top-24 right-6 z-[100]">
        <MixtapeToggle theme={theme} onToggle={toggleTheme} isMenuOpen={isMenuOpen} />
      </div>
      {/* Main Content with theme transitions */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isDark ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-white text-[#1a1a1a]"
        }`}
        style={{ viewTransitionName: "root" }}
      >
        {/* Canvas texture for Hood Kid mode */}
        {isDark && <div className="canvas-texture pointer-events-none fixed inset-0 z-0 opacity-30" />}
        <main className="relative z-10">
          <HeroSection theme={theme} />
          <LighthouseSection theme={theme} />
          <PillarsSection theme={theme} />
          <ContactSection theme={theme} />
          <PaymentSection theme={theme} />
        </main>
      </div>
    </>
  )
}
