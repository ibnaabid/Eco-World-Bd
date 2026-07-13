"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, User, Package, CreditCard, CheckCircle, Clock } from "lucide-react";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  customerName?: string;
  customerEmail: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://eco-world-backend.vercel.app/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "Confirmed") return "bg-emerald-100 text-emerald-700";
    if (status === "Pending") return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold text-[#16301F]">All Orders</h1>
            <p className="text-gray-600 mt-2">Manage and track customer orders</p>
          </div>
          <div className="text-emerald-700 font-medium">
            Total Orders: <span className="text-3xl font-bold">{orders.length}</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No orders found</div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
                <tr>
                  <th className="py-6 px-8 text-left">Order ID</th>
                  <th className="py-6 px-6 text-left">Customer</th>
                  <th className="py-6 px-6 text-left">Items</th>
                  <th className="py-6 px-8 text-right">Amount</th>
                  <th className="py-6 px-6 text-center">Payment</th>
                  <th className="py-6 px-6 text-center">Status</th>
                  <th className="py-6 px-8 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-300 transition-colors">
                    <td className="py-6 px-8 font-mono font-medium text-emerald-700">
                      {order.orderId}
                    </td>

                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User size={18} className="text-emerald-700" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.customerName || "Guest"}</p>
                          <p className="text-sm text-gray-500">{order.customerEmail}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-6 px-6">
                      <div className="flex items-center gap-2">
                        <Package size={18} className="text-gray-400" />
                        <span className="font-medium">{order.items.length} items</span>
                      </div>
                    </td>

                    <td className="py-6 px-8 text-right font-bold text-xl text-emerald-700">
                      ৳{order.totalAmount}
                    </td>

                    <td className="py-6 px-6 text-center">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${order.paymentStatus === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="py-6 px-6 text-center">
                      <span className={`inline-block px-5 py-1.5 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="py-6 px-8 text-right text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}