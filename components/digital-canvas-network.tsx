"use client"
import DynamicSliderComponent from "./dynamic-slider"
import { motion } from "motion/react"

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
    tagline: "In a world where music is outlawed, one rebel plugs in.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/overdrive-poster.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/OVERDRIVE_1080_v02.MOV",
    mediaType: "video",
    website: { url: "https://434media.com", show: true },
  },
  {
    id: "learn2ai",
    name: "LEARN 2 AI",
    tagline: "What if San Antonio could be the most AI-literate city?",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/learn2ai-poster.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/Learn2AI+-+081825+G.mp4",
    mediaType: "video",
    website: { url: "https://www.linkedin.com/company/learn2ai/", show: true },
  },
  {
    id: "vemos-vamos",
    name: "VEMOS VAMOS",
    tagline: "Bicultural Media for a new generation.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/vemos-vamos/Pitch+Deck.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/Alejandro+Ferna%CC%81ndez+Concert+.mov",
    mediaType: "video",
    website: { url: "https://www.vemosvamos.com/", show: true },
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
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/recap-poster-group",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down+Website.mp4",
    mediaType: "video",
    website: { url: "https://aimsatx.com", show: true },
  },
  {
    id: "alamo-angels",
    name: "ALAMO ANGELS",
    tagline: "Empowering Innovation and Economic Growth",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/angels-poster.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/Alamo+Angels+-+Trailer+01+1080p.mp4",
    mediaType: "video",
    website: { url: "https://www.alamoangels.com/", show: true },
  },
  {
    id: "mhm",
    name: "Methodist Healthcare Ministries",
    tagline: "South Texas Community Health Accelerator",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/sdoh-poster.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/Start+Up+Week+Post+Promo+WEB.mp4",
    mediaType: "video",
    website: { url: "https://www.434media.com/sdoh", show: true },
  },
  {
    id: "milcityusa",
    name: "MILCITY USA",
    tagline: "Celebrating Military Innovation and Entrepreneurialism",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/recap+poster.png",
    video: "https://ampd-asset.s3.us-east-2.amazonaws.com/MilCity.mp4",
    mediaType: "video",
    website: { url: "https://www.salutetotroops.com/", show: true },
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
    <div className="relative min-h-screen flex flex-col justify-center py-0 md:py-16">
      {/* Dynamic Slider */}
      <div className="flex-1 w-full">
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
        <motion.div
          className="text-center max-w-6xl mx-auto mb-10 md:mb-20 pt-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-4xl lg:text-5xl xl:text-6xl text-black leading-tight tracking-tight">
            Explore our <span className="font-bold">creative ecosystem</span> of{" "}
            <span className="font-semibold">innovative properties</span> and{" "}
            <span className="font-light italic">groundbreaking content</span>.
          </p>
        </motion.div>

        {/* In-House Properties Section - Netflix-style full height */}
        <div className="relative z-0 h-full">
          <DynamicSliderSection />
        </div>
      </div>
    </section>
  )
}

export default DigitalCanvasNetwork
