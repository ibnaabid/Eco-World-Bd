"use client";

import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, Lock, Terminal, RefreshCw, Key } from "lucide-react";

const colors = {
  cardDark: "#132519",
  bambooTan: "#C9A876",
  cream: "#F6F2E9"
};

export default function PrivacyGuard() {
  const [showKey, setShowKey] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in space-y-6">
      <div 
        className="rounded-3xl p-6 sm:p-8 border border-white/[0.04] shadow-2xl relative overflow-hidden"
        style={{ backgroundColor: colors.cardDark }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.01] blur-[80px] rounded-full pointer-events-none" />

        {/* হেডার */}
        <div className="flex items-center gap-2.5 mb-6">
          <ShieldCheck size={24} style={{ color: colors.bambooTan }} />
          <div>
            <h2 className="brand-font text-xl sm:text-2xl font-semibold text-[#F6F2E9]">
              Privacy & Guardrails
            </h2>
            <p className="text-[11px] text-white/40 mt-0.5">Manage administrative security metrics & API access limits</p>
          </div>
        </div>

        {/* কনফিগারেশন সেটিংস */}
        <div className="space-y-4">
          
          {/* সিকিউরিটি গার্ড মেইনটেন্যান্স সুইচ */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/10 border border-white/5">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-white/50" />
              <div>
                <h4 className="font-medium text-white/85 text-[13.5px]">Storefront Maintenance Mode</h4>
                <p className="text-[11px] text-white/30 mt-0.5">Blocks public checkout access while updating catalog</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={maintenance}
              onChange={() => setMaintenance(!maintenance)}
              className="toggle toggle-sm border-neutral-700 bg-neutral-600 checked:bg-[#C9A876] checked:border-[#C9A876]" 
            />
          </div>

          {/* এপিআই টোকেন গার্ড এরিয়া */}
          <div className="p-4 rounded-2xl bg-black/10 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Key size={18} className="text-white/50" />
                <div>
                  <h4 className="font-medium text-white/85 text-[13.5px]">Admin Security Gateway Key</h4>
                  <p className="text-[11px] text-white/30 mt-0.5">Used for webhook authentications</p>
                </div>
              </div>
              <button 
                onClick={() => setShowKey(!showKey)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
              >
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <div className="relative">
              <input 
                type={showKey ? "text" : "password"} 
                readOnly
                value="eco_live_sh_8c229f3d95eb07641320dbff7"
                className="w-full bg-black/25 border border-white/[0.03] rounded-xl px-4 py-3 text-[12px] font-mono tracking-wider text-[#C9A876] outline-none"
              />
            </div>
          </div>

          {/* সিস্টেম লগ স্ট্যাটাস */}
          <div className="p-4 rounded-2xl bg-black/10 border border-white/5 flex items-center gap-3">
            <Terminal size={18} className="text-emerald-500" />
            <div className="flex-1">
              <h4 className="font-medium text-white/85 text-[13.5px]">Audit Logs Monitor</h4>
              <p className="text-[11px] text-white/30 mt-0.5">Active session: 0 failed authorization attempts</p>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase">
              Secure
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}