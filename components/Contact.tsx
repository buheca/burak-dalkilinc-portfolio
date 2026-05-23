"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EnvelopeSimple, Phone, GithubLogo, ArrowUpRight } from "@phosphor-icons/react";

const contactItems = [
  {
    icon: EnvelopeSimple,
    label: "E-posta",
    value: "burakdalk2@gmail.com",
    href: "mailto:burakdalk2@gmail.com",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 553 770 5193",
    href: "tel:+905537705193",
  },
  {
    icon: GithubLogo,
    label: "GitHub",
    value: "github.com/buheca",
    href: "https://github.com/buheca",
    external: true,
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" ref={ref} className="py-28 md:py-36 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono text-sky-400 uppercase tracking-[0.2em] mb-5">
              003 — İletişim
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-zinc-50 leading-tight mb-5">
              Birlikte bir şeyler{" "}
              <span className="text-zinc-400">üretelim.</span>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed max-w-[45ch]">
              Freelance proje, tam zamanlı pozisyon veya sadece fikir alışverişi
              için ulaşabilirsiniz. Genellikle 24 saat içinde dönüş yapıyorum.
            </p>

            {/* Status */}
            <div className="mt-8 inline-flex items-center gap-2.5 border border-white/[0.07] rounded-full px-4 py-2 bg-white/[0.02]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-xs text-zinc-400">
                Şu an müsait — yeni projeler için açık
              </span>
            </div>
          </motion.div>

          {/* Right — contact links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            {contactItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center justify-between p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-sky-500/20 transition-all duration-300 active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:border-sky-500/30 group-hover:bg-sky-500/5 transition-all duration-300">
                    <item.icon
                      size={18}
                      weight="regular"
                      className="text-zinc-400 group-hover:text-sky-400 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-zinc-200 font-medium">
                      {item.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-zinc-700 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
