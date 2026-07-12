"use client";

import { authClient } from "@/app/lib/auth-client";
import {
  Package,
  ShoppingBag,
  Heart,
  CreditCard,
  User,
  Loader2,
} from "lucide-react";
import Image from "next/image";

export default function CustomerDashboard() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-green-700" />
      </div>
    );
  }

  const user = session?.user;

  const stats = [
    {
      title: "My Orders",
      value: "12",
      icon: Package,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Wishlist",
      value: "8",
      icon: Heart,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Purchased",
      value: "15",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Spent",
      value: "৳25,450",
      icon: CreditCard,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div className="rounded-3xl bg-gradient-to-r from-green-900 to-green-700 p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome Back, {user?.name || "Customer"} 👋
        </h1>

        <p className="mt-2 text-green-100">
          Manage your account, track orders and discover the newest eco-friendly
          handcrafted products.
        </p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-3xl shadow border p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">

          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={100}
              height={100}
              className="rounded-full object-cover border-4 border-green-600"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-green-700 text-white flex items-center justify-center">
              <User size={40} />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {user?.email}
            </p>

            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              Active Customer
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between border-b pb-3">
            <span>📦 Ordered Bamboo Basket</span>
            <span className="text-green-700 font-medium">
              Completed
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>❤️ Added Bamboo Lamp to Wishlist</span>
            <span className="text-yellow-600 font-medium">
              Wishlist
            </span>
          </div>

          <div className="flex justify-between">
            <span>🛒 Purchased Bamboo Chair</span>
            <span className="text-blue-600 font-medium">
              Processing
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}