"use client"
import { motion } from "motion/react"
import {
  BootsIcon,
  AlamoIcon,
  CactusIcon,
  GuitarIcon,
  StarIcon,
  TexasIcon,
  TheaterIcon,
  DowntownIcon,
  CowboyHatIcon,
} from "./icons/svg-icons"

const trustedByIcons = [
  { name: "Boots", Icon: BootsIcon },
  { name: "Alamo", Icon: AlamoIcon },
  { name: "Cactus", Icon: CactusIcon },
  { name: "Guitar", Icon: GuitarIcon },
  { name: "Star", Icon: StarIcon },
  { name: "Texas", Icon: TexasIcon },
  { name: "Theater", Icon: TheaterIcon },
  { name: "Downtown", Icon: DowntownIcon },
  { name: "Cowboy Hat", Icon: CowboyHatIcon },
]

const TrustedBy = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32" id="trusted-by">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Text */}
        <motion.div
          className="text-center max-w-6xl mx-auto mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold leading-tight tracking-tight"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Explore our{" "}
            <span className="text-sky-400 underline decoration-4 underline-offset-8">creative ecosystem</span> of{" "}
            <span className="text-white bg-rose-500 px-2 py-1 rounded-lg">innovative properties</span> and{" "}
            <span className="text-lime-500 italic">groundbreaking content</span>.
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
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-black mb-4">Trusted by.</h2>
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
            <motion.div
              key={item.name}
              className="flex items-center justify-center p-6 md:p-8 lg:p-12 border-r border-b border-gray-200 [&:nth-child(3n)]:border-r-0 hover:bg-gray-50 transition-colors duration-300 group min-h-[120px] md:min-h-[140px] lg:min-h-[160px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-12 md:h-16 flex items-center justify-center">
                <item.Icon className="w-8 h-8 md:w-12 md:h-12 text-gray-600 group-hover:text-black transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedBy
