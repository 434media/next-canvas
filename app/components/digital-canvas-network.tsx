"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { WireframeBackground } from "./wireframe-background"
import "remixicon/fonts/remixicon.css"

const ipProperties = [
  {
    id: "devsa",
    name: "DEVSA",
    tagline: "Your Direct Connection to the San Antonio Tech Community",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://devsanantonio.com", show: true },
    instagram: { url: "https://instagram.com/devsatx", show: true },
    linkedin: { url: "https://linkedin.com/company/devsatx", show: true },
  },
  {
    id: "ampd",
    name: "The AMPD Project",
    tagline: "Sparking change through art, empowering youth for a journey of growth and success.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://ampdproject.com", show: true },
    instagram: { url: "https://instagram.com/ampdproject", show: true },
    linkedin: { url: "https://linkedin.com/company/ampd-project", show: false },
  },
  {
    id: "vemosvamos",
    name: "Vemos Vamos",
    tagline: "A bilingual space for those who aren’t afraid to question, create, and grow",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://vemosvamos.com", show: true },
    instagram: { url: "https://instagram.com/vemosvamos", show: true },
    linkedin: { url: "https://linkedin.com/company/vemos-vamos", show: true },
  },
  {
    id: "txmx",
    name: "TXMX Boxing",
    tagline: "Made from blood, sweat, and tears",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/txmxboxing", show: true },
    linkedin: { url: "https://linkedin.com/company/txmx-boxing", show: false },
  },
  {
    id: "salute",
    name: "Salute to Troops",
    tagline: "MilCityUSA is a news & media hub promoting federal and military entrepreneurialism and innovation.",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/salutetotroops", show: true },
    linkedin: { url: "https://linkedin.com/company/salute-to-troops", show: false },
  },
  {
    id: "aimsatx",
    name: "AIM Health R&D Summit",
    tagline: "Accelerating Innovation in Military Medicine",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "#", show: true },
    instagram: { url: "https://instagram.com/aimsatx", show: true },
    linkedin: { url: "https://linkedin.com/company/aim-satx", show: false },
  },
]

const clientWork = [
  {
    id: "velocitytx",
    name: "VelocityTX",
    tagline: "Accelerating Texas Innovation",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://velocitytx.com", show: true },
    instagram: { url: "https://instagram.com/velocitytx", show: true },
    linkedin: { url: "https://linkedin.com/company/velocitytx", show: true },
  },
  {
    id: "methodist",
    name: "Methodist Healthcare Ministries",
    tagline: "Healing Communities with Compassion",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://mhm.org", show: true },
    instagram: { url: "https://instagram.com/methodisthealthcare", show: false },
    linkedin: { url: "https://linkedin.com/company/methodist-healthcare-ministries", show: true },
  },
  {
    id: "healthcell",
    name: "Health Cell",
    tagline: "Revolutionizing Cellular Health",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://healthcell.com", show: true },
    instagram: { url: "https://instagram.com/healthcell", show: false },
    linkedin: { url: "https://linkedin.com/company/health-cell", show: true },
  },
  {
    id: "techbloc",
    name: "TechBloc",
    tagline: "Building San Antonio's Tech Future",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://techbloc.org", show: true },
    instagram: { url: "https://instagram.com/techbloc", show: true },
    linkedin: { url: "https://linkedin.com/company/techbloc", show: true },
  },
  {
    id: "alamoangels",
    name: "Alamo Angels",
    tagline: "Fueling Innovation Through Investment",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/collab3.jpeg",
    website: { url: "https://alamoangels.com", show: true },
    instagram: { url: "https://instagram.com/alamoangels", show: true },
    linkedin: { url: "https://linkedin.com/company/alamo-angels", show: true },
  },
]

