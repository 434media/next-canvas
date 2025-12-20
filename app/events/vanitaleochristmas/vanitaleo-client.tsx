"use client"

import { motion } from "motion/react"
import { Heart } from "lucide-react"

export default function VanitaLeoClient() {
  return (
    <main className="bg-white">
      {/* Fullscreen video aspect ratio preservation */}
      <style>{`
        .vanita-video:fullscreen,
        .vanita-video:-webkit-full-screen {
          width: auto !important;
          height: 100vh !important;
          max-width: calc(100vh * 4 / 5) !important;
          margin: 0 auto !important;
          object-fit: contain !important;
          background: black !important;
        }
        .vanita-video::backdrop {
          background: black !important;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row min-h-screen pt-16 sm:pt-20">
        {/* Left Side - Hero Video (Fixed on desktop, relative on mobile) */}
        <div className="group relative h-[40vh] sm:h-[50vh] lg:h-auto lg:w-1/2 lg:fixed lg:top-16 lg:bottom-0 lg:left-0 overflow-hidden">
          {/* Neon glow overlay - always visible */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-tr from-[#dc2626]/20 via-transparent to-[#00ffff]/20" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-bl from-[#39ff14]/15 via-transparent to-[#dc2626]/15" />
          
          {/* Scanline effect - always visible */}
          <div className="absolute inset-0 z-20 opacity-30 pointer-events-none" 
            style={{ 
              backgroundImage: 'repeating-linear-linear(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              backgroundSize: '100% 4px'
            }} 
          />
          
          <video
            src="https://ampd-asset.s3.us-east-2.amazonaws.com/VanitaLeo-loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover saturate-[1.2] contrast-[1.1] transition-transform duration-500"
          />
          
          {/* Neon border glow - always visible */}
          <div className="absolute inset-0 z-10 pointer-events-none border-4 border-black" style={{ boxShadow: 'inset 0 0 30px rgba(220,38,38,0.3), inset 0 0 60px rgba(0,255,255,0.2)' }} />
        </div>

        {/* Right Side - Scrollable Content */}
        <div className="w-full lg:w-1/2 lg:ml-[50%] relative bg-white">
          {/* Decorative sketch lines background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            <svg className="absolute w-full h-full" preserveAspectRatio="none">
              <pattern id="sketch-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20 L40 20" stroke="#000" strokeWidth="0.5" strokeDasharray="2,4" />
                <path d="M20 0 L20 40" stroke="#000" strokeWidth="0.5" strokeDasharray="2,4" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#sketch-lines)" />
            </svg>
          </div>

          {/* Title Header */}
          <div className="sticky top-16 sm:top-18 z-20 bg-white/95 backdrop-blur-sm px-6 sm:px-8 lg:px-8 pt-6 sm:pt-8 lg:pt-4 pb-6 sm:pb-8 lg:pb-4 border-b-4 border-black">
            <div className="w-full max-w-lg lg:max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Decorative snowflakes */}
                <div className="absolute top-20 left-4 text-[#dc2626] text-2xl lg:text-3xl animate-pulse">❄</div>
                <div className="absolute top-20 right-6 text-[#39ff14] text-xl lg:text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✦</div>
                
                <h1 className="relative font-dancing-script text-6xl sm:text-7xl lg:text-7xl leading-none tracking-tight bg-linear-to-r from-[#dc2626] via-[#b91c1c] to-[#dc2626] bg-clip-text text-transparent drop-shadow-lg" 
                  style={{ 
                    textShadow: '3px 3px 0 rgba(0,0,0,0.1)',
                    WebkitTextStroke: '1px rgba(0,0,0,0.1)'
                  }}>
                  Vanita Leo
                </h1>
                <div className="flex items-center gap-3 lg:gap-3 mt-3 lg:mt-2">
                  <div className="h-1 lg:h-1 flex-1 bg-linear-to-r from-[#dc2626] via-[#39ff14] to-[#dc2626] rounded-full" />
                  <p className="relative text-3xl sm:text-4xl lg:text-4xl font-black uppercase tracking-[0.2em] lg:tracking-[0.2em] text-[#dc2626] flex items-center gap-2 lg:gap-2" 
                    style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #39ff14' }}>
                    <span className="text-[#39ff14]">🎄</span>
                    Christmas
                    <span className="text-[#39ff14]">🎄</span>
                  </p>
                  <div className="h-1 lg:h-1 flex-1 bg-linear-to-r from-[#dc2626] via-[#39ff14] to-[#dc2626] rounded-full" />
                </div>
                <p className="text-xs sm:text-sm lg:text-sm font-black uppercase tracking-[0.4em] lg:tracking-[0.4em] text-black/70 mt-2 lg:mt-1 text-center">
                  Laptop Giveaway Event
                </p>
                
                {/* Partner Ornaments */}
                <div className="mt-3 lg:mt-2 md:-mb-2 lg:-mb-1">
                  <p className="text-[10px] sm:text-xs lg:text-xs font-bold uppercase tracking-[0.3em] text-black/40 text-center mb-1.5 lg:mb-1">
                    Partners & Sponsors
                  </p>
                  <div className="flex items-center justify-center gap-0 lg:gap-3 mx-auto" style={{ maxWidth: 'fit-content' }}>
                    {[
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-434.png", alt: "434 MEDIA", url: "https://www.434media.com/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-vv.png", alt: "Vemos Vamos", url: "https://vemosvamos.com/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-levantatech.png", alt: "Levántatech", url: "https://levantatech.org/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-devsa.png", alt: "DEVSA", url: "https://devsa.community/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-human.png", alt: "Human I-T", url: "https://www.humanit.org/", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-sdoh.png", alt: "SDOH", url: "https://www.434media.com/en/sdoh", large: true },
                      { src: "https://ampd-asset.s3.us-east-2.amazonaws.com/christmas/flyers-46-velocity.png", alt: "Velocity TX", url: "https://velocitytx.org/", large: true },
                    ].map((ornament, index) => (
                      <motion.a
                        key={ornament.alt}
                        href={ornament.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Visit ${ornament.alt}`}
                        className="block"
                        initial={{ opacity: 0, y: -10, rotate: -5 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotate: index % 2 === 0 ? 3 : -3 
                        }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.1 * index,
                          ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.15 }}
                      >
                        <img
                          src={ornament.src}
                          alt={ornament.alt}
                          className={`${ornament.large ? 'w-14 h-14 md:w-20 md:h-20' : 'w-10 h-10 lg:w-10 lg:h-10'} object-cover md:object-contain`}
                          style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                          }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="relative px-6 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-8">
            <div className="w-full max-w-lg lg:max-w-xl">
              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6 sm:mb-8 p-3 sm:p-4 bg-white border-2 border-black relative"
                style={{ boxShadow: '4px 4px 0 #000' }}
              >
                {/* Decorative corner accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#dc2626]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#39ff14]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#39ff14]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#dc2626]" />
                
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#dc2626] shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-black text-black text-sm sm:text-base mb-1 uppercase tracking-wide">A Critical Step Toward Closing the Digital Divide</h2>
                    <p className="text-xs sm:text-sm text-black leading-relaxed">
                      Aligned with our work on the <a href="https://www.434media.com/en/sdoh" className="underline font-bold">Social Determinants of Health (SDOH)</a>, this initiative provided essential technology to aspiring women in tech from historically under-resourced San Antonio communities—expanding access, opportunity, and economic mobility this holiday season.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Video Recap with Thank You Lead */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border-4 border-black relative overflow-hidden"
                style={{ boxShadow: '6px 6px 0 #000' }}
              >
                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#dc2626] z-10" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#39ff14] z-10" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#39ff14] z-10" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#dc2626] z-10" />
                
                {/* Thank You Lead Text */}
                <div className="p-4 sm:p-6 border-b-2 border-black bg-white">
                  <p className="text-sm sm:text-base text-black leading-relaxed text-center">
                    Thank you to everyone who participated in our <span className="font-black text-[#dc2626]">Vanita Leo Christmas Laptop Giveaway</span>! Together, we helped 50+ aspiring women in tech take their next step forward.
                  </p>
                </div>
                
                <div className="aspect-4/5 w-full bg-black">
                  <video
                    src="https://ampd-asset.s3.us-east-2.amazonaws.com/434+Media+Laptop+Giveaway.MOV"
                    controls
                    playsInline
                    className="vanita-video w-full h-full object-cover"
                    poster="https://ampd-asset.s3.us-east-2.amazonaws.com/vanita-xmas.jpg"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
