"use client";

import { useState } from "react";
import { Settings, User, Sliders, Database, Save, RefreshCw, Upload } from "lucide-react";

const colors = {
  cardDark: "#132519",
  bambooTan: "#C9A876",
  cream: "#F6F2E9",
  moss: "#6B8F5C"
};

export default function PanelSettings() {
  const [storeName, setStoreName] = useState("Eco World Handicraft");
  const [currency, setCurrency] = useState("BDT (৳)");
  const [lowStockAlert, setLowStockAlert] = useState(5);
  const [backupLoading, setBackupLoading] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    console.log({ storeName, currency, lowStockAlert });
    alert("Settings updated successfully, Mama!");
  };

  const triggerBackup = () => {
    setBackupLoading(true);
    setTimeout(() => {
      setBackupLoading(false);
      alert("Database backup downloaded successfully!");
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in space-y-6 text-sm">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .brand-font { font-family: 'Fraunces', serif; }
      `}</style>

      {/* ⚙️ HEADER SECTION */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-white/5">
          <Settings size={24} style={{ color: colors.bambooTan }} />
        </div>
        <div>
          <h1 className="brand-font text-2xl sm:text-3xl font-semibold text-[#F6F2E9]">
            Panel Settings
          </h1>
          <p className="text-[11px] text-white/40 mt-0.5">Configure your Eco World administrative control engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 🛠️ LEFT SIDEBAR: QUICK NAVIGATION OR SYSTEM INFO */}
        <div className="md:col-span-1 space-y-4">
          <div className="rounded-2xl p-5 border border-white/[0.04] space-y-4" style={{ backgroundColor: colors.cardDark }}>
            <h3 className="font-semibold text-white/80 flex items-center gap-2">
              <Sliders size={16} style={{ color: colors.bambooTan }} /> System Info
            </h3>
            <div className="space-y-2 text-[12px] text-white/50">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Environment</span>
                <span className="text-emerald-400 font-medium">Production</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Next.js Version</span>
                <span className="text-white/80">16.2.10</span>
              </div>
              <div className="flex justify-between">
                <span>Auth System</span>
                <span className="text-[#C9A876]">Better-Auth</span>
              </div>
            </div>
          </div>

          {/* DATABASE BACKUP WIDGET */}
          <div className="rounded-2xl p-5 border border-white/[0.04] space-y-3" style={{ backgroundColor: colors.cardDark }}>
            <h3 className="font-semibold text-white/80 flex items-center gap-2">
              <Database size={16} style={{ color: colors.bambooTan }} /> Data Control
            </h3>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Download a complete snapshot of your products, orders, and system logs.
            </p>
            <button
              onClick={triggerBackup}
              disabled={backupLoading}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-medium text-[12px] flex items-center justify-center gap-2 border border-white/5 transition-all active:scale-[0.98]"
            >
              <RefreshCw size={14} className={backupLoading ? "animate-spin text-[#C9A876]" : ""} />
              {backupLoading ? "Generating Backup..." : "Backup Database"}
            </button>
          </div>
        </div>

        {/* 📝 RIGHT SIDE: CORE CONFIGURATION FORM */}
        <div className="md:col-span-2">
          <form onSubmit={handleSaveSettings} className="rounded-3xl p-6 sm:p-8 border border-white/[0.04] shadow-2xl space-y-6" style={{ backgroundColor: colors.cardDark }}>
            
            {/* Section 1: Store Configurations */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-semibold tracking-wide border-b border-white/5 pb-2 text-[#F6F2E9]">
                Store Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 font-medium mb-1.5">Store Global Name</label>
                  <input 
                    type="text" 
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-white outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-medium mb-1.5">Display Currency</label>
                  <input 
                    type="text" 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-white outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Notifications & Inventory Guardrails */}
            <div className="space-y-4 pt-2">
              <h3 className="text-[15px] font-semibold tracking-wide border-b border-white/5 pb-2 text-[#F6F2E9]">
                Inventory Guardrails
              </h3>
              
              <div>
                <label className="block text-white/60 font-medium mb-1.5">Low Stock Alert Threshold</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    value={lowStockAlert}
                    onChange={(e) => setLowStockAlert(e.target.value)}
                    className="w-32 bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-white outline-none transition-all"
                  />
                  <span className="text-white/30 text-[12px]">Alert will trigger when product quantity falls below this number.</span>
                </div>
              </div>
            </div>

            {/* Section 3: Theme Preference Preview */}
            <div className="space-y-4 pt-2">
              <h3 className="text-[15px] font-semibold tracking-wide border-b border-white/5 pb-2 text-[#F6F2E9]">
                Appearance Theme
              </h3>
              <div className="p-4 rounded-xl bg-black/20 border border-white/[0.03] flex items-center justify-between">
                <div>
                  <p className="font-medium text-white/80">Eco Luxury Dark Theme</p>
                  <p className="text-[11px] text-white/30 mt-0.5">Currently forced via global panel configuration overrides.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-[#C9A876] bg-[#C9A876]/10 border border-[#C9A876]/20 uppercase">
                  Active
                </span>
              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="pt-2">
              <button 
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-black font-semibold text-[13.5px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all ml-auto"
                style={{ backgroundColor: colors.bambooTan }}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}