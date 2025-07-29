import DigitalCanvasNetwork from "./components/digital-canvas-network"
import MissionStatement from "./components/mission-statement"
import CallToAction from "./components/call-to-action"
import Footer from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 relative overflow-hidden">
      {/* <HeroSection /> */}
      <DigitalCanvasNetwork />
      <MissionStatement />
      <CallToAction />
      <Footer />
    </main>
  )
}
