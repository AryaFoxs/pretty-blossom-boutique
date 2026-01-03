"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Store,
  Package,
  Truck,
  Users,
  Calendar,
  FileText,
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"

interface MenuItem {
  title: string
  href: string
  icon: typeof LayoutDashboard
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", href: "/staff", icon: LayoutDashboard },
  { title: "Pesanan", href: "/staff/pesanan", icon: ShoppingCart },
  { title: "Walk-in", href: "/staff/walkin", icon: Store },
  { title: "Stok", href: "/staff/stok", icon: Package },
  { title: "Pengiriman", href: "/staff/pengiriman", icon: Truck },
  { title: "Pelanggan", href: "/staff/pelanggan", icon: Users },
  { title: "Event", href: "/staff/event", icon: Calendar },
  { title: "Laporan", href: "/staff/laporan", icon: FileText },
]

export function StaffHeader() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#27ae60] text-white shadow-lg">
      {/* Main Header */}
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/staff" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
            LB
          </div>
          <span className="font-display text-lg font-bold hidden sm:block">
            Luxe Bloom Staff
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/staff' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-white text-[#27ae60]"
                    : "text-white/90 hover:bg-white/20"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-white/20 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* User */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              R
            </div>
            <span className="text-sm font-medium">Rini</span>
          </div>

          {/* Logout */}
          <Link
            href="/login"
            className="rounded-lg p-2 hover:bg-red-500/30 transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden border-t border-white/20 bg-[#219a52] p-4">
          <div className="grid grid-cols-4 gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/staff' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl p-3 text-center transition-all",
                    isActive
                      ? "bg-white text-[#27ae60]"
                      : "text-white/90 hover:bg-white/20"
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{item.title}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
