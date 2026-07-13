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
const ADMIN_EMAILS = ["mdmosabbirrahman07@gmail.com"];

export default function BambooNavbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(0);
  const cartCount = 3;

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  const username = session?.user?.name || "Profile";
  const userEmail = session?.user?.email;

  const isAdmin = userEmail ? ADMIN_EMAILS.includes(userEmail) : false;
  const dashboardHref = isAdmin ? "/dashboard/admin" : "/dashboard/customer";

  const loggedInLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Dashboard", href: dashboardHref },
    { label: "My Orders", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  const links: NavLink[] = isLoggedIn
    ? [
        ...loggedInLinks,
        { label: username, href: dashboardHref, variant: "username" },
        { label: "Logout", href: "#", variant: "outline" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
        { label: "Login", href: "/login", variant: "outline" },
        { label: "Register", href: "/register", variant: "button" },
      ];

  const plainLinks = links.filter((l) => !l.variant);
  const actionLinks = links.filter((l) => l.variant);

  useEffect(() => {
    if (panelRef.current) {
      setPanelHeight(menuOpen ? panelRef.current.scrollHeight : 0);
    }
  }, [menuOpen, isLoggedIn, isPending, dashboardHref]);

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
            <Logo />
            <DesktopNav
              plainLinks={plainLinks}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              isPending={isPending}
            />
            <DesktopActions
              actionLinks={actionLinks}
              cartCount={cartCount}
              handleLogout={handleLogout}
              isPending={isPending}
              colors={colors}
            />
            <MobileMenuToggle
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              colors={colors}
            />
          </div>
        </div>

        <MobileDropdown
          menuOpen={menuOpen}
          panelHeight={panelHeight}
          panelRef={panelRef}
          plainLinks={plainLinks}
          actionLinks={actionLinks}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          setMenuOpen={setMenuOpen}
          cartCount={cartCount}
          handleLogout={handleLogout}
          isPending={isPending}
          colors={colors}
        />
      </nav>
    </div>
  );
}

/* ====================== Sub Components ====================== */

function Logo() {
  const { bambooTan, cream, moss, forest } = colors;
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <svg width="24" height="28" viewBox="0 0 30 34" fill="none">
        <rect x="12" y="0" width="6" height="34" rx="2" fill={bambooTan} />
        <rect x="12" y="7" width="6" height="2.2" fill={forest} />
        <rect x="12" y="16" width="6" height="2.2" fill={forest} />
        <rect x="12" y="25" width="6" height="2.2" fill={forest} />
        <path d="M15 7 C 8 5, 4 8, 3 3" stroke={moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M15 16 C 22 14, 26 17, 27 12" stroke={moss} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </svg>
      <h2 className="brand-font text-lg leading-none" style={{ color: cream }}>
        Eco <span className="font-bold text-gray-400">World_Bd</span>
      </h2>
    </Link>
  );
}

interface DesktopNavProps {
  plainLinks: NavLink[];
  activeLink: string;
  setActiveLink: (label: string) => void;
  isPending: boolean;
}

function DesktopNav({ plainLinks, activeLink, setActiveLink, isPending }: DesktopNavProps) {
  const { bambooTan, cream } = colors;
  return (
    <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-center min-w-0 overflow-hidden">
      {!isPending &&
        plainLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setActiveLink(link.label)}
            className={`node-underline text-[12.5px] xl:text-[13px] font-medium transition-colors ${
              activeLink === link.label ? "active" : ""
            }`}
            style={{ color: activeLink === link.label ? bambooTan : cream }}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
}

interface DesktopActionsProps {
  actionLinks: NavLink[];
  cartCount: number;
  handleLogout: () => void;
  isPending: boolean;
  colors: typeof colors;
}

function DesktopActions({ actionLinks, cartCount, handleLogout, isPending, colors }: DesktopActionsProps) {
  const { cream, ochre } = colors;

  return (
    <div className="hidden lg:flex items-center gap-2.5 shrink-0">
      <CartButton cartCount={cartCount} colors={colors} />

      {!isPending &&
        actionLinks.map((link) => {
          if (link.label === "Logout") {
            return (
              <button
                key={link.label}
                onClick={handleLogout}
                className="text-[12.5px] xl:text-[13px] font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors border"
                style={{ borderColor: "rgba(201,168,118,0.35)", color: cream }}
              >
                Logout
              </button>
            );
          }

          if (link.variant === "username") {
            return (
              <UsernameLink key={link.label} label={link.label} href={link.href} colors={colors} />
            );
          }

          return (
            <ActionLink
              key={link.label}
              label={link.label}
              href={link.href}
              variant={link.variant}
              colors={colors}
            />
          );
        })}
    </div>
  );
}

function CartButton({ cartCount, colors }: { cartCount: number; colors: typeof colors }) {
  const { cream, ochre } = colors;
  return (
    <button aria-label="Cart" className="relative p-2 rounded-full transition-colors hover:bg-white/5">
      <ShoppingBasket size={17} color={cream} strokeWidth={1.8} />
      {cartCount > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-[10px] font-semibold"
          style={{ backgroundColor: ochre, color: cream, width: 16, height: 16 }}
        >
          {cartCount}
        </span>
      )}
    </button>
  );
}

