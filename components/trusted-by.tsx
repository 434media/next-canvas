"use client"
import { motion } from "motion/react"
import { useState } from "react"
import { Vortex } from "./vortex"

const trustedByIcons = [
  {
    name: "VelocityTX",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/Sponsor+Logos/VelocityTX+Logo+MAIN+RGB+(1).png",
    website: "https://velocitytx.org/",
  },
  {
    name: "Alt Bionics",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/altbionics.png",
    website: "https://www.altbionics.com/",
  },
  {
    name: "The Health Cell",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/healthcell.png",
    website: "https://thehealthcell.org/",
  },
  {
    name: "Mission Road Ministries",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/missionroad.svg",
    website: "https://www.missionroadministries.org/",
  },
  {
    name: "Univision",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/univision-logo.svg",
    website: "https://www.univision.com/",
  },
  {
    name: "Methodist Healthcare Ministries",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/mhm.png",
    website: "https://www.mhm.org/",
  },
  {
    name: "Akshar Staffing",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/vemos-vamos/Akshar-Staffing.png",
    website: "https://www.aksharstaffing.com/",
  },
  {
    name: "Alamo Angels",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/angels.png",
    website: "https://alamoangels.com/",
  },
  {
    name: "Tech Bloc",
    iconFile: "https://ampd-asset.s3.us-east-2.amazonaws.com/healthcell-2-techbloc.png",
    website: "https://satechbloc.com/",
  },
]

const TrustedBy = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleIconClick = (website: string) => {
    window.open(website, "_blank", "noopener,noreferrer")
  }

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32" id="trusted-by">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Text */}
        <motion.div
          className="text-center max-w-6xl mx-auto mb-10 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-2xl md:text-5xl lg:text-7xl xl:text-7xl text-black font-bold leading-tight tracking-tighter"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Explore our{" "}
            <span className="text-sky-400 md:underline decoration-4 underline-offset-8">creative ecosystem</span> of{" "}
            <span className="text-rose-500 md:text-white md:bg-rose-500 px-2 py-1 rounded-lg">
              innovative properties
            </span>{" "}
            and <span className="text-lime-500 italic">groundbreaking content</span>.
          </motion.p>
        </motion.div>

        {/* Trusted By Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black mb-4">Trusted by.</h2>
        </motion.div>

        {/* Icon Grid */}
        <motion.div
          className="grid grid-cols-3 border border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {trustedByIcons.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleIconClick(item.website)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex items-center justify-center p-8 md:p-12 lg:p-16 border-r border-b border-gray-200 [&:nth-child(3n)]:border-r-0 transition-colors duration-300 group min-h-[160px] md:min-h-[200px] lg:min-h-[240px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-inset overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              aria-label={`Visit ${item.name} website`}
            >
              {hoveredIndex === index && (
                <div className="absolute inset-0 z-0">
                  <Vortex
                    backgroundColor="#000"
                    particleCount={200}
                    baseHue={120 + index * 60}
                    baseSpeed={0.15}
                    rangeSpeed={1.2}
                    baseRadius={0.8}
                    rangeRadius={1.5}
                    containerClassName="w-full h-full"
                  />
                </div>
              )}

              <div className="relative z-10 w-full h-20 md:h-28 lg:h-32 flex items-center justify-center">
                <img
                  src={item.iconFile || "/placeholder.svg"}
                  alt={`${item.name} logo`}
                  className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain group-hover:invert transition-colors duration-300"
                />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedBy
