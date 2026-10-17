import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { personal, rotatingLines, CV_URL, CV_FILENAME } from '../data'
import { ArrowUpRight, Terminal, Download } from 'lucide-react'
import { useIntro } from '../context/IntroContext'

// ─────────────────────────────────────────────────────────────────────────────
// Unified media query hook for Stacked Layout (narrower than 1024px OR portrait)
// ─────────────────────────────────────────────────────────────────────────────
function useIsStacked() {
  const [isStacked, setIsStacked] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 1023px), (orientation: portrait)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 1023px), (orientation: portrait)')
    const update = () => setIsStacked(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isStacked
}

// ─────────────────────────────────────────────────────────────────────────────
// Small utility components
// ─────────────────────────────────────────────────────────────────────────────

function LahoreClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-PK', {
        timeZone: personal.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setTime(t)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span
      className="font-mono text-xs opacity-70 flex items-center gap-1.5"
      style={{
        color: 'var(--text-secondary)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <Terminal size={12} className="opacity-50" />
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time || '18:45:00'} PKT · Lahore</span>
    </span>
  )
}

function RotatingLine({ isStacked = false }: { isStacked?: boolean }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % rotatingLines.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`relative min-h-[36px] sm:min-h-[40px] flex items-center ${isStacked ? 'justify-center text-center' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(6px)', y: 3 }}
          animate={{
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { duration: 0.2, ease: 'easeOut' },
            transitionEnd: { filter: 'none', opacity: 1 },
          }}
          exit={{
            opacity: 0,
            filter: 'blur(6px)',
            y: -3,
            transition: { duration: 0.15, ease: 'easeIn' },
          }}
          className={`font-semibold inline-flex items-center flex-wrap ${isStacked ? 'justify-center text-center' : ''}`}
          style={{
            fontSize: isStacked ? 'clamp(1.05rem, 4.2vw, 2rem)' : 'clamp(1.5rem, 2.4vw, 2.25rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            wordSpacing: 'normal',
            color: 'var(--accent-lime)',
          }}
        >
          <span>{rotatingLines[index]}</span>
          <span
            className="inline-block ml-1.5 align-middle rounded-full hero-caret shrink-0"
            style={{
              width: '2px',
              height: '0.9em',
              backgroundColor: 'var(--accent-lime)',
            }}
            aria-hidden="true"
          />
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Rotating "AVAILABLE FOR WORK" badge — links to #contact
// ─────────────────────────────────────────────────────────────────────────────
function RotatingBadge({ isStacked }: { isStacked?: boolean }) {
  return (
    <div
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      className="cursor-pointer group select-none"
      style={
        isStacked
          ? {
              position: 'absolute',
              top: '4%',
              right: '4%',
              width: 'clamp(60px, 11vw, 96px)',
              height: 'clamp(60px, 11vw, 96px)',
              zIndex: 20,
            }
          : {}
      }
      title="Click to hire Jawad"
      aria-label="Available for work — hire Muhammad Jawad Fareed"
      role="button"
      tabIndex={0}
    >
      <div className={`relative ${isStacked ? 'w-full h-full' : 'w-[96px] h-[96px]'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path id="circlePath2" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="text-[9px] font-mono uppercase tracking-[0.22em] fill-lime-300 font-bold">
              <textPath href="#circlePath2">AVAILABLE FOR WORK • HIRE ME •{' '}</textPath>
            </text>
          </svg>
        </motion.div>
        <div
          className="absolute w-[38%] h-[38%] rounded-full flex items-center justify-center glass border transition-colors shadow-lg"
          style={{ borderColor: 'rgba(212, 255, 58, 0.4)', background: 'rgba(17, 19, 26, 0.9)' }}
        >
          <ArrowUpRight className="text-lime-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 w-[45%] h-[45%]" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CTAs: Primary Magnetic + Secondary Download
// ─────────────────────────────────────────────────────────────────────────────
function PrimaryMagneticCTA({ isStacked }: { isStacked?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.2 })
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch || !ref.current || isStacked) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) / (rect.width / 2)
    const dy = (e.clientY - centerY) / (rect.height / 2)
    x.set(Math.max(-6, Math.min(6, dx * 6)))
    y.set(Math.max(-6, Math.min(6, dy * 6)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href="#work"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: isStacked ? 0 : springX,
        y: isStacked ? 0 : springY,
        background: 'var(--accent-lime)',
        color: 'var(--accent-lime-contrast)',
        height: isStacked ? 'clamp(42px, 6vw, 56px)' : '56px',
        fontSize: isStacked ? 'clamp(0.78rem, 2vw, 1rem)' : '0.875rem',
        paddingLeft: isStacked ? 'clamp(14px, 2.8vw, 28px)' : '28px',
        paddingRight: isStacked ? 'clamp(14px, 2.8vw, 28px)' : '28px',
      }}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold select-none transition-shadow shadow-lg hover:shadow-[0_0_24px_rgba(212,255,58,0.3)] cursor-pointer ${
        isStacked ? 'hero-cta-btn w-auto' : 'h-[56px] px-7 w-full sm:w-auto'
      }`}
    >
      <span style={{ letterSpacing: 0, wordSpacing: 'normal' }}>Explore Selected Work</span>
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0B0B0C] flex items-center justify-center shrink-0">
        <ArrowUpRight
          size={14}
          className="text-[#D4FF3A] transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </motion.a>
  )
}

function SecondaryCTA({ isStacked }: { isStacked?: boolean }) {
  return (
    <a
      href={CV_URL}
      download={CV_FILENAME}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
        isStacked ? 'hero-cta-btn w-auto' : 'h-[56px] px-7 w-full sm:w-auto text-sm'
      }`}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.12)',
        background: 'rgba(255, 255, 255, 0.04)',
        color: 'var(--text-primary)',
        letterSpacing: 0,
        wordSpacing: 'normal',
        height: isStacked ? 'clamp(42px, 6vw, 56px)' : '56px',
        fontSize: isStacked ? 'clamp(0.78rem, 2vw, 1rem)' : '0.875rem',
        paddingLeft: isStacked ? 'clamp(14px, 2.8vw, 28px)' : '28px',
        paddingRight: isStacked ? 'clamp(14px, 2.8vw, 28px)' : '28px',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.10)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.20)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
      }}
    >
      <Download size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
      <span>Download Resume (CV)</span>
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Portrait — video + still + cursor spotlight
// ─────────────────────────────────────────────────────────────────────────────
function PortraitMedia({
  startTrigger,
  isStacked = false,
}: {
  startTrigger: boolean
  isStacked?: boolean
}) {
  const [portraitVisible, setPortraitVisible] = useState(false)
  const [showStill, setShowStill] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: coarse)').matches
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const spotTarget = useRef({ x: 0.5, y: 0.5 })
  const spotCurrent = useRef({ x: 0.5, y: 0.5 })
  const rafId = useRef<number | null>(null)

  // Cursor spotlight rAF loop (disabled in stacked layout)
  useEffect(() => {
    if (isTouch || isStacked) return
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      spotCurrent.current.x = lerp(spotCurrent.current.x, spotTarget.current.x, 0.06)
      spotCurrent.current.y = lerp(spotCurrent.current.y, spotTarget.current.y, 0.06)
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--sx', `${spotCurrent.current.x * 100}%`)
        spotlightRef.current.style.setProperty('--sy', `${spotCurrent.current.y * 100}%`)
      }
      rafId.current = requestAnimationFrame(tick)
    }
    const id = requestAnimationFrame(tick)
    rafId.current = id
    return () => cancelAnimationFrame(id)
  }, [isTouch, isStacked])

  // Timeline: 500ms after introDone, fade in portrait and play video (PRESERVED)
  useEffect(() => {
    if (!startTrigger) return
    const t = setTimeout(() => setPortraitVisible(true), 500)
    return () => clearTimeout(t)
  }, [startTrigger])

  // Play video with 1.5s fallback safeguard (PRESERVED)
  useEffect(() => {
    if (!portraitVisible || showStill) return
    let started = false
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.then(() => { started = true }).catch(() => setShowStill(true))
      }
    }
    const fallbackTimer = setTimeout(() => {
      if (!started && (!videoRef.current || videoRef.current.paused)) setShowStill(true)
    }, 1500)
    return () => clearTimeout(fallbackTimer)
  }, [portraitVisible, showStill])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isTouch || isStacked) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    spotTarget.current = { x: Math.max(0, Math.min(1, nx)), y: Math.max(0, Math.min(1, ny)) }
  }, [isTouch, isStacked])

  const handleVideoEnded = () => setShowStill(true)
  const handleVideoError = () => setShowStill(true)

  const desktopMask = [
    'linear-gradient(to right, transparent 0%, black 28%, black 94%, transparent 100%)',
    'linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)',
  ].join(', ')

  const stackedMask = [
    'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
    'linear-gradient(to bottom, transparent 0%, black 18%, black 60%, transparent 100%)',
  ].join(', ')

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full select-none"
      style={{ opacity: portraitVisible ? 1 : 0, transition: 'opacity 0.5s ease-out' }}
    >
      {/* Media wrapper — asymmetric mask for desktop, dual-axis intersecting mask for stacked */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage: isStacked ? stackedMask : desktopMask,
          maskImage: isStacked ? stackedMask : desktopMask,
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/hero/hero-last-frame.webp"
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: '50% 10%', filter: 'contrast(1.05) brightness(1.0) saturate(1.0)' }}
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>

        {/* Crossfade still — identical filter + position so crossfade is seamless */}
        <img
          src="/hero/hero-last-frame.webp"
          alt="Muhammad Jawad Fareed — Full Stack AI Engineer portrait"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full transition-opacity duration-[400ms] ease-in-out ${showStill ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ objectFit: 'cover', objectPosition: '50% 10%', filter: 'contrast(1.05) brightness(1.0) saturate(1.0)' }}
        />

        {/* Neutral dark vignette overlay on the portrait box */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: isStacked
              ? 'radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(11,11,12,0.85) 100%)'
              : 'linear-gradient(to right, rgba(11,11,12,0.35) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* Cursor spotlight overlay (desktop only, disabled in stacked layout) */}
      {!isTouch && !isStacked && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(circle 260px at var(--sx, 50%) var(--sy, 30%), rgba(255,255,255,0.10) 0%, transparent 100%)',
            mixBlendMode: 'screen',
            '--sx': '50%',
            '--sy': '30%',
          } as React.CSSProperties}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Name line reveal — masked slide-up (y 105% → 0) with optical stem alignment
