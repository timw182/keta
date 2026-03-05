'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext({ lang: 'EN', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('EN')

  useEffect(() => {
    const stored = localStorage.getItem('kt-lang')
    if (stored && ['EN', 'FR', 'LB'].includes(stored)) setLangState(stored)
  }, [])

  const setLang = l => {
    setLangState(l)
    localStorage.setItem('kt-lang', l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
