"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import type { NewsletterContent } from "@/data/feed-data"
import { ArrowRight } from "lucide-react"

interface NewsletterTemplateProps {
  content: NewsletterContent
}

export function NewsletterTemplate({ content }: NewsletterTemplateProps) {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Image - 4:5 aspect ratio, centered on desktop with max-width */}
      {/* Mobile Hero Image - 4:5 aspect ratio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full aspect-[4/5] border-4 border-black overflow-hidden bg-gray-100 md:hidden"
      >
        <Image
          src={content.heroImage.mobile || "/placeholder.svg"}
          alt="Newsletter hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Desktop Hero Image - Wide format, centered with max-width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full aspect-[16/9] md:max-w-6xl md:mx-auto border-4 border-black overflow-hidden bg-gray-100 hidden md:block"
      >
        <Image
          src={content.heroImage.desktop || "/placeholder.svg"}
          alt="Newsletter hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Founder's Note Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border-4 border-black p-6 md:p-8 lg:p-12 bg-white relative"
      >
        <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-menda-black)] uppercase tracking-tight mb-8 border-b-4 border-black pb-4">
          Founder's Note
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <div
              className="prose prose-lg max-w-none text-gray-800 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-black [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_li]:leading-relaxed md:tracking-tighter"
              dangerouslySetInnerHTML={{ __html: content.foundersNote.text }}
            />
          </div>
          <div className="relative aspect-[4/5] border-4 border-black overflow-visible bg-gray-100">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-32 h-16 md:w-40 md:h-20 z-10"
            >
              <Image
                src="https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/ActionsSpeakLouder.png"
                alt="Actions Speak Louder"
                fill
                className="object-contain drop-shadow-lg"
              />
            </motion.div>
            <Image
              src={content.foundersNote.image || "/placeholder.svg"}
              alt="Founder's note"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* Last Month in Motion */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-8"
      >
        <div className="relative w-full aspect-[3/1] border-4 border-black overflow-hidden bg-gray-100">
          <Image
            src={content.lastMonthGif || "/placeholder.svg"}
            alt="Last month in motion"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="sr-only">Last Month in Motion</span>
          </div>
        </div>

        {/* Newsletter Spotlights */}
        <div className="space-y-8">
          {content.spotlights.map((spotlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={`grid md:grid-cols-2 gap-6 md:gap-8 border-4 border-black p-6 md:p-8 bg-white hover:bg-gray-50 transition-colors ${
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              <div
                className={`relative aspect-[4/5] border-4 border-black overflow-hidden bg-gray-100 ${
                  index % 2 === 1 ? "md:col-start-2" : ""
                }`}
              >
                <Image
                  src={spotlight.image || "/placeholder.svg"}
                  alt={spotlight.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-menda-black)] uppercase tracking-tight">
                  {spotlight.title}
                </h3>
                <div
                  className="prose prose-lg max-w-none md:tracking-tighter text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-black [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_li]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: spotlight.description }}
                />
                <Link
                  href={spotlight.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm uppercase tracking-wider font-mono font-bold hover:bg-gray-800 transition-colors w-fit border-2 border-black group"
                >
                  {spotlight.ctaText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Post */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="border-4 border-black bg-white overflow-hidden"
      >
        <div className="relative w-full aspect-[2/1] bg-gray-100">
          <Image
            src={content.featuredPost.image || "/placeholder.svg"}
            alt={content.featuredPost.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-8 lg:p-12 space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-menda-black)] uppercase tracking-tight border-b-4 border-black pb-4">
            {content.featuredPost.title}
          </h2>
          <div
            className="prose prose-lg max-w-none text-gray-800 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-black [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_li]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.featuredPost.content }}
          />
        </div>
      </motion.section>

      {/* The Drop */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="space-y-8"
      >
        <div className="relative w-full aspect-[3/1] border-4 border-black overflow-hidden bg-gray-100">
          <Image src={content.theDropGif || "/placeholder.svg"} alt="The Drop" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="sr-only">The Drop</span>
          </div>
        </div>

        {/* Upcoming Event CTA */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 border-4 border-black bg-black text-white overflow-visible relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute -right-5 -top-10 md:-top-8 md:-right-10 w-24 h-24 md:w-32 md:h-32 z-10"
          >
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/The+Feed/434Featured.png"
              alt="434 Featured Event"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>

          <div className="relative aspect-[4/5] bg-gray-800">
            <Image
              src={content.upcomingEvent.image || "/placeholder.svg"}
              alt={content.upcomingEvent.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-menda-black)] uppercase tracking-tighter text-balance">
              {content.upcomingEvent.title}
            </h3>
            <p className="text-base leading-relaxed text-gray-200">{content.upcomingEvent.description}</p>
            <Link
              href={content.upcomingEvent.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm uppercase tracking-wider font-mono font-bold hover:bg-gray-200 transition-colors w-fit border-2 border-white group"
            >
              {content.upcomingEvent.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
