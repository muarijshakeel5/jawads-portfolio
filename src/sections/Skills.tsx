import { motion } from 'framer-motion'
import { skillGroups } from '../data'

export default function Skills() {
  return (
    <section id="arsenal" className="py-24 md:py-32">
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
          className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-12"
          style={{ fontFamily: 'Clash Grotesk, sans-serif', letterSpacing: 0 }}
        >
          Technical Arsenal
        </motion.h2>

        <div className="flex flex-col gap-10">
          {skillGroups.map((group, gi) => {
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3A] shrink-0" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: 'rgba(242, 241, 236, 0.6)' }}>
                    {group.label}
                  </span>
                  <div className="flex-1 h-px ml-2" style={{ background: 'var(--border-subtle)' }} />
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
                        e.currentTarget.style.borderColor = 'var(--accent-lime)'
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
