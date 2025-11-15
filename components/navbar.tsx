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
  Grid3x3,
  Info,
  ShoppingBag,
  Package,
  Circle,
  Box,
} from "lucide-react"
import {
  bakeryProducts,
  spicesProducts,
  vegetablesProducts,
  fruitsProducts,
  dairyProducts,
  drinksProducts,
  frozenProducts,
  floursProducts,
  riceProducts,
  dalsProducts,
} from "@/lib/products-data"
import { useLanguage } from "@/contexts/language-context"
import { getTranslatedProductName } from "@/lib/product-translations"

// Category items for "All Categories" dropdown
const categoryItems = [
  {
    name: "Flour",
    href: "/flour",
    icon: Package,
    products: floursProducts,
  },
  {
    name: "Rice",
    href: "/rice",
    icon: Circle,
    products: riceProducts,
  },
  {
    name: "Pulses",
    href: "/pulses",
    icon: Box,
    products: dalsProducts,
  },
  {
    name: "Bakery",
    href: "/bakery",
    icon: Cake,
    products: bakeryProducts,
  },
  {
    name: "Spices",
    href: "/spices",
    icon: Soup,
    products: spicesProducts,
  },
  {
    name: "Vegetables",
    href: "/vegetables",
    icon: Carrot,
    products: vegetablesProducts,
  },
  {
    name: "Fruits",
    href: "/fruits",
    icon: Apple,
    products: fruitsProducts,
  },
  {
    name: "Dairy",
    href: "/dairy",
    icon: Milk,
    products: dairyProducts,
  },
  {
    name: "Drinks",
    href: "/drinks",
    icon: Coffee,
    products: drinksProducts,
  },
  {
    name: "Frozen",
    href: "/frozen",
    icon: Snowflake,
    products: frozenProducts,
  },
]

const regularNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
]

