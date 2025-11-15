"use client"

import { useEffect, useState } from "react"

export function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const fullText = "Welcome to Sher-e-Punjab"
  const animationDuration = 1000 // 1 second for text popup animation

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if loading page has already been shown in this session
      const hasShownLoading = sessionStorage.getItem('loadingPageShown')
      
      // Check if this is a hard refresh (full page reload)
      const perfEntries = window.performance.getEntriesByType('navigation')
      const navEntry = perfEntries[0] as PerformanceNavigationTiming | undefined
      const isHardRefresh = navEntry?.type === 'reload'
      
      // Simple logic:
      // 1. If already shown in this session and NOT a hard refresh, don't show
      // 2. If hard refresh, always show
      // 3. If first visit (not shown before), show it
      if (hasShownLoading && !isHardRefresh) {
        // Already shown in this session and it's client-side navigation - don't show
        setIsLoading(false)
      } else {
        // First visit or hard refresh - show loading page
        if (!hasShownLoading) {
          // Mark that loading page has been shown
          sessionStorage.setItem('loadingPageShown', 'true')
        }
        
        setIsLoading(true)
        const closeTimer = setTimeout(() => {
          setIsLoading(false)
        }, animationDuration)
        
        return () => clearTimeout(closeTimer)
      }
    } else {
      // On server, show loading initially
      setIsLoading(true)
    }
  }, [animationDuration])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-background via-primary/10 to-background flex items-center justify-center overflow-hidden backdrop-blur-md">
      {/* Simplified background - removed heavy blur animations for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-2xl" />
      </div>

      {/* Decorative border pattern */}
      <div className="absolute inset-0 border-4 border-primary/30 animate-maroon-glow" />
      <div className="absolute inset-4 border-2 border-accent/20" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen">
        {/* Logo - appears from top */}
        <div className="mb-8 flex justify-center animate-slide-down">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-white rounded-lg p-4 shadow-2xl">
              <img
                src="/logo-Shere-Punjab.png"
                alt="Sher-e-Punjab Logo"
                className="h-24 md:h-32 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Text content - popup animation */}
        <div className="animate-popup">
          {/* Main title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift">
              {fullText}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/80 mt-4 font-medium italic mb-8">
            Taste of Tradition, Delivered Fresh
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-primary/40" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-primary/40" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-primary/40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-primary/40" />
    </div>
  )
}
