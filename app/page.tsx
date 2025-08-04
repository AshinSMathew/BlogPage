"use client";

import { SimpleNavbarWithHoverEffects } from "@/components/blocks/navbars/simple-navbar-with-hover-effects";
import BlogHeroSection from "@/components/blog-hero-section";
import FeaturedPostsSidebar from "@/components/featured-post-sidebar";
import RecentPostsSection, { Post } from "@/components/recent-post-section";
import { useState } from "react";

export default function BlogHomepage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    // In a real application, you might navigate to a post detail page here
    alert(`Read more about: ${post.title}`);
  };

  const handleAllPostsClick = () => {
    alert("Navigating to all posts page!");
    // In a real application, you would navigate to the blog archive page
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
      </main>

      {/* Optionally, display selected post details or a modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-2xl font-bold">{selectedPost.title}</h3>
            <p className="text-gray-700">{selectedPost.description}</p>
            <button
              className="mt-6 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
              onClick={() => setSelectedPost(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}