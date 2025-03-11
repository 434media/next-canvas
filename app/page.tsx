import HeroSection from "./components/hero-section"
import GridSection from "./components/grid-section"
import FeaturesGrid from "./components/features-grid"

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-neutral-900 relative overflow-hidden">
        <HeroSection />
        <GridSection />
        <FeaturesGrid />
      </main>
    </>
  )
}
