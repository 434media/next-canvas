"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Play, ExternalLink } from "lucide-react"

interface BentoItem {
  id: number
  title: string
  category: string
  description: string
  type: "image" | "video" | "animation"
  media: string
  size: "small" | "medium" | "large"
  image: string
  website: string
  instagram: string
  theme: {
    pattern?: string
    animation: any
    hoverEffect: string
  }
}

const bentoItems: BentoItem[] = [
  {
    id: 1,
    title: "Vemos Vamos",
    category: "Studio",
    description: "We create for the audience that lives in two worlds and belongs to both. Bringing together 70 years of combined expertise in bilingual storytelling, design, and community-driven marketing, our team crafts meaningful brand experiences deeply rooted in Latinx culture.",
    type: "video",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/vv.mp4",
    size: "large",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/Website+VV+Assets.png",
    website: "https://vemosvamos.com",
    instagram: "https://instagram.com/vemos.vamos",
    theme: {
      animation: { rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] },
      hoverEffect: "group-hover:shadow-2xl group-hover:shadow-purple-500/25",
    },
  },
  {
    id: 2,
    title: "The AMPD Project",
    category: "Non-Profit",
    description: "Sparking change through art, empowering youth for a journey of growth and success. The Art, Music, Photography/Film, and Design (AMPD) Project is a veteran-founded 501(c)(3) non-profit organization. We are dedicated to empowering students and veterans through their passion for media and entertainment production.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/ampg-og-poster.png",
    size: "medium",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/ATBPod-7.jpg",
    website: "https://ampdproject.com",
    instagram: "https://instagram.com/ampdproject",
    theme: {
      animation: { y: [0, -8, 0], scale: [1, 1.05, 1] },
      hoverEffect: "group-hover:shadow-2xl group-hover:shadow-blue-500/25",
    },
  },
  {
    id: 3,
    title: "TXMX Boxing",
    category: "Sport",
    description: "Levantamos Los Puños. TXMX Boxing is a dynamic media platform designed to connect brands with a passionate fight fan audience. By celebrating the rich cultural heritage of Texas and Mexico, TXMX Boxing offers unique opportunities for brands to authentically engage with a community that is deeply rooted in both sport and culture.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/bam3.jpg",
    size: "small",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/bam2.jpg",
    website: "https://txmxboxing.com",
    instagram: "https://instagram.com/txmxboxing",
    theme: {
      animation: { rotate: [0, -2, 2, 0], x: [0, 3, -3, 0] },
      hoverEffect: "group-hover:shadow-2xl group-hover:shadow-emerald-500/25",
    },
  },
  {
    id: 4,
    title: "DEVSA TV",
    category: "Tech",
    description: "Activating the tech community in San Antonio through collaboration, strategic partnerships and video. DEVSA is your direct connection to the tech community.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/flyers-39-print+(1).png",
    size: "large",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/devsa-group.jpg",
    website: "https://devsa.community",
    instagram: "https://instagram.com/devsatx",
    theme: {
      pattern:
        "linear-gradient(45deg, rgba(249, 115, 22, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(249, 115, 22, 0.1) 25%, transparent 25%)",
      animation: { scale: [1, 1.03, 1], rotate: [0, 1, -1, 0] },
      hoverEffect: "group-hover:shadow-2xl group-hover:shadow-orange-500/25",
    },
  },
  {
    id: 5,
    title: "MilCityUSA",
    category: "Military",
    description:
      "Salute to Troops is a unique event marketing platform dedicated to fostering collaboration between Academia, Industry, and the Military. Our mission is to drive innovation, build community, and assist the military in overcoming historic challenges related to recruitment, retention, and reintegration by creating impactful narratives.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/mcu-poster.png",
    size: "small",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/recap+poster.png",
    website: "https://salutetotroops.com",
    instagram: "https://instagram.com/milcityusa",
    theme: {
      animation: { y: [0, -5, 0], rotate: [0, 2, -2, 0] },
      hoverEffect: "group-hover:shadow-2xl group-hover:shadow-amber-500/25",
    },
  },
  {
    id: 6,
    title: "SDOH",
    category: "Health",
    description:
      "¿Qué es SDOH? is a program designed to break down this big, often misunderstood topic into everyday language—and show how local leaders, innovators, and entrepreneurs can turn awareness into action.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/AC+Collage.png",
    size: "medium",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/sdoh-group.JPG",
    website: "https://434media.com/sdoh",
    instagram: "https://instagram.com/digitalcanvas.community",
    theme: {
      animation: { scale: [1, 1.02, 1], y: [0, -3, 0] },
      hoverEffect: "group-hover:shadow-2xl group-hover:shadow-indigo-500/25",
    },
  },
  {
    id: 7,
    title: "AIM Health R&D Summit",
    category: "Innovation",
    description:
      "Join military and civilian leaders, researchers, and innovators to explore breakthrough technologies, share cutting-edge research, and forge partnerships that will transform healthcare for our service members and beyond.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/aim-bento.png",
    size: "small",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aim-group.jpg",
    website: "https://aimsatx.com",
    instagram: "https://instagram.com/digitalcanvas.community",
    theme: {
      animation: { rotate: [0, 3, -3, 0], scale: [1, 1.04, 1] },
      hoverEffect: "group-hover:shadow-2xl group-hover:shadow-teal-500/25",
    },
  },
]

