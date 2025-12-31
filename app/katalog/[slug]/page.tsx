import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { 
  Flower, 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle,
  Check,
  Truck,
  Shield,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/data/products"
import { formatPrice } from "@/lib/utils"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const product = products.find((p) => p.slug === resolvedParams.slug)
  
  if (!product) {
    return { title: "Produk Tidak Ditemukan" }
  }

  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params
  const product = products.find((p) => p.slug === resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-rose-50 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/katalog" className="text-warm-500 hover:text-rose-500 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Katalog
            </Link>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 overflow-hidden sticky top-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flower className="h-40 w-40 text-rose-300" />
                </div>
                {product.featured && (
                  <Badge className="absolute top-4 left-4">Bestseller</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <Badge variant="secondary" className="mb-3">
                  {product.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-4">
                  {product.name}
                </h1>
                <p className="text-warm-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-3xl font-bold text-rose-600">
                  {formatPrice(product.price)}
                </p>
                {product.sizes.length > 1 && (
                  <p className="text-warm-500 text-sm mt-1">
                    * Harga mulai dari. Tersedia dalam {product.sizes.length} ukuran.
                  </p>
                )}
              </div>

              {/* Size Options */}
              {product.sizes.length > 1 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-warm-800 mb-3">Pilih Ukuran</h3>
                  <div className="space-y-3">
                    {product.sizes.map((size, index) => (
                      <label
                        key={index}
                        className="flex items-center justify-between p-4 rounded-xl border-2 border-warm-200 cursor-pointer hover:border-rose-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="size"
                            defaultChecked={index === 0}
                            className="w-5 h-5 text-rose-500"
                          />
                          <div>
                            <p className="font-medium text-warm-800">{size.name}</p>
                            <p className="text-sm text-warm-500">{size.description}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-rose-600">
                          {formatPrice(size.price)}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="flex-1 gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Tambah ke Keranjang
                </Button>
                <Button size="lg" variant="outline" className="flex-1 gap-2" asChild>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Tanya Desain Kustom
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-xl bg-rose-50">
                  <Truck className="h-6 w-6 text-rose-500 mx-auto mb-2" />
                  <p className="text-xs text-warm-600">Same Day Delivery</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-rose-50">
                  <Shield className="h-6 w-6 text-rose-500 mx-auto mb-2" />
                  <p className="text-xs text-warm-600">Garansi Segar</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-rose-50">
                  <RefreshCw className="h-6 w-6 text-rose-500 mx-auto mb-2" />
                  <p className="text-xs text-warm-600">Free Revisi</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="border-t border-warm-200 pt-8">
                <h3 className="font-display text-xl font-semibold text-warm-800 mb-4">
                  Detail Produk
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-warm-500">Komposisi</p>
                    <p className="font-medium text-warm-800">{product.composition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">Tinggi</p>
                    <p className="font-medium text-warm-800">{product.height}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">Diameter</p>
                    <p className="font-medium text-warm-800">{product.diameter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">Status</p>
                    <p className="font-medium text-green-600">
                      {product.inStock ? "✓ Tersedia" : "Habis"}
                    </p>
                  </div>
                </div>

                {/* Care Tips */}
                <div>
                  <h4 className="font-semibold text-warm-800 mb-3">Tips Perawatan</h4>
                  <ul className="space-y-2">
                    {product.careTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-warm-600">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section bg-rose-50">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-warm-800 mb-8">
              Produk Serupa
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/katalog/${relatedProduct.slug}`}>
                  <Card className="group overflow-hidden card-hover">
                    <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Flower className="h-16 w-16 text-rose-300 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-display text-lg font-semibold text-warm-800 mb-1 group-hover:text-rose-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-rose-600 font-semibold">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
