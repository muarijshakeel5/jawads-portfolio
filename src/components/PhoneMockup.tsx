import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function PhoneMockup() {
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
              { name: 'Aisha Khan', score: '74%', col: '#94A3B8' },
              { name: 'Omar Malik', score: '62%', col: '#64748B' },
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
    </div>
  )
}
