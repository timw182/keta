'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

const LANGS = ['EN', 'FR', 'LB']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLang()
  const tx = t[lang].nav
  const aboutLabel = t[lang].aboutMe.navLabel

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open, compensate for scrollbar width to prevent layout shift
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [menuOpen])

  return (
    <>
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
        {/* Left: logo + language toggle (mobile) */}
        <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3 opacity-0 animate-fade-down" style={{ animationDelay: '0.3s' }}>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/picture-repo/logo/logo-svg.svg" alt="KT Equestrian" width={32} height={32} className="brightness-0 invert" />
            <div className="w-4 h-px bg-gold" />
            <span className="font-[var(--font-cinzel)] text-[12px] md:text-[14px] tracking-[0.35em] text-champagne uppercase">
              KT Equestrian
            </span>
          </Link>
          {/* Language toggle — mobile only */}
          <div className="flex items-center gap-0 md:hidden">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="font-[var(--font-cinzel)] text-[8px] tracking-[0.25em] uppercase px-2 py-0.5 cursor-pointer transition-all duration-200"
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

        {/* Right: language (desktop) + contact + hamburger */}
        <div className="flex items-center gap-4 md:gap-8 opacity-0 animate-fade-down" style={{ animationDelay: '0.5s' }}>

          {/* Language toggle — desktop only */}
          <div className="hidden md:flex items-center gap-0.5">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="font-[var(--font-cinzel)] text-[9px] tracking-[0.25em] uppercase px-2 py-1 cursor-pointer transition-all duration-200"
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
            className="hidden md:inline-block font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-champagne uppercase border border-gold/50 px-5 py-2 transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold"
          >
            {tx.contact}
          </a>

          {/* Hamburger — animates to × when open */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex flex-col gap-[5px] cursor-pointer p-1 z-[9100] relative"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className="block w-[22px] h-px bg-champagne transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block w-[22px] h-px bg-champagne transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px bg-champagne transition-all duration-300 origin-center"
              style={{
                width: menuOpen ? '22px' : '14px',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Slide-in menu overlay ── */}
      <div
        className="fixed inset-0 z-[8900] transition-opacity duration-400"
        style={{
          background: 'rgba(30,8,14,0.6)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          backdropFilter: menuOpen ? 'blur(4px)' : 'none',
        }}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className="fixed top-0 right-0 h-full z-[9000] flex flex-col justify-between bg-burgundy transition-transform duration-500"
        style={{
          width: 'min(340px, 85vw)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          borderLeft: '1px solid rgba(184,148,106,0.15)',
        }}
      >
        {/* Inner frame accent */}
        <div className="absolute inset-3 border border-gold/10 pointer-events-none" />

        {/* Top: logo */}
        <div className="px-8 pt-10 pb-6 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <Image src="/picture-repo/logo/logo-svg.svg" alt="KT Equestrian" width={24} height={24} className="brightness-0 invert opacity-60" />
            <span className="font-[var(--font-cinzel)] text-[11px] tracking-[0.35em] text-champagne/50 uppercase">KT Equestrian</span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: aboutLabel },
            { href: '/booking', label: t[lang].contact.bookingNavLabel },
            { href: '/contact', label: t[lang].contact.navLabel },
          ].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-4 py-4 border-b border-gold/10 transition-all duration-200 hover:pl-1"
              style={{ transitionDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
            >
              <span className="w-0 group-hover:w-4 h-px bg-gold transition-all duration-300" />
              <span className="font-[var(--font-cinzel)] text-[14px] tracking-[0.35em] text-champagne/70 uppercase group-hover:text-gold transition-colors duration-200">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom: language toggle */}
        <div className="px-8 py-8 border-t border-gold/10">
          <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-champagne/25 uppercase mb-3">Language</p>
          <div className="flex items-center gap-1">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 cursor-pointer transition-all duration-200 border"
                style={{
                  color: lang === l ? '#d4aa7d' : 'rgba(247,242,232,0.3)',
                  borderColor: lang === l ? 'rgba(184,148,106,0.5)' : 'transparent',
                  background: lang === l ? 'rgba(184,148,106,0.08)' : 'transparent',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
