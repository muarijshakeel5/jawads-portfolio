import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme: Theme = 'dark'

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
    root.style.colorScheme = 'dark'
    localStorage.setItem('mjf-theme', 'dark')
  }, [])

  const toggleTheme = () => {}
  const setTheme = () => {}

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
