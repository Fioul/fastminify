'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AdContextType {
  isFloatingAdVisible: boolean
  setIsFloatingAdVisible: (visible: boolean) => void
}

const AdContext = createContext<AdContextType | undefined>(undefined)

export function AdProvider({ children }: { children: ReactNode }) {
  const [isFloatingAdVisible, setIsFloatingAdVisible] = useState(true)

  return (
    <AdContext.Provider value={{ isFloatingAdVisible, setIsFloatingAdVisible }}>
      {children}
    </AdContext.Provider>
  )
}

export function useAdContext() {
  const context = useContext(AdContext)
  if (context === undefined) {
    throw new Error('useAdContext must be used within an AdProvider')
  }
  return context
}
