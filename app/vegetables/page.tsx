import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { vegetablesProducts } from "@/lib/products-data"

export default function VegetablesPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-orbs" />
        <div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <HeroSection
        title="Fresh Vegetables"
        subtitle="Farm-fresh Indian vegetables delivered daily"
        image="/fresh-indian-vegetables-okra-bitter-gourd-leafy-gr.jpg"
      />

      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-balance">Vegetable Selection</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Fresh, high-quality vegetables sourced from trusted local farms
            </p>
          </div>

          <ProductGrid products={vegetablesProducts} />
        </div>
      </section>
    </div>
  )
}
