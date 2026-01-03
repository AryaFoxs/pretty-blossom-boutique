import { Customer } from '@/types/dashboard'

export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Sari Wijaya',
    email: 'sari.wijaya@email.com',
    phone: '081234567890',
    address: 'Jl. Kemang Raya No. 12, Jakarta Selatan',
    totalOrders: 8,
    totalSpent: 4250000,
    lastOrderDate: new Date('2026-01-02'),
    createdAt: new Date('2024-06-15'),
    isVip: true,
    notes: 'Pelanggan setia, suka buket mawar pink'
  },
  {
    id: 'c2',
    name: 'Budi Santoso',
    email: 'budi.santoso@company.com',
    phone: '082345678901',
    address: 'Jl. Gatot Subroto No. 88, Jakarta Pusat',
    totalOrders: 12,
    totalSpent: 18500000,
    lastOrderDate: new Date('2026-01-02'),
    createdAt: new Date('2023-03-20'),
    isVip: true,
    notes: 'Perusahaan - biasa order standing flower untuk event corporate'
  },
  {
    id: 'c3',
    name: 'Walk-in Customer',
    phone: '-',
    totalOrders: 1,
    totalSpent: 350000,
    lastOrderDate: new Date('2026-01-02'),
    createdAt: new Date('2026-01-02'),
    isVip: false
  },
  {
    id: 'c4',
    name: 'Andi Pratama',
    email: 'andi.p@gmail.com',
    phone: '085678901234',
    address: 'Jl. Panglima Polim No. 45, Jakarta Selatan',
    totalOrders: 3,
    totalSpent: 1150000,
    lastOrderDate: new Date('2026-01-01'),
    createdAt: new Date('2025-08-10'),
    isVip: false
  },
  {
    id: 'c5',
    name: 'Lina Marlina',
    email: 'lina.m@yahoo.com',
    phone: '087890123456',
    address: 'Apartemen Taman Anggrek Tower 3, Jakarta Barat',
    totalOrders: 5,
    totalSpent: 2800000,
    lastOrderDate: new Date('2026-01-02'),
    createdAt: new Date('2024-12-01'),
    isVip: false
  },
  {
    id: 'c6',
    name: 'PT Indah Makmur',
    email: 'procurement@indahmakmur.co.id',
    phone: '021-5556789',
    address: 'Gedung Wisma 46, Jl. Jend. Sudirman Kav. 1, Jakarta Pusat',
    totalOrders: 25,
    totalSpent: 45000000,
    lastOrderDate: new Date('2025-12-28'),
    createdAt: new Date('2022-01-15'),
    isVip: true,
    notes: 'Corporate client - langganan bulanan untuk lobby dan meeting room'
  },
  {
    id: 'c7',
    name: 'Ratna Sari',
    email: 'ratna.sari@outlook.com',
    phone: '081112223334',
    address: 'Jl. Tebet Barat Dalam No. 8, Jakarta Selatan',
    totalOrders: 2,
    totalSpent: 750000,
    lastOrderDate: new Date('2025-11-15'),
    createdAt: new Date('2025-10-20'),
    isVip: false
  }
]

export function getVipCustomers(): Customer[] {
  return mockCustomers.filter(c => c.isVip)
}

export function searchCustomers(query: string): Customer[] {
  const lowerQuery = query.toLowerCase()
  return mockCustomers.filter(c => 
    c.name.toLowerCase().includes(lowerQuery) ||
    c.phone.includes(query) ||
    c.email?.toLowerCase().includes(lowerQuery)
  )
}

export function getTopCustomers(limit: number = 5): Customer[] {
  return [...mockCustomers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, limit)
}
