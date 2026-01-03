"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Flower, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'admin' | 'staff'>('admin')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate login (demo)
    setTimeout(() => {
      if (role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/staff')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2c3e50] to-[#34495e] mb-4">
              <Flower className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Luxe Bloom</h1>
            <p className="text-gray-500">Dashboard Login</p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                role === 'admin'
                  ? 'bg-[#2c3e50] text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin Master
            </button>
            <button
              onClick={() => setRole('staff')}
              className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                role === 'staff'
                  ? 'bg-[#27ae60] text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Staff Toko
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@luxebloom.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-70 ${
                role === 'admin'
                  ? 'bg-[#2c3e50] hover:bg-[#1a252f]'
                  : 'bg-[#27ae60] hover:bg-[#219a52]'
              }`}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Admin:</strong> admin@luxebloom.com / admin123</p>
              <p><strong>Staff:</strong> staff@luxebloom.com / staff123</p>
            </div>
          </div>

          {/* Back to website */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Kembali ke Website
            </Link>
          </div>
        </div>
      </div>

      {/* Right - Decoration */}
      <div className={`hidden lg:flex flex-1 items-center justify-center p-12 ${
        role === 'admin' 
          ? 'bg-gradient-to-br from-[#2c3e50] to-[#1a252f]' 
          : 'bg-gradient-to-br from-[#27ae60] to-[#1e8449]'
      }`}>
        <div className="text-center text-white max-w-md">
          <Flower className="h-24 w-24 mx-auto mb-8 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            {role === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {role === 'admin' 
              ? 'Kelola bisnis Anda dengan kontrol penuh. Akses laporan, analitik, dan pengaturan sistem.'
              : 'Fokus pada operasional harian. Proses pesanan, update stok, dan layani pelanggan.'}
          </p>
          
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {role === 'admin' ? (
              <>
                <div>
                  <div className="text-3xl font-bold">128</div>
                  <div className="text-sm text-white/60">Pesanan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">45.5M</div>
                  <div className="text-sm text-white/60">Revenue</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-white/60">Satisfaction</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm text-white/60">Tugas Hari Ini</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm text-white/60">Selesai</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">45m</div>
                  <div className="text-sm text-white/60">Rata-rata</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
