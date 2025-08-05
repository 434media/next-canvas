import AnimatedLanding from "./components/animated-landing"
import HeroSection from "./components/hero-section"
import DigitalCanvasNetwork from "./components/digital-canvas-network"
import MissionStatement from "./components/mission-statement"
import CallToAction from "./components/call-to-action"
import Footer from "./components/footer"
import Methodist from "./components/methodist"
import ClientStart from "./components/client-start"

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 relative overflow-hidden">

      {/* Animated Landing - First thing users see */}
      <AnimatedLanding />


      {/* <HeroSection /> */}
      <DigitalCanvasNetwork />
      <MissionStatement />

      {/* Animated Landing - First thing users see */}
      {/* <AnimatedLanding /> */}
      
      <CallToAction />
      <Footer />
    </main>
  )
}
