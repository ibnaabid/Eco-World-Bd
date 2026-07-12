"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, MapPin, Truck, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FavouriteButton from "./Favorite";
import ProductFilter from "../FilterShop/FilterPage";

const colors = {
  forest: "#16301F",
  moss: "#7FA36A",
  bambooTan: "#D4B483",
  cream: "#FAF7F0",
  ink: "#211F16",
};

interface Product {
  _id: string;
  productName: string;
  price: number;
  description: string;
  pickupAddress: string;
  parcelType: string;
  image: string;
  category?: string; // ক্যাটাগরি ফিল্টারের জন্য যোগ করা হলো
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🎯 ফিল্টারিং এবং সর্টিং স্টেটসমূহ
  const [search, setSearch] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [parcelType, setParcelType] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("ডেটা লোড করতে ব্যর্থ হয়েছে!");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "সার্ভারে কানেক্ট হতে পারছে না!");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const fallbackImage = "https://images.unsplash.com/photo-1616627561950-9f746e330187?q=80&w=600&auto=format&fit=crop";

  // 🎯 ফিল্টারিং ও সর্টিং লজিক প্রসেসিং
  const filteredProducts = products
    .filter((product) => {
      // সার্চ ম্যাচিং (নাম অথবা ডেসক্রিপশন)
      const matchesSearch =
        product.productName?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase());

      // এড্রেস ম্যাচিং
      const matchesAddress = product.pickupAddress?.toLowerCase().includes(pickupAddress.toLowerCase());

      // পার্সেল টাইপ ম্যাচিং
      const matchesParcel = parcelType ? product.parcelType === parcelType : true;

      // ক্যাটাগরি ম্যাচিং (যদি আপনার ডাটাবেজে category ফিল্ড থাকে)
      const matchesCategory = category 
        ? product.category?.toLowerCase().includes(category.toLowerCase()) 
        : true;

      // প্রাইস রেঞ্জ ম্যাচিং
      let matchesPrice = true;
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        matchesPrice = product.price >= min && product.price <= max;
      }

      return matchesSearch && matchesAddress && matchesParcel && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      // সর্টিং লজিক
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#FAF7F0]/30">
        <Loader2 className="animate-spin text-[#16301F]" size={40} />
        <p className="text-sm font-medium tracking-wide" style={{ color: colors.forest }}>
          প্রিমিয়াম কালেকশন লোড হচ্ছে...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]/30">
        <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-red-100 max-w-sm">
          <p className="text-red-500 font-semibold mb-2">Error Occurred</p>
          <p className="text-xs text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 text-xs text-white rounded-lg font-medium" 
            style={{ backgroundColor: colors.forest }}
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]/40 py-16 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-amber-200/40 rounded-full mb-4 text-[12px] font-semibold text-[#C9922F] shadow-xs">
            <Sparkles size={13} /> 100% Authentic Handcrafts
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#211F16] mb-3 font-serif">
            The BambooCraft Collection
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            বগুড়া ও দিনাজপুরের প্রত্যন্ত অঞ্চলের দক্ষ কারিগরদের হাতে তৈরি প্রিমিয়াম ট্র্যাডিশনাল প্রোডাক্টস।
          </p>
        </div>

        {/* 🎯 ফিল্টার কম্পোনেন্টে সব স্টেট ও সেটার ফাংশন পাস করা হলো */}
        <ProductFilter
          search={search}
          setSearch={setSearch}
          pickupAddress={pickupAddress}
          setPickupAddress={setPickupAddress}
          parcelType={parcelType}
          setParcelType={setParcelType}
          category={category}
          setCategory={setCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sort={sort}
          setSort={setSort}
        />

        {/* প্রোডাক্ট গ্রিড (এখনে filteredProducts ম্যাপ করা হয়েছে) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">কোনো প্রোডাক্ট খুঁজে পাওয়া যায়নি!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* ইমেজ পার্ট */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F9F9F7]">
                  <Image
                    height={600}
                    width={600}
                    src={product.image && !product.image.startsWith("blob:") ? product.image : fallbackImage}
                    alt={product.productName}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImage;
                    }}
                  />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-white/90 backdrop-blur-xs shadow-xs flex items-center gap-1 text-emerald-800">
                      <Truck size={11} /> {product.parcelType || "Standard"}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <button className="p-2 rounded-full bg-white/90 backdrop-blur-xs text-gray-600 hover:text-red-500 shadow-xs transition-all active:scale-90">
                      <Heart size={14} />
                    </button>
                  </div>
                </div>

                {/* প্রোডাক্ট ডিটেইলস পার্ট */}
                <div className="p-5 flex flex-col flex-grow bg-white">
                  <div className="flex items-center gap-1 text-gray-500 mb-1.5">
                    <MapPin size={12} className="text-[#7FA36A] shrink-0" />
                    <span className="text-[12px] font-medium truncate">{product.pickupAddress}</span>
                  </div>

                  <h3 className="text-[16px] font-semibold tracking-tight mb-1 group-hover:text-[#D4B483] transition-colors line-clamp-1" style={{ color: colors.ink }}>
                    {product.productName}
                  </h3>

                  <p className="text-[12.5px] text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-grow">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-3.5 flex items-center justify-between border-t border-gray-50">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-medium">Price</span>
                      <span className="text-lg font-bold" style={{ color: colors.forest }}>
                        ৳{product.price ? product.price.toLocaleString("en-BD") : "0"}
                      </span>
                    </div>

                    <div className="flex gap-5 px-7">
                      <Link href={`/shop/${product?._id}`} passHref>
                        <motion.span
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-medium transition-all shadow-xs cursor-pointer"
                          style={{ backgroundColor: colors.forest, color: colors.cream }}
                        >
                          <ShoppingBag size={13} />
                          View
                        </motion.span>
                      </Link>
                      <FavouriteButton product={product}/>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}