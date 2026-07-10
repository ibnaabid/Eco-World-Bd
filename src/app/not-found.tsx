"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
};

export default function NotFound(): JSX.Element {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-5"
      style={{ backgroundColor: colors.forest, fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,680&family=Inter:wght@400;500;600&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      {/* Animated bamboo stalks in background */}
      <div className="absolute inset-0 flex items-end justify-around px-10 opacity-[0.15] pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.svg
            key={i}
            width="22"
            height="340"
            viewBox="0 0 22 340"
            initial={{ y: 340, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
          >
            <rect x="6" y="0" width="10" height="340" rx="3" fill={colors.bambooTan} />
            <rect x="6" y="70" width="10" height="5" fill={colors.forest} />
            <rect x="6" y="160" width="10" height="5" fill={colors.forest} />
            <rect x="6" y="250" width="10" height="5" fill={colors.forest} />
          </motion.svg>
        ))}
      </div>

      {/* Floating leaf shapes, gentle continuous motion */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${15 + i * 18}%`,
            left: i % 2 === 0 ? "8%" : "auto",
            right: i % 2 !== 0 ? "8%" : "auto",
          }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        >
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <path
              d="M17 3 C 28 6, 30 20, 17 31 C 4 20, 6 6, 17 3 Z"
              stroke={colors.moss}
              strokeWidth="1.4"
              fill="rgba(107,143,92,0.12)"
            />
          </svg>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          className="brand-font leading-none mb-4"
          style={{ fontSize: "clamp(5rem, 18vw, 9rem)", color: colors.bambooTan }}
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="brand-font text-2xl md:text-3xl mb-3"
          style={{ color: colors.cream }}
        >
          This path hasn&apos;t been woven yet.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[14.5px] mb-9"
          style={{ color: "rgba(246,242,233,0.65)" }}
        >
          The page you're looking for may have moved, or never existed.
          Let's get you back to solid ground.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="/"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-semibold"
            style={{ backgroundColor: colors.ochre, color: colors.cream }}
          >
            <Home size={16} strokeWidth={2} />
            Back to Home
          </motion.a>
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-semibold border"
            style={{ borderColor: "rgba(246,242,233,0.3)", color: colors.cream }}
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}