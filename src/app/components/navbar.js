"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <div className="fixed top-6 left-0 z-50 w-full flex justify-center px-6">
        <motion.nav
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full border transition-all duration-300
            ${scrolled
              ? "bg-black/80 backdrop-blur-2xl border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
              : "bg-white/10 backdrop-blur-md border-white/10"
            }`}
        >
          {/* LOGO */}
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            Sharuk TA<span className="text-blue-500">.</span>
          </span>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`relative px-4 py-2 text-lg md:text-xl font-semibold rounded-full transition
                  ${active === link.href
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                  }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
                  />
                )}
                {link.label}
              </Link>
            ))}

            {/* RESUME */}
            <a
              href="/Sharuk_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-7 py-2.5 text-lg md:text-xl font-bold bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              RESUME
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-white text-3xl font-bold z-50"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </motion.nav>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >

            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => {
                    setActive(link.href);
                    setMenuOpen(false);
                  }}
                  className="text-3xl font-black text-white tracking-tight hover:text-blue-400 transition"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* MOBILE RESUME */}
            <a
              href="/Sharuk_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-10 py-4 bg-white text-black rounded-full font-bold text-lg"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
