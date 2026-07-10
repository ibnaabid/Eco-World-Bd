"use client";

import { useState } from "react";
import { Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const colors = {
  forest: "#1F3D2B",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ink: "#2A2A22",
};

interface Product {
  id: number;
  title: string;
  shortDescription: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Woven Storage Basket",
    shortDescription: "Hand-braided round basket, natural finish",
    price: 1450,
    rating: 4.8,
    category: "Basket",
    image: "/WhatsApp Image 2026-07-09 at 15.04.06.jpeg",
  },
  {
    id: 2,
    title: "Bamboo Lounge Light",
    shortDescription: "Curved-frame chair with woven seat",
    price: 6200,
    rating: 4.9,
    category: "Furniture",
    image: "/WhatsApp Image 2026-07-09 at 15.14.36.jpeg",
  },
  {
    id: 3,
    title: "Pendant Bamboo Lamp",
    shortDescription: "Warm-glow shade, handmade lattice",
    price: 2100,
    rating: 4.7,
    category: "Lighting",
    image: "/WhatsApp Image 2026-07-09 at 15.14.37.jpeg",
  },
  {
    id: 4,
    title: "Kitchen Utensil Set",
    shortDescription: "6-piece cooking set, food-safe oil finish",
    price: 890,
    rating: 4.6,
    category: "Kitchenware",
    image: "/WhatsApp Image 2026-07-09 at 15.14.24.jpeg",
  },
];

function ProductCard({ product }: { product: Product }): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="product-card group flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 p-3 transition-all duration-500 hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl" style={{ backgroundColor: "#EDE7D8" }}>
        {!loaded && (
          <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: "#E3DCC8" }} />
        )}
        <Image
          src={product?.image}
          alt={product?.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase z-10 backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-black"
          style={{ backgroundColor: "rgba(31,61,43,0.85)", color: colors.bambooTan }}
        >
          {product.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 pt-5 pb-2 px-2">
        <h3 className="text-[16px] font-semibold mb-1 transition-colors duration-300 group-hover:text-[#1F3D2B]" style={{ color: colors.ink }}>
          {product.title}
        </h3>
        <p className="text-[13px] mb-4 leading-relaxed" style={{ color: "rgba(42,42,34,0.6)" }}>
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded-md">
            <Star size={12} fill={colors.ochre} color={colors.ochre} />
            <span className="text-[12px] font-bold" style={{ color: colors.ink }}>
              {product.rating}
            </span>
          </div>
          <span className="text-[16px] font-bold" style={{ color: colors.forest }}>
            &#2547;{product.price.toLocaleString()}
          </span>
        </div>

        <a
          href="#"
          className="product-view-btn mt-5 flex items-center justify-center gap-1.5 py-3 rounded-full text-[13px] font-semibold border"
          style={{
            borderColor: colors.forest,
            color: colors.forest,
          }}
        >
          View Details
          <ArrowUpRight size={14} className="btn-arrow transition-transform duration-300" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default function FeaturedProducts(): JSX.Element {
  return (
    <section className="py-24 px-5 md:px-8" style={{ backgroundColor: colors.cream, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
        
        .product-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(31,61,43,0.15);
        }
        .product-view-btn {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .product-view-btn {
          background-color: ${colors.forest};
          color: #FFFFFF !important;
        }
        .group:hover .btn-arrow {
          transform: translate(2px, -2px);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span
              className="text-[12px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: colors.moss }}
            >
              Curated Selection
            </span>
            <h2 className="brand-font text-3xl md:text-4xl lg:text-5xl mt-2" style={{ color: colors.ink }}>
              Featured Products
            </h2>
          </div>
          <a
            href="#"
            className="group/link text-[14px] font-semibold flex items-center gap-1.5 self-start md:self-auto transition-opacity hover:opacity-80"
            style={{ color: colors.forest }}
          >
            View all products
            <ArrowUpRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}