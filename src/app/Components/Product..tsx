import { useState } from "react";
import { Star, ArrowUpRight } from "lucide-react";

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
    image:
      "https://images.unsplash.com/photo-1587145717482-a5c5b9d5a1d3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Bamboo Lounge Chair",
    shortDescription: "Curved-frame chair with woven seat",
    price: 6200,
    rating: 4.9,
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Pendant Bamboo Lamp",
    shortDescription: "Warm-glow shade, handmade lattice",
    price: 2100,
    rating: 4.7,
    category: "Lighting",
    image:
      "https://images.unsplash.com/photo-1543198126-42dd6c9ba5c9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Kitchen Utensil Set",
    shortDescription: "6-piece cooking set, food-safe oil finish",
    price: 890,
    rating: 4.6,
    category: "Kitchenware",
    image:
      "https://images.unsplash.com/photo-1584990347449-716b6c9d4c31?q=80&w=800&auto=format&fit=crop",
  },
];

function ProductCard({ product }: { product: Product }): JSX.Element {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#EDE7D8" }}>
        {!loaded && (
          <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: "#E3DCC8" }} />
        )}
        <img
          src={product.image}
          alt={product.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase"
          style={{ backgroundColor: "rgba(31,61,43,0.9)", color: colors.bambooTan }}
        >
          {product.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[15.5px] font-semibold mb-1" style={{ color: colors.ink }}>
          {product.title}
        </h3>
        <p className="text-[13px] mb-4 leading-relaxed" style={{ color: "rgba(42,42,34,0.6)" }}>
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={13} fill={colors.ochre} color={colors.ochre} />
            <span className="text-[12.5px] font-medium" style={{ color: colors.ink }}>
              {product.rating}
            </span>
          </div>
          <span className="text-[15px] font-bold" style={{ color: colors.forest }}>
            &#2547;{product.price.toLocaleString()}
          </span>
        </div>

        <a
          href="#"
          className="mt-4 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[13px] font-semibold border transition-colors group-hover:text-white"
          style={{
            borderColor: colors.forest,
            color: colors.forest,
          }}
        >
          View Details
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default function FeaturedProducts(): JSX.Element {
  return (
    <section className="py-20 px-5 md:px-8" style={{ backgroundColor: colors.cream, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span
              className="text-[12px] font-semibold tracking-[0.15em] uppercase"
              style={{ color: colors.moss }}
            >
              Curated Selection
            </span>
            <h2 className="brand-font text-3xl md:text-4xl mt-2" style={{ color: colors.ink }}>
              Featured Products
            </h2>
          </div>
          <a
            href="#"
            className="text-[13.5px] font-semibold flex items-center gap-1.5 self-start md:self-auto"
            style={{ color: colors.forest }}
          >
            View all products
            <ArrowUpRight size={15} strokeWidth={2} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <style>{`
        .group:hover a[href="#"].mt-4 {
          background-color: ${colors.forest};
        }
      `}</style>
    </section>
  );
}