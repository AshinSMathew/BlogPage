"use client";
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

export function SimpleNavbarWithHoverEffects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "Homepage", link: "/" },
    { name: "About us", link: "/about" },
    { name: "Features", link: "/features" },
    { name: "Blog", link: "/blog" },
    { name: "Contact us", link: "/contact" },
    { name: "Demo", link: "/demo" },
  ];

  return (
    <motion.nav
      onMouseLeave={() => setHovered(null)}
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:ml-20">
            <div className="flex items-center space-x-1">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`nav-${idx}`}
                  href={navItem.link}
                  onMouseEnter={() => setHovered(idx)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900"
                >
                  {hovered === idx && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 rounded-lg bg-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                  <span className="relative z-10">{navItem.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Desktop Get Started Button */}
          <div className="hidden lg:flex lg:items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Get Started
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <div className="flex flex-col space-y-1">
                {navItems.map((navItem, idx) => (
                  <Link
                    key={`mobile-nav-${idx}`}
                    href={navItem.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
                  >
                    {navItem.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-xl font-bold text-gray-900"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2L22 20H2L12 2Z"
            fill="currentColor"
          />
          <path
            d="M12 8L18 18H6L12 8Z"
            fill="white"
            fillOpacity="0.3"
          />
        </svg>
      </div>
      <span className="font-bold text-gray-900">Beyond UI</span>
    </Link>
  );
};

export default SimpleNavbarWithHoverEffects;
