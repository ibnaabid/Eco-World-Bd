import AdminSidebar from "@/app/AdminSideBar/page";


export default function CustomerPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0D1B12]">
      {/* বাম পাশে থাকবে সাইডবার */}
      <AdminSidebar />

      {/* ডান পাশে থাকবে মেইন কনটেন্ট (যা রাউট অনুযায়ী পরিবর্তন হবে) */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}