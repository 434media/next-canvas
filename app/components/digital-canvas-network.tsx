"use client"

import React, { useState, useLayoutEffect, useRef, createContext, useContext, useCallback } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { WireframeBackground } from "./wireframe-background"
import "remixicon/fonts/remixicon.css"
import DynamicSliderComponent from "./dynamic-slider"

// Define the type for IP properties
interface IPProperty {
  id: string
  name: string
  tagline: string
  image: string
  video: string | null
  mediaType: "image" | "video"
  website: { url: string; show: boolean }
  instagram: { url: string; show: boolean }
  linkedin: { url: string; show: boolean }
  color: string
}

const ipProperties: IPProperty[] = [
  {
    id: "digital-canvas",
    name: "Digital Canvas",
    tagline: "The Creative Layer of 434 MEDIA",
    image: "/DigitalCanvas_pic.png",
    video: null, // No video for this property
    mediaType: "image",
    website: { url: "#", show: true },
    instagram: { url: "#", show: true },
    linkedin: { url: "#", show: true },
    color: "from-purple-500 to-blue-500",
  },
  {
    id: "devsa",
    name: "DEVSA",
    tagline: "Uniting The San Antonio Tech Community",
    image: "/devsa_pic.jpg",
    video: "https://example.com/devsa-video.mp4", // Add your video URL here
    mediaType: "image",
    website: { url: "https://devsanantonio.com", show: true },
    instagram: { url: "https://instagram.com/devsatx", show: true },
    linkedin: { url: "https://linkedin.com/company/devsatx", show: true },
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "ampd",
    name: "The AMPD Project",
    tagline: "Changing The World Through Art",
    image: "/ampd_pic.jpg",
    video: "/ampd_vid.mp4", // Add your video URL here
    mediaType: "video",
    website: { url: "https://ampdproject.com", show: true },
    instagram: { url: "https://instagram.com/ampdproject", show: true },
    linkedin: { url: "https://linkedin.com/company/ampd-project", show: false },
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "vemosvamos",
    name: "Vemos Vamos",
    tagline: "Bilingual Space Helping Others Grow",
    image: "/vemosvamos_pic.png",
    video: '/VemosVamos_vid.mov',
    mediaType: "video",
    website: { url: "https://vemosvamos.com", show: true },
    instagram: { url: "https://instagram.com/vemosvamos", show: true },
    linkedin: { url: "https://linkedin.com/company/vemos-vamos", show: true },
    color: "from-green-500 to-teal-500",
  },
  {
    id: "txmx",
    name: "TXMX Boxing",
    tagline: "Made From BLOOD, SWEAT, and TEARS",
    image: "/TXMX_pic.svg",
    video: "https://example.com/txmx-video.mp4", // Add your video URL here
    mediaType: "video",
    website: { url: "https://www.txmxboxing.com/", show: true },
    instagram: { url: "https://instagram.com/txmxboxing", show: true },
    linkedin: { url: "https://linkedin.com/company/txmx-boxing", show: false },
    color: "from-red-500 to-orange-500",
  },
  {
    id: "salute",
    name: "Salute to Troops",
    tagline: "Promoting Federal And Military Innovation",
    image: "/salute_pic.jpg",
    video: "/salute_vid.mp4", // No video for this property
    mediaType: "video",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/salutetotroops", show: true },
    linkedin: { url: "https://linkedin.com/company/salute-to-troops", show: false },
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "aimsatx",
    name: "AIM Health R&D Summit",
    tagline: "Accelerating Innovation In Military Medicine",
    image: "/aimsatx_pic.jpg",
    video: "/aimsatx_vid.mp4", // Add your video URL here
    mediaType: "video",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/aimsatx", show: true },
    linkedin: { url: "https://linkedin.com/company/aim-satx", show: false },
    color: "from-emerald-500 to-green-500",
  },
]


// Dynamic Slider Section Component
const DynamicSliderSection = () => {
  // Convert IP properties to the format expected by the Dynamic slider
  const dynamicItems = ipProperties.map(item => ({
    id: item.id,
    title: item.name,
    description: item.tagline,
    genre: "Creative Innovation" as const,
    image: item.image,
    backdrop: item.image,
    video: item.video,
    mediaType: item.mediaType,
    website: item.website,
    instagram: item.instagram,
    linkedin: item.linkedin,
    color: item.color
  }))

  return (
    <div className="relative py-0 lg:py-0">
      {/* Section Header */}


      {/* Dynamic Slider */}
      <div className="w-full">
        <DynamicSliderComponent items={dynamicItems} />
      </div>
    </div>
  )
}

const DigitalCanvasNetwork = () => {

  return (
    <section className="relative overflow-hidden" id="network">
      {/* Wireframe Background */}
      <WireframeBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Section Header */}
        <motion.div
        >
        </motion.div>
          
        {/* In-House Properties Section - Now visible without masking */}
        <div className="relative z-0">
          <DynamicSliderSection />
        </div>

      </div>
    </section>
  )
}

export default DigitalCanvasNetwork
