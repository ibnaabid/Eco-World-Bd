"use client";

import { useState, useRef } from "react";
import { Plus, Image as ImageIcon, Trash2, ShoppingBag, Tag, Sparkles } from "lucide-react";

const colors = {
  cardDark: "#132519",
  bambooTan: "#C9A876",
  moss: "#6B8F5C",
  cream: "#F6F2E9"
};

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // পিসির ফোল্ডার ওপেন করে ইমেজ ফাইল ইনপুট নেওয়ার ফাংশন
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // ড্র্যাগ অ্যান্ড ড্রপ ফাইল ইনপুট
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে তোমার API কল করে ডেটাবেজে পাঠাতে পারবে মামা
    console.log({ productName, price, description, image });
    alert("Product added successfully!");
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
          {/* ১. ইমেজ আপলোডার এরিয়া (পিসির ফোল্ডার খোলার ব্যবস্থা) */}
          <div>
            <label className="block text-white/60 font-medium mb-2">Product Showcase Image</label>
            
            {/* ইনপুট ফিল্ডটি হাইড করে বাটন বা ড্র্যাগ বক্স দিয়ে ক্লিক ট্রিগার করা হয়েছে */}
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
                onClick={triggerFileSelect}
                className="border-2 border-dashed border-white/10 hover:border-[#C9A876]/40 rounded-2xl p-8 text-center cursor-pointer transition-all bg-black/10 flex flex-col items-center justify-center gap-3 group"
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <ImageIcon size={32} style={{ color: colors.bambooTan }} />
                </div>
                <div>
                  <p className="text-white/80 font-medium text-[13.5px]">
                    Click to browse or drag & drop image
                  </p>
                  <p className="text-[11px] text-white/30 mt-1">
                    Supports PNG, JPG, WEBP (Max 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 p-2 flex items-center justify-center">
                <img 
                  src={image.preview} 
                  alt="preview" 
                  className="max-h-64 object-contain rounded-xl"
                />
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

          {/* ২. প্রোডাক্টের নাম */}
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

            {/* ৩. প্রোডাক্টের প্রাইস */}
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

          {/* ৪. ডেসক্রিপশন */}
          <div>
            <label className="block text-white/60 font-medium mb-1.5">Description</label>
            <textarea 
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell customers about the materials, design history, and size of this handicraft..." 
              required
              className="w-full bg-black/10 border border-white/5 focus:border-[#C9A876]/30 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all resize-none"
            />
          </div>

          {/* সাবমিট বাটন */}
          <button 
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl text-black font-semibold text-[14px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all"
            style={{ backgroundColor: colors.bambooTan }}
          >
            <Plus size={16} />
            Publish Product
          </button>
        </form>
      </div>
    </div>
  );
}