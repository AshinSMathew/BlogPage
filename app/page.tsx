"use client";

import { SimpleNavbarWithHoverEffects } from "@/components/blocks/navbars/simple-navbar-with-hover-effects";
import BlogHeroSection from "@/components/blog-hero-section";
import FeaturedPostsSidebar from "@/components/featured-post-sidebar";
import RecentPostsSection, { Post } from "@/components/recent-post-section";
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

  const handleAllPostsClick = () => {
    alert(`Navigate to all posts page! Total posts available: ${allPosts.length}`);
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

        <RecentPostsSection
          onPostClick={handlePostClick}
          onAllPostsClick={handleAllPostsClick}
          className="pb-16 pt-8 md:pb-24 md:pt-12"
        />

        {/* Loading indicator */}
        {loading && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
            Loading posts...
          </div>
        )}
      </main>

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