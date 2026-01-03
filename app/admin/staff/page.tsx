"use client"

import { useState } from "react"
import { Search, Plus, UserCircle, Mail, Phone, Calendar } from "lucide-react"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { mockStaff } from "@/lib/data/mock-staff"
import { formatPrice } from "@/lib/utils"

export default function AdminStaffPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStaff = mockStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin_master': return 'Admin'
      case 'staff_toko': return 'Staff Toko'
      case 'florist': return 'Florist'
      case 'kurir': return 'Kurir'
      default: return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin_master': return 'bg-purple-100 text-purple-700'
      case 'staff_toko': return 'bg-blue-100 text-blue-700'
      case 'florist': return 'bg-pink-100 text-pink-700'
      case 'kurir': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Staff</h1>
          <p className="text-gray-500">Kelola karyawan dan jadwal kerja</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#2ecc71] text-white rounded-lg hover:bg-[#27ae60] transition-colors font-medium">
          <Plus className="h-5 w-5" />
          Tambah Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{mockStaff.length}</div>
          <div className="text-sm text-gray-500">Total Staff</div>
        </div>
        <div className="bg-white rounded-xl border border-green-200 p-4 bg-green-50">
          <div className="text-2xl font-bold text-green-600">
            {mockStaff.filter(s => s.status === 'available').length}
          </div>
          <div className="text-sm text-green-600">Tersedia</div>
        </div>
        <div className="bg-white rounded-xl border border-yellow-200 p-4 bg-yellow-50">
          <div className="text-2xl font-bold text-yellow-600">
            {mockStaff.filter(s => s.status === 'busy').length}
          </div>
          <div className="text-sm text-yellow-600">Sibuk</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-600">
            {mockStaff.filter(s => s.status === 'off_duty' || s.status === 'leave').length}
          </div>
          <div className="text-sm text-gray-500">Off Duty / Cuti</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama atau email staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map(staff => (
          <div key={staff.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#2c3e50] to-[#34495e] flex items-center justify-center text-white font-bold text-xl">
                  {staff.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(staff.role)}`}>
                    {getRoleLabel(staff.role)}
                  </span>
                </div>
              </div>
              <StatusBadge status={staff.status} type="staff" size="sm" />
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{staff.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{staff.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Bergabung {staff.joinDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg mb-4">
              <div className="text-center">
                <div className="font-bold text-gray-900">{staff.ordersToday}</div>
                <div className="text-xs text-gray-500">Hari ini</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="font-bold text-gray-900">{staff.ordersCompleted}</div>
                <div className="text-xs text-gray-500">Selesai</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{staff.avgProcessingTime}m</div>
                <div className="text-xs text-gray-500">Rata-rata</div>
              </div>
            </div>

            {/* Salary */}
            {staff.salary && (
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
                <span className="text-gray-500">Gaji Pokok</span>
                <span className="font-semibold text-gray-900">{formatPrice(staff.salary)}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                Jadwal
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="p-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
          Tidak ada staff yang ditemukan
        </div>
      )}
    </div>
  )
}
