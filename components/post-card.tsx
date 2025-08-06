"use client"

import { Clock } from "lucide-react"

export interface Post {
  id: string
  title: string
  content: string
  image: string
  createdAt: string
}

interface PostCardProps {
  post: Post
  onPostClick?: (post: Post) => void
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

const truncateContent = (content: string, maxLength: number = 120): string => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}

export default function PostCard({ post, onPostClick }: PostCardProps) {
  const handleClick = () => {
    onPostClick?.(post)
  }

  return (
    <article 
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full"
      onClick={handleClick}
    >
      {/* Image Section - Top Half */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/blog.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
            Blog Post
          </span>
        </div>
      </div>

      {/* Content Section - Bottom Half */}
      <div className="flex flex-col flex-1 p-6">
        {/* Post Title */}
        <h3 className="text-lg font-semibold leading-tight text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
          {post.title}
        </h3>
        
        {/* Post Excerpt */}
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3 mb-4 flex-1">
          {truncateContent(post.content)}
        </p>

        {/* Post Meta - Author and Date */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">A</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span>{calculateReadTime(post.content)}</span>
              </div>
            </div>
          </div>
          
          {/* Date */}
          <div className="text-xs text-gray-500 text-right">
            {formatDate(post.createdAt)}
          </div>
        </div>
      </div>
    </article>
  )
}