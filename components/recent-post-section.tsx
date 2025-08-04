"use client"

import { forwardRef } from "react"
import { ArrowRight, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export interface Post {
  id: string
  title: string
  description: string
  image: string
  author: {
    name: string
    avatar: string
  }
  readTime: string
  category?: string
}

interface RecentPostsSectionProps {
  posts?: Post[]
  onPostClick?: (post: Post) => void
  onAllPostsClick?: () => void
  className?: string
}

const defaultPosts: Post[] = [
  {
    id: "1",
    title: "Mastering UI Elements: A Practical Guide for Designers",
    description: "Dive deep into the world of UI interfaces with our expert guides. Learn the latest trends and practical tips to elevate your design skills.",
    image: "/blog.jpg",
    author: {
      name: "Jennifer Taylor",
      avatar: "/blog.jpg"
    },
    readTime: "3 min read",
    category: "UI Design"
  },
  {
    id: "2",
    title: "Crafting Seamless Experiences: The Art of Intuitive UI Design",
    description: "Explore the principles and techniques behind user-centric UI design. Learn how to create interfaces that feel effortless and intuitive.",
    image: "/blog.jpg",
    author: {
      name: "Jennifer Taylor",
      avatar: "/blog.jpg"
    },
    readTime: "5 min read",
    category: "Design Systems"
  },
  {
    id: "3",
    title: "Beyond Aesthetics: The Power of Emotional UX Design",
    description: "Delve into the emotional aspects of UX design. Discover how to incorporate empathy and psychology into your design process.",
    image: "/blog.jpg",
    author: {
      name: "Ryan A.",
      avatar: "/blog.jpg"
    },
    readTime: "2 min read",
    category: "UX Psychology"
  }
]

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
          {post.category && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />
          )}
          {post.category && (
            <div className="absolute bottom-4 left-4">
              <span className="inline-flex items-center rounded-full bg-black/90 px-3 py-1 text-xs font-medium text-white/90">
                {post.category}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold leading-tight text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {post.title}
          </h3>
          
          <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
            {post.description}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
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
    posts = defaultPosts, 
    onPostClick, 
    onAllPostsClick,
    className = "" 
  }, ref) => {
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