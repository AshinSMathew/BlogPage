"use client"

import { useState, useEffect } from "react"
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react"
import PostCard, { Post } from "./post-card"

interface PostsGridProps {
  onPostClick?: (post: Post) => void
  className?: string
}

export default function PostsGrid({ onPostClick, className = "" }: PostsGridProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);

  useEffect(() => {
    fetchPosts(3);
  }, []);

  const fetchPosts = async (limit?: number) => {
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
      setPosts(limit ? data.slice(0, limit) : data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePosts = async () => {
    if (!showAllPosts) {
      await fetchPosts();
      setShowAllPosts(true);
    } else {
      await fetchPosts(3);
      setShowAllPosts(false);
    }
  };

  const handleRetry = () => {
    fetchPosts(showAllPosts ? undefined : 3);
  };

  if (loading) {
    return (
      <section className={`w-full py-20 ${className}`}>
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
              <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">
                <div className="aspect-[16/10] bg-gray-300"></div>
                <div className="flex flex-col flex-1 p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-full"></div>
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-300 rounded w-12"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
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
      <section className={`w-full py-20 ${className}`}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Recent Posts
              </h2>
              <p className="mt-2 text-gray-600">
                Stay updated with the latest insights and trends
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Failed to Load Posts
                </h3>
                <p className="text-red-600 mb-4 text-sm">{error}</p>
                <button 
                  onClick={handleRetry}
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className={`w-full py-20 ${className}`}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
              Recent Posts
            </h2>
            <p className="text-gray-600">No posts available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {showAllPosts ? 'All Posts' : 'Recent Posts'}
            </h2>
            <p className="mt-2 text-gray-600">
              {showAllPosts ? 'Browse all our articles' : 'Stay updated with the latest insights and trends'}
            </p>
          </div>
          
          <button
            className="group inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleTogglePosts}
          >
            <span>{showAllPosts ? 'Show Less' : 'All Posts'}</span>
            <ArrowRight className={`h-4 w-4 transition-transform ${showAllPosts ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
          </button>
        </div>

        {/* Posts Grid - Vertical Layout */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onPostClick={onPostClick}
            />
          ))}
        </div>

        {/* Mobile View All Link */}
        {!showAllPosts && (
          <div className="mt-12 text-center md:hidden">
            <button
              className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              onClick={handleTogglePosts}
            >
              <span>View all posts</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}