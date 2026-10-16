import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data'
import { ExternalLink, X, ArrowUpRight, Code2 } from 'lucide-react'

type Filter = 'All' | 'AI' | 'Mobile' | 'Web' | 'Desktop'
const FILTERS: Filter[] = ['All', 'AI', 'Mobile', 'Web', 'Desktop']

function getDeviceType(categories: string[]): 'phone' | 'browser' | 'laptop' {
  if (categories.includes('Desktop') || categories.includes('AI')) return 'laptop'
  if (categories.includes('Mobile') && !categories.includes('Web')) return 'phone'
  if (categories.includes('Web')) return 'browser'
  if (categories.includes('Mobile')) return 'phone'
  return 'laptop'
}

function ProjectPreview({ project, inDrawer = false }: { project: typeof projects[number]; inDrawer?: boolean }) {
  const [imgError, setImgError] = useState(false)
  const deviceType = getDeviceType(project.category)

  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden ${
        inDrawer ? 'rounded-2xl border border-white/[0.08]' : 'rounded-t-2xl border-b border-white/[0.08]'
      }`}
    >
      {project.image && !imgError ? (
        <img
          src={project.image}
          alt={`${project.title} — project preview screenshot`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="w-full h-full relative flex items-center justify-center overflow-hidden select-none"
          style={{
            backgroundColor: '#111113',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          {/* Subtle radial depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 240, 222, 0.05) 0%, transparent 75%)',
            }}
          />

          {/* Large light background project name watermark */}
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center pointer-events-none">
            <span
              className="text-2xl sm:text-3xl font-semibold opacity-[0.06] uppercase tracking-wider text-[#F2F1EC] line-clamp-2 select-none"
              style={{ fontFamily: 'Clash Grotesk, sans-serif' }}
            >
              {project.title}
            </span>
          </div>

          {/* Device Frame */}
          <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
            {deviceType === 'phone' && (
              <div className="w-16 h-28 sm:w-20 sm:h-32 rounded-2xl border border-white/20 bg-[#0B0B0C]/85 shadow-2xl flex flex-col justify-between p-1.5 relative">
                <div className="w-5 h-1 rounded-full bg-white/20 mx-auto mt-0.5" />
                <div className="flex-1 my-1 rounded-lg border border-white/[0.06] bg-white/[0.02] flex flex-col items-center justify-center p-1 text-center">
                  <span className="text-[9px] font-semibold text-[#F2F1EC]/90 leading-tight line-clamp-1">
                    {project.title}
                  </span>
                  <span className="text-[7px] font-mono text-[#D4FF3A] mt-0.5">Mobile</span>
                </div>
                <div className="w-7 h-0.5 rounded-full bg-white/20 mx-auto mb-0.5" />
              </div>
            )}

            {deviceType === 'browser' && (
              <div className="w-36 sm:w-44 h-22 sm:h-26 rounded-xl border border-white/20 bg-[#0B0B0C]/85 shadow-2xl flex flex-col overflow-hidden">
                <div className="h-4 sm:h-5 px-2 bg-white/[0.04] border-b border-white/10 flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="flex-1 ml-1.5 h-2 rounded bg-white/[0.06] border border-white/[0.05] flex items-center px-1">
                    <span className="text-[6px] font-mono text-[#F2F1EC]/40 truncate">https://{project.id}.app</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#F2F1EC]/90 leading-tight line-clamp-1">
                    {project.title}
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-mono text-[#D4FF3A] mt-0.5">Web Application</span>
                </div>
              </div>
            )}

            {deviceType === 'laptop' && (
              <div className="flex flex-col items-center">
                <div className="w-36 sm:w-44 h-20 sm:h-24 rounded-t-lg border-t border-x border-white/20 bg-[#0B0B0C]/85 shadow-2xl flex flex-col justify-between p-1.5 relative">
                  <div className="w-1 h-1 rounded-full bg-white/30 mx-auto" />
                  <div className="flex-1 my-1 rounded border border-white/[0.06] bg-white/[0.02] flex flex-col items-center justify-center p-1 text-center">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#F2F1EC]/90 leading-tight line-clamp-1">
                      {project.title}
                    </span>
                    <span className="text-[7px] sm:text-[8px] font-mono text-[#D4FF3A] mt-0.5">
                      {project.category.includes('AI') ? 'AI System' : 'Desktop Platform'}
                    </span>
                  </div>
                </div>
                <div className="w-44 sm:w-52 h-2 rounded-b-md border border-white/20 bg-white/[0.05] relative flex justify-center">
                  <div className="w-8 h-1 rounded-b-sm bg-white/20" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectCard({
  project,
  onClick,
  colSpanClass,
}: {
  project: typeof projects[number]
  onClick: () => void
  colSpanClass: string
}) {
  const liveUrl = project.live || project.liveLink
  const githubUrl = project.github

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden glass border flex flex-col transition-all duration-300 ${colSpanClass}`}
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'var(--bg-surface)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
      }}
    >
      {/* Lime top border highlight on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-[#D4FF3A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

      {/* 16:10 Preview Area */}
      <ProjectPreview project={project} />

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
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
          </div>

          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className="text-lg sm:text-xl font-semibold"
              style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}
            >
              {project.title}
            </h3>

            {/* Moving arrow on hover */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{
                background: 'var(--accent-lime)',
                color: 'var(--accent-lime-contrast)',
              }}
            >
              <ArrowUpRight size={14} />
            </div>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', letterSpacing: 0 }}>
            {project.short}
          </p>
        </div>

        {/* Bottom row: Stack tags & Link buttons */}
        <div className="pt-3 border-t flex flex-wrap items-center justify-between gap-3 mt-auto" style={{ borderColor: 'var(--border-subtle)' }}>
          {/* Stack tags */}
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

          {/* Action links: Live site & Code */}
          <div className="flex items-center gap-2 ml-auto">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                aria-label={`Visit live site for ${project.title}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors hover:bg-white/10"
                style={{
                  color: 'var(--accent-lime)',
                  border: '1px solid rgba(212,255,58,0.25)',
                  background: 'rgba(212,255,58,0.06)',
                }}
              >
                <span>Live site</span>
                <ExternalLink size={11} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                aria-label={`View code repository for ${project.title}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors hover:bg-white/10"
                style={{
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                <Code2 size={11} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SlideOver({ project, onClose }: { project: typeof projects[number]; onClose: () => void }) {
  const liveUrl = project.live || project.liveLink
  const githubUrl = project.github

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(10px)' }}
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
        {/* Close Button & Category Pills */}
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

        {/* Slide-over Header: 16:10 Preview */}
        <ProjectPreview project={project} inDrawer />

        <h2
          className="text-3xl sm:text-4xl font-semibold"
          style={{ fontFamily: 'Clash Grotesk, sans-serif', color: 'var(--text-primary)', letterSpacing: 0 }}
        >
          {project.title}
        </h2>

        {project.problem && (
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2 opacity-50">Problem &amp; Context</div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', letterSpacing: 0, wordSpacing: 'normal' }}>
              {project.problem}
            </p>
          </div>
        )}

        {project.built && (
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2 opacity-50">Architecture &amp; Implementation</div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', letterSpacing: 0, wordSpacing: 'normal' }}>
              {project.built}
            </p>
          </div>
        )}

        {project.stack && (
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.12em] mb-3 opacity-50">Tech Stack</div>
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
            <div className="text-[11px] font-medium uppercase tracking-[0.12em] mb-1 font-semibold" style={{ color: 'var(--accent-lime)' }}>
              Outcome &amp; Traction
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}>
              {project.outcome}
            </p>
          </div>
        )}

        {/* Action Buttons: Live site & Code */}
        {(liveUrl || githubUrl) && (
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Launch live site for ${project.title}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: 'var(--accent-lime)',
                  color: 'var(--accent-lime-contrast)',
                  letterSpacing: 0,
                  wordSpacing: 'normal',
                }}
              >
                Launch Live Site <ExternalLink size={14} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code repository for ${project.title}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold border glass transition-transform hover:scale-105 active:scale-95"
                style={{
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                  letterSpacing: 0,
                  wordSpacing: 'normal',
                }}
              >
                <Code2 size={14} /> View Code
              </a>
            )}
          </div>
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

  const getColSpan = (projectId: string, totalFiltered: number) => {
    if (filter === 'All') {
      return projectId === 'perfect-pairing' || projectId === 'foodnerd-ecosystem'
        ? 'col-span-1 md:col-span-1 lg:col-span-6'
        : 'col-span-1 md:col-span-1 lg:col-span-4'
    }
    if (totalFiltered === 1) return 'col-span-1 md:col-span-2 lg:col-span-12'
    if (totalFiltered === 2) return 'col-span-1 md:col-span-1 lg:col-span-6'
    return 'col-span-1 md:col-span-1 lg:col-span-4'
  }

  return (
    <section id="work" className="py-24 md:py-32">
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
            CH. 04 / SELECTED WORK
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold"
            style={{ fontFamily: 'Clash Grotesk, sans-serif', letterSpacing: 0 }}
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
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                  style={{
                    background: isSelected ? 'var(--accent-lime)' : 'var(--border-subtle)',
                    color: isSelected ? 'var(--accent-lime-contrast)' : 'var(--text-secondary)',
                    letterSpacing: 0,
                    wordSpacing: 'normal',
                  }}
                >
                  {f}
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* 12-column Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          <AnimatePresence>
            {filtered.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                colSpanClass={getColSpan(p.id, filtered.length)}
                onClick={() => setSelected(p)}
              />
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
