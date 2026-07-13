"use client";

import { useEffect, useState } from "react";
import {
  User,
  Calendar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
// import { authClient } from "../../lib/auth-client";

const colors = {
  bgPremiumDark: "#0D1B12",
  cardDark: "#132519",
  bambooTan: "#C9A876",
  moss: "#6B8F5C",
  cream: "#F6F2E9"
};

interface SessionUser {
  name?: string;
  email?: string;
  image?: string | null;     // ← Fixed: Allow null
  role?: string;
}

export default function DashboardGreetings() {
  const [user, setUser] = useState<SessionUser | null>(null);
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
      <div className="min-h-[40vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" style={{ color: colors.bambooTan }}></span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      {/* 🌟 PREMIUM HERO GREETINGS CARD */}
      <div 
        className="rounded-3xl p-8 sm:p-10 border border-white/[0.04] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{ backgroundColor: colors.cardDark }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A876]/[0.03] blur-[80px] rounded-full pointer-events-none" />

        <div className="z-10">
          <div className="flex items-center gap-2.5 mb-3">
            <h1 className="brand-font text-2xl sm:text-3xl font-semibold tracking-wide" style={{ color: colors.cream }}>
              Hey,Bro , Hope Doing well! 👋
            </h1>
            <Sparkles size={20} className="animate-pulse" style={{ color: colors.bambooTan }} />
          </div>

          <h2 className="text-xl font-medium opacity-90" style={{ color: colors.bambooTan }}>
            Welcome Back, {user?.name || "Admin Mama"}
          </h2>

          <p className="text-sm text-white/50 mt-2 max-w-xl leading-relaxed">
            Manage your Eco World Handicraft store efficiently. Monitor your core business performance, chat system, and manage products seamlessly.
          </p>
        </div>

        <div className="shrink-0 z-10 bg-white/[0.03] border border-white/[0.06] px-5 py-3 rounded-2xl md:text-center min-w-[140px]">
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5 font-bold">Access Level</p>
          <p className="text-[14px] font-bold capitalize" style={{ color: colors.bambooTan }}>
            {user?.role || "Super Admin"}
          </p>
        </div>
      </div>

      {/* 📊 INFOGRAPHIC DATA MINI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="rounded-2xl border border-white/[0.04] p-5 flex items-center gap-4 shadow-lg" style={{ backgroundColor: colors.cardDark }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.03] text-white/70">
            <User size={20} style={{ color: colors.bambooTan }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Admin Email</p>
            <h3 className="font-medium text-[13.5px] truncate mt-0.5" style={{ color: colors.cream }}>
              {user?.email || "admin@ecoworld.com"}
            </h3>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-5 flex items-center gap-4 shadow-lg" style={{ backgroundColor: colors.cardDark }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.03]">
            <ShieldCheck size={20} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold">System Status</p>
            <h3 className="font-semibold text-[13.5px] mt-0.5 text-emerald-400 flex items-center gap-1">
              Verified Guardrail Secure
            </h3>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.04] p-5 flex items-center gap-4 shadow-lg" style={{ backgroundColor: colors.cardDark }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/[0.03] text-white/70">
            <Calendar size={20} style={{ color: colors.bambooTan }} />
          </div>
          <div>
            <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Today's Session</p>
            <h3 className="font-semibold text-[13.5px] mt-0.5" style={{ color: colors.cream }}>
              {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}