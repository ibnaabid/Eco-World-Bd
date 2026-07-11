import { Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeleteProductDialog from "./Delete";
import ViewProductModal from "./View";

type Product = {
  _id: string;
  productName: string;
  price: number;
  parcelType: string;
  image?: string;
};

const Page = async () => {
  const res  = await fetch("http://localhost:5000/products", { cache: "no-store" });
  const data: Product[] = await res.json();

  return (
    <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-emerald-900">Products</h1>
            <p className="text-xs sm:text-sm text-emerald-600 mt-0.5">
              {data.length} product{data.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            href="/dashboard/admin/add-product"
            className="w-fit bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            + Add Product
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          {[
            { label: "Total Products", value: data.length,
              color: "text-emerald-800", bg: "bg-white border-emerald-200" },
            { label: "Categories",     value: new Set(data.map(p => p.parcelType)).size,
              color: "text-emerald-600", bg: "bg-emerald-100 border-emerald-200" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border rounded-2xl p-3 sm:p-4 text-center shadow-sm`}>
              <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Empty */}
        {data.length === 0 && (
          <div className="bg-white border border-emerald-200 rounded-2xl py-16 sm:py-20 text-center">
            <Package className="w-10 h-10 mx-auto mb-3 text-emerald-300" />
            <p className="text-emerald-600 text-sm">No products found.</p>
          </div>
        )}

        {/* ── DESKTOP TABLE (md+) ── */}
        {data.length > 0 && (
          <>
            <div className="hidden md:block bg-white border border-emerald-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[580px]">
                  <thead className="bg-emerald-700 text-white">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Product</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Category</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Price</th>
                      <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {data.map((product) => (
                      <tr key={product._id} className="hover:bg-emerald-50/60 transition-colors">

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {product.image ? (
                              <Image
                                height={40} width={40}
                                src={product.image}
                                alt={product.productName}
                                className="w-10 h-10 rounded-xl object-cover border border-emerald-100 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 text-sm font-bold">
                                {product.productName?.[0]?.toUpperCase()}
                              </div>
                            )}
                            <span className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">
                              {product.productName}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-block text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                            {product.parcelType || "—"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-sm font-bold text-emerald-800">
                            ৳{product.price?.toLocaleString()}
                          </span>
                        </td>

                        <td className="px-5 py-4">
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
            <div className="md:hidden flex flex-col gap-3">
              {data.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {product.image ? (
                      <Image
                        height={48} width={48}
                        src={product.image}
                        alt={product.productName}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold text-lg">
                        {product.productName?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {product.productName}
                      </p>
                      <span className="inline-block text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mt-1">
                        {product.parcelType || "—"}
                      </span>
                    </div>
                    <span className="ml-auto text-sm font-bold text-emerald-800 flex-shrink-0">
                      ৳{product.price?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-emerald-50">
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