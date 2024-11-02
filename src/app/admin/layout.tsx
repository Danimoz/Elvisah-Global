import Sidebar from "@/components/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admin Dashboard | Elvisah',
  description: 'Admin Dashboard for Elvisah Global',
  robots: 'noindex, nofollow'
}

export default function AdminLayout({ children }: { children: React.ReactNode }){
  return (
    <main className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="py-4 px-6 w-full">
        {children}
      </div>
    </main>
  )
}