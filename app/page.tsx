"use client"

import { useState, useEffect } from "react"
import MissionStatement from "../components/mission-statement"
import DigitalCanvasNetwork from "../components/digital-canvas-network"
import AnimatedLanding from "../components/animated-landing"
import TrustedBy from "../components/trusted-by"
import PaintNewsletter from "../components/paint-newsletter"

export default function Home() {
  const [showNewsletter, setShowNewsletter] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletter(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <MissionStatement />

      <div className="xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <TrustedBy />
          <DigitalCanvasNetwork />
          <AnimatedLanding />
        </div>
      </div>

      <PaintNewsletter isOpen={showNewsletter} onClose={() => setShowNewsletter(false)} />
    </div>
  )
}
