"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tag, Package, Clock, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface DealCardProps {
  name: string
  price: string
  image: string
  originalPrice?: string
  discount?: string
  description?: string
}

export function DealCard({ name, price, image, originalPrice, discount, description }: DealCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ name, price, image, category: "Deals" })
  }

  return (
    <div
      className="relative h-96 cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-card border-2 border-primary rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-64 overflow-hidden bg-muted">
            {discount && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold text-sm z-10 animate-pulse">
                {discount} OFF
              </div>
            )}
            <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2 text-balance">{name}</h3>
            <div className="flex items-center gap-3">
              <p className="text-primary font-bold text-2xl">{price}</p>
              {originalPrice && <p className="text-muted-foreground line-through text-lg">{originalPrice}</p>}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Hover to see details</p>
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black text-white rounded-lg overflow-hidden shadow-lg p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5" />
              <h3 className="font-bold text-xl">{name}</h3>
            </div>

            <p className="mb-4 text-white/90">
              {description ||
                `Amazing deal on ${name}! Get the best quality products at unbeatable prices. Limited time offer!`}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4" />
                <span>Bundle includes multiple items</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>Weekend special offer</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4" />
                <span>Premium quality guaranteed</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold">{price}</span>
              {originalPrice && <span className="line-through text-lg opacity-75">{originalPrice}</span>}
            </div>
            <Button className="w-full bg-white text-black hover:bg-white/90" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
