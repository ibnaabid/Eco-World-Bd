"use client";

import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, Bell, Loader2 } from "lucide-react";
import Link from "next/link";

// API থেকে আসা ডেটার টাইপ ডিফাইন
interface WishlistItem {
  _id: string; 
  name: string;
  price: number;
  image: string;
  inStock?: boolean;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // 🌍 ১. আপনার API থেকে ডেটা নিয়ে আসা (Fetch)
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("http://localhost:5000/favourite");
        if (!res.ok) throw new Error("ডেটা লোড করতে ব্যর্থ হয়েছে!");
        
        const data = await res.json();
        setFavorites(data);
        showNotification("আপনার পছন্দের তালিকা সফলভাবে লোড হয়েছে!");
      } catch (error) {
        console.error("API Error:", error);
        showNotification("সার্ভার থেকে ডেটা আনতে সমস্যা হয়েছে!");
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  // 🔔 ২. নোটিফিকেশন ট্রিগার ফাংশন
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000); // ৩ সেকেন্ড পর চলে যাবে
  };

  // ডাটা লোড হওয়ার সময়ের স্পিনার
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
        <Loader2 className="animate-spin text-[#16301F]" size={32} />
        <p className="font-medium">আপনার পছন্দের আইটেমগুলো লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      
      {/* 🚀 টপ নোটিফিকেশন টোস্ট */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-[#16301F] text-[#FAF7F0] px-5 py-3 rounded-xl shadow-2xl border border-[#7FA36A] flex items-center gap-3 animate-bounce">
          <Bell size={18} className="text-[#D4B483] animate-pulse" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* 🌟 হেডার কাউন্টার ব্যাজ */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#16301F] flex items-center gap-2">
            My Wishlist <Heart className="fill-red-500 text-red-500" size={24} />
          </h1>
          <p className="text-gray-500 text-sm mt-1">আপনার পছন্দের সব ইউনিক প্রোডাক্টস।</p>
        </div>
        
        {/* লাইভ কাউন্টার (API ডেটার লেংথ অনুযায়ী কাউন্ট দেখাবে) */}
        <div className="relative bg-[#16301F] text-white font-semibold px-4 py-2 rounded-full text-xs shadow-md border border-[#7FA36A]/50">
          Saved Items: <span className="text-[#D4B483] font-bold text-sm ml-1">{favorites.length}</span>
        </div>
      </div>

      {/* 🛍️ প্রোডাক্ট গ্রিড এবং গ্লোয়িং বর্ডার ডিজাইন */}
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400">
          আপনার উইশলিস্টে কোনো প্রোডাক্ট পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div 
              key={item._id} 
              // হোভার করলে কাস্টম থিম কালার (#7FA36A) বর্ডার ও গ্লো ইফেক্ট আসবে
              className="group relative bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:border-[#7FA36A] hover:shadow-[0_0_15px_rgba(127,163,106,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* ইমেজ কন্টেইনার */}
                <div className="relative w-full h-40 bg-gray-50 rounded-xl overflow-hidden mb-4">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"} // ইমেজ না থাকলে ফলব্যাক ইমেজ
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  
                  {/* স্টক স্ট্যাটাস */}
                  <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                    item.inStock !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>
                    {item.inStock !== false ? "Available" : "Stock Out"}
                  </span>
                </div>

                {/* প্রোডাক্ট ডিটেইলস */}
                <h3 className="font-semibold text-gray-800 text-base group-hover:text-[#16301F] transition-colors">{item.name}</h3>
                <p className="text-lg font-bold text-[#16301F] mt-1">${item.price}</p>
              </div>

              {/* বাটন অ্যাকশন */}
             <Link href="/shop">
              <div className="flex gap-2 mt-5 pt-3 border-t border-gray-50">
                <button 
                  onClick={() => showNotification(`${item.name} কার্টে যোগ করা হয়েছে!`)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl bg-[#16301F] text-white hover:bg-[#7FA36A] shadow-sm transition-all"
                >
                  <ShoppingCart size={14} />
                  View More
                </button>
              </div></Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}