import Link from "next/link"
import Image from "next/image"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Katalog", href: "/katalog" },
  { name: "Layanan", href: "/layanan" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
]

const categories = [
  { name: "Buket Romantis", href: "/katalog?category=buket" },
  { name: "Bunga Papan", href: "/katalog?category=bunga-papan" },
  { name: "Standing Flower", href: "/katalog?category=standing-flower" },
  { name: "Tanaman Hias", href: "/katalog?category=tanaman-hias" },
  { name: "Karangan Duka", href: "/katalog?category=karangan-duka" },
]

export function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-100">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gold-600 to-gold-500">
        <div className="container py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Dapatkan Penawaran Eksklusif
              </h3>
              <p className="text-gold-100">
                Berlangganan newsletter kami untuk tips bunga dan promo spesial
              </p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <Input
                type="email"
                placeholder="Email Anda"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white/30"
              />
              <Button variant="white" className="shrink-0">
                Berlangganan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/Logo Luxe Bloom Boutique.jpeg"
                  alt="Luxe Bloom Boutique"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white block leading-tight">
                  Luxe Bloom
                </span>
                <span className="text-xs text-gold-400 font-medium tracking-wider uppercase">
                  Boutique
                </span>
              </div>
            </Link>
            <p className="text-warm-400 text-sm mb-6 leading-relaxed">
              Menyampaikan keindahan dan kemewahan melalui rangkaian bunga terbaik sejak 2018.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center text-warm-400 hover:bg-gold-500 hover:text-white transition-all duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center text-warm-400 hover:bg-gold-500 hover:text-white transition-all duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center text-warm-400 hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Menu
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-warm-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Kategori
            </h4>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-warm-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-warm-400 text-sm">
                  Jl. Bunga Indah No. 123, Jakarta Selatan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-400 shrink-0" />
                <a
                  href="tel:+6281234567890"
                  className="text-warm-400 hover:text-gold-400 transition-colors text-sm"
                >
                  0812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-400 shrink-0" />
                <a
                  href="mailto:halo@luxebloom.com"
                  className="text-warm-400 hover:text-gold-400 transition-colors text-sm"
                >
                  halo@luxebloom.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold-400 shrink-0" />
                <span className="text-warm-400 text-sm">
                  Setiap hari, 08:00 - 20:00 WIB
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-800">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-warm-500 text-sm text-center md:text-left">
              © 2024 Luxe Bloom Boutique. All rights reserved.
            </p>
            <p className="text-warm-500 text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-gold-500 fill-gold-500" /> in Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
