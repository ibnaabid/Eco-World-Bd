"use client";

import { motion } from "framer-motion";
import { Leaf, Hammer, Users, TrendingUp } from "lucide-react";
import Image from "next/image";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ink: "#2A2A22",
};

const stats = [
  { value: "1,200+", label: "Artisan Families Supported", icon: <Users size={20} /> },
  { value: "45", label: "Villages Partnered", icon: <Leaf size={20} /> },
  { value: "8 yrs", label: "Since We Started", icon: <TrendingUp size={20} /> },
  { value: "100%", label: "Handmade, No Machines", icon: <Hammer size={20} /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function AboutPage(): JSX.Element {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,680&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 md:py-32 px-5 md:px-8"
        style={{ backgroundColor: colors.forest }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            {[...Array(8)].map((_, i) => (
              <rect key={i} x={i * 50 + 10} y="0" width="14" height="400" fill={colors.bambooTan} />
            ))}
          </svg>
        </motion.div>

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[12px] font-semibold tracking-[0.2em] uppercase mb-5"
            style={{ color: colors.bambooTan }}
          >
            Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="brand-font text-4xl md:text-6xl leading-[1.1]"
            style={{ color: colors.cream }}
          >
            Every piece carries
            <br />
            a village behind it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-[15px] md:text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(246,242,233,0.75)" }}
          >
            BambooCraft began with one weaver in Sylhet and a simple idea —
            let the material speak, and let the maker get paid fairly for it.
          </motion.p>
        </div>
      </section>

      {/* Stats — animated counters on scroll */}
      <section className="py-16 px-5 md:px-8" style={{ backgroundColor: colors.cream }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-black/5"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: "rgba(31,61,43,0.08)", color: colors.forest }}
              >
                {s.icon}
              </div>
              <span className="brand-font text-2xl md:text-3xl" style={{ color: colors.forest }}>
                {s.value}
              </span>
              <span className="text-[12px] mt-1" style={{ color: "rgba(42,42,34,0.6)" }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Story + image, scroll reveal from both sides */}
      <section className="py-20 px-5 md:px-8" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#EDE7D8" }}
          >
            <Image
              src="/ratul-pal-ThX0t16fsrE-unsplash.jpg"
              alt="Artisan at work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase" style={{ color: colors.moss }}>
              How We Work
            </span>
            <h2 className="brand-font text-3xl md:text-4xl mt-2 mb-5" style={{ color: colors.ink }}>
              Craft first, margins second
            </h2>
            <p className="text-[14.5px] leading-relaxed mb-4" style={{ color: "rgba(42,42,34,0.65)" }}>
              We buy directly from artisan cooperatives at fair prices — no
              middlemen shaving off what a weaver's hands actually earned.
              Every product page names the region and, where possible, the
              maker.
            </p>
            <p className="text-[14.5px] leading-relaxed" style={{ color: "rgba(42,42,34,0.65)" }}>
              What you get in return is bamboo that was never meant to sit in
              a warehouse — it's shaped to be used, and built to outlast the
              trend it started in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values — staggered cards */}
      <section className="py-20 px-5 md:px-8" style={{ backgroundColor: colors.forestDeep }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase" style={{ color: colors.bambooTan }}>
              What We Stand For
            </span>
            <h2 className="brand-font text-3xl md:text-4xl mt-2" style={{ color: colors.cream }}>
              Three things we won't compromise on
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { title: "Fair Pay", desc: "Artisans set prices with us, not the other way around." },
              { title: "Real Material", desc: "No laminate, no plastic composites — bamboo, honestly." },
              { title: "Made to Last", desc: "Every piece is oil-treated and built for daily use, for years." },
            ].map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, borderColor: colors.bambooTan }}
                className="p-7 rounded-2xl border transition-colors"
                style={{ borderColor: "rgba(201,168,118,0.15)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <span className="brand-font text-3xl" style={{ color: colors.bambooTan }}>
                  0{i + 1}
                </span>
                <h3 className="text-[16px] font-semibold mt-3 mb-2" style={{ color: colors.cream }}>
                  {v.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "rgba(246,242,233,0.6)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}