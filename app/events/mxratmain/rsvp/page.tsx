"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Check, Loader2, ArrowDown } from "lucide-react"
import YouTubeModal from "@/components/youtube-modal"

export default function MxrAtMainRsvpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    joinFeed: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/christmas-rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      setIsSuccess(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="md:min-h-screen w-full bg-white text-black pt-16">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)] w-full overflow-hidden bg-linear-to-b from-[#c41e3a] to-[#4a0b16] md:bg-white md:from-white md:to-white">
        {/* Mobile View */}
        <div className="md:hidden relative w-full h-full flex items-center justify-center">
          <div className="relative w-full h-[480px]">
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxr-rsvp-mobile.jpg"
              alt="MXR@MAIN RSVP Mobile"
              fill
              className="object-contain object-center"
              priority
            />
            
            {/* Mobile Easter Egg Trigger */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 z-20 cursor-pointer flex items-center justify-center"
              onClick={() => setIsEasterEggOpen(true)}
            >
              <div className="w-6 h-6 rounded-full bg-[#c41e3a]/90 shadow-[0_0_50px_25px_rgba(255,255,255,0.4)] animate-pulse blur-xl" />
            </div>

            {/* Mobile Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-4 right-2 z-20 text-white animate-bounce bg-black/20 backdrop-blur-sm p-2 rounded-full"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex relative w-full h-full items-center justify-center p-12">
          <div className="relative w-full h-full">
            <Image
              src="https://ampd-asset.s3.us-east-2.amazonaws.com/mxr-rsvp-desktop.jpg"
              alt="MXR@MAIN RSVP Desktop"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            
            {/* Easter Egg Trigger */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 z-20 cursor-pointer group flex items-center justify-center"
              onClick={() => setIsEasterEggOpen(true)}
            >
              <div className="w-32 h-32 rounded-full bg-white/0 group-hover:bg-white/20 group-hover:shadow-[0_0_80px_40px_rgba(255,255,255,0.5)] transition-all duration-700 ease-in-out blur-2xl" />
            </div>

            {/* Desktop Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-6 right-40 z-20 text-white animate-bounce bg-black/20 backdrop-blur-sm p-3 rounded-full"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="rsvp-form" className="relative py-12 md:py-20 px-4 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h1 className="font-menda-black flex flex-col items-center w-fit mx-auto mb-4 md:mb-6">
            <span className="block text-[#c41e3a] text-[4.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[11.9rem] leading-[0.9] tracking-tighter">
              MXR
            </span>
            <span className="block text-[#c41e3a] text-5xl md:text-7xl lg:text-[8rem] leading-[0.85] tracking-tighter -mt-2 lg:-mt-4">
              @MAIN
            </span>
          </h1>
          
          <div className="flex flex-col items-center gap-3 md:gap-6 max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 md:gap-6 text-lg sm:text-xl md:text-2xl font-bold text-black uppercase tracking-tight leading-tight">
              <span className="whitespace-nowrap">Dec 12, 2025</span>
              <span className="text-[#c41e3a]">•</span>
              <span className="whitespace-nowrap">6-10 PM</span>
              <span className="hidden md:inline text-[#c41e3a]">•</span>
              <span className="whitespace-nowrap w-full md:w-auto">300 Main Rooftop</span>
            </div>
            
            <p className="text-sm sm:text-lg md:text-xl text-black/80 font-medium leading-snug md:leading-relaxed">
              Bring an unwrapped children's toy (ages 2+)
              <span className="block text-[#c41e3a] font-bold tracking-tight md:tracking-normal">
                Donations to benefit the Good Hood Affordable Christmas
              </span>
            </p>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#228b22]/10 border border-[#228b22]/20 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-[#228b22] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#228b22] mb-2">You're on the list!</h3>
              <p className="text-black/70">
                Thanks for RSVPing. We can't wait to see you there.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-black/60">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c41e3a] focus:border-transparent transition-all"
                  placeholder="Santa Claus"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-black/60">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c41e3a] focus:border-transparent transition-all"
                  placeholder="santa@northpole.com"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="joinFeed"
                    type="checkbox"
                    checked={formData.joinFeed}
                    onChange={(e) => setFormData({ ...formData, joinFeed: e.target.checked })}
                    className="w-5 h-5 text-[#c41e3a] border-gray-300 rounded focus:ring-[#c41e3a] accent-[#c41e3a]"
                  />
                </div>
                <label htmlFor="joinFeed" className="text-sm text-black/70 leading-tight cursor-pointer select-none">
                  Connect to THE FEED and experience why <strong>Digital Canvas</strong> is the <strong>Creative Bridge to Everything!</strong>
                </label>
              </div>

              {error && (
                <div className="text-[#c41e3a] text-sm font-medium text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#c41e3a] text-white font-bold text-lg uppercase tracking-widest hover:bg-[#a31a2f] transition-colors duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm RSVP"
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <YouTubeModal 
        isOpen={isEasterEggOpen} 
        onClose={() => setIsEasterEggOpen(false)} 
        videoId="ey0PZpeAIqU" 
        title="Caballito (visualizer)"
        artist="Vanita Leo"
      />
    </main>
  )
}
