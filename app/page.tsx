"use client"

import MissionStatement from "../components/mission-statement"
import DigitalCanvasNetwork from "../components/digital-canvas-network"
import AnimatedLanding from "../components/animated-landing"
import TrustedBy from "../components/trusted-by"

export default function Home() {
  return (
    <>
      <MissionStatement />
      <TrustedBy />
      <DigitalCanvasNetwork />
      <AnimatedLanding />
    </>
  )
}
