"use client";

import { Search } from "lucide-react";

interface ProductFilterProps {
  search: string;
  setSearch: (value: string) => void;
  pickupAddress: string;
  setPickupAddress: (value: string) => void;
  parcelType: string;
  setParcelType: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export default function ProductFilter({
  search,
  setSearch,
  pickupAddress,
  setPickupAddress,
  parcelType,
  setParcelType,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  sort,
  setSort,
}: ProductFilterProps) {
  return (
    <div className="bg-gray-100/30 rounded-2xl border border-gray-200 shadow-sm p-6 mb-12">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

        {/* Search Product */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Pickup Address */}
        <input
          type="text"
          placeholder="Pickup Address"
          value={pickupAddress}
          onChange={(e) => setPickupAddress(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Parcel Type */}
        <select
          value={parcelType}
          onChange={(e) => setParcelType(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Parcel Types</option>
          <option value="Standard">Standard</option>
          <option value="Express">Express</option>
          <option value="Premium">Premium</option>
        </select>

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Price */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Price</option>
          <option value="0-500">৳0 - ৳500</option>
          <option value="500-1000">৳500 - ৳1000</option>
          <option value="1000-5000">৳1000 - ৳5000</option>
          <option value="5000-10000">৳5000 - ৳10000</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Sort By Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>
    </div>
  );
}