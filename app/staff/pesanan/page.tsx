"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, CheckCircle, Play, Package } from "lucide-react"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { mockOrders } from "@/lib/data/mock-orders"
import { formatPrice } from "@/lib/utils"
import { Order, OrderStatus } from "@/types/dashboard"

export default function StaffPesananPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'processing' | 'ready' | 'all'>('pending')

  // Staff's assigned orders
  const myOrders = mockOrders.filter(o => o.staffAssignedId === 's1')
  
  const getFilteredOrders = () => {
    if (activeTab === 'all') return myOrders
    return myOrders.filter(o => o.status === activeTab)
  }

  const tabs = [
    { key: 'pending', label: 'Menunggu', count: myOrders.filter(o => o.status === 'pending').length, color: 'bg-yellow-500' },
    { key: 'processing', label: 'Diproses', count: myOrders.filter(o => o.status === 'processing').length, color: 'bg-blue-500' },
    { key: 'ready', label: 'Siap', count: myOrders.filter(o => o.status === 'ready').length, color: 'bg-green-500' },
    { key: 'all', label: 'Semua', count: myOrders.length, color: 'bg-gray-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>
        <p className="text-gray-500">Pesanan yang di-assign kepada Anda</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-[#27ae60] text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#27ae60]'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.key
                ? 'bg-white/20 text-white'
                : tab.color + ' text-white'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {getFilteredOrders().length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada pesanan
            </h3>
            <p className="text-gray-500">
              {activeTab === 'pending' && 'Tidak ada pesanan baru yang menunggu diproses'}
              {activeTab === 'processing' && 'Tidak ada pesanan yang sedang diproses'}
              {activeTab === 'ready' && 'Tidak ada pesanan yang siap dikirim'}
              {activeTab === 'all' && 'Belum ada pesanan yang di-assign kepada Anda'}
            </p>
          </div>
        ) : (
          getFilteredOrders().map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const isUrgent = order.priority === 'urgent' || order.priority === 'same_day'

  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden border-2 transition-all hover:shadow-lg ${
        isUrgent ? 'border-red-300' : 'border-transparent'
      }`}
    >
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between ${
        isUrgent ? 'bg-red-50' : 'bg-gray-50'
      }`}>
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-gray-900">{order.orderNumber}</span>
          <StatusBadge status={order.priority} type="priority" size="sm" />
          <StatusBadge status={order.status} type="order" size="sm" />
        </div>
        <StatusBadge status={order.paymentStatus} type="payment" size="sm" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Customer & Items */}
          <div>
            <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
            <p className="text-sm text-gray-500 mb-3">{order.customerPhone}</p>
            
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span>{item.productName}</span>
                  <span className="text-gray-400">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 rounded-xl p-3">
            <h4 className="font-medium text-gray-700 mb-2">Info Pengiriman</h4>
            {order.deliveryInfo ? (
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-medium">{order.deliveryInfo.recipientName}</p>
                <p>{order.deliveryInfo.address}</p>
                <p className="text-[#27ae60] font-medium">
                  📅 {order.deliveryInfo.deliveryDate} {order.deliveryInfo.deliveryTime}
                </p>
                {order.deliveryInfo.notes && (
                  <p className="text-orange-600 italic">📝 {order.deliveryInfo.notes}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Ambil di toko</p>
            )}
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mt-3 p-3 bg-yellow-50 rounded-xl">
            <p className="text-sm text-yellow-800">💡 {order.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">Total:</span>
            <span className="ml-2 text-xl font-bold text-gray-900">{formatPrice(order.totalAmount)}</span>
          </div>
          
          <div className="flex gap-2">
            {order.status === 'pending' && (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-[#27ae60] text-white rounded-xl font-medium hover:bg-[#219a52] transition-colors">
                <Play className="h-4 w-4" />
                Mulai Proses
              </button>
            )}
            {order.status === 'processing' && (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                <CheckCircle className="h-4 w-4" />
                Selesai Proses
              </button>
            )}
            {order.status === 'ready' && (
              <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors">
                <Package className="h-4 w-4" />
                Siap Kirim
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
