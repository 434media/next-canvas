"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import AboutConstellation from "../../components/about-constellation"

const ACCENT = "#fbbf24"

const partners = [
  {
    name: "DevSA",
    role: "Community · Venue · Audience",
    logo: "https://devsa-assets.s3.us-east-2.amazonaws.com/devsa-logo.svg",
    href: "https://www.devsa.community/",
    description:
      "A 501(c)(3) bridging San Antonio's tech community — 20+ affiliated groups, monthly programming, and a downtown coworking space. DevSA hosts the workshop weekends and opens its coworking to the cohort for the six-week bridge. Their existing message — \"find your people, build your future\" — wraps every Digital Canvas program.",
    invert: false,
  },
  {
    name: "Capital Partner",
    role: "Capital · Pitch Coaching · Investor Network",
    logoText: "Capital",
    description:
      "An accredited investor network is our third pillar — convening the investor audience for demo day, contributing pitch coaching to cohort builders, and continuing post-demo conversations. The capital partner for cohort 1 is in active conversation; announcement coming.",
    placeholder: true,
  },
  {
    name: "434 Media",
    role: "Program Operator · Underwriter Sales · Media",
    logo: "https://storage.googleapis.com/groovy-ego-462522-v2.firebasestorage.app/434media-light.svg",
    href: "https://434media.com/",
    description:
      "Recruits and closes cohort underwriters. Coordinates operations across partners. Produces the media around every cohort — builder profiles, demo day footage, recap content. Owns the Digital Canvas brand and entity.",
    invert: false,
  },
]

