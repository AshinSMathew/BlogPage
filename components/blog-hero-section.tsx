"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function BlogHeroSection() {
  return (
    <section className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group relative overflow-hidden rounded-2xl bg-surface"
        >
          {/* Background Image Container */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <img
              src="/blog.jpg"
              alt="Modern office workspace with person working at desk with laptops and office supplies"
              className="h-full w-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            
            {/* Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
              {/* Category Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-4 inline-block"
              >
                <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-black backdrop-blur-sm">
                  Business
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4 font-sans text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl"
              >
                Unlocking Business Efficiency with SaaS Solutions
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-6 font-sans text-base text-gray-200 md:text-lg lg:max-w-3xl lg:text-xl"
              >
                Discover how modern SaaS platforms are revolutionizing operational workflows and driving unprecedented efficiency across organizations worldwide.
              </motion.p>

              {/* Read More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center space-x-3"
              >
                <button className="group/btn inline-flex items-center space-x-2 rounded-lg bg-white px-4 py-2.5 font-sans text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20">
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
                
                <span className="font-sans text-sm text-gray-300">
                  7 min read
                </span>
              </motion.div>
            </div>
          </div>
          
          {/* Hover Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      </div>
    </section>
  )
}