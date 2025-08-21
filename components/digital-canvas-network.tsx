"use client"
import { motion } from "motion/react"
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
}

const ipProperties: IPProperty[] = [
  {
    id: "overdrive",
    name: "OVERDRIVE",
    tagline: "The Creative Layer of 434 MEDIA",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/overdrive-poster.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/OVERDRIVE_1080_v02.MOV",
    mediaType: "video",
    website: { url: "https://434media.com", show: true },
  },
  {
    id: "introducing",
    name: "ACTIONS SPEAK LOUDER",
    tagline: "Introducing the Digital Canvas Network",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/dc-poster-2.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/DC_V01_no_color.MOV",
    mediaType: "video",
    website: { url: "434media.com", show: true },
  },
  {
    id: "txmx-boxing",
    name: "TXMX BOXING",
    tagline: "Levantamos Los Puños",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/shop-poster.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/TXMX+DROP+TEASER.mp4",
    mediaType: "video",
    website: { url: "https://www.txmxboxing.com/", show: true },
  },
  {
    id: "aim2025",
    name: "AIM HEALTH R&D SUMMIT",
    tagline: "Military Medical Innovation",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/mtec-speaker.jpg",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down+Website.mp4",
    mediaType: "video",
    website: { url: "https://aimsatx.com", show: true },
  },
]

// Dynamic Slider Section Component
const DynamicSliderSection = () => {
  // Convert IP properties to the format expected by the Dynamic slider
  const dynamicItems = ipProperties.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.tagline,
    image: item.image,
    backdrop: item.image,
    video: item.video,
    mediaType: item.mediaType,
    website: item.website,
  }))

  return (
    <div className="relative min-h-screen flex flex-col justify-center py-8 md:py-16">
      <motion.div
        className="px-4 md:px-8 lg:px-16 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center items-center min-h-[30vh] lg:min-h-[50vh]">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold leading-tight tracking-tight px-4"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Explore our{" "}
              <span className="text-sky-600 underline decoration-4 underline-offset-8">creative ecosystem</span> of{" "}
              <span className="text-violet-500 bg-purple-100 px-2 py-1 rounded-lg">innovative properties</span> and{" "}
              <span className="text-emerald-500 italic">groundbreaking content</span>.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Dynamic Slider */}
      <div className="flex-1 w-full md:mt-32">
        <DynamicSliderComponent items={dynamicItems} />
      </div>
    </div>
  )
}

const DigitalCanvasNetwork = () => {
  return (
    <section
      className="relative overflow-hidden min-h-screen bg-white"
      id="network"
      aria-label="Digital Canvas Network showcase"
    >
      {/* Main Content */}
      <div className="relative z-10 h-full">
        {/* In-House Properties Section - Netflix-style full height */}
        <div className="relative z-0 h-full">
          <DynamicSliderSection />
        </div>
      </div>
    </section>
  )
}

export default DigitalCanvasNetwork
