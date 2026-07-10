"use client"
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
};

// Fixed paths: assuming these images sit directly inside your 'public' folder
const slides = [
  {
    image: "/sam-bhattacharyya-Jau8u_R9deo-unsplash.jpg",
    label: "Woven Baskets",
  },
  {
    image: "/WhatsApp Image 2026-07-09 at 15.03.47.jpeg",
    label: "Bamboo Furniture",
  },
  {
    image: "/WhatsApp Image 2026-07-09 at 15.14.30.jpeg",
  },
  {
    image: "/WhatsApp Image 2026-07-09 at 15.14.25.jpeg",
    label: "Handmade Lighting",
  },
];

export default function BambooHero(): JSX.Element {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setActive(i);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setActive((p) => (p + 1) % slides.length);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,680&family=Inter:wght@400;500;600&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
        .slide-img {
          opacity: 0;
          transition: opacity 1s ease;
        }
        .slide-img.show {
          opacity: 1;
        }
        .dot {
          transition: width 0.3s ease, background 0.3s ease;
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{ height: "65vh", minHeight: 460, backgroundColor: colors.forest }}
      >
        {/* Slides */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <Image
              key={i}
              src={s.image}
              alt={s.label || "Bamboo craft product"}
              fill
              priority={i === 0} // Loads the first image instantly
              sizes="100vw"
              className={`slide-img object-cover ${
                i === active ? "show" : ""
              }`}
            />
          ))}
          {/* Forest tint overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(22,48,31,0.92) 0%, rgba(22,48,31,0.55) 45%, rgba(22,48,31,0.25) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-8 flex items-center">
          <div className="max-w-xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 text-[12px] font-medium tracking-wide"
              style={{ backgroundColor: "rgba(201,168,118,0.15)", color: colors.bambooTan }}
            >
              <Leaf size={13} strokeWidth={2} />
              100% Handcrafted &middot; Grown, Not Manufactured
            </div>

            <h1
              className="brand-font text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] mb-5"
              style={{ color: colors.cream }}
            >
              Bamboo, shaped by
              <br />
              hands that know it.
            </h1>

            <p
              className="text-[15px] md:text-base leading-relaxed mb-8 max-w-md"
              style={{ color: "rgba(246,242,233,0.8)" }}
            >
              Every basket, lamp and stool here is grown from soil and woven
              by artisans across Bangladesh — built to last, gentle on the
              earth.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.ochre, color: colors.cream }}
              >
                Explore Products
                <ArrowRight size={16} strokeWidth={2} />
              </a>
              <a
                href="#"
                className="px-6 py-3.5 rounded-full text-[14px] font-semibold border transition-colors hover:bg-white/5"
                style={{ borderColor: "rgba(246,242,233,0.35)", color: colors.cream }}
              >
                Meet the Artisans
              </a>
            </div>
          </div>
        </div>

        {/* Slide label, bottom-left */}
        <div
          className="absolute bottom-7 left-5 md:left-8 text-[12px] tracking-[0.15em] uppercase font-medium"
          style={{ color: colors.bambooTan }}
        >
          {slides[active].label || "Home Decor"}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <ChevronLeft size={20} color={colors.cream} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <ChevronRight size={20} color={colors.cream} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-7 right-5 md:right-8 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="dot h-1.5 rounded-full"
              style={{
                width: i === active ? 26 : 8,
                backgroundColor:
                  i === active ? colors.bambooTan : "rgba(246,242,233,0.4)",
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}