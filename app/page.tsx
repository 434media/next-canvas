import HeroSection from "./components/hero-section"
import GridSection from "./components/grid-section"
import FeaturesGrid from "./components/features-grid"
import Navbar from "./components/Navbar"
import Footer from "./components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-900 relative overflow-hidden">
        <HeroSection />
        <GridSection />
        <FeaturesGrid />
      </main>
      <Footer />
    </>
  )
}
