import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
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
        title="Contact Us"
        subtitle="We'd love to hear from you. Visit us or get in touch!"
        image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sher-e-punjab-6m2faH7WAAGvJBnAKwl7JZbbI8vXuz.jpeg"
      />

      <section className="py-16 bg-gradient-to-b from-background to-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card hover:border-primary/50 transition-all duration-300 focus:scale-[1.02]"
                    placeholder="Your name"
                  />
                </div>
                <div className="animate-fade-in animate-delay-100">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card hover:border-primary/50 transition-all duration-300 focus:scale-[1.02]"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="animate-fade-in animate-delay-200">
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card hover:border-primary/50 transition-all duration-300 focus:scale-[1.02]"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="animate-fade-in animate-delay-300">
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-card hover:border-primary/50 transition-all duration-300 focus:scale-[1.02]"
                    placeholder="How can we help you?"
                  />
                </div>
                <Button
                  size="lg"
                  className="w-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in animate-delay-400"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold mb-6">Visit Our Store</h2>

              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce-in">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Punjab Street
                      <br />
                      Little India District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in animate-delay-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce-in animate-delay-100">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">
                      (555) 123-4567
                      <br />
                      (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in animate-delay-200">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce-in animate-delay-200">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@sherepunjab.com
                      <br />
                      orders@sherepunjab.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-in animate-delay-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-bounce-in animate-delay-300">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Store Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Sunday
                      <br />
                      8:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in animate-delay-400">
                <h3 className="font-semibold mb-2">Need Directions?</h3>
                <p className="text-muted-foreground mb-4">
                  We're located in the heart of Little India, easily accessible by subway or car.
                </p>
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-all duration-300 bg-transparent hover:bg-primary hover:text-primary-foreground"
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
