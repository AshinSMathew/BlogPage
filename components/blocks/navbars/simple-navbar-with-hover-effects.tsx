"use client";
import { cn } from "@/lib/utils";
import { Menu as IconMenu2, X as IconX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

export function SimpleNavbarWithHoverEffects() {
  return <Navbar />;
}

const Navbar = () => {
  const navItems = [
    { name: "Homepage", link: "#" },
    { name: "About us", link: "#" },
    { name: "Features", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Contact us", link: "#" },
    { name: "Demo", link: "#" },
  ];

  return (
    <div className="w-full">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </div>
  );
};

const DesktopNav = ({ navItems }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white px-4 py-2 lg:flex dark:bg-neutral-950",
        "sticky inset-x-0 top-40"
      )}
    >
      <Logo />
      <div className="hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-black transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
        {navItems.map((navItem: any, idx: number) => (
          <Link
            onMouseEnter={() => setHovered(idx)}
            className="relative px-4 py-2 text-secondary hover:text-primary dark:text-secondary dark:hover:text-primary"
            key={`link=${idx}`}
            href={navItem.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-muted"
              />
            )}
            <span className="relative z-20 text-black">{navItem.name}</span>
          </Link>
        ))}
      </div>
      <button className="hidden rounded-full bg-primary px-8 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:block">
        Get Started
      </button>
    </motion.div>
  );
};

const MobileNav = ({ navItems }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{ borderRadius: open ? "4px" : "2rem" }}
        key={String(open)}
        className="relative mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white px-4 py-2 lg:hidden dark:bg-neutral-950"
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Logo />
          {open ? (
            <IconX
              className="text-primary dark:text-primary"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <IconMenu2
              className="text-primary dark:text-primary"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-16 z-20 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 dark:bg-neutral-950"
            >
              {navItems.map((navItem: any, idx: number) => (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className="relative text-secondary hover:text-primary dark:text-secondary dark:hover:text-primary"
                >
                  <motion.span className="block text-black">{navItem.name}</motion.span>
                </Link>
              ))}
              <button className="w-full rounded-lg bg-primary px-8 py-2 font-medium text-primary-foreground hover:bg-primary/90">
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-primary"
    >
      <div className="w-6 h-6 ml-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M12 4L20 18H4L12 4Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="font-medium text-primary dark:text-primary-foreground">Beyond UI</span>
    </Link>
  );
};