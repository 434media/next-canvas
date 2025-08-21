"use client"

import MissionStatement from "../components/mission-statement"
import DigitalCanvasNetwork from "../components/digital-canvas-network"
import AnimatedLanding from "../components/animated-landing"
import TrustedBy from "@/components/trusted-by"

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white relative overflow-hidden">
        <section className="">
          <MissionStatement />
        </section>
        
        <TrustedBy />
        <DigitalCanvasNetwork />

        <section className="">
          <AnimatedLanding />
        </section>
      </main>
    </>
  )
}
