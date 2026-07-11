"use client"
import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Layers, RefreshCw } from 'lucide-react';
import Image from 'next/image';

export interface Product {
  _id: string;
  productName: string;
  price: number;
  description: string;
  pickupAddress: string;
  parcelType: 'standard' | 'express' | string;
  image: string;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // CORE DISPATCH: Fetch API Engine
  // ==========================================
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) throw new Error('System failed to retrieve products stream.');
        const data: Product[] = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Fatal endpoint response exception.');
        setLoading(false);
      }
    };
    fetchInventoryData();
  }, []);

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-96 gap-3">
      <RefreshCw size={24} className="animate-spin text-gray-500" />
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Streaming DB...</span>
    </div>
  );

  if (error) return (
    <div className="text-center py-16 text-rose-500 font-semibold text-sm bg-rose-50/40 border border-rose-100 rounded-2xl max-w-md mx-auto">
      Error Pipe: {error}
    </div>
  );

  return (
    <div className="w-full bg-slate-50/30 min-h-screen py-12 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Dynamic Micro Info Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Inventory</h2>
            <p className="text-xs text-slate-400 font-medium">Dynamic Live Fetch Grid</p>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm">
            <Layers size={12} /> {products.length} Units Available
          </span>
        </div>

        {/* ==========================================
            🎨 ULTRA-PREMIUM GRID CARDS MODULE
           ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id}
              className="group relative bg-green-900 rounded-3xl border border-slate-100/80 shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] hover:border-slate-200/50 transition-all duration-500 ease-out flex flex-col overflow-hidden"
            >
              {/* Asset Frame Showcase wrapper */}
              <div className="p-3 pb-0">
                <div className="w-full h-52 bg-slate-50/50 rounded-2xl overflow-hidden relative border border-slate-100/60">
                  <Image
                  height={600}
                  width={600}
                    src={product.image} 
                    alt={product.productName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e)=>{(e.target as HTMLImageElement).src='https://placehold.co/600x400?text=Asset+Missing'}}
                  />
                  
                  {/* Floating Routing Tier Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-3 py-1 rounded-xl uppercase tracking-wide border backdrop-blur-md shadow-sm ${
                      product.parcelType === 'express' 
                        ? 'bg-amber-50/90 text-amber-800 border-amber-200/40' 
                        : 'bg-white/90 text-slate-300 border-slate-200/40'
                    }`}>
                      <Truck size={10} className={product.parcelType === 'express' ? 'text-amber-600' : 'text-slate-400'} />
                      {product.parcelType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Data Specifications Content Area */}
              <div className="px-5 pt-4 pb-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-300 leading-snug line-clamp-1">
                      {product.productName}
                    </h3>
                    
                    {/* Clean Pill Price Asset */}
                    <div className="font-black text-slate-900 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-lg text-sm tracking-tight">
                      ${product.price}
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400/90 line-clamp-2 leading-relaxed font-normal mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Card Base Meta Footer */}
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-slate-500 text-xs font-medium">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin size={13} className="text-slate-300 group-hover:text-rose-500 transition-colors duration-300 flex-shrink-0" />
                    <span className="truncate text-slate-400 text-xs font-semibold" title={product.pickupAddress}>
                      {product.pickupAddress}
                    </span>
                  </div>
                  
                  <span className="text-[10px] text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-bold whitespace-nowrap">
                    Inspect &rarr;
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductGrid;