"use client";

import { SimpleNavbarWithHoverEffects } from "@/components/blocks/navbars/simple-navbar-with-hover-effects";
import BlogHeroSection from "@/components/blog-hero-section";
import FeaturedPostsSidebar from "@/components/featured-post-sidebar";
import PostsGrid from "@/components/post-grid";
import { Post } from "@/components/post-card";
import { useState, useEffect } from "react";

export default function BlogHomepage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      
      const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
      if (!projectSecret) {
        console.error('Project secret not found in environment variables');
        return;
      }

      const response = await fetch(`https://${projectSecret}.mockapi.io/api/post`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error('Error fetching all posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-primary antialiased">
      <header className="sticky top-0 z-50 bg-white/90 py-4 shadow-sm backdrop-blur-md">
        <div className="container mx-auto px-4">
          <SimpleNavbarWithHoverEffects />
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3 md:py-16">
          <div className="col-span-1 md:col-span-2">
            <BlogHeroSection />
          </div>
          <div className="col-span-1">
            <FeaturedPostsSidebar className="rounded-xl shadow-sm md:py-8" />
          </div>
        </section>

        <PostsGrid
          onPostClick={handlePostClick}
          className="pb-16 pt-8 md:pb-24 md:pt-12"
        />
      </main>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Post Details</h2>
              <button
                className="rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={closeModal}
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Post Image */}
              <div className="mb-6 aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/blog.jpg";
                  }}
                />
              </div>

              {/* Post Meta */}
              <div className="mb-4 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">A</span>
                  </div>
                  <span>Admin</span>
                </div>
                <span>•</span>
                <span>{formatDate(selectedPost.createdAt)}</span>
                <span>•</span>
                <span>{calculateReadTime(selectedPost.content)}</span>
              </div>

              {/* Post Title */}
              <h1 className="mb-6 text-3xl font-bold text-gray-900 leading-tight">
                {selectedPost.title}
              </h1>

              {/* Post Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {selectedPost.content}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                <button
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Post URL copied to clipboard!');
                  }}
                >
                  Share Post
                </button>
                
                <button
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Statistics Footer */}
      {!loading && allPosts.length > 0 && (
        <footer className="bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">
              Showing latest posts • Total posts available: <span className="font-semibold">{allPosts.length}</span>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}