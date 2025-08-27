"use client"

import { motion } from "motion/react"
import Image from "next/image"
import type { Speaker } from "../../data/prompt-to-product"

interface SpeakerCardProps {
  speaker: Speaker
  index: number
}

const SpeakerCard = ({ speaker, index }: SpeakerCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-neutral-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10 group hover:border-white/20 transition-colors duration-300 relative overflow-hidden"
  >
    {/* Hover effect background */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />

    <div className="relative z-10 flex flex-col sm:flex-row gap-4">
      <motion.div
        className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0 mx-auto sm:mx-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image src={speaker.image || "/placeholder.svg"} alt={speaker.name} fill className="object-cover" />
      </motion.div>
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-lg font-bold text-white mb-1">{speaker.name}</h4>
        <p className="text-blue-400 mb-2 text-sm">
          {speaker.role} @ {speaker.company}
        </p>
        <p className="text-white/70 text-sm mb-3 leading-relaxed">{speaker.bio}</p>
        <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
          {speaker.expertise.map((skill: string, skillIndex: number) => (
            <motion.span
              key={skill}
              className="px-2 py-1 bg-white/10 text-white/80 rounded-full text-xs"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: skillIndex * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

export default SpeakerCard
