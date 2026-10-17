import { useEffect, useRef, lazy, Suspense } from 'react'

// Components
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Intro from './components/Intro'

// Above-the-fold sections
import Hero from './sections/Hero'
import TechMarquee from './sections/TechMarquee'

// Below-the-fold sections lazy loaded for performance
const About = lazy(() => import('./sections/About'))
const IVOO = lazy(() => import('./sections/IVOO'))
const Journey = lazy(() => import('./sections/Journey'))
const Work = lazy(() => import('./sections/Work'))
const Services = lazy(() => import('./sections/Services'))
const Skills = lazy(() => import('./sections/Skills'))
const BuildingInPublic = lazy(() => import('./sections/BuildingInPublic'))
const Education = lazy(() => import('./sections/Education'))
const Contact = lazy(() => import('./sections/Contact'))

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

function SectionPlaceholder({
  id,
  minHeight = '500px',
  extraId,
}: {
  id: string
  minHeight?: string
  extraId?: string
}) {
  return (
    <section
      id={id}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ minHeight }}
      aria-hidden="true"
    >
      {extraId && <span id={extraId} className="sr-only" />}
    </section>
  )
}

export default function App() {
  useEasterEgg()

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

      {/* Nav */}
      <Navbar />

      {/* Film grain overlay */}
      <div className="film-grain pointer-events-none" aria-hidden="true" />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <TechMarquee />
        <Suspense fallback={<SectionPlaceholder id="story" minHeight="480px" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="aivis" extraId="ivoo" minHeight="750px" />}>
          <IVOO />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="journey" minHeight="600px" />}>
          <Journey />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="work" minHeight="800px" />}>
          <Work />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="services" minHeight="600px" />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="arsenal" minHeight="500px" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="public" minHeight="480px" />}>
          <BuildingInPublic />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="learning" minHeight="500px" />}>
          <Education />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder id="contact" minHeight="650px" />}>
          <Contact />
        </Suspense>
      </main>
      </IntroProvider>
    </ThemeProvider>
  )
}
