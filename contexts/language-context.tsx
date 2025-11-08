"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "pt"

interface Translations {
  [key: string]: {
    en: string
    pt: string
  }
}

const translations: Translations = {
  searchPlaceholder: {
    en: "Search for products, categories, or brands...",
    pt: "Pesquisar produtos, categorias ou marcas...",
  },
  login: {
    en: "Login",
    pt: "Entrar",
  },
  signup: {
    en: "Sign Up",
    pt: "Cadastrar",
  },
  home: {
    en: "Home",
    pt: "Início",
  },
  bakery: {
    en: "Bakery",
    pt: "Padaria",
  },
  spices: {
    en: "Spices",
    pt: "Especiarias",
  },
  vegetables: {
    en: "Vegetables",
    pt: "Vegetais",
  },
  fruits: {
    en: "Fruits",
    pt: "Frutas",
  },
  dairy: {
    en: "Dairy",
    pt: "Laticínios",
  },
  drinks: {
    en: "Drinks",
    pt: "Bebidas",
  },
  frozen: {
    en: "Frozen",
    pt: "Congelados",
  },
  deals: {
    en: "Deals",
    pt: "Ofertas",
  },
  contact: {
    en: "Contact",
    pt: "Contato",
  },
  welcomeTitle: {
    en: "Welcome to Sher-e-Punjab",
    pt: "Bem-vindo ao Sher-e-Punjab",
  },
  welcomeSubtitle: {
    en: "Your destination for authentic Indian groceries, spices, and fresh produce",
    pt: "Seu destino para mantimentos indianos autênticos, especiarias e produtos frescos",
  },
  shopNow: {
    en: "Shop Now",
    pt: "Comprar Agora",
  },
  viewDeals: {
    en: "View Deals",
    pt: "Ver Ofertas",
  },
  addToCart: {
    en: "Add to Cart",
    pt: "Adicionar ao Carrinho",
  },
  viewAll: {
    en: "View All",
    pt: "Ver Todos",
  },
  freshBakery: {
    en: "Fresh Bakery",
    pt: "Padaria Fresca",
  },
  authenticSpices: {
    en: "Authentic Spices",
    pt: "Especiarias Autênticas",
  },
  freshVegetables: {
    en: "Fresh Vegetables",
    pt: "Vegetais Frescos",
  },
  exoticFruits: {
    en: "Exotic Fruits",
    pt: "Frutas Exóticas",
  },
  dairyProducts: {
    en: "Dairy Products",
    pt: "Produtos Lácteos",
  },
  refreshingDrinks: {
    en: "Refreshing Drinks",
    pt: "Bebidas Refrescantes",
  },
  frozenFoods: {
    en: "Frozen Foods",
    pt: "Alimentos Congelados",
  },
  specialOffers: {
    en: "Special Weekend Offers",
    pt: "Ofertas Especiais de Fim de Semana",
  },
  freeDelivery: {
    en: "Free Delivery",
    pt: "Entrega Grátis",
  },
  freeDeliveryDesc: {
    en: "On orders over €50",
    pt: "Em pedidos acima de €50",
  },
  qualityGuaranteed: {
    en: "Quality Guaranteed",
    pt: "Qualidade Garantida",
  },
  qualityGuaranteedDesc: {
    en: "Fresh & authentic products",
    pt: "Produtos frescos e autênticos",
  },
  open7Days: {
    en: "Open 7 Days",
    pt: "Aberto 7 Dias",
  },
  open7DaysDesc: {
    en: "8 AM - 10 PM daily",
    pt: "8h - 22h diariamente",
  },
  madeWithLove: {
    en: "Made with Love",
    pt: "Feito com Amor",
  },
  madeWithLoveDesc: {
    en: "Traditional recipes",
    pt: "Receitas tradicionais",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
