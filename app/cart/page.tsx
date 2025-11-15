"use client"

import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { HeroSection } from "@/components/hero-section"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { t } = useLanguage()
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  return (
    <div>
      {/* Hero Section */}
      <HeroSection title="Your Shopping Cart" subtitle="Review your items and proceed to checkout" image="" />

      <div className="bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 mb-4 hover:translate-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-primary" />
              Cart Summary
            </h2>
            <p className="text-muted-foreground mt-2">
              {getCartCount()} {getCartCount() === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cart.length === 0 ? (
            <Card className="animate-in fade-in zoom-in-95 duration-500">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingBag className="w-24 h-24 text-muted-foreground/30 mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2 animate-slide-up">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6 animate-slide-up animate-delay-100">
                  Add some delicious items to get started!
                </p>
                <Link href="/">
                  <Button size="lg" className="gap-2 animate-slide-up animate-delay-200 hover:scale-105 transition-all">
                    <ShoppingBag className="w-5 h-5" />
                    Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => {
                  const itemPrice = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
                  return (
                    <Card
                      key={item.id}
                      className="animate-in fade-in slide-in-from-left-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 ring-2 ring-border hover:ring-primary transition-all duration-300">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg text-foreground line-clamp-1">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0 hover:scale-110 transition-all duration-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 hover:bg-background hover:scale-110 transition-all"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 hover:bg-background hover:scale-110 transition-all"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">€{itemPrice.toFixed(2)} each</p>
                                <p className="text-xl font-bold text-primary">
                                  €{(itemPrice * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 animate-in fade-in slide-in-from-right-4 duration-500 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between text-foreground">
                        <span>Subtotal</span>
                        <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-foreground">
                        <span>Tax (8%)</span>
                        <span className="font-semibold">€{tax.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-foreground">
                        <span>Shipping</span>
                        <span className="font-semibold">{shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}</span>
                      </div>

                      {subtotal < 50 && (
                        <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                          Add €{(50 - subtotal).toFixed(2)} more for free shipping!
                        </p>
                      )}

                      <Separator className="my-4" />

                      <div className="flex justify-between text-lg font-bold text-foreground">
                        <span>Total</span>
                        <span className="text-primary">€{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <Button
                        className="w-full mt-6 h-12 text-lg font-semibold hover:scale-105 transition-all"
                        size="lg"
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <Link href="/">
                      <Button
                        variant="outline"
                        className="w-full mt-3 bg-transparent hover:scale-105 transition-all"
                        size="lg"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
