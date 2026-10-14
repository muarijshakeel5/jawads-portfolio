import { createContext, useContext, useState, type ReactNode } from 'react'

interface IntroContextType {
  introDone: boolean
  setIntroDone: (done: boolean) => void
  introAlreadySeen: boolean
}

const IntroContext = createContext<IntroContextType>({
  introDone: false,
  setIntroDone: () => {},
  introAlreadySeen: false,
})

export function IntroProvider({ children }: { children: ReactNode }) {
  const [introAlreadySeen] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('mjf_intro_seen') === 'true'
      } catch {
        return false
      }
    }
    return false
  })

  const [introDone, setIntroDoneState] = useState(introAlreadySeen)

  const setIntroDone = (done: boolean) => {
    setIntroDoneState(done)
    if (done && typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('mjf_intro_seen', 'true')
      } catch {
        // Ignore storage errors in private browsing modes
      }
    }
  }

  return (
    <IntroContext.Provider value={{ introDone, setIntroDone, introAlreadySeen }}>
      {children}
    </IntroContext.Provider>
  )
}

export const useIntro = () => useContext(IntroContext)
