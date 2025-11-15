"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { getTranslatedProductName } from "@/lib/product-translations"

interface Product {
  name: string
  price: string
  image: string
  category: string
}

interface ProductSliderProps {
  products: Product[]
  title: string
}

export function ProductSlider({ products, title }: ProductSliderProps) {
  const { addToCart } = useCart()
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isAutoPlaying && products.length > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, products.length - itemsPerView)
          return prev >= maxIndex ? 0 : prev + 1
        })
      }, 2000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, products.length, itemsPerView])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    setIsAutoPlaying(false)
  }

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
    setIsAutoPlaying(false)
  }

  const handleProductHover = (product: Product) => {
    setIsAutoPlaying(false)
    setHoveredProduct(product)
  }

  const handleProductLeave = () => {
    setHoveredProduct(null)
    setIsAutoPlaying(true)
  }

  const handleClosePopup = () => {
    setSelectedProduct(null)
    setIsAutoPlaying(true)
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <>
      <div className="relative group">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              disabled={currentIndex === 0}
              className="rounded-full bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 animate-slide-in-left"
                style={{
                  width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 24) / itemsPerView}px)`,
                  minWidth: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 24) / itemsPerView}px)`,
                  maxWidth: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 24) / itemsPerView}px)`,
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group/card cursor-pointer h-full flex flex-col animate-wipe-in relative"
                  onMouseEnter={() => handleProductHover(product)}
                  onMouseLeave={handleProductLeave}
                >
                  <div className="relative h-64 overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <h3 className="font-semibold text-lg mb-2 text-balance flex-grow">{getTranslatedProductName(product.name, language)}</h3>
                    <p className="text-primary font-bold text-xl">{product.price}</p>
                    <Button className="w-full mt-3" size="sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </div>

                  {hoveredProduct === product && (
                    <div className="absolute inset-0 bg-card/95 backdrop-blur-sm p-4 flex flex-col justify-center items-center animate-fade-in z-10 border-2 border-primary rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <h3 className="text-xl font-bold text-center mb-3 text-balance">{getTranslatedProductName(product.name, language)}</h3>
                      <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>
                      <p className="text-sm text-center text-muted-foreground mb-4 line-clamp-3">
                        Fresh and authentic {product.category.toLowerCase()} product. Sourced directly from trusted
                        suppliers.
                      </p>
                      <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                        Quick Add
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
