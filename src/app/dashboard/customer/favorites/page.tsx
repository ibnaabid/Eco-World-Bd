"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Heart } from "lucide-react";
import toast from "react-hot-toast";

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
    try {
      const res = await fetch("http://localhost:5000/favourite", {
        cache: "no-store",
      });

      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavourite();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Remove from favourite?");

    if (!ok) return;

    const res = await fetch(`http://localhost:5000/favourite/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      toast.success("Removed Successfully");
      setItems(items.filter((item) => item._id !== id));
    } else {
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500" fill="currentColor" />
          <h1 className="text-3xl font-bold">
            My Favourite ({items.length})
          </h1>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white shadow">

          <table className="table">

            <thead className="bg-emerald-700 text-white">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Location</th>
                <th>Price</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={item._id}>

                  <td>{index + 1}</td>

                  <td>
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={60}
                      height={60}
                      className="rounded-xl object-cover"
                    />
                  </td>

                  <td className="font-semibold">
                    {item.productName}
                  </td>

                  <td>{item.parcelType}</td>

                  <td>{item.pickupAddress}</td>

                  <td className="font-bold text-emerald-700">
                    ৳{item.price}
                  </td>

                  <td>{item.userEmail}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-error btn-sm"
                    >
                      <Trash2 size={16} />
                    </button>
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