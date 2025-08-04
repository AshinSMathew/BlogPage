"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
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

const truncateContent = (content: string, maxLength: number = 200): string => {
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
      <section className="w-full bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="group relative overflow-hidden rounded-2xl bg-surface animate-pulse">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <div className="h-full w-full bg-gray-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-400 rounded w-20"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-400 rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="group relative overflow-hidden rounded-2xl bg-surface">
            <div className="relative aspect-[16/9] md:aspect-[21/9] flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <p className="text-red-600 mb-4">Error loading hero post: {error}</p>
                <button 
                  onClick={fetchHeroPost}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
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
      <section className="w-full bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="group relative overflow-hidden rounded-2xl bg-surface">
            <div className="relative aspect-[16/9] md:aspect-[21/9] flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">No hero post available</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              src={heroPost.image}
              alt={heroPost.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback image if the API image fails to load
                e.currentTarget.src = "/blog.jpg";
              }}
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
                  Featured Post
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4 font-sans text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl"
              >
                {heroPost.title}
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-6 font-sans text-base text-gray-200 md:text-lg lg:max-w-3xl lg:text-xl"
              >
                {truncateContent(heroPost.content)}
              </motion.p>

              {/* Read More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center space-x-3"
              >
                <button 
                  onClick={handleReadMoreClick}
                  className="group/btn inline-flex items-center space-x-2 rounded-lg bg-white px-4 py-2.5 font-sans text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </button>
                
                <span className="font-sans text-sm text-gray-300">
                  {calculateReadTime(heroPost.content)}
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