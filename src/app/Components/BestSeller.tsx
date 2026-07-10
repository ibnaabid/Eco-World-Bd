import { Flame, ShoppingBasket } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
};

interface BestSeller {
  rank: string;
  title: string;
  category: string;
  price: number;
  unitsSold: number;
  image: string;
}

const bestSellers: BestSeller[] = [
  {
    rank: "01",
    title: "Classic Round Basket",
    category: "Basket",
    price: 1450,
    unitsSold: 1204,
    image:"/WhatsApp Image 2026-07-09 at 15.14.23.jpeg"
  },
  {
    rank: "02",
    title: "Woven Bamboo Stool",
    category: "Furniture",
    price: 2800,
    unitsSold: 968,
    image:"/WhatsApp Image 2026-07-09 at 15.04.05.jpeg"
  },
  {
    rank: "03",
    title: "Pendant Bamboo Lamp",
    category: "Lighting",
    price: 2100,
    unitsSold: 845,
    image:"/WhatsApp Image 2026-07-09 at 15.14.37.jpeg"
  },
];

export default function BestSellers(): JSX.Element {
  const maxUnits = Math.max(...bestSellers.map((b) => b.unitsSold));

  return (
    <section
      className="py-20 px-5 md:px-8"
      style={{ backgroundColor: colors.forest, fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
        .rank-num {
          -webkit-text-stroke: 1.5px rgba(201,168,118,0.5);
          color: transparent;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-3">
          <Flame size={16} color={colors.ochre} fill={colors.ochre} />
          <span
            className="text-[12px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: colors.bambooTan }}
          >
            Most Loved
          </span>
        </div>
        <h2 className="brand-font text-3xl md:text-4xl mb-12" style={{ color: colors.cream }}>
          Best Sellers
        </h2>

        <div className="flex flex-col gap-4">
          {bestSellers.map((item) => (
            <div
              key={item.rank}
              className="group flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 p-5 sm:p-6 rounded-2xl border transition-colors duration-300 hover:bg-white/[0.03]"
              style={{ borderColor: "rgba(201,168,118,0.15)" }}
            >
              <span className="brand-font rank-num text-5xl sm:text-6xl leading-none shrink-0">
                {item.rank}
              </span>

              <div className="w-full sm:w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: "#2A4A35" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-[16px] font-semibold" style={{ color: colors.cream }}>
                    {item.title}
                  </h3>
                  <span
                    className="text-[10.5px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wide"
                    style={{ backgroundColor: "rgba(201,168,118,0.15)", color: colors.bambooTan }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* sales bar */}
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(item.unitsSold / maxUnits) * 100}%`,
                      backgroundColor: colors.ochre,
                    }}
                  />
                </div>
                <span className="text-[11.5px] mt-1.5 block" style={{ color: "rgba(246,242,233,0.55)" }}>
                  {item.unitsSold.toLocaleString()} sold this year
                </span>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-2 shrink-0">
                <span className="text-[18px] font-bold" style={{ color: colors.bambooTan }}>
                  &#2547;{item.price.toLocaleString()}
                </span>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: colors.ochre, color: colors.cream }}
                >
                  <ShoppingBasket size={13} />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}