import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { dalsProducts } from "@/lib/products-data"

export default function PulsesPage() {
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
        title="Premium Pulses & Dals"
        subtitle="Nutritious pulses and lentils for healthy, delicious meals"
        image="/fresh-vibrant-seasonal-indian-vegetables.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl font-serif font-bold mb-4 text-balance">Our Pulses & Dals Collection</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              High-quality pulses and dals, rich in protein and essential nutrients
            </p>
          </div>

          <ProductGrid products={dalsProducts} />
        </div>
      </section>
    </div>
  )
}

