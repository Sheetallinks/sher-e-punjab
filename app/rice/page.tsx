import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { riceProducts } from "@/lib/products-data"

export default function RicePage() {
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
        title="Premium Rice"
        subtitle="Finest quality rice varieties for every culinary need"
        image="/vibrant-indian-grocery-store-with-colorful-spices-.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-4 text-balance">Our Rice Collection</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Carefully selected premium rice varieties from trusted sources
            </p>
          </div>

          <ProductGrid products={riceProducts} />
        </div>
      </section>
    </div>
  )
}

