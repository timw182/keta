'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang } = useLang()
  const tx = t[lang]

  const links = [
    { href: '/about', label: tx.aboutMe.navLabel },
    { href: '/#services', label: tx.services.label },
    { href: '/booking', label: tx.contact.bookingNavLabel },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
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
      <header
        className={`sticky top-0 z-[9000] transition-colors duration-300 ${scrolled ? 'bg-cream/90 backdrop-blur-md' : 'bg-cream'}`}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          <nav className={`flex items-center justify-between border-b border-ink/15 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5 md:py-7'}`}>

            {/* Left: logo */}
            <Link href="/" className="flex items-center gap-2.5 opacity-0 animate-fade-down" style={{ animationDelay: '0.2s' }}>
              <Image src="/picture-repo/logo/logo-svg.svg" alt="" width={30} height={30} className="brightness-0" />
              <span className="font-display text-[22px] md:text-[24px] leading-none text-ink tracking-[-0.01em]">
                KT Equestrian
              </span>
            </Link>

            {/* Center: links (desktop) */}
            <ul className="hidden lg:flex items-center gap-10 opacity-0 animate-fade-down" style={{ animationDelay: '0.35s' }}>
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="relative font-sans font-medium text-[13px] tracking-[0.08em] text-ink uppercase after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-ink after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: language + contact + hamburger */}
            <div className="flex items-center gap-4 md:gap-6 opacity-0 animate-fade-down" style={{ animationDelay: '0.5s' }}>
              <div className="hidden md:block">
                <LanguageToggle />
              </div>

              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-4 group"
              >
                <span className="font-sans font-medium text-[13px] tracking-[0.08em] text-ink uppercase">
                  {tx.contact.navLabel}
                </span>
                <span className="w-11 h-11 rounded-full bg-white shadow-[0_2px_10px_rgba(23,22,19,0.08)] flex items-center justify-center text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-cream">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L20 7H4l8 5.2z" />
                  </svg>
                </span>
              </Link>

              {/* Hamburger — animates to × when open */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-2 z-[9100] relative"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span
                  className="block w-[22px] h-[1.5px] bg-ink transition-all duration-300 origin-center"
                  style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }}
                />
                <span
                  className="block w-[22px] h-[1.5px] bg-ink transition-all duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="block h-[1.5px] bg-ink transition-all duration-300 origin-center"
                  style={{
                    width: menuOpen ? '22px' : '14px',
                    transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                  }}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Slide-in menu (mobile / tablet) ── */}
      <div
        className="fixed inset-0 z-[8900] transition-opacity duration-300 bg-ink/40"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className="fixed top-0 right-0 h-full z-[9050] flex flex-col justify-between bg-cream transition-transform duration-500"
        style={{
          width: 'min(360px, 88vw)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="px-8 pt-8 pb-6 border-b border-ink/10 flex items-center gap-2.5">
          <Image src="/picture-repo/logo/logo-svg.svg" alt="" width={24} height={24} className="brightness-0" />
          <span className="font-display text-[20px] text-ink">KT Equestrian</span>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8">
          {[{ href: '/', label: 'Home' }, ...links, { href: '/contact', label: tx.contact.navLabel }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between py-4 border-b border-ink/10"
            >
              <span className="font-display text-[30px] leading-none text-ink">{item.label}</span>
              <span className="text-ink/40 group-hover:text-ink transition-colors" aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>

        <div className="px-8 py-8 border-t border-ink/10">
          <p className="font-sans font-medium text-[10px] tracking-[0.3em] text-ink/50 uppercase mb-3">Language</p>
          <LanguageToggle size="md" />
        </div>
      </div>
    </>
  )
}
