"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ComponentProps, useEffect, useState } from "react"

interface FeaturedPost {
  id: string
  title: string
  content: string
  image: string
  createdAt: string
}

const truncateTitle = (title: string, maxLength: number = 60): string => {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength).trim() + '...';
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export default function FeaturedPostsSidebar(props: ComponentProps<"div">) {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
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
      setFeaturedPosts(data.slice(3, 7));
    } catch (err) {
      console.error('Error fetching featured posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch featured posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-surface" {...props}>
        <div className="space-y-4 p-6">
          <h2 className="text-base font-semibold text-primary">Other featured posts</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-start gap-3 p-3">
                <div className="h-[60px] w-[60px] bg-gray-300 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-surface" {...props}>
        <div className="space-y-4 p-6">
          <h2 className="text-base font-semibold text-primary">Other featured posts</h2>
          <div className="text-center py-8">
            <p className="text-sm text-red-600 mb-4">Error loading posts: {error}</p>
            <button 
              onClick={fetchFeaturedPosts}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="w-full bg-surface" {...props}>
      <div className="space-y-4 p-6">
        <h2 className="text-base font-semibold text-primary">Other featured posts</h2>
        
        <div className="space-y-3">
          {featuredPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="#"
              className="group flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-muted/20 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={(e) => {
                e.preventDefault();
                alert(`Featured post clicked: ${post.title}`);
              }}
            >
              <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-md">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-medium text-primary leading-snug line-clamp-2 group-hover:text-primary">
                  {truncateTitle(post.title)}
                </h3>
                <p className="mt-1 text-xs text-secondary">{formatDate(post.createdAt)}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {featuredPosts.length === 0 && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No featured posts available</p>
          </div>
        )}
      </div>
    </div>
    </>
  )
}