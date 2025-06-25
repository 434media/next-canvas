import HeroSection from "./components/hero-section"
import DigitalCanvasNetwork from "./components/digital-canvas-network"
import ClientShowcase from "./components/client-showcase"

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 relative overflow-hidden">
      <HeroSection />
      <DigitalCanvasNetwork />
    </main>
  )
}
