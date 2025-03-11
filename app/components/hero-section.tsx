import { WireframeBackground } from "./wireframe-background"
import { HeroText } from "./hero-text"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center mt-6 md:mt-16">
      <WireframeBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroText />
      </div>
      {/* Wireframe grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </section>
  )
}

export default HeroSection