const UniqueBentoBox = ({
  item,
  onClick,
  className,
  children,
}: {
  item: BentoItem
  onClick: () => void
  className?: string
  children: React.ReactNode
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: item.id * 0.1, ease: "easeOut" }}
    >
      <div className="absolute inset-px rounded-lg bg-white" />
      <motion.div
        className={`relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] cursor-pointer group transition-all duration-500 bg-white`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick()
          }
        }}
        aria-label={`View ${item.title}`}
        style={{
          background: item.theme.pattern ? `${item.theme.pattern}, white` : "white",
        }}
      >
        {children}
      </motion.div>
      <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
    </motion.div>
  )
}

export default function AnimatedLanding() {
  const [selectedItem, setSelectedItem] = useState<BentoItem | null>(null)


  return (
    <section className="md:py-32 mb-24 md:mb-0 -mt-4 md:mt-0">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mx-auto mt-2 max-w-4xl text-center text-5xl font-black tracking-tight text-balance text-neutral-950 sm:text-6xl lg:text-7xl">
            Meet The{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Creative Team
            </span>{" "}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xl leading-relaxed text-neutral-700 sm:text-2xl lg:text-2xl font-medium">
            From bicultural media to military medicine, explore the{" "}
            <span className="font-black text-neutral-900">diverse ecosystem</span> of brands that fuel our creative
            canvas
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <UniqueBentoBox
            item={bentoItems[0]}
            onClick={() => setSelectedItem(bentoItems[0])}
            className="relative lg:row-span-2"
          >
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0 relative z-10">
              <span
                className={`inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-black text-sm font-medium mb-2 shadow-sm`}
              >
                {bentoItems[0].category}
              </span>
              <p className="mt-2 text-lg font-medium tracking-tight text-neutral-950 max-lg:text-center">
                {bentoItems[0].title}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-neutral-600 max-lg:text-center">
                {bentoItems[0].description.slice(0, 100)}
              </p>
            </div>
            <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
              <motion.div
                className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-neutral-700 bg-neutral-900 shadow-2xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <video className="size-full object-cover object-top" autoPlay muted loop playsInline>
                  <source src={bentoItems[0].media} type="video/mp4" />
                </video>
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="w-8 h-8 rounded-full bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                    <Play size={16} className="text-white ml-0.5" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </UniqueBentoBox>

          <UniqueBentoBox
            item={bentoItems[1]}
            onClick={() => setSelectedItem(bentoItems[1])}
            className="relative max-lg:row-start-1"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${bentoItems[1].media})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
            <div className="px-8 pt-8 sm:px-10 sm:pt-10 relative z-10 h-80 md:h-full">
              <span
                className={`inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-black text-sm font-medium mb-2 shadow-sm`}
              >
                {bentoItems[1].category}
              </span>
              <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center drop-shadow-lg">
                {bentoItems[1].title}
              </p>
            </div>
          </UniqueBentoBox>

          <UniqueBentoBox
            item={bentoItems[2]}
            onClick={() => setSelectedItem(bentoItems[2])}
            className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${bentoItems[2].media})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <div className="relative z-10 px-8 pt-8 sm:px-10 sm:pt-10 h-80 md:h-full">
              <span
                className={`inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-black text-sm font-medium mb-2 shadow-sm`}
              >
                {bentoItems[2].category}
              </span>
            </div>
          </UniqueBentoBox>

          <UniqueBentoBox
            item={bentoItems[3]}
            onClick={() => setSelectedItem(bentoItems[3])}
            className="relative lg:row-span-2"
          >
            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0 relative z-10">
              <span
                className={`inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-black text-sm font-medium mb-2 shadow-sm`}
              >
                {bentoItems[3].category}
              </span>
              <p className="mt-2 text-lg font-medium tracking-tight text-neutral-950 max-lg:text-center">
                {bentoItems[3].title}
              </p>
              <p className="mt-2 max-w-lg text-sm/6 text-neutral-600 max-lg:text-center">
                {bentoItems[3].description.slice(0, 100)}
              </p>
            </div>
            <div className="relative min-h-120 w-full grow">
              <motion.div
                className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-neutral-900 shadow-2xl outline outline-white/10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  alt={bentoItems[3].title}
                  src={bentoItems[3].media || "/placeholder.svg"}
                  className="size-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </UniqueBentoBox>

          {bentoItems.slice(4, 7).map((item, index) => (
            <UniqueBentoBox
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
              className="relative lg:row-start-3"
            >
              {(item.id === 5 || item.id === 6 || item.id === 7) && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${item.media})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
                </>
              )}
              <div className="px-6 pt-6 pb-2 relative z-10 h-80 md:h-full">
                <span
                  className={`inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full ${item.id === 5 || item.id === 6 || item.id === 7 ? "text-black" : "text-black"} text-sm font-medium mb-2 shadow-sm`}
                >
                  {item.category}
                </span>
              </div>
              {!(item.id === 5 || item.id === 6 || item.id === 7) && (
                <div className="flex flex-1 items-center justify-center px-6 pb-6">
                  {item.type === "video" ? (
                    <motion.div
                      className="relative w-full max-w-[120px]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <video className="w-full object-cover rounded-lg shadow-lg" autoPlay muted loop playsInline>
                        <source src={item.media} type="video/mp4" />
                      </video>
                      <motion.div
                        className="absolute top-2 right-2"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="w-6 h-6 rounded-full bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
                          <Play size={12} className="text-white ml-0.5" />
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.img
                      alt={item.title}
                      src={item.media || "/placeholder.svg"}
                      className="w-full max-w-[120px] object-cover rounded-lg shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              )}
            </UniqueBentoBox>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              style={{
                maxWidth: "600px",
                aspectRatio: "4/5",
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full flex flex-col">
                <div className="relative h-2/5 overflow-hidden rounded-t-3xl">
                  {selectedItem.image && (
                    <img
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-neutral-900 text-sm font-medium">
                      {selectedItem.category}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center text-neutral-900 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 drop-shadow-lg">
                      {selectedItem.title}
                    </h2>
                  </div>
                </div>

                <div className="flex-1 p-8 flex flex-col justify-between">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-neutral-700 leading-relaxed text-base mb-6">{selectedItem.description}</p>
                  </motion.div>

                  <div className="flex gap-4">
                    <a
                      href={selectedItem.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                      Visit Website
                    </a>
                    <a
                      href={selectedItem.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
