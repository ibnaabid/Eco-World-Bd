"use client";

import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";
import {
  Mail,
  ShieldCheck,
  CalendarDays,
  User,
  Edit3,
  Award,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function PremiumProfile() {
  const { data: session, isPending } = authClient.useSession();
  const [isEditing, setIsEditing] = useState(false);

  if (isPending) {
    return (
      <div className="min-h-[500px] rounded-3xl bg-white/70 backdrop-blur-xl animate-pulse border border-gray-100" />
    );
  }

  const user = session?.user;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
        {/* Premium Cover */}
        <div className="h-56 bg-gradient-to-br from-green-700 via-blue-600 to-gray-600 relative">
          <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#ffffff15_0%,transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Profile Section */}
        <div className="px-8 lg:px-12 pb-10">
          <div className="-mt-20 flex flex-col lg:flex-row lg:items-end gap-8 lg:justify-between">
            {/* Avatar */}
            <div className="flex flex-col items-center lg:items-start -mt-2">
              <div className="relative group">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={160}
                    height={160}
                    className="rounded-3xl border-[6px] border-white shadow-2xl object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                ) : (
                  <div className="w-[160px] h-[160px] rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 border-[6px] border-white shadow-2xl flex items-center justify-center">
                    <User size={70} className="text-white" />
                  </div>
                )}

                {/* Status Indicator */}
                <div className="absolute bottom-3 right-3 w-7 h-7 bg-emerald-500 border-[3px] border-white rounded-full"></div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left mt-4 lg:mt-0">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  {user?.name || "Valued Customer"}
                </h1>
                <Award className="w-9 h-9 text-amber-500" />
              </div>

              <p className="text-xl text-gray-600 mt-1">{user?.email}</p>

              <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-1.5 rounded-2xl text-sm font-semibold shadow-sm">
                  <ShieldCheck size={18} />
                  Verified Member
                </span>
                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-xl font-medium">
                  Gold Tier
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all active:scale-95"
            >
              <Edit3 className="group-hover:rotate-12 transition-transform" size={24} />
              Edit Profile
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 p-7 rounded-3xl transition-all group">
              <Mail className="w-8 h-8 text-emerald-600 mb-4" />
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-semibold text-lg mt-1 break-all">{user?.email}</p>
            </div>

            <div className="bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 p-7 rounded-3xl transition-all group">
              <User className="w-8 h-8 text-emerald-600 mb-4" />
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-lg mt-1">{user?.name}</p>
            </div>

            <div className="bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 p-7 rounded-3xl transition-all group">
              <CalendarDays className="w-8 h-8 text-emerald-600 mb-4" />
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-semibold text-lg mt-1">March 2025</p>
            </div>
          </div>

          {/* Premium Statistics */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <TrendingUp className="text-emerald-600" />
              Your Activity
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold text-emerald-600">24</div>
                <p className="text-gray-600 mt-2">Total Orders</p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold text-violet-600">12</div>
                <p className="text-gray-600 mt-2">Favourites</p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold text-amber-600">৳84K</div>
                <p className="text-gray-600 mt-2">Total Spent</p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-yellow-500 text-white border border-amber-400 rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl font-bold">Gold</div>
                <p className="mt-2 opacity-90">Membership Tier</p>
                <p className="text-xs mt-4 opacity-75">2 months remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal / Section (Placeholder) */}
      {isEditing && (
        <div className="mt-8 p-8 bg-white rounded-3xl border shadow-xl">
          <h3 className="text-2xl font-bold mb-6">Edit Your Profile</h3>
          <p className="text-gray-600">Edit form coming soon...</p>
          <button
            onClick={() => setIsEditing(false)}
            className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-2xl"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}