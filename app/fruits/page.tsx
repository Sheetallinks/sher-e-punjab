import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { fruitsProducts } from "@/lib/products-data"

export default function FruitsPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-orbs" />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <HeroSection
        title="Exotic Fruits"
        subtitle="Sweet, fresh, and bursting with authentic Indian flavors"
        image="/exotic-tropical-fruits-mango-papaya-guava-lychee-p.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-balance">Fruit Collection</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Handpicked exotic and tropical fruits for your enjoyment
            </p>
          </div>

          <ProductGrid products={fruitsProducts} />
        </div>
      </section>
    </div>
  )
}
