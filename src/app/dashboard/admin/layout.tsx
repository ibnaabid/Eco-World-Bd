
// নোট: আপনার কাস্টমার সাইডবার কম্পোনেন্টটি যেখানে আছে সেখান থেকে ইম্পোর্ট করুন

import AdminSidebar from "@/app/AdminSideBar/page";

export default function CustomerPanelLayout({ children }: { children: React.ReactNode }) {
  return (
  
    <AdminSidebar>
      {children}
    </AdminSidebar>

      
 
  );
}