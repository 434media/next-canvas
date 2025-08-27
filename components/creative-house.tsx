"use client"

import { motion } from "motion/react"

export default function CreativeHouse() {
  return (
    <section className="w-full h-full py-16 px-4 flex justify-center">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-white border-2 border-black p-8 md:p-10 transform -rotate-1 shadow-lg overflow-hidden"
          style={{
            filter: "drop-shadow(4px 4px 0px black)",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(https://ampd-asset.s3.us-east-2.amazonaws.com/finesilver.jpg)",
            }}
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="text-white font-black mb-6 text-xl md:text-2xl uppercase tracking-wider drop-shadow-lg font-sans"
            >
              Our Creative House
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              className="space-y-4 max-w-lg"
            >
              <div className="text-white">
                <p className="font-bold text-lg md:text-xl drop-shadow-md font-sans">FINESILVER</p>
                <p className="text-white/90 text-base md:text-lg drop-shadow-md font-sans leading-relaxed">
                  816 Camaron St, San Antonio, TX, USA
                </p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                className="text-white/85 text-sm md:text-base leading-relaxed drop-shadow-md font-sans"
              >
                Come explore our creative space where innovation meets collaboration. Join our team in bringing digital
                visions to life.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
