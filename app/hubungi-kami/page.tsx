"use client"

import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { 
  Flower, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Instagram,
  Facebook,
  MessageCircle,
  CheckCircle
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  subject: z.enum(["pertanyaan", "pesanan-kustom", "keluhan", "lainnya"]),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Jl. Bunga Indah No. 123, Jakarta Selatan 12345",
    link: "https://maps.google.com",
  },
  {
    icon: Phone,
    title: "Telepon / WhatsApp",
    content: "0812-3456-7890",
    link: "https://wa.me/6281234567890",
  },
  {
    icon: Mail,
    title: "Email",
    content: "halo@prettyblossom.com",
    link: "mailto:halo@prettyblossom.com",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    content: "Senin - Minggu, 08:00 - 20:00 WIB",
    link: null,
  },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/prettyblossom", color: "hover:bg-pink-500" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/prettyblossom", color: "hover:bg-blue-600" },
  { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/6281234567890", color: "hover:bg-green-500" },
]

export default function HubungiKamiPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "pertanyaan",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log(data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-rose-50 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 w-60 h-60 bg-rose-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-pink-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-rose-500 font-medium mb-4">
              <Flower className="h-5 w-5" />
              Hubungi Kami
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-800 mb-6">
              Kami Siap Membantu Anda
            </h1>
            <p className="text-warm-600 text-lg">
              Punya pertanyaan atau ingin memesan? Hubungi tim kami yang ramah
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-warm-800 mb-6">
                    Kirim Pesan
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-warm-800 mb-2">
                        Pesan Terkirim!
                      </h3>
                      <p className="text-warm-600 mb-6">
                        Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>
                        Kirim Pesan Lain
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          placeholder="Masukkan nama Anda"
                          {...register("name")}
                          className="mt-2"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          {...register("email")}
                          className="mt-2"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="subject">Subjek</Label>
                        <Select
                          onValueChange={(value) =>
                            setValue("subject", value as ContactFormData["subject"])
                          }
                          defaultValue="pertanyaan"
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih subjek" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pertanyaan">Pertanyaan Umum</SelectItem>
                            <SelectItem value="pesanan-kustom">Pesanan Kustom</SelectItem>
                            <SelectItem value="keluhan">Keluhan</SelectItem>
                            <SelectItem value="lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Pesan</Label>
                        <Textarea
                          id="message"
                          placeholder="Tulis pesan Anda di sini..."
                          {...register("message")}
                          className="mt-2 min-h-[150px]"
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                          <info.icon className="h-6 w-6 text-rose-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-warm-800 mb-1">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-warm-600 hover:text-rose-500 transition-colors text-sm"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-warm-600 text-sm">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-warm-800 mb-4">
                    Ikuti Kami
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl bg-warm-100 flex items-center justify-center text-warm-600 hover:text-white transition-all ${social.color}`}
                        aria-label={social.name}
                      >
                        <social.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-warm-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.29235040854!2d106.7271528!3d-6.229728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1704000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
                <CardContent className="p-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-500 hover:text-rose-600 font-medium text-sm flex items-center gap-1"
                  >
                    Buka di Google Maps →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
