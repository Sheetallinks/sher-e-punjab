import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { BackToTop } from "@/components/back-to-top"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LanguageProvider } from "@/contexts/language-context"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
})

export const metadata: Metadata = {
  title: "Sher-e-Punjab - Authentic Indian Grocery Store",
  description: "Your destination for authentic Indian groceries, spices, fresh produce, and more",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${notoSansDevanagari.variable} font-sans antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <BackToTop />
              <WhatsAppButton />
              <Toaster />
            </Suspense>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
