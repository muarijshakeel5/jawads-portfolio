import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data'
import { Mail, Copy, Check, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/Icons'

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  return (
    <button
      onClick={copy}
      className="group inline-flex items-center gap-3 transition-all cursor-pointer"
      title="Click to copy email address"
    >
      <span
        className="text-2xl md:text-3xl font-mono transition-colors"
        style={{ color: 'var(--accent-lime)' }}
      >
        {personal.email}
      </span>
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0"
        style={{
          background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(212,255,58,0.1)',
          border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'var(--border-active)'}`,
        }}
      >
        {copied ? <Check size={14} style={{ color: '#22c55e' }} /> : <Copy size={14} style={{ color: 'var(--accent-lime)' }} />}
      </span>
    </button>
  )
}

interface FormState {
  name: string
  email: string
  message: string
}

function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Please say a bit more (10+ chars)'
    return e
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center border"
        style={{ borderColor: 'var(--border-active)' }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(212,255,58,0.12)', border: '1px solid var(--border-active)' }}>
          <Check size={24} style={{ color: 'var(--accent-lime)' }} />
        </div>
        <h3 className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}>Message received!</h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>I'll be in touch within 24 hours. Can't wait to build something.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-4 border"
      style={{ borderColor: 'var(--border-subtle)' }}>
      {[
        { key: 'name', label: 'Your name', type: 'text', placeholder: 'Jawad Fareed' },
        { key: 'email', label: 'Your email', type: 'email', placeholder: 'you@company.com' },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            value={form[key as keyof FormState]}
            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
            style={{
              background: 'var(--bg-surface-elevated)',
              border: `1px solid ${errors[key as keyof FormState] ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)'}`,
              color: 'var(--text-primary)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--border-active)')}
            onBlur={e => (e.target.style.borderColor = errors[key as keyof FormState] ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)')}
          />
          {errors[key as keyof FormState] && (
            <p className="text-xs mt-1 font-mono" style={{ color: '#ef4444' }}>{errors[key as keyof FormState]}</p>
          )}
        </div>
      ))}

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Message</label>
        <textarea
          placeholder="Tell me about your project or opportunity…"
          rows={4}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none resize-none"
          style={{
            background: 'var(--bg-surface-elevated)',
            border: `1px solid ${errors.message ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)'}`,
            color: 'var(--text-primary)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--border-active)')}
          onBlur={e => (e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)')}
        />
        {errors.message && (
          <p className="text-xs mt-1 font-mono" style={{ color: '#ef4444' }}>{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all mt-2 cursor-pointer shadow-md"
        style={{ background: 'var(--accent-lime)', color: 'var(--accent-lime-contrast)' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Send message
      </button>
    </form>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden">
      {/* Violet orb */}
      <div
        className="orb w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,92,255,0.5) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Big headline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none mb-6"
            style={{ fontFamily: 'Syne, sans-serif', color: 'var(--text-primary)' }}
          >
            Let's build<br />
            <span style={{ color: 'var(--accent-lime)' }}>something</span><br />
            people love.
          </h2>
          <CopyEmailButton />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: socials + info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Whether you have a project in mind, want to discuss AI integration, or are looking for a full-time engineer — I'd love to hear from you. Based in Lahore; available globally.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: GithubIcon, href: personal.github, label: 'GitHub', handle: '@jawadfareed' },
                { icon: LinkedinIcon, href: personal.linkedin, label: 'LinkedIn', handle: 'muhammadjawadfareed' },
                { icon: Mail, href: `mailto:${personal.email}`, label: 'Email', handle: personal.email },
              ].map(({ icon: Icon, href, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl glass border transition-all group"
                  style={{ borderColor: 'var(--border-subtle)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-active)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(212,255,58,0.06)', border: '1px solid var(--border-active)' }}>
                    <Icon size={16} style={{ color: 'var(--accent-lime)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{label}</div>
                    <div className="text-sm font-mono" style={{ color: 'var(--accent-lime)' }}>{handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            © 2026 Muhammad Jawad Fareed · Designed & built in Lahore
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-mono hover:opacity-100 transition-opacity cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowUp size={12} /> Back to top
          </button>
        </motion.div>
      </div>
    </section>
  )
}
