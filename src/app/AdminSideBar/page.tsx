"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  MessageSquare, 
  Users, 
  ShieldCheck,
  Settings,
  ChevronRight
} from "lucide-react";

const colors = {
  bgPremiumDark: "#0D1B12", // নতুন আল্ট্রা-প্রিমিয়াম ডিপ ডার্ক ব্যাকগ্রাউন্ড
  forestDeep: "#132519",    // সাইডবারের ব্যাকগ্রাউন্ড
  bambooTan: "#C9A876",
  moss: "#6B8F5C",
};

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { id: "dashboard", label: "Dashboard Overview", href: "/dashboard/admin/dashboard", icon: LayoutDashboard },
    { id: "add-product", label: "Add New Product", href: "/dashboard/admin/add-product", icon: PlusCircle },

    { id: "Craft", label: "Manage Crafts", href: "/dashboard/admin/craft", icon: Users },
    { id: "privacy", label: "Privacy & Guardrails", href: "/dashboard/admin/privacy", icon: ShieldCheck },
  ];

  return (
    <aside 
      className="w-66 shrink-0 hidden md:flex flex-col text-white sticky top-0 h-screen z-20 border-r border-white/[0.04] shadow-2xl transition-all duration-300" 
      style={{ backgroundColor: colors.forestDeep }}
    >
      {/* 🌟 Brand Logo Section */}
      <div className="h-[75px] px-6 flex items-center justify-between border-b border-white/[0.06] bg-black/20">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="relative p-1.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
            <svg width="22" height="26" viewBox="0 0 30 34" fill="none">
              <rect x="12" y="0" width="6" height="34" rx="2" fill={colors.bambooTan} />
              <path d="M15 7 C 8 5, 4 8, 3 3" stroke={colors.moss} strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M15 16 C 22 14, 26 17, 27 12" stroke={colors.moss} strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[15px] font-semibold tracking-wide text-[#F6F2E9] leading-none mb-1">
              Eco World
            </span>
            <span className="text-[10px] text-white/40 tracking-widest uppercase font-medium">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* 🚀 Navigation System */}
      <nav className="flex-1 p-4 flex flex-col gap-2 mt-4 overflow-y-auto custom-scrollbar">
        <span className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1 block">
          Core Menu
        </span>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl text-[13.5px] font-medium w-full text-left transition-all duration-200 relative overflow-hidden ${
                isActive 
                  ? "bg-gradient-to-r from-white/10 to-white/[0.01] text-white font-semibold shadow-inner" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {/* Active Indicator Left Glow */}
              {isActive && (
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[4px] rounded-r-md" 
                  style={{ 
                    backgroundColor: colors.bambooTan,
                    boxShadow: `0 0 12px ${colors.bambooTan}`
                  }} 
                />
              )}

              {/* Icon & Label */}
              <div className="flex items-center gap-3.5 z-10">
                <Icon 
                  size={18} 
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ color: isActive ? colors.bambooTan : "inherit" }} 
                />
                <span className="tracking-wide">{item.label}</span>
              </div>

              {/* Arrow Icon */}
              <ChevronRight 
                size={14} 
                className={`opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 ${
                  isActive ? "text-[#C9A876] opacity-60" : "text-white/30"
                }`} 
              />
            </Link>
          );
        })}
      </nav>

      {/* ⚙️ Bottom Action Layout Footer */}
      <div className="p-4 border-t border-white/[0.06] bg-black/10 flex flex-col gap-3">
        <Link 
          href="/dashboard/admin/settings"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
            pathname === "/dashboard/admin/settings" ? "text-white bg-white/5" : "text-white/50 hover:text-white"
          }`}
        >
          <Settings size={16} />
          <span>Panel Settings</span>
        </Link>
        
        <div className="text-[10px] text-white/20 text-center font-medium tracking-wide">
          Eco World Bd &copy; 2026 • Live Panel
        </div>
      </div>
    </aside>
  );
}