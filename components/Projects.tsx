"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Film Öneri Sistemi",
    tagline: "TF-IDF + KNN öneri motoru",
    description:
      "MovieLens 1M veri setiyle eğitilmiş içerik tabanlı film öneri uygulaması. TF-IDF vektörizasyonu ve KNN kosinüs benzerliği ile en yakın filmleri buluyor; benzerlik dağılımı grafikle gösteriliyor.",
    tags: ["Python", "Streamlit", "Pandas", "Scikit-learn", "KNN", "TF-IDF"],
    image: "/projects/film-oneri.png",
    placeholder: "linear-gradient(135deg, #1a1200 0%, #2d1f00 40%, #3d2a00 100%)",
    href: "https://film-oneri-sistemi-burakbabavbilgehanbabavebugrababa.streamlit.app/",
    github: "https://github.com/buheca/film-oneri-sistemi",
    year: "2026",
  },
  {
    title: "Graf Tabanlı Film Öneri",
    tagline: "BFS algoritması ile keşif",
    description:
      "Veri yapıları final projesi. Graf üzerinde BFS traversal kullanarak film önerileri üreten web uygulaması. Tür filtresi, IMDb rating ve BFS derinliği birlikte değerlendiriliyor.",
    tags: ["JavaScript", "Graph", "BFS", "Hash Map", "Vercel"],
    image: "/projects/graf-film.png",
    placeholder: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    href: "https://data-structures-final-homework.vercel.app",
    github: "https://github.com/buheca/DataStructuresFinalHomework",
    year: "2026",
  },
  {
    title: "İnteraktif Diş Anatomisi",
    tagline: "CSS animasyonlu öğrenme aracı",
    description:
      "Fareyle ağzı açıp dişlere tıklayarak anatomik bilgiye ulaşılan interaktif web uygulaması. Eğitim amaçlı tasarlanmış; her diş için ayrı bilgi paneli ve özgün CSS animasyonları içeriyor.",
    tags: ["JavaScript", "CSS", "HTML", "Vercel"],
    image: "/projects/dis-anatomisi.png",
    placeholder: "linear-gradient(135deg, #0a0010 0%, #1a0020 50%, #0f0018 100%)",
    href: "https://teeth-omega.vercel.app",
    github: "https://github.com/buheca/teeth",
    year: "2026",
  },
  {
    title: "Düğün Anıları",
    tagline: "Özel fotoğraf platformu",
    description:
      "Çiftlerin düğün fotoğraflarını güvenle yükleyip sakladığı özel platform. Fotoğraflar yalnızca çift tarafından görüntülenebilir; TypeScript ile tip güvenli altyapı.",
    tags: ["TypeScript", "Next.js", "Vercel"],
    image: "/projects/dugun-anilari.png",
    placeholder: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
    href: "https://wedding-photos-brown-three.vercel.app",
    github: "https://github.com/buheca/wedding-photos",
    year: "2026",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" ref={ref} className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono text-sky-400 uppercase tracking-[0.2em] mb-4">
              002 — Projeler
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-zinc-50 leading-tight">
              Geliştirdiğim{" "}
              <span className="text-zinc-400">ürünler</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-zinc-500 max-w-[40ch] md:text-right"
          >
            Seçilmiş projeler — her biri kendi başına bir problem çözüyor.
          </motion.p>
        </div>

        {/* 2-col grid, top row featured wide + narrow, bottom row 2 equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Top row: first card spans full width */}
          <div className="md:col-span-2">
            <ProjectCard project={projects[0]} index={0} wide />
          </div>
          <ProjectCard project={projects[1]} index={1} />
          <ProjectCard project={projects[2]} index={2} />
          {/* Bottom: last card full width */}
          <div className="md:col-span-2">
            <ProjectCard project={projects[3]} index={3} wide />
          </div>
        </div>

        {/* More work note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-zinc-600">
            Daha fazlası için{" "}
            <a
              href="https://github.com/buheca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-sky-400 underline underline-offset-4 decoration-white/20 hover:decoration-sky-400/50 transition-all duration-200"
            >
              GitHub profilime
            </a>{" "}
            göz atabilirsiniz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