const NetworkSection = ({
  title,
  items,
}: {
  title: string
  items: typeof ipProperties
}) => {
  const [hoveredItem, setHoveredItem] = useState<string>("")
  const [activeItem, setActiveItem] = useState<string>(items[0]?.id || "")

  const currentItem = items.find((item) => item.id === activeItem) || items[0]

  const handleItemHover = (itemId: string) => {
    setHoveredItem(itemId)
    setActiveItem(itemId)
  }

  const handleItemLeave = () => {
    setHoveredItem("")
  }

  const renderSocialLinks = (item: (typeof items)[0]) => {
    const links = []

    if (item.website.show) {
      links.push(
        <motion.a
          key="website"
          href={item.website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="ri-global-line text-xl" />
        </motion.a>,
      )
    }

    if (item.instagram.show) {
      links.push(
        <motion.a
          key="instagram"
          href={item.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="ri-instagram-line text-xl" />
        </motion.a>,
      )
    }

    if (item.linkedin.show) {
      links.push(
        <motion.a
          key="linkedin"
          href={item.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="ri-linkedin-line text-xl" />
        </motion.a>,
      )
    }

    return links
  }

  return (
    <div className="py-16 lg:py-20">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12 lg:mb-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{title}</h2>
        <div className="w-24 h-px bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
      </motion.div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-[80vh]">
        {/* Left Panel - Project List */}
        <div className="w-3/5 flex flex-col border-r border-neutral-800">
          {/* Project List */}
          <div className="flex-1">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative border-b border-neutral-800 transition-all duration-300 cursor-pointer ${
                  activeItem === item.id ? "bg-neutral-900/30" : ""
                }`}
                onMouseEnter={() => handleItemHover(item.id)}
                onMouseLeave={handleItemLeave}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="p-8 flex items-center justify-between">
                  <motion.div
                    className="flex-1"
                    animate={{
                      opacity: hoveredItem === "" || hoveredItem === item.id || activeItem === item.id ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3
                      className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                        activeItem === item.id ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {item.name}
                    </h3>
                    {activeItem === item.id && (
                      <motion.p
                        className="text-neutral-400 text-sm uppercase tracking-wider max-w-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.tagline}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Social Links - Only show for active item */}
                  {activeItem === item.id && (
                    <motion.div
                      className="flex space-x-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {renderSocialLinks(item)}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel - Image */}
        <div className="w-2/5 relative">
          <AnimatePresence mode="wait">
            {currentItem && (
              <motion.div
                key={currentItem.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={currentItem.image || "/placeholder.svg"}
                  alt={currentItem.name}
                  fill
                  className="object-cover grayscale"
                  priority
                  sizes="40vw"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden px-4">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-[3/4] border border-neutral-800 rounded-lg overflow-hidden bg-black"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Social Icons - Bottom Left */}
              <div className="absolute bottom-4 left-4 flex space-x-3">
                {item.website.show && (
                  <a
                    href={item.website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <i className="ri-global-line text-lg" />
                  </a>
                )}
                {item.instagram.show && (
                  <a
                    href={item.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <i className="ri-instagram-line text-lg" />
                  </a>
                )}
                {item.linkedin.show && (
                  <a
                    href={item.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <i className="ri-linkedin-line text-lg" />
                  </a>
                )}
              </div>

              {/* Text Content - Bottom Right */}
              <div className="absolute bottom-4 right-4 text-right">
                <h4 className="text-white font-bold text-sm leading-tight mb-1">{item.name}</h4>
                <p className="text-neutral-400 text-xs leading-tight max-w-xl">{item.tagline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const DigitalCanvasNetwork = () => {
  return (
    <section className="relative bg-black overflow-hidden" id="network">
      {/* Wireframe Background */}
      <WireframeBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Section Header */}
        <motion.div
          className="text-center py-16 lg:py-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center justify-center w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-4 lg:p-5 backdrop-blur-sm border border-white/10">
              <i className="ri-share-line text-2xl lg:text-3xl text-white"></i>
            </span>
          </motion.div>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 lg:mb-8">
            The{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
              Digital Canvas
            </span>{" "}
            Network
          </h1>
          <p className="text-lg lg:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Where our creative partnerships shape the future together.
          </p>
        </motion.div>

        {/* IP Properties Section */}
        <NetworkSection title="In-House Properties" items={ipProperties} />

        {/* Section Divider */}
        <div className="py-8 lg:py-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>
        </div>

        {/* Client Work Section */}
        <NetworkSection title="Client Work" items={clientWork} />

        {/* Call to Action */}
        <motion.div
          className="text-center py-16 lg:py-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 lg:p-12 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-6">Join the Digital Canvas Network</h3>
            <p className="text-white/80 text-lg lg:text-xl mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
              Become part of our creative ecosystem where innovative IP properties and transformative client
              partnerships shape the future together.
            </p>
            <motion.button
              className="px-8 lg:px-12 py-4 lg:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base lg:text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DigitalCanvasNetwork
