import { Leaf, Hammer, Truck, ShieldCheck } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ink: "#2A2A22",
};

interface Reason {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: <Leaf size={22} strokeWidth={1.7} />,
    title: "Grown, Not Manufactured",
    description:
      "Bamboo regrows in 3-5 years without replanting — every piece starts as a renewable material, not a factory input.",
  },
  {
    icon: <Hammer size={22} strokeWidth={1.7} />,
    title: "Hand-Finished by Artisans",
    description:
      "No two pieces are identical. Each is shaped, woven, and sanded by craftsmen across rural Bangladesh.",
  },
  {
    icon: <Truck size={22} strokeWidth={1.7} />,
    title: "Nationwide Delivery",
    description:
      "Carefully packed and shipped across the country, with tracked delivery and careful handling for fragile pieces.",
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={1.7} />,
    title: "Built to Last, Guaranteed",
    description:
      "Treated and food-safe finishes on every item, backed by a 6-month craftsmanship warranty.",
  },
];

export default function WhyChooseUs(): JSX.Element {
  return (
    <section className="py-20 px-5 md:px-8" style={{ backgroundColor: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span
            className="text-[12px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: colors.moss }}
          >
            Why BambooCraft
          </span>
          <h2 className="brand-font text-3xl md:text-4xl mt-2 mb-4" style={{ color: colors.ink }}>
            Rooted in craft, not shortcuts
          </h2>
          <p className="text-[14.5px] leading-relaxed" style={{ color: "rgba(42,42,34,0.6)" }}>
            We work directly with rural artisan communities so the value of
            every purchase goes back to the hands that made it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5"
              style={{ borderColor: "rgba(31,61,43,0.08)", backgroundColor: colors.cream }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:text-white"
                style={{ backgroundColor: "rgba(31,61,43,0.08)", color: colors.forest }}
              >
                {reason.icon}
              </div>
              <h3 className="text-[15.5px] font-semibold mb-2" style={{ color: colors.ink }}>
                {reason.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(42,42,34,0.6)" }}>
                {reason.description}
              </p>

              <span
                className="brand-font absolute top-6 right-7 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: colors.bambooTan }}
              >
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .group:hover > div:first-child {
          background-color: ${colors.forest} !important;
        }
      `}</style>
    </section>
  );
}