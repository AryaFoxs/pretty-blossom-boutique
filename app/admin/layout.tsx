import { AdminSidebar } from "@/components/dashboard/AdminSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="transition-all duration-300 ml-64 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
