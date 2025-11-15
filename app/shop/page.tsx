"use client"

import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useMemo, useEffect } from "react"
import { Search, Filter, X, SlidersHorizontal, ChevronRight } from "lucide-react"
import {
  bakeryProducts,
  spicesProducts,
  vegetablesProducts,
  fruitsProducts,
  dairyProducts,
  drinksProducts,
  frozenProducts,
  riceProducts,
  floursProducts,
  dalsProducts,
  oilsProducts,
  dealsProducts,
} from "@/lib/products-data"

// Combine all products
const allProducts = [
  ...bakeryProducts,
  ...spicesProducts,
  ...vegetablesProducts,
  ...fruitsProducts,
  ...dairyProducts,
  ...drinksProducts,
  ...frozenProducts,
  ...riceProducts,
  ...floursProducts,
  ...dalsProducts,
  ...oilsProducts,
  ...dealsProducts,
]

// Get unique categories
const categories = Array.from(new Set(allProducts.map((p) => p.category).filter(Boolean))) as string[]

// Helper function to extract price as number
const extractPrice = (priceStr: string): number => {
  const match = priceStr.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

// Calculate max price from all products
const calculateMaxPrice = () => {
  const prices = allProducts.map((p) => extractPrice(p.price))
  return Math.ceil(Math.max(...prices, 0))
}

const MAX_PRICE = calculateMaxPrice()

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE])
  const [sortBy, setSortBy] = useState<string>("name")
  const [showFilters, setShowFilters] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category || "")
      )
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = extractPrice(product.price)
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return extractPrice(a.price) - extractPrice(b.price)
        case "price-high":
          return extractPrice(b.price) - extractPrice(a.price)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategories, priceRange, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceRange([0, MAX_PRICE])
    setSortBy("name")
  }

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < MAX_PRICE ? 1 : 0)

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-orbs" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <HeroSection
        title="Shop All Products"
        subtitle="Browse our complete selection of authentic Indian groceries"
        image="/vibrant-indian-grocery-store-with-colorful-spices-.jpg"
      />

      {/* Main Content Area */}
      <section className="py-8 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile Overlay */}
            {showFilters && !isDesktop && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
            )}

            {/* Filters Sidebar - Left Side */}
            <aside
              className={`${
                showFilters || isDesktop ? "block" : "hidden"
              } lg:block w-full lg:w-80 flex-shrink-0 z-50 lg:z-auto relative`}
            >
              <div className="sticky top-20 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl p-5 shadow-lg lg:shadow-xl h-[calc(100vh-6rem)] flex flex-col">
                {/* Filters Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary/20 flex-shrink-0">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Filter className="w-4 h-4 text-primary" />
                    Filters
                  </h3>
                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7 px-2">
                        <X className="w-3 h-3 mr-1" />
                        Clear
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden h-7 w-7 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Content - No Scroll */}
                <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden">
                  {/* Search Bar in Sidebar */}
                  <div className="flex-shrink-0">
                    <label className="text-xs font-semibold mb-1.5 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-3 h-9 text-sm"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex-1 min-h-0 flex flex-col">
                    <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
                      Categories
                      {selectedCategories.length > 0 && (
                        <span className="text-[10px] bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                          {selectedCategories.length}
                        </span>
                      )}
                    </h4>
                    <div className="flex-1 grid grid-cols-1 gap-1.5 overflow-hidden">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-primary/5 transition-colors"
                        >
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                            className="w-4 h-4"
                          />
                          <label
                            htmlFor={category}
                            className="text-xs cursor-pointer flex-1 flex items-center justify-between hover:text-primary transition-colors"
                          >
                            <span className="truncate">{category}</span>
                            <span className="text-[10px] text-muted-foreground ml-1.5 flex-shrink-0">
                              ({allProducts.filter((p) => p.category === category).length})
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="flex-shrink-0">
                    <h4 className="text-xs font-semibold mb-2">
                      Price Range
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-muted-foreground mb-1 block">Min (€)</label>
                          <Input
                            type="number"
                            min="0"
                            max={MAX_PRICE}
                            value={priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([parseFloat(e.target.value) || 0, priceRange[1]])
                            }
                            className="w-full h-8 text-xs"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[10px] text-muted-foreground mb-1 block">Max (€)</label>
                          <Input
                            type="number"
                            min="0"
                            max={MAX_PRICE}
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([priceRange[0], parseFloat(e.target.value) || MAX_PRICE])
                            }
                            className="w-full h-8 text-xs"
                          />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center font-medium">
                        €{priceRange[0]} - €{priceRange[1]}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPriceRange([0, 10])}
                          className="h-8 text-xs px-2"
                        >
                          &lt;€10
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPriceRange([10, 25])}
                          className="h-8 text-xs px-2"
                        >
                          €10-25
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPriceRange([25, 50])}
                          className="h-8 text-xs px-2"
                        >
                          €25-50
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPriceRange([50, MAX_PRICE])}
                          className="h-8 text-xs px-2"
                        >
                          €50+
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Active Filters Summary */}
                  {activeFiltersCount > 0 && (
                    <div className="flex-shrink-0 pt-2 border-t border-primary/20">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{activeFiltersCount}</span> active
                        {activeFiltersCount === 1 ? " filter" : " filters"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Products Section - Right Side */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                        {activeFiltersCount}
                      </span>
                    )}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${showFilters ? "rotate-90" : ""}`}
                  />
                </Button>
              </div>

              {/* Search and Sort Bar */}
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {filteredProducts.length}{" "}
                      {filteredProducts.length === 1 ? "Product" : "Products"}
                    </h2>
                    {activeFiltersCount > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Filtered from {allProducts.length} total products
                      </p>
                    )}
                  </div>
                  <div className="w-full sm:w-auto">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-16 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search query to find what you're looking for.
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
