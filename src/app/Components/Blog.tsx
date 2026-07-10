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
      "A look at what makes bamboo one of the fastest-renewing materials on earth, and why that matters for furniture.",
    date: "Jun 18, 2026",
    readTime: "4 min read",
    category: "Sustainability",
    image:"/sam-bhattacharyya-Jau8u_R9deo-unsplash.jpg"
  },
  {
    id: 2,
    title: "Inside a Weaver's Workshop in Sylhet",
    excerpt:
      "We spent a day with a third-generation basket weaver to understand a craft passed down through hands, not manuals.",
    date: "Jun 05, 2026",
    readTime: "6 min read",
    category: "Artisans",
    image:"/WhatsApp Image 2026-07-09 at 15.14.35.jpeg"
  },
  {
    id: 3,
    title: "Caring for Your Bamboo Furniture",
    excerpt:
      "Simple oiling and cleaning habits that keep bamboo pieces strong and beautiful for decades.",
    date: "May 22, 2026",
    readTime: "3 min read",
    category: "Guides",
    image:"/minh-triet-c5TYG4b2QvI-unsplash.jpg"
  },
];

export default function BlogSection(): JSX.Element {
  return (
    <section className="py-20 px-5 md:px-8" style={{ backgroundColor: colors.cream, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase" style={{ color: colors.moss }}>
              From the Journal
            </span>
            <h2 className="brand-font text-3xl md:text-4xl mt-2" style={{ color: colors.ink }}>
              Stories &amp; Craft Notes
            </h2>
          </div>
          <a
            href="#"
            className="text-[13.5px] font-semibold flex items-center gap-1.5 self-start md:self-auto"
            style={{ color: colors.forest }}
          >
            Visit the blog
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              href="#"
              key={post.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                height={500}
                width={500}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase"
                  style={{ backgroundColor: "rgba(31,61,43,0.9)", color: colors.bambooTan }}
                >
                  {post.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 text-[11.5px] mb-3" style={{ color: "rgba(42,42,34,0.5)" }}>
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.moss }} />
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-[15.5px] font-semibold mb-2 leading-snug" style={{ color: colors.ink }}>
                  {post.title}
                </h3>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: "rgba(42,42,34,0.6)" }}>
                  {post.excerpt}
                </p>
                <span
                  className="mt-auto flex items-center gap-1.5 text-[13px] font-semibold"
                  style={{ color: colors.forest }}
                >
                  Read article
                  <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}