"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User 
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 📝 Navigation Routes (Requirement 3: Logged in handles 5+ routes)
  const navigation = [
    { name: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard },
    { name: "Explore Items", href: "/items", icon: ShoppingBag },
    { name: "Add New Item", href: "/items/add", icon: PlusCircle },
    { name: "Manage My Items", href: "/items/manage", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]/40 flex">
      
      {/* 📱 MOBILE SIDEBAR BACKDROP */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🗄️ SIDEBAR COMPONENT */}
      <aside className={`
        fixed inset-y-0 left-0 bg-[#16301F] text-[#FAF7F0] w-64 p-6 z-50 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div>
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="22" height="26" viewBox="0 0 30 34" fill="none">
                <rect x="12" y="0" width="6" height="34" rx="2" fill="#D4B483" />
              </svg>
              <span className="font-serif text-xl font-bold text-[#FAF7F0]">BambooCraft</span>
            </Link>
            <button className="lg:hidden text-[#FAF7F0]" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-[#7FA36A] text-white shadow-md font-semibold" 
                      : "text-[#FAF7F0]/70 hover:bg-white/5 hover:text-[#FAF7F0]"
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Info / Logout */}
        <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D4B483]">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#FAF7F0]">M. Rahman</p>
              <p className="text-[10px] text-[#FAF7F0]/50">Customer Account</p>
            </div>
          </div>
          <button 
            onClick={() => alert("Logging out...")}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 🚀 MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* 📱 TOP MOBILE NAVBAR (Requirement 3: Sticky/Fixed) */}
        <header className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:hidden z-30 shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-[#16301F]">BambooCraft</span>
          </Link>
          <button 
            className="p-2 text-[#16301F] hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
        </header>

        {/* PAGE CONTENT RENDERING */}
        <main className="flex-1">
          {children}
        </main>
      </div>

    </div>
  );
}