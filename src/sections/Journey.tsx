import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timeline } from '../data'
import { Briefcase, Building2, Code2, MapPin, Newspaper } from 'lucide-react'

const typeIcon = {
  freelance: Code2,
  founder: Building2,
  fulltime: Briefcase,
  intern: Code2,
}

const typeColor = {
  freelance: '#D4FF3A',
  founder: '#7C5CFF',
  fulltime: '#22c55e',
  intern: '#38BDF8',
}

function TimelineCard({ item, index }: { item: typeof timeline[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = typeIcon[item.type as keyof typeof typeIcon] || Briefcase
  const color = typeColor[item.type as keyof typeof typeColor] || '#D4FF3A'
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-start`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 glass rounded-2xl p-5 sm:p-6 border"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="text-xs sm:text-sm font-mono uppercase tracking-wider mb-1 font-semibold" style={{ color }}>
              {item.company}
            </div>
            <div className="text-base sm:text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>
              {item.role}
            </div>
          </div>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}30` }}
          >
            <Icon size={16} style={{ color }} />
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          <span>{item.period}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <MapPin size={11} /> {item.location}
          </span>
          {item.badge && (
            <span
              className="text-[11px] px-2 py-0.5 rounded-full font-mono font-medium"
              style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
            >
              {item.badge}
            </span>
          )}
        </div>

        {/* Description or bullets */}
        {item.description && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {item.description}
          </p>
        )}
        {item.bullets && (
          <ul className="flex flex-col gap-2">
            {item.bullets.map((b, i) => (
              <li key={i} className="text-xs sm:text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color, marginTop: 4, fontSize: 8 }}>▶</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* News chip */}
        {item.news && (
          <div
            className="mt-4 flex items-start gap-2 p-3 rounded-xl text-xs font-mono"
            style={{
              background: 'rgba(212,255,58,0.06)',
              border: '1px solid rgba(212,255,58,0.18)',
              color: 'var(--text-primary)',
            }}
          >
            <Newspaper size={13} style={{ color: 'var(--accent-lime)', marginTop: 2, flexShrink: 0 }} />
            <span>{item.news}</span>
          </div>
        )}

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map(t => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-lg font-mono"
              style={{
                background: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Spacer for opposite side on desktop */}
      <div className="flex-1 hidden md:block" />
    </div>
  )
}

export default function Journey() {
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(lineRef, { once: true })

  return (
    <section id="journey" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span
            className="text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--accent-lime)',
              borderColor: 'rgba(212,255,58,0.25)',
              background: 'rgba(212,255,58,0.06)',
            }}
          >
            CH. 03 / THE JOURNEY
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-16 tracking-tight"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Experience &amp; Career
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: 'var(--border-subtle)' }}
          >
            <motion.div
              ref={lineRef}
              className="w-full origin-top"
              style={{ background: 'linear-gradient(to bottom, #D4FF3A, #7C5CFF)', height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-10 pl-6 md:pl-0">
            {timeline.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
