import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'
import Intro from './components/Intro'

// Sections (lazy for performance)
import Hero from './sections/Hero'
import TechMarquee from './sections/TechMarquee'
import About from './sections/About'
import IVOO from './sections/IVOO'
import Journey from './sections/Journey'
import Work from './sections/Work'
import Services from './sections/Services'
import Skills from './sections/Skills'
import BuildingInPublic from './sections/BuildingInPublic'
import Education from './sections/Education'
import Contact from './sections/Contact'

// Confetti
import confetti from 'canvas-confetti'

// SEO
import { seo } from './data'

function SEO() {
  useEffect(() => {
    document.title = seo.title
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property='${name}']` : `meta[name='${name}']`
      let el = document.querySelector(sel) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        if (prop) el.setAttribute('property', name)
        else el.setAttribute('name', name)
        document.head.appendChild(el)
      }
      el.content = content
    }
    setMeta('description', seo.description)
    setMeta('og:title', seo.title, true)
    setMeta('og:description', seo.description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', seo.canonicalUrl, true)
    setMeta('og:image', seo.ogImage, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:site', seo.twitterHandle)
    setMeta('twitter:creator', seo.twitterHandle)
    setMeta('twitter:title', seo.title)
    setMeta('twitter:description', seo.description)
    setMeta('twitter:image', seo.ogImage)

    const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
    if (canonical) {
      canonical.href = seo.canonicalUrl
    }
  }, [])
  return null
}

// Easter egg: typing "hire" triggers confetti + scroll to contact
function useEasterEgg() {
  const typed = useRef('')
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      typed.current += e.key.toLowerCase()
      typed.current = typed.current.slice(-6)
      if (typed.current.includes('hire')) {
        typed.current = ''
        // Confetti burst
        const duration = 2000
        const end = Date.now() + duration
        const colors = ['#D4FF3A', '#FFFFFF', '#F2F1EC']
        ;(function frame() {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
          })
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
          })
          if (Date.now() < end) requestAnimationFrame(frame)
        })()
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}

// Theme & Intro
import { ThemeProvider } from './context/ThemeContext'
import { IntroProvider } from './context/IntroContext'

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false)

  useEasterEgg()

  // Cmd/Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <ThemeProvider>
      <IntroProvider>
        <SEO />

        {/* Intro overlay */}
        <Intro />

      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Command palette */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Nav */}
      <Navbar />

      {/* Film grain overlay */}
      <div className="film-grain pointer-events-none" aria-hidden="true" />

      {/* Cmd+K hint */}
      <div
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono opacity-30 hover:opacity-60 transition-opacity cursor-pointer glass"
        style={{ border: '1px solid var(--border-subtle)' }}
        onClick={() => setCmdOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Open command palette"
      >
        <kbd>⌘</kbd>K
      </div>

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <TechMarquee />
        <About />
        <IVOO />
        <Journey />
        <Work />
        <Services />
        <Skills />
        <BuildingInPublic />
        <Education />
        <Contact />
      </main>
      </IntroProvider>
    </ThemeProvider>
  )
}
