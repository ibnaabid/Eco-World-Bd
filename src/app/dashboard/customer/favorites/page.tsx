"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Heart, Package } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

interface Favourite {
  _id: string;
  productName: string;
  image: string;
  price: number;
  parcelType: string;
  pickupAddress: string;
  userEmail: string;
}

export default function FavouritePage() {
  const [items, setItems] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavourite = async () => {
    
          const {data:token} = await authClient.token();
          console.log(token)

    try {
      const res = await fetch("http://localhost:5000/favourite", {
        cache: "no-store",
        headers: {
    Authorization: `Bearer ${token?.token}`,
  },
      });
      const data = await res.json();
      setItems(data);
    } catch (error) {
      toast.error("Failed to load favourites");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavourite();
  }, []);

  const handleDelete = async (id: string) => {
      const {data:token} = await authClient.token();
          console.log(token)
          
    if (!confirm("Remove this item from favourites?")) return;

    try {
      const res = await fetch(`http://localhost:5000/favourite/${id}`, {
        method: "DELETE",   
         headers: {
    Authorization: `Bearer ${token?.token}`,
  },

      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Removed from favourites");
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-600"></div>
          <p className="text-slate-600 font-medium">Loading your favourites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-2xl">
              <Heart className="w-9 h-9 text-red-600" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                My Favourites
              </h1>
              <p className="text-slate-600 mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <Package className="w-4 h-4" />
              <span>Parcel Listings</span>
            </div>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 py-20 px-6 text-center">
            <Heart className="w-16 h-16 mx-auto text-slate-300 mb-6" />
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">No favourites yet</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Items you mark as favourite will appear here. Start exploring and save what you love!
            </p>
          </div>
        )}

        {/* Content */}
        {items.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="table w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white">
                    <th className="py-5 pl-8 text-left font-medium">#</th>
                    <th className="py-5 text-left font-medium">Product</th>
                    <th className="py-5 text-left font-medium">Category</th>
                    <th className="py-5 text-left font-medium">Location</th>
                    <th className="py-5 text-left font-medium">Price</th>
                    <th className="py-5 text-left font-medium">Listed By</th>
                    <th className="py-5 pr-8 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="pl-8 py-5 text-slate-500 font-medium">
                        {index + 1}
                      </td>

                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200">
                            <Image
                              src={item.image}
                              alt={item.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="font-semibold text-slate-900 line-clamp-2 pr-4">
                            {item.productName}
                          </div>
                        </div>
                      </td>

                      <td className="py-5">
                        <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                          {item.parcelType}
                        </span>
                      </td>

                      <td className="py-5 text-slate-600 max-w-[200px] truncate">
                        {item.pickupAddress}
                      </td>

                      <td className="py-5 font-bold text-emerald-700 text-lg">
                        ৳{item.price.toLocaleString()}
                      </td>

                      <td className="py-5 text-slate-600 text-sm">
                        {item.userEmail}
                      </td>

                      <td className="py-5 pr-8 text-right">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all hover:scale-110 active:scale-95"
                          title="Remove from favourites"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {items.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                          {item.productName}
                        </h3>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-xl -mr-2 -mt-1"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {item.parcelType}
                        </span>
                      </div>

                      <div className="mt-4 text-sm text-slate-600">
                        📍 {item.pickupAddress}
                      </div>

                      <div className="mt-4 flex items-baseline justify-between">
                        <div>
                          <span className="text-xs text-slate-500">Price</span>
                          <div className="text-2xl font-bold text-emerald-700">
                            ৳{item.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 text-right">
                          Listed by<br />
                          <span className="font-medium text-slate-700 truncate max-w-[140px] block">
                            {item.userEmail}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}