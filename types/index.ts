export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  description: string
  shortDescription: string
  images: string[]
  category: ProductCategory
  occasion: ProductOccasion[]
  colors: ProductColor[]
  sizes: ProductSize[]
  composition: string
  height: string
  diameter: string
  careTips: string[]
  inStock: boolean
  featured: boolean
}

export type ProductCategory = 
  | 'buket'
  | 'bunga-papan' 
  | 'standing-flower'
  | 'tanaman-hias'
  | 'karangan-duka'

export type ProductOccasion = 
  | 'ulang-tahun'
  | 'anniversary'
  | 'pernikahan'
  | 'wisuda'
  | 'dukacita'
  | 'valentine'
  | 'romantis'

export type ProductColor = 
  | 'merah'
  | 'pink'
  | 'putih'
  | 'kuning'
  | 'ungu'
  | 'campuran'

export interface ProductSize {
  name: string
  price: number
  description: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  publishedAt: string
  category: string
  readTime: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  content: string
  rating: number
  avatar?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: 'pertanyaan' | 'pesanan-kustom' | 'keluhan' | 'lainnya'
  message: string
}
