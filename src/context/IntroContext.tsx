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
  const [introDone, setIntroDone] = useState(false)

  return (
    <IntroContext.Provider value={{ introDone, setIntroDone, introAlreadySeen: false }}>
      {children}
    </IntroContext.Provider>
  )
}

export const useIntro = () => useContext(IntroContext)
