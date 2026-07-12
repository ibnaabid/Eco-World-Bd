"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

interface Product {
  _id: string;
  productName: string;
  price: number;
  image: string;
  parcelType: string;
  pickupAddress: string;
}

export default function FavouriteButton({
  product,
}: {
  product: Product;
}) {
  const { data: session } = authClient.useSession();

  const handleFavourite = async () => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    try {
      const favouriteData = {
        productId: product._id,
        userEmail: session.user.email,
        userName: session.user.name,
        productName: product.productName,
        price: product.price,
        image: product.image,
        parcelType: product.parcelType,
        pickupAddress: product.pickupAddress,
      };

      const res = await fetch("http://localhost:5000/favourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favouriteData),
      });

      const data = await res.json();

      if (res.ok && data.insertedId) {
        toast.success("❤️ Added to Favourite");
      } else {
        toast.error(data.message || "Already in favourite");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleFavourite}
      className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-rose-300 transition"
    >
      <Heart size={20} fill="white" />
      Add Favourite
    </motion.button>
  );
}