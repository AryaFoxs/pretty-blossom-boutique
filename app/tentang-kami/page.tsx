import { Metadata } from "next"
import { Flower, Target, Eye, Heart, Users } from "lucide-react"
import { teamMembers } from "@/lib/data/site"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali Pretty Blossom Boutique, toko bunga premium yang telah dipercaya ribuan pelanggan sejak 2018.",
}

const values = [
  {
    icon: Heart,
    title: "Dibuat dengan Cinta",
    description: "Setiap rangkaian adalah karya hati, dibuat dengan penuh perhatian dan dedikasi.",
  },
  {
    icon: Flower,
    title: "Kualitas Premium",
    description: "Hanya bunga segar pilihan terbaik dari petani lokal dan impor.",
  },
  {
    icon: Users,
    title: "Pelayanan Personal",
    description: "Tim profesional yang siap membantu mewujudkan visi Anda.",
  },
]

export default function TentangKamiPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-rose-50 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-rose-300 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-pink-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-rose-500 font-medium mb-4">
              <Flower className="h-5 w-5" />
              Tentang Kami
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-800 mb-6">
              Keindahan yang Berbicara dari Hati
            </h1>
            <p className="text-warm-600 text-lg">
              Sejak 2018, kami telah menjadi bagian dari ribuan momen berharga pelanggan kami
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flower className="h-32 w-32 text-rose-300" />
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-rose-200 rounded-3xl -z-10" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-warm-800 mb-6">
                Cerita Kami
              </h2>
              <div className="space-y-4 text-warm-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-rose-600">Pretty Blossom Boutique</span> dimulai 
                  dari kecintaan sederhana pada keindahan alam dan seni merangkai. Sejak tahun 2018, 
                  kami telah dipercaya oleh ribuan pelanggan untuk menjadi bagian dari momen-momen 
                  berharga mereka.
                </p>
                <p>
                  Setiap rangkaian adalah karya hati, dibuat oleh florist berpengalaman dengan material 
                  terbaik. Kami percaya bahwa bunga bukan sekadar hadiah — bunga adalah bahasa universal 
                  yang menyampaikan emosi yang kadang sulit diungkapkan dengan kata-kata.
                </p>
                <p>
                  Dari perayaan cinta hingga momen duka, dari kejutan kecil hingga acara besar, kami 
                  hadir untuk membantu Anda menyampaikan pesan dengan cara yang indah dan berkesan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="section bg-rose-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-rose-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-warm-800 mb-4">
                  Visi Kami
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  Menjadi mitra terpercaya dalam menyampaikan pesan dan emosi melalui keindahan bunga, 
                  dengan kualitas dan layanan terbaik di Indonesia.
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-pink-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-warm-800 mb-4">
                  Misi Kami
                </h3>
                <ul className="space-y-3 text-warm-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">1</span>
                    <span>Menyediakan bunga segar pilihan dari petani lokal & impor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">2</span>
                    <span>Menghadirkan desain yang kreatif dan penuh makna</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">3</span>
                    <span>Memberikan pengalaman berbelanja yang mudah dan memuaskan</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Prinsip yang menjadi fondasi setiap karya kami
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-10 w-10 text-rose-500" />
                </div>
                <h3 className="font-display text-xl font-semibold text-warm-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-gradient-to-b from-background to-rose-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-800 mb-4">
              Tim Kami
            </h2>
            <p className="text-warm-500 max-w-2xl mx-auto">
              Orang-orang berbakat di balik setiap rangkaian cantik
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden group">
                <div className="aspect-square bg-gradient-to-br from-rose-100 to-pink-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-rose-200 flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-rose-500">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-semibold text-warm-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-rose-500 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-warm-500 text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
