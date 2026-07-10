"use client"
import { useState } from "react";
import { Search, ShoppingBasket, Menu, X, User } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
  ochreDeep: "#9A6F2E",
};

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Shop", href: "#" },
  { label: "Artisans", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function BambooNavbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const cartCount = 3;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
        .node-underline {
          position: relative;
        }
        .node-underline::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 0%;
          height: 2px;
          background: ${colors.bambooTan};
          transition: width 0.25s ease, left 0.25s ease;
        }
        .node-underline:hover::after,
        .node-underline.active::after {
          width: 60%;
          left: 20%;
        }
        .node-underline.active {
          color: ${colors.bambooTan} !important;
        }
        .stalk-tick {
          width: 1px;
          height: 14px;
          background: rgba(201, 168, 118, 0.35);
        }
      `}</style>

      <nav
        className="w-full sticky top-0 z-50 border-b"
        style={{
          backgroundColor: colors.forest,
          borderColor: "rgba(201, 168, 118, 0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 shrink-0">
              <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
                <rect x="12" y="0" width="6" height="34" rx="2" fill={colors.bambooTan} />
                <rect x="12" y="7" width="6" height="2.2" fill={colors.forest} />
                <rect x="12" y="16" width="6" height="2.2" fill={colors.forest} />
                <rect x="12" y="25" width="6" height="2.2" fill={colors.forest} />
                <path d="M15 7 C 8 5, 4 8, 3 3" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <path d="M15 16 C 22 14, 26 17, 27 12" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="brand-font text-xl md:text-2xl" style={{ color: colors.cream }}>
                  BambooCraft
                </span>
                <span
                  className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase mt-1"
                  style={{ color: colors.moss }}
                >
                  Handmade &middot; Sustainable
                </span>
              </div>
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-9">
              {navLinks.map((link, i) => (
                <div key={link.label} className="flex items-center gap-9">
                  <a
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className={`node-underline text-[14.5px] font-medium tracking-wide transition-colors ${
                      activeLink === link.label ? "active" : ""
                    }`}
                    style={{
                      color: activeLink === link.label ? colors.bambooTan : colors.cream,
                    }}
                  >
                    {link.label}
                  </a>
                  {i < navLinks.length - 1 && <div className="stalk-tick" />}
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                aria-label="Search products"
                className="p-2 rounded-full transition-colors hover:bg-white/5"
              >
                <Search size={19} color={colors.cream} strokeWidth={1.8} />
              </button>

              <button
                aria-label="View cart"
                className="relative p-2 rounded-full transition-colors hover:bg-white/5"
              >
                <ShoppingBasket size={19} color={colors.cream} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[10px] font-semibold"
                    style={{
                      backgroundColor: colors.ochre,
                      color: colors.cream,
                      width: 16,
                      height: 16,
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.ochre, color: colors.cream }}
              >
                <User size={15} strokeWidth={2} />
                Sign in
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X size={24} color={colors.cream} />
              ) : (
                <Menu size={24} color={colors.cream} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div
            className="lg:hidden border-t px-5 pb-6 pt-2"
            style={{
              backgroundColor: colors.forestDeep,
              borderColor: "rgba(201, 168, 118, 0.2)",
            }}
          >
            <div className="flex flex-col">
              {navLinks.map((link, i) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.label);
                      setMenuOpen(false);
                    }}
                    className="block py-4 text-[15px] font-medium"
                    style={{
                      color: activeLink === link.label ? colors.bambooTan : colors.cream,
                    }}
                  >
                    {link.label}
                  </a>
                  {i < navLinks.length - 1 && (
                    <div style={{ height: 1, background: "rgba(201, 168, 118, 0.15)" }} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-5">
              <button className="p-2.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <Search size={18} color={colors.cream} />
              </button>
              <button className="p-2.5 rounded-full relative" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <ShoppingBasket size={18} color={colors.cream} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[10px] font-semibold"
                    style={{ backgroundColor: colors.ochre, color: colors.cream, width: 16, height: 16 }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[14px] font-semibold"
                style={{ backgroundColor: colors.ochre, color: colors.cream }}
              >
                <User size={15} strokeWidth={2} />
                Sign in
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}