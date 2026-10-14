import { techMarquee } from '../data'

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-2">
      <div className={`flex gap-8 ${reverse ? 'marquee-right' : 'marquee-left'}`}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className="shrink-0 text-2xl md:text-4xl font-extrabold tracking-tighter uppercase select-none transition-colors duration-200 whitespace-nowrap group"
            style={{
              fontFamily: 'Syne, sans-serif',
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--text-muted)' as any,
              cursor: 'default',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--accent-lime)'
              e.currentTarget.style.webkitTextStroke = '0px'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'transparent'
              e.currentTarget.style.webkitTextStroke = '1.5px var(--text-muted)'
            }}
          >
            {item}
            <span
              className="mx-8 inline-block"
              style={{ color: 'var(--accent-lime)', opacity: 0.35, WebkitTextStroke: '0' } as any}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechMarquee() {
  const row1 = techMarquee.slice(0, 8)
  const row2 = techMarquee.slice(8)

  return (
    <section
      className="py-12 md:py-16 border-y overflow-hidden"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
      aria-label="Technologies"
    >
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </section>
  )
}
