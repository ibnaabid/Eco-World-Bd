"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface Product {
  _id: string;
  productName: string;
  price: number;
}

interface WhatsAppButtonProps {
  product?: Product;
}

export default function WhatsAppButton({ product }: WhatsAppButtonProps) {
  const phoneNumber = "8801823633271";
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && product?._id) {
      setFullUrl(`${window.location.origin}/shop/${product._id}`);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  // 🎯 প্রফেশনাল বাংলা মেসেজ ফরম্যাট
  const message = encodeURIComponent(`🌿 আসসালামু আলাইকুম, ইকো ওয়ার্ল্ড।

আমি আপনাদের এই প্রোডাক্টটি সম্পর্কে জানতে আগ্রহী। 

🛍 প্রোডাক্টের নাম: ${product.productName}
💰 মূল্য: ৳${product.price ? product.price.toLocaleString("en-BD") : "0"}

🔗 প্রোডাক্ট লিঙ্ক:
${fullUrl}

দয়া করে প্রোডাক্টটির স্টক এবং ডেলিভারি প্রক্রিয়া সম্পর্কে বিস্তারিত জানাবেন। ধন্যবাদ!`);

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 font-semibold transition-all duration-300 shadow-lg hover:scale-105 w-full h-full"
    >
      <MessageCircle size={20} />
      Contact with Whatsapp
    </Link>
  );
}