"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react";

// WebGL has no server-side equivalent — load on the client only, and hold the
// same 420px square so the grid doesn't shift while the bundle arrives.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="w-full aspect-square max-w-[420px] mx-auto" />,
});

const stagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial glow top-left */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">
          {/* Left — content */}
          <motion.div variants={stagger} initial="initial" animate="animate">
            {/* Availability badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 border border-white/[0.08] rounded-full px-3 py-1.5 bg-white/[0.03]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Yeni fırsatlara açık
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp}>
              <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-none tracking-tighter text-zinc-50">
                Burak
                <br />
                <span className="text-zinc-400">Dalkılınç</span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg font-medium tracking-tight text-sky-400"
            >
              Software Engineering Student
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base text-zinc-400 leading-relaxed max-w-[52ch]"
            >
              Performanslı, kullanıcı odaklı web ürünleri geliştiren bir
              öğrenci. Temiz kod, iyi tasarım ve hızlı iterasyona
              inanıyorum.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 bg-zinc-50 text-zinc-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-all duration-200 active:scale-[0.98] active:-translate-y-px"
              >
                Projelerime Bak
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </a>
              <a
                href="https://github.com/BurakDalkilinc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 border border-white/[0.08] px-5 py-2.5 rounded-full hover:border-white/20 transition-all duration-200 active:scale-[0.98]"
              >
                <GithubLogo size={16} weight="fill" />
                GitHub
              </a>
            </motion.div>

            {/* Tech row */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              <span className="text-xs text-zinc-600 uppercase tracking-widest">
                Stack
              </span>
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "PostgreSQL",
                "Docker",
              ].map((t) => (
                <span key={t} className="text-xs text-zinc-500 font-mono">
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5,
            }}
            className="hidden lg:block"
          >
            <HeroScene />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-6 flex items-center gap-3"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
          <span className="text-xs text-zinc-600 tracking-widest uppercase rotate-0">
            Aşağı kaydır
          </span>
        </motion.div>
      </div>
    </section>
  );
}
