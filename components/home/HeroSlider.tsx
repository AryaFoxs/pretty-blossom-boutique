"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Slide {
  image: string
  tagline: string
  subtitle: string
}

const slides: Slide[] = [
  {
    image: "/Hero Section 2.jpg",
    tagline: "Keindahan yang Tepat Waktu, untuk Momen Spesialmu",
    subtitle: "Buket bunga segar mewah dengan kualitas premium",
  },
  {
    image: "/Hero Section 2.jpg",
    tagline: "Wujudkan Acara Impian dengan Sentuhan Alam",
    subtitle: "Dekorasi pernikahan yang memukau dan berkesan",
  },
  {
    image: "/Hero Section 2.jpg",
    tagline: "Hadirkan Senyuman, Kirimkan Rasa Sayang",
    subtitle: "Proses pengemasan hadiah dengan penuh cinta",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  const nextSlide = React.useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Auto-advance slides
  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-in-out",
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          )}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt="Luxe Bloom Boutique Hero"
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
          
          {/* Gradient Overlay - darker for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-warm-900/85 via-warm-900/60 to-warm-900/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <div className="max-w-2xl">
          <div
            key={currentSlide}
            className="animate-fade-in"
          >
            <span className="inline-block px-4 py-2 bg-gold-500 rounded-full text-white text-sm font-medium mb-6 shadow-lg">
              ✨ Luxe Bloom Boutique
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
              {slides[currentSlide].tagline}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-lg font-medium" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)' }}>
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-base shadow-lg">
                Pesan Sekarang
              </Button>
              <Button size="lg" variant="outline" className="text-base border-white text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:text-white shadow-lg">
                <Link href="/katalog">Lihat Katalog</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-base text-white hover:bg-white/20" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                <Link href="/hubungi-kami">Konsultasi Gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold-500/50 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold-500/50 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-gold-400 w-8"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L48 108C96 96 192 72 288 60C384 48 480 48 576 54C672 60 768 72 864 78C960 84 1056 84 1152 78C1248 72 1344 60 1392 54L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  )
}
