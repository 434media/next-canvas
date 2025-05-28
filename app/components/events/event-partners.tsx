"use client"

import { motion } from "motion/react"
import Image from "next/image"

const partners = [
  {
    name: "Adobe",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/adobe_wordmark_red.svg",
    url: "https://adobe.com",
  },
  {
    name: "The AMPD Project",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/Ampd_Logo_Full.svg",
    url: "https://ampdproject.com",
  },
  {
    name: "434 Media",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/434media-light.svg",
    url: "https://434media.com",
  },
  {
    name: "DEVSA",
    logo: "https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-community.svg",
    url: "https://devsanantonio.com",
  },
  {
    name: "Vemos Vamos",
    logo: "https://ampd-asset.s3.us-east-2.amazonaws.com/large.jpg",
    url: "https://vemosvamos.com",
  },
]

const EventPartners = () => {
  return (
    <section className="py-16 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Event{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text">
              Partners
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            We&apos;re proud to collaborate with these amazing organizations to bring you the Creative Tech Summit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center"
        >
          {partners.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative h-16 w-40 grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
                <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
              </div>
              <div className="absolute -inset-px border border-white/0 rounded group-hover:border-white/20 transition-colors duration-300"></div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default EventPartners

