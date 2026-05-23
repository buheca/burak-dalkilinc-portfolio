"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";

interface Project {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  image: string;
  placeholder?: string; // CSS gradient fallback
  href: string;
  github?: string;
  year: string;
}

function ProjectImage({
  src,
  alt,
  placeholder,
  wide,
}: {
  src: string;
  alt: string;
  placeholder?: string;
  wide: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${
        wide ? "md:w-2/5 aspect-[16/9] md:aspect-auto min-h-[220px]" : "aspect-[16/9]"
      }`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          style={{ background: placeholder ?? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
    </div>
  );
}

export default function ProjectCard({
  project,
  index,
  wide = false,
}: {
  project: Project;
  index: number;
  wide?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 30,
  });

  const spotX = useMotionValue(150);
  const spotY = useMotionValue(150);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] ${
        wide ? "flex flex-col md:flex-row" : ""
      }`}
    >
      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(280px circle at ${spotX.get()}px ${spotY.get()}px, rgba(56,189,248,0.06), transparent 70%)`,
        }}
      />

      {/* Image / Placeholder */}
      <div className={`relative ${wide ? "md:w-2/5" : ""}`}>
        <ProjectImage
          src={project.image}
          alt={project.title}
          placeholder={project.placeholder}
          wide={wide}
        />
        <span className="absolute top-4 left-4 z-10 text-[10px] font-mono text-zinc-400 border border-white/10 bg-zinc-950/60 backdrop-blur-sm px-2 py-1 rounded-full">
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 p-5 flex flex-col justify-between ${
          wide ? "md:w-3/5 md:p-8" : ""
        }`}
      >
        <div>
          <div className="flex items-start justify-between gap-4 mb-1.5">
            <h3 className="text-base font-semibold tracking-tight text-zinc-100">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:border-sky-500/30 hover:bg-sky-500/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubLogo size={13} className="text-zinc-300" />
                </a>
              )}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:border-sky-500/30 hover:bg-sky-500/10"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight size={13} className="text-zinc-300" />
              </a>
            </div>
          </div>
          <p className="text-xs text-sky-400 font-medium mb-2">{project.tagline}</p>
          <p
            className={`text-sm text-zinc-400 leading-relaxed mb-4 ${
              wide ? "max-w-[52ch]" : ""
            }`}
          >
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-zinc-500 bg-white/[0.04] border border-white/[0.06] rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
