import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  Truck,
  ShieldCheck,
  Leaf,
  Star,
} from "lucide-react";
import WhatsAppButton from "@/app/Whatsapp/page";
import CartContent from "./BuyBtn";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

interface Product {
  _id: string;
  productName: string;
  description: string;
  pickupAddress: string;
  parcelType: string;
  price: number;
  image: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  // 🎯 এখানে headers() পাস করতে হবে এবং এটি একটি async ফাংশন হওয়ায় await করতে হবে
  const token = await auth.api.getToken({
    headers: await headers()
  });

  const res = await fetch(`http://localhost:5000/products/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });

  const product: Product = await res.json();

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FAF7F0] via-white to-[#F4F8F3] py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-emerald-800 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div className="relative group">
            <div className="absolute -inset-3 rounded-[35px] bg-gradient-to-r from-emerald-200 via-amber-100 to-emerald-100 blur-2xl opacity-70"></div>
            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl border border-white">
              <Image
                src={product.image}
                alt={product.productName}
                width={900}
                height={900}
                className="w-full h-[550px] object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute left-6 top-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur text-xs font-semibold shadow">
                {product.parcelType}
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
              <Leaf size={15} />
              Eco Friendly Product
            </span>

            <h1 className="text-5xl font-black mt-5 leading-tight text-[#16301F]">
              {product.productName}
            </h1>

            <div className="flex items-center gap-2 mt-5">
              <div className="flex text-yellow-500">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
              </div>
              <span className="text-gray-500">4.9 (250 Reviews)</span>
            </div>

            <h2 className="mt-8 text-6xl font-black text-emerald-700">
              ৳{product.price.toLocaleString()}
            </h2>

            <p className="mt-8 text-gray-600 leading-8 text-lg">
              {product.description}
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow">
                <MapPin className="text-emerald-700" />
                <div>
                  <p className="text-xs uppercase text-gray-400">Pickup Location</p>
                  <h4 className="font-semibold">{product.pickupAddress}</h4>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow">
                <Truck className="text-emerald-700" />
                <div>
                  <p className="text-xs uppercase text-gray-400">Delivery</p>
                  <h4 className="font-semibold">{product.parcelType}</h4>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow">
                <ShieldCheck className="text-emerald-700" />
                <div>
                  <p className="text-xs uppercase text-gray-400">Warranty</p>
                  <h4 className="font-semibold">100% Authentic Handmade</h4>
                </div>
              </div>
            </div>

            {/* BUTTON ACTIONS */}
            <div className="flex gap-4 mt-10">
            
            <CartContent product={product} />

              {/* 🎯 ফিক্সড: বাটন ট্যাগ সরিয়ে সরাসরি কম্পোনেন্ট রাখা হয়েছে এবং প্রপ্স ঠিক করা হয়েছে */}
              <div className="flex h-16">
                <WhatsAppButton product={product} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;