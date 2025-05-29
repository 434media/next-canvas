"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"

const EventDetails = () => {
  const [particles, setParticles] = useState<Array<{ left: string; top: string }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 10 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 bg-neutral-800/50 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              y: [0, -30],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <motion.i
            className="ri-information-line mr-2 text-teal-400"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          Program Details
        </h3>
        <div className="space-y-4">
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-calendar-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">6 Weeks Starting March 15, 2025</p>
              <p className="text-white/70 text-sm">Saturdays, 10:00 AM - 2:00 PM CST</p>
            </div>
          </motion.div>
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-map-pin-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">Geekdom Event Centre</p>
              <p className="text-white/70 text-sm">131 Soledad St, San Antonio, TX 78205</p>
            </div>
          </motion.div>
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-ticket-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">Flexible Pricing Options</p>
              <p className="text-white/70 text-sm">$100 per session or $500 for full series</p>
            </div>
          </motion.div>
          <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <i className="ri-group-line text-blue-400 text-xl mr-3 mt-0.5"></i>
            <div>
              <p className="text-white font-medium">Limited to 30 Participants</p>
              <p className="text-white/70 text-sm">Small cohort for personalized attention</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-white font-medium mb-3 flex items-center">
            <motion.i
              className="ri-money-dollar-circle-line mr-2 text-green-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            Pricing Breakdown
          </h4>
          <div className="space-y-2 text-sm">
            <motion.div className="flex justify-between text-white/70" whileHover={{ scale: 1.02 }}>
              <span>Per Session</span>
              <span>$100</span>
            </motion.div>
            <motion.div className="flex justify-between text-white/70" whileHover={{ scale: 1.02 }}>
              <span>Full Series (6 weeks)</span>
              <span className="flex items-center">
                <span className="line-through text-white/40 mr-2">$600</span>
                $500
              </span>
            </motion.div>
            <motion.div
              className="flex justify-between text-white font-medium border-t border-white/20 pt-2"
              whileHover={{ scale: 1.02 }}
            >
              <span>Full Series + Memberships</span>
              <span className="flex items-center">
                <span className="line-through text-white/40 mr-2">$1000</span>
                $500
              </span>
            </motion.div>
            <motion.p
              className="text-white/60 text-xs mt-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Memberships include 1 year DevSA + TechBloc access ($500 value)
            </motion.p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-white font-medium mb-2">Share this program</h4>
          <div className="flex space-x-4">
            {[
              { icon: "ri-twitter-x-line", color: "hover:text-blue-400" },
              { icon: "ri-facebook-fill", color: "hover:text-blue-600" },
              { icon: "ri-linkedin-fill", color: "hover:text-blue-500" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className={`text-white/70 ${social.color} transition-colors`}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`${social.icon} text-xl`}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventDetails
