import { Order, OrderStatus, OrderType, OrderPriority, PaymentStatus } from '@/types/dashboard'

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'LXB-20260102-001',
    customerId: 'c1',
    customerName: 'Sari Wijaya',
    customerPhone: '081234567890',
    staffAssignedId: 's1',
    staffAssignedName: 'Rini Handayani',
    orderType: 'online',
    status: 'processing',
    priority: 'same_day',
    items: [
      { productId: 'p1', productName: 'Eternal Love Bouquet', quantity: 1, price: 450000 },
      { productId: 'p2', productName: 'Greeting Card', quantity: 1, price: 25000 }
    ],
    subtotal: 475000,
    discount: 0,
    shippingCost: 25000,
    totalAmount: 500000,
    paymentStatus: 'paid',
    paymentMethod: 'Bank Transfer',
    deliveryInfo: {
      recipientName: 'Dewi Lestari',
      phone: '081298765432',
      address: 'Jl. Sudirman No. 45, Apt. Tower A Lt. 12',
      city: 'Jakarta Selatan',
      postalCode: '12190',
      deliveryDate: '2026-01-02',
      deliveryTime: '14:00-16:00',
      notes: 'Titip di resepsionis'
    },
    notes: 'Kartu ucapan: Selamat Ulang Tahun sayang!',
    createdAt: new Date('2026-01-02T08:30:00'),
    updatedAt: new Date('2026-01-02T09:15:00'),
    processedAt: new Date('2026-01-02T09:15:00')
  },
  {
    id: '2',
    orderNumber: 'LXB-20260102-002',
    customerId: 'c2',
    customerName: 'Budi Santoso',
    customerPhone: '082345678901',
    staffAssignedId: 's2',
    staffAssignedName: 'Maya Putri',
    orderType: 'phone',
    status: 'pending',
    priority: 'urgent',
    items: [
      { productId: 'p3', productName: 'Standing Flower Congratulations', quantity: 1, price: 1500000 }
    ],
    subtotal: 1500000,
    discount: 150000,
    shippingCost: 50000,
    totalAmount: 1400000,
    paymentStatus: 'unpaid',
    deliveryInfo: {
      recipientName: 'PT Maju Jaya',
      phone: '021-5551234',
      address: 'Gedung Graha Niaga Lt. 25, Jl. Jend. Sudirman Kav. 58',
      city: 'Jakarta Pusat',
      postalCode: '10220',
      deliveryDate: '2026-01-02',
      deliveryTime: '10:00',
      notes: 'Acara pembukaan kantor baru'
    },
    createdAt: new Date('2026-01-02T09:00:00'),
    updatedAt: new Date('2026-01-02T09:00:00')
  },
  {
    id: '3',
    orderNumber: 'LXB-20260102-003',
    customerId: 'c3',
    customerName: 'Walk-in Customer',
    customerPhone: '-',
    orderType: 'walkin',
    status: 'ready',
    priority: 'normal',
    items: [
      { productId: 'p4', productName: 'Red Rose Bouquet (12 stems)', quantity: 1, price: 350000 }
    ],
    subtotal: 350000,
    discount: 0,
    shippingCost: 0,
    totalAmount: 350000,
    paymentStatus: 'paid',
    paymentMethod: 'Cash',
    notes: 'Ambil di toko',
    createdAt: new Date('2026-01-02T10:30:00'),
    updatedAt: new Date('2026-01-02T11:00:00'),
    processedAt: new Date('2026-01-02T10:45:00'),
    completedAt: new Date('2026-01-02T11:00:00')
  },
  {
    id: '4',
    orderNumber: 'LXB-20260101-015',
    customerId: 'c4',
    customerName: 'Andi Pratama',
    customerPhone: '085678901234',
    staffAssignedId: 's1',
    staffAssignedName: 'Rini Handayani',
    orderType: 'online',
    status: 'delivered',
    priority: 'normal',
    items: [
      { productId: 'p5', productName: 'Sweet Serenity Arrangement', quantity: 1, price: 380000 },
      { productId: 'p6', productName: 'Premium Ribbon', quantity: 1, price: 15000 }
    ],
    subtotal: 395000,
    discount: 39500,
    shippingCost: 30000,
    totalAmount: 385500,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    deliveryInfo: {
      recipientName: 'Rina Kusuma',
      phone: '081234509876',
      address: 'Jl. Gatot Subroto No. 89',
      city: 'Jakarta Selatan',
      postalCode: '12930',
      deliveryDate: '2026-01-01',
      trackingNumber: 'JNE123456789',
      courier: 'JNE'
    },
    createdAt: new Date('2026-01-01T14:00:00'),
    updatedAt: new Date('2026-01-01T18:30:00'),
    processedAt: new Date('2026-01-01T15:00:00'),
    completedAt: new Date('2026-01-01T18:30:00')
  },
  {
    id: '5',
    orderNumber: 'LXB-20260102-004',
    customerId: 'c5',
    customerName: 'Lina Marlina',
    customerPhone: '087890123456',
    orderType: 'online',
    status: 'pending',
    priority: 'normal',
    items: [
      { productId: 'p7', productName: 'Sunshine Bouquet', quantity: 2, price: 320000 }
    ],
    subtotal: 640000,
    discount: 0,
    shippingCost: 40000,
    totalAmount: 680000,
    paymentStatus: 'paid',
    paymentMethod: 'GoPay',
    deliveryInfo: {
      recipientName: 'Kantor ABC Corp',
      phone: '021-5559876',
      address: 'Jl. HR Rasuna Said Kav. C-5',
      city: 'Jakarta Selatan',
      postalCode: '12940',
      deliveryDate: '2026-01-03',
      deliveryTime: '09:00-12:00'
    },
    createdAt: new Date('2026-01-02T11:00:00'),
    updatedAt: new Date('2026-01-02T11:00:00')
  }
]

// Helper functions
export function getOrdersByStatus(status: OrderStatus): Order[] {
  return mockOrders.filter(order => order.status === status)
}

export function getOrdersByStaff(staffId: string): Order[] {
  return mockOrders.filter(order => order.staffAssignedId === staffId)
}

export function getTodayOrders(): Order[] {
  const today = new Date().toDateString()
  return mockOrders.filter(order => order.createdAt.toDateString() === today)
}

export function getUrgentOrders(): Order[] {
  return mockOrders.filter(order => 
    order.priority === 'urgent' || order.priority === 'same_day'
  ).filter(order => 
    order.status === 'pending' || order.status === 'processing'
  )
}
