"use client";

import { useState } from "react";
import { Star, Send, User, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

interface ReviewFormData {
  name: string;
  email: string;
  rating: number;
  productName: string;
  comment: string;
}

export default function WriteReviewForm() {
  const [form, setForm] = useState<ReviewFormData>({
    name: "",
    email: "",
    rating: 5,
    productName: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.comment) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      toast.success("Thank you! Your review has been submitted successfully 🌿");

      // Reset form
      setForm({
        name: "",
        email: "",
        rating: 5,
        productName: "",
        comment: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setForm({ ...form, rating });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-amber-100">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-sm font-medium mb-4">
          🌱 Share Your Experience
        </div>
        <h2 className="text-4xl font-bold text-[#16301F] brand-font">Write a Review</h2>
        <p className="text-gray-600 mt-3">
          Your words help us grow and inspire others
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nadia Rahman"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-600 focus:ring-emerald-200 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-600 focus:ring-emerald-200 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name (Optional)</label>
          <input
            type="text"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            placeholder="Minimalist Bamboo Bookshelf"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-600 focus:ring-emerald-200 outline-none transition-all"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">How would you rate this product?</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-125"
              >
                <Star
                  size={38}
                  className={`${
                    star <= (hoveredRating || form.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-emerald-700 mt-2 font-medium">
            {form.rating} out of 5 stars
          </p>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={22} />
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="I absolutely love the quality and craftsmanship of this bamboo furniture..."
              rows={5}
              className="w-full pl-12 pr-4 py-4 rounded-3xl border border-gray-200 focus:border-emerald-600 focus:ring-emerald-200 outline-none resize-y min-h-[140px] transition-all"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-teal-800 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.985] disabled:opacity-70"
        >
          {loading ? (
            "Submitting Review..."
          ) : (
            <>
              Submit Review <Send size={22} />
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-500">
          Your review will be published after moderation. Thank you for supporting handmade crafts!
        </p>
      </form>
    </div>
  );
}