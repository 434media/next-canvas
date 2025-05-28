import HeroSection from "./components/hero-section"
import CreativeJourney from "./components/creative-journey"

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-neutral-900 relative overflow-hidden">
        <HeroSection />
        <CreativeJourney />
      </main>
    </>
  )
}
