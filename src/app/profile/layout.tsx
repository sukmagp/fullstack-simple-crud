import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
        
      </div>
    </div>
  );
}
