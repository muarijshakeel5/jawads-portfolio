import { motion } from 'framer-motion'
import { skillGroups } from '../data'

const groupColors: Record<string, string> = {
  'AI & LLMs': '#D4FF3A',
  'Mobile': '#7C5CFF',
  'Frontend': '#22c55e',
  'Backend': '#f59e0b',
  'Desktop': '#ec4899',
  'Tools': '#06b6d4',
  'Concepts': '#8B5CF6',
}

export default function Skills() {
  return (
    <section id="arsenal" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter label */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <span
            className="text-[11px] font-medium tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border"
            style={{
              color: 'var(--accent-lime)',
              borderColor: 'rgba(212,255,58,0.25)',
              background: 'rgba(212,255,58,0.06)',
            }}
          >
            CH. 06 / THE ARSENAL
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-16 tracking-[-0.02em]"
          style={{ fontFamily: 'Clash Grotesk, sans-serif' }}
        >
          Technical Arsenal
        </motion.h2>

        <div className="flex flex-col gap-10">
          {skillGroups.map((group, gi) => {
            const color = groupColors[group.label] || 'var(--accent-lime)'
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color }}>
                    {group.label}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="text-xs sm:text-sm px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-default glass border"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-primary)',
                        letterSpacing: 0,
                        wordSpacing: 'normal',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = color
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
