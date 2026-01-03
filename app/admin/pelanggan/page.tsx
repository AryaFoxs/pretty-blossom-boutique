"use client"

import { useState } from "react"
import { Search, Plus, Star, Mail, Phone, MapPin, ShoppingBag } from "lucide-react"
import { mockCustomers, getVipCustomers } from "@/lib/data/mock-customers"
import { formatPrice } from "@/lib/utils"

export default function AdminPelangganPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showVipOnly, setShowVipOnly] = useState(false)

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesVip = !showVipOnly || customer.isVip

    return matchesSearch && matchesVip
  })

  const vipCount = mockCustomers.filter(c => c.isVip).length
  const totalSpent = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pelanggan</h1>
          <p className="text-gray-500">Database pelanggan dan riwayat transaksi</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2ecc71] text-white rounded-lg hover:bg-[#27ae60] transition-colors font-medium">
          <Plus className="h-5 w-5" />
          Tambah Pelanggan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{mockCustomers.length}</div>
          <div className="text-sm text-gray-500">Total Pelanggan</div>
        </div>
        <div className="bg-white rounded-xl border border-yellow-200 p-4 bg-yellow-50">
          <div className="text-2xl font-bold text-yellow-600 flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-500" />
            {vipCount}
          </div>
          <div className="text-sm text-yellow-600">Pelanggan VIP</div>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-4 bg-green-50">
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(totalSpent)}
          </div>
          <div className="text-sm text-green-600">Total Transaksi</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(Math.round(totalSpent / mockCustomers.length))}
          </div>
          <div className="text-sm text-gray-500">Rata-rata Belanja</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama, email, atau no. telepon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* VIP Filter */}
        <button
          onClick={() => setShowVipOnly(!showVipOnly)}
          className={`px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors ${
            showVipOnly
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Star className={`h-4 w-4 ${showVipOnly ? 'fill-yellow-500' : ''}`} />
          VIP Only
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kontak</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Order</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Belanja</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order Terakhir</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Catatan</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2c3e50] to-[#34495e] flex items-center justify-center text-white font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{customer.name}</span>
                          {customer.isVip && (
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Bergabung {customer.createdAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                      {customer.email && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{customer.totalOrders}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-green-600">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {customer.lastOrderDate?.toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) || '-'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 max-w-[200px] truncate">
                    {customer.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            Tidak ada pelanggan yang ditemukan
          </div>
        )}
      </div>
    </div>
  )
}
