"use client";

import { useEffect, useState } from "react";
import { Trash2, Package, Calendar, Eye } from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  customerName:string;
  items: OrderItem[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Replace with your user email from auth
  const userEmail = "customer@example.com";   // ← তোমার Auth থেকে নিবে

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`https://eco-world-backend.vercel.app/orders?email=${userEmail}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    setDeletingId(orderId);

    try {
      const res = await fetch(`https://eco-world-backend.vercel.app/orders/${orderId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Order deleted successfully");
        fetchOrders(); // Refresh list
      } else {
        toast.error("Failed to delete order");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold text-[#16301F]">My Orders</h1>
            <p className="text-gray-600 mt-2">Track and manage your purchases</p>
          </div>
          <div className="text-emerald-700 font-medium text-lg">
            {orders.length} Orders
          </div>
        </div>

        {loading ? (
          <p className="text-center py-20">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600">No orders yet</p>
          </div>
        ) : (
          <div className="bg-[#16301F] rounded-3xl shadow-xl overflow-hidden">
            <table className="w-full text-white">
              <thead className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white sticky top-0">
                <tr>
                  <th className="py-6 px-8 text-left">Order ID</th>

                  <th className="py-6 px-6 text-left">Items</th>
                  <th className="py-6 px-8 text-right">Amount</th>
                  <th className="py-6 px-6 text-center">Status</th>
                  
                  <th className="py-6 px-6 text-center">Name</th>
                  <th className="py-6 px-8 text-right">Date</th>
                  <th className="py-6 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-6 px-8 font-mono font-medium">{order.orderId}</td>

                    <td className="py-6 px-6">
                      <div className="flex items-center gap-2">
                        <Package size={18} />
                        <span>{order.items.length} items</span>
                      </div>
                    </td>

                    <td className="py-6 px-8 text-right font-bold text-xl text-emerald-700">
                      ৳{order.totalAmount}
                    </td>

                    <td className="py-6 px-6 text-center">
                      <span className={`px-5 py-2 rounded-full text-sm font-medium ${order.orderStatus === "Confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    
                      <td className="py-6 px-6 text-center">
                      <span className={`px-5 py-2 rounded-full text-sm font-medium ${order.orderStatus === "Confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {order?.customerName}
                      </span>
                    </td>

                    <td className="py-6 px-8 text-sm text-gray-500 text-right">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-6 px-6 text-center">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDeleteModal(true);
                        }}
                        disabled={deletingId === order._id}
                        className="p-3 hover:bg-red-50 rounded-xl text-red-500 hover:text-red-600 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-red-600">Delete Order?</h3>
            <p className="mt-4 text-gray-600">
              Are you sure you want to delete <strong>Order #{selectedOrder.orderId}</strong>?
              This action cannot be undone.
            </p>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 border rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedOrder._id)}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}