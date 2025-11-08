"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  Cake,
  Soup,
  Carrot,
  Apple,
  Milk,
  Coffee,
  Snowflake,
  ChevronDown,
  Menu,
  X,
  Home,
  Tag,
  Phone,
} from "lucide-react"
import {
  bakeryProducts,
  spicesProducts,
  vegetablesProducts,
  fruitsProducts,
  dairyProducts,
  drinksProducts,
  frozenProducts,
} from "@/lib/products-data"

const regularNavItems = [
  { name: "Home", href: "/", icon: Home },
]

const navItems = [
  {
    name: "Bakery",
    href: "/bakery",
    icon: Cake,
    products: bakeryProducts,
    categoryImage: "/fresh-indian-naan-bread-and-traditional-bakery-ite.jpg",
  },
  {
    name: "Spices",
    href: "/spices",
    icon: Soup,
    products: spicesProducts,
    categoryImage: "/colorful-exotic-indian-spices-in-bowls.jpg",
  },
  {
    name: "Vegetables",
    href: "/vegetables",
    icon: Carrot,
    products: vegetablesProducts,
    categoryImage: "/fresh-vibrant-seasonal-indian-vegetables.jpg",
  },
  {
    name: "Fruits",
    href: "/fruits",
    icon: Apple,
    products: fruitsProducts,
    categoryImage: "/brightly-colored-ripe-exotic-fruits.jpg",
  },
  {
    name: "Dairy",
    href: "/dairy",
    icon: Milk,
    products: dairyProducts,
    categoryImage: "/fresh-milk-cheese-eggs-and-dairy-products.jpg",
  },
  {
    name: "Drinks",
    href: "/drinks",
    icon: Coffee,
    products: drinksProducts,
    categoryImage: "/refreshing-beverages-juices-and-coffee-drinks.jpg",
  },
  {
    name: "Frozen",
    href: "/frozen",
    icon: Snowflake,
    products: frozenProducts,
    categoryImage: "/frozen-meals-ice-cream-and-frozen-food-packaging.jpg",
  },
  {
    name: "Deals",
    href: "/deals",
    icon: Tag,
    products: [],
    categoryImage: "/special-offers-discount-sale-indian-grocery-produc.jpg",
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: Phone,
    products: [],
    categoryImage: "",
  },
]

