"use client";

import { useState, useRef } from "react";
import { Plus, Image as ImageIcon, Trash2, ShoppingBag, MapPin, Truck } from "lucide-react";
import toast from "react-hot-toast";

const colors = {
  cardDark: "#132519",
  bambooTan: "#C9A876",
  cream: "#F6F2E9"
};

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [parcelType, setParcelType] = useState("standard");
  const [loading, setLoading] = useState(false); // লোডিং স্টেট

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 🚀 সরাসরি ডিরেক্ট API কল এখানে (No External Function)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // সাবমিট করার অবজেক্ট
    const bodyData = {
      productName,
      price: Number(price), // নাম্বার ফরম্যাটে কনভার্ট
      description,
      pickupAddress,
      parcelType,
      image: image ? image.preview : null // ইমেজ ইউআরএল বা প্রিভিউ
    };

    try {
      // সরাসরি ডিরেক্ট fetch কল
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      if (!res.ok) {
        throw new Error("Something went wrong with the API!");
      }

      const result = await res.json();
      console.log("Success from DB:", result);
      toast.success("Product added directly to database successfully!");
      
      // ফর্ম রিসেট
      setProductName("");
      setPrice("");
      setDescription("");
      setPickupAddress("");
      setImage(null);

    } catch (error) {
      console.error("Direct API Error:", error);
      alert("Failed to add product. Check if backend server is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div 
        className="rounded-3xl p-6 sm:p-8 border border-white/[0.04] shadow-2xl"
        style={{ backgroundColor: colors.cardDark }}
      >
        <div className="flex items-center gap-2.5 mb-6">
          <ShoppingBag size={24} style={{ color: colors.bambooTan }} />
          <h2 className="brand-font text-xl sm:text-2xl font-semibold text-[#F6F2E9]">
            Add New Handicraft Product
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          {/* ইমেজ আপলোডার এরিয়া */}
          <div>
            <label className="block text-white/60 font-medium mb-2">Product Showcase Image</label>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden" 
            />

            {!image ? (
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-white/10 hover:border-[#C9A876]/40 rounded-2xl p-8 text-center cursor-pointer transition-all bg-black/10 flex flex-col items-center justify-center gap-3 group"
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <ImageIcon size={32} style={{ color: colors.bambooTan }} />
                </div>
                <p className="text-white/80 font-medium text-[13.5px]">Click to browse image</p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 p-2 flex items-center justify-center">
                <img src={image.preview} alt="preview" className="max-h-64 object-contain rounded-xl" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-xl shadow-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* প্রোডাক্টের নাম ও প্রাইস */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 font-medium mb-1.5">Product Title</label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Clay Flower Vase" 
                required
                className="w-full bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-white/60 font-medium mb-1.5">Price (BDT)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 850" 
                required
                className="w-full bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Logistics সেকশন */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div>
              <label className="text-white/60 font-medium mb-1.5 flex items-center gap-1.5">
                <MapPin size={15} style={{ color: colors.bambooTan }} /> Warehouse / Pickup Address
              </label>
              <input 
                type="text" 
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="e.g., Mirpur-10, Dhaka" 
                required
                className="w-full bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-white/60 font-medium mb-1.5 flex items-center gap-1.5">
                <Truck size={15} style={{ color: colors.bambooTan }} /> Parcel Delivery Type
              </label>
              <select
                value={parcelType}
                onChange={(e) => setParcelType(e.target.value)}
                className="w-full bg-[#132519] border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-3 text-white outline-none transition-all cursor-pointer"
              >
                <option value="standard">Standard Parcel (3-5 Days)</option>
                <option value="express">Express Courier (Next Day)</option>
              </select>
            </div>
          </div>

          {/* ডেসক্রিপশন */}
          <div className="border-t border-white/5 pt-2">
            <label className="block text-white/60 font-medium mb-1.5">Description</label>
            <textarea 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell customers about the materials..." 
              required
              className="w-full bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all resize-none"
            />
          </div>

          {/* সাবমিট বাটন (লোডিং স্টেট সহ) */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl text-black font-semibold text-[14px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
            style={{ backgroundColor: colors.bambooTan }}
          >
            {loading ? "Publishing to API..." : <><Plus size={16} /> Publish Product</>}
          </button>
        </form>
      </div>
    </div>
  );
}