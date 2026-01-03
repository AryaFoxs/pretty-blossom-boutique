// Dashboard Entity Types

// User & Auth
export type UserRole = 'admin_master' | 'staff_toko' | 'florist' | 'kurir'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  avatar?: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Orders
export type OrderStatus = 'pending' | 'processing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
export type OrderType = 'online' | 'walkin' | 'phone'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'
export type OrderPriority = 'normal' | 'urgent' | 'same_day'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  notes?: string
}

export interface DeliveryInfo {
  recipientName: string
  phone: string
  address: string
  city: string
  postalCode: string
  deliveryDate: string
  deliveryTime?: string
  notes?: string
  trackingNumber?: string
  courier?: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerPhone: string
  staffAssignedId?: string
  staffAssignedName?: string
  orderType: OrderType
  status: OrderStatus
  priority: OrderPriority
  items: OrderItem[]
  subtotal: number
  discount: number
  shippingCost: number
  totalAmount: number
  paymentStatus: PaymentStatus
  paymentMethod?: string
  deliveryInfo?: DeliveryInfo
  notes?: string
  createdAt: Date
  updatedAt: Date
  processedAt?: Date
  completedAt?: Date
}

// Customers
export interface Customer {
  id: string
  name: string
  email?: string
  phone: string
  address?: string
  totalOrders: number
  totalSpent: number
  lastOrderDate?: Date
  createdAt: Date
  notes?: string
  isVip: boolean
}

// Staff
export type StaffStatus = 'available' | 'busy' | 'off_duty' | 'leave'

export interface Staff {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: StaffStatus
  avatar?: string
  ordersToday: number
  ordersCompleted: number
  avgProcessingTime: number // in minutes
  joinDate: Date
  salary?: number
  commission?: number
}

// Products
export interface Product {
  id: string
  name: string
  slug: string
  category: string
  price: number
  stock: number
  minimumStock: number
  isActive: boolean
  image?: string
}

// Dashboard Stats
export interface DashboardStats {
  todayOrders: number
  todayRevenue: number
  pendingOrders: number
  processingOrders: number
  lowStockProducts: number
  activeStaff: number
}

export interface RevenueData {
  date: string
  amount: number
}

// Activity Log
export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  details: string
  timestamp: Date
}
