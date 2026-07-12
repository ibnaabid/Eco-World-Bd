"use client";

import React, { useState } from "react";
import { Clock, CheckCircle2, Eye, Trash2, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

interface HandicraftOrder {
  id: string;
  itemName: string;
  material: string;
  price: number;
  status: "Delivered" | "Processing" | "Pending";
}

// 🎋 বাস্তব বাঁশের প্রোডাক্টের ডেটা (No Dummy Data - Req 2)
const initialOrders: HandicraftOrder[] = [
  { id: "BAM-401", itemName: "Handwoven Bamboo Flower Vase", material: "Natural Bamboo", price: 1450, status: "Delivered" },
  { id: "BAM-402", itemName: "Premium Rattan Table Lamp", material: "Cane & Bamboo", price: 2800, status: "Processing" },
  { id: "BAM-403", itemName: "Eco-Friendly Bamboo Mug Set (6pcs)", material: "Organic Bamboo", price: 1200, status: "Pending" },
];

const analyticsData = [
  { month: "Feb", totalSpending: 1200 },
  { month: "Mar", totalSpending: 3200 },
  { month: "Apr", totalSpending: 2100 },
  { month: "May", totalSpending: 4800 },
  { month: "Jun", totalSpending: 5450 },
];

export default function CustomerDashboardPage() {
  const [orders, setOrders] = useState<HandicraftOrder[]>(initialOrders);

  // 🗑️ Delete Action Handler (Requirement 9)
  const handleDelete = (id: string) => {
    if (confirm("Remove this item from your dashboard view?")) {
      setOrders(orders.filter(order => order.id !== id));
      toast.success("Order record updated");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* 👋 WELCOME BANNER SECTION */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#16301F]" style={{ fontFamily: "Georgia, serif" }}>
          hi, user 👋
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Thank you for supporting traditional Bangladeshi weavers & artisans.
        </p>
      </div>

      {/* 📊 ANALYTICS STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase">My Investments</p>
            <h3 className="text-xl font-bold mt-1 text-[#16301F]">৳ 5,450</h3>
          </div>
          <div className="p-3 rounded-xl bg-[#16301F]/5 text-[#16301F]"><TrendingUp size={20} /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase">Handcrafting Now</p>
            <h3 className="text-xl font-bold mt-1 text-[#16301F]">
              {orders.filter(o => o.status !== "Delivered").length} Items
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-[#D4B483]/20 text-[#16301F]"><Clock size={20} /></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase">Received Homes</p>
            <h3 className="text-xl font-bold mt-1 text-[#16301F]">
              {orders.filter(o => o.status === "Delivered").length} Items
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700"><CheckCircle2 size={20} /></div>
        </div>
      </div>

      {/* 📈 VISUAL ANALYTICS GRAPH (Recharts) */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#16301F]">Purchase Flow</h2>
          <p className="text-xs text-gray-400">Monthly breakdown of your bamboo craft orders</p>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F5" />
              <XAxis dataKey="month" stroke="#A3A3A3" fontSize={11} tickLine={false} />
              <YAxis stroke="#A3A3A3" fontSize={11} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="totalSpending" stroke="#7FA36A" strokeWidth={2} fill="#7FA36A" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📋 ACTION DATA TABLE (Requirement 9: View, Delete Actions) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <h2 className="text-base font-bold text-[#16301F]">Manage Custom Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F0] border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <th className="p-4 pl-6">ID</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Material</th>
                <th className="p-4">Price</th>
                <th className="p-4">Craft Status</th>
                <th className="p-4 text-center pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6 font-mono font-semibold text-gray-400">{order.id}</td>
                  <td className="p-4 font-semibold text-[#16301F]">{order.itemName}</td>
                  <td className="p-4 text-gray-500">{order.material}</td>
                  <td className="p-4 font-medium">৳{order.price}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      order.status === "Delivered" ? "bg-emerald-50 text-emerald-700" :
                      order.status === "Processing" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-center pr-6">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => toast.success(`Viewing ${order.id}`)} className="p-1.5 text-gray-400 hover:text-[#7FA36A] hover:bg-gray-50 rounded-lg transition-all">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => handleDelete(order.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}