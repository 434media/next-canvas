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
    id: "introducing",
    name: "ACTIONS SPEAK LOUDER",
    tagline: "Introducing the Digital Canvas Network",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/dc-poster-2.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/DC_V01_no_color.MOV",
    mediaType: "video",
    website: { url: "434media.com", show: true },
  },
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
    id: "txmx-boxing",
    name: "FOUNDERS TEE",
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
        <div className="grid grid-cols-2 gap-8 lg:gap-16 xl:gap-24 min-h-[30vh] lg:min-h-[50vh] items-center">
          {/* Left Column - H2 and Logo */}
          <motion.div
            className="flex flex-col justify-center space-y-6 md:space-y-8 lg:space-y-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-black tracking-tighter leading-[0.9] md:leading-[0.75]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              WE ARE
            </motion.h2>

            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/digital-canvas-dark.svg"
                alt="Digital Canvas Logo"
                className="h-20 md:h-32 lg:h-40 xl:h-56 w-auto"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Description Text */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-black font-bold leading-tight md:leading-tight lg:leading-tight tracking-tight"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Explore our creative ecosystem of innovative properties and groundbreaking content.
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
