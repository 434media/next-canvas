"use client"

import AnimatedLanding from "./components/animated-landing"
import HeroSection from "./components/hero-section"
import DigitalCanvasNetwork from "./components/digital-canvas-network"
import MissionStatement from "./components/mission-statement"
import CallToAction from "./components/call-to-action"
import Footer from "./components/footer"
import Methodist from "./components/methodist"
import { useScrollTriggerHeight } from './hooks/useScrollTriggerHeight'

export default function Home() {
  const missionHeight = useScrollTriggerHeight({
    triggerId: "mission-statement-trigger",
    endValue: "+=3680",
    fallbackHeight: "400vh"
  })

  const animatedLandingHeight = useScrollTriggerHeight({
    triggerId: "animated-landing",
    endValue: "+=2800",
    fallbackHeight: "420vh"
  })

  return (
    <main className="min-h-screen bg-neutral-900 relative overflow-hidden">

      {/* <HeroSection /> */}
      <DigitalCanvasNetwork />

      <section className={`relative z-10`} style={{ height: missionHeight }}>
        <MissionStatement />
      </section>

      <section className={`relative z-10`} style={{ height: animatedLandingHeight }}>
        <AnimatedLanding />
      </section>
      
      <CallToAction />
      <Footer />
    </main>
  )
}
