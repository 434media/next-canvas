"use client"

import MissionStatement from "../components/mission-statement"
import DigitalCanvasNetwork from "../components/digital-canvas-network"
import AnimatedLanding from "../components/animated-landing"
import { useScrollTriggerHeight } from "../hooks/useScrollTriggerHeight"
import LoadingPage from "../components/loading-page"

export default function Home() {
  const missionHeight = useScrollTriggerHeight({
    triggerId: "mission-statement-trigger",
    endValue: "+=3680",
    fallbackHeight: "400vh",
  })

  const animatedLandingHeight = useScrollTriggerHeight({
    triggerId: "animated-landing",
    endValue: "+=2800",
    fallbackHeight: "380vh",
  })

  return (
    <>
      <LoadingPage />
      <main className="min-h-screen bg-white relative overflow-hidden">
        <section className={`relative z-10`} style={{ height: missionHeight }}>
          <MissionStatement />
        </section>

        <DigitalCanvasNetwork />

        <section className={`relative z-10`} style={{ height: animatedLandingHeight }}>
          <AnimatedLanding />
        </section>
      </main>
    </>
  )
}
