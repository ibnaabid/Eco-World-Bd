import React from "react";
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
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Why Bamboo Grows Back in Just 3 Years",
    excerpt:
      "A deep dive into what makes bamboo one of the fastest-renewing materials on earth, and why it is defining the future of premium sustainable furniture.",
    date: "Jun 18, 2026",
    readTime: "4 min read",
    category: "Sustainability",
    image: "/sam-bhattacharyya-Jau8u_R9deo-unsplash.jpg"
  },
  {
    id: 2,
    title: "Inside a Weaver's Workshop in Sylhet",
    excerpt:
      "We spent a day with a third-generation basket weaver to understand a timeless craft passed down through hands, not manuals.",
    date: "Jun 05, 2026",
    readTime: "6 min read",
    category: "Artisans",
    image: "/WhatsApp Image 2026-07-09 at 15.14.35.jpeg"
  },
  {
    id: 3,
    title: "Caring for Your Bamboo Furniture",
    excerpt:
      "Simple oiling secrets and cleaning habits that keep artisanal bamboo pieces strong, radiant, and beautiful for decades.",
    date: "May 22, 2026",
    readTime: "3 min read",
    category: "Guides",
    image: "/minh-triet-c5TYG4b2QvI-unsplash.jpg"
  },
];

export default function BlogSection() {
  return (
    <section className="py-28 px-6 md:px-16" style={{ backgroundColor: colors.cream, fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}} />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6" style={{ borderColor: "rgba(31, 61, 43, 0.1)" }}>
          <div className="max-w-xl">
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: colors.moss }}>
              The Editorial Journal
            </span>
            <h2 className="brand-font text-4xl md:text-5xl font-medium leading-tight tracking-tight" style={{ color: colors.ink }}>
              Stories, Design &amp; <span className="italic font-normal">Craft Notes</span>
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-wide uppercase pb-1 border-b transition-all duration-300 hover:opacity-80"
            style={{ color: colors.forest, borderColor: colors.forest }}
          >
            Explore All Journal
            <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Premium Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Featured Large Post (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-between group cursor-pointer">
            <a href="#" className="flex flex-col h-full">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl mb-6 bg-stone-200">
                <Image
                  fill
                  src={posts[0].image}
                  alt={posts[0].title}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-102"
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wider uppercase backdrop-blur-md bg-white/90 text-stone-800 shadow-sm"
                >
                  {posts[0].category}
                </span>
              </div>
              <div className="flex flex-col flex-1 px-2">
                <div className="flex items-center gap-3 text-[12px] tracking-wide mb-3 text-stone-500">
                  <span>{posts[0].date}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                  <span className="flex items-center gap-1"><Clock size={12} strokeWidth={1.5} /> {posts[0].readTime}</span>
                </div>
                <h3 className="brand-font text-2xl md:text-3xl font-medium mb-3 group-hover:text-[#1F3D2B] transition-colors duration-300 leading-snug" style={{ color: colors.ink }}>
                  {posts[0].title}
                </h3>
                <p className="text-[14px] leading-relaxed font-light mb-6 text-stone-600 max-w-2xl">
                  {posts[0].excerpt}
                </p>
                <div className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: colors.forest }}>
                  <span>Read Full Article</span>
                  <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          </div>

          {/* Secondary Feed Posts (Right Side Vertical List) */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pl-6 lg:border-l" style={{ borderColor: "rgba(31, 61, 43, 0.08)" }}>
            {posts.slice(1).map((post) => (
              <a
                href="#"
                key={post.id}
                className="group flex flex-col sm:flex-row gap-6 items-start transition-all duration-300 pb-8 border-b last:border-0"
                style={{ borderColor: "rgba(31, 61, 43, 0.08)" }}
              >
                <div className="relative aspect-square w-full sm:w-32 md:w-40 shrink-0 overflow-hidden rounded-2xl bg-stone-200">
                  <Image
                    fill
                    src={post.image}
                    alt={post.title}
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col flex-1 py-1">
                  <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-wider mb-2 text-stone-400">
                    <span style={{ color: colors.moss }}>{post.category}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="brand-font text-lg font-medium mb-2 leading-snug transition-colors duration-300 group-hover:text-[#1F3D2B]" style={{ color: colors.ink }}>
                    {post.title}
                  </h3>
                  <p className="text-[13px] font-light leading-relaxed text-stone-500 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[12px] font-medium opacity-0 transition-all duration-300 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0" style={{ color: colors.forest }}>
                    <span>Read Article</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}