"use client"

import { HeroSection } from "@/components/hero-section"
import { ProductSlider } from "@/components/product-slider"
import { DealCard } from "@/components/deal-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Truck, Shield, Clock, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import {
  bakeryProducts,
  spicesProducts,
  vegetablesProducts,
  fruitsProducts,
  dairyProducts,
  drinksProducts,
  frozenProducts,
  dealsProducts,
} from "@/lib/products-data"

export default function HomePage() {
  const { t } = useLanguage()

  const scrollToBakery = () => {
    const bakerySection = document.getElementById("bakery-section")
    if (bakerySection) {
      bakerySection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToDeals = () => {
    const dealsSection = document.getElementById("deals-section")
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const features = [
    {
      icon: Truck,
      title: t("freeDelivery"),
      description: t("freeDeliveryDesc"),
    },
    {
      icon: Shield,
      title: t("qualityGuaranteed"),
      description: t("qualityGuaranteedDesc"),
    },
    {
      icon: Clock,
      title: t("open7Days"),
      description: t("open7DaysDesc"),
    },
    {
      icon: Heart,
      title: t("madeWithLove"),
      description: t("madeWithLoveDesc"),
    },
  ]

  const enhancedDeals = [
    {
      ...dealsProducts[0],
      originalPrice: "€34.99",
      discount: "30%",
      description:
        "Complete collection of essential Indian spices including turmeric, cumin, coriander, and garam masala.",
    },
    {
      ...dealsProducts[1],
      originalPrice: "€29.99",
      discount: "25%",
      description: "Fresh seasonal vegetables handpicked daily. Includes okra, bitter gourd, and leafy greens.",
    },
    {
      ...dealsProducts[2],
      originalPrice: "€19.99",
      discount: "20%",
      description: "Freshly baked naan, paratha, samosas, and traditional Indian sweets.",
    },
    {
      ...dealsProducts[3],
      originalPrice: "€29.99",
      discount: "25%",
      description: "Premium dairy products including paneer, ghee, fresh yogurt, and lassi.",
    },
    {
      ...dealsProducts[4],
      originalPrice: "€39.99",
      discount: "35%",
      description: "Assorted namkeen, biscuits, and traditional Indian snacks for parties.",
    },
    {
      ...dealsProducts[5],
      originalPrice: "€24.99",
      discount: "20%",
      description: "Everything you need for a perfect Indian breakfast including poha, upma mix, and more.",
    },
  ]

  return (
    <>
      <div className="relative">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Simplified background - reduced blur for better performance */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        {/* Hero Section */}
        <HeroSection
          slides={[
            {
              title: t("welcomeTitle"),
              subtitle: t("welcomeSubtitle"),
              image: "/Shere-Punjab-counter.jpg",
              children: (
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    onClick={scrollToBakery}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t("shopNow")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={scrollToDeals}
                    className="bg-white/10 border-2 border-white text-white hover:bg-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t("viewDeals")}
                  </Button>
                </div>
              ),
            },
            {
              title: "Fresh & Authentic",
              subtitle: "Premium Indian groceries delivered to your doorstep",
              image: "/fresh-indian-bakery-with-naan-bread-samosas-and-tr.jpg",
              children: (
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    onClick={scrollToBakery}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t("shopNow")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={scrollToDeals}
                    className="bg-white/10 border-2 border-white text-white hover:bg-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t("viewDeals")}
                  </Button>
                </div>
              ),
            },
            {
              title: "Taste of Tradition",
              subtitle: "Experience authentic Indian flavors with our curated selection",
              image: "/exotic-tropical-fruits-mango-papaya-guava-lychee-p.jpg",
              children: (
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    onClick={scrollToBakery}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t("shopNow")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={scrollToDeals}
                    className="bg-white/10 border-2 border-white text-white hover:bg-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t("viewDeals")}
                  </Button>
                </div>
              ),
            },
          ]}
        />

        {/* Features */}
        <section className="py-20 bg-gradient-to-b from-card/50 to-background relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="text-center animate-fade-in hover:scale-105 transition-transform duration-300 p-6 rounded-2xl bg-card/40 border border-primary/20 hover:border-primary/50 hover:bg-card/60"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 shadow-sm hover:shadow-md transition-all duration-300 border border-primary/20">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 font-serif">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Bakery Section */}
        <section id="bakery-section" className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <ProductSlider products={bakeryProducts} title={t("freshBakery")} />
            <div className="text-center mt-8">
              <Link href="/bakery">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md bg-card border-primary/40 hover:border-primary"
                >
                  {t("viewAll")} {t("bakery")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Spices Section */}
        <section className="py-20 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/colorful-exotic-indian-spices-in-bowls.jpg"
              alt="Authentic Spices"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/50 to-background" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ProductSlider products={spicesProducts} title={t("authenticSpices")} />
            <div className="text-center mt-8">
              <Link href="/spices">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md bg-card border-primary/40 hover:border-primary"
                >
                  {t("viewAll")} {t("spices")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Vegetables Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/fresh-vibrant-seasonal-indian-vegetables.jpg"
              alt="Fresh Vegetables"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ProductSlider products={vegetablesProducts} title={t("freshVegetables")} />
            <div className="text-center mt-8">
              <Link href="/vegetables">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md bg-card border-primary/40 hover:border-primary"
                >
                  {t("viewAll")} {t("vegetables")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Fruits Section */}
        <section className="py-20 bg-gradient-to-b from-card/30 to-background relative">
          <div className="container mx-auto px-4">
            <ProductSlider products={fruitsProducts} title={t("exoticFruits")} />
            <div className="text-center mt-8">
              <Link href="/fruits">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md bg-card border-primary/40 hover:border-primary"
                >
                  {t("viewAll")} {t("fruits")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Dairy Section */}
        <section className="py-20 bg-background relative">
          <div className="container mx-auto px-4">
            <ProductSlider products={dairyProducts} title={t("dairyProducts")} />
            <div className="text-center mt-8">
              <Link href="/dairy">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md bg-card border-primary/40 hover:border-primary"
                >
                  {t("viewAll")} {t("dairy")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Drinks Section */}
        <section className="py-20 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/refreshing-beverages-juices-and-coffee-drinks.jpg"
              alt="Refreshing Drinks"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-card/50 to-background" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ProductSlider products={drinksProducts} title={t("refreshingDrinks")} />
            <div className="text-center mt-8">
              <Link href="/drinks">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md bg-card border-primary/40 hover:border-primary"
                >
                  {t("viewAll")} {t("drinks")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Frozen Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/frozen-meals-ice-cream-and-frozen-food-packaging.jpg"
              alt="Frozen Foods"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ProductSlider products={frozenProducts} title={t("frozenFoods")} />
            <div className="text-center mt-8">
              <Link href="/frozen">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 shadow-md bg-card border-primary/40 hover:border-primary"
                >
                  {t("viewAll")} {t("frozen")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Deals Section */}
        <section
          id="deals-section"
          className="py-20 bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/special-offers-discount-sale-indian-grocery-produc.jpg"
              alt="Special Weekend Offers"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/95 to-accent/90" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance drop-shadow-lg">{t("specialOffers")}</h2>
              <p className="text-xl mb-8 text-primary-foreground/90 text-pretty">
                Get up to 35% off on selected items. Fresh arrivals every week! Hover over cards to see more details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {enhancedDeals.map((deal, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <DealCard {...deal} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/deals">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold"
                >
                  {t("viewAll")} {t("deals")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
