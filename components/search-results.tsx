"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { allProducts } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { getTranslatedProductName } from "@/lib/product-translations"

interface SearchResultsProps {
  query: string
  onClose: () => void
}

export function SearchResults({ query, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<any[]>([])
  const { language } = useLanguage()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const allProductsList = Object.values(allProducts).flat()
    const filtered = allProductsList.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) || product.category.toLowerCase().includes(searchQuery),
    )
    setResults(filtered)
  }, [query])

  if (!query.trim()) return null

  return (
    <div className="fixed top-[100px] left-0 right-0 bottom-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-card border-2 border-primary rounded-2xl shadow-2xl max-h-[calc(100vh-140px)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-primary/20 p-4 flex items-center justify-between z-10">
          <h3 className="text-lg font-semibold font-serif text-foreground">Search Results ({results.length})</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-lg hover:bg-primary/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {results.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground text-lg">No products found for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
            {results.map((product, index) => (
              <Link key={index} href={`/product/${encodeURIComponent(product.name)}`} onClick={onClose}>
                <div className="group flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-primary/20 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted ring-2 ring-primary/30 group-hover:ring-primary/80 transition-all">
                    <img
                      src={product.image || "/placeholder.svg?height=96&width=96"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center w-full">
                    <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {getTranslatedProductName(product.name, language)}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                    <p className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