const navItems = [
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
  const { language } = useLanguage()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<{ [key: string]: "left" | "center" | "right" }>({})
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const navItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const categoryItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const categoryHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isHoveringRef = useRef(false)
  const isCategoryHoveringRef = useRef(false)

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

      // Check if click is inside any category item
      Object.values(categoryItemRefs.current).forEach((categoryItem) => {
        if (categoryItem && categoryItem.contains(target)) {
          isInsideDropdown = true
        }
      })

      if (!isInsideDropdown) {
        setOpenDropdown(null)
        setHoveredCategory(null)
      }
    }

    // Listen for custom event to close dropdowns (from search bar)
    const handleCloseDropdowns = () => {
      setOpenDropdown(null)
      setHoveredCategory(null)
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
    // Reset hovered category when opening "All Categories" dropdown
    if (itemName === "All Categories") {
      setHoveredCategory(null)
    }
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
      if (!isHoveringRef.current && !isCategoryHoveringRef.current) {
        setOpenDropdown(null)
        setHoveredCategory(null)
      }
    }, 200)
  }

  const handleNavClick = () => {
    setOpenDropdown(null)
    setHoveredCategory(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    // Listen for custom event to close dropdowns when entering search bar
    const handleCloseDropdowns = () => {
      setOpenDropdown(null)
      setHoveredCategory(null)
    }

    window.addEventListener("closeDropdowns", handleCloseDropdowns)
    
    return () => {
      window.removeEventListener("closeDropdowns", handleCloseDropdowns)
    }
  }, [])

  // Reset hovered category when "All Categories" dropdown opens
  useEffect(() => {
    if (openDropdown === "All Categories") {
      // Small delay to ensure it resets after any potential hover events
      const timer = setTimeout(() => {
        setHoveredCategory(null)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [openDropdown])

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
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation - Left Side */}
          <div 
            className="hidden lg:flex items-center gap-1 relative ml-4"
            onMouseMove={(e) => {
              // Close dropdown if mouse moves to the left of "All Categories"
              if (openDropdown === "All Categories") {
                const allCategoriesRef = navItemRefs.current["All Categories"]
                if (allCategoriesRef) {
                  const allCategoriesRect = allCategoriesRef.getBoundingClientRect()
                  const mouseX = e.clientX
                  
                  // If mouse is to the left of "All Categories" item (with small buffer)
                  if (mouseX < allCategoriesRect.left - 20) {
                    setOpenDropdown(null)
                    setHoveredCategory(null)
                  }
                }
              }
            }}
          >
            {/* All Categories Dropdown */}
            <div
              className="relative"
              ref={(el) => {
                navItemRefs.current["All Categories"] = el
              }}
              onMouseEnter={() => {
                handleMouseEnter("All Categories")
              }}
              onMouseLeave={(e) => {
                // Check if mouse is moving to the left (before "All Categories")
                if (openDropdown === "All Categories") {
                  const relatedTarget = e.relatedTarget as HTMLElement
                  if (relatedTarget) {
                    const allCategoriesRef = navItemRefs.current["All Categories"]
                    if (allCategoriesRef) {
                      const allCategoriesRect = allCategoriesRef.getBoundingClientRect()
                      const relatedRect = relatedTarget.getBoundingClientRect()
                      
                      // If the related target is to the left of "All Categories"
                      if (relatedRect.right < allCategoriesRect.left) {
                        setOpenDropdown(null)
                        setHoveredCategory(null)
                      }
                    }
                  } else {
                    // If no related target, check mouse position
                    const mouseX = e.clientX
                    const allCategoriesRef = navItemRefs.current["All Categories"]
                    if (allCategoriesRef) {
                      const allCategoriesRect = allCategoriesRef.getBoundingClientRect()
                      if (mouseX < allCategoriesRect.left) {
                        setOpenDropdown(null)
                        setHoveredCategory(null)
                      }
                    }
                  }
                }
              }}
            >
              <div
                onMouseEnter={() => {
                  handleMouseEnter("All Categories")
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 rounded-lg backdrop-blur-sm cursor-pointer"
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="whitespace-nowrap">All Categories</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </div>

              {openDropdown === "All Categories" && (
                <>
                  {/* Bridge element to prevent gap between nav item and dropdown */}
                  <div
                    className="absolute top-full left-0 right-0 h-4"
                    onMouseEnter={() => handleDropdownEnter("All Categories")}
                    onMouseLeave={handleDropdownLeave}
                  />
                  <div
                    ref={(el) => {
                      dropdownRefs.current["All Categories"] = el
                    }}
                    onMouseEnter={() => {
                      handleDropdownEnter("All Categories")
                      // Keep category dropdown open when hovering over products dropdown
                      if (hoveredCategory) {
                        isCategoryHoveringRef.current = true
                      }
                    }}
                    onMouseLeave={(e) => {
                      // Check if mouse is moving to products dropdown or category items
                      const relatedTarget = e.relatedTarget as HTMLElement
                      if (relatedTarget) {
                        // Check if moving to products dropdown or bridge element
                        const isMovingToProducts = relatedTarget.closest('[class*="z-[60]"]') !== null || 
                                                   relatedTarget.closest('[class*="absolute left-full"]') !== null
                        const isMovingToCategory = relatedTarget.closest('a[href^="/bakery"], a[href^="/spices"], a[href^="/vegetables"], a[href^="/fruits"], a[href^="/dairy"], a[href^="/drinks"], a[href^="/frozen"]') !== null
                        
                        if (isMovingToProducts || isMovingToCategory || hoveredCategory) {
                          // Keep dropdown open when moving to products dropdown or category
                          return
                        }
                      }
                      handleDropdownLeave()
                    }}
                    className={`absolute top-full mt-4 bg-card/98 backdrop-blur-xl border-2 border-primary/60 rounded-2xl shadow-2xl overflow-visible z-50
                      ${dropdownPosition["All Categories"] === "center" ? "left-1/2 -translate-x-1/2" : ""}
                      ${dropdownPosition["All Categories"] === "right" ? "right-0" : ""}
                      ${dropdownPosition["All Categories"] === "left" ? "left-0" : ""}
                    `}
                    style={{
                      animation: "fadeIn 0.3s ease-out, slideDown 0.3s ease-out",
                    }}
                  >
                    <div 
                      className="p-6 relative"
                      onMouseLeave={(e) => {
                        // Only close if not moving to products dropdown or category items
                        const relatedTarget = e.relatedTarget as HTMLElement
                        if (relatedTarget) {
                          const isMovingToProducts = relatedTarget.closest('[class*="z-[60]"]') !== null
                          const isMovingToCategory = relatedTarget.closest('a[href^="/bakery"], a[href^="/spices"], a[href^="/vegetables"], a[href^="/fruits"], a[href^="/dairy"], a[href^="/drinks"], a[href^="/frozen"]') !== null
                          
                          if (!isMovingToProducts && !isMovingToCategory && !hoveredCategory) {
                            handleDropdownLeave()
                          }
                        } else if (!hoveredCategory) {
                          handleDropdownLeave()
                        }
                      }}
                    >
                      {/* Products dropdown positioned at top of "All Categories" dropdown */}
                      {hoveredCategory && (() => {
                        const item = categoryItems.find(cat => cat.name === hoveredCategory)
                        if (!item || !item.products || item.products.length === 0) return null
                        const Icon = item.icon
                        return (
                          <>
                            {/* Bridge element to prevent gap */}
                            <div
                              className="absolute top-0 right-0 w-4 h-full z-[55]"
                              style={{ transform: 'translateX(100%)' }}
                              onMouseEnter={() => {
                                if (categoryHoverTimeoutRef.current) {
                                  clearTimeout(categoryHoverTimeoutRef.current)
                                  categoryHoverTimeoutRef.current = null
                                }
                                isCategoryHoveringRef.current = true
                                setHoveredCategory(item.name)
                              }}
                              onMouseLeave={() => {
                                isCategoryHoveringRef.current = false
                                categoryHoverTimeoutRef.current = setTimeout(() => {
                                  if (!isCategoryHoveringRef.current) {
                                    setHoveredCategory(null)
                                  }
                                }, 150)
                              }}
                            />
                            <div
                              onMouseEnter={() => {
                                if (categoryHoverTimeoutRef.current) {
                                  clearTimeout(categoryHoverTimeoutRef.current)
                                  categoryHoverTimeoutRef.current = null
                                }
                                isCategoryHoveringRef.current = true
                                setHoveredCategory(item.name)
                              }}
                              onMouseLeave={() => {
                                isCategoryHoveringRef.current = false
                                categoryHoverTimeoutRef.current = setTimeout(() => {
                                  if (!isCategoryHoveringRef.current) {
                                    setHoveredCategory(null)
                                  }
                                }, 150)
                              }}
                              className="absolute left-full top-0 ml-1 bg-card/98 backdrop-blur-xl border-2 border-primary/60 rounded-2xl shadow-2xl overflow-hidden z-[60] min-w-[250px] max-w-[400px] max-h-[400px] overflow-y-auto"
                              style={{
                                animation: "fadeIn 0.2s ease-out",
                              }}
                            >
                              <div className="p-4">
                                <h4 className="text-lg font-semibold font-serif text-foreground mb-3 flex items-center gap-2 border-b border-primary/40 pb-2">
                                  <Icon className="w-5 h-5 text-primary" />
                                  {item.name} Products
                                </h4>
                                <div className="flex flex-col gap-1">
                                  {item.products.map((product, index) => (
                                    <Link
                                      key={`${item.name}-product-${index}-${product.name}`}
                                      href={`/product/${encodeURIComponent(product.name)}`}
                                      onClick={() => {
                                        setOpenDropdown(null)
                                        setHoveredCategory(null)
                                        handleNavClick()
                                      }}
                                      className="px-3 py-2 text-sm text-foreground hover:bg-primary/15 rounded-lg transition-all duration-200 hover:translate-x-1"
                                    >
                                      {getTranslatedProductName(product.name, language)}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })()}
                      <div className="grid grid-cols-1 gap-2 min-w-[200px]">
                        {categoryItems.map((item) => {
                          const Icon = item.icon
                          const hasProducts = item.products && item.products.length > 0
                          return (
                            <div
                              key={item.name}
                              className="relative"
                              ref={(el) => {
                                categoryItemRefs.current[item.name] = el
                              }}
                              onMouseEnter={(e) => {
                                if (hasProducts) {
                                  // Only set hover if dropdown is already open and mouse is actually moving
                                  if (openDropdown === "All Categories") {
                                    if (categoryHoverTimeoutRef.current) {
                                      clearTimeout(categoryHoverTimeoutRef.current)
                                      categoryHoverTimeoutRef.current = null
                                    }
                                    isCategoryHoveringRef.current = true
                                    setHoveredCategory(item.name)
                                  }
                                }
                              }}
                              onMouseLeave={() => {
                                // Don't close immediately - wait to see if cursor moves to products dropdown
                              }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => {
                                  setOpenDropdown(null)
                                  setHoveredCategory(null)
                                  handleNavClick()
                                }}
                                className="flex items-center gap-3 px-4 py-3 text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 rounded-lg font-medium hover:translate-x-1 relative"
                              >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                                {hasProducts && <ChevronDown className="w-3 h-3 ml-auto rotate-[-90deg]" />}
                              </Link>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden lg:flex items-center gap-1 mr-4">
            {regularNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  onMouseEnter={() => {
                    // Close "All Categories" dropdown when hovering over other navbar items
                    if (openDropdown === "All Categories") {
                      setOpenDropdown(null)
                      setHoveredCategory(null)
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 rounded-lg backdrop-blur-sm"
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
                    // Close "All Categories" dropdown when hovering over other navbar items
                    if (openDropdown === "All Categories") {
                      setOpenDropdown(null)
                      setHoveredCategory(null)
                    }
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
                      // Close "All Categories" dropdown when hovering over other navbar items
                      if (openDropdown === "All Categories") {
                        setOpenDropdown(null)
                        setHoveredCategory(null)
                      }
                      if (hasDropdown) {
                        handleMouseEnter(item.name)
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/15 transition-all duration-300 rounded-lg backdrop-blur-sm"
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
                        <h3 className="text-2xl font-semibold font-serif text-foreground mb-6 flex items-center gap-3 border-b-2 border-primary/40 pb-3 hover:border-primary/60 transition-colors">
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
                                  {getTranslatedProductName(product.name, language)}
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
            {/* All Categories in Mobile */}
            <div className="px-4 py-2">
              <div className="flex items-center gap-3 px-4 py-2 text-primary-foreground font-semibold border-b border-primary-foreground/20 mb-2">
                <Grid3x3 className="w-5 h-5" />
                <span>All Categories</span>
              </div>
              <div className="pl-8">
                {categoryItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false)
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300 rounded-lg font-medium hover:translate-x-1"
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
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
