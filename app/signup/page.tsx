"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { t, language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert(language === "en" ? "Passwords do not match!" : "As senhas não coincidem!")
      return
    }
    // Handle signup logic here
    console.log("Signup:", { name, email, password })
  }

  return (
    <div>
      <HeroSection
        title="Join Sher-e-Punjab"
        subtitle="Create an account to enjoy exclusive deals and faster checkout"
        image=""
      />

      <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">{t("signup")}</CardTitle>
            <CardDescription className="text-center">
              {language === "en" ? "Create an account to start shopping" : "Crie uma conta para começar a comprar"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{language === "en" ? "Full Name" : "Nome Completo"}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={language === "en" ? "John Doe" : "João Silva"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{language === "en" ? "Email" : "E-mail"}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === "en" ? "name@example.com" : "nome@exemplo.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{language === "en" ? "Password" : "Senha"}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={language === "en" ? "Create a password" : "Crie uma senha"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{language === "en" ? "Confirm Password" : "Confirmar Senha"}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={language === "en" ? "Confirm your password" : "Confirme sua senha"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" size="lg">
                {t("signup")}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {language === "en" ? "Already have an account?" : "Já tem uma conta?"}{" "}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  {t("login")}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
