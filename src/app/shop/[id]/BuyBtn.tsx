"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart, Zap } from "lucide-react";

interface Product {
  _id: string;
  productName: string;
  price: number;
  image: string;
  parcelType?: string;
}

interface BuyBtnProps {
  product: Product;
}

export default function BuyBtn({ product }: BuyBtnProps) {
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);



  // Buy Now (Direct Stripe Checkout)
  const handleBuyNow = async () => {
    setBuying(true);

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{
            _id: product._id,
            productName: product.productName,
            price: product.price,
            image: product.image,
            quantity: 1,
            parcelType: product.parcelType,
          }],
          orderId: `ORD-${Date.now()}`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Payment gateway error");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="flex gap-4 w-full">
     

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        disabled={buying}
        className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-4 rounded-2xl font-semibold hover:brightness-105 transition-all active:scale-95 shadow-lg shadow-emerald-700/30"
      >
        <Zap size={22} />
        {buying ? "Redirecting..." : "Buy Now"}
      </button>
    </div>
  );
}