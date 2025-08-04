"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ComponentProps } from "react"

interface FeaturedPost {
  id: string
  title: string
  category: string
  imageUrl: string
  href: string
}

const featuredPosts: FeaturedPost[] = [
  {
    id: "1",
    title: "Revolutionizing industries through SaaS implementation",
    category: "SaaS",
    imageUrl: "/blog.jpg",
    href: "#"
  },
  {
    id: "2",
    title: "Synergizing SaaS and UX design for elevating digital experiences",
    category: "UI/UX",
    imageUrl: "/blog.jpg",
    href: "#"
  },
  {
    id: "3",
    title: "Navigating SaaS waters with intuitive UI and UX",
    category: "UI/UX",
    imageUrl: "/blog.jpg",
    href: "#"
  },
  {
    id: "4",
    title: "Sculpting SaaS success - the art of UI and UX design",
    category: "UI/UX",
    imageUrl: "/blog.jpg",
    href: "#"
  },
  {
    id: "5",
    title: "Transforming SaaS platforms - a UI/UX design odyssey",
    imageUrl: "/blog.jpg",
    category: "UI/UX",
    href: "#"
  }
]

export default function FeaturedPostsSidebar(props: ComponentProps<"div">) {
  return (
    <div className="w-full bg-surface" {...props}>
      <div className="space-y-4 p-6">
        <h2 className="text-base font-semibold text-primary">Other featured posts</h2>
        
        <div className="space-y-3">
          {featuredPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.href}
              className="group flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-muted/20 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-md">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-medium text-primary leading-snug line-clamp-2 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-1 text-xs text-secondary">{post.category}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}