"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

const relatedEvents = [
  {
    id: "design-workshop",
    title: "UI/UX Design Workshop",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/ux.png",
    date: "May 20, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Geekdom Coworking Space",
    url: "#",
  },
  {
    id: "hackathon",
    title: "Creative Coding Hackathon",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/three.png",
    date: "July 8-9, 2025",
    time: "9:00 AM - 9:00 PM",
    location: "UTSA Downtown Campus",
    url: "#",
  },
  {
    id: "art-exhibition",
    title: "Digital Art Exhibition",
    image: "https://devsa-assets.s3.us-east-2.amazonaws.com/blend.jpg",
    date: "August 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "San Antonio Museum of Art",
    url: "#",
  },
]

const RelatedEvents = () => {
  return (
    <section className="py-16 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Related{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-purple-500 text-transparent bg-clip-text">
              Events
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Discover more events from Digital Canvas and our community partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 group hover:border-white/20 transition-colors duration-300"
            >
              <Link href={event.url} className="block">
                <div className="relative aspect-video">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-white/70 mb-2">
                    <i className="ri-calendar-line mr-2"></i>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-white/70 mb-2">
                    <i className="ri-time-line mr-2"></i>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <i className="ri-map-pin-line mr-2"></i>
                    <span>{event.location}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="#"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            View all events
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default RelatedEvents

