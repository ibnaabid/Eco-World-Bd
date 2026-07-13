import { Package, MapPin, Tag, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeleteProductDialog from "./Delete";
import ViewProductModal from "./View";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

type Product = {
  _id: string;
  productName: string;
  price: number;
  parcelType: string;
  image?: string;
  pickupAddress?: string;
};

const Page = async () => {
  const token = await auth.api.getToken({
    headers: await headers()
  });

  const res = await fetch("https://eco-world-backend.vercel.app/products", { 
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token?.token}`,
    },
  });
  const data: Product[] = await res.json();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 selection:bg-emerald-400">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your inventory. Total <span className="font-semibold text-emerald-600">{data.length}</span> product{data.length !== 1 ? "s" : ""} found.
            </p>
          </div>
          <Link
            href="/dashboard/admin/add-product"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-200 hover:shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Total Products", value: data.length, color: "text-emerald-700", bg: "bg-white", border: "border-slate-100" },
            { label: "Active Categories", value: new Set(data.map(p => p.parcelType)).size, color: "text-amber-700", bg: "bg-white", border: "border-slate-100" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} ${s.border} border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md`}>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color} mt-1`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="bg-white border border-slate-100 rounded-2xl py-20 text-center shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">No products available</h3>
            <p className="text-slate-400 text-sm mt-1">Get started by adding your first product.</p>
          </div>
        )}

        {/* ── DESKTOP TABLE (md+) ── */}
        {data.length > 0 && (
          <>
            <div className="hidden md:block bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Product</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Address</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Price</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.map((product) => (
                      <tr key={product._id} className="hover:bg-slate-300/70 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {product.image ? (
                              <Image
                                height={44} width={44}
                                src={product.image}
                                alt={product.productName}
                                className="w-11 h-11 rounded-xl object-cover border border-slate-100 group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 text-sm font-bold">
                                {product.productName?.[0]?.toUpperCase()}
                              </div>
                            )}
                            <span className="text-sm font-semibold text-slate-800 max-w-[200px] truncate">
                              {product.productName}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg w-fit">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate max-w-[150px]">{product.pickupAddress || "—"}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg w-fit">
                            <Tag className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{product.parcelType || "—"}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-slate-900">
                            ৳{product.price?.toLocaleString()}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <ViewProductModal product={product} />
                            <DeleteProductDialog product={product} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── MOBILE CARDS (< md) ── */}
            <div className="md:hidden flex flex-col gap-4">
              {data.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3 mb-4">
                    {product.image ? (
                      <Image
                        height={52} width={52}
                        src={product.image}
                        alt={product.productName}
                        className="w-13 h-13 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-13 h-13 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-lg">
                        {product.productName?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {product.productName}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center text-[10px] font-medium bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">
                          {product.parcelType || "—"}
                        </span>
                        {product.pickupAddress && (
                          <span className="inline-flex items-center text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                            {product.pickupAddress}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50/50 px-2.5 py-1 rounded-xl border border-emerald-100/50">
                      ৳{product.price?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2.5 pt-3 border-t border-slate-50">
                    <div className="flex-1">
                      <ViewProductModal product={product} />
                    </div>
                    <div className="flex-1">
                      <DeleteProductDialog product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Page;