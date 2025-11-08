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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login:", { email, password })
  }

  return (
    <div>
      <HeroSection title="Welcome Back" subtitle="Login to access your account and continue shopping" image="" />

      <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">{t("login")}</CardTitle>
            <CardDescription className="text-center">
              {t("language") === "en"
                ? "Enter your email and password to access your account"
                : "Digite seu e-mail e senha para acessar sua conta"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("language") === "en" ? "Email" : "E-mail"}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("language") === "en" ? "name@example.com" : "nome@exemplo.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("language") === "en" ? "Password" : "Senha"}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("language") === "en" ? "Enter your password" : "Digite sua senha"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  {t("language") === "en" ? "Forgot password?" : "Esqueceu a senha?"}
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" size="lg">
                {t("login")}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                {t("language") === "en" ? "Don't have an account?" : "Não tem uma conta?"}{" "}
                <Link href="/signup" className="text-primary hover:underline font-semibold">
                  {t("signup")}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
