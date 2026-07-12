"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  productName: string;
  price: number;
  image: string;
  parcelType: string;
  pickupAddress: string;
}

interface Props {
  product: Product;
}

export default function FavouriteButton({ product }: Props) {
  const { data: session } = authClient.useSession();

  const handleFavourite = async () => {
    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    try {
      const favourite = {
        productId: product._id,
        userEmail: session.user.email,
        userName: session.user.name,
        productName: product.productName,
        image: product.image,
        price: product.price,
        parcelType: product.parcelType,
        pickupAddress: product.pickupAddress,
      };

      const res = await fetch("http://localhost:5000/favourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favourite),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Added to Favourite ❤️");
      } else {
        toast.error(data.message || "Already Added");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleFavourite}
      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-red-50 transition-all"
    >
      <Heart
        size={18}
        className="text-rose-500 hover:fill-rose-500 transition-all"
      />
    </motion.button>
  );
}