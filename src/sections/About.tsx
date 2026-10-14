import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { about } from '../data'

function Counter({
  value,
  suffix,
  label,
  decimal,
}: {
  value: number
  suffix: string
  label: string
  decimal?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const displayRef = useRef<HTMLSpanElement>(null)

  if (inView && displayRef.current) {
    const target = value
    const duration = 1600
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      const current = target * eased
      if (displayRef.current) {
        displayRef.current.textContent = decimal
          ? current.toFixed(decimal)
          : Math.floor(current).toString()
      }
      if (elapsed < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  return (
    <div ref={ref} className="flex flex-col gap-1.5 p-4 rounded-2xl glass border" style={{ borderColor: 'var(--border-subtle)' }}>
      <div
        className="text-3xl sm:text-4xl font-extrabold tracking-tight"
        style={{ fontFamily: 'Syne, sans-serif', color: 'var(--accent-lime)' }}
      >
        <span ref={displayRef}>{decimal ? value.toFixed(decimal) : '0'}</span>
        <span>{suffix}</span>
      </div>
      <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="story" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          className="mb-8"
        >
          <span
            className="text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--accent-lime)',
              borderColor: 'rgba(212,255,58,0.25)',
              background: 'rgba(212,255,58,0.06)',
            }}
          >
            CH. 01 / THE STORY
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <blockquote
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
            >
              <span style={{ color: 'var(--accent-lime)', fontSize: '3.5rem', lineHeight: 0.5, fontFamily: 'Georgia, serif' }}>
                &ldquo;
              </span>
              <br />
              {about.pullQuote}
            </blockquote>
          </motion.div>

          {/* Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-10 border-t"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {about.counters.map((c) => (
            <Counter key={c.label} {...c} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
