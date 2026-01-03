import { Staff, StaffStatus } from '@/types/dashboard'

export const mockStaff: Staff[] = [
  {
    id: 's1',
    userId: 'u1',
    name: 'Rini Handayani',
    email: 'rini@luxebloom.com',
    phone: '081234567001',
    role: 'staff_toko',
    status: 'busy',
    ordersToday: 3,
    ordersCompleted: 2,
    avgProcessingTime: 45,
    joinDate: new Date('2022-03-15'),
    salary: 4500000,
    commission: 2
  },
  {
    id: 's2',
    userId: 'u2',
    name: 'Maya Putri',
    email: 'maya@luxebloom.com',
    phone: '081234567002',
    role: 'florist',
    status: 'available',
    ordersToday: 2,
    ordersCompleted: 2,
    avgProcessingTime: 35,
    joinDate: new Date('2021-06-01'),
    salary: 5000000,
    commission: 3
  },
  {
    id: 's3',
    userId: 'u3',
    name: 'Andi Saputra',
    email: 'andi@luxebloom.com',
    phone: '081234567003',
    role: 'kurir',
    status: 'busy',
    ordersToday: 5,
    ordersCompleted: 3,
    avgProcessingTime: 0,
    joinDate: new Date('2023-01-10'),
    salary: 3500000,
    commission: 1.5
  },
  {
    id: 's4',
    userId: 'u4',
    name: 'Dewi Lestari',
    email: 'dewi@luxebloom.com',
    phone: '081234567004',
    role: 'staff_toko',
    status: 'available',
    ordersToday: 1,
    ordersCompleted: 1,
    avgProcessingTime: 40,
    joinDate: new Date('2024-02-20'),
    salary: 4000000,
    commission: 2
  },
  {
    id: 's5',
    userId: 'u5',
    name: 'Bambang Wijaya',
    email: 'bambang@luxebloom.com',
    phone: '081234567005',
    role: 'kurir',
    status: 'off_duty',
    ordersToday: 0,
    ordersCompleted: 0,
    avgProcessingTime: 0,
    joinDate: new Date('2023-08-05'),
    salary: 3500000,
    commission: 1.5
  }
]

export function getAvailableStaff(): Staff[] {
  return mockStaff.filter(s => s.status === 'available')
}

export function getStaffByRole(role: string): Staff[] {
  return mockStaff.filter(s => s.role === role)
}

export function getActiveStaffCount(): number {
  return mockStaff.filter(s => s.status !== 'off_duty' && s.status !== 'leave').length
}
