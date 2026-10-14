import { motion } from 'framer-motion'
import { education, certifications } from '../data'
import { GraduationCap, Award } from 'lucide-react'

export default function Education() {
  return (
    <section id="learning" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Chapter label */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <span className="text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full border"
            style={{ color: 'var(--accent-lime)', borderColor: 'var(--border-active)', background: 'rgba(212,255,58,0.06)' }}>
            CH. 08 / LEARNING
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold mb-16 tracking-tight"
          style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
        >
          Education &<br />Certifications
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Degree */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-7 border"
            style={{ borderColor: 'var(--border-active)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(212,255,58,0.08)', border: '1px solid var(--border-active)' }}>
                <GraduationCap size={18} style={{ color: 'var(--accent-lime)' }} />
              </div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Degree</div>
            </div>

            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>{education.degree}</h3>
            <div className="text-base font-medium mb-1" style={{ color: 'var(--accent-lime)' }}>{education.university}</div>
            <div className="text-sm mb-1 font-mono" style={{ color: 'var(--text-secondary)' }}>{education.location} · {education.period}</div>
            <div className="text-sm font-mono mb-6" style={{ color: 'var(--accent-lime)' }}>GPA: {education.gpa}</div>

            <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Relevant Courses</div>
            <div className="flex flex-wrap gap-2">
              {education.courses.map(c => (
                <span key={c} className="text-xs px-2.5 py-1 rounded-lg font-mono border"
                  style={{ background: 'var(--bg-surface-elevated)', color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)' }}>
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Certifications</div>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass rounded-xl p-4 flex items-start gap-4 border bg-gradient-to-br ${cert.color}`}
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(212,255,58,0.1)', border: '1px solid var(--border-active)' }}>
                  <Award size={15} style={{ color: 'var(--accent-lime)' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{cert.title}</div>
                  <div className="text-xs font-mono mt-1" style={{ color: 'var(--text-secondary)' }}>{cert.issuer} · {cert.year}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
