"use client"

import { useState } from "react"
import { Search, Plus, Minus, ShoppingCart, User, CreditCard, Printer } from "lucide-react"
import { products } from "@/lib/data/products"
import { formatPrice } from "@/lib/utils"

// Add mock stock to products
const productsWithStock = products.map((p, index) => ({
  ...p,
  stock: [25, 15, 30, 8, 20, 12, 5, 18][index % 8]
}))

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export default function StaffWalkinPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [notes, setNotes] = useState('')

  const filteredProducts = productsWithStock.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 12)

  const addToCart = (product: typeof productsWithStock[0]) => {
    const existing = cart.find(item => item.productId === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }])
    }
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.productId === productId) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  const handleCheckout = () => {
    alert('Transaksi berhasil! (Demo)')
    setCart([])
    setCustomerName('')
    setCustomerPhone('')
    setNotes('')
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 min-h-[calc(100vh-120px)]">
      {/* Left - Products */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kasir Walk-in</h1>
          <p className="text-gray-500">Input transaksi pelanggan langsung</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none text-lg"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white rounded-xl p-4 text-left border-2 border-transparent hover:border-[#27ae60] transition-all hover:shadow-md"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                {product.name}
              </h3>
              <p className="font-bold text-[#27ae60]">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Stok: {product.stock}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Right - Cart */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden flex flex-col h-fit lg:sticky lg:top-20">
        {/* Cart Header */}
        <div className="bg-[#27ae60] px-4 py-3 flex items-center gap-3 text-white">
          <ShoppingCart className="h-5 w-5" />
          <span className="font-semibold">Keranjang</span>
          <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {cart.length} item
          </span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto max-h-[300px] p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Keranjang kosong</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.productId} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="w-8 h-8 rounded-full bg-[#27ae60] text-white flex items-center justify-center hover:bg-[#219a52] transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer Info */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <User className="h-4 w-4" />
            Info Pelanggan
          </div>
          <input
            type="text"
            placeholder="Nama pelanggan"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none"
          />
          <input
            type="tel"
            placeholder="No. telepon (opsional)"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none"
          />
          <textarea
            placeholder="Catatan (opsional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-[#27ae60] outline-none resize-none"
          />
        </div>

        {/* Payment Method */}
        <div className="border-t border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <CreditCard className="h-4 w-4" />
            Metode Pembayaran
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['cash', 'transfer', 'qris'].map(method => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  paymentMethod === method
                    ? 'bg-[#27ae60] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total</span>
            <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
          </div>
          
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full py-4 bg-[#27ae60] text-white rounded-xl font-bold text-lg hover:bg-[#219a52] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Printer className="h-5 w-5" />
            Proses & Cetak Struk
          </button>
        </div>
      </div>
    </div>
  )
}
