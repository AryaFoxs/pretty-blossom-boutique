"use client"

import { Metadata } from "next"
import Link from "next/link"
import { useState, useMemo } from "react"
import { Flower, Filter, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { products, categories, occasions, colors, priceRanges } from "@/lib/data/products"
import { formatPrice } from "@/lib/utils"

export default function KatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }
      // Occasion filter
      if (selectedOccasion && !product.occasion.includes(selectedOccasion as any)) {
        return false
      }
      // Color filter
      if (selectedColor && !product.colors.includes(selectedColor as any)) {
        return false
      }
      // Price filter
      if (selectedPriceRange) {
        const range = priceRanges.find((r) => r.id === selectedPriceRange)
        if (range && (product.price < range.min || product.price > range.max)) {
          return false
        }
      }
      return true
    })
  }, [selectedCategory, selectedOccasion, selectedColor, selectedPriceRange, searchQuery])

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedOccasion(null)
    setSelectedColor(null)
    setSelectedPriceRange(null)
    setSearchQuery("")
  }

  const hasActiveFilters = selectedCategory || selectedOccasion || selectedColor || selectedPriceRange || searchQuery

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-rose-50 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-40 h-40 bg-rose-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-pink-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-rose-500 font-medium mb-4">
              <Flower className="h-5 w-5" />
              Katalog
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-800 mb-6">
              Koleksi Bunga Kami
            </h1>
            <p className="text-warm-600 text-lg">
              Temukan rangkaian bunga yang sempurna untuk setiap momen spesial
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="section">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    Active
                  </Badge>
                )}
              </Button>
            </div>

            {/* Sidebar Filters */}
            <aside
              className={`lg:w-72 shrink-0 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-2xl border border-warm-100 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-semibold text-warm-800">
                    Filter
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-rose-500 hover:text-rose-600 flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Hapus Semua
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-warm-700 mb-2 block">
                    Cari Produk
                  </label>
                  <Input
                    placeholder="Ketik nama produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-warm-700 mb-3 block">
                    Kategori
                  </label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === cat.id ? null : cat.id
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat.id
                            ? "bg-rose-100 text-rose-700"
                            : "hover:bg-warm-50 text-warm-600"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Occasion Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-warm-700 mb-3 block">
                    Kesempatan
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {occasions.map((occ) => (
                      <button
                        key={occ.id}
                        onClick={() =>
                          setSelectedOccasion(
                            selectedOccasion === occ.id ? null : occ.id
                          )
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          selectedOccasion === occ.id
                            ? "bg-rose-500 text-white"
                            : "bg-warm-100 text-warm-600 hover:bg-warm-200"
                        }`}
                      >
                        {occ.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-warm-700 mb-3 block">
                    Warna
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() =>
                          setSelectedColor(
                            selectedColor === color.id ? null : color.id
                          )
                        }
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color.id
                            ? "border-rose-500 scale-110"
                            : "border-warm-200 hover:border-warm-300"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="text-sm font-medium text-warm-700 mb-3 block">
                    Rentang Harga
                  </label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() =>
                          setSelectedPriceRange(
                            selectedPriceRange === range.id ? null : range.id
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedPriceRange === range.id
                            ? "bg-rose-100 text-rose-700"
                            : "hover:bg-warm-50 text-warm-600"
                        }`}
                      >
                        {range.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-warm-500">
                  Menampilkan <span className="font-semibold text-warm-800">{filteredProducts.length}</span> produk
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/katalog/${product.slug}`}>
                      <Card className="group overflow-hidden card-hover h-full">
                        <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Flower className="h-20 w-20 text-rose-300 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          {product.featured && (
                            <Badge className="absolute top-3 left-3">
                              Bestseller
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.colors.slice(0, 2).map((color) => (
                              <span
                                key={color}
                                className="w-4 h-4 rounded-full border border-warm-200"
                                style={{
                                  backgroundColor:
                                    colors.find((c) => c.id === color)?.hex || "#ccc",
                                }}
                              />
                            ))}
                          </div>
                          <h3 className="font-display text-lg font-semibold text-warm-800 mb-1 group-hover:text-rose-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-warm-500 text-sm mb-2 line-clamp-2">
                            {product.shortDescription}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-rose-600 font-semibold">
                              {formatPrice(product.price)}
                            </p>
                            {product.sizes.length > 1 && (
                              <span className="text-xs text-warm-400">
                                {product.sizes.length} ukuran
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Flower className="h-16 w-16 text-warm-200 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-warm-800 mb-2">
                    Tidak ada produk ditemukan
                  </h3>
                  <p className="text-warm-500 mb-4">
                    Coba ubah filter atau kata kunci pencarian
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Hapus Semua Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
