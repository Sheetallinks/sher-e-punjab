import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { bakeryProducts } from "@/lib/products-data"

export default function BakeryPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-orbs" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <HeroSection
        title="Fresh Bakery"
        subtitle="Authentic Indian breads and snacks baked fresh daily"
        image="/fresh-indian-bakery-with-naan-bread-samosas-and-tr.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-balance">Our Bakery Selection</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Freshly baked every morning using traditional recipes and the finest ingredients
            </p>
          </div>

          <ProductGrid products={bakeryProducts} />
        </div>
      </section>
    </div>
  )
}
