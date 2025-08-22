"use client"
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
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/recap-poster-group",
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
        {/* In-House Properties Section - Netflix-style full height */}
        <div className="relative z-0 h-full">
          <DynamicSliderSection />
        </div>
      </div>
    </section>
  )
}

export default DigitalCanvasNetwork
