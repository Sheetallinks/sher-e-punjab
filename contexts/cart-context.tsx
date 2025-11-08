"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: string
  image: string
  category: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: { name: string; price: string; image: string; category: string }) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: { name: string; price: string; image: string; category: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name)

      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `${product.name} quantity increased`,
        })
        return prevCart.map((item) => (item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item))
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })

      return [
        ...prevCart,
        {
          id: `${product.name}-${Date.now()}`,
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
      variant: "destructive",
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("shopping-cart")
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
