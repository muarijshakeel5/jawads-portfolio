import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import { ivoo } from '../data'
import {
  ExternalLink, CheckCircle2, AlertTriangle, Mic, ShieldCheck,
  Video, FileCheck, Activity, Users, Play, Pause, Sparkles, Check
} from 'lucide-react'

const TABS = [
  { id: 'CV Match', label: 'CV Match', icon: FileCheck },
  { id: 'AI Interview', label: 'AI Interview', icon: Video },
  { id: 'Scorecard', label: 'Scorecard', icon: Activity },
  { id: 'Recruiter View', label: 'Recruiter View', icon: Users },
] as const

type TabId = typeof TABS[number]['id']

// ── Shared Animated Radial Gauge ──────────────────────────────────
function AnimatedRadialGauge({
  score,
  label,
  sublabel,
  size = 110,
  strokeWidth = 9,
  accentColor = '#D4FF3A',
}: {
  score: number
  label: string
  sublabel?: string
  size?: number
  strokeWidth?: number
  accentColor?: string
}) {
  const [displayScore, setDisplayScore] = useState(0)
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    let start = 0
    const duration = 1400
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - elapsed, 3)
      setDisplayScore(parseFloat((score * ease).toFixed(1)))
      if (elapsed < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [score])

  const strokeDashoffset = circumference * (1 - displayScore / 100)

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        {/* Glow backdrop */}
        <div
          className="absolute inset-2 rounded-full opacity-20 blur-md pointer-events-none"
          style={{ background: accentColor }}
        />
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: 0 }}>
            {displayScore}%
          </span>
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}>
          {label}
        </div>
        {sublabel && (
          <div className="text-xs opacity-60 mt-0.5" style={{ color: 'var(--text-secondary)', letterSpacing: 0 }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tab 1: CV Match ───────────────────────────────────────────────
function CVMatchTab() {
  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      {/* Left: Parsed Document Mockup */}
      <div
        className="lg:col-span-5 rounded-2xl p-5 border flex flex-col gap-4 relative overflow-hidden glass"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-lime-400/10 text-lime-400 font-mono text-xs">
              PDF
            </div>
            <div>
              <div className="text-xs font-semibold font-mono" style={{ color: 'var(--text-primary)' }}>
                jawad_fareed_cv.pdf
              </div>
              <div className="text-[10px] opacity-50 font-mono">1.2 MB · Semantic Parsed</div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Validated
          </span>
        </div>

        {/* Candidate Profile Details */}
        <div className="space-y-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="text-[10px] uppercase opacity-40 block mb-1">Target Profile</span>
            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Senior Full Stack AI Engineer
            </div>
            <div className="text-[11px] opacity-60">IVOO Core Platform Architecture</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="text-[10px] uppercase opacity-40 block mb-1">Extracted Experience</span>
            <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              4+ years engineering scalable web & mobile apps. Founder @ IVOO, Software Engineer @ Arkhitech.
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border" style={{ borderColor: 'var(--border-subtle)' }}>
            <span className="text-[10px] uppercase opacity-40 block mb-1">Education & GPA</span>
            <div className="text-[11px] text-lime-400 font-semibold">
              BS CS (UCP Lahore) · 3.49 GPA
            </div>
          </div>
        </div>
      </div>

      {/* Right: AI Match Telemetry */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        {/* Animated Radial Score */}
        <div className="p-4 rounded-2xl glass border flex items-center justify-between flex-wrap gap-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <AnimatedRadialGauge
            score={87.5}
            label="Semantic Fit Score"
            sublabel="Top 3% of 420 Applicants"
            accentColor="#D4FF3A"
          />
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-lime-400/15 text-lime-400 border border-lime-400/30">
              <Sparkles size={12} /> Exceptional Match
            </span>
            <div className="text-[11px] opacity-50 font-mono mt-1">Recommended for Fast-Track</div>
          </div>
        </div>

        {/* Competency Pillar Bars */}
        <div className="space-y-2.5">
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] opacity-50">Competency Breakdown</div>
          {[
            { pillar: 'AI & LLM Integration (OpenAI, Gemini, RAG)', pct: 94, color: '#D4FF3A' },
            { pillar: 'Frontend Architecture (React, TypeScript, Tailwind)', pct: 92, color: '#7C5CFF' },
            { pillar: 'Backend Services (Django, Rails, FastAPI, SQL)', pct: 88, color: '#38BDF8' },
            { pillar: 'Mobile & Desktop (React Native, Expo, Electron)', pct: 85, color: '#F472B6' },
          ].map(c => (
            <div key={c.pillar} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="opacity-70">{c.pillar}</span>
                <span className="font-bold" style={{ color: c.color }}>{c.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: c.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Matched vs Missing Chips */}
        <div className="grid sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl border glass" style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mb-2 font-semibold">
              <CheckCircle2 size={12} /> Matched Skills (12)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'TypeScript', 'Django', 'Rails', 'OpenAI', 'Expo'].map(s => (
                <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl border glass" style={{ borderColor: 'rgba(234,179,8,0.2)' }}>
            <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1 mb-2 font-semibold">
              <AlertTriangle size={12} /> Secondary Learning Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Kubernetes', 'Go'].map(s => (
                <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {s} (Cert verified)
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Tab 2: AI Interview (Live Simulation) ──────────────────────────
function AIInterviewTab() {
  return (
    <div className="space-y-5">
      {/* Video Call Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left: AI Avatar Interviewer */}
        <div
          className="relative rounded-2xl overflow-hidden aspect-video border flex flex-col justify-between p-4 glass"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(124,92,255,0.18), rgba(17,19,26,0.95))',
            borderColor: 'rgba(124,92,255,0.3)',
          }}
        >
          {/* Top Status */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pulse-dot" />
              IVOO NEURAL INTERVIEWER
            </span>
            <span className="text-[10px] font-mono opacity-50">STT Model: Whisper-v3</span>
          </div>

          {/* Avatar Graphic with Audio Pulse */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl"
                style={{ background: 'linear-gradient(135deg, #7C5CFF, #4F46E5)' }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                🤖
              </motion.div>
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-violet-400/40 pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </div>
          </div>

          {/* AI Question Prompt Ticker */}
          <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs leading-relaxed font-mono">
            <span className="text-violet-400 font-semibold block mb-0.5 text-[10px] uppercase">
              Current Interview Question #3:
            </span>
            “How did you architect the real-time scoring telemetry for IVOO to keep pipeline latency under 200ms?”
          </div>
        </div>

        {/* Right: Candidate Stream with HUD telemetry */}
        <div
          className="relative rounded-2xl overflow-hidden aspect-video border flex flex-col justify-between p-4 glass"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(212,255,58,0.1), rgba(17,19,26,0.95))',
            borderColor: 'rgba(212,255,58,0.25)',
          }}
        >
          {/* Top HUD */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot" />
              LIVE PROCTORED REC [03:44]
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={12} /> Integrity: 99.4%
            </span>
          </div>

          {/* Candidate Mesh Target */}
          <div className="relative my-auto flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-2xl border border-dashed border-lime-400/40 flex items-center justify-center relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg bg-lime-400/20 text-lime-400">
                MJF
              </div>
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-lime-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-lime-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-lime-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-lime-400" />
            </div>
            <div className="mt-2 text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-full border border-lime-400/20">
              Facial Engagement: 98% (Attentive)
            </div>
          </div>

          {/* Real-time Subtitle Stream */}
          <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono opacity-85 leading-relaxed">
            <span className="text-lime-400 text-[10px] uppercase block font-semibold">Candidate Live Speech:</span>
            “We deployed asynchronous WebSockets with Celery tasks and Redis pub/sub to stream audio chunks concurrently…”
          </div>
        </div>
      </div>

      {/* 28-Bar Multi-Frequency Audio Waveform */}
      <div className="p-3.5 rounded-2xl glass border flex items-center justify-between gap-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2 text-xs font-mono text-lime-400">
          <Mic size={14} className="pulse-dot" />
          <span className="font-semibold hidden sm:inline">Voice Spectral Stream:</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 h-7">
          {[
            12, 24, 8, 30, 16, 28, 6, 22, 34, 18, 26, 10, 32, 20, 14, 28, 8, 30, 16, 24, 12, 26, 32, 18, 10, 22, 14, 28,
          ].map((h, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{
                background: i % 2 === 0 ? 'var(--accent-lime)' : 'var(--accent-violet)',
              }}
              animate={{ height: [`${Math.max(4, h * 0.25)}px`, `${h}px`, `${Math.max(4, h * 0.3)}px`] }}
              transition={{
                duration: 0.7 + (i % 5) * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.03,
              }}
            />
          ))}
        </div>
        <div className="text-[10px] font-mono opacity-50">48kHz HD Audio</div>
      </div>
    </div>
  )
}

// ── Tab 3: Scorecard (Deep Candidate Assessment) ───────────────────
const radarData = [
  { subject: 'Content Merit', score: 94 },
  { subject: 'Voice Fluency', score: 88 },
  { subject: 'Facial Engagement', score: 85 },
  { subject: 'Technical Depth', score: 96 },
  { subject: 'Communication', score: 90 },
]

function ScorecardTab() {
  return (
    <div className="grid lg:grid-cols-12 gap-6 items-center">
      {/* Radar Chart */}
      <div className="lg:col-span-6 h-64 sm:h-72 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="55%"
            data={radarData}
            margin={{ top: 12, right: 48, bottom: 12, left: 48 }}
          >
            <PolarGrid stroke="var(--border-subtle)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontFamily: "'Clash Grotesk', sans-serif" }}
            />
            <Radar
              name="Muhammad Jawad Fareed"
              dataKey="score"
              stroke="#D4FF3A"
              fill="#D4FF3A"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dual Gauges & Metrics */}
      <div className="lg:col-span-6 space-y-4">
        {/* Dual Gauges */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl glass border" style={{ borderColor: 'var(--border-subtle)' }}>
            <AnimatedRadialGauge
              score={94}
              label="Technical Depth"
              sublabel="Lead Level Benchmark"
              size={85}
              strokeWidth={7}
              accentColor="#D4FF3A"
            />
          </div>
          <div className="p-3.5 rounded-2xl glass border" style={{ borderColor: 'var(--border-subtle)' }}>
            <AnimatedRadialGauge
              score={88}
              label="Overall Quotient"
              sublabel="Top 5% Category"
              size={85}
              strokeWidth={7}
              accentColor="#7C5CFF"
            />
          </div>
        </div>

        {/* Detailed Breakdown Bars */}
        <div className="space-y-2 p-4 rounded-2xl glass border" style={{ borderColor: 'var(--border-subtle)' }}>
          {[
            { label: 'Technical Accuracy & Problem Solving', val: 96, color: '#D4FF3A' },
            { label: 'Speech Fluency & Articulation', val: 90, color: '#7C5CFF' },
            { label: 'System Design & Architectural Vision', val: 94, color: '#38BDF8' },
          ].map(m => (
            <div key={m.label} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="opacity-70">{m.label}</span>
                <span className="font-bold" style={{ color: m.color }}>{m.val}/100</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.val}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: m.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI Final Hiring Recommendation */}
        <div className="p-3 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-lime-400 text-black flex items-center justify-center shrink-0 font-bold">
            <Check size={16} />
          </div>
          <div className="text-xs font-mono">
            <span className="font-bold text-lime-400 uppercase block">AI Hiring Verdict: Definite Hire</span>
            <span className="opacity-70">Exceeded standard senior baseline across all 5 evaluation metrics.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Tab 4: Recruiter View ──────────────────────────────────────────
const recruiterCandidates = [
  { name: 'Muhammad Jawad Fareed', role: 'Full Stack AI Engineer', match: 88, status: 'Top Pick / Offer', verified: true, avatar: 'MJ' },
  { name: 'Aisha Tariq', role: 'Backend Rails Developer', match: 78, status: 'Interview Completed', verified: true, avatar: 'AT' },
  { name: 'Hamza Malik', role: 'React Native Specialist', match: 74, status: 'Technical Review', verified: false, avatar: 'HM' },
  { name: 'Sara Qureshi', role: 'Frontend Engineer', match: 65, status: 'Screening Passed', verified: false, avatar: 'SQ' },
]

function RecruiterViewTab() {
  const [playing, setPlaying] = useState<number | null>(null)
  const [actionDone, setActionDone] = useState(false)

  return (
    <div className="space-y-3 font-mono">
      {/* Table Header */}
      <div className="grid grid-cols-12 text-[11px] font-medium uppercase tracking-[0.12em] opacity-40 px-3 py-1">
        <span className="col-span-5 sm:col-span-4">Candidate</span>
        <span className="col-span-3 sm:col-span-3">AI Score</span>
        <span className="hidden sm:block sm:col-span-3">Status</span>
        <span className="col-span-4 sm:col-span-2 text-right">Action</span>
      </div>

      {/* Rows */}
      {recruiterCandidates.map((c, i) => {
        const isTop = i === 0
        return (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="grid grid-cols-12 items-center p-3 rounded-xl border transition-all text-xs"
            style={{
              background: isTop ? 'rgba(212,255,58,0.06)' : 'var(--bg-surface)',
              borderColor: isTop ? 'rgba(212,255,58,0.25)' : 'var(--border-subtle)',
            }}
          >
            {/* Candidate Name & Avatar */}
            <div className="col-span-5 sm:col-span-4 flex items-center gap-2.5 truncate pr-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0"
                style={{
                  background: isTop ? '#D4FF3A' : 'rgba(124,92,255,0.15)',
                  color: isTop ? '#08090C' : '#7C5CFF',
                }}
              >
                {c.avatar}
              </div>
              <div className="truncate">
                <div className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {c.name}
                </div>
                <div className="text-[10px] opacity-50 truncate hidden sm:block">{c.role}</div>
              </div>
            </div>

            {/* Score & Bar */}
            <div className="col-span-3 sm:col-span-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.08] hidden sm:block">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${c.match}%`,
                    background: isTop ? '#D4FF3A' : '#7C5CFF',
                  }}
                />
              </div>
              <span className="font-bold text-[11px]" style={{ color: isTop ? '#D4FF3A' : 'var(--text-secondary)' }}>
                {c.match}%
              </span>
            </div>

            {/* Status */}
            <div className="hidden sm:block sm:col-span-3 text-[11px] opacity-70">
              <span className={`px-2 py-0.5 rounded-md ${isTop ? 'bg-lime-400/15 text-lime-400 font-semibold border border-lime-400/30' : 'bg-white/[0.04]'}`}>
                {c.status}
              </span>
            </div>

            {/* Action */}
            <div className="col-span-4 sm:col-span-2 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setPlaying(playing === i ? null : i)}
                className="w-7 h-7 rounded-lg glass flex items-center justify-center transition-colors"
                style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                title="Play 20s AI Interview Snippet"
              >
                {playing === i ? <Pause size={11} className="text-lime-400" /> : <Play size={11} />}
              </button>

              {isTop && (
                <button
                  onClick={() => setActionDone(true)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
                  style={{
                    background: actionDone ? '#22C55E' : '#D4FF3A',
                    color: '#08090C',
                  }}
                >
                  {actionDone ? 'Scheduled!' : 'Offer'}
                </button>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Main IVOO Component ──────────────────────────────────────────
export default function IVOO() {
  const [activeTab, setActiveTab] = useState<TabId>('CV Match')

  return (
    <section id="ivoo" className="py-24 md:py-36 relative overflow-hidden">
      {/* Violet ambient aura */}
      <div
        className="orb w-[650px] h-[650px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.4) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span
            className="text-[11px] font-medium tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--accent-violet)',
              borderColor: 'rgba(124,92,255,0.25)',
              background: 'rgba(124,92,255,0.08)',
            }}
          >
            CH. 02 / FOUNDER SPOTLIGHT
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.02em]" style={{ fontFamily: 'Clash Grotesk, sans-serif' }}>
            {ivoo.title} —
            <span
              className="block bg-gradient-to-r from-violet-400 via-indigo-300 to-lime-300 bg-clip-text text-transparent"
            >
              {ivoo.subtitle}
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg mb-12 max-w-2xl leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {ivoo.tagline} · Founded {ivoo.founded}
        </motion.p>

        {/* Main Grid: Interactive Console + Context */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Realistic SaaS Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-8 rounded-3xl overflow-hidden glass border shadow-2xl"
            style={{
              borderColor: 'rgba(124,92,255,0.25)',
              background: 'var(--bg-surface)',
            }}
          >
            {/* SaaS Browser Chrome Header */}
            <div
              className="px-4 py-3 border-b flex items-center justify-between gap-4"
              style={{
                borderColor: 'var(--border-subtle)',
                background: 'rgba(0,0,0,0.15)',
              }}
            >
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* URL Bar */}
              <div
                className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-2 px-3 py-1 rounded-lg text-xs font-mono opacity-60 border"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <span className="text-emerald-400 text-[10px]">🔒</span>
                <span className="truncate">app.ivoo.ai/interview/session-live-jawad-882</span>
              </div>

              {/* Live Badge */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="hidden sm:inline">AI RUNTIME ACTIVE</span>
              </div>
            </div>

            {/* Tab Navigation with Animated Sliding Pill */}
            <div
              className="flex border-b overflow-x-auto scrollbar-none p-1.5 gap-1.5"
              style={{
                borderColor: 'var(--border-subtle)',
                background: 'rgba(0,0,0,0.08)',
              }}
            >
              {TABS.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-all relative z-10"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="ivoo-tab-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'rgba(124,92,255,0.18)',
                          border: '1px solid rgba(124,92,255,0.3)',
                        }}
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <Icon size={14} style={{ color: isActive ? '#D4FF3A' : 'inherit' }} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Content with Smoother Transitions */}
            <div className="p-5 sm:p-7 min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeTab === 'CV Match' && <CVMatchTab />}
                  {activeTab === 'AI Interview' && <AIInterviewTab />}
                  {activeTab === 'Scorecard' && <ScorecardTab />}
                  {activeTab === 'Recruiter View' && <RecruiterViewTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: Product Pillars & Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-4 flex flex-col gap-5"
          >
            {/* Highlights Card */}
            <div
              className="glass rounded-2xl p-6 border"
              style={{ borderColor: 'rgba(124,92,255,0.2)' }}
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] mb-4 opacity-50">
                Core Capabilities
              </div>
              <ul className="flex flex-col gap-3">
                {ivoo.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', letterSpacing: 0, wordSpacing: 'normal' }}>
                    <span style={{ color: 'var(--accent-lime)', marginTop: 2 }}>◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              {ivoo.stats.map(s => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-4 border"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div
                    className="text-3xl font-semibold tracking-[-0.01em]"
                    style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--accent-lime)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs font-medium mt-1 leading-snug" style={{ color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}>
                    {s.label}
                  </div>
                  <div className="text-[10px] opacity-40 mt-1" style={{ letterSpacing: 0 }}>{s.footnote}</div>
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div className="glass rounded-2xl p-5 border" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] mb-3 opacity-50">
                Technology Architecture
              </div>
              <div className="flex flex-wrap gap-2">
                {ivoo.stack.map(s => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{
                      background: 'rgba(124,92,255,0.12)',
                      color: '#A78BFA',
                      border: '1px solid rgba(124,92,255,0.25)',
                      letterSpacing: 0,
                      wordSpacing: 'normal',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Founder Note / CTA */}
            <a
              href={ivoo.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-semibold font-mono transition-all group"
              style={{
                background: 'rgba(124,92,255,0.18)',
                color: '#C4B5FD',
                border: '1px solid rgba(124,92,255,0.3)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,92,255,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(124,92,255,0.18)')}
            >
              Explore IVOO Architecture on LinkedIn <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
