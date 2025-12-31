import { Metadata } from "next"
import Link from "next/link"
import { Flower, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { faqs } from "@/lib/data/site"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan yang sering ditanyakan tentang layanan Pretty Blossom Boutique.",
}

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-rose-50 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-rose-300 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-pink-300 rounded-full blur-3xl" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-rose-500 font-medium mb-4">
              <HelpCircle className="h-5 w-5" />
              FAQ
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-800 mb-6">
              Pertanyaan yang Sering Ditanyakan
            </h1>
            <p className="text-warm-600 text-lg">
              Temukan jawaban untuk pertanyaan umum tentang layanan kami
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-2xl border border-warm-100 px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-warm-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section bg-rose-50">
        <div className="container max-w-3xl">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-6">
                <Flower className="h-8 w-8 text-rose-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-warm-800 mb-4">
                Masih Punya Pertanyaan?
              </h2>
              <p className="text-warm-600 mb-6">
                Tim customer service kami siap membantu Anda dengan senang hati
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/hubungi-kami">Hubungi Kami</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    Chat WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
