"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Flower2, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Katalog", href: "/katalog" },
  { name: "Layanan", href: "/layanan" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Hubungi Kami", href: "/hubungi-kami" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-rose-100/20"
          : "bg-transparent"
      )}
    >
      <nav className="container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Flower2 className="h-9 w-9 text-rose-500 transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-rose-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-warm-800 leading-tight">
                Pretty Blossom
              </span>
              <span className="text-xs text-rose-500 font-medium tracking-wider uppercase">
                Boutique
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-rose-600 bg-rose-50"
                    : "text-warm-600 hover:text-rose-600 hover:bg-rose-50/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Keranjang</span>
            </Button>
            <Button size="sm">Pesan Sekarang</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-warm-600 hover:bg-rose-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-warm-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  pathname === item.href
                    ? "text-rose-600 bg-rose-50"
                    : "text-warm-600 hover:text-rose-600 hover:bg-rose-50/50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 px-4">
              <Button variant="outline" className="w-full gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Keranjang</span>
              </Button>
              <Button className="w-full">Pesan Sekarang</Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
