import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '../data'
import { useIntro } from '../context/IntroContext'

export default function Intro() {
  const { setIntroDone } = useIntro()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // 1. Hold intro logo on screen for 1100ms, then trigger exit fade
    const fadeTimer = setTimeout(() => {
      setVisible(false)
    }, 1100)

    // 2. Exactly when exit fade completes (1100ms + 200ms delay + 600ms duration = 1900ms),
    // mark introDone as true so the hero reveals only after the intro overlay is 100% gone
    const completionTimer = setTimeout(() => {
      setIntroDone(true)
    }, 1900)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(completionTimer)
    }
  }, [setIntroDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
          style={{ background: 'var(--bg-primary)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onAnimationComplete={(definition: unknown) => {
            if (
              typeof definition === 'object' &&
              definition !== null &&
              'opacity' in definition &&
              (definition as { opacity: number }).opacity === 0
            ) {
              setIntroDone(true)
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-semibold tracking-[-0.02em]"
            style={{ fontFamily: 'Clash Grotesk, sans-serif' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>{personal.shortName}</span>
            <span style={{ color: 'var(--accent-lime)' }}>.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
