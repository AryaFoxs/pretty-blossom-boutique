import Link from "next/link"
import { 
  ShoppingCart, 
  Store, 
  Package, 
  Truck, 
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from "lucide-react"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { mockOrders, getUrgentOrders } from "@/lib/data/mock-orders"
import { formatPrice } from "@/lib/utils"

export default function StaffDashboard() {
  // Simulating staff-assigned orders
  const myOrders = mockOrders.filter(o => o.staffAssignedId === 's1')
  const urgentOrders = getUrgentOrders()
  const pendingOrders = myOrders.filter(o => o.status === 'pending')
  const processingOrders = myOrders.filter(o => o.status === 'processing')

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#27ae60] to-[#2ecc71] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Selamat Pagi, Rini! 👋</h1>
        <p className="text-white/80">
          {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link 
          href="/staff/pesanan"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border-2 border-transparent hover:border-[#27ae60] transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <ShoppingCart className="h-7 w-7 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">Pesanan Saya</span>
          {pendingOrders.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingOrders.length} baru
            </span>
          )}
        </Link>

        <Link 
          href="/staff/walkin"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border-2 border-transparent hover:border-[#27ae60] transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <Store className="h-7 w-7 text-green-600" />
          </div>
          <span className="font-medium text-gray-900">Walk-in</span>
        </Link>

        <Link 
          href="/staff/stok"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border-2 border-transparent hover:border-[#27ae60] transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <Package className="h-7 w-7 text-purple-600" />
          </div>
          <span className="font-medium text-gray-900">Cek Stok</span>
        </Link>

        <Link 
          href="/staff/pengiriman"
          className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border-2 border-transparent hover:border-[#27ae60] transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <Truck className="h-7 w-7 text-orange-600" />
          </div>
          <span className="font-medium text-gray-900">Pengiriman</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Pesanan Baru"
          value={pendingOrders.length}
          icon={ShoppingCart}
          variant="warning"
        />
        <DashboardCard
          title="Sedang Proses"
          value={processingOrders.length}
          icon={Clock}
          variant="primary"
        />
        <DashboardCard
          title="Selesai Hari Ini"
          value={2}
          icon={CheckCircle}
          variant="success"
        />
        <DashboardCard
          title="Menunggu Kirim"
          value={1}
          icon={Truck}
          variant="default"
        />
      </div>

      {/* Urgent Alert */}
      {urgentOrders.length > 0 && (
        <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-4 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3 animate-pulse">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-red-800">
              ⚠️ {urgentOrders.length} Pesanan URGENT!
            </h3>
            <p className="text-sm text-red-600">
              Pesanan same-day delivery perlu segera diproses
            </p>
          </div>
          <Link 
            href="/staff/pesanan?filter=urgent"
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Proses Sekarang
          </Link>
        </div>
      )}

      {/* My Orders Today */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Pesanan Saya Hari Ini</h2>
          <Link href="/staff/pesanan" className="text-[#27ae60] text-sm font-medium flex items-center gap-1">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {myOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">Tidak ada pesanan yang di-assign ke Anda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myOrders.slice(0, 3).map(order => (
              <div 
                key={order.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 border-l-4 transition-all hover:shadow-md"
                style={{ 
                  borderLeftColor: order.priority === 'urgent' || order.priority === 'same_day' 
                    ? '#e74c3c' 
                    : order.status === 'processing' 
                      ? '#3498db' 
                      : '#f39c12'
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-gray-900">{order.orderNumber}</span>
                    <StatusBadge status={order.priority} type="priority" size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {order.customerName} • {order.items.length} item
                  </p>
                  <p className="text-xs text-gray-400">
                    {order.deliveryInfo?.deliveryDate} {order.deliveryInfo?.deliveryTime}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge status={order.status} type="order" />
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {formatPrice(order.totalAmount)}
                  </p>
                </div>
                <Link 
                  href={`/staff/pesanan/${order.id}`}
                  className="px-4 py-2 bg-[#27ae60] text-white rounded-xl text-sm font-medium hover:bg-[#219a52] transition-colors shrink-0"
                >
                  Proses
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