function UsernameLink({ label, href, colors }: { label: string; href: string; colors: typeof colors }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 text-[12.5px] xl:text-[13px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap bg-white/10 max-w-[150px] truncate"
      style={{ color: colors.bambooTan }}
    >
      <User size={14} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function ActionLink({
  label,
  href,
  variant,
  colors,
}: {
  label: string;
  href: string;
  variant?: string;
  colors: typeof colors;
}) {
  const { cream, ochre } = colors;
  return (
    <Link
      href={href}
      className="text-[12.5px] xl:text-[13px] font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors"
      style={
        variant === "button"
          ? { backgroundColor: ochre, color: cream }
          : { border: "1px solid rgba(201,168,118,0.35)", color: cream }
      }
    >
      {label}
    </Link>
  );
}

interface MobileMenuToggleProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  colors: typeof colors;
}

function MobileMenuToggle({ menuOpen, setMenuOpen, colors }: MobileMenuToggleProps) {
  return (
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
  );
}

interface MobileDropdownProps {
  menuOpen: boolean;
  panelHeight: number;
  panelRef: React.RefObject<HTMLDivElement | null>;
  plainLinks: NavLink[];
  actionLinks: NavLink[];
  activeLink: string;
  setActiveLink: (label: string) => void;
  setMenuOpen: (open: boolean) => void;
  cartCount: number;
  handleLogout: () => void;
  isPending: boolean;
  colors: typeof colors;
}

function MobileDropdown({
  menuOpen,
  panelHeight,
  panelRef,
  plainLinks,
  actionLinks,
  activeLink,
  setActiveLink,
  setMenuOpen,
  cartCount,
  handleLogout,
  isPending,
  colors,
}: MobileDropdownProps) {
  const { forestDeep, cream, ochre, bambooTan } = colors;

  return (
    <div
      className="lg:hidden dropdown-panel w-full border-b"
      style={{
        maxHeight: panelHeight,
        opacity: menuOpen ? 1 : 0,
        backgroundColor: forestDeep,
        borderColor: "rgba(201,168,118,0.2)",
      }}
    >
      <div ref={panelRef} className="px-5 pb-6 pt-3">
        <div className="max-w-[1500px] mx-auto flex flex-col">
          {!isPending &&
            plainLinks.map((link, i) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                  className="flex items-center py-3.5 text-[15px] font-medium"
                  style={{ color: activeLink === link.label ? bambooTan : cream }}
                >
                  {link.label}
                </Link>
                {i < plainLinks.length - 1 && (
                  <div style={{ height: 1, background: "rgba(201,168,118,0.12)" }} />
                )}
              </div>
            ))}

          <div className="flex items-center gap-3 mt-5">
            <CartButton cartCount={cartCount} colors={colors} />

            {!isPending &&
              actionLinks.map((link) => {
                if (link.label === "Logout") {
                  return (
                    <button
                      key={link.label}
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex-1 flex items-center justify-center py-2.5 rounded-full text-[13.5px] font-semibold border"
                      style={{ borderColor: "rgba(201,168,118,0.35)", color: cream }}
                    >
                      Logout
                    </button>
                  );
                }

                if (link.variant === "username") {
                  return (
                    <UsernameLink
                      key={link.label}
                      label={link.label}
                      href={link.href}
                      colors={colors}
                    />
                  );
                }

                return (
                  <ActionLink
                    key={link.label}
                    label={link.label}
                    href={link.href}
                    variant={link.variant}
                    colors={colors}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}