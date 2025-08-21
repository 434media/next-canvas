"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Play, ExternalLink } from "lucide-react"

interface BentoItem {
  id: number
  title: string
  category: string
  description: string
  type: "image" | "video" | "animation"
  media: string
  color: string
  size: "small" | "medium" | "large"
  image: string
  website: string
  instagram: string
}

const bentoItems: BentoItem[] = [
  {
    id: 1,
    title: "Vemos Vamos",
    category: "Studio",
    description: "We create for the audience that lives in two worlds and belongs to both.",
    type: "video",
    media: "/placeholder.svg?height=600&width=800",
    color: "from-purple-500 to-pink-500",
    size: "large",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/vemos-vamos-hero.jpg",
    website: "https://vemosvamos.com",
    instagram: "https://instagram.com/vemosvamos",
  },
  {
    id: 2,
    title: "The AMPD Project",
    category: "Non-Profit",
    description: "Sparking change through art, empowering youth for a journey of growth and success.",
    type: "image",
    media: "/placeholder.svg?height=400&width=600",
    color: "from-blue-500 to-cyan-500",
    size: "medium",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/ampd-project-hero.jpg",
    website: "https://theampdproject.org",
    instagram: "https://instagram.com/theampdproject",
  },
  {
    id: 3,
    title: "TXMX Boxing",
    category: "Sport",
    description:
      "Our cutting-edge technology lab where we experiment with AI, AR, and emerging digital platforms to create tomorrow's experiences.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/bam2.jpg",
    color: "from-green-500 to-emerald-500",
    size: "small",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/bam2.jpg",
    website: "https://txmxboxing.com",
    instagram: "https://instagram.com/txmxboxing",
  },
  {
    id: 4,
    title: "DEVSA TV",
    category: "Tech",
    description: "Activating the tech community in San Antonio through collaboration and strategic initiatives.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/flyers-39-print+(1).png",
    color: "from-orange-500 to-red-500",
    size: "large",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/devsa-tv-hero.jpg",
    website: "https://devsa.tv",
    instagram: "https://instagram.com/devsatv",
  },
  {
    id: 5,
    title: "MilCityUSA",
    category: "Military",
    description:
      "Discover how our motion designers bring static concepts to life with dynamic animations and interactive elements.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/mcu-poster.png",
    color: "from-yellow-500 to-orange-500",
    size: "small",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/milcity-hero.jpg",
    website: "https://milcityusa.com",
    instagram: "https://instagram.com/milcityusa",
  },
  {
    id: 6,
    title: "SDOH",
    category: "Health",
    description:
      "Our collaborative workspace where client visions merge with our creative expertise to produce exceptional digital experiences.",
    type: "image",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/que.svg",
    color: "from-indigo-500 to-purple-500",
    size: "medium",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/sdoh-hero.jpg",
    website: "https://sdoh.health",
    instagram: "https://instagram.com/sdohhealth",
  },
  {
    id: 7,
    title: "AIM Health R&D Summity",
    category: "Innovation",
    description:
      "Step into our innovation workshop where we explore emerging trends and technologies that will shape the future of digital creativity.",
    type: "video",
    media: "https://ampd-asset.s3.us-east-2.amazonaws.com/AIM+Cut+Down+Website.mp4",
    color: "from-teal-500 to-blue-500",
    size: "small",
    image: "https://ampd-asset.s3.us-east-2.amazonaws.com/aim-health-hero.jpg",
    website: "https://aimhealth.com",
    instagram: "https://instagram.com/aimhealth",
  },
]

