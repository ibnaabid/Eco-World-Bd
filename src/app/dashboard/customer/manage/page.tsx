"use client";

import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";
import {
  Mail,
  ShieldCheck,
  CalendarDays,
  User,
  Edit,
} from "lucide-react";

export default function PremiumProfile() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="h-96 rounded-3xl bg-white animate-pulse border" />
    );
  }

  const user = session?.user;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-200">

      {/* Cover */}
      <div className="h-40 bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 relative">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Profile */}
      <div className="px-8 pb-8">

        <div className="-mt-16 flex flex-col lg:flex-row lg:items-end lg:justify-between">

          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-5">

            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={120}
                height={120}
                className="rounded-full border-4 border-white object-cover shadow-xl"
              />
            ) : (
              <div className="w-[120px] h-[120px] rounded-full bg-emerald-700 border-4 border-white shadow-xl flex items-center justify-center text-white">
                <User size={55} />
              </div>
            )}

            <div className="text-center lg:text-left">

              <h2 className="text-3xl font-bold text-gray-900">
                {user?.name}
              </h2>

              <p className="text-gray-500 mt-1">
                {user?.email}
              </p>

              <span className="inline-flex items-center gap-2 mt-3 rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
                <ShieldCheck size={16} />
                Verified Customer
              </span>

            </div>

          </div>

          <button className="btn btn-success mt-6 lg:mt-0 rounded-xl">
            <Edit size={18} />
            Edit Profile
          </button>

        </div>

        {/* Info Cards */}

        <div className="grid gap-5 md:grid-cols-3 mt-10">

          <div className="rounded-2xl border bg-gray-50 p-5">
            <div className="flex items-center gap-3">
              <Mail className="text-emerald-700" />
              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>
                <h3 className="font-semibold break-all">
                  {user?.email}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-5">
            <div className="flex items-center gap-3">
              <User className="text-emerald-700" />
              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>
                <h3 className="font-semibold">
                  {user?.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-emerald-700" />
              <div>
                <p className="text-sm text-gray-500">
                  Account Status
                </p>
                <h3 className="font-semibold text-emerald-700">
                  Active
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <div className="rounded-2xl bg-emerald-50 p-5 text-center">
            <h2 className="text-3xl font-bold text-emerald-700">
              18
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Orders
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-5 text-center">
            <h2 className="text-3xl font-bold text-blue-700">
              6
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Wishlist
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-5 text-center">
            <h2 className="text-3xl font-bold text-orange-600">
              ৳25K
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total Spend
            </p>
          </div>

          <div className="rounded-2xl bg-green-100 p-5 text-center">
            <h2 className="text-3xl font-bold text-green-700">
              Gold
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Membership
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}