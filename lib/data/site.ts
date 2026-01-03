import { Testimonial, TeamMember, FAQ, Service } from '@/types'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sari',
    location: 'Jakarta',
    content: 'Buketnya sangat cantik, persis seperti yang diharapkan! Pengirimannya cepat dan bunga tetap segar. Terima kasih Luxe Bloom Boutique!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Andi & Rina',
    location: 'Bandung',
    content: 'Dekorasi pernikahan kami sempurna! Timnya sangat profesional dan kreatif. Hasil akhirnya melebihi ekspektasi kami.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Dewi',
    location: 'Surabaya',
    content: 'Sudah 3 kali pesan untuk berbagai acara, selalu puas dengan kualitas dan pelayanannya. Recommended banget!',
    rating: 5,
  },
]

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Maya Putri',
    role: 'Founder & Creative Director',
    image: '/images/team/founder.jpg',
    bio: 'Memulai Luxe Bloom dari kecintaan pada seni merangkai bunga sejak 2018.',
  },
  {
    id: '2',
    name: 'Rini Handayani',
    role: 'Head Florist',
    image: '/images/team/head-florist.jpg',
    bio: 'Florist berpengalaman 10+ tahun dengan spesialisasi dekorasi pernikahan.',
  },
  {
    id: '3',
    name: 'Andi Pratama',
    role: 'Customer Experience Manager',
    image: '/images/team/customer-service.jpg',
    bio: 'Memastikan setiap pelanggan mendapatkan pengalaman terbaik.',
  },
]

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Apakah bisa pesan untuk dikirim ke kota lain?',
    answer: 'Bisa! Kami bekerja sama dengan kurir ekspedisi terpercaya untuk pengiriman ke seluruh Indonesia. Silakan hubungi CS kami untuk informasi biaya dan estimasi pengiriman.',
  },
  {
    id: '2',
    question: 'Bagaimana jika bunga yang diterima rusak atau tidak sesuai?',
    answer: 'Kepuasan Anda adalah prioritas kami. Segera hubungi kami dengan foto bukti dalam waktu 2 jam setelah penerimaan untuk mendapatkan solusi terbaik, baik penggantian maupun refund.',
  },
  {
    id: '3',
    question: 'Berapa lama waktu pemesanan minimal?',
    answer: 'Untuk pengiriman same-day, pemesanan harus dilakukan sebelum jam 2 siang. Untuk buket standar, kami butuh minimal 3 jam. Untuk dekorasi acara atau pesanan besar, minimal 3-7 hari sebelumnya.',
  },
  {
    id: '4',
    question: 'Apakah bisa request desain khusus?',
    answer: 'Tentu! Kami menyediakan layanan kustom desain. Konsultasikan ide Anda dengan florist kami dan kami akan membuatkan rangkaian yang unik sesuai keinginan Anda.',
  },
  {
    id: '5',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, DANA), dan kartu kredit. Untuk pesanan besar, bisa menggunakan sistem DP.',
  },
  {
    id: '6',
    question: 'Apakah bunga dijamin segar?',
    answer: 'Ya! Kami hanya menggunakan bunga segar yang dipilih langsung dari petani lokal dan impor. Setiap rangkaian dibuat fresh pada hari pengiriman.',
  },
]

export const services: Service[] = [
  {
    id: '1',
    title: 'Pengiriman Ekspres',
    description: 'Kami mengirimkan keindahan tepat waktu! Layanan pengiriman same-day untuk area Jabodetabek dengan pemesanan sebelum jam 2 siang.',
    icon: 'truck',
    features: [
      'Same-day delivery',
      'Tracking real-time',
      'Pengemasan aman',
      'Gratis ongkir area tertentu',
    ],
  },
  {
    id: '2',
    title: 'Dekorasi Acara',
    description: 'Kami siap mewujudkan visi dekorasi acara Anda (pernikahan, korporat, ulang tahun) dengan konsep yang personal dan eksekusi yang detail.',
    icon: 'sparkles',
    features: [
      'Konsultasi gratis',
      'Desain custom',
      'Setup & breakdown',
      'Tim profesional',
    ],
  },
  {
    id: '3',
    title: 'Langganan Bulanan',
    description: 'Berikan kebahagiaan yang terus berulang! Berlangganan buket bunga bulanan untuk kantor, rumah, atau orang tersayang.',
    icon: 'calendar',
    features: [
      'Buket fresh setiap minggu/bulan',
      'Diskon hingga 20%',
      'Tema seasonal',
      'Fleksibel pause/cancel',
    ],
  },
  {
    id: '4',
    title: 'Kustom Desain',
    description: 'Punya ide spesifik? Konsultasikan dengan florist kami untuk menciptakan rangkaian yang benar-benar unik dan personal.',
    icon: 'palette',
    features: [
      'Konsultasi 1-on-1',
      'Unlimited revisi desain',
      'Material premium',
      'Packaging eksklusif',
    ],
  },
]
