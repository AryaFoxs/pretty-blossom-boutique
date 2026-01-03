import { Metadata } from "next"
import Link from "next/link"
import { Flower, Truck, Sparkles, Calendar, Palette, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { services } from "@/lib/data/site"

export const metadata: Metadata = {
  title: "Layanan",
  description: "Layanan lengkap dari Luxe Bloom Boutique: pengiriman ekspres, dekorasi acara, langganan bulanan, dan desain kustom.",
}

const iconMap: Record<string, typeof Truck> = {
  truck: Truck,
  sparkles: Sparkles,
  calendar: Calendar,
  palette: Palette,
}

export default function LayananPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-cream-100 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-60 h-60 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-gold-500 font-medium mb-4">
              <Flower className="h-5 w-5" />
              Layanan Kami
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-800 mb-6">
              Solusi Lengkap untuk Setiap Kebutuhan Anda
            </h1>
            <p className="text-warm-600 text-lg">
              Dari pengiriman ekspres hingga dekorasi acara besar, kami siap membantu
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Flower
              return (
                <Card key={service.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cream-100 to-gold-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-gold-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold text-warm-800 mb-3">
                          {service.title}
                        </h3>
                        <p className="text-warm-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-cream-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-4">
              Cara Pemesanan
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Proses mudah dan cepat untuk mendapatkan rangkaian bunga impian Anda
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Pilih Produk", desc: "Jelajahi katalog atau konsultasikan desain kustom" },
              { step: 2, title: "Isi Detail", desc: "Lengkapi alamat pengiriman dan pesan khusus" },
              { step: 3, title: "Pembayaran", desc: "Bayar dengan metode yang Anda pilih" },
              { step: 4, title: "Terima Bunga", desc: "Kami antar tepat waktu dengan penuh cinta" },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-2xl font-bold text-gold-500">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-warm-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-warm-500 text-sm">
                  {item.desc}
                </p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-gold-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <Card className="bg-gradient-to-r from-gold-600 to-gold-500 border-0 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Butuh Bantuan Memilih?
                </h2>
                <p className="text-gold-100 text-lg mb-8 max-w-2xl mx-auto">
                  Tim kami siap membantu Anda menemukan rangkaian yang sempurna untuk setiap momen
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" variant="white" asChild>
                    <Link href="/hubungi-kami">Konsultasi Gratis</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      Chat WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
