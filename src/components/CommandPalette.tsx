import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '../data'
import { Command, Hash, Copy, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

const sections = [
  { id: 'hero', label: 'Jump to Hero' },
  { id: 'story', label: 'Jump to Story (CH. 01)' },
  { id: 'ivoo', label: 'Jump to IVOO (CH. 02)' },
  { id: 'journey', label: 'Jump to Journey (CH. 03)' },
  { id: 'work', label: 'Jump to Work (CH. 04)' },
  { id: 'services', label: 'Jump to Services (CH. 05)' },
  { id: 'arsenal', label: 'Jump to Arsenal (CH. 06)' },
  { id: 'public', label: 'Jump to Building in Public (CH. 07)' },
  { id: 'learning', label: 'Jump to Learning (CH. 08)' },
  { id: 'contact', label: 'Jump to Contact' },
]

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const actions = [
    {
      label: 'Open GitHub Profile',
      icon: GithubIcon,
      action: () => window.open(personal.github, '_blank'),
    },
    {
      label: 'Open LinkedIn Profile',
      icon: LinkedinIcon,
      action: () => window.open(personal.linkedin, '_blank'),
    },
    {
      label: 'Copy Email Address',
      icon: Copy,
      action: () => navigator.clipboard.writeText(personal.email),
    },
    {
      label: 'Download Curriculum Vitae',
      icon: Download,
      action: () => {
        const link = document.createElement('a')
        link.href = personal.cvLink
        link.download = 'Muhammad_Jawad_Fareed_Resume.pdf'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
    },
  ]

  const allItems = [
    ...sections.map(s => ({
      label: s.label,
      icon: Hash,
      action: () => {
        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    })),
    ...actions,
  ]

  const filtered = allItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected(s => (s + 1) % (filtered.length || 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected(s => (s - 1 + (filtered.length || 1)) % (filtered.length || 1))
      }
      if (e.key === 'Enter' && filtered[selected]) {
        e.preventDefault()
        filtered[selected].action()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, selected, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="cmd-palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -16 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl rounded-2xl overflow-hidden glass"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <Command size={15} style={{ color: 'var(--accent-lime)' }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0) }}
                placeholder="Search chapters, theme, actions…"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text-primary)', letterSpacing: 0, wordSpacing: 'normal' }}
              />
              <kbd className="text-xs px-2 py-0.5 rounded font-medium opacity-50"
                style={{ background: 'var(--border-subtle)', border: '1px solid var(--border-subtle)', letterSpacing: 0 }}>
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-sm opacity-50" style={{ letterSpacing: 0 }}>No matching results</div>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon
                const isSel = i === selected
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors"
                    style={{
                      background: isSel ? 'rgba(212,255,58,0.1)' : 'transparent',
                      color: isSel ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <Icon size={14} style={{ color: isSel ? 'var(--accent-lime)' : 'var(--text-muted)' }} />
                    <span className="flex-1 text-xs font-medium" style={{ letterSpacing: 0, wordSpacing: 'normal' }}>{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2.5 border-t flex items-center justify-between text-xs opacity-40"
              style={{ borderColor: 'var(--border-subtle)', letterSpacing: 0 }}>
              <div className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
              <span>ESC close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