export function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<{ [key: string]: "left" | "center" | "right" }>({})
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const navItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isHoveringRef = useRef(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      let isInsideDropdown = false

      // Check if click is inside any dropdown
      Object.values(dropdownRefs.current).forEach((dropdown) => {
        if (dropdown && dropdown.contains(target)) {
          isInsideDropdown = true
        }
      })

      // Check if click is inside any nav item
      Object.values(navItemRefs.current).forEach((navItem) => {
        if (navItem && navItem.contains(target)) {
          isInsideDropdown = true
        }
      })

      if (!isInsideDropdown) {
        setOpenDropdown(null)
      }
    }

    // Listen for custom event to close dropdowns (from search bar)
    const handleCloseDropdowns = () => {
      setOpenDropdown(null)
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("closeDropdowns", handleCloseDropdowns)
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("closeDropdowns", handleCloseDropdowns)
    }
  }, [])

  const calculateDropdownPosition = (itemName: string): "left" | "center" | "right" => {
    const navItem = navItemRefs.current[itemName]
    if (!navItem) return "center"

    const rect = navItem.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const dropdownWidth = Math.min(900, viewportWidth * 0.9)

    const rightOverflow = rect.left + rect.width / 2 + dropdownWidth / 2 > viewportWidth
    const leftOverflow = rect.left + rect.width / 2 - dropdownWidth / 2 < 0

    if (rightOverflow) return "right"
    if (leftOverflow) return "left"
    return "center"
  }

  const handleMouseEnter = (itemName: string) => {
    // Clear any existing timeout immediately
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    isHoveringRef.current = true
    const position = calculateDropdownPosition(itemName)
    setDropdownPosition((prev) => ({ ...prev, [itemName]: position }))
    // Immediately open the new dropdown - this will close any previous dropdown
    setOpenDropdown(itemName)
  }

  const handleMouseLeave = (itemName: string) => {
    // Don't close immediately - wait to see if cursor moves to dropdown
    // Only set the flag, don't start timeout yet
    // The timeout will only start if cursor doesn't enter dropdown
  }

  const handleDropdownEnter = (itemName: string) => {
    // Clear any existing timeout when entering dropdown
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    isHoveringRef.current = true
    // Keep the dropdown open
    setOpenDropdown(itemName)
  }

  const handleDropdownLeave = () => {
    isHoveringRef.current = false
    // Close dropdown when leaving dropdown area (not nav tab)
    // Only close if cursor moves away from both nav tab and dropdown
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        setOpenDropdown(null)
      }
    }, 300)
  }

  const handleNavClick = () => {
    setOpenDropdown(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    // Listen for custom event to close dropdowns when entering search bar
    const handleCloseDropdowns = () => {
      setOpenDropdown(null)
    }

    window.addEventListener("closeDropdowns", handleCloseDropdowns)
    
    return () => {
      window.removeEventListener("closeDropdowns", handleCloseDropdowns)
    }
  }, [])

  return (
    <nav 
      className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary/95 to-accent border-b-4 border-accent/50 shadow-2xl animate-maroon-glow"
      onMouseLeave={() => {
        // Close dropdown when leaving navbar area (moving to search bar or elsewhere)
        if (openDropdown) {
          hoverTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null)
          }, 100)
        }
      }}
      onMouseEnter={() => {
        // Clear timeout if re-entering navbar
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
          hoverTimeoutRef.current = null
        }
      }}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {regularNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 rounded-lg hover:scale-110 backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              )
            })}

            {navItems.map((item) => {
              const Icon = item.icon
              const hasDropdown = item.products && item.products.length > 0
              const position = dropdownPosition[item.name] || "center"

              return (
                <div
                  key={item.name}
                  className="relative"
                  ref={(el) => {
                    navItemRefs.current[item.name] = el
                  }}
                  onMouseEnter={() => {
                    if (hasDropdown) {
                      handleMouseEnter(item.name)
                    }
                  }}
                  onMouseLeave={() => {
                    // Don't do anything when leaving nav item
                    // Dropdown will stay open until cursor moves to dropdown or away completely
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    onMouseEnter={() => {
                      if (hasDropdown) {
                        handleMouseEnter(item.name)
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 rounded-lg hover:scale-110 backdrop-blur-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{item.name}</span>
                    {hasDropdown && <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />}
                  </Link>

                  {hasDropdown && openDropdown === item.name && (
                    <>
                      {/* Bridge element to prevent gap between nav item and dropdown */}
                      <div
                        className="absolute top-full left-0 right-0 h-4"
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      />
                      <div
                        ref={(el) => {
                          dropdownRefs.current[item.name] = el
                        }}
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                        className={`absolute top-full mt-4 w-[90vw] max-w-[900px] bg-card/98 backdrop-blur-xl border-2 border-primary/60 rounded-2xl shadow-2xl overflow-hidden z-50
                        ${position === "center" ? "left-1/2 -translate-x-1/2" : ""}
                        ${position === "right" ? "right-0" : ""}
                        ${position === "left" ? "left-0" : ""}
                      `}
                      style={{
                        animation: "fadeIn 0.3s ease-out, slideDown 0.3s ease-out",
                      }}
                    >
                      <div className="relative h-40 overflow-hidden group">
                        <img
                          src={item.categoryImage || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/95" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent group-hover:from-primary/50 transition-all duration-500" />
                      </div>

                      <div className="p-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
                        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3 border-b-2 border-primary/40 pb-3 hover:border-primary/60 transition-colors">
                          <Icon className="w-7 h-7 text-primary" />
                          {item.name} Collection
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 auto-rows-fr">
                          {item.products.map((product, index) => (
                            <Link
                              key={`${item.name}-${index}-${product.name}`}
                              href={`/product/${encodeURIComponent(product.name)}`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div
                                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-primary/15 hover:shadow-xl transition-all duration-300 cursor-pointer group border border-primary/20 hover:border-primary/60 hover:scale-110 hover:-translate-y-1 min-h-[180px]"
                              >
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted shadow-md ring-2 ring-primary/30 group-hover:ring-primary/80 transition-all duration-300 flex-shrink-0">
                                  <img
                                    src={product.image || "/placeholder.svg?height=80&width=80"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                                    loading="lazy"
                                    style={{ minHeight: "80px", minWidth: "80px" }}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/placeholder.svg?height=80&width=80"
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500" />
                                </div>
                                <span className="text-xs font-semibold text-center line-clamp-2 text-balance group-hover:text-primary transition-colors min-h-[2.5rem] flex items-center justify-center">
                                  {product.name}
                                </span>
                                <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                                  {product.price}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 animate-in fade-in slide-in-from-top-4 duration-300 border-t border-primary-foreground/10">
            {regularNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 rounded-lg font-medium hover:translate-x-1"
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 rounded-lg font-medium hover:translate-x-1"
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
