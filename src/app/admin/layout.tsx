import Sidebar from "@/components/sidebar";

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