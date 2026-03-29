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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700;9..40,900&display=swap');
        .nav-font { font-family: 'DM Sans', sans-serif; }
        .logo-font { font-family: 'Bebas Neue', sans-serif; }
      `}</style>

      {/* ═══ NAVBAR ═══════════════════════════════════ */}
      <div className="nav-font fixed top-5 left-0 z-50 w-full flex justify-center px-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`
            flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full
            border transition-all duration-500
            ${scrolled
              ? "bg-black/75 backdrop-blur-2xl border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              : "bg-white/[0.06] backdrop-blur-xl border-white/[0.08]"
            }
          `}
        >
          {/* LOGO — bigger and bolder */}
          <span className="logo-font text-[1.85rem] tracking-wide text-white uppercase select-none">
            Sharuk TA<span className="text-blue-500">.</span>
          </span>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`
                  relative px-4 py-2 text-[0.95rem] font-bold rounded-full tracking-wide transition-colors duration-200
                  ${active === link.href ? "text-white" : "text-white/50 hover:text-white/90"}
                `}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
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
              className={`ml-3 px-6 py-2.5 text-[0.9rem] font-black tracking-[0.1em] uppercase rounded-full
                bg-white text-black hover:bg-blue-500 hover:text-white transition-all duration-300`}
            >
              RESUME
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </motion.nav>
      </div>

      {/* ═══ MOBILE MENU ══════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="nav-font fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(28px)" }}
          >
            {/* Decorative orbs */}
            <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)", filter: "blur(50px)" }} />
            <div className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)", filter: "blur(50px)" }} />

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="absolute top-[12%] left-1/2 -translate-x-1/2 w-16 h-[2px] origin-left"
              style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
            />

            <div className="flex flex-col items-center gap-2 w-full px-10 max-w-sm">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => { setActive(link.href); setMenuOpen(false); }}
                    className={`
                      block w-full py-4 text-center text-3xl font-black tracking-tight
                      border-b border-white/[0.06] transition-colors duration-200
                      ${active === link.href ? "text-blue-400" : "text-white/70 hover:text-white"}
                    `}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* MOBILE RESUME */}
            <motion.a
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 + 0.2, duration: 0.5 }}
              href="/Sharuk_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 px-12 py-4 bg-white text-black rounded-full font-black text-base tracking-[0.12em] uppercase hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}