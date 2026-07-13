"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";

const colors = {
  forest: "#1F3D2B",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ink: "#2A2A22",
};

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Why Bamboo Grows Back in Just 3 Years",
    excerpt: "A look at what makes bamboo one of the fastest-renewing materials on earth, and why that matters for furniture.",
    date: "Jun 18, 2026",
    readTime: "4 min read",
    category: "Sustainability",
    image: "/an-thet-oI70wSUFgrc-unsplash.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Inside a Weaver's Workshop in Sylhet",
    excerpt: "We spent a day with a third-generation basket weaver to understand a craft passed down through hands.",
    date: "Jun 05, 2026",
    readTime: "6 min read",
    category: "Artisans",
    image: "/an-thet-oI70wSUFgrc-unsplash.jpg",
  },
  {
    id: 3,
    title: "Caring for Your Bamboo Furniture",
    excerpt: "Simple oiling and cleaning habits that keep bamboo pieces strong and beautiful for decades.",
    date: "May 22, 2026",
    readTime: "3 min read",
    category: "Guides",
    image: "/mahin-ahmed-A4GfCLaB7iY-unsplash.jpg",
  },
  {
    id: 4,
    title: "From Soil to Shelf: A Basket's Journey",
    excerpt: "Following one storage basket from harvested cane to a finished, oiled product ready to ship.",
    date: "May 10, 2026",
    readTime: "5 min read",
    category: "Process",
    image: "/wan-salahuddin-wan-ismail-ZZVDfKqkGJ0-unsplash.jpg",
  },
  {
    id: 5,
    title: "Meet Rina: 22 Years of Weaving",
    excerpt: "A conversation with one of our longest-partnered artisans about how the craft has changed.",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    category: "Artisans",
    image: "/gurth-bramall-5sijKMXOXQ4-unsplash.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" as const     // ← This fixes the error
    }
  },
};

const stagger = {
  hidden: {},
  show: { 
    transition: { staggerChildren: 0.1 } 
  },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-14 px-5 md:px-8" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[12px] font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: colors.moss }}
          >
            The Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl"
            style={{ color: colors.ink }}
          >
            Stories &amp; Craft Notes
          </motion.h1>
        </div>
      </section>

      {/* Featured post */}
      <section className="px-5 md:px-8 -mt-6" style={{ backgroundColor: colors.cream }}>
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          whileHover={{ y: -4 }}
          className="group max-w-6xl mx-auto grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white shadow-lg mb-16"
        >
          <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden min-h-[300px]" style={{ backgroundColor: "#EDE7D8" }}>
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span
              className="inline-block w-fit px-3 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-wide mb-4"
              style={{ backgroundColor: "rgba(31,61,43,0.08)", color: colors.forest }}
            >
              Featured &middot; {featured.category}
            </span>

            <h2 className="font-serif text-2xl md:text-3xl mb-3 leading-snug" style={{ color: colors.ink }}>
              {featured.title}
            </h2>

            <p className="text-[14px] leading-relaxed mb-5" style={{ color: "rgba(42,42,34,0.6)" }}>
              {featured.excerpt}
            </p>

            <div className="flex items-center gap-3 text-[12px] mb-5" style={{ color: "rgba(42,42,34,0.5)" }}>
              <span>{featured.date}</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.moss }} />
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {featured.readTime}
              </span>
            </div>

            <span className="flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: colors.forest }}>
              Read full story
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </motion.a>
      </section>

      {/* Rest of the posts grid */}
      <section className="pb-24 px-5 md:px-8" style={{ backgroundColor: colors.cream }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {rest.map((post) => (
            <motion.a
              href="#"
              key={post.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[16/11] overflow-hidden" style={{ backgroundColor: "#EDE7D8" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase z-10"
                  style={{ backgroundColor: "rgba(31,61,43,0.9)", color: colors.bambooTan }}
                >
                  {post.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 text-[11px] mb-3" style={{ color: "rgba(42,42,34,0.5)" }}>
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.moss }} />
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-[14.5px] font-semibold mb-2 leading-snug transition-colors group-hover:text-[#1F3D2B]" style={{ color: colors.ink }}>
                  {post.title}
                </h3>

                <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: "rgba(42,42,34,0.6)" }}>
                  {post.excerpt}
                </p>

                <span className="mt-auto flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: colors.forest }}>
                  Read article
                  <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
    </>
  );
}