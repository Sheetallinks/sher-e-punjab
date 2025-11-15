import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-orbs" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-orbs"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="animate-fade-in">
            <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity duration-300">
              <img
                src="/logo-Shere-Punjab.png"
                alt="Sher-e-Punjab Logo"
                className="h-24 w-auto object-contain"
                style={{
                  mixBlendMode: 'darken',
                  filter: 'brightness(1.15) contrast(1.3) saturate(1.4)',
                  backgroundColor: 'transparent',
                  WebkitFilter: 'brightness(1.15) contrast(1.3) saturate(1.4)'
                }}
              />
            </Link>
            <p className="text-secondary-foreground/80 mb-4 text-pretty">
              Your trusted source for authentic Indian groceries, spices, and fresh produce since 1995.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in animate-delay-100">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Special Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="animate-fade-in animate-delay-200">
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/bakery"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Bakery
                </Link>
              </li>
              <li>
                <Link
                  href="/spices"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Spices
                </Link>
              </li>
              <li>
                <Link
                  href="/vegetables"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="/fruits"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="/dairy"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Dairy
                </Link>
              </li>
              <li>
                <Link
                  href="/drinks"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Drinks
                </Link>
              </li>
              <li>
                <Link
                  href="/frozen"
                  className="text-secondary-foreground/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Frozen
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in animate-delay-300">
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li className="hover:text-primary transition-colors duration-300">Rua da Índia, 123</li>
              <li className="hover:text-primary transition-colors duration-300">Lisboa, 1000-001, Portugal</li>
              <li className="hover:text-primary transition-colors duration-300">(555) 123-4567</li>
              <li className="hover:text-primary transition-colors duration-300">info@sherepunjab.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-secondary-foreground/60 space-y-2 animate-fade-in animate-delay-400">
          <p>&copy; {new Date().getFullYear()} Sher-e-Punjab. All rights reserved.</p>
          <p className="text-sm">
            Designed by{" "}
            <a
              href="https://bonusitsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold transition-all duration-300 underline hover:scale-105 inline-block"
            >
              Bonus IT Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
