import CustomerLayout from "@/app/customerSide/page";


const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-[#0D1B12] text-white antialiased selection:bg-[#C9A876]/30">
      {/* 🌲 বাম পাশের ফিক্সড সাইডবার */}
      <CustomerLayout />
      
      {/* 🚀 ডান পাশের মেইন কন্টেন্ট এরিয়া (এখানেই ড্যাশবোর্ডের সব পেজ লোড হবে) */}
      <main className="flex-1 min-w-0 min-h-screen overflow-y-auto p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;