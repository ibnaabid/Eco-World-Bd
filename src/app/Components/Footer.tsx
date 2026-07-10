import { useState } from "react";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#152A1C",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
};

const shopLinks = ["Baskets", "Furniture", "Lighting", "Kitchenware", "New Arrivals"];
const companyLinks = ["About Us", "Our Artisans", "Blog", "Careers", "Contact"];
const supportLinks = ["Shipping Info", "Returns & Warranty", "FAQ", "Privacy Policy", "Terms of Service"];

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ backgroundColor: colors.forestDeep, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      {/* Newsletter strip */}
      <div className="border-b" style={{ borderColor: "rgba(201,168,118,0.12)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="brand-font text-xl md:text-2xl mb-1" style={{ color: colors.cream }}>
              Join the workshop letter
            </h3>
            <p className="text-[13px]" style={{ color: "rgba(246,242,233,0.55)" }}>
              New pieces, artisan stories, and early access — twice a month.
            </p>
          </div>

          {subscribed ? (
            <span className="text-[13.5px] font-medium" style={{ color: colors.bambooTan }}>
              You're on the list — thank you!
            </span>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-4 py-3 rounded-l-full text-[13.5px] outline-none"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: colors.cream }}
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-3 rounded-r-full text-[13px] font-semibold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.ochre, color: colors.cream }}
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand + contact */}
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <svg width="24" height="27" viewBox="0 0 30 34" fill="none">
              <rect x="12" y="0" width="6" height="34" rx="2" fill={colors.bambooTan} />
              <rect x="12" y="7" width="6" height="2.2" fill={colors.forestDeep} />
              <rect x="12" y="16" width="6" height="2.2" fill={colors.forestDeep} />
              <rect x="12" y="25" width="6" height="2.2" fill={colors.forestDeep} />
              <path d="M15 7 C 8 5, 4 8, 3 3" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d="M15 16 C 22 14, 26 17, 27 12" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
            <span className="brand-font text-xl" style={{ color: colors.cream }}>
              BambooCraft
            </span>
          </div>
          <p className="text-[13.5px] leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(246,242,233,0.55)" }}>
            Handwoven and hand-built bamboo goods, made by artisan
            communities across Bangladesh.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <MapPin size={15} color={colors.bambooTan} />
              <span className="text-[13px]" style={{ color: "rgba(246,242,233,0.7)" }}>
                Mirpur DOHS, Dhaka, Bangladesh
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={15} color={colors.bambooTan} />
              <span className="text-[13px]" style={{ color: "rgba(246,242,233,0.7)" }}>
                +880 1322-810864
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={15} color={colors.bambooTan} />
              <span className="text-[13px]" style={{ color: "rgba(246,242,233,0.7)" }}>
                hello@bamboocraft.com
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <Icon size={15} color={colors.cream} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h4 className="text-[12px] font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: colors.bambooTan }}>
            Shop
          </h4>
          <ul className="flex flex-col gap-3">
            {shopLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-[13.5px] transition-colors hover:text-white" style={{ color: "rgba(246,242,233,0.6)" }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company links */}
        <div>
          <h4 className="text-[12px] font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: colors.bambooTan }}>
            Company
          </h4>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-[13.5px] transition-colors hover:text-white" style={{ color: "rgba(246,242,233,0.6)" }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support links */}
        <div>
          <h4 className="text-[12px] font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: colors.bambooTan }}>
            Support
          </h4>
          <ul className="flex flex-col gap-3">
            {supportLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-[13.5px] transition-colors hover:text-white" style={{ color: "rgba(246,242,233,0.6)" }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "rgba(201,168,118,0.12)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12px]" style={{ color: "rgba(246,242,233,0.45)" }}>
            &copy; 2026 BambooCraft. All rights reserved.
          </span>
          <span className="text-[12px]" style={{ color: "rgba(246,242,233,0.45)" }}>
            Made with care for artisan communities in Bangladesh
          </span>
        </div>
      </div>
    </footer>
  );
}