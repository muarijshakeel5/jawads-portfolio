import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, rotatingLines, pitch } from '../data'
import { Mail, ArrowDown, ArrowUpRight, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { useIntro } from '../context/IntroContext'

interface TechChip {
  label: string
  color: string
  style: React.CSSProperties
  float: number[]
  duration: number
}

// 8 Orbiting Tech Chips placed around outside of container in empty background zones only
const techChips: TechChip[] = [
  // Left side
  { label: 'OpenAI', color: '#10A37F', style: { top: '14%', left: '-12%' }, float: [0, -6, 0], duration: 3.8 },
  { label: 'Django', color: '#34D399', style: { top: '38%', left: '-20%' }, float: [0, 6, 0], duration: 4.0 },
  { label: 'React', color: '#61DAFB', style: { top: '62%', left: '-14%' }, float: [0, -6, 0], duration: 3.9 },
  // Right side
  { label: 'Gemini', color: '#818CF8', style: { top: '22%', right: '-16%' }, float: [0, 6, 0], duration: 4.6 },
  { label: 'Expo', color: '#E2E8F0', style: { top: '44%', right: '-20%' }, float: [0, -6, 0], duration: 3.6 },
  { label: 'TypeScript', color: '#60A5FA', style: { top: '66%', right: '-14%' }, float: [0, 6, 0], duration: 4.5 },
  // Top
  { label: 'React Native', color: '#61DAFB', style: { top: '-6%', left: '18%' }, float: [0, 6, 0], duration: 4.2 },
  { label: 'Ruby on Rails', color: '#F87171', style: { top: '6%', left: '30%' }, float: [0, -6, 0], duration: 4.4 },
]

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
    <div className="h-9 sm:h-10 overflow-hidden relative min-h-[36px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center"
        >
          <span
            className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight"
            style={{
              fontFamily: 'Syne, sans-serif',
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

// Circular Rotating Text Badge (96px) anchored to top -8%, right -10% of portrait container
function RotatingBadge() {
  return (
    <div
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      className="absolute z-25 cursor-pointer group select-none"
      style={{ top: '-8%', right: '-10%' }}
      title="Click to hire Jawad"
      role="button"
      tabIndex={0}
    >
      <div className="relative w-[96px] h-[96px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {/* Rotating Circular Text */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="text-[9px] font-mono uppercase tracking-[0.22em] fill-lime-300 font-bold">
              <textPath href="#circlePath">
                AVAILABLE FOR WORK • HIRE ME •{' '}
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Center Button Icon with NOTHING else inside */}
        <div
          className="absolute w-9 h-9 rounded-full flex items-center justify-center glass border transition-colors shadow-lg"
          style={{
            borderColor: 'rgba(212, 255, 58, 0.4)',
            background: 'rgba(17, 19, 26, 0.9)',
          }}
        >
          <ArrowUpRight size={16} className="text-lime-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  )
}

// Animated Stat Item for Bottom Glass Bar
function AnimatedStat({ value, suffix, label }: { value: number | string; suffix?: string; label: string }) {
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
    <div className="flex flex-col items-center sm:items-start px-2 sm:px-4 py-1">
      <div className="text-base sm:text-xl font-extrabold font-mono flex items-center" style={{ color: 'var(--accent-lime)' }}>
        <span>{displayVal}</span>
        {suffix && <span>{suffix}</span>}
      </div>
      <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
    </div>
  )
}

// Bottom Glass Stats Strip (Full Container Width, Layered Above Portrait in Z-order)
function HeroStatsStrip({ revealed }: { revealed: boolean }) {
  if (!revealed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-30 w-full glass rounded-2xl p-2.5 sm:p-3 border shadow-xl backdrop-blur-xl"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'rgba(15, 17, 24, 0.75)',
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
        <AnimatedStat value={15} suffix="K+" label="LinkedIn Followers" />
        <AnimatedStat value={3} suffix="+" label="Platforms Shipped" />
        <AnimatedStat value={8} suffix="+" label="Production Projects" />
        <div className="flex flex-col items-center sm:items-start px-2 sm:px-4 py-1 pt-2 sm:pt-1">
          <div className="text-base sm:text-xl font-extrabold font-mono" style={{ color: 'var(--accent-lime)' }}>
            Founder
          </div>
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            @ IVOO (AI Hiring)
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PortraitMedia({ startTrigger }: { startTrigger: boolean }) {
  const [portraitVisible, setPortraitVisible] = useState(false)
  const [showStill, setShowStill] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [isTouch, setIsTouch] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect touch / coarse pointer
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowStill(true)
    }
  }, [])

  // Timeline: 500ms after introDone / startTrigger, fade in portrait and play video
  useEffect(() => {
    if (!startTrigger) return

    const t = setTimeout(() => {
      setPortraitVisible(true)
    }, 500)

    return () => clearTimeout(t)
  }, [startTrigger])

  // Play video with 1.5s fallback safeguard
  useEffect(() => {
    if (!portraitVisible) return

    // If reduced motion is requested, show still immediately with no video
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowStill(true)
      return
    }

    let started = false
    if (videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            started = true
          })
          .catch(() => {
            setShowStill(true)
          })
      }
    }

    // Safeguard 4: If video fails to start within 1.5s, fall back to still image
    const fallbackTimer = setTimeout(() => {
      if (!started && (!videoRef.current || videoRef.current.paused)) {
        setShowStill(true)
      }
    }, 1500)

    return () => clearTimeout(fallbackTimer)
  }, [portraitVisible])

  // Mouse Parallax Calculation (Portrait ±6px, Chips & Card ±25px)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    const clampedX = Math.max(-1, Math.min(1, nx))
    const clampedY = Math.max(-1, Math.min(1, ny))
    setMouseOffset({ x: clampedX, y: clampedY })
  }

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 })
  }

  const handleVideoEnded = () => {
    setShowStill(true)
  }

  const handleVideoError = () => {
    setShowStill(true)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[280px] sm:max-w-[360px] lg:w-[min(46vw,640px)] lg:max-h-[calc(100svh-190px)] aspect-[4/5] h-auto mx-auto select-none flex items-center justify-center transition-opacity duration-500 ease-out ${
        portraitVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 10 }}
    >
      {/* Concentric Celestial Orbit Rings - Centered on his head at 38% down and scaled */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:flex items-center justify-center z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          className="relative w-[500px] h-[500px] lg:w-[640px] lg:h-[640px]"
        >
          <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
          <div className="absolute inset-14 rounded-full border border-dashed border-white/[0.04]" />
          <div className="absolute inset-32 rounded-full border border-white/[0.03]" />
        </motion.div>
      </div>

      {/* Large Blurred Electric-Violet Glow Halo behind portrait head (~30% down) */}
      <div
        className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] lg:w-[540px] lg:h-[540px] rounded-full pointer-events-none filter blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, #7C5CFF 0%, rgba(124, 92, 255, 0.45) 45%, transparent 72%)',
          zIndex: 0,
        }}
      />

      {/* Thin Lime Rim Glow on the left edge facing text */}
      <div
        className="absolute -left-4 top-[22%] bottom-[22%] w-16 pointer-events-none filter blur-2xl opacity-15"
        style={{
          background: 'radial-gradient(ellipse at center, #D4FF3A 0%, rgba(212, 255, 58, 0.5) 40%, transparent 80%)',
          zIndex: 1,
        }}
      />

      {/* Portrait Media Container with Mouse Parallax (±6px) */}
      <motion.div
        animate={{
          x: isTouch ? 0 : mouseOffset.x * 6,
          y: isTouch ? 0 : mouseOffset.y * 6,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 20,
        }}
        className="relative w-full h-full rounded-3xl overflow-visible z-10 flex items-end justify-center"
      >
        {/* 4-Way Masked Video & Image Wrapper (Fading top 12%, left 10%, right 10%, bottom 10%) */}
        <div
          className="relative w-full h-full overflow-hidden rounded-3xl"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 90%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 90%, transparent 100%)',
            maskComposite: 'intersect',
          }}
        >
          {/* Video element sitting on first frame until play() is called */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: '50% 18%',
              filter: 'contrast(1.1) brightness(0.95)',
            }}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Crossfade Image (400ms transition to exact last frame still) */}
          <img
            src="/hero/hero-last-frame.png"
            alt="Muhammad Jawad Fareed"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full transition-opacity duration-400 ease-in-out ${
              showStill ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              objectFit: 'cover',
              objectPosition: '50% 18%',
              filter: 'contrast(1.1) brightness(0.95)',
            }}
          />
        </div>

        {/* Circular Rotating Text Badge (96px, top: -8%, right: -10%) */}
        <RotatingBadge />

        {/* Small Floating Glass Card (Positioned to bottom: 8%, left: calc(-34% - 16px), compact, ±20px parallax) */}
        <motion.div
          animate={{
            x: isTouch ? 0 : mouseOffset.x * 20,
            y: isTouch
              ? [-3, 3, -3]
              : [mouseOffset.y * 20 - 3, mouseOffset.y * 20 + 3, mouseOffset.y * 20 - 3],
          }}
          transition={{
            x: { type: 'spring', stiffness: 90, damping: 18 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute z-20 glass rounded-2xl p-2 sm:p-2.5 border shadow-2xl backdrop-blur-xl flex items-center gap-2 select-none left-2 sm:left-4 lg:left-[calc(-34%-16px)] bottom-3 sm:bottom-4 lg:bottom-[8%]"
          style={{
            borderColor: 'rgba(212, 255, 58, 0.35)',
            background: 'rgba(17, 19, 26, 0.92)',
            boxShadow: '0 16px 36px rgba(0,0,0,0.5), 0 0 20px rgba(212, 255, 58, 0.1)',
          }}
        >
          {/* Lime radial ring - 44px */}
          <div className="relative w-[44px] h-[44px] flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="3.5"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="transparent"
                stroke="#D4FF3A"
                strokeWidth="3.5"
                strokeDasharray={2 * Math.PI * 18}
                strokeDashoffset={2 * Math.PI * 18 * (1 - 0.875)}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(212, 255, 58, 0.6))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[9px] font-extrabold font-mono leading-none tracking-tight" style={{ color: '#D4FF3A' }}>
                87.5%
              </span>
            </div>
          </div>

          {/* Metric Labels */}
          <div className="flex flex-col pr-1">
            <div className="flex items-center gap-1">
              <span className="text-[8.5px] sm:text-[9px] font-mono uppercase tracking-wider font-bold" style={{ color: '#D4FF3A' }}>
                87.5% MATCH
              </span>
              <span className="w-1.5 h-1.5 rounded-full pulse-dot inline-block" style={{ background: '#D4FF3A' }} />
            </div>
            <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-tight whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
              Semantic Fit: Exceptional
            </span>
            <span className="text-[8px] sm:text-[8.5px] font-mono opacity-60 whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
              IVOO.AI Evaluation
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 8 Orbiting Floating Tech Chips placed around outside of container in empty background zones */}
      {techChips.map((chip, i) => (
        <motion.div
          key={chip.label}
          animate={{
            x: isTouch ? 0 : mouseOffset.x * 20,
            y: isTouch
              ? chip.float
              : [mouseOffset.y * 20 + chip.float[0], mouseOffset.y * 20 + chip.float[1], mouseOffset.y * 20 + chip.float[2]],
          }}
          transition={{
            x: { type: 'spring', stiffness: 90, damping: 18 },
            y: { duration: chip.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 },
          }}
          style={chip.style}
          className="absolute z-20 pointer-events-none"
        >
          <div
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-mono whitespace-nowrap shadow-lg border backdrop-blur-md"
            style={{
              background: 'rgba(15, 17, 24, 0.88)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              color: chip.color,
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            }}
          >
            {chip.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Staggered reveal animations for hero text (80ms apart)
const textVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
}

export default function Hero() {
  const { introDone, introAlreadySeen } = useIntro()
  const [timelineStarted, setTimelineStarted] = useState(false)

  // Timeline coordinator with Intro Safeguard (8s timeout)
  useEffect(() => {
    // If intro was already seen this session, start with 300ms delay instead of waiting
    if (introAlreadySeen) {
      const t = setTimeout(() => setTimelineStarted(true), 300)
      return () => clearTimeout(t)
    }

    // When intro finishes naturally
    if (introDone) {
      setTimelineStarted(true)
      return
    }

    // Safeguard 2: Force start after 8 seconds if introDone has not fired
    const fallbackTimer = setTimeout(() => {
      setTimelineStarted(true)
    }, 8000)

    return () => clearTimeout(fallbackTimer)
  }, [introDone, introAlreadySeen])

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] lg:h-[100svh] lg:min-h-0 flex flex-col justify-between overflow-hidden pt-16 sm:pt-16 lg:pt-16 pb-6 grid-pattern"
    >
      {/* Small Vertical Mono Label on the far-left edge (rotated 90deg, hidden on mobile) */}
      <div
        className="hidden lg:flex absolute left-2 xl:left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] font-mono tracking-[0.25em] uppercase select-none pointer-events-none z-30"
        style={{ color: 'var(--text-muted)' }}
      >
        PORTFOLIO / 2026
      </div>

      {/* Background Gradient Orbs */}
      <div
        className="orb w-[500px] h-[500px] -top-32 -right-32 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.4) 0%, transparent 70%)' }}
      />
      <div
        className="orb w-[420px] h-[420px] bottom-0 -left-20 pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(212,255,58,0.2) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between relative">
        <div className="flex-1 grid lg:grid-cols-[1.25fr_0.95fr] gap-6 xl:gap-10 items-start relative">
          {/* Left Column: Dramatic Typography & Value Proposition (z-20, sits above portrait) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 relative z-20 pt-8 sm:pt-9 lg:pt-10 pb-2">
            {/* Status Pills (Index 0) */}
            <motion.div
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-3 flex-wrap"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border glass"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot inline-block" />
                <span className="text-emerald-400 font-semibold">Available for Work &amp; AI Freelance</span>
              </div>
              <LahoreClock />
            </motion.div>

            {/* Headline with expanded clamp up to ~13vw max for vertical balance (Index 1) */}
            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="overflow-hidden m-0 p-0"
            >
              <span className="flex flex-col">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.4rem,3.4vw,3.5rem)] xl:text-[clamp(2.9rem,4vw,4.2rem)] font-extrabold leading-[1.01] tracking-tight"
                  style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                >
                  Muhammad
                </span>

                <span className="flex items-baseline gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                  <span
                    className="block text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.4rem,3.4vw,3.5rem)] xl:text-[clamp(2.9rem,4vw,4.2rem)] font-extrabold leading-[1.01] tracking-tight bg-gradient-to-r from-violet-400 to-lime-300 bg-clip-text text-transparent sm:whitespace-nowrap"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Jawad
                  </span>
                  <span
                    className="block text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.4rem,3.4vw,3.5rem)] xl:text-[clamp(2.9rem,4vw,4.2rem)] font-extrabold leading-[1.01] tracking-tight sm:whitespace-nowrap"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    Fareed
                  </span>
                </span>
              </span>
            </motion.h1>

            {/* Subhead with rotating dynamic statements (Index 2) */}
            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex flex-col gap-1"
            >
              <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                Founder @ IVOO · Full Stack AI Engineer
              </span>
              <RotatingLine />
            </motion.div>

            {/* Pitch Bio (Index 3) */}
            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="text-sm sm:text-base max-w-xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {pitch}
            </motion.p>

            {/* Action Buttons (Index 4) */}
            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-3 sm:gap-4 flex-wrap pt-2 sm:pt-2.5"
            >
              <a
                href="#work"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl text-xs font-bold font-mono tracking-wide transition-all shadow-lg hover:scale-105 active:scale-95"
                style={{
                  background: 'var(--accent-lime)',
                  color: 'var(--accent-lime-contrast)',
                }}
              >
                Explore Selected Work
              </a>
              <a
                href={personal.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl text-xs font-bold font-mono tracking-wide border glass transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                Download Resume (CV)
              </a>
            </motion.div>

            {/* Social Icons Strip (Index 5) */}
            <motion.div
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate={timelineStarted ? 'visible' : 'hidden'}
              className="flex items-center gap-3 pt-1.5"
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
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all glass hover:scale-110"
                  style={{
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent-lime)'
                    e.currentTarget.style.borderColor = 'var(--accent-lime)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Desktop Portrait Anchor sitting at bottom-0, horizontal center at 72% */}
          <div className="hidden lg:block absolute bottom-0 left-[72%] -translate-x-1/2 z-10 pointer-events-auto">
            <PortraitMedia startTrigger={timelineStarted} />
          </div>

          {/* Mobile / Tablet fallback in-flow */}
          <div className="lg:hidden flex items-center justify-center z-10 py-4">
            <PortraitMedia startTrigger={timelineStarted} />
          </div>
        </div>

        {/* Bottom Area: Scroll Indicator (bottom-left) + Stats Strip */}
        <div className="relative z-30 mt-auto pt-2 flex flex-col">
          {/* Scroll Down Indicator (aligned with the left edge of the content container) */}
          <div
            className="flex items-center gap-2 mb-2 text-xs font-mono opacity-50 hover:opacity-80 transition-opacity select-none self-start"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ArrowDown size={12} className="animate-bounce" />
          </div>

          {/* Bottom Glass Stats Strip (Full Container Width) */}
          <HeroStatsStrip revealed={timelineStarted} />
        </div>
      </div>
    </section>
  )
}
