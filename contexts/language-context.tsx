"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "pt" | "fr" | "es" | "nl" | "hi" | "pa" | "ur"

interface Translations {
  [key: string]: {
    en: string
    pt: string
    fr: string
    es: string
    nl: string
    hi: string
    pa: string
    ur: string
  }
}

const translations: Translations = {
  searchPlaceholder: {
    en: "Search for products, categories, or brands...",
    pt: "Pesquisar produtos, categorias ou marcas...",
    fr: "Rechercher des produits, catégories ou marques...",
    es: "Buscar productos, categorías o marcas...",
    nl: "Zoek naar producten, categorieën of merken...",
    hi: "उत्पाद, श्रेणियाँ या ब्रांड खोजें...",
    pa: "ਉਤਪਾਦ, ਸ਼੍ਰੇਣੀਆਂ ਜਾਂ ਬ੍ਰਾਂਡ ਖੋਜੋ...",
    ur: "مصنوعات، زمرے یا برانڈز تلاش کریں...",
  },
  login: {
    en: "Login",
    pt: "Entrar",
    fr: "Connexion",
    es: "Iniciar sesión",
    nl: "Inloggen",
    hi: "लॉगिन",
    pa: "ਲਾਗਇਨ",
    ur: "لاگ ان",
  },
  signup: {
    en: "Sign Up",
    pt: "Cadastrar",
    fr: "S'inscrire",
    es: "Registrarse",
    nl: "Registreren",
    hi: "साइन अप",
    pa: "ਸਾਈਨ ਅਪ",
    ur: "سائن اپ",
  },
  home: {
    en: "Home",
    pt: "Início",
    fr: "Accueil",
    es: "Inicio",
    nl: "Home",
    hi: "होम",
    pa: "ਹੋਮ",
    ur: "ہوم",
  },
  bakery: {
    en: "Bakery",
    pt: "Padaria",
    fr: "Boulangerie",
    es: "Panadería",
    nl: "Bakkerij",
    hi: "बेकरी",
    pa: "ਬੇਕਰੀ",
    ur: "بیکری",
  },
  spices: {
    en: "Spices",
    pt: "Especiarias",
    fr: "Épices",
    es: "Especias",
    nl: "Kruiden",
    hi: "मसाले",
    pa: "ਮਸਾਲੇ",
    ur: "مصالحے",
  },
  vegetables: {
    en: "Vegetables",
    pt: "Vegetais",
    fr: "Légumes",
    es: "Verduras",
    nl: "Groenten",
    hi: "सब्जियां",
    pa: "ਸਬਜ਼ੀਆਂ",
    ur: "سبزیاں",
  },
  fruits: {
    en: "Fruits",
    pt: "Frutas",
    fr: "Fruits",
    es: "Frutas",
    nl: "Fruit",
    hi: "फल",
    pa: "ਫਲ",
    ur: "پھل",
  },
  dairy: {
    en: "Dairy",
    pt: "Laticínios",
    fr: "Produits laitiers",
    es: "Lácteos",
    nl: "Zuivel",
    hi: "डेयरी",
    pa: "ਡੇਅਰੀ",
    ur: "ڈیری",
  },
  drinks: {
    en: "Drinks",
    pt: "Bebidas",
    fr: "Boissons",
    es: "Bebidas",
    nl: "Dranken",
    hi: "पेय",
    pa: "ਪੀਣ",
    ur: "مشروبات",
  },
  frozen: {
    en: "Frozen",
    pt: "Congelados",
    fr: "Surgelés",
    es: "Congelados",
    nl: "Bevroren",
    hi: "फ्रोजन",
    pa: "ਫ੍ਰੀਜ਼",
    ur: "منجمد",
  },
  deals: {
    en: "Deals",
    pt: "Ofertas",
    fr: "Offres",
    es: "Ofertas",
    nl: "Aanbiedingen",
    hi: "डील",
    pa: "ਡੀਲ",
    ur: "ڈیلز",
  },
  contact: {
    en: "Contact",
    pt: "Contato",
    fr: "Contact",
    es: "Contacto",
    nl: "Contact",
    hi: "संपर्क",
    pa: "ਸੰਪਰਕ",
    ur: "رابطہ",
  },
  welcomeTitle: {
    en: "Welcome to Sher-e-Punjab",
    pt: "Bem-vindo ao Sher-e-Punjab",
    fr: "Bienvenue chez Sher-e-Punjab",
    es: "Bienvenido a Sher-e-Punjab",
    nl: "Welkom bij Sher-e-Punjab",
    hi: "शेर-ए-पंजाब में आपका स्वागत है",
    pa: "ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ",
    ur: "شیر-اے-پنجاب میں خوش آمدید",
  },
  welcomeSubtitle: {
    en: "Your destination for authentic Indian groceries, spices, and fresh produce",
    pt: "Seu destino para mantimentos indianos autênticos, especiarias e produtos frescos",
    fr: "Votre destination pour les produits d'épicerie indiens authentiques, les épices et les produits frais",
    es: "Tu destino para comestibles indios auténticos, especias y productos frescos",
    nl: "Uw bestemming voor authentieke Indiase kruidenierswaren, specerijen en verse producten",
    hi: "प्रामाणिक भारतीय किराना, मसाले और ताजे उत्पादों के लिए आपकी मंजिल",
    pa: "ਪ੍ਰਮਾਣਿਕ ਭਾਰਤੀ ਕਿਰਾਨਾ, ਮਸਾਲੇ ਅਤੇ ਤਾਜ਼ੇ ਉਤਪਾਦਾਂ ਲਈ ਤੁਹਾਡੀ ਮੰਜ਼ਿਲ",
    ur: "اصلی ہندوستانی گروسری، مصالحے اور تازہ پیداوار کے لیے آپ کی منزل",
  },
  shopNow: {
    en: "Shop Now",
    pt: "Comprar Agora",
    fr: "Acheter maintenant",
    es: "Comprar ahora",
    nl: "Nu kopen",
    hi: "अभी खरीदें",
    pa: "ਹੁਣ ਖਰੀਦੋ",
    ur: "ابھی خریدیں",
  },
  viewDeals: {
    en: "View Deals",
    pt: "Ver Ofertas",
    fr: "Voir les offres",
    es: "Ver ofertas",
    nl: "Bekijk aanbiedingen",
    hi: "डील देखें",
    pa: "ਡੀਲ ਵੇਖੋ",
    ur: "ڈیلز دیکھیں",
  },
  addToCart: {
    en: "Add to Cart",
    pt: "Adicionar ao Carrinho",
    fr: "Ajouter au panier",
    es: "Añadir al carrito",
    nl: "Toevoegen aan winkelwagen",
    hi: "कार्ट में जोड़ें",
    pa: "ਟੋਕਰੀ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ",
    ur: "ٹوکری میں شامل کریں",
  },
  viewAll: {
    en: "View All",
    pt: "Ver Todos",
    fr: "Voir tout",
    es: "Ver todo",
    nl: "Alles bekijken",
    hi: "सभी देखें",
    pa: "ਸਭ ਵੇਖੋ",
    ur: "سب دیکھیں",
  },
  freshBakery: {
    en: "Fresh Bakery",
    pt: "Padaria Fresca",
    fr: "Boulangerie fraîche",
    es: "Panadería fresca",
    nl: "Verse bakkerij",
    hi: "ताजी बेकरी",
    pa: "ਤਾਜ਼ੀ ਬੇਕਰੀ",
    ur: "تازہ بیکری",
  },
  authenticSpices: {
    en: "Authentic Spices",
    pt: "Especiarias Autênticas",
    fr: "Épices authentiques",
    es: "Especias auténticas",
    nl: "Authentieke kruiden",
    hi: "प्रामाणिक मसाले",
    pa: "ਪ੍ਰਮਾਣਿਕ ਮਸਾਲੇ",
    ur: "اصلی مصالحے",
  },
  freshVegetables: {
    en: "Fresh Vegetables",
    pt: "Vegetais Frescos",
    fr: "Légumes frais",
    es: "Verduras frescas",
    nl: "Verse groenten",
    hi: "ताजी सब्जियां",
    pa: "ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ",
    ur: "تازہ سبزیاں",
  },
  exoticFruits: {
    en: "Exotic Fruits",
    pt: "Frutas Exóticas",
    fr: "Fruits exotiques",
    es: "Frutas exóticas",
    nl: "Exotisch fruit",
    hi: "विदेशी फल",
    pa: "ਵਿਦੇਸ਼ੀ ਫਲ",
    ur: "غیر ملکی پھل",
  },
  dairyProducts: {
    en: "Dairy Products",
    pt: "Produtos Lácteos",
    fr: "Produits laitiers",
    es: "Productos lácteos",
    nl: "Zuivelproducten",
    hi: "डेयरी उत्पाद",
    pa: "ਡੇਅਰੀ ਉਤਪਾਦ",
    ur: "ڈیری مصنوعات",
  },
  refreshingDrinks: {
    en: "Refreshing Drinks",
    pt: "Bebidas Refrescantes",
    fr: "Boissons rafraîchissantes",
    es: "Bebidas refrescantes",
    nl: "Verfrissende dranken",
    hi: "ताज़ा पेय",
    pa: "ਤਾਜ਼ਾ ਪੀਣ",
    ur: "تازگی بخش مشروبات",
  },
  frozenFoods: {
    en: "Frozen Foods",
    pt: "Alimentos Congelados",
    fr: "Aliments surgelés",
    es: "Alimentos congelados",
    nl: "Bevroren voedsel",
    hi: "फ्रोजन खाद्य",
    pa: "ਫ੍ਰੀਜ਼ ਭੋਜਨ",
    ur: "منجمد کھانے",
  },
  specialOffers: {
    en: "Special Weekend Offers",
    pt: "Ofertas Especiais de Fim de Semana",
    fr: "Offres spéciales du week-end",
    es: "Ofertas especiales de fin de semana",
    nl: "Speciale weekendaanbiedingen",
    hi: "विशेष सप्ताहांत ऑफर",
    pa: "ਖਾਸ ਹਫਤੇ ਦੇ ਅੰਤ ਦੀਆਂ ਪੇਸ਼ਕਸ਼ਾਂ",
    ur: "خصوصی ویک اینڈ پیشکش",
  },
  freeDelivery: {
    en: "Free Delivery",
    pt: "Entrega Grátis",
    fr: "Livraison gratuite",
    es: "Entrega gratuita",
    nl: "Gratis bezorging",
    hi: "मुफ्त डिलीवरी",
    pa: "ਮੁਫ਼ਤ ਡਿਲੀਵਰੀ",
    ur: "مفت ڈیلیوری",
  },
  freeDeliveryDesc: {
    en: "On orders over €50",
    pt: "Em pedidos acima de €50",
    fr: "Sur les commandes de plus de 50 €",
    es: "En pedidos superiores a 50 €",
    nl: "Bij bestellingen boven €50",
    hi: "€50 से अधिक के ऑर्डर पर",
    pa: "€50 ਤੋਂ ਵੱਧ ਦੇ ਆਰਡਰ 'ਤੇ",
    ur: "€50 سے زیادہ کے آرڈرز پر",
  },
  qualityGuaranteed: {
    en: "Quality Guaranteed",
    pt: "Qualidade Garantida",
    fr: "Qualité garantie",
    es: "Calidad garantizada",
    nl: "Kwaliteit gegarandeerd",
    hi: "गुणवत्ता की गारंटी",
    pa: "ਗੁਣਵੱਤਾ ਦੀ ਗਾਰੰਟੀ",
    ur: "معیار کی ضمانت",
  },
  qualityGuaranteedDesc: {
    en: "Fresh & authentic products",
    pt: "Produtos frescos e autênticos",
    fr: "Produits frais et authentiques",
    es: "Productos frescos y auténticos",
    nl: "Verse en authentieke producten",
    hi: "ताजा और प्रामाणिक उत्पाद",
    pa: "ਤਾਜ਼ੇ ਅਤੇ ਪ੍ਰਮਾਣਿਕ ਉਤਪਾਦ",
    ur: "تازہ اور اصلی مصنوعات",
  },
  open7Days: {
    en: "Open 7 Days",
    pt: "Aberto 7 Dias",
    fr: "Ouvert 7 jours",
    es: "Abierto 7 días",
    nl: "7 dagen open",
    hi: "7 दिन खुला",
    pa: "7 ਦਿਨ ਖੁੱਲ੍ਹਾ",
    ur: "7 دن کھلا",
  },
  open7DaysDesc: {
    en: "8 AM - 10 PM daily",
    pt: "8h - 22h diariamente",
    fr: "8h - 22h quotidiennement",
    es: "8 AM - 10 PM diariamente",
    nl: "8:00 - 22:00 dagelijks",
    hi: "प्रतिदिन सुबह 8 बजे - रात 10 बजे",
    pa: "ਰੋਜ਼ਾਨਾ ਸਵੇਰੇ 8 ਵਜੇ - ਰਾਤ 10 ਵਜੇ",
    ur: "روزانہ صبح 8 بجے - رات 10 بجے",
  },
  madeWithLove: {
    en: "Made with Love",
    pt: "Feito com Amor",
    fr: "Fait avec amour",
    es: "Hecho con amor",
    nl: "Met liefde gemaakt",
    hi: "प्यार से बनाया गया",
    pa: "ਪਿਆਰ ਨਾਲ ਬਣਾਇਆ",
    ur: "محبت سے بنایا گیا",
  },
  madeWithLoveDesc: {
    en: "Traditional recipes",
    pt: "Receitas tradicionais",
    fr: "Recettes traditionnelles",
    es: "Recetas tradicionales",
    nl: "Traditionele recepten",
    hi: "पारंपरिक व्यंजन",
    pa: "ਰਵਾਇਤੀ ਵਿਅੰਜਨ",
    ur: "روایتی ترکیبیں",
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
    if (savedLanguage && ["en", "pt", "fr", "es", "nl", "hi", "pa", "ur"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.["en"] || key
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
