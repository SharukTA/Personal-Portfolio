"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Navbar from "./components/navbar";

/* ── Variants ─────────────────────────────────────────── */
const reveal = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* ── Smooth Cursor ─────────────────────────────────────── */
function SmoothCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      mo.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovered ? 44 : 32,
          height: hovered ? 44 : 32,
          opacity: hovered ? 0.9 : 0.55,
          borderColor: hovered ? "rgba(96,165,250,0.9)" : "rgba(255,255,255,0.6)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovered ? 5 : 5, height: hovered ? 5 : 5, opacity: hovered ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}

/* ── Grain overlay ─────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px",
      }}
    />
  );
}

/* ── Animated counter ──────────────────────────────────── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const step = Math.ceil(end / 40);
        const t = setInterval(() => {
          n += step;
          if (n >= end) { setCount(end); clearInterval(t); } else setCount(n);
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Ticker ────────────────────────────────────────────── */
function Ticker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-4 border-y border-white/[0.05]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-[10px] font-black tracking-[0.35em] uppercase text-white/50 flex items-center gap-8">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const projects = [
    {
      title: "IROHUB CRM (Live)",
      desc: "A production-grade CRM built for real-world enterprise lead tracking, featuring role-based access and task management.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      size: "md:col-span-2 md:row-span-2",
      accent: "#3b82f6",
      idx: "01",
    },
    {
      title: "ClayWorld",
      desc: "Multi-vendor e-commerce platform for handmade clay products.",
      tech: ["Python", "SQLite", "JavaScript"],
      size: "md:col-span-1",
      accent: "#f97316",
      idx: "02",
    },
    {
      title: "Ayurvedic Medical Shop",
      desc: "Pharmacy system with specialized roles for admins and customers.",
      tech: ["Python", "MySQL", "CSS"],
      size: "md:col-span-1",
      accent: "#10b981",
      idx: "03",
    },
  ];

  const tickerItems = ["React", "Next.js", "Node.js", "MongoDB", "Tailwind", "Python", "Django", "Express", "MySQL", "Full-Stack", "MERN Stack"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,700;1,9..40,300&display=swap');

        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }

        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.01em; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .glass:hover { border-color: rgba(255,255,255,0.13); }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 72px 72px;
        }

        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.18);
          color: transparent;
        }

        .shimmer {
          background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 30%, #f472b6 55%, #a78bfa 75%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sh 5s linear infinite;
        }
        @keyframes sh { from { background-position: 0% center } to { background-position: 200% center } }

        .float-anim { animation: fl 7s ease-in-out infinite; }
        @keyframes fl { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }

        .slide-bar { position: relative; overflow: hidden; }
        .slide-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .slide-bar:hover::after { width: 100%; }

        .proj-card { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .proj-card:hover { transform: translateY(-10px); }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0   rgba(52,211,153,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(52,211,153,0);   }
          100% { box-shadow: 0 0 0 0   rgba(52,211,153,0);    }
        }
        .pulse-ring { animation: pulse-ring 2s infinite; }
      `}</style>

      <SmoothCursor />
      <GrainOverlay />

      <main className="font-body bg-[#070707] text-white overflow-x-hidden selection:bg-blue-500/25">
        <Navbar />

        {/* ════ HERO ════════════════════════════════════ */}
        <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center px-6 pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 grid-bg" />
          <div className="absolute top-[-8%] right-[-5%] w-[50%] h-[50%] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)", filter: "blur(80px)" }} />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="mx-auto max-w-7xl w-full z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              {/* — Text — */}
              <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7">
                <motion.div variants={reveal} className="inline-flex items-center gap-3 mb-10">
                  <span className="h-px w-10 bg-blue-500" />
                  <span className="text-blue-400 text-[10px] font-black tracking-[0.45em] uppercase">Open to Software, Full-Stack & IT Roles</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </motion.div>

                <motion.h1 variants={reveal} className="font-display leading-[0.88] mb-4">
                  <span className="block text-[clamp(4.5rem,11vw,9.5rem)] text-white">CRAFTING THE</span>
                  <span className="block text-[clamp(4.5rem,11vw,9.5rem)] shimmer">DIGITAL FUTURE</span>
                </motion.h1>

                <motion.div variants={reveal} className="h-px max-w-xl bg-gradient-to-r from-blue-500/40 via-white/10 to-transparent my-8" />

                <motion.p variants={reveal} className="max-w-lg text-[1.1rem] text-white/80 font-light leading-relaxed mb-10">
                  I'm <span className="text-white font-semibold">Sharuk TA</span>, a Software Developer with experience across full-stack development,
                  system design, and modern web technologies, focused on building scalable,
                  high-performance applications that solve real-world problems.
                </motion.p>

                <motion.div variants={reveal} className="flex flex-wrap gap-4">
                  <a href="#projects"
                    className="group relative px-9 py-3.5 rounded-full bg-white text-black font-bold text-sm tracking-[0.15em] uppercase overflow-hidden">
                    <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                    <span className="relative group-hover:text-white transition-colors duration-300">View Work</span>
                  </a>
                  <a href="#contact"
                    className="px-9 py-3.5 rounded-full glass font-bold text-sm tracking-[0.15em] uppercase hover:border-white/20 transition-all duration-300">
                    Contact Me
                  </a>
                </motion.div>
              </motion.div>

              {/* — Image — */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="lg:col-span-5 flex justify-center lg:justify-end"
              >
                <div className="relative float-anim">
                  <div className="absolute -inset-5 rounded-[2.5rem] border border-white/[0.04] pointer-events-none" />
                  <div className="absolute -inset-10 rounded-[3rem] border border-white/[0.025] pointer-events-none" />
                  <div className="absolute inset-0 rounded-[2rem] pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)", filter: "blur(28px)" }} />
                  <Image
                    src="/Portprofile.jpeg"
                    alt="Sharuk Portfolio"
                    width={420}
                    height={520}
                    priority
                    className="relative z-10 rounded-[2rem] object-cover border border-white/[0.08] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-4 -left-4 glass px-5 py-3 rounded-2xl z-20 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-ring" />
                      <span className="text-[10px] font-black tracking-[0.3em] text-white/90 uppercase">Available Now</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[9px] font-black tracking-[0.5em] uppercase text-white/40">Scroll</span>
            <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </section>

        {/* ════ TICKER ══════════════════════════════════ */}
        <Ticker items={tickerItems} />

        {/* ════ STATS ═══════════════════════════════════ */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: 1, s: "+", label: "Years Experience" },
              { n: 3, s: "", label: "Projects Shipped" },
              { n: 10, s: "+", label: "Features Built" },
              { n: 100, s: "%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <motion.div key={i}
                initial="hidden" whileInView="visible" viewport={{ once: false }} variants={reveal}
                className="glass rounded-2xl p-6 text-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.1), transparent 70%)" }} />
                <div className="font-display text-5xl text-white mb-1 relative">
                  <Counter end={stat.n} suffix={stat.s} />
                </div>
                <div className="text-[10px] text-white/60 font-black tracking-[0.25em] uppercase relative">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════ ABOUT ═══════════════════════════════════ */}
        <section id="about" className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger} className="lg:col-span-5">
              <motion.div variants={reveal} className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-blue-500" />
                <span className="text-blue-400 text-[10px] font-black tracking-[0.45em] uppercase">About Me</span>
              </motion.div>
              <motion.h2 variants={reveal} className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.88] mb-6">
                <span className="text-transparent block [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">BUILDER</span>
                <span className="text-white block">BY NATURE</span>
              </motion.h2>
              <motion.div variants={reveal} className="h-px bg-white/[0.07] mb-6" />
              <motion.p variants={reveal} className="text-[1.05rem] text-white/80 font-light leading-relaxed">
                I design and build software solutions ranging from full-stack web applications
                to <span className="text-white font-medium">internal tools</span>, documentation platforms, and role-based systems — with a strong
                focus on <span className="text-white font-medium">clean UI</span>,
                <span className="text-white font-medium"> scalable architecture</span>,
                performance, and maintainable code. I also have experience in building web applications
                in MERN Stack , Next.JS and Python Django
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="glass rounded-3xl p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)", filter: "blur(40px)" }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Current Role", value: "Full-Stack Developer @ Odidor", icon: "◈", c: "#3b82f6" },
                    { label: "Location", value: "BC, Canada", icon: "◎", c: "#8b5cf6" },
                    { label: "Speciality", value: "MERN • Next.js • Django", icon: "◇", c: "#10b981" },
                    { label: "Status", value: "Open to Opportunities", icon: "◉", c: "#f59e0b" },
                  ].map((item, i) => (
                    <div key={i}
                      className="slide-bar p-5 rounded-2xl bg-white/[0.025] border border-white/[0.05] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-400 group"
                    >
                      <div className="text-xl mb-3 transition-transform duration-300 group-hover:scale-110 inline-block" style={{ color: item.c }}>{item.icon}</div>
                      <div className="text-[9px] text-white/55 font-black tracking-[0.3em] uppercase mb-1">{item.label}</div>
                      <div className="text-sm text-white font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ════ SKILLS ══════════════════════════════════ */}
        <section id="skills" className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}>
            <motion.div variants={reveal} className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-blue-500" />
              <span className="text-blue-400 text-[10px] font-black tracking-[0.45em] uppercase">Tech Stack</span>
            </motion.div>
            <motion.h2 variants={reveal} className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.88] mb-16">
              <span className="text-white">TOOLS OF </span>
              <span className="text-transparent block [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">THE CRAFT</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Frontend", skills: "React, Next.js, Tailwind CSS", icon: "▲", c: "#3b82f6" },
                { title: "Backend", skills: "Node.js, Express, Django", icon: "◆", c: "#8b5cf6" },
                { title: "Database", skills: "MongoDB, PostgreSQL, MySQL", icon: "●", c: "#10b981" },
                { title: "Languages", skills: "JavaScript, Python", icon: "■", c: "#f59e0b" },
              ].map((item, i) => (
                <motion.div key={i} variants={reveal}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="glass rounded-2xl p-7 group relative overflow-hidden slide-bar"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 40% 0%, ${item.c}18, transparent 70%)` }} />
                  <div className="text-2xl mb-5 transition-transform duration-300 group-hover:scale-110" style={{ color: item.c }}>{item.icon}</div>
                  <div className="text-[9px] text-white/60 font-black tracking-[0.35em] uppercase mb-3">{item.title}</div>
                  <div className="text-lg font-bold text-white relative">{item.skills}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ════ EXPERIENCE ══════════════════════════════ */}
        <section id="experience" className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}>
            <motion.div variants={reveal} className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-blue-500" />
              <span className="text-blue-400 text-[10px] font-black tracking-[0.45em] uppercase">Experience</span>
            </motion.div>
            <motion.h2 variants={reveal} className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.88] mb-16">
              <span className="text-white">WHERE I'VE </span>
              <span className="text-transparent block [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">SHIPPED</span>
            </motion.h2>

            <div className="space-y-5">
              {[
                {
                  role: "Full-Stack Developer",
                  company: "Odidor • BC, Canada (Remote)",
                  date: "May 2025 – Present",
                  points: ["Next.js & MERN architecture", "ERP & Inventory Systems", "Analytics dashboards"],
                  active: true, num: "01",
                },
                {
                  role: "MERN Stack Intern",
                  company: "Irohub Infotech • Kochi, India",
                  date: "Dec 2024 – May 2025",
                  points: ["Live CRM Development", "REST API modeling", "Git collaboration"],
                  active: false, num: "02",
                },
              ].map((exp, i) => (
                <motion.div key={i} variants={reveal}
                  whileHover={{ x: 5, transition: { duration: 0.3 } }}
                  className="glass rounded-2xl p-8 relative overflow-hidden group border border-white/[0.06] hover:border-white/[0.11] transition-all duration-500 slide-bar"
                >
                  {exp.active && (
                    <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-[0.08]"
                      style={{ background: "radial-gradient(circle, #3b82f6, transparent)", filter: "blur(40px)" }} />
                  )}
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="font-display text-6xl text-white/[0.07] group-hover:text-white/15 transition-colors duration-500 shrink-0 select-none">
                      {exp.num}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        <span className="text-[10px] text-blue-400 font-black tracking-[0.3em] uppercase">{exp.date}</span>
                        {exp.active && (
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 tracking-[0.25em] uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Current
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-3xl md:text-[2.5rem] text-white mb-1 leading-tight">{exp.role}</h3>
                      <p className="text-white/70 text-sm font-medium mb-5 tracking-wider">{exp.company}</p>
                      <div className="flex flex-wrap gap-2.5">
                        {exp.points.map((p, j) => (
                          <span key={j}
                            className="text-[10px] font-black px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/75 uppercase tracking-[0.2em]">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ════ PROJECTS ════════════════════════════════ */}
        <section id="projects" className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger}>
            <motion.div variants={reveal} className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-blue-500" />
              <span className="text-blue-400 text-[10px] font-black tracking-[0.45em] uppercase">Selected Work</span>
            </motion.div>
            <motion.h2 variants={reveal} className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.88] mb-16">
              <span className="text-white">WHAT I'VE </span>
              <span className="text-transparent block [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">BUILT</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[340px]">
              {projects.map((p, i) => (
                <motion.div key={i} variants={reveal}
                  className={`${p.size} proj-card glass rounded-2xl overflow-hidden group relative border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-500`}
                  style={{ background: `linear-gradient(140deg, ${p.accent}0a 0%, #0a0a0a 100%)` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${p.accent}99, transparent 60%)` }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 30% 20%, ${p.accent}14, transparent 65%)` }} />

                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-6 gap-3">
                        <span className="font-display text-7xl text-white/[0.05] group-hover:text-white/[0.09] transition-colors duration-500 leading-none select-none">
                          {p.idx}
                        </span>
                        <div className="flex gap-2 flex-wrap justify-end">
                          {p.tech.map(t => (
                            <span key={t}
                              className="text-[9px] font-black px-3 py-1.5 rounded-full border text-white/80 uppercase tracking-[0.2em]"
                              style={{ borderColor: `${p.accent}70` }}
                            >{t}</span>
                          ))}
                        </div>
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl text-white mb-3 leading-[1]">{p.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed max-w-sm">{p.desc}</p>
                    </div>
                    <div className="flex justify-end">
                      <motion.div
                        whileHover={{ rotate: 45, scale: 1.15, transition: { duration: 0.3 } }}
                        className="w-12 h-12 rounded-full border flex items-center justify-center text-white/50 group-hover:border-white/40 group-hover:text-white transition-all duration-400"
                        style={{ borderColor: `${p.accent}55` }}
                      >→</motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ════ CONTACT ═════════════════════════════════ */}
        <section id="contact" className="py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
          <div className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-[-15%] left-[-5%] w-[55%] h-[55%] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)", filter: "blur(80px)" }} />
            <div className="absolute bottom-[-15%] right-[-5%] w-[45%] h-[45%] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)", filter: "blur(80px)" }} />
            <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={stagger} className="relative z-10">
              <motion.div variants={reveal} className="flex items-center justify-center gap-3 mb-8">
                <span className="h-px w-8 bg-blue-500" />
                <span className="text-blue-400 text-[10px] font-black tracking-[0.45em] uppercase">Contact</span>
                <span className="h-px w-8 bg-blue-500" />
              </motion.div>

              <motion.h2 variants={reveal} className="font-display leading-[0.88] mb-6">
                <span className="block text-[clamp(3rem,9vw,7.5rem)] text-white">LET'S BUILD SOMETHING</span>
                <span className="block text-[clamp(3rem,9vw,7.5rem)] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">EXTRAORDINARY.</span>
              </motion.h2>

              <motion.p variants={reveal} className="text-white/60 text-lg mb-12 font-light">
                Ready for your next big project.
              </motion.p>

              <motion.div variants={reveal} className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sharuktcr11@gmail.com&body=Hi Sharuk,"
                  target="_blank" rel="noopener noreferrer"
                  className="group relative px-10 py-4 rounded-full bg-white text-black font-bold text-sm tracking-[0.15em] uppercase overflow-hidden">
                  <span className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                  <span className="relative group-hover:text-white transition-colors duration-300">Send Email</span>
                </a>
                <a href="https://www.linkedin.com/in/sharuk-t-a-5a022b278"
                  target="_blank" rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full glass font-bold text-sm tracking-[0.15em] uppercase hover:border-blue-500/30 transition-all">
                  LinkedIn
                </a>
                <a href="https://github.com/SharukTA"
                  target="_blank" rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full glass font-bold text-sm tracking-[0.15em] uppercase hover:border-white/20 transition-all">
                  GitHub
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════ FOOTER ══════════════════════════════════ */}
        <footer className="py-10 px-6 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            {/* logo — was white/15, now white/45 */}
            <span className="font-display text-2xl text-white/45">SHARUK TA<span className="text-blue-500">.</span></span>
            {/* copyright — was white/15, now white/45 */}
            <p className="text-white/45 text-[10px] font-black tracking-[0.3em] uppercase text-center">
              © 2026 Sharuk • Precision & Performance
            </p>
            {/* roles — was white/15, now white/45 */}
            <p className="text-white/45 text-[10px] font-black tracking-[0.15em] uppercase text-center">
              Software Developer | Software Engineer | Full-Stack Developer
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}