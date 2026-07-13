import React from "react";
import { Leaf, Hammer, Truck, ShieldCheck, LucideIcon } from "lucide-react";
import Image from "next/image";

// ১. পিওর ডাটা অবজেক্ট (কোনো JSX উপাদান নেই)
const colors = {
  forest: "#1F3D2B",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ink: "#2A2A22",
};

interface ReasonData {
  iconKey: "leaf" | "hammer" | "truck" | "shield";
  title: string;
  description: string;
}

const reasons: ReasonData[] = [
  {
    iconKey: "leaf",
    title: "Grown, Not Manufactured",
    description:
      "Bamboo completely regrows in 3 to 5 years without complex replanting — every individual piece starts as a purely organic, renewable resource.",
  },
  {
    iconKey: "hammer",
    title: "Hand-Finished by Artisans",
    description:
      "No assembly lines. Each product is intricately shaped, woven, and smoothly sanded by seasoned rural craftsmen across Bangladesh.",
  },
  {
    iconKey: "truck",
    title: "Nationwide Protected Shipping",
    description:
      "Wrapped thoroughly in conscious packaging and dispatched with reliable handling tiers optimized for fragile home goods.",
  },
  {
    iconKey: "shield",
    title: "Built to Last, Guaranteed",
    description:
      "Shielded with high-grade, food-safe finishes resisting regional humidity, supported by a 6-month structural warranty.",
  },
];

// আইকন ম্যাপার অবজেক্ট
const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  hammer: Hammer,
  truck: Truck,
  shield: ShieldCheck,
};

export default function WhyChooseUs(): JSX.Element {
  return (
    <section 
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden" 
      style={{ 
        backgroundColor: "#FAF8F5", 
        fontFamily: "'Inter', sans-serif" 
      }}
    >
      {/* Background radial soft light blobs */}
      <div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-multiply"
        style={{ background: `radial-gradient(circle, ${colors.cream} 0%, transparent 70%)` }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
        
        .row-item {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .row-item:hover {
          transform: translateX(6px);
        }
        .icon-envelope {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .row-item:hover .icon-envelope {
          background-color: ${colors.forest} !important;
          color: ${colors.cream} !important;
          transform: scale(1.05);
        }
      `}} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Human/Artisan Visual Content Frame */}
          <div className="lg:col-span-5 relative h-[450px] md:h-[600px] w-full group rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-black/10 z-10 transition-opacity group-hover:opacity-0 duration-500" />
            <Image
              src="/WhatsApp Image 2026-07-09 at 15.14.25.jpeg" 
              alt="Artisans crafting woven bamboo furniture"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Soft decorative accent badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-[#1F3D2B]/95 rounded-xl z-20 transition-transform duration-500">
              <p className="brand-font text-white text-lg font-medium mb-1">
                Preserving Heritage Hands
              </p>
              <p className="text-[12.5px] text-white/70 leading-relaxed">
                Every order ensures ethical income distribution across independent community clusters.
              </p>
            </div>
          </div>

          {/* Right Column: Value Propositions Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-12">
              <span
                className="text-[11px] font-bold tracking-[0.25em] uppercase block mb-3"
                style={{ color: colors.moss }}
              >
                Honest Materials &middot; Timeless Process
              </span>
              <h2 className="brand-font text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight" style={{ color: colors.ink }}>
                Rooted in craft, <span className="italic font-normal">not shortcuts</span>
              </h2>
            </div>

            <div className="flex flex-col gap-8 md:gap-10">
              {reasons.map((reason, i) => {
                // ডাইনামিকালি অবজেক্ট থেকে আইকন কম্পোনেন্ট বের করা হচ্ছে
                const IconComponent = iconMap[reason.iconKey];
                
                return (
                  <div
                    key={i}
                    className="row-item group flex gap-5 items-start"
                  >
                    <div
                      className="icon-envelope w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "rgba(31,61,43,0.06)", color: colors.forest }}
                    >
                      {IconComponent && <IconComponent size={22} strokeWidth={1.5} />}
                    </div>
                    
                    <div className="border-b pb-6 flex-1" style={{ borderColor: "rgba(31,61,43,0.08)" }}>
                      <h3 className="text-base font-semibold tracking-tight mb-2" style={{ color: colors.ink }}>
                        {reason.title}
                      </h3>
                      <p className="text-[13.5px] leading-relaxed font-normal max-w-xl" style={{ color: "rgba(42,42,34,0.65)" }}>
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}