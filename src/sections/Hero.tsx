import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { personal, rotatingLines, pitch } from '../data'
import { Mail, ArrowDown, ArrowUpRight, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { useIntro } from '../context/IntroContext'

// ─────────────────────────────────────────────────────────────────────────────
// Small utility components (unchanged behaviour, kept here to avoid imports)
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
    <span className="font-mono text-xs opacity-70 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
      <Terminal size={12} className="opacity-50" />
      <span>{time || '18:45:00'} PKT · Lahore</span>
    </span>
  )
}

function RotatingLine() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % rotatingLines.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-[36px] sm:min-h-[40px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center"
        >
          <span
            className="font-semibold"
            style={{
              fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              wordSpacing: 'normal',
              color: 'var(--accent-lime)',
            }}
          >
            {rotatingLines[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Rotating "AVAILABLE FOR WORK" badge (96px) — links to #contact
// ─────────────────────────────────────────────────────────────────────────────
function RotatingBadge({ isMobile }: { isMobile?: boolean }) {
  return (
    <div
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      className="absolute z-[25] cursor-pointer group select-none"
      style={
        isMobile
          ? { top: '-16px', right: '-12px', transform: 'scale(0.8)', transformOrigin: 'top right' }
          : { top: '110px', right: '4%' }
      }
      title="Click to hire Jawad"
      role="button"
      tabIndex={0}
    >
      <div className="relative w-[96px] h-[96px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
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
          className="absolute w-9 h-9 rounded-full flex items-center justify-center glass border transition-colors shadow-lg"
          style={{ borderColor: 'rgba(212, 255, 58, 0.4)', background: 'rgba(17, 19, 26, 0.9)' }}
        >
          <ArrowUpRight size={16} className="text-lime-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Glass card 1 — 87.5% MATCH (lower-left of portrait, cleared 40px+ from hand/face)
// ─────────────────────────────────────────────────────────────────────────────
function MatchCard({ parallaxX, parallaxY, isMobile }: { parallaxX: number; parallaxY: number; isMobile?: boolean }) {
  return (
    <motion.div
      animate={{ x: parallaxX * 12, y: [parallaxY * 12 - 3, parallaxY * 12 + 3, parallaxY * 12 - 3] }}
      transition={{
        x: { type: 'spring', stiffness: 90, damping: 18 },
        y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`absolute z-[22] glass rounded-2xl p-2 sm:p-2.5 border shadow-2xl backdrop-blur-xl flex items-center gap-2 select-none ${
        isMobile ? 'scale-[0.82] origin-bottom-left max-w-[200px]' : 'w-[220px]'
      }`}
      style={{
        left: isMobile ? '2%' : '-26%',
        bottom: isMobile ? '12%' : '22%',
        borderColor: 'rgba(212, 255, 58, 0.35)',
        background: 'rgba(12, 13, 20, 0.94)',
        boxShadow: '0 16px 36px rgba(0,0,0,0.6), 0 0 20px rgba(212, 255, 58, 0.08)',
      }}
    >
      {/* Radial ring */}
      <div className="relative w-[44px] h-[44px] flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
          <circle
            cx="22" cy="22" r="18"
            fill="transparent"
            stroke="#D4FF3A"
            strokeWidth="3.5"
            strokeDasharray={2 * Math.PI * 18}
            strokeDashoffset={2 * Math.PI * 18 * (1 - 0.875)}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px rgba(212,255,58,0.6))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-semibold leading-none" style={{ color: '#D4FF3A', letterSpacing: 0 }}>87.5%</span>
        </div>
      </div>
      {/* Labels */}
      <div className="flex flex-col pr-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: '#D4FF3A' }}>87.5% MATCH</span>
          <span className="w-1.5 h-1.5 rounded-full pulse-dot inline-block" style={{ background: '#D4FF3A' }} />
        </div>
        <span className="text-[11px] sm:text-[12px] font-semibold whitespace-nowrap truncate" style={{ color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}>
          Semantic Fit: Exceptional
        </span>
        <span className="text-[11px] opacity-60 whitespace-nowrap" style={{ color: 'var(--text-secondary)', letterSpacing: 0 }}>
          IVOO.AI Evaluation
        </span>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Glass card 2 — NOW BUILDING (upper-left of portrait, cleared 40px+ from face/ear)
// ─────────────────────────────────────────────────────────────────────────────
function NowBuildingCard({ parallaxX, parallaxY, isMobile }: { parallaxX: number; parallaxY: number; isMobile?: boolean }) {
  return (
    <motion.div
      animate={{ x: parallaxX * 12, y: [parallaxY * 12 + 3, parallaxY * 12 - 3, parallaxY * 12 + 3] }}
      transition={{
        x: { type: 'spring', stiffness: 90, damping: 18 },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`absolute z-[22] glass rounded-2xl p-2 sm:p-2.5 border shadow-2xl backdrop-blur-xl flex items-center gap-2.5 select-none ${
        isMobile ? 'scale-[0.82] origin-top-left max-w-[200px]' : 'w-[230px]'
      }`}
      style={{
        left: isMobile ? '2%' : 'calc(-14% + 40px)',
        top: isMobile ? '28%' : 'calc(24% - 30px)',
        borderColor: 'rgba(124, 92, 255, 0.3)',
        background: 'rgba(12, 13, 20, 0.94)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.5), 0 0 16px rgba(124, 92, 255, 0.08)',
      }}
    >
      {/* Pulsing dot */}
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(212,255,58,0.1)', border: '1px solid rgba(212,255,58,0.25)' }}>
        <span className="w-2 h-2 rounded-full pulse-dot inline-block" style={{ background: '#D4FF3A' }} />
      </div>
      <div className="flex flex-col pr-0.5 min-w-0">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: '#D4FF3A' }}>
          NOW BUILDING
        </span>
        <span className="text-[11px] sm:text-[12px] font-semibold whitespace-nowrap truncate" style={{ color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}>
          Perfect Pairing
        </span>
        <span className="text-[11px] opacity-60 whitespace-nowrap" style={{ color: 'var(--text-secondary)', letterSpacing: 0 }}>
          AI food &amp; drink pairing app
        </span>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Slim stats strip (single row, inline number + label)
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedStatInline({ value, suffix, label }: { value: number | string; suffix?: string; label: string }) {
  const [displayVal, setDisplayVal] = useState(typeof value === 'number' ? 0 : value)

  useEffect(() => {
    if (typeof value !== 'number') return
    const duration = 1200
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setDisplayVal(Math.floor(value * eased))
      if (elapsed < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [value])

  return (
    <div className="flex items-baseline gap-2.5 px-3 py-1.5">
      <span className="text-[1.5rem] font-semibold tracking-[-0.01em]" style={{ color: 'var(--accent-lime)', lineHeight: 1 }}>
        {displayVal}{suffix}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </div>
  )
}

function HeroStatsStrip({ revealed }: { revealed: boolean }) {
  if (!revealed) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="hidden lg:block absolute bottom-5 left-0 right-0 z-40 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pointer-events-auto">
        <div
          className="glass rounded-2xl border shadow-xl backdrop-blur-xl overflow-hidden"
          style={{
            borderColor: 'var(--border-subtle)',
            background: 'rgba(10, 11, 18, 0.85)',
            height: '64px',
          }}
        >
          <div className="grid grid-cols-4 h-full relative">
            <div className="flex items-center justify-center relative">
              <AnimatedStatInline value={15} suffix="K+" label="LinkedIn Followers" />
            </div>
            <div className="flex items-center justify-center relative">
              <div
                className="absolute left-0 top-[20%] bottom-[20%] w-[1px] pointer-events-none"
                style={{ background: 'rgba(255, 255, 255, 0.08)' }}
              />
              <AnimatedStatInline value={3} suffix="+" label="Platforms Shipped" />
            </div>
            <div className="flex items-center justify-center relative">
              <div
                className="absolute left-0 top-[20%] bottom-[20%] w-[1px] pointer-events-none"
                style={{ background: 'rgba(255, 255, 255, 0.08)' }}
              />
              <AnimatedStatInline value={8} suffix="+" label="Production Projects" />
            </div>
            <div className="flex items-center justify-center relative">
              <div
                className="absolute left-0 top-[20%] bottom-[20%] w-[1px] pointer-events-none"
                style={{ background: 'rgba(255, 255, 255, 0.08)' }}
              />
              <div className="flex items-baseline gap-2.5 px-3 py-1.5">
                <span className="text-[1.5rem] font-semibold tracking-[-0.01em]" style={{ color: 'var(--accent-lime)', lineHeight: 1 }}>
                  Founder
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--text-secondary)' }}>
                  @ IVOO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileStatsGrid({ revealed }: { revealed: boolean }) {
  if (!revealed) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      <div
        className="glass rounded-2xl border shadow-xl backdrop-blur-xl p-3 grid grid-cols-2 gap-2"
        style={{
          borderColor: 'var(--border-subtle)',
          background: 'rgba(10, 11, 18, 0.88)',
        }}
      >
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[1.4rem] font-semibold tracking-[-0.01em]" style={{ color: 'var(--accent-lime)', lineHeight: 1 }}>15K+</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--text-secondary)' }}>LinkedIn Followers</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[1.4rem] font-semibold tracking-[-0.01em]" style={{ color: 'var(--accent-lime)', lineHeight: 1 }}>3+</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--text-secondary)' }}>Platforms Shipped</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[1.4rem] font-semibold tracking-[-0.01em]" style={{ color: 'var(--accent-lime)', lineHeight: 1 }}>8+</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--text-secondary)' }}>Production Projects</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[1.4rem] font-semibold tracking-[-0.01em]" style={{ color: 'var(--accent-lime)', lineHeight: 1 }}>Founder</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--text-secondary)' }}>@ IVOO</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Portrait — video + still + cursor spotlight + floating cards
// ─────────────────────────────────────────────────────────────────────────────
function PortraitMedia({ startTrigger, isMobile = false }: { startTrigger: boolean; isMobile?: boolean }) {
  const [portraitVisible, setPortraitVisible] = useState(false)
  const [showStill, setShowStill] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Cursor spotlight state (lerped via rAF)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const spotTarget = useRef({ x: 0.5, y: 0.3 })
  const spotCurrent = useRef({ x: 0.5, y: 0.3 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowStill(true)
    }
  }, [])

  // Cursor spotlight rAF loop
  useEffect(() => {
    if (isTouch) return
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
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [isTouch])

  // Timeline: 500ms after introDone, fade in portrait and play video (PRESERVED)
  useEffect(() => {
    if (!startTrigger) return
    const t = setTimeout(() => setPortraitVisible(true), 500)
    return () => clearTimeout(t)
  }, [startTrigger])

  // Play video with 1.5s fallback safeguard (PRESERVED)
  useEffect(() => {
    if (!portraitVisible) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowStill(true)
      return
    }
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
  }, [portraitVisible])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    const cx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const cy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    if (!isTouch) {
      spotTarget.current = { x: Math.max(0, Math.min(1, nx)), y: Math.max(0, Math.min(1, ny)) }
      setMouseOffset({ x: Math.max(-1, Math.min(1, cx)), y: Math.max(-1, Math.min(1, cy)) })
    }
  }, [isTouch])

  const handleMouseLeave = () => setMouseOffset({ x: 0, y: 0 })
  const handleVideoEnded = () => setShowStill(true)
  const handleVideoError = () => setShowStill(true)

  const px = isTouch ? 0 : mouseOffset.x
  const py = isTouch ? 0 : mouseOffset.y

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full select-none"
      style={{ opacity: portraitVisible ? 1 : 0, transition: 'opacity 0.5s ease-out' }}
    >
      {/* Media wrapper — strong asymmetric mask */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage: [
            'linear-gradient(to right, transparent 0%, black 28%, black 94%, transparent 100%)',
            'linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)',
          ].join(', '),
          WebkitMaskComposite: 'source-in',
          maskImage: [
            'linear-gradient(to right, transparent 0%, black 28%, black 94%, transparent 100%)',
            'linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)',
          ].join(', '),
          maskComposite: 'intersect',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
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
          src="/hero/hero-last-frame.png"
          alt="Muhammad Jawad Fareed"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full transition-opacity duration-[400ms] ease-in-out ${showStill ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ objectFit: 'cover', objectPosition: '50% 10%', filter: 'contrast(1.05) brightness(1.0) saturate(1.0)' }}
        />

        {/* Violet-tinted soft-light overlay blending portrait into ink-violet background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(160deg, rgba(124,92,255,0.18) 0%, rgba(26,21,48,0.25) 50%, transparent 80%)',
            mixBlendMode: 'soft-light',
            opacity: 0.35,
          }}
        />
      </div>

      {/* Cursor spotlight overlay — mix-blend-mode screen, follows lerped mouse position */}
      {!isTouch && (
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

      {/* Rotating badge — top-right */}
      <RotatingBadge isMobile={isMobile} />

      {/* Glass card 1 — 87.5% MATCH */}
      <MatchCard parallaxX={px} parallaxY={py} isMobile={isMobile} />

      {/* Glass card 2 — NOW BUILDING */}
      <NowBuildingCard parallaxX={px} parallaxY={py} isMobile={isMobile} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Name line reveal — masked slide-up (y 105% → 0)
// ─────────────────────────────────────────────────────────────────────────────
function NameLine({ children, delay, className, style }: {
  children: React.ReactNode
  delay: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className="overflow-hidden pb-[0.12em]" style={{ lineHeight: 1.05 }}>
      <motion.span
        className={`block ${className ?? ''}`}
        style={style}
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
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
  const [timelineStarted, setTimelineStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.55])
  const leftColY = useTransform(scrollYProgress, [0, 1], [0, -40])

  // Timeline coordinator (PRESERVED: 8s safeguard, introAlreadySeen fast-path)
  useEffect(() => {
    if (introAlreadySeen) {
      const t = setTimeout(() => setTimelineStarted(true), 300)
      return () => clearTimeout(t)
    }
    if (introDone) { setTimelineStarted(true); return }
    const fallback = setTimeout(() => setTimelineStarted(true), 8000)
    return () => clearTimeout(fallback)
  }, [introDone, introAlreadySeen])

  const nameBaseDelay = 0.1

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden grid-pattern"
      style={{
        minHeight: '100svh',
        background: '#0A0A0F',
      }}
    >
      {/* ── Scoped grain keyframes ─────────────────────────────────────── */}
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
        .hero-divide > *:not(:last-child) {
          border-right: 1px solid rgba(255,255,255,0.07);
        }
      `}</style>

      {/* ── Background layer 1: violet spotlight ─────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(55% 65% at 70% 38%, rgba(124,92,255,0.22) 0%, rgba(26,21,48,0.5) 45%, transparent 75%)',
          zIndex: 0,
        }}
      />

      {/* ── Background layer 2: lime bloom bottom-left ────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(40% 40% at 8% 100%, rgba(212,255,58,0.06), transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ── Bottom fade-out to site background (no seam with next section) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '12%',
          background: 'linear-gradient(to bottom, transparent 0%, #08090C 100%)',
          zIndex: 6,
        }}
      />

      {/* ── Film grain ────────────────────────────────────────────────── */}
      <div className="hero-grain-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} />

      {/* ── Editorial corner registration marks & coordinates (navbar grid aligned) ─── */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full relative">
          <div className="absolute top-20 left-4 sm:left-6 text-[11px] font-mono select-none" style={{ color: 'rgba(255,255,255,0.28)' }}>+</div>
          <div className="absolute top-20 right-4 sm:right-6 text-[11px] font-mono select-none" style={{ color: 'rgba(255,255,255,0.28)' }}>+</div>
          <div className="absolute bottom-[90px] left-4 sm:left-6 text-[11px] font-mono select-none" style={{ color: 'rgba(255,255,255,0.28)' }}>+</div>
          <div className="absolute bottom-[90px] right-4 sm:right-6 text-[11px] font-mono select-none" style={{ color: 'rgba(255,255,255,0.28)' }}>+</div>

          {/* Coordinates label (right edge aligned with 'Hire me' button grid, spaced before the corner '+' mark) */}
          <div
            className="absolute items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em] select-none right-10 sm:right-12"
            style={{ color: 'rgba(255,255,255,0.35)', top: '78px' }}
          >
            31.55° N · 74.34° E / LAHORE, PK
          </div>
        </div>
      </div>

      {/* ── Vertical "PORTFOLIO / 2026" label (outer left gutter, hidden below 1340px so it never overlaps content) ───── */}
      <div
        className="hidden min-[1340px]:flex absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[11px] font-medium tracking-[0.12em] uppercase select-none pointer-events-none z-30"
        style={{ color: 'var(--text-muted)' }}
      >
        PORTFOLIO / 2026
      </div>

      {/* ── PORTRAIT — desktop right anchor (height: min(100svh, 900px), aspect-ratio 17/25) ── */}
      <motion.div
        className="hidden lg:block absolute top-0 z-10 pointer-events-auto"
        style={{
          right: '3vw',
          height: 'min(100svh, 900px)',
          width: 'auto',
          aspectRatio: '17 / 25',
          scale: portraitScale,
          opacity: portraitOpacity,
          transformOrigin: 'top right',
        }}
      >
        <PortraitMedia startTrigger={timelineStarted} />
      </motion.div>

      {/* ── MAIN CONTENT (left column) ─────────────────────────── */}
      <div className="relative z-20 w-full min-h-[100svh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col justify-center pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-8 lg:pb-20 xl:pt-10 xl:pb-22 min-h-[100svh]">
          <motion.div
            className="flex flex-col gap-1.5 sm:gap-2 lg:gap-1.5 xl:gap-2 lg:max-w-[50vw] xl:max-w-[50vw]"
            style={{ y: leftColY }}
          >
            {/* Status pill + clock (index 0) */}
            <motion.div
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-3 flex-wrap"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border glass"
                style={{ borderColor: 'var(--border-subtle)', letterSpacing: 0, wordSpacing: 'normal' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot inline-block" />
                <span className="text-emerald-400 font-semibold" style={{ letterSpacing: 0, wordSpacing: 'normal' }}>Available for Work &amp; AI Freelance</span>
              </div>
              <LahoreClock />
            </motion.div>

            {/* Headline — masked slide-up per line */}
            {timelineStarted && (
              <h1 className="m-0 p-0 flex flex-col" style={{ gap: '4px' }}>
                <NameLine
                  delay={nameBaseDelay}
                  className="font-semibold whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(3rem, 6.8vw, 6.25rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                  }}
                >
                  Muhammad
                </NameLine>

                <NameLine
                  delay={nameBaseDelay + 0.16}
                  className="font-semibold whitespace-normal lg:whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(3rem, 6.8vw, 6.25rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    wordSpacing: 'normal',
                  }}
                >
                  <span className="bg-gradient-to-r from-violet-400 to-lime-300 bg-clip-text text-transparent">
                    Jawad
                  </span>{' '}
                  <span style={{ color: 'var(--text-primary)' }}>
                    Fareed
                  </span>
                </NameLine>
              </h1>
            )}

            {/* Subhead + rotating line (index 2, no overflow-hidden on wrapper) */}
            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex flex-col gap-2 sm:gap-2.5"
            >
              <span
                className="text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.12em] opacity-60"
                style={{ color: 'var(--text-secondary)' }}
              >
                Founder @ IVOO · Full Stack AI Engineer
              </span>
              <RotatingLine />
            </motion.div>

            {/* Pitch (index 3) */}
            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="leading-[1.65]"
              style={{
                fontSize: 'clamp(1.125rem, 1.2vw, 1.25rem)',
                fontWeight: 400,
                letterSpacing: '0',
                lineHeight: 1.65,
                color: 'rgba(242, 241, 236, 0.72)',
                maxWidth: '32rem',
              }}
            >
              {pitch}
            </motion.p>

            {/* CTAs (index 4) */}
            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-3 sm:gap-4 flex-wrap pt-0.5"
            >
              <a
                href="#work"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95"
                style={{
                  background: 'var(--accent-lime)',
                  color: 'var(--accent-lime-contrast)',
                  letterSpacing: '0',
                  wordSpacing: 'normal',
                }}
              >
                Explore Selected Work
              </a>
              <a
                href={personal.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold border glass transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                  letterSpacing: '0',
                  wordSpacing: 'normal',
                }}
              >
                Download Resume (CV)
              </a>
            </motion.div>

            {/* Social icons (index 5) */}
            <motion.div
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-2.5 pt-0.5"
            >
              {[
                { icon: GithubIcon, href: personal.github, label: 'GitHub' },
                { icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all glass hover:scale-110"
                  style={{ color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent-lime)'
                    e.currentTarget.style.borderColor = 'var(--accent-lime)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>

            {/* Stack mono row (index 6) */}
            <motion.div
              custom={6}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-2.5 flex-wrap overflow-hidden pt-0.5"
              style={{ maxWidth: '480px' }}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                STACK
              </span>
              {['React', 'React Native', 'Django', 'Rails', 'OpenAI', 'Gemini'].map((tech, i, arr) => (
                <span key={tech} className="flex items-center gap-2">
                  <span
                    className="text-[11px] sm:text-[12px] font-medium"
                    style={{
                      letterSpacing: 0,
                      wordSpacing: 'normal',
                      color: 'var(--text-secondary)',
                      background: 'linear-gradient(90deg, var(--text-secondary) 0%, rgba(212,255,58,0.7) 50%, var(--text-secondary) 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: `hero-shimmer ${3 + i * 0.4}s linear infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {tech}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent-lime)', opacity: 0.6 }} />
                  )}
                </span>
              ))}
              <style>{`
                @keyframes hero-shimmer {
                  0%{background-position:200% center}
                  100%{background-position:-200% center}
                }
              `}</style>
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
              custom={7}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-2 pt-1 text-xs opacity-50 hover:opacity-80 transition-opacity select-none self-start"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.12em]">Scroll</span>
              <ArrowDown size={12} className="animate-bounce" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile portrait + mobile stats grid (below 1024px, in-flow) ─── */}
      <div className="lg:hidden px-4 sm:px-6 pb-12 z-10 relative flex flex-col gap-6 pt-6">
        <div className="relative w-full aspect-[4/5] mx-auto max-w-sm">
          <PortraitMedia startTrigger={timelineStarted} isMobile={true} />
        </div>
        <MobileStatsGrid revealed={timelineStarted} />
      </div>

      {/* ── Desktop Stats strip (absolute, bottom: 20px, z-40 above portrait) ── */}
      <HeroStatsStrip revealed={timelineStarted} />
    </section>
  )
}
