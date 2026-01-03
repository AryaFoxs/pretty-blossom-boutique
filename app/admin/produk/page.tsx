"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Package, AlertTriangle, Check, X } from "lucide-react"
import { products } from "@/lib/data/products"
import { formatPrice } from "@/lib/utils"

// Add mock stock numbers to products
const productsWithStock = products.map((p, index) => ({
  ...p,
  stock: [5, 15, 25, 8, 30, 12, 3, 20][index % 8]
}))

export default function AdminProdukPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filteredProducts = productsWithStock.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const lowStockProducts = productsWithStock.filter(p => p.stock < 10)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-500">Kelola katalog produk dan inventaris</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2ecc71] text-white rounded-lg hover:bg-[#27ae60] transition-colors font-medium">
          <Plus className="h-5 w-5" />
          Tambah Produk
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="rounded-xl bg-orange-50 border border-orange-200 p-4 flex items-center gap-4">
          <div className="rounded-full bg-orange-100 p-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-orange-800">
              {lowStockProducts.length} Produk dengan Stok Menipis
            </h3>
            <p className="text-sm text-orange-600">
              Beberapa produk memiliki stok kurang dari 10 unit.
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'Semua Kategori' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Placeholder */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-16 w-16 text-gray-300" />
              </div>
              {/* Stock Badge */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                product.stock < 10 
                  ? 'bg-red-100 text-red-700' 
                  : product.stock < 20 
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
              }`}>
                Stok: {product.stock}
              </div>
              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-[#2c3e50] text-white rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
              {/* In Stock Status */}
              <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                product.inStock 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.inStock ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {product.inStock ? 'Tersedia' : 'Habis'}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">{product.category}</div>
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-lg font-bold text-[#2ecc71]">{formatPrice(product.price)}</p>
              
              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
          Tidak ada produk yang ditemukan
        </div>
      )}
    </div>
  )
}
