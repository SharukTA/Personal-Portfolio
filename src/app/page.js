"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./components/navbar";

// Optimized animation for a "premium" feel
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {

  const projects = [
    {
      title: "IROHUB CRM (Live)",
      desc: "A production-grade CRM built for real-world enterprise lead tracking, featuring role-based access and task management.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      size: "md:col-span-2 md:row-span-2", // Large Bento tile
      gradient: "from-blue-600/20 to-purple-600/20",
    },
    {
      title: "ClayWorld",
      desc: "Multi-vendor e-commerce platform for handmade clay products.",
      tech: ["Python", "SQLite", "JavaScript"],
      size: "md:col-span-1",
      gradient: "from-orange-600/10 to-red-600/10",
    },
    {
      title: "Ayurvedic Medical Shop",
      desc: "Pharmacy system with specialized roles for admins and customers.",
      tech: ["Python", "MySQL", "CSS"],
      size: "md:col-span-1",
      gradient: "from-emerald-600/10 to-teal-600/10",
    },
  ];

  return (
    <main className="bg-[#030303] text-zinc-100 selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden">
        {/* Modern Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/15 blur-[120px] rounded-full" />

        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-7 z-10 text-center lg:text-left">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              Open to Software, Full-Stack & IT Roles
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-6xl md:text-[5.5rem] font-black tracking-tighter leading-[0.85] mb-8">
              CRAFTING THE <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                DIGITAL FUTURE
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="max-w-xl text-xl text-zinc-400 mb-10 leading-relaxed mx-auto lg:mx-0">
              I’m <span className="text-white font-semibold">Sharuk TA</span>, a Software Developer with experience across full-stack development,
              system design, and modern web technologies, focused on building scalable,
              high-performance applications that solve real-world problems.

            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-5 justify-center lg:justify-start">
              <a href="#projects" className="px-10 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition active:scale-95 text-lg shadow-xl shadow-white/5">
                View Work
              </a>
              <a href="#contact" className="px-10 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition text-lg">
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-3xl group-hover:bg-blue-500/40 transition duration-700" />
              <Image
                src="/Portprofile.jpeg"
                alt="Sharuk Portfolio"
                width={480}
                height={580}
                priority
                className="relative z-10 rounded-3xl object-cover border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl font-bold mb-8 uppercase tracking-tight">
          About Me
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl">
          I design and build software solutions ranging from full-stack web applications
          to <span className="text-white font-semibold">internal tools</span>, documentation platforms, and role-based systems — with a strong
          focus on <span className="text-white font-semibold">clean UI</span>,
          <span className="text-white font-semibold"> scalable architecture</span>,
          performance, and maintainable code. I also have experience in building web applications
          in MERN Stack , Next.JS and Python Django
        </motion.p>
      </section>

      {/* --- SKILLS SECTION (Card Layout) --- */}
      <section id="skills" className="py-32 px-6 max-w-7xl mx-auto scroll-mt-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl font-bold mb-16 tracking-tight uppercase">
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Frontend", skills: "React, Next.js, Tailwind" },
            { title: "Backend", skills: "Node.js, Express, Django" },
            { title: "Database", skills: "MongoDB, SQL, MySQL" },
            { title: "Languages", skills: "JS, Python, SQL" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300"
            >
              <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] mb-4">{item.title}</h3>
              <p className="text-xl font-bold">{item.skills}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- EXPERIENCE SECTION (Glow Timeline) --- */}
      <section id="experience" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-4xl font-bold mb-20 tracking-tight uppercase">
          Experience
        </motion.h2>

        <div className="space-y-20">
          {[
            {
              role: "Full-Stack Developer",
              company: "Odidor • BC, Canada",
              date: "May 2025 – Present",
              points: ["Next.js & MERN architecture", "ERP & Inventory Systems", "Analytics dashboards"],
              active: true
            },
            {
              role: "MERN Stack Intern",
              company: "Irohub Infotech • India",
              date: "Dec 2024 – May 2025",
              points: ["Live CRM Development", "REST API modeling", "Git collaboration"],
              active: false
            }
          ].map((exp, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative pl-10 border-l-2 border-white/10 group">
              <div className={`absolute -left-[11px] top-0 h-5 w-5 rounded-full border-4 border-[#030303] ${exp.active ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'bg-zinc-700'}`} />
              <span className="text-blue-500 font-bold text-sm tracking-widest uppercase">{exp.date}</span>
              <h3 className="text-3xl font-bold mt-2 text-white">{exp.role}</h3>
              <p className="text-xl text-zinc-400 font-medium mb-6">{exp.company}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.points.map((p, j) => (
                  <li key={j} className="text-zinc-500 text-lg flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-zinc-800" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- BENTO PROJECTS SECTION --- */}
      <section id="projects" className="py-32 px-6 max-w-7xl mx-auto scroll-mt-20">
        <h2 className="text-4xl font-bold tracking-tight mb-16 uppercase">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px]">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className={`${p.size} rounded-[2.5rem] border border-white/10 bg-gradient-to-br ${p.gradient} p-12 flex flex-col justify-between group relative overflow-hidden`}
            >
              <div className="z-10">
                <div className="flex gap-3 mb-8">
                  {p.tech.map(t => (
                    <span key={t} className="text-[11px] font-black px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-bold mb-4 tracking-tight">{p.title}</h3>
                <p className="text-zinc-400 max-w-md text-lg leading-relaxed">{p.desc}</p>
              </div>
              <div className="z-10 flex justify-end">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:rotate-45">
                  <span className="text-2xl">→</span>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 px-6 max-w-4xl mx-auto text-center scroll-mt-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-5xl font-black mb-8 tracking-tighter uppercase">
          Let's Build Something <br /> <span className="text-zinc-600 italic">Extraordinary.</span>
        </motion.h2>
        <p className="text-xl text-zinc-400 mb-16">Ready for your next big project.</p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sharuktcr11@gmail.com&body=Hi Sharuk,"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition shadow-2xl"
          >
            Send Email
          </a>
          <div className="flex gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/sharuk-t-a-5a022b278"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/5 transition"
            >
              LinkedIn
            </a>
            <a href="https://github.com/SharukTA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/5 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center px-6">
        <p className="text-zinc-600 text-sm font-bold tracking-[0.3em] uppercase italic">
          © 2026 Sharuk • Precision & Performance <br></br>
          Software Developer | Software Engineer | Full-Stack Developer
        </p>
      </footer>
    </main>
  );
}