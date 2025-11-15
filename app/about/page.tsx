import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { Heart, Award, Users, ShoppingBag, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description: "We bring you genuine Indian flavors and products, sourced directly from trusted suppliers across India.",
    },
    {
      icon: Award,
      title: "Quality",
      description: "Every product is carefully selected to meet our high standards of freshness and quality.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We're more than a store - we're a community hub for the Indian diaspora and food lovers.",
    },
    {
      icon: ShoppingBag,
      title: "Variety",
      description: "From rare spices to everyday essentials, we have everything you need for authentic Indian cooking.",
    },
  ]

  const milestones = [
    {
      year: "1995",
      title: "Our Beginning",
      description: "Started as a small family store in Lisbon, Portugal.",
    },
    {
      year: "2005",
      title: "Expansion",
      description: "Expanded our product range to include fresh produce and dairy.",
    },
    {
      year: "2015",
      title: "Online Presence",
      description: "Launched our online store to serve customers across Portugal.",
    },
    {
      year: "2024",
      title: "Today",
      description: "Serving thousands of customers with authentic Indian groceries.",
    },
  ]

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-orbs" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <HeroSection
        title="About Sher-e-Punjab"
        subtitle="Your trusted source for authentic Indian groceries since 1995"
        image="/friendly-indian-grocery-store-facade-exterior.jpg"
      />

      {/* Our Story Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sher-e-Punjab was founded in 1995 with a simple mission: to bring authentic Indian groceries and flavors to the Indian community in Portugal. What started as a small family store in Lisbon has grown into a beloved destination for anyone seeking genuine Indian products.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="animate-slide-in-left p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide authentic, high-quality Indian groceries and products while preserving the rich culinary traditions of India. We strive to make traditional ingredients accessible to everyone, whether you're a seasoned cook or just starting your Indian culinary journey.
                </p>
              </div>

              <div className="animate-slide-in-right p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become the premier destination for Indian groceries in Portugal, known for our authenticity, quality, and commitment to customer satisfaction. We envision a future where everyone can experience the true flavors of India, no matter where they are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={value.title}
                  className="text-center p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4 shadow-sm hover:shadow-md transition-all duration-300 border border-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-serif">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">Milestones that shaped us</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className="relative flex gap-6 items-start animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="text-sm font-bold text-primary-foreground">{milestone.year}</span>
                    </div>
                    <div className="flex-1 p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Why Choose Sher-e-Punjab?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Wide Selection</h3>
                  <p className="text-muted-foreground">
                    Over 2000+ products including spices, fresh produce, dairy, frozen foods, and specialty items.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in animate-delay-100">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Quality Guaranteed</h3>
                  <p className="text-muted-foreground">
                    We source directly from trusted suppliers to ensure freshness and authenticity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in animate-delay-200">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Open 7 Days</h3>
                  <p className="text-muted-foreground">
                    We're open Monday through Sunday, 8 AM to 10 PM, for your convenience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in animate-delay-300">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Prime Location</h3>
                  <p className="text-muted-foreground">
                    Located in the heart of Lisbon, easily accessible by metro or car.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Visit Us Today</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Experience the authentic taste of India. We're here to help you find everything you need for your next delicious meal.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-2 border-white text-white hover:bg-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

