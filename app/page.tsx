"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/hero"
import { SanAntonioSection } from "./components/scroll-sections/SanAntonioSection"
import { SocialSection } from "./components/scroll-sections/SocialSection"
import { EventsSection } from "./components/scroll-sections/EventsSection"
import { PartnersSection } from "./components/scroll-sections/PartnersSection"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const logoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.5])
  const heroBlur = useTransform(scrollYProgress, [0, 0.1], [0, 5])

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarVisible(window.scrollY > window.innerHeight * 0.1)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar isVisible={isNavbarVisible} logoScale={logoScale} />
      <motion.div style={{ filter: useTransform(heroBlur, (value) => `blur(${value}px)`) }}>
        <Hero />
      </motion.div>
      <SanAntonioSection />
      <SocialSection />
      <EventsSection />
      <PartnersSection />
    </main>
  )
}

