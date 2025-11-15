"use client"

import type React from "react"

import { useState } from "react"
import { Search, X, ShoppingCart, User, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchResults } from "@/components/search-results"

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { getCartCount } = useCart()

  const handleClear = () => {
    setSearchQuery("")
    setShowResults(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(value.trim().length > 0)
  }

  return (
    <>
      <div 
        data-search-bar
        className="w-full bg-gradient-to-r from-primary/5 via-background to-primary/5 border-b-2 border-primary/20 shadow-md"
        onMouseEnter={() => {
          // Close any open dropdowns when entering search bar area
          const event = new CustomEvent('closeDropdowns')
          window.dispatchEvent(event)
        }}
      >
        <div className="w-full px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-6 max-w-[1600px] mx-auto">
            {/* Logo - Left Section */}
            <Link href="/" className="flex items-center group justify-center md:justify-start">
              <div className="bg-secondary rounded-lg p-2">
                <img
                  src="/logo-Shere-Punjab.png"
                  alt="Sher-e-Punjab Logo"
                  className="h-24 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Search Bar - Center Section */}
            <div className={`relative transition-all duration-300 ${isFocused ? "scale-105" : ""}`}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="pl-12 pr-12 h-14 text-base bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl shadow-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-muted transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Icons - Right Section */}
            <div className="flex items-center justify-center md:justify-end gap-2">
              {/* Cart Icon */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative flex-shrink-0 h-12 w-12 rounded-xl hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                >
                  <ShoppingCart className="w-6 h-6 text-foreground" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-semibold rounded-md w-5 h-5 flex items-center justify-center shadow-md">
                    {getCartCount()}
                  </span>
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 h-12 w-12 rounded-xl hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  >
                    <User className="w-6 h-6 text-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 shadow-xl border-2">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer font-medium">
                      {t("login")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup" className="cursor-pointer font-medium">
                      {t("signup")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 h-12 w-12 rounded-xl hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  >
                    <Globe className="w-6 h-6 text-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="shadow-xl border-2 max-h-[400px] overflow-y-auto">
                  <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer font-medium">
                    English {language === "en" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("pt")} className="cursor-pointer font-medium">
                    Português {language === "pt" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("fr")} className="cursor-pointer font-medium">
                    Français {language === "fr" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("es")} className="cursor-pointer font-medium">
                    Español {language === "es" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("nl")} className="cursor-pointer font-medium">
                    Nederlands {language === "nl" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("hi")} className="cursor-pointer font-medium">
                    हिंदी {language === "hi" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("pa")} className="cursor-pointer font-medium">
                    ਪੰਜਾਬੀ {language === "pa" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("ur")} className="cursor-pointer font-medium">
                    اردو {language === "ur" && "✓"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {showResults && <SearchResults query={searchQuery} onClose={() => setShowResults(false)} />}
    </>
  )
}
