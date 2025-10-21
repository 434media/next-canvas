"use client"

import { useState, useEffect } from "react"
import MissionStatement from "../components/mission-statement"
import DigitalCanvasNetwork from "../components/digital-canvas-network"
import AnimatedLanding from "../components/animated-landing"
import NewsletterPopup from "../components/newsletter-popup"

export default function Home() {
   const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("aim2026-popup-shown")

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
    sessionStorage.setItem("aim2026-popup-shown", "true")
  }

  return (
    <div>
      <MissionStatement />

      <div className="xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <DigitalCanvasNetwork />
          <AnimatedLanding />
        </div>
      </div>

      <NewsletterPopup showModal={showPopup} onClose={handleClosePopup} />
    </div>
  )
}
