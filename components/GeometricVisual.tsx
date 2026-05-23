"use client";

import { motion } from "framer-motion";

const orbs = [
  { cx: 200, cy: 180, r: 80, delay: 0, color: "rgba(14,165,233,0.12)" },
  { cx: 300, cy: 280, r: 50, delay: 0.8, color: "rgba(56,189,248,0.08)" },
  { cx: 120, cy: 300, r: 40, delay: 1.4, color: "rgba(14,165,233,0.06)" },
];

const dots: { x: number; y: number; delay: number }[] = [];
for (let row = 0; row < 7; row++) {
  for (let col = 0; col < 7; col++) {
    dots.push({ x: col * 52 + 30, y: row * 52 + 30, delay: (row + col) * 0.05 });
  }
}

export default function GeometricVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto">
      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.cx - orb.r,
            top: orb.cy - orb.r,
            width: orb.r * 2,
            height: orb.r * 2,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: 5 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Dot grid */}
      <svg
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {dots.map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={1.5}
            fill="rgba(255,255,255,0.12)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.6 + dot.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Connecting lines */}
        <motion.line
          x1="82" y1="82" x2="234" y2="130"
          stroke="rgba(56,189,248,0.12)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="234" y1="130" x2="338" y2="234"
          stroke="rgba(56,189,248,0.08)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="82" y1="82" x2="82" y2="286"
          stroke="rgba(56,189,248,0.06)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Accent circle */}
        <motion.circle
          cx="234" cy="130" r="6"
          fill="none" stroke="rgba(56,189,248,0.5)" strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8, type: "spring", stiffness: 200, damping: 15 }}
        />
        <motion.circle
          cx="234" cy="130" r="3"
          fill="rgba(56,189,248,0.8)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 2, type: "spring", stiffness: 200, damping: 15 }}
        />

        {/* Floating label */}
        <motion.g
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <rect x="196" y="96" width="76" height="20" rx="10"
            fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.2)" strokeWidth="1"
          />
          <text x="234" y="110" textAnchor="middle"
            fill="rgba(56,189,248,0.8)" fontSize="9" fontFamily="monospace"
          >
            Full-Stack
          </text>
        </motion.g>

        {/* Corner accent */}
        <motion.rect
          x="320" y="60" width="60" height="60" rx="12"
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"
          strokeDasharray="6 4"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "350px 90px" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
