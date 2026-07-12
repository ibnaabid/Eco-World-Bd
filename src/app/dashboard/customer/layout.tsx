import CustomerLayout from "@/app/customerPanel/page";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // ডাবল র‍্যাপার ও ডিফাইন করা aside ট্যাগ ডিলেট করে সরাসরি আমাদের তৈরি মেইন লেআউট ব্যবহার করুন
    <CustomerLayout>
      {children}
    </CustomerLayout>
  );
};

export default Layout;