import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '../data'

interface IntroProps {
  onComplete: () => void
  visible: boolean
}

export default function Intro({ onComplete, visible }: IntroProps) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      onComplete()
    }, 1100)
    return () => clearTimeout(timer)
  }, [visible, onComplete])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: 'var(--bg-primary)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onAnimationComplete={(definition: unknown) => {
            if (typeof definition === 'object' && definition !== null && 'opacity' in definition && (definition as { opacity: number }).opacity === 0) {
              onComplete()
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tighter"
            style={{ fontFamily: 'Syne, sans-serif' }}
            onAnimationComplete={() => {
              setTimeout(onComplete, 800)
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>{personal.shortName}</span>
            <span style={{ color: 'var(--accent-lime)' }}>.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
