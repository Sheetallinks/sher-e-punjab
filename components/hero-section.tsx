"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSlide {
  title: string
  subtitle: string
  image: string
  children?: ReactNode
}

interface HeroSectionProps {
  title?: string
  subtitle?: string
  image?: string
  children?: ReactNode
  slides?: HeroSlide[]
}

export function HeroSection({ title, subtitle, image, children, slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // If slides are provided, use them; otherwise use single slide props
  const heroSlides: HeroSlide[] = slides || (title && subtitle && image ? [{ title, subtitle, image, children }] : [])

  useEffect(() => {
    if (isAutoPlaying && heroSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, heroSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume autoplay after 10 seconds
  }

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }

  if (heroSlides.length === 0) return null

  return (
    <div className="relative h-[500px] overflow-hidden group">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="w-full h-full object-cover animate-scale-in group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      ))}

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in text-balance drop-shadow-lg tracking-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in animate-delay-100 text-pretty drop-shadow-md leading-relaxed font-light">
            {heroSlides[currentSlide].subtitle}
          </p>
          {heroSlides[currentSlide].children && (
            <div className="animate-slide-up animate-delay-200">{heroSlides[currentSlide].children}</div>
          )}
        </div>
      </div>

      {/* Navigation Arrows - Only show if more than 1 slide */}
      {heroSlides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
