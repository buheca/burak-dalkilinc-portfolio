"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Express", "NestJS", "REST API", "GraphQL"] },
  { group: "Veritabanı", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle"] },
  { group: "DevOps", items: ["Docker", "GitHub Actions", "Vercel", "AWS EC2", "Nginx"] },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left — bio */}
          <motion.div
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-mono text-sky-400 uppercase tracking-[0.2em] mb-5"
            >
              001 — Hakkımda
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-semibold tracking-tighter text-zinc-50 leading-tight mb-6"
            >
              Kod yazmak bir{" "}
              <span className="text-zinc-400">araç, ürün çıkarmak</span>{" "}
              hedef.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="space-y-4 text-zinc-400 leading-relaxed"
            >
              <p>
                Merhaba, ben Burak. Yazılım geliştirmeye olan ilgim,
                kullanıcıların elinde somut bir şey bırakma tutkusundan
                kaynaklanıyor. Sıfırdan ürün geliştirmekten, mevcut sistemleri
                daha hızlı ve dayanıklı hale getirmekten keyif alıyorum.
              </p>
              <p>
                Arayüzün piksel doğruluğundan API tasarımına, veritabanı
                optimizasyonundan CI/CD kurulumuna kadar stack'in her
                katmanında çalışmayı tercih ediyorum. Takım içinde yazılı
                iletişime ve iyi belgelenmiş koda değer veriyorum.
              </p>
              <p>
                İş dışında açık kaynak projelere katkı sağlıyor, yeni
                teknolojileri küçük side-project'lerle test ediyorum.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-8">
              <div>
                <p className="text-2xl font-semibold tracking-tighter text-zinc-50">3+</p>
                <p className="text-xs text-zinc-500 mt-0.5">Yıl deneyim</p>
              </div>
              <div className="w-px h-8 bg-white/[0.06]" />
              <div>
                <p className="text-2xl font-semibold tracking-tighter text-zinc-50">18+</p>
                <p className="text-xs text-zinc-500 mt-0.5">Tamamlanan proje</p>
              </div>
              <div className="w-px h-8 bg-white/[0.06]" />
              <div>
                <p className="text-2xl font-semibold tracking-tighter text-zinc-50">7</p>
                <p className="text-xs text-zinc-500 mt-0.5">Açık kaynak katkı</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — skills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {skills.map((group) => (
              <div key={group.group}>
                <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3 font-mono">
                  {group.group}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-zinc-300 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1 hover:border-sky-500/30 hover:text-sky-300 transition-all duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