export default function AnimatedLanding() {
  const [selectedItem, setSelectedItem] = useState<BentoItem | null>(null)

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mx-auto mt-2 max-w-4xl text-center text-5xl font-black tracking-tight text-balance text-gray-950 sm:text-6xl lg:text-7xl">
            Meet the{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Creative Team
            </span>{" "}
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xl leading-relaxed text-gray-700 sm:text-2xl lg:text-2xl font-medium">
            From bicultural media to military medicine, explore the{" "}
            <span className="font-black text-gray-900">diverse ecosystem</span> of brands and that fuel our creative
            canvas
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="relative lg:row-span-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)] cursor-pointer group"
              onClick={() => setSelectedItem(bentoItems[0])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedItem(bentoItems[0])
                }
              }}
              aria-label={`View ${bentoItems[0].title}`}
            >
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-2">
                  {bentoItems[0].category}
                </span>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  {bentoItems[0].title}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  {bentoItems[0].description.slice(0, 100)}...
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <img
                    alt={bentoItems[0].title}
                    src={bentoItems[0].media || "/placeholder.svg"}
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </motion.div>

          <motion.div
            className="relative max-lg:row-start-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] cursor-pointer group"
              onClick={() => setSelectedItem(bentoItems[1])}
              role="button"
              tabIndex={0}
              aria-label={`View ${bentoItems[1].title}`}
            >
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-2">
                  {bentoItems[1].category}
                </span>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  {bentoItems[1].title}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  {bentoItems[1].description.slice(0, 80)}...
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt={bentoItems[1].title}
                  src={bentoItems[1].media || "/placeholder.svg"}
                  className="w-full max-lg:max-w-xs group-hover:scale-105 transition-transform duration-300"
                />
                {bentoItems[1].type === "video" && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={16} className="text-blue-600 ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </motion.div>

          <motion.div
            className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-white" />
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] cursor-pointer group"
              onClick={() => setSelectedItem(bentoItems[2])}
              role="button"
              tabIndex={0}
              aria-label={`View ${bentoItems[2].title}`}
              style={{
                backgroundImage: `url(${bentoItems[2].media})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="relative z-10 px-8 pt-8 sm:px-10 sm:pt-10">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-2">
                  {bentoItems[2].category}
                </span>
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center drop-shadow-lg">
                  {bentoItems[2].title}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center drop-shadow-lg">
                  {bentoItems[2].description.slice(0, 60)}...
                </p>
              </div>
              {bentoItems[2].type === "animation" && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-8 h-8 rounded-full bg-green-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                    <motion.div
                      className="w-3 h-3 bg-green-600 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </motion.div>

          <motion.div
            className="relative lg:row-span-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div
              className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] cursor-pointer group"
              onClick={() => setSelectedItem(bentoItems[3])}
              role="button"
              tabIndex={0}
              aria-label={`View ${bentoItems[3].title}`}
            >
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-2">
                  {bentoItems[3].category}
                </span>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  {bentoItems[3].title}
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  {bentoItems[3].description.slice(0, 100)}...
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10 group-hover:scale-105 transition-transform duration-300">
                  <img
                    alt={bentoItems[3].title}
                    src={bentoItems[3].media || "/placeholder.svg"}
                    className="size-full object-cover"
                  />
                  {bentoItems[3].type === "video" && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={16} className="text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </motion.div>

          {bentoItems.slice(4, 7).map((item, index) => (
            <motion.div
              key={item.id}
              className="relative lg:row-start-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: (index + 5) * 0.1, ease: "easeOut" }}
            >
              <div className="absolute inset-px rounded-lg bg-white" />
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] cursor-pointer group"
                onClick={() => setSelectedItem(item)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <div className="px-6 pt-6 pb-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-600"
                        : index === 1
                          ? "bg-purple-100 text-purple-600"
                          : "bg-teal-100 text-teal-600"
                    }`}
                  >
                    {item.category}
                  </span>
                  <p className="text-base font-medium tracking-tight text-gray-950 max-lg:text-center">{item.title}</p>
                </div>
                <div className="flex flex-1 items-center justify-center px-6 pb-6">
                  <img
                    alt={item.title}
                    src={item.media || "/placeholder.svg"}
                    className="w-full max-w-[120px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.type === "animation" && (
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="w-3 h-3 bg-gray-600 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="relative">
                <div className={`h-80 bg-gradient-to-br ${selectedItem.color} relative overflow-hidden`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50"
                    style={{ backgroundImage: `url(${selectedItem.image})` }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20" />

                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      {selectedItem.category}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 drop-shadow-lg">
                      {selectedItem.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm opacity-90 font-medium">Type: {selectedItem.type}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">{selectedItem.description}</p>
                    <div className="flex gap-4">
                      <a
                        href={selectedItem.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
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
                        <InstagramIcon className="h-4 w-4" />
                        Instagram
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}


//instagram icon
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.874 5.874 0 00-2.124 1.388 5.878 5.878 0 00-1.38 2.127C.321 4.926.12 5.8.064 7.076.008 8.354-.005 8.764.001 12.023c.007 3.259.021 3.667.083 4.947.061 1.277.264 2.149.563 2.911.308.789.72 1.457 1.388 2.123a5.872 5.872 0 002.129 1.38c.763.295 1.636.496 2.913.552 1.278.056 1.689.069 4.947.063 3.257-.007 3.668-.021 4.947-.082 1.28-.06 2.147-.265 2.91-.563a5.881 5.881 0 002.123-1.388 5.881 5.881 0 001.38-2.129c.295-.763.496-1.636.551-2.912.056-1.28.07-1.69.063-4.948-.006-3.258-.02-3.667-.081-4.947-.06-1.28-.264-2.148-.564-2.911a5.892 5.892 0 00-1.387-2.123 5.857 5.857 0 00-2.128-1.38C19.074.322 18.202.12 16.924.066 15.647.009 15.236-.006 11.977 0 8.718.008 8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.736 3.736 0 01-1.382-.895 3.695 3.695 0 01-.9-1.378c-.165-.423-.363-1.058-.417-2.228-.06-1.264-.072-1.644-.08-4.848-.006-3.204.006-3.583.061-4.848.05-1.169.246-1.805.408-2.228.216-.561.477-.96.895-1.382a3.705 3.705 0 011.379-.9c.423-.165 1.057-.361 2.227-.417 1.265-.06 1.644-.072 4.848-.08 3.203-.006 3.583.006 4.85.062 1.168.05 1.804.244 2.227.408.56.216.96.475 1.382.895.421.42.681.817.9 1.378.165.422.362 1.056.417 2.227.06 1.265.074 1.645.08 4.848.005 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.805-.408 2.23-.216.56-.477.96-.896 1.38a3.705 3.705 0 01-1.378.9c-.422.165-1.058.362-2.226.418-1.266.06-1.645.072-4.85.079-3.204.007-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 101.437-1.442 1.44 1.44 0 00-1.437 1.442M5.839 12.012a6.161 6.161 0 1012.323-.024 6.162 6.162 0 00-12.323.024M8 12.008A4 4 0 1112.008 16 4 4 0 018 12.008" />
    </svg>
  )
}