// ─────────────────────────────────────────────────────────────────────────────
function NameLine({ children, delay, className, style, trigger = true }: {
  children: React.ReactNode
  delay: number
  className?: string
  style?: React.CSSProperties
  trigger?: boolean
}) {
  return (
    <div
      className="overflow-hidden pb-[0.12em]"
      style={{
        lineHeight: 1.05,
        marginLeft: '-0.04em',
      }}
    >
      <motion.span
        className={`block ${className ?? ''}`}
        style={style}
        initial={{ y: '105%' }}
        animate={{ y: trigger ? 0 : '105%' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Staggered reveal variants (80ms apart, used for column items below the name)
// ─────────────────────────────────────────────────────────────────────────────
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
  }),
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { introDone, introAlreadySeen } = useIntro()
  const [timelineStarted, setTimelineStarted] = useState(() => introDone)
  const sectionRef = useRef<HTMLElement>(null)
  const isStacked = useIsStacked()

  // Scroll parallax (desktop only)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.55])
  const leftColY = useTransform(scrollYProgress, [0, 1], [0, -40])

  // Timeline coordinator (PRESERVED: 8s safeguard, introAlreadySeen fast-path)
  useEffect(() => {
    if (timelineStarted) return
    if (introAlreadySeen) {
      const t = setTimeout(() => setTimelineStarted(true), 300)
      return () => clearTimeout(t)
    }
    if (introDone) {
      setTimelineStarted(true)
      return
    }
    const fallback = setTimeout(() => setTimelineStarted(true), 8000)
    return () => clearTimeout(fallback)
  }, [introDone, introAlreadySeen, timelineStarted])

  const nameBaseDelay = 0.1

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative overflow-hidden grid-pattern ${isStacked ? '' : 'lg:h-[100svh]'}`}
      style={{
        backgroundColor: '#0B0B0C',
      }}
    >
      {/* ── Scoped grain & animation keyframes ───────────────────────── */}
      <style>{`
        @keyframes hero-grain {
          0%,100%{transform:translate(0,0)}
          10%{transform:translate(-2%,-3%)}
          20%{transform:translate(3%,2%)}
          30%{transform:translate(-1%,4%)}
          40%{transform:translate(4%,-1%)}
          50%{transform:translate(-3%,3%)}
          60%{transform:translate(2%,-4%)}
          70%{transform:translate(-4%,1%)}
          80%{transform:translate(1%,3%)}
          90%{transform:translate(-2%,-2%)}
        }
        .hero-grain-overlay::after {
          content:'';
          position:absolute;
          inset:-50%;
          width:200%;
          height:200%;
          pointer-events:none;
          z-index:5;
          opacity:0.028;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px 200px;
          animation:hero-grain 0.5s steps(1) infinite;
        }
        @keyframes hero-caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-caret {
          animation: hero-caret-blink 1s steps(2, start) infinite;
        }
        @keyframes hero-scroll-line {
          0% {
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
          }
          30% {
            transform: scaleY(1);
            transform-origin: top;
            opacity: 1;
          }
          60% {
            transform: scaleY(1);
            transform-origin: bottom;
            opacity: 1;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
            opacity: 0;
          }
        }
        .hero-scroll-cue-line {
          animation: hero-scroll-line 2s ease-in-out infinite;
        }
        .hero-status-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        @media (min-width: 480px) {
          .hero-status-row {
            flex-direction: row;
            gap: 0.75rem;
          }
        }
        .hero-cta-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
        }
        @media (min-width: 420px) {
          .hero-cta-group {
            flex-direction: row;
          }
        }
        @media (max-width: 419px) {
          .hero-cta-btn {
            width: min(100%, 300px) !important;
            height: 46px !important;
          }
        }
      `}</style>

      {/* ── Background layer 1: warm neutral spotlight behind head ───── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(55% 65% at 70% 38%, rgba(255,240,222,0.09) 0%, rgba(255,240,222,0.03) 45%, transparent 75%)',
          zIndex: 0,
        }}
      />

      {/* ── Background layer 2: faint lime bloom bottom-left ─────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(40% 40% at 8% 100%, rgba(212,255,58,0.03), transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ── Bottom fade-out to site background for desktop ───── */}
      {!isStacked && (
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '12%',
            background: 'linear-gradient(to bottom, transparent 0%, #0B0B0C 100%)',
            zIndex: 6,
          }}
        />
      )}

      {/* ── Film grain ────────────────────────────────────────────────── */}
      <div className="hero-grain-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} />

      {isStacked ? (
        /* ── STACKED LAYOUT (width < 1024px OR portrait orientation) ── */
        <div className="relative z-20 w-full min-h-screen flex flex-col items-center text-center pt-20 sm:pt-24 pb-12 overflow-x-hidden">
          {/* 1. Status pill and Lahore clock, centered at top, overlaying faded top of portrait */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate={timelineStarted ? 'visible' : 'hidden'}
            className="hero-status-row relative z-20 px-4 mb-[-0.75rem] sm:mb-[-1.25rem]"
          >
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border glass max-w-full backdrop-blur-md"
              style={{
                borderColor: 'var(--border-subtle)',
                background: 'rgba(17, 19, 26, 0.75)',
                fontSize: 'clamp(0.65rem, 1.8vw, 0.85rem)',
                letterSpacing: 0,
                wordSpacing: 'normal',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot inline-block shrink-0" />
              <span className="text-emerald-400 font-semibold" style={{ letterSpacing: 0, wordSpacing: 'normal' }}>
                Available for Work &amp; AI Freelance
              </span>
            </div>
            <LahoreClock />
          </motion.div>

          {/* 2. Portrait: width min(100vw, 760px, 62svh), aspect-ratio 4/5, centered */}
          <div
            className="relative z-10 mx-auto select-none overflow-hidden"
            style={{
              width: 'min(100vw, 760px, 62svh)',
              maxWidth: '100%',
              aspectRatio: '4 / 5',
            }}
          >
            <PortraitMedia startTrigger={timelineStarted} isStacked={true} />
            <RotatingBadge isStacked={true} />
          </div>

          {/* 3. Text block, centered, overlapping bottom of portrait: margin-top = calc(portrait width * -0.3) */}
          <div
            className="relative z-20 flex flex-col items-center text-center w-full px-4"
            style={{
              marginTop: 'calc(min(100vw, 760px, 62svh) * -0.24)',
            }}
          >
            <motion.div
              className="flex flex-col items-center text-center w-full"
            >
              {/* Name: two lines, centered, clamp(1.9rem, 8.4vw, 5.25rem) */}
              <h1 className="m-0 p-0 flex flex-col items-center text-center w-full" style={{ gap: '4px', marginBottom: '18px' }}>
                <NameLine
                  delay={nameBaseDelay}
                  trigger={timelineStarted}
                  className="whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(1.9rem, 8.4vw, 5.25rem)',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    fontWeight: 300,
                    color: '#F2F1EC',
                    opacity: 0.9,
                  }}
                >
                  Muhammad
                </NameLine>

                <NameLine
                  delay={nameBaseDelay + 0.16}
                  trigger={timelineStarted}
                  className="whitespace-nowrap max-w-[88vw] mx-auto overflow-hidden text-ellipsis"
                  style={{
                    fontSize: 'clamp(1.9rem, 8.4vw, 5.25rem)',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    wordSpacing: 'normal',
                    fontWeight: 600,
                    color: '#F2F1EC',
                  }}
                >
                  Jawad Fareed
                </NameLine>
              </h1>

              {/* Rotating line with its caret, centered */}
              <motion.div
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate={timelineStarted ? 'visible' : 'hidden'}
                style={{ marginBottom: '18px' }}
                className="w-full flex justify-center text-center"
              >
                <RotatingLine isStacked={true} />
              </motion.div>

              {/* Pitch: centered, max-width 34rem, text-wrap balance */}
              <motion.p
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate={timelineStarted ? 'visible' : 'hidden'}
                className="leading-[1.6] text-center mx-auto"
                style={{
                  fontSize: 'clamp(0.85rem, 2.4vw, 1.125rem)',
                  fontWeight: 400,
                  letterSpacing: '0',
                  color: 'rgba(242, 241, 236, 0.72)',
                  maxWidth: '34rem',
                  textWrap: 'balance',
                  marginBottom: '28px',
                }}
              >
                Founder of AIVIS. I turn ideas into scalable AI, mobile and web products.
              </motion.p>

              {/* CTAs */}
              <motion.div
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate={timelineStarted ? 'visible' : 'hidden'}
                className="hero-cta-group w-full"
              >
                <PrimaryMagneticCTA isStacked={true} />
                <SecondaryCTA isStacked={true} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      ) : (
        /* ── DESKTOP LAYOUT (width >= 1024px in landscape) ── */
        <div className="relative w-full h-[100svh] max-w-[1680px] mx-auto">
          {/* Portrait — desktop anchor (height: min(100svh, 900px), aspect-ratio 17/25) */}
          <motion.div
            className="absolute bottom-0 z-10 pointer-events-auto"
            style={{
              right: '3vw',
              height: 'min(100svh, 900px)',
              width: 'auto',
              aspectRatio: '17 / 25',
              scale: portraitScale,
              opacity: portraitOpacity,
              transformOrigin: 'bottom right',
            }}
          >
            <PortraitMedia startTrigger={timelineStarted} isStacked={false} />
          </motion.div>

          {/* MAIN CONTAINER */}
          <div className="relative z-20 w-full h-full">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full h-full">
              {/* Rotating badge (Desktop) — sitting INSIDE container at top-[10%], right edge matching Hire Me button */}
              <div className="absolute top-[10%] right-4 sm:right-6 z-30 pointer-events-auto">
                <RotatingBadge />
              </div>

              {/* Scroll cue (Desktop) — 1px x 48px lime line, 24px from bottom, centered */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20"
                aria-hidden="true"
              >
                <div
                  className="hero-scroll-cue-line"
                  style={{
                    width: '1px',
                    height: '48px',
                    backgroundColor: 'var(--accent-lime)',
                  }}
                />
              </div>

              {/* Left text block: vertically centered on eye line (~47% of hero height) on desktop */}
              <div className="w-full absolute top-[47%] -translate-y-1/2 left-4 sm:left-6 max-w-[50vw] xl:max-w-[48vw] pointer-events-auto">
                <motion.div
                  className="flex flex-col"
                  style={{ y: leftColY }}
                >
                  {/* Status pill + clock */}
                  <motion.div
                    custom={0}
                    variants={textVariants}
                    initial="hidden"
                    animate={timelineStarted ? 'visible' : 'hidden'}
                    className="flex flex-row items-center gap-3 px-0"
                    style={{ marginBottom: '28px' }}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs border glass max-w-full"
                      style={{ borderColor: 'var(--border-subtle)', letterSpacing: 0, wordSpacing: 'normal' }}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot inline-block shrink-0" />
                      <span className="text-emerald-400 font-semibold" style={{ letterSpacing: 0, wordSpacing: 'normal' }}>
                        Available for Work &amp; AI Freelance
                      </span>
                    </div>
                    <div className="pl-1 sm:pl-0">
                      <LahoreClock />
                    </div>
                  </motion.div>

                  {/* Headline — masked slide-up per line with optical alignment */}
                  <h1 className="m-0 p-0 flex flex-col" style={{ gap: '4px', marginBottom: '24px' }}>
                    <NameLine
                      delay={nameBaseDelay}
                      trigger={timelineStarted}
                      className="whitespace-nowrap"
                      style={{
                        fontSize: 'clamp(3.25rem, 7.2vw, 6.75rem)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.02em',
                        fontWeight: 300,
                        color: '#F2F1EC',
                        opacity: 0.9,
                      }}
                    >
                      Muhammad
                    </NameLine>

                    <NameLine
                      delay={nameBaseDelay + 0.16}
                      trigger={timelineStarted}
                      className="whitespace-normal lg:whitespace-nowrap"
                      style={{
                        fontSize: 'clamp(3.25rem, 7.2vw, 6.75rem)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.02em',
                        wordSpacing: 'normal',
                        fontWeight: 600,
                        color: '#F2F1EC',
                      }}
                    >
                      Jawad Fareed
                    </NameLine>
                  </h1>

                  {/* Rotating line in lime with caret & blur-and-fade */}
                  <motion.div
                    custom={2}
                    variants={textVariants}
                    initial="hidden"
                    animate={timelineStarted ? 'visible' : 'hidden'}
                    style={{ marginBottom: '20px' }}
                  >
                    <RotatingLine />
                  </motion.div>

                  {/* Short sentence (max 2 lines, max-width 30rem, text-wrap: balance) */}
                  <motion.p
                    custom={3}
                    variants={textVariants}
                    initial="hidden"
                    animate={timelineStarted ? 'visible' : 'hidden'}
                    className="leading-[1.6]"
                    style={{
                      fontSize: 'clamp(1.05rem, 1.15vw, 1.25rem)',
                      fontWeight: 400,
                      letterSpacing: '0',
                      color: 'rgba(242, 241, 236, 0.72)',
                      maxWidth: '30rem',
                      textWrap: 'balance',
                      marginBottom: '36px',
                    }}
                  >
                    Founder of AIVIS. I turn ideas into scalable AI, mobile and web products.
                  </motion.p>

                  {/* Two CTAs: 56px rounded-full with magnetic pull & download */}
                  <motion.div
                    custom={4}
                    variants={textVariants}
                    initial="hidden"
                    animate={timelineStarted ? 'visible' : 'hidden'}
                    className="flex items-center gap-3 sm:gap-4 flex-wrap"
                  >
                    <PrimaryMagneticCTA />
                    <SecondaryCTA />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
