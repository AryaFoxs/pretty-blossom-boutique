"use client"

import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { DataTable } from "@/components/dashboard/DataTable"
import { mockOrders, getUrgentOrders } from "@/lib/data/mock-orders"
import { getActiveStaffCount } from "@/lib/data/mock-staff"
import { formatPrice } from "@/lib/utils"
import { Order } from "@/types/dashboard"

export default function AdminDashboard() {
  const urgentOrders = getUrgentOrders()
  const pendingOrders = mockOrders.filter(o => o.status === 'pending')
  const processingOrders = mockOrders.filter(o => o.status === 'processing')
  const todayRevenue = mockOrders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0)

  const orderColumns = [
    { 
      key: 'orderNumber', 
      header: 'No. Order',
      render: (order: Order) => (
        <span className="font-mono font-medium text-gray-900">{order.orderNumber}</span>
      )
    },
    { key: 'customerName', header: 'Pelanggan' },
    { 
      key: 'priority', 
      header: 'Prioritas',
      render: (order: Order) => (
        <StatusBadge status={order.priority} type="priority" size="sm" />
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (order: Order) => (
        <StatusBadge status={order.status} type="order" size="sm" />
      )
    },
    { 
      key: 'totalAmount', 
      header: 'Total',
      render: (order: Order) => (
        <span className="font-medium">{formatPrice(order.totalAmount)}</span>
      )
    },
    { 
      key: 'paymentStatus', 
      header: 'Pembayaran',
      render: (order: Order) => (
        <StatusBadge status={order.paymentStatus} type="payment" size="sm" />
      )
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Selamat datang kembali, Admin!</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Pendapatan Hari Ini"
          value={formatPrice(todayRevenue)}
          icon={DollarSign}
          variant="success"
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Pesanan Baru"
          value={pendingOrders.length}
          subtitle="Menunggu diproses"
          icon={ShoppingCart}
          variant="warning"
        />
        <DashboardCard
          title="Sedang Diproses"
          value={processingOrders.length}
          subtitle="Pesanan aktif"
          icon={Clock}
          variant="primary"
        />
        <DashboardCard
          title="Staff Aktif"
          value={getActiveStaffCount()}
          subtitle="Dari 5 total staff"
          icon={Users}
          variant="default"
        />
      </div>

      {/* Urgent Orders Alert */}
      {urgentOrders.length > 0 && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-800">
              {urgentOrders.length} Pesanan Urgent Membutuhkan Perhatian!
            </h3>
            <p className="text-sm text-red-600">
              Ada pesanan same-day delivery atau urgent yang belum selesai diproses.
            </p>
          </div>
          <a 
            href="/admin/pesanan?filter=urgent" 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Lihat Pesanan
          </a>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h2>
            <a href="/admin/pesanan" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua →
            </a>
          </div>
          <DataTable
            data={mockOrders.slice(0, 5)}
            columns={orderColumns}
          />
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Ringkasan Cepat</h2>
          
          {/* Order Stats */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
            <h3 className="font-medium text-gray-700">Status Pesanan Hari Ini</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="font-semibold">{pendingOrders.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm text-gray-600">Processing</span>
                </div>
                <span className="font-semibold">{processingOrders.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <span className="font-semibold">
                  {mockOrders.filter(o => o.status === 'delivered').length}
                </span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
            <h3 className="font-medium text-gray-700">Performa Bulan Ini</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Pesanan</span>
                <span className="font-semibold">128</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Pendapatan</span>
                <span className="font-semibold text-green-600">Rp 45.5 Jt</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rata-rata Order</span>
                <span className="font-semibold">Rp 355.000</span>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 text-orange-600" />
              <h3 className="font-medium text-orange-800">Stok Menipis</h3>
            </div>
            <ul className="space-y-1 text-sm text-orange-700">
              <li>• Red Rose (sisa 12 tangkai)</li>
              <li>• Baby Breath (sisa 5 ikat)</li>
              <li>• Eucalyptus (sisa 8 tangkai)</li>
            </ul>
            <a href="/admin/produk" className="inline-block mt-3 text-sm font-medium text-orange-700 hover:text-orange-800">
              Kelola Stok →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
