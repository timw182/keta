'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

const LANGS = ['EN', 'FR', 'LB']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLang()
  const tx = t[lang].nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between px-5 pt-[50px] pb-5 md:px-[90px] md:pt-[58px] md:pb-7 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(58,21,32,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(184,148,106,0.15)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 opacity-0 animate-fade-down" style={{ animationDelay: '0.3s' }}>
        <Image src="/images/kt_logo.png" alt="KT Equestrian" width={32} height={32} className="brightness-0 invert" />
        <div className="w-4 h-px bg-gold" />
        <span className="font-[var(--font-cinzel)] text-[12px] tracking-[0.35em] text-champagne uppercase">
          KT Equestrian
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 md:gap-8 opacity-0 animate-fade-down" style={{ animationDelay: '0.5s' }}>

        {/* Language toggle */}
        <div className="flex items-center gap-0.5">
          {LANGS.map((l, i) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="font-[var(--font-cinzel)] text-[8px] tracking-[0.25em] uppercase px-2 py-1 transition-all duration-200 cursor-pointer"
              style={{
                color: lang === l ? '#d4aa7d' : 'rgba(247,242,232,0.35)',
                borderBottom: lang === l ? '1px solid rgba(184,148,106,0.7)' : '1px solid transparent',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="hidden md:flex flex-col items-end gap-0.5">
          <span className="font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-champagne/65 uppercase">info@ktequestrian.com</span>
          <span className="font-[var(--font-jost)] text-[11px] tracking-[0.15em] text-champagne">+352 621 000 000</span>
        </div>

        <a
          href="#contact"
          className="hidden sm:inline-block font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne uppercase border border-gold/50 px-5 py-2 transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold"
        >
          {tx.contact}
        </a>

        <button className="flex flex-col gap-[5px] cursor-pointer p-1">
          <span className="block w-[22px] h-px bg-champagne transition-all" />
          <span className="block w-[22px] h-px bg-champagne transition-all" />
          <span className="block w-[14px] h-px bg-champagne transition-all" />
        </button>
      </div>
    </nav>
  )
}
