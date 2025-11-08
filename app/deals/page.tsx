import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { Badge } from "@/components/ui/badge"
import { dealsProducts } from "@/lib/products-data"

export default function DealsPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-orbs" />
        <div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <HeroSection
        title="Special Deals"
        subtitle="Amazing discounts on your favorite Indian groceries"
        image="/special-offers-discount-sale-indian-grocery-produc.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-4xl font-bold text-balance">This Week's Deals</h2>
              <Badge variant="destructive" className="text-lg px-4 py-1">
                Limited Time
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground text-pretty">
              Save big on premium products - offers valid while stocks last!
            </p>
          </div>

          <ProductGrid products={dealsProducts} />

          <div className="mt-16 p-8 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-2xl text-center animate-fade-in shadow-2xl border border-primary/50">
            <h3 className="text-3xl font-bold mb-4">Sign up for exclusive deals!</h3>
            <p className="text-lg mb-6 text-primary-foreground/90 text-pretty">
              Get notified about special offers and new arrivals
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
              />
              <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-all duration-300 font-semibold hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
