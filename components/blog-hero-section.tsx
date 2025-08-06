"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock } from 'lucide-react'
import { useEffect, useState } from "react"

interface HeroPost {
  id: string
  title: string
  content: string
  image: string
  createdAt: string
}

const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

const truncateContent = (content: string, maxLength: number = 150): string => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}

export default function BlogHeroSection() {
  const [heroPost, setHeroPost] = useState<HeroPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroPost();
  }, []);

  const fetchHeroPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
      if (!projectSecret) {
        throw new Error('Project secret not found in environment variables');
      }

      const response = await fetch(`https://${projectSecret}.mockapi.io/api/post`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.length > 0) {
        setHeroPost(data[0]);
      }
    } catch (err) {
      console.error('Error fetching hero post:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch hero post');
      setHeroPost({
        id: '1',
        title: 'Unlocking Business Efficiency with SaaS Solutions',
        content: 'Discover how modern SaaS solutions are revolutionizing business operations and driving unprecedented efficiency gains across industries.',
        image: '/placeholder.svg?height=800&width=1400',
        createdAt: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReadMoreClick = () => {
    if (heroPost) {
      alert(`Read more about: ${heroPost.title}`);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gray-200 animate-pulse">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] xl:aspect-[24/9]">
              <div className="h-full w-full bg-gray-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 xl:p-16">
                  <div className="max-w-2xl space-y-4">
                    <div className="h-6 bg-gray-400/50 rounded-full w-24"></div>
                    <div className="space-y-3">
                      <div className="h-8 sm:h-10 lg:h-12 bg-gray-400/50 rounded w-full"></div>
                      <div className="h-8 sm:h-10 lg:h-12 bg-gray-400/50 rounded w-3/4"></div>
                    </div>
                    <div className="h-5 bg-gray-400/50 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && !heroPost) {
    return (
      <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-red-50 border border-red-200">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] xl:aspect-[24/9] flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-red-600 mb-4 text-sm sm:text-base">Error loading hero post: {error}</p>
                <button 
                  onClick={fetchHeroPost}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroPost) {
    return (
      <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gray-100">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] xl:aspect-[24/9] flex items-center justify-center">
              <p className="text-gray-500 text-sm sm:text-base">No hero post available</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
          className="group relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
        >
          {/* Hero Image Container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] xl:aspect-[24/9]">
            <img
              src={heroPost.image || "/placeholder.svg"}
              alt={heroPost.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=800&width=1400";
              }}
            />
            
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            
            {/* Content Container - Bottom Left Positioning */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-4 sm:p-6 lg:p-8 xl:p-10">
                <div className="max-w-3xl">
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-4 sm:mb-6"
                  >
                    <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-900 shadow-lg">
                      Business
                    </span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-4 sm:mb-6 font-bold leading-tight text-white"
                    style={{
                      fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                      lineHeight: '1.2'
                    }}
                  >
                    {heroPost.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mb-4 sm:mb-6 max-w-xl text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed"
                  >
                    {truncateContent(heroPost.content)}
                  </motion.p>

                  {/* Action Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                  >
                    {/* Read More Button */}
                    <button 
                      onClick={handleReadMoreClick}
                      className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 sm:px-6 sm:py-3 font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
                    >
                      <span className="text-xs sm:text-sm">Read Full Article</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                    
                    {/* Reading Time */}
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        {calculateReadTime(heroPost.content)}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle Hover Enhancement */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
        </motion.article>
      </div>
    </section>
  )
}
