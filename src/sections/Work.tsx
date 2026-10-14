import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data'
import { ExternalLink, X, ArrowUpRight } from 'lucide-react'

type Filter = 'All' | 'AI' | 'Mobile' | 'Web' | 'Desktop'
const FILTERS: Filter[] = ['All', 'AI', 'Mobile', 'Web', 'Desktop']

function ProjectCard({ project, onClick }: { project: typeof projects[number]; onClick: () => void }) {
  const isLarge = project.size === 'large'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl overflow-hidden group glass border ${isLarge ? 'col-span-1 md:col-span-1' : ''}`}
      style={{
        borderColor: 'var(--border-subtle)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-lime)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
      }}
    >
      {/* Subtle ambient tint */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 transition-opacity duration-300 group-hover:opacity-60 pointer-events-none`}
      />

      {/* Content */}
      <div className={`relative p-5 sm:p-6 flex flex-col justify-between gap-4 ${isLarge ? 'min-h-[220px]' : 'min-h-[180px]'}`}>
        <div>
          {/* Categories & Status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex gap-1.5 flex-wrap">
              {project.category.map(c => (
                <span
                  key={c}
                  className="text-[11px] px-2.5 py-0.5 rounded-full font-mono"
                  style={{
                    background: 'var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            {project.status && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold"
                style={{
                  background: 'rgba(212,255,58,0.12)',
                  color: 'var(--accent-lime)',
                  border: '1px solid rgba(212,255,58,0.25)',
                }}
              >
                {project.status}
              </span>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-xs flex items-center gap-1 font-mono hover:underline ml-auto"
                style={{ color: 'var(--accent-lime)' }}
              >
                <span>Live</span>
                <ExternalLink size={11} />
              </a>
            )}
          </div>

          <h3
            className="text-lg sm:text-xl font-bold tracking-tight mb-1.5"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
          >
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.short}
          </p>
        </div>

        {/* Stack tags & arrow */}
        <div className="flex items-center justify-between pt-2">
          {project.stack && (
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map(s => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded-md font-mono"
                  style={{
                    background: 'var(--border-subtle)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {s}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono opacity-50">
                  +{project.stack.length - 3}
                </span>
              )}
            </div>
          )}

          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-2"
            style={{
              background: 'var(--accent-lime)',
              color: 'var(--accent-lime-contrast)',
            }}
          >
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SlideOver({ project, onClose }: { project: typeof projects[number]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="w-full max-w-lg h-full overflow-y-auto relative glass p-6 sm:p-8 flex flex-col gap-6"
        style={{
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-subtle)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {project.category.map(c => (
              <span
                key={c}
                className="text-xs px-3 py-1 rounded-full font-mono font-medium"
                style={{
                  background: 'rgba(212,255,58,0.1)',
                  color: 'var(--accent-lime)',
                  border: '1px solid rgba(212,255,58,0.25)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors glass border"
            style={{
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
            aria-label="Close details"
          >
            <X size={16} />
          </button>
        </div>

        <h2
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
        >
          {project.title}
        </h2>

        {project.problem && (
          <div>
            <div className="text-xs font-mono uppercase tracking-wider mb-2 opacity-50">Problem &amp; Context</div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.problem}
            </p>
          </div>
        )}

        {project.built && (
          <div>
            <div className="text-xs font-mono uppercase tracking-wider mb-2 opacity-50">Architecture &amp; Implementation</div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.built}
            </p>
          </div>
        )}

        {project.stack && (
          <div>
            <div className="text-xs font-mono uppercase tracking-wider mb-3 opacity-50">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(s => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full font-mono"
                  style={{
                    background: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.outcome && (
          <div
            className="p-4 rounded-xl border"
            style={{
              background: 'rgba(212,255,58,0.06)',
              borderColor: 'rgba(212,255,58,0.2)',
            }}
          >
            <div className="text-xs font-mono uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--accent-lime)' }}>
              Outcome &amp; Traction
            </div>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
              {project.outcome}
            </p>
          </div>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold font-mono tracking-wide mt-auto"
            style={{
              background: 'var(--accent-lime)',
              color: 'var(--accent-lime-contrast)',
            }}
          >
            Launch Live Website <ExternalLink size={14} />
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<typeof projects[number] | null>(null)

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category.includes(filter))

  return (
    <section id="work" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            CH. 04 / SELECTED WORK
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Featured Projects
          </motion.h2>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-2 flex-wrap"
          >
            {FILTERS.map(f => {
              const isSelected = filter === f
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-full text-xs font-mono transition-all"
                  style={{
                    background: isSelected ? 'var(--accent-lime)' : 'var(--border-subtle)',
                    color: isSelected ? 'var(--accent-lime-contrast)' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {f}
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* Bento grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Slide-over */}
      <AnimatePresence>
        {selected && <SlideOver project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
