import { cn } from "@/lib/utils"
import { OrderStatus, OrderPriority, PaymentStatus, StaffStatus } from "@/types/dashboard"

type BadgeType = 'order' | 'priority' | 'payment' | 'staff'

interface StatusBadgeProps {
  status: string
  type: BadgeType
  size?: 'sm' | 'md'
  className?: string
}

const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Menunggu', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  processing: { label: 'Diproses', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  ready: { label: 'Siap', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  delivering: { label: 'Dikirim', className: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  delivered: { label: 'Selesai', className: 'bg-green-100 text-green-800 border-green-200' },
  cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-800 border-red-200' }
}

const priorityConfig: Record<OrderPriority, { label: string; className: string }> = {
  normal: { label: 'Normal', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  urgent: { label: 'Urgent', className: 'bg-red-100 text-red-800 border-red-200' },
  same_day: { label: 'Same Day', className: 'bg-orange-100 text-orange-800 border-orange-200' }
}

const paymentConfig: Record<PaymentStatus, { label: string; className: string }> = {
  unpaid: { label: 'Belum Bayar', className: 'bg-red-100 text-red-800 border-red-200' },
  paid: { label: 'Lunas', className: 'bg-green-100 text-green-800 border-green-200' },
  refunded: { label: 'Refund', className: 'bg-gray-100 text-gray-800 border-gray-200' }
}

const staffStatusConfig: Record<StaffStatus, { label: string; className: string }> = {
  available: { label: 'Tersedia', className: 'bg-green-100 text-green-800 border-green-200' },
  busy: { label: 'Sibuk', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  off_duty: { label: 'Off Duty', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  leave: { label: 'Cuti', className: 'bg-blue-100 text-blue-800 border-blue-200' }
}

export function StatusBadge({ status, type, size = 'md', className }: StatusBadgeProps) {
  let config: { label: string; className: string } | undefined

  switch (type) {
    case 'order':
      config = orderStatusConfig[status as OrderStatus]
      break
    case 'priority':
      config = priorityConfig[status as OrderPriority]
      break
    case 'payment':
      config = paymentConfig[status as PaymentStatus]
      break
    case 'staff':
      config = staffStatusConfig[status as StaffStatus]
      break
  }

  if (!config) {
    config = { label: status, className: 'bg-gray-100 text-gray-800 border-gray-200' }
  }

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border font-medium",
      size === 'sm' ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
      config.className,
      className
    )}>
      {config.label}
    </span>
  )
}