const founders = [
  {
    name: "Marcos Resendez",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2Fdc-marcos.jpeg?alt=media",
    grayscale: false,
    badges: [
      "Founder & CEO, 434 Media",
      "CEO, The AMPD Project",
      "Angel Investor",
    ],
    bio: "Producer. Promoter. Connector. Marcos runs 434 Media and The AMPD Project — opening arts pathways for socially disadvantaged San Antonio youth, backed by two decades in media, telecommunications, and live event production. Based in San Antonio.",
    linkedin: "https://www.linkedin.com/in/marcosresendez/",
  },
  {
    name: "Jesse Hernandez",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/groovy-ego-462522-v2.firebasestorage.app/o/digitalcanvas%2Fdc-jesse.jpeg?alt=media",
    grayscale: true,
    badges: [
      "Founder, DEVSA",
      "Full-Stack Engineer, 434 Media",
    ],
    bio: "Jesse builds the custom browser experiences and API-backed workflows behind 434 Media's brand storytelling, and runs DEVSA to deepen the local developer community. The connective tissue between creative strategy and shipped code. Based in San Antonio.",
    linkedin: "https://www.linkedin.com/in/jessebubble/",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-[#050505]">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 overflow-hidden">
        {/* Constellation field — sparse amber dots + lines, cursor lights up the network */}
        <AboutConstellation />

        <div
          className="absolute top-0 right-0 w-1/2 h-1/2 blur-[200px] pointer-events-none"
          style={{ backgroundColor: `${ACCENT}0d` }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${ACCENT}66, transparent)`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold"
              style={{ color: ACCENT }}
            >
              About
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-(family-name:--font-geist-pixel-square) text-3xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide leading-[1.15] font-black mb-6 max-w-4xl"
          >
            Built in San Antonio.{" "}
            <span className="text-white/30 font-medium">
              Operated by the partners who already run the ecosystem.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mb-10"
          >
            Digital Canvas isn't a new institution. It's a program layer
            connecting two pipelines that already exist — DevSA's tech community
            and an accredited investor network — with industry underwriters in
            between. The infrastructure is in place. We're the connecting tissue.
          </motion.p>
        </div>
      </section>

      {/* Founders */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              Founded &amp; Operated By
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Marcos Resendez &amp; Jesse Hernandez.{" "}
              <span className="text-white/30 font-medium">
                Two San Antonio operators bringing 434 Media and DEVSA
                into a single builder program.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="bg-[#0a0a0a] border border-[#222] p-6 md:p-8 flex flex-col"
              >
                {/* Founder portrait */}
                <div className="relative aspect-square bg-[#111] border border-[#222] overflow-hidden mb-6">
                  <Image
                    src={founder.photo}
                    alt={`${founder.name} portrait`}
                    fill
                    className={`object-cover ${founder.grayscale ? "grayscale" : ""}`}
                    sizes="(max-width: 768px) 100vw, 400px"
                    unoptimized
                  />
                </div>

                <h3 className="font-(family-name:--font-geist-pixel-square) text-xl md:text-2xl uppercase tracking-tight text-white font-black mb-4">
                  {founder.name}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {founder.badges.map((badge) => (
                    <span
                      key={badge}
                      className="font-mono text-[10px] uppercase tracking-[0.25em] border px-3 py-1.5"
                      style={{
                        color: ACCENT,
                        borderColor: `${ACCENT}40`,
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 flex-1">
                  {/* PLACEHOLDER: Replace with the founder's full bio. */}
                  {founder.bio}
                </p>

                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-[0.25em] font-mono transition-colors"
                >
                  Connect on LinkedIn
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Partners */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              The Partners
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Three organizations.{" "}
              <span className="text-white/30 font-medium">
                One coordinated program. Each partner brings something the other two can't.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-px bg-[#222] border border-[#222]">
            {partners.map((partner, i) => {
              const inner = (
                <>
                  <div className="md:col-span-4 flex md:justify-start justify-center">
                    <div className="relative w-40 md:w-48 h-16 flex items-center justify-center">
                      {partner.placeholder ? (
                        <span className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-3xl uppercase tracking-wide text-white/35">
                          {partner.logoText}
                        </span>
                      ) : (
                        <Image
                          src={partner.logo!}
                          alt={`${partner.name} logo`}
                          fill
                          className={`object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200 ${partner.invert ? "invert" : ""}`}
                          sizes="192px"
                          unoptimized
                        />
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-2">
                      {partner.name}
                    </h3>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
                      style={{ color: ACCENT }}
                    >
                      {partner.role}
                    </p>
                    <p className="text-white/50 text-sm md:text-base leading-[1.75]">
                      {partner.description}
                    </p>
                  </div>
                </>
              )

              const sharedClass =
                "group bg-[#0a0a0a] p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start transition-colors duration-300 hover:bg-[#111]"
              const sharedMotion = {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-60px" },
                transition: { duration: 0.5, delay: i * 0.1 },
              }

              return partner.placeholder ? (
                <motion.div
                  key={partner.name}
                  {...sharedMotion}
                  className={sharedClass}
                >
                  {inner}
                </motion.div>
              ) : (
                <motion.a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sharedMotion}
                  className={sharedClass}
                >
                  {inner}
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="relative py-20 md:py-28 px-6 border-t border-[#222]">
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="font-(family-name:--font-geist-pixel-square) text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-bold"
              style={{ color: ACCENT }}
            >
              Get in touch
            </p>
            <h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
              Two doors.{" "}
              <span className="text-white/30 font-medium">
                Pick the one that fits your conversation.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
            {/* General inquiries */}
            <div className="bg-[#0a0a0a] p-8 md:p-10 flex flex-col">
              <p
                className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] font-bold mb-4"
                style={{ color: ACCENT }}
              >
                General
              </p>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                Press, ecosystem partners, builders
              </h3>
              <p className="text-white/50 text-sm leading-[1.75] mb-6 flex-1">
                Coverage requests, ecosystem co-promotion, mentor sign-ups,
                general questions about the program — start here.
              </p>
              <a
                href="mailto:hello@434media.com?subject=Digital%20Canvas%20Inquiry"
                className="group inline-flex items-center justify-between gap-3 border border-[#333] text-white/70 hover:text-white hover:border-white/50 px-5 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-200"
              >
                {/* PLACEHOLDER: Confirm general inquiries inbox. Default hello@434media.com used. */}
                hello@434media.com
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Underwriter inquiries */}
            <div className="bg-[#0a0a0a] p-8 md:p-10 flex flex-col">
              <p
                className="font-(family-name:--font-geist-pixel-square) text-[10px] uppercase tracking-[0.25em] text-[#FF006E] font-bold mb-4"
              >
                Underwriters
              </p>
              <h3 className="font-(family-name:--font-geist-pixel-square) text-sm md:text-base uppercase tracking-[0.2em] text-white font-bold mb-3">
                Corporate sponsorship
              </h3>
              <p className="text-white/50 text-sm leading-[1.75] mb-6 flex-1">
                Underwrite a vertical cohort, claim named exclusivity, get
                first-look access to the talent pipeline. Marcos handles these
                conversations directly.
              </p>
              <a
                href="mailto:build@434media.com?subject=Digital%20Canvas%20Underwriter%20Inquiry"
                className="group inline-flex items-center justify-between gap-3 bg-[#FF006E] text-black px-5 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-200"
              >
                build@434media.com
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Powered by */}
      <section className="relative py-16 md:py-20 px-6 border-t border-[#222] text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
          Powered by
        </p>
        <p className="font-(family-name:--font-geist-pixel-square) text-white/70 text-sm md:text-base tracking-wide">
          DevSA · Capital Partner · 434 Media
        </p>
      </section>
    </div>
  )
}
