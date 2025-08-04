"use client"

import { forwardRef, useEffect, useState } from "react"
import { ArrowRight, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface Post {
  id: string
  title: string
  content: string
  image: string
  createdAt: string
}

interface RecentPostsSectionProps {
  posts?: Post[]
  onPostClick?: (post: Post) => void
  onAllPostsClick?: () => void
  className?: string
}

const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const truncateContent = (content: string, maxLength: number = 150): string => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}

const PostCard = forwardRef<HTMLDivElement, { post: Post; onPostClick?: (post: Post) => void }>(
  ({ post, onPostClick }, ref) => {
    const handleClick = () => {
      onPostClick?.(post)
    }

    return (
      <div 
        ref={ref}
        className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        onClick={handleClick}
      >
        <div className="aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center rounded-full bg-black/90 px-3 py-1 text-xs font-medium text-white/90">
              Blog Post
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold leading-tight text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {post.title}
          </h3>
          
          <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
            {truncateContent(post.content)}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{calculateReadTime(post.content)}</span>
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

PostCard.displayName = "PostCard"

const RecentPostsSection = forwardRef<HTMLDivElement, RecentPostsSectionProps>(
  ({ 
    posts: propsPosts, 
    onPostClick, 
    onAllPostsClick,
    className = "" 
  }, ref) => {
    const [posts, setPosts] = useState<Post[]>(propsPosts || []);
    const [loading, setLoading] = useState(!propsPosts);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!propsPosts) {
        fetchPosts();
      }
    }, [propsPosts]);

    const fetchPosts = async () => {
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
        setPosts(data.slice(0,3));
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return (
        <section ref={ref} className={`w-full py-20 ${className}`}>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Recent Posts
              </h2>
              <p className="mt-2 text-gray-600">
                Stay updated with the latest insights and trends
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 rounded-lg aspect-[16/10] mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (error) {
      return (
        <section ref={ref} className={`w-full py-20 ${className}`}>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
                Recent Posts
              </h2>
              <p className="text-red-600 mb-4">Error loading posts: {error}</p>
              <button 
                onClick={fetchPosts}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section ref={ref} className={`w-full py-20 ${className}`}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Recent Posts
              </h2>
              <p className="mt-2 text-gray-600">
                Stay updated with the latest insights and trends
              </p>
            </div>
            
            <Link 
              href="/blog"
              className="group inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
              onClick={(e) => {
                e.preventDefault()
                onAllPostsClick?.()
              }}
            >
              <span>All Posts</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onPostClick={onPostClick}
              />
            ))}
          </div>

          {/* Mobile View All Link - Hidden on larger screens */}
          <div className="mt-12 text-center md:hidden">
            <Link 
              href="/blog"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
              onClick={(e) => {
                e.preventDefault()
                onAllPostsClick?.()
              }}
            >
              <span>View all posts</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    )
  }
)

RecentPostsSection.displayName = "RecentPostsSection"

export default RecentPostsSection