// ফাইল পাথ: app/customerPanel/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings, LogOut, Menu, X, User, Star } from "lucide-react";

export default function CustomerPanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

const menuItems = [
  { name: "Dashboard Overview", href: "/dashboard/customer/dashboard", icon: LayoutDashboard },
  { name: "Explore Favourite Items", href: "/dashboard/customer/favorites", icon: ShoppingBag },
    { name: "Customer Reviews", href: "/dashboard/customer/reviews", icon: Star },
  { name: "Add Custom orders", href: "/dashboard/customer/orders", icon: PlusCircle },
  { name: "Manage Profile", href: "/dashboard/customer/manage", icon: Settings },
];
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#211F16] flex relative overflow-hidden">
      
      {/* MOBILE SIDEBAR BACKDROP */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 bg-[#16301F] text-[#FAF7F0] w-64 p-6 flex flex-col justify-between 
        transition-transform duration-300 ease-in-out z-50
        lg:static lg:translate-x-0 lg:h-screen lg:w-64 shrink-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-xl font-bold tracking-wide border-b-2 border-[#D4B483] pb-1" style={{ fontFamily: "Georgia, serif" }}>
                Eco World_BD
              </span>
            </Link>
            <button className="lg:hidden text-[#FAF7F0] p-1 hover:bg-white/10 rounded-lg" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive ? "bg-[#7FA36A] text-white font-semibold shadow-md" : "text-[#FAF7F0]/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Sign Out */}
        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#D4B483]/20 flex items-center justify-center text-[#D4B483]">
              <User size={18} />
            </div>
            <div>
              <p className="text-[10px] text-[#FAF7F0]/50">Customer Account</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto z-30">
        {/* MOBILE TOP NAVBAR */}
        <header className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:hidden z-40 shadow-sm">
          <span className="text-lg font-bold text-[#16301F]" style={{ fontFamily: "Georgia, serif" }}>Eco World_BD</span>
          <button className="p-2 text-[#16301F] hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
        </header>

        {/* PAGE BODY */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
          {children} {/* আপনার সব পেজের কনটেন্ট স্বয়ংক্রিয়ভাবে এখানে লোড হবে */}
        </main>
      </div>

    </div>
  );
}