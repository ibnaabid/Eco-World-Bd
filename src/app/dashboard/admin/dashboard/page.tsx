"use client";

import { useEffect, useState } from "react";
import { User, Calendar, ShieldCheck, Sparkles, TrendingUp, ShoppingBag, DollarSign, ArrowUpRight } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const colors = {
  bgPremiumDark: "#0D1B12", 
  cardDark: "#132519",       
  bambooTan: "#C9A876",      
  moss: "#6B8F5C",
  cream: "#F6F2E9"
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);     // ← Fixed: Proper typing
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" style={{ color: colors.bambooTan }}></span>
      </div>
    );
  }

  const salesData = [
    { month: "Jan", sales: 45 },
    { month: "Feb", sales: 52 },
    { month: "Mar", sales: 49 },
    { month: "Apr", sales: 63 },
    { month: "May", sales: 58 },
    { month: "Jun", sales: 75 },
    { month: "Jul", sales: 88 },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      {/* 🌟 PREMIUM HERO GREETINGS CARD */}
      <div 
        className="rounded-3xl p-6 sm:p-8 border border-white/[0.04] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{ backgroundColor: colors.cardDark }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A876]/[0.03] blur-[80px] rounded-full pointer-events-none" />
        <div className="z-10">
          <div className="flex items-center gap-2.5 mb-2">
            <h1 className="brand-font text-2xl sm:text-3xl font-semibold tracking-wide" style={{ color: colors.cream }}>
              Hey, Whats going on!👋
            </h1>
            <Sparkles size={20} className="animate-pulse" style={{ color: colors.bambooTan }} />
          </div>
          <h2 className="text-lg font-medium opacity-90" style={{ color: colors.bambooTan }}>
            Welcome Back, {user?.name || "Admin Mama"}
          </h2>
          <p className="text-xs text-white/50 mt-1 max-w-xl leading-relaxed">
            Here is your live analytics overview for Eco World Handicraft. Track your sales growth and performance.
          </p>
        </div>
        <div className="shrink-0 z-10 bg-white/[0.03] border border-white/[0.06] px-5 py-2.5 rounded-2xl md:text-center min-w-[130px]">
          <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5 font-bold">Access Level</p>
          <p className="text-[13px] font-bold capitalize" style={{ color: colors.bambooTan }}>
            {user?.role || "Super Admin"}
          </p>
        </div>
      </div>

      {/* 📊 QUICK STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-white/[0.04] p-5 flex items-center justify-between shadow-lg" style={{ backgroundColor: colors.cardDark }}>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.03]">
              <DollarSign size={20} style={{ color: colors.bambooTan }} />
            </div>
            <div>
              <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Total Revenue</p>
              <h3 className="font-bold text-xl mt-0.5" style={{ color: colors.cream }}>৳142,500</h3>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-0.5">
            +12% <ArrowUpRight size={12} />
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-5 flex items-center justify-between shadow-lg" style={{ backgroundColor: colors.cardDark }}>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.03]">
              <ShoppingBag size={20} style={{ color: colors.bambooTan }} />
            </div>
            <div>
              <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Total Orders</p>
              <h3 className="font-bold text-xl mt-0.5" style={{ color: colors.cream }}>324 Items</h3>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg flex items-center gap-0.5">
            +8% <ArrowUpRight size={12} />
          </span>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-5 flex items-center gap-4 shadow-lg" style={{ backgroundColor: colors.cardDark }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.03]">
            <Calendar size={20} style={{ color: colors.bambooTan }} />
          </div>
          <div>
            <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Today's Date</p>
            <h3 className="font-semibold text-[13.5px] mt-1" style={{ color: colors.cream }}>
              {new Date().toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
            </h3>
          </div>
        </div>
      </div>

      {/* 📈 CUSTOM SVG SALES ANALYTICS CHART */}
      <div 
        className="rounded-3xl p-6 border border-white/[0.04] shadow-2xl flex flex-col gap-6"
        style={{ backgroundColor: colors.cardDark }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: colors.bambooTan }} />
            <h3 className="text-[15px] font-semibold tracking-wide" style={{ color: colors.cream }}>
              Sales Growth Analytics
            </h3>
          </div>
          <span className="text-[11px] text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            Live Database (Monthly)
          </span>
        </div>

        <div className="relative w-full h-48 sm:h-60 mt-2">
          <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.bambooTan} stopOpacity="0.25" />
                <stop offset="100%" stopColor={colors.bambooTan} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="0" y1="50" x2="700" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="150" x2="700" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

            <path
              d="M 0 160 L 100 140 L 200 145 L 300 110 L 400 120 L 500 80 L 700 40 L 700 200 L 0 200 Z"
              fill="url(#chartGradient)"
            />

            <path
              d="M 0 160 L 100 140 L 200 145 L 300 110 L 400 120 L 500 80 L 700 40"
              fill="none"
              stroke={colors.bambooTan}
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle cx="100" cy="140" r="4" fill={colors.cream} stroke={colors.bambooTan} strokeWidth="2" />
            <circle cx="300" cy="110" r="4" fill={colors.cream} stroke={colors.bambooTan} strokeWidth="2" />
            <circle cx="500" cy="80" r="4" fill={colors.cream} stroke={colors.bambooTan} strokeWidth="2" />
            <circle cx="700" cy="40" r="5" fill={colors.bambooTan} className="animate-ping" />
            <circle cx="700" cy="40" r="4" fill={colors.cream} stroke={colors.bambooTan} strokeWidth="2" />
          </svg>
        </div>

        <div className="flex justify-between text-[11px] font-medium text-white/30 px-1 border-t border-white/5 pt-3">
          {salesData.map((data, idx) => (
            <span key={idx} className="hover:text-white transition-colors">{data.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}