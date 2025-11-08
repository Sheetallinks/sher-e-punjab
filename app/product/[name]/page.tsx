"use client"

import type React from "react"

import { useState } from "react"
import { allProducts } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

export default function ProductPage({ params }: { params: { name: string } }) {
  const productName = decodeURIComponent(params.name)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Find product from all products
  const product = Object.values(allProducts)
    .flat()
    .find((p) => p.name === productName)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    })
    setQuantity(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="outline"
            className="mb-8 border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image with Zoom */}
          <div className="flex flex-col gap-6">
            <div
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted border-2 border-primary/20 cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.image || "/placeholder.svg?height=500&width=500"}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-500" />
              {isZoomed && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Zoomed
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">Hover over the image to zoom in</p>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8">
            {/* Category Badge */}
            <div className="inline-flex w-fit">
              <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/40">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(128 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t-2 border-b-2 border-primary/20 py-6">
              <p className="text-5xl font-bold text-primary mb-2">{product.price}</p>
              <p className="text-muted-foreground">Free shipping on orders over €50</p>
            </div>

            {/* Description */}
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">About this product</h3>
              <p className="text-muted-foreground">
                Premium quality {product.name} sourced directly from trusted suppliers. Perfect for authentic Indian
                cooking and traditional recipes. Carefully selected and packaged to maintain freshness and quality.
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-foreground">Quantity:</span>
              <div className="flex items-center border-2 border-primary/30 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-primary/10 transition-colors font-bold text-primary"
                >
                  −
                </button>
                <span className="px-6 py-2 font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-primary/10 transition-colors font-bold text-primary"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              Add to Cart
            </Button>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/20">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Delivery</p>
                <p className="font-semibold text-foreground">2-3 Days</p>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Returns</p>
                <p className="font-semibold text-foreground">30 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
