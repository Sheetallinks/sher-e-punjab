"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { getTranslatedProductName } from "@/lib/product-translations"
import { ShoppingCart } from "lucide-react"

interface Product {
  name: string
  price: string
  image: string
  badge?: string
  category?: string
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart()
  const { language, t } = useLanguage()

  const handleAddToCart = (product: Product) => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category || "Products",
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.name}
          className="group relative bg-card border-2 border-border rounded-xl overflow-hidden hover:shadow-2xl hover:border-primary/60 transition-all duration-300 cursor-pointer animate-fade-in hover:scale-105 flex flex-col hover:-translate-y-2"
          style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
        >
          <div className="relative overflow-hidden aspect-square bg-muted">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 animate-wipe-in"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                if (!target.src.includes("placeholder.jpg")) {
                  target.src = "/placeholder.jpg"
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/15 group-hover:via-accent/10 group-hover:to-accent/15 transition-all duration-500" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

            {product.badge && (
              <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-md text-xs font-semibold shadow-md">
                {product.badge}
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-grow">
              {getTranslatedProductName(product.name, language)}
            </h3>
            <p className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
              {product.price}
            </p>
            <Button
              className="w-full hover:shadow-lg hover:scale-105 transition-all duration-300 gap-2 group/btn"
              size="sm"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              {t("addToCart")}
            </Button>
          </div>

          <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  )
}
