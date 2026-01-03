import { Metadata } from "next"
import Link from "next/link"
import { Flower, Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/data/blog"

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, inspirasi, dan panduan seputar dunia bunga dari Luxe Bloom Boutique.",
}

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-cream-100 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-1/3 w-60 h-60 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-gold-500 font-medium mb-4">
              <Flower className="h-5 w-5" />
              Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-800 mb-6">
              Inspirasi & Tips
            </h1>
            <p className="text-warm-600 text-lg">
              Pelajari lebih lanjut tentang dunia bunga, tips perawatan, dan inspirasi dekorasi
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group overflow-hidden card-hover h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-cream-100 to-gold-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flower className="h-16 w-16 text-gold-300 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-warm-500 mb-4">
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
                    <h2 className="font-display text-xl font-semibold text-warm-800 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-warm-500 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream-200">
                      <span className="flex items-center gap-1 text-sm text-warm-500">
                        <Clock className="h-4 w-4" />
                        {post.readTime} menit baca
                      </span>
                      <span className="text-gold-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-cream-100">
        <div className="container max-w-2xl text-center">
          <Flower className="h-12 w-12 text-gold-400 mx-auto mb-6" />
          <h2 className="font-display text-2xl font-bold text-warm-800 mb-4">
            Dapatkan Tips Terbaru
          </h2>
          <p className="text-warm-600 mb-6">
            Berlangganan newsletter kami untuk mendapatkan tips dan inspirasi bunga langsung ke inbox Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email Anda"
              className="flex-1 h-12 px-4 rounded-xl border-2 border-cream-300 focus:border-gold-400 focus:outline-none focus:ring-4 focus:ring-gold-100"
            />
            <button className="h-12 px-6 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-medium rounded-xl hover:shadow-lg transition-shadow">
              Berlangganan
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
