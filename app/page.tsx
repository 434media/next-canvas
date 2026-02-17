"use client"

import { useState, useEffect } from "react"

import ConferencePopup from "../components/conference-popup"
import DigitalCanvasParticles from "../components/hero-particles"

export default function Home() {
   const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("mhth2026-popup-shown")

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
    sessionStorage.setItem("mhth2026-popup-shown", "true")
  }

  return (
    <div>
      <DigitalCanvasParticles />

      <ConferencePopup showModal={showPopup} onClose={handleClosePopup} />
    </div>
  )
}
