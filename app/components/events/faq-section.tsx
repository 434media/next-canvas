"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { faqs } from "../../data/prompt-to-product"

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-neutral-800/50 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-white/20 transition-colors duration-300"
        >
          <motion.button
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-white font-medium">{faq.question}</span>
            <motion.i
              className="ri-arrow-down-s-line text-white/70"
              animate={{ rotate: openFAQ === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <AnimatePresence>
            {openFAQ === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-white/70 leading-relaxed">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

export default FAQSection
