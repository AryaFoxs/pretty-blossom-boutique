"use client"

import { useState } from "react"
import { Search, Package, AlertTriangle, CheckCircle, Minus, Plus } from "lucide-react"
import { products } from "@/lib/data/products"

// Add mock stock numbers to products
const productsWithStock = products.map((p, index) => ({
  ...p,
  stock: [5, 15, 25, 8, 30, 12, 3, 20][index % 8]
}))

export default function StaffStokPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'low'>('all')

  const filteredProducts = productsWithStock.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || product.stock < 10
    return matchesSearch && matchesFilter
  })

  const lowStockCount = productsWithStock.filter(p => p.stock < 10).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cek Stok</h1>
        <p className="text-gray-500">Lihat dan update stok produk</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{productsWithStock.length}</div>
              <div className="text-sm text-gray-500">Total Produk</div>
            </div>
          </div>
        </div>
        <div 
          className={`rounded-2xl p-4 border cursor-pointer transition-all ${
            filter === 'low' 
              ? 'bg-red-50 border-red-300' 
              : 'bg-white border-gray-200 hover:border-red-200'
          }`}
          onClick={() => setFilter(filter === 'low' ? 'all' : 'low')}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{lowStockCount}</div>
              <div className="text-sm text-gray-500">Stok Menipis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none"
        />
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            className={`bg-white rounded-2xl p-4 border-2 transition-all ${
              product.stock < 10 ? 'border-red-200' : 'border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Product Info */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0">
                <span className="text-2xl">🌸</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-4">
                <div className={`text-center px-4 py-2 rounded-xl ${
                  product.stock < 10 
                    ? 'bg-red-100 text-red-700' 
                    : product.stock < 20 
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                }`}>
                  <div className="text-xl font-bold">{product.stock}</div>
                  <div className="text-xs">unit</div>
                </div>

                {/* Quick Update */}
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#27ae60] text-white flex items-center justify-center hover:bg-[#219a52] transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Status */}
                {product.stock < 10 ? (
                  <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full">
                    PERLU RESTOCK
                  </span>
                ) : (
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    OK
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada produk ditemukan</p>
        </div>
      )}
    </div>
  )
}
