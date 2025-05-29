"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import type { WeekProgram } from "../../data/prompt-to-product"
import SpeakerCard from "./speaker-card"

interface WeekCardProps {
  week: WeekProgram
  index: number
}

const WeekCard = ({ week, index }: WeekCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-300 relative"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${week.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      />

      {/* Week Header */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <motion.div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${week.color} flex items-center justify-center mr-4`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <i className={`${week.icon} text-2xl text-white`}></i>
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">Week {week.week}</h3>
              <p className="text-white/60 text-sm">{week.subtitle}</p>
            </div>
          </div>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.i
              className="ri-arrow-down-s-line"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        <h4 className="text-2xl font-bold text-white mb-3">{week.title}</h4>
        <p className="text-white/80 leading-relaxed">{week.description}</p>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative z-10 p-6 space-y-6">
              {/* Topics */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <motion.i
                    className="ri-list-check mr-2 text-blue-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  Key Topics
                </h5>
                <ul className="space-y-2">
                  {week.topics.map((topic: string, topicIndex: number) => (
                    <motion.li
                      key={topicIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: topicIndex * 0.1 }}
                      className="flex items-center text-white/70 hover:text-white/90 transition-colors"
                    >
                      <motion.i
                        className="ri-arrow-right-s-line text-blue-400 mr-2"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      />
                      {topic}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Speakers */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <motion.i
                    className="ri-user-star-line mr-2 text-purple-400"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  Featured Speakers
                </h5>
                <div className="space-y-4">
                  {week.speakers.map((speaker, speakerIndex: number) => (
                    <SpeakerCard key={speakerIndex} speaker={speaker} index={speakerIndex} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default WeekCard
