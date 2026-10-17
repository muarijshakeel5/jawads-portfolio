import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal, linkedinPostThemes } from '../data'
import { Bot, Layers, Users } from 'lucide-react'
import { LinkedinIcon } from '../components/Icons'

const iconMap = { Bot, Layers, Users }

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    let rafId: number
    const animate = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      if (ref.current) {
        ref.current.textContent = (target * eased / 1000).toFixed(1)
      }
      if (elapsed < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target])

  return <span ref={ref}>0.0</span>
}

export default function BuildingInPublic() {
  return (
    <section id="public" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter label */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <span className="text-[11px] font-medium tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border"
            style={{ color: 'var(--accent-lime)', borderColor: 'var(--border-active)', background: 'rgba(212,255,58,0.06)' }}>
            CH. 07 / BUILDING IN PUBLIC
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-semibold"
            style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--text-primary)', letterSpacing: 0 }}
          >
            The conversation
            <br />
            <span style={{ color: 'var(--accent-lime)' }}>keeps going.</span>
          </motion.h2>

          {/* Followers badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center glass rounded-2xl px-8 py-5 text-center shrink-0 border"
            style={{ borderColor: 'var(--border-active)' }}
          >
            <div className="text-4xl font-semibold mb-1" style={{ color: 'var(--accent-lime)', letterSpacing: 0 }}>
              <AnimatedCounter target={personal.linkedinFollowers} />K
            </div>
            <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)', letterSpacing: 0 }}>LinkedIn followers</div>
            <div className="flex items-center gap-1.5 mt-2">
              <LinkedinIcon size={13} style={{ color: 'var(--accent-lime)' }} />
              <span className="text-xs" style={{ color: 'var(--text-muted)', letterSpacing: 0 }}>and counting</span>
            </div>
          </motion.div>
        </div>

        {/* Post theme cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {linkedinPostThemes.map((theme, i) => {
            const Icon = iconMap[theme.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 flex flex-col gap-4 border"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(212,255,58,0.08)', border: '1px solid var(--border-active)' }}>
                  <Icon size={18} style={{ color: 'var(--accent-lime)' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--text-primary)', letterSpacing: 0 }}>{theme.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', letterSpacing: 0 }}>{theme.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              letterSpacing: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
            }}
          >
            <LinkedinIcon size={15} style={{ color: 'var(--accent-lime)' }} /> Follow on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
