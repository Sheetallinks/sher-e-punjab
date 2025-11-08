"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SpiceDetail {
  name: string
  uses: string
  flavorProfile: string
  origin: string
}

const spiceDetails: SpiceDetail[] = [
  {
    name: "Turmeric (Haldi)",
    uses: "Anti-inflammatory, golden color in curries, health benefits",
    flavorProfile: "Warm, earthy, slightly bitter",
    origin: "India",
  },
  {
    name: "Cumin (Jeera)",
    uses: "Digestive aid, base for curries and rice dishes",
    flavorProfile: "Warm, nutty, slightly citrusy",
    origin: "India",
  },
  {
    name: "Coriander (Dhania)",
    uses: "Cooling spice, used in masalas and curries",
    flavorProfile: "Citrusy, slightly sweet, aromatic",
    origin: "India",
  },
  {
    name: "Garam Masala",
    uses: "Warming spice blend, essential in Indian cooking",
    flavorProfile: "Complex, warm, aromatic",
    origin: "India",
  },
  {
    name: "Cardamom (Elaichi)",
    uses: "Desserts, tea, and savory dishes",
    flavorProfile: "Sweet, floral, slightly minty",
    origin: "India",
  },
  {
    name: "Chilli Powder",
    uses: "Heat and color to dishes, health benefits",
    flavorProfile: "Spicy, fruity, smoky",
    origin: "India",
  },
]

export function SpiceDetails() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-balance">Spice Guide</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Learn about the essential spices used in Indian cuisine and their unique characteristics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spiceDetails.map((spice, index) => (
            <Card
              key={spice.name}
              className="hover:shadow-lg transition-shadow duration-300 animate-fade-in border-border/50 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-primary">{spice.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Uses & Benefits</h4>
                  <p className="text-sm text-foreground">{spice.uses}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Flavor Profile</h4>
                  <p className="text-sm text-foreground">{spice.flavorProfile}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Origin</h4>
                  <p className="text-sm text-foreground font-medium">{spice.origin}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
