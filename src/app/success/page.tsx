"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ShoppingBag,
  ArrowRight,
  Leaf,
  Sparkles,
} from "lucide-react";

// ১. মূল লজিক এবং UI টিকে একটি আলাদা কম্পোনেন্টে নিয়ে যাওয়া হলো
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, [sessionId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative max-w-xl w-full rounded-[36px] bg-white/75 backdrop-blur-2xl border border-white shadow-[0_25px_80px_rgba(0,0,0,.08)] p-10"
    >
      {/* Badge */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#16301F]/10 text-[#16301F] font-semibold">
          <Sparkles size={16} />
          Eco World Premium
        </div>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="animate-spin mx-auto text-[#16301F]" size={70} />
          <h2 className="text-3xl font-bold mt-8 text-[#16301F]">Saving Your Order...</h2>
          <p className="text-gray-500 mt-3">Please wait while we securely confirm your payment.</p>
        </motion.div>
      )}

      {/* Success */}
      {status === "success" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <CheckCircle2 size={110} className="mx-auto text-green-600" />
          </motion.div>

          <h1 className="text-5xl font-black mt-8 text-[#16301F] leading-tight">
            Payment <br /> Successful
          </h1>

          <p className="text-gray-600 mt-5 text-lg leading-8">
            Thank you for supporting local bamboo artisans. <br />
            Your order has been successfully confirmed.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#225b36] p-5">
              <h4 className="font-bold text-white">Secure</h4>
              <p className="text-xs text-gray-200 mt-2">Stripe Payment</p>
            </div>
            <div className="rounded-2xl bg-[#3e8934] p-5">
              <h4 className="font-bold text-white">Eco</h4>
              <p className="text-xs text-gray-200 mt-2">Handmade Product</p>
            </div>
            <div className="rounded-2xl bg-[#F4F8F3] p-5">
              <h4 className="font-bold text-[#16301F]">Fast</h4>
              <p className="text-xs text-gray-500 mt-2">Quick Delivery</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="text-center">
          <h1 className="text-4xl font-black text-red-600">Something Went Wrong</h1>
          <p className="mt-4 text-gray-500">We couldn't save your order.</p>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Link href="/shop" className="flex-1">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 rounded-2xl bg-[#16301F] text-white font-semibold flex items-center justify-center gap-2 shadow-xl hover:bg-[#21432D]"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </motion.button>
        </Link>

        <Link href="/dashboard/customer/orders" className="flex-1">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 rounded-2xl border-2 border-[#16301F] text-[#16301F] font-semibold flex items-center justify-center gap-2 hover:bg-[#16301F] hover:text-white transition"
          >
            My Orders
            <ArrowRight size={18} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

// ২. মূল এক্সপোর্ট ফাংশনে Suspense দিয়ে র্যাপ (Wrap) করা হলো
export default function SuccessPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F8F5EC] via-[#FFFDF8] to-[#EEF5EA] flex items-center justify-center px-5">
      {/* Background Blur */}
      <div className="absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full bg-[#2F5D3B]/10 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#C7A56A]/20 blur-[120px]" />

      {/* Floating Leaves */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-24 left-20 text-green-300"
      >
        <Leaf size={70} />
      </motion.div>

      <motion.div
        animate={{ y: [15, -20, 15], rotate: [10, -10, 10] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-28 right-20 text-green-200"
      >
        <Leaf size={90} />
      </motion.div>

      {/* Suspense Wrapper */}
      <Suspense fallback={
        <div className="text-center bg-white/75 backdrop-blur-2xl p-10 rounded-[36px] border border-white shadow-xl max-w-xl w-full">
          <Loader2 className="animate-spin mx-auto text-[#16301F]" size={50} />
          <p className="text-gray-500 mt-4 font-semibold">Loading Page...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </section>
  );
}