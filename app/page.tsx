import Link from "next/link"
import { 
  Heart, 
  Award, 
  Home as HomeIcon, 
  Flower,
  Star,
  ArrowRight,
  Calendar
} from "lucide-react"
import { HeroSlider } from "@/components/home/HeroSlider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { testimonials } from "@/lib/data/site"
import { blogPosts } from "@/lib/data/blog"
import { products } from "@/lib/data/products"
import { formatPrice } from "@/lib/utils"

// Category data - updated with gold theme
const categories = [
  {
    title: "Untuk Kekasih",
    description: "Buket romantis mawar & lily",
    icon: Heart,
    href: "/katalog?occasion=romantis",
    color: "bg-blush-100 text-blush-500",
  },
  {
    title: "Untuk Ucapan Selamat",
    description: "Bunga papan & standing flower",
    icon: Award,
    href: "/katalog?category=standing-flower",
    color: "bg-gold-100 text-gold-600",
  },
  {
    title: "Untuk Rumah",
    description: "Tanaman hias penyegar udara",
    icon: HomeIcon,
    href: "/katalog?category=tanaman-hias",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Untuk Dukacita",
    description: "Karangan bunga simpati yang elegan",
    icon: Flower,
    href: "/katalog?category=karangan-duka",
    color: "bg-warm-100 text-warm-600",
  },
]

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Introduction Section */}
      <section className="section bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-gold-500 font-medium mb-4">
              <Flower className="h-5 w-5" />
              Selamat Datang
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-6">
              Di mana Setiap Kelopak Bercerita
            </h2>
            <p className="text-warm-600 text-lg leading-relaxed">
              Selamat datang di <span className="font-semibold text-gold-600">Luxe Bloom Boutique</span>, 
              rumah bagi rangkaian bunga mewah terbaik. Kami merancang setiap karya dengan penuh 
              keahlian dan mengirimkannya tepat waktu untuk merayakan setiap momen kehidupan Anda—dari 
              kasih sayang, sukacita, hingga dukaca.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-gradient-to-b from-background to-cream-100/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-4">
              Kategori Unggulan
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Temukan rangkaian bunga yang sesuai dengan momen spesial Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="h-full group cursor-pointer hover:border-gold-300 card-hover">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-warm-800 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-warm-500 text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-2">
                Produk Terlaris
              </h2>
              <p className="text-warm-500">
                Pilihan favorit pelanggan kami
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/katalog" className="gap-2">
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/katalog/${product.slug}`}>
                <Card className="group overflow-hidden card-hover">
                  <div className="aspect-square bg-gradient-to-br from-cream-100 to-gold-100 relative">
                    {/* Product image placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flower className="h-20 w-20 text-gold-300 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {product.featured && (
                      <Badge className="absolute top-3 left-3">Bestseller</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-display text-lg font-semibold text-warm-800 mb-1 group-hover:text-gold-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-warm-500 text-sm mb-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <p className="text-gold-600 font-semibold">
                      {formatPrice(product.price)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-cream-100">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-4">
              Apa Kata Pelanggan Kami
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Ribuan pelanggan telah mempercayakan momen spesial mereka kepada kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-gold-400 fill-gold-400"
                            : "text-warm-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-warm-600 mb-6 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                      <span className="text-gold-600 font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-warm-800">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-warm-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-2">
                Inspirasi & Tips
              </h2>
              <p className="text-warm-500">
                Pelajari lebih lanjut tentang dunia bunga
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog" className="gap-2">
                Lihat Semua Artikel <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group overflow-hidden card-hover h-full">
                  <div className="aspect-video bg-gradient-to-br from-cream-100 to-gold-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flower className="h-12 w-12 text-gold-300" />
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 text-sm text-warm-500 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-warm-800 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-warm-500 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-gold-600 to-gold-500 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Siap Mewujudkan Momen Spesial Anda?
            </h2>
            <p className="text-gold-100 text-lg mb-8">
              Konsultasikan kebutuhan Anda dengan tim kami dan dapatkan rangkaian bunga yang sempurna
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="white">
                Pesan Sekarang
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/hubungi-kami">Konsultasi Gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
