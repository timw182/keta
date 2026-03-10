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
      className={`fixed top-0 left-0 right-0 z-[9000] flex items-center justify-between px-5 md:px-[90px] transition-all duration-500 ${
        scrolled
          ? 'pt-[7px] pb-[1px] md:pt-[19px] md:pb-[9px]'
          : 'pt-10 pb-4 md:pt-[58px] md:pb-7'
      }`}
      style={{
        background: scrolled ? 'rgba(58,21,32,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(184,148,106,0.15)' : '1px solid transparent',
      }}
    >
      {/* Left: logo + slogan + language toggle (mobile stacked, desktop inline) */}
      <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3 opacity-0 animate-fade-down" style={{ animationDelay: '0.3s' }}>
        {/* Logo row */}
        <div className="flex items-center gap-3">
          <Image src="/images/kt_logo.png" alt="KT Equestrian" width={28} height={28} className="brightness-0 invert" />
          <div className="w-4 h-px bg-gold" />
          <span className="font-[var(--font-cinzel)] text-[11px] md:text-[12px] tracking-[0.35em] text-champagne uppercase">
            KT Equestrian
          </span>
        </div>
        {/* Language toggle — below logo on mobile, hidden on desktop (moved to right) */}
        <div className="flex items-center gap-0 md:hidden">
          {LANGS.map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="font-[var(--font-cinzel)] text-[7px] tracking-[0.25em] uppercase px-2 py-0.5 cursor-pointer transition-all duration-200"
              style={{
                color: lang === l ? '#d4aa7d' : 'rgba(247,242,232,0.3)',
                borderBottom: lang === l ? '1px solid rgba(184,148,106,0.6)' : '1px solid transparent',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Right: language (desktop) + contact button + hamburger */}
      <div className="flex items-center gap-4 md:gap-8 opacity-0 animate-fade-down" style={{ animationDelay: '0.5s' }}>

        {/* Language toggle — desktop only */}
        <div className="hidden md:flex items-center gap-0.5">
          {LANGS.map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="font-[var(--font-cinzel)] text-[8px] tracking-[0.25em] uppercase px-2 py-1 cursor-pointer transition-all duration-200"
              style={{
                color: lang === l ? '#d4aa7d' : 'rgba(247,242,232,0.35)',
                borderBottom: lang === l ? '1px solid rgba(184,148,106,0.7)' : '1px solid transparent',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-block font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne uppercase border border-gold/50 px-5 py-2 transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold"
        >
          {tx.contact}
        </a>

        {/* Hamburger */}
        <button className="flex flex-col gap-[5px] cursor-pointer p-1">
          <span className="block w-[22px] h-px bg-champagne transition-all" />
          <span className="block w-[22px] h-px bg-champagne transition-all" />
          <span className="block w-[14px] h-px bg-champagne transition-all" />
        </button>
      </div>
    </nav>
  )
}
