"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBasket, Menu, ChevronDown, User } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const colors = {
  forest: "#1F3D2B",
  forestDeep: "#16301F",
  moss: "#6B8F5C",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  ochre: "#B8863B",
};

interface NavLink {
  label: string;
  href: string;
  variant?: "button" | "outline" | "username";
}

// 🎯 এখানে আপনার প্রজেক্টের অ্যাডমিন ইমেইলগুলো বসিয়ে দিন
const ADMIN_EMAILS = [
  "mdmosabbirrahman07@gmail.com",
   // আপনার নিজের ইমেইলটি এখানে দিয়ে টেস্ট করতে পারেন
];

// Logged out — 7 routes
const loggedOutLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Login", href: "/login", variant: "outline" },
  { label: "Register", href: "/register", variant: "button" },
];

export default function BambooNavbar(): JSX.Element {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const cartCount = 3;

  // Better Auth থেকে সেশন এবং ইউজারের ডাটা ফেচ করা হচ্ছে
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const username = session?.user?.name || "Profile";
  const userEmail = session?.user?.email;

  // 🎯 লগইন করা ইউজারের ইমেইলটি ADMIN_EMAILS অ্যারেতে আছে কিনা চেক করা হচ্ছে
  const isAdmin = userEmail ? ADMIN_EMAILS.includes(userEmail) : false;
  const dashboardHref = isAdmin ? "/dashboard/admin" : "/dashboard/customer";

  // Logged in — বেস রুটগুলোকে ডায়নামিক ড্যাশবোর্ড লিংকের সাথে জেনারেট করা হচ্ছে
  const loggedInLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Dashboard", href: dashboardHref }, // 🎯 Dynamic Admin / Customer Link
    { label: "My Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  // ডায়নামিক্যালি লিংক জেনারেট করা হচ্ছে সেশনের ওপর ভিত্তি করে
  const links: NavLink[] = isLoggedIn
    ? [
        ...loggedInLinks,
        { label: username, href: dashboardHref, variant: "username" },
        { label: "Logout", href: "#", variant: "outline" },
      ]
    : loggedOutLinks;

  const plainLinks = links.filter((l) => !l.variant);
  const actionLinks = links.filter((l) => l.variant);

  useEffect(() => {
    if (panelRef.current) {
      setPanelHeight(menuOpen ? panelRef.current.scrollHeight : 0);
    }
  }, [menuOpen, isLoggedIn, isPending, dashboardHref]);

  // Logout হ্যান্ডলার
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
        .node-underline { position: relative; white-space: nowrap; }
        .node-underline::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -22px;
          width: 0%;
          height: 2px;
          background: ${colors.bambooTan};
          transition: width 0.25s ease, left 0.25s ease;
        }
        .node-underline:hover::after,
        .node-underline.active::after { width: 70%; left: 15%; }
        .node-underline.active { color: ${colors.bambooTan} !important; }
        .dropdown-panel { transition: max-height 0.35s ease, opacity 0.3s ease; overflow: hidden; }
        .chevron-icon { transition: transform 0.3s ease; }
      `}</style>

      <nav
        className="w-full sticky top-0 z-50 border-b"
        style={{ backgroundColor: colors.forest, borderColor: "rgba(201,168,118,0.2)" }}
      >
        <div className="w-full px-5 md:px-8">
          <div className="max-w-[1500px] mx-auto flex items-center justify-between h-[70px] gap-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <svg width="24" height="28" viewBox="0 0 30 34" fill="none">
                <rect x="12" y="0" width="6" height="34" rx="2" fill={colors.bambooTan} />
                <rect x="12" y="7" width="6" height="2.2" fill={colors.forest} />
                <rect x="12" y="16" width="6" height="2.2" fill={colors.forest} />
                <rect x="12" y="25" width="6" height="2.2" fill={colors.forest} />
                <path d="M15 7 C 8 5, 4 8, 3 3" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <path d="M15 16 C 22 14, 26 17, 27 12" stroke={colors.moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
              <h2 className="brand-font text-lg leading-none" style={{ color: colors.cream }}>
                Eco <span className="font-bold text-gray-400">World_Bd</span>
              </h2>
            </Link>

            {/* Desktop nav — plain route links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-center min-w-0 overflow-hidden">
              {!isPending && plainLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`node-underline text-[12.5px] xl:text-[13px] font-medium transition-colors ${
                    activeLink === link.label ? "active" : ""
                  }`}
                  style={{ color: activeLink === link.label ? colors.bambooTan : colors.cream }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop actions — cart + auth actions */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <button aria-label="Cart" className="relative p-2 rounded-full transition-colors hover:bg-white/5">
                <ShoppingBasket size={17} color={colors.cream} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[10px] font-semibold"
                    style={{ backgroundColor: colors.ochre, color: colors.cream, width: 16, height: 16 }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {!isPending && actionLinks.map((link) => {
                if (link.label === "Logout") {
                  return (
                    <button
                      key={link.label}
                      onClick={handleLogout}
                      className="text-[12.5px] xl:text-[13px] font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors border"
                      style={{ borderColor: "rgba(201,168,118,0.35)", color: colors.cream }}
                    >
                      Logout
                    </button>
                  );
                }

                if (link.variant === "username") {
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setActiveLink(link.label)}
                      className="flex items-center gap-1.5 text-[12.5px] xl:text-[13px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap bg-white/10 max-w-[150px] truncate"
                      style={{ color: colors.bambooTan }}
                    >
                      <User size={14} />
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className="text-[12.5px] xl:text-[13px] font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors"
                    style={
                      link.variant === "button"
                        ? { backgroundColor: colors.ochre, color: colors.cream }
                        : { border: "1px solid rgba(201,168,118,0.35)", color: colors.cream }
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile dropdown toggle */}
            <button
              className="lg:hidden flex items-center gap-1.5 p-2 shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} color={colors.cream} />
              <ChevronDown
                size={15}
                color={colors.bambooTan}
                className="chevron-icon"
                style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        <div
          className="lg:hidden dropdown-panel w-full border-b"
          style={{
            maxHeight: panelHeight,
            opacity: menuOpen ? 1 : 0,
            backgroundColor: colors.forestDeep,
            borderColor: "rgba(201,168,118,0.2)",
          }}
        >
          <div ref={panelRef} className="px-5 pb-6 pt-3">
            <div className="max-w-[1500px] mx-auto flex flex-col">
              {!isPending && plainLinks.map((link, i) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.label);
                      setMenuOpen(false);
                    }}
                    className="flex items-center py-3.5 text-[15px] font-medium"
                    style={{ color: activeLink === link.label ? colors.bambooTan : colors.cream }}
                  >
                    {link.label}
                  </Link>
                  {i < plainLinks.length - 1 && (
                    <div style={{ height: 1, background: "rgba(201,168,118,0.12)" }} />
                  )}
                </div>
              ))}

              <div className="flex items-center gap-3 mt-5">
                <button className="p-2.5 rounded-full relative shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <ShoppingBasket size={17} color={colors.cream} />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[10px] font-semibold"
                      style={{ backgroundColor: colors.ochre, color: colors.cream, width: 16, height: 16 }}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>

                {!isPending && actionLinks.map((link) => {
                  if (link.label === "Logout") {
                    return (
                      <button
                        key={link.label}
                        onClick={() => {
                          setMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex-1 flex items-center justify-center py-2.5 rounded-full text-[13.5px] font-semibold border"
                        style={{ borderColor: "rgba(201,168,118,0.35)", color: colors.cream }}
                      >
                        Logout
                      </button>
                    );
                  }

                  if (link.variant === "username") {
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.label);
                          setMenuOpen(false);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[13.5px] font-medium bg-white/10 truncate"
                        style={{ color: colors.bambooTan }}
                      >
                        <User size={14} />
                        <span className="truncate">{link.label}</span>
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.label);
                        setMenuOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center py-2.5 rounded-full text-[13.5px] font-semibold"
                      style={
                        link.variant === "button"
                          ? { backgroundColor: colors.ochre, color: colors.cream }
                          : { border: "1px solid rgba(201,168,118,0.35)", color: colors.cream }
                      }
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}