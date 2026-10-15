import { motion } from 'framer-motion'
import { services, processSteps, personal } from '../data'
import { Globe, Smartphone, Brain } from 'lucide-react'

const iconMap = { Globe, Smartphone, Brain }

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-36 relative overflow-hidden">
      <div
        className="orb w-[420px] h-[420px] -bottom-20 right-0 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,255,58,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Chapter label */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <span
            className="text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--accent-lime)',
              borderColor: 'rgba(212,255,58,0.25)',
              background: 'rgba(212,255,58,0.06)',
            }}
          >
            CH. 05 / WORK WITH ME
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-16 tracking-tight"
          style={{ fontFamily: 'Clash Grotesk, sans-serif' }}
        >
          Engineering Services
        </motion.h2>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 sm:p-7 flex flex-col gap-4 group transition-all border"
                style={{ borderColor: 'var(--border-subtle)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-lime)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    background: 'rgba(212,255,58,0.1)',
                    border: '1px solid rgba(212,255,58,0.25)',
                    color: 'var(--accent-lime)',
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h3
                    className="text-xl font-bold mb-2 tracking-tight"
                    style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--text-primary)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {s.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  {s.highlights.map(h => (
                    <span
                      key={h}
                      className="text-[11px] px-2.5 py-1 rounded-lg font-mono"
                      style={{
                        background: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Process strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-16 p-6 sm:p-8 rounded-3xl glass border"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <div className="text-xs font-mono uppercase tracking-widest mb-8 opacity-50">
            How I Build &amp; Ship
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.step} className="flex flex-col gap-2 relative">
                <div
                  className="text-3xl font-extrabold font-mono"
                  style={{ color: 'var(--accent-lime)', opacity: 0.7 }}
                >
                  {step.step}
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--text-primary)' }}
                >
                  {step.label}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto text-center px-8 py-3.5 rounded-2xl text-xs font-bold font-mono tracking-wide transition-all shadow-lg hover:scale-105 active:scale-95"
            style={{
              background: 'var(--accent-lime)',
              color: 'var(--accent-lime-contrast)',
            }}
          >
            Start a project with me
          </a>
          <a
            href={personal.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center px-8 py-3.5 rounded-2xl text-xs font-bold font-mono tracking-wide border glass transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            View Upwork Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}
