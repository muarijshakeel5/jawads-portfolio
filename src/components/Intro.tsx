import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal } from '../data'
import { useIntro } from '../context/IntroContext'

export default function Intro() {
  const { introAlreadySeen, setIntroDone } = useIntro()
  const [visible, setVisible] = useState(!introAlreadySeen)

  useEffect(() => {
    if (introAlreadySeen) {
      setIntroDone(true)
      return
    }

    const timer = setTimeout(() => {
      setVisible(false)
      setIntroDone(true)
    }, 1100)

    return () => clearTimeout(timer)
  }, [introAlreadySeen, setIntroDone])

  if (introAlreadySeen) return null

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
            className="text-6xl md:text-8xl font-extrabold tracking-tighter"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>{personal.shortName}</span>
            <span style={{ color: 'var(--accent-lime)' }}>.</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
