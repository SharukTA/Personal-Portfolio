"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
export default function Navbar() {
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-8 left-0 z-50 w-full flex justify-center px-6">
      <motion.nav
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${scrolled
            ? "bg-black/80 backdrop-blur-2xl border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
            : "bg-white/10 backdrop-blur-md border-white/10"
          }`}
      >
        {/* LOGO - Increased font size and weight */}
        <span className="hidden lg:block text-xl font-black tracking-tighter mr-6 text-white uppercase">
          Sharuk TA<span className="text-blue-500">.</span>
        </span>

        {/* LINKS - Bunted to text-base (16px) for better legibility */}
        <div className="flex items-center gap-2 md:gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`relative px-4 py-2 text-sm md:text-base font-semibold transition-colors rounded-full ${active === link.href ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                />
              )}
              {link.label}
            </Link>
          ))}
        </div>

        {/* SEPARATOR - More visible */}
        <div className="w-[2px] h-6 bg-white/20 mx-3" />

        {/* RESUME BUTTON - Larger and more prominent */}
        <a
          href="/Sharuk_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer" // Adds that extra layer of security and performance
          className="px-6 py-2.5 text-sm md:text-base font-bold bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg"
        >
          RESUME
        </a>
      </motion.nav>
    </div>
  );
}