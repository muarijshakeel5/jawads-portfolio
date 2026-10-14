import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, rotatingLines, pitch } from '../data'
import { Mail, ArrowDown, Sparkles, Terminal } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/Icons'

const techChips = [
  { label: 'React Native', color: '#61DAFB', angle: 0 },
  { label: 'Expo', color: '#E2E8F0', angle: 45 },
  { label: 'React', color: '#61DAFB', angle: 90 },
  { label: 'TypeScript', color: '#60A5FA', angle: 135 },
  { label: 'Django', color: '#34D399', angle: 180 },
  { label: 'Ruby on Rails', color: '#F87171', angle: 225 },
  { label: 'OpenAI', color: '#10A37F', angle: 270 },
  { label: 'Gemini', color: '#818CF8', angle: 315 },
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
    <div className="h-10 sm:h-12 overflow-hidden relative min-h-[40px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center"
        >
          <span
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight"
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

function PhoneMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  // Subtle 3D mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: -y * 14, y: x * 14 })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[300px] sm:max-w-[340px] h-[480px] sm:h-[520px] mx-auto select-none flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      {/* 3D Tilting Phone Body */}
      <motion.div
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          y: [-8, 8, -8],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { type: 'spring', damping: 20, stiffness: 150 },
          rotateY: { type: 'spring', damping: 20, stiffness: 150 },
        }}
        className="relative w-[230px] sm:w-[245px] h-[450px] sm:h-[480px] rounded-[40px] p-2.5 shadow-2xl overflow-hidden glass border-2"
        style={{
          background: 'linear-gradient(155deg, rgba(26,28,38,0.95), rgba(13,15,20,0.98))',
          borderColor: 'rgba(255,255,255,0.15)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,255,58,0.08)',
        }}
      >
        {/* Dynamic Notch */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full z-20 flex items-center justify-end pr-2"
          style={{ background: '#08090C' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Screen Specular Reflection Glare */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, transparent 100%)',
          }}
        />

        {/* Screen Content */}
        <div className="relative h-full rounded-[32px] pt-8 px-3.5 pb-4 flex flex-col justify-between overflow-hidden bg-black/40">
          {/* App Header */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-mono font-bold tracking-wider" style={{ color: '#D4FF3A' }}>
              IVOO.AI
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
              Live Evaluation
            </span>
          </div>

          {/* AI Score Ring with expanding ripple */}
          <div className="my-auto flex flex-col items-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-lime-400/40"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'conic-gradient(#D4FF3A 0% 87.5%, rgba(255,255,255,0.08) 87.5%)',
                  boxShadow: '0 0 25px rgba(212,255,58,0.3)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex flex-col items-center justify-center"
                  style={{ background: '#0D0F14' }}
                >
                  <span className="text-base font-extrabold font-mono" style={{ color: '#D4FF3A' }}>
                    87.5%
                  </span>
                  <span className="text-[8px] font-mono opacity-50 uppercase">Match</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] font-mono mt-1 opacity-70">Semantic Fit: Exceptional</div>
          </div>

          {/* Candidate Card Snippets */}
          <div className="space-y-1.5">
            {[
              { name: 'M. Jawad Fareed', score: '88%', col: '#D4FF3A' },
              { name: 'Aisha Khan', score: '74%', col: '#7C5CFF' },
              { name: 'Omar Malik', score: '62%', col: '#38BDF8' },
            ].map((c, i) => (
              <div
                key={c.name}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border"
                style={{
                  background: i === 0 ? 'rgba(212,255,58,0.08)' : 'rgba(255,255,255,0.03)',
                  borderColor: i === 0 ? 'rgba(212,255,58,0.25)' : 'rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ background: c.col, color: '#08090C' }}
                >
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {c.name}
                  </div>
                  <div className="w-full h-1 rounded-full bg-white/10 mt-0.5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: c.score, background: c.col }} />
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold" style={{ color: c.col }}>
                  {c.score}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Bar Indicators */}
          <div className="flex justify-center gap-1.5 pt-1">
            <span className="w-4 h-1 rounded-full bg-lime-400" />
            <span className="w-1.5 h-1 rounded-full bg-white/20" />
            <span className="w-1.5 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </motion.div>

      {/* Orbiting Floating Tech Chips */}
      {techChips.map((chip, i) => {
        const rad = (chip.angle * Math.PI) / 180
        const r = 160
        const x = Math.cos(rad) * r
        const y = Math.sin(rad) * r
        return (
          <motion.div
            key={chip.label}
            className="absolute hidden md:block pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              x: x - 42,
              y: y - 14,
            }}
            animate={{
              y: [y - 14, y - 22, y - 14],
              x: [x - 42, x - 38, x - 42],
            }}
            transition={{
              duration: 3.5 + (i % 3) * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          >
            <div
              className="px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap shadow-lg border backdrop-blur-md"
              style={{
                background: 'rgba(15, 17, 24, 0.88)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                color: chip.color || '#fff',
              }}
            >
              {chip.label}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const letterVariant = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-24 sm:pt-28 pb-16 grid-pattern"
    >
      {/* Background Gradient Orbs */}
      <div
        className="orb w-[500px] h-[500px] -top-32 -right-32 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.4) 0%, transparent 70%)' }}
      />
      <div
        className="orb w-[420px] h-[420px] bottom-0 -left-20 pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(212,255,58,0.2) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-10 xl:gap-14 items-center">
          {/* Left Column: Dramatic Typography & Value Proposition */}
          <div className="flex flex-col gap-6">
            {/* Status Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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

            {/* Massive Dramatic Typography */}
            <h1 className="overflow-hidden m-0 p-0">
              <motion.span
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col"
              >
                <span className="overflow-hidden pb-1">
                  <motion.span
                    variants={letterVariant}
                    className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-extrabold leading-[1.02] tracking-tight"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    Muhammad
                  </motion.span>
                </span>

                <span className="overflow-hidden pb-1 flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <motion.span
                    variants={letterVariant}
                    className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-extrabold leading-[1.02] tracking-tight bg-gradient-to-r from-violet-400 to-lime-300 bg-clip-text text-transparent"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Jawad
                  </motion.span>
                  <motion.span
                    variants={letterVariant}
                    className="block text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-extrabold leading-[1.02] tracking-tight"
                    style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
                  >
                    Fareed
                  </motion.span>
                </span>
              </motion.span>
            </h1>

            {/* Subhead with rotating dynamic statements */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                Founder @ IVOO · Full Stack AI Engineer
              </span>
              <RotatingLine />
            </div>

            {/* Pitch Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg max-w-xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {pitch}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3 sm:gap-4 flex-wrap pt-2"
            >
              <a
                href="#work"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-2xl text-xs font-bold font-mono tracking-wide transition-all shadow-lg hover:scale-105 active:scale-95"
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
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-2xl text-xs font-bold font-mono tracking-wide border glass transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                Download Resume (CV)
              </a>
            </motion.div>

            {/* Social Icons Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 pt-2"
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all glass hover:scale-110"
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
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Animated Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center pt-6 lg:pt-0"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-80 transition-opacity">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown size={12} className="animate-bounce" />
      </div>
    </section>
  )
}
