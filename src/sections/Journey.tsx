import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timeline } from '../data'
import { Briefcase, Building2, Code2, MapPin, Newspaper } from 'lucide-react'

const typeIcon = {
  freelance: Code2,
  founder: Building2,
  fulltime: Briefcase,
  intern: Code2,
  contract: Briefcase,
}

const typeColor: Record<string, string> = {
  freelance: '#D4FF3A',
  founder: '#D4FF3A',
  fulltime: '#D4FF3A',
  intern: '#D4FF3A',
}

function CardContent({
  item,
  color,
  iconBg,
  iconBorder,
  badgeBg,
  badgeBorder,
  Icon,
  isLeft,
  inView,
}: {
  item: typeof timeline[number]
  color: string
  iconBg: string
  iconBorder: string
  badgeBg: string
  badgeBorder: string
  Icon: React.ElementType
  isLeft: boolean
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full glass rounded-2xl p-5 sm:p-6 border relative z-10"
      style={{ borderColor: 'var(--border-subtle)', boxSizing: 'border-box' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-[0.12em] mb-1 font-semibold" style={{ color: 'rgba(242, 241, 236, 0.6)' }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
            <span>{item.company}</span>
          </div>
          <div className="text-base sm:text-lg font-semibold" style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}>
            {item.role}
          </div>
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
        {item.period && (
          <>
            <span>{item.period}</span>
            <span>·</span>
          </>
        )}
        <span className="flex items-center gap-1">
          <MapPin size={11} /> {item.location}
        </span>
        {item.badge && (
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-mono font-medium"
            style={{ background: badgeBg, color, border: `1px solid ${badgeBorder}` }}
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
      {item.tags && item.tags.length > 0 && (
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
      )}
    </motion.div>
  )
}

function TimelineCard({ item, index }: { item: typeof timeline[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = typeIcon[item.type as keyof typeof typeIcon] || Briefcase
  const isContract = item.type === 'contract'
  const color = isContract ? 'rgba(255, 255, 255, 0.6)' : (typeColor[item.type as keyof typeof typeColor] || '#D4FF3A')
  const iconBg = isContract ? 'rgba(255, 255, 255, 0.06)' : `${color}18`
  const iconBorder = isContract ? 'rgba(255, 255, 255, 0.15)' : `${color}30`
  const badgeBg = isContract ? 'rgba(255, 255, 255, 0.08)' : `${color}15`
  const badgeBorder = isContract ? 'rgba(255, 255, 255, 0.20)' : `${color}30`
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className="relative pl-[36px] md:pl-0 md:grid md:grid-cols-[1fr_56px_1fr] md:items-start"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Mobile Node & Connector (< 768px) */}
      <div
        className="md:hidden absolute top-[28px] left-[12px] w-[24px] h-px transition-colors duration-500 pointer-events-none z-0"
        style={{ background: inView ? '#D4FF3A' : 'rgba(255, 255, 255, 0.15)' }}
      />
      <div
        className="md:hidden absolute top-[28px] left-[12px] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none z-10 transition-all duration-500"
        style={{
          background: '#161618',
          border: '2px solid #D4FF3A',
          boxShadow: inView ? '0 0 10px rgba(212, 255, 58, 0.5)' : 'none',
        }}
      />

      {/* Desktop Column 1 (Left Card) */}
      {isLeft ? (
        <div className="w-full flex justify-end">
          <CardContent
            item={item}
            color={color}
            iconBg={iconBg}
            iconBorder={iconBorder}
            badgeBg={badgeBg}
            badgeBorder={badgeBorder}
            Icon={Icon}
            isLeft={isLeft}
            inView={inView}
          />
        </div>
      ) : (
        <div className="hidden md:block w-full" aria-hidden="true" />
      )}

      {/* Desktop Center Gutter (56px) */}
      <div className="hidden md:block relative w-[56px] h-full min-h-[60px] pointer-events-none z-10">
        {/* Connector from node to card's inner edge */}
        <div
          className={`absolute top-[28px] h-px transition-colors duration-500 ${
            isLeft ? 'left-0 w-[28px]' : 'left-[28px] w-[28px]'
          }`}
          style={{ background: inView ? '#D4FF3A' : 'rgba(255, 255, 255, 0.15)' }}
        />
        {/* 12px circular node centered on line */}
        <div
          className="absolute top-[28px] left-[28px] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-500"
          style={{
            background: '#161618',
            border: '2px solid #D4FF3A',
            boxShadow: inView ? '0 0 10px rgba(212, 255, 58, 0.5)' : 'none',
          }}
        />
      </div>

      {/* Desktop Column 3 (Right Card) */}
      {!isLeft ? (
        <div className="w-full flex justify-start">
          <CardContent
            item={item}
            color={color}
            iconBg={iconBg}
            iconBorder={iconBorder}
            badgeBg={badgeBg}
            badgeBorder={badgeBorder}
            Icon={Icon}
            isLeft={isLeft}
            inView={inView}
          />
        </div>
      ) : (
        <div className="hidden md:block w-full" aria-hidden="true" />
      )}
    </div>
  )
}

export default function Journey() {
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(lineRef, { once: true })

  return (
    <section id="journey" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
          className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-12"
          style={{ fontFamily: 'Clash Grotesk, sans-serif', letterSpacing: 0 }}
        >
          Experience &amp; Career
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line running through the full height */}
          <div
            className="absolute left-[12px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none z-0"
            style={{ background: 'var(--border-subtle)' }}
          >
            <motion.div
              ref={lineRef}
              className="w-full origin-top"
              style={{ background: 'linear-gradient(to bottom, #D4FF3A, rgba(255,255,255,0.2))', height: '100%' }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Cards container: 40px vertical spacing */}
          <div className="flex flex-col gap-10">
            {timeline.map((item, i) => (
              <TimelineCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
