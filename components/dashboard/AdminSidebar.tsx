"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  UserCircle,
  Truck,
  FileText,
  BarChart3,
  Settings,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

interface MenuItem {
  title: string
  href: string
  icon: typeof LayoutDashboard
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Pesanan", href: "/admin/pesanan", icon: ShoppingCart },
  { title: "Produk", href: "/admin/produk", icon: Package },
  { title: "Staff", href: "/admin/staff", icon: Users },
  { title: "Pelanggan", href: "/admin/pelanggan", icon: UserCircle },
  { title: "Supplier", href: "/admin/supplier", icon: Truck },
  { title: "Konten", href: "/admin/konten", icon: FileText },
  { title: "Marketing", href: "/admin/marketing", icon: Megaphone },
  { title: "Analitik", href: "/admin/analitik", icon: BarChart3 },
  { title: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-[#2c3e50] text-white transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!isCollapsed && (
          <h1 className="font-display text-xl font-bold">
            Luxe Bloom
            <span className="block text-xs font-normal text-gray-400">Admin Panel</span>
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-lg p-2 hover:bg-white/10 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-[#2ecc71] text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User & Logout at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
        {!isCollapsed && (
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#2ecc71] flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Admin Master</p>
              <p className="text-xs text-gray-400 truncate">admin@luxebloom.com</p>
            </div>
          </div>
        )}
        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  )
}
