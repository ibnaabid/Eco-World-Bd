"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  _id: string;
  name: string;
  image?: string;
  rating: number;
  comment: string;
  productName?: string;
  date?: string;
}

export default function CustomerReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Replace with your actual API endpoint
  const fetchReviews = async () => {
    try {
      const res = await fetch("https://eco-world-backend.vercel.app/reviews", {
        cache: "no-store",
      });
      const data = await res.json();
      setReviews(data.slice(0, 6)); // Show max 6 reviews
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-24 bg-[#FAF7F0]">
        <div className="text-center">Loading beautiful stories...</div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#FAF7F0]" id="reviews">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white px-6 py-2 rounded-full border border-amber-200 mb-4">
            <span className="text-emerald-700 font-medium tracking-wider">❤️ REAL STORIES</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-[#16301F] brand-font tracking-tighter">
            Voices from our <span className="text-emerald-700">Community</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Every piece tells a story. Here’s what our customers say about their BambooCraft journey.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group bg-slate-200 rounded-3xl p-9 shadow-sm hover:shadow-2xl border border-amber-100 transition-all duration-500 flex flex-col h-full relative"
              >
                {/* Decorative Element */}
                <div className="absolute top-6 right-6 text-5xl opacity-10 group-hover:opacity-20 transition-opacity">
                  🌿
                </div>

                {/* Avatar + Info */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={72}
                        height={72}
                        className="rounded-2xl object-cover ring-4 ring-white shadow-lg"
                      />
                    ) : (
                      <div className="w-[72px] h-[72px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-5xl ring-4 ring-white shadow-lg">
                        🌱
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-2xl font-semibold text-[#16301F]">{review.name}</h4>
                    {review.productName && (
                      <p className="text-emerald-700 text-sm mt-1">— {review.productName}</p>
                    )}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex mb-6">
                  {renderStars(review.rating)}
                </div>

                {/* Comment */}
                <div className="flex-1">
                  <Quote className="w-9 h-9 text-emerald-100 mb-4" />
                  <p className="text-[15.8px] leading-relaxed text-gray-700">
                    “{review.comment}”
                  </p>
                </div>

                {/* Date */}
                {review.date && (
                  <p className="text-xs text-gray-500 mt-8 pt-6 border-t border-gray-100">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20 text-gray-500 text-lg">
              No reviews yet. Be the first to share your experience with us.
            </div>
          )}
        </div>

        {/* Bottom Trust Line */}
        <div className="mt-16 text-center text-sm text-gray-500">
          Trusted by over <span className="font-semibold text-emerald-700">4,800+</span> happy customers across Bangladesh
        </div>
      </div>
    </section>
  );
}