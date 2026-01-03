"use client"

import { useState } from "react"
import { Search, Filter, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { mockOrders } from "@/lib/data/mock-orders"
import { formatPrice } from "@/lib/utils"
import { Order, OrderStatus } from "@/types/dashboard"

const statusFilters: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'ready', label: 'Ready' },
  { value: 'delivering', label: 'Delivering' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function AdminPesananPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pesanan</h1>
          <p className="text-gray-500">Kelola semua pesanan dari berbagai sumber</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2ecc71] text-white rounded-lg hover:bg-[#27ae60] transition-colors font-medium">
          <Plus className="h-5 w-5" />
          Tambah Pesanan
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari no. order atau nama pelanggan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === filter.value
                  ? 'bg-[#2c3e50] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No. Order</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipe</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prioritas</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Pembayaran</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Staff</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono font-medium text-gray-900">{order.orderNumber}</span>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {order.createdAt.toLocaleDateString('id-ID')}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.customerPhone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize text-sm text-gray-600">{order.orderType}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.priority} type="priority" size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} type="order" size="sm" />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.paymentStatus} type="payment" size="sm" />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.staffAssignedName || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Lihat">
                        <Eye className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            Tidak ada pesanan yang ditemukan
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan {filteredOrders.length} dari {mockOrders.length} pesanan
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
            Sebelumnya
          </button>
          <button className="px-3 py-2 bg-[#2c3e50] text-white rounded-lg text-sm font-medium">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  )
}
