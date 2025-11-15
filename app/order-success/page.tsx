"use client"

import { CheckCircle, Package, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full animate-in fade-in zoom-in-95 duration-500">
        <CardContent className="p-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
          </div>

          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Order Confirmed!</h1>

          <p className="text-lg text-muted-foreground mb-8 animate-slide-up animate-delay-100">
            Thank you for your order. Your order has been successfully placed and will be delivered in{" "}
            <strong className="text-primary">5-7 business days</strong>.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8 animate-slide-up animate-delay-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">What happens next?</h2>
            </div>
            <ul className="text-left space-y-2 text-muted-foreground max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>You will receive a confirmation email with your order details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Our team will prepare your order with care</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Your order will be delivered to your address</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Pay cash on delivery when you receive your order</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-300">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Link href="/deals">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Package className="w-5 h-5" />
                View More Deals
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
