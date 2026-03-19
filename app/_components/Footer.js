'use client'

import Link from 'next/link'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

export default function Footer() {
  const { lang } = useLang()
  const tx = t[lang]

  return (
    <footer className="relative bg-[#0f0c09] overflow-hidden" style={{ zIndex: 1 }}>
      {/* Top gold rule */}
      <div className="absolute top-0 inset-x-5 md:inset-x-20 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-[1320px] mx-auto px-5 md:px-20 pt-20 md:pt-28 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_1fr] gap-12 md:gap-16 mb-20">

          {/* Brand */}
          <div>
            <h3 className="font-[var(--font-cinzel)] text-champagne text-lg tracking-[0.15em] uppercase mb-1.5">
              KT Equestrian
            </h3>
            <p className="font-[var(--font-cormorant)] italic text-gold/45 text-lg mb-8">
              {tx.footer.sub}
            </p>
            <p className="font-[var(--font-jost)] font-light text-[13px] text-champagne/25 leading-[1.85] max-w-[300px]">
              Dedicated to the art of riding — where horse and rider grow together in trust, precision, and passion.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/40 uppercase mb-8">Navigate</h4>
            <nav className="flex flex-col gap-4">
              {[
                { href: '#about', label: tx.about.label },
                { href: '#services', label: tx.services.label },
                { href: '#contact', label: tx.contact.navLabel },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-[var(--font-jost)] font-light text-[14px] text-champagne/30 hover:text-champagne/70 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/about"
                className="font-[var(--font-jost)] font-light text-[14px] text-champagne/30 hover:text-champagne/70 transition-colors duration-200"
              >
                {tx.aboutMe?.navLabel || 'About Kelly'}
              </Link>
            </nav>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/40 uppercase mb-8">Contact</h4>
            <div className="space-y-3 mb-10">
              <p className="font-[var(--font-jost)] font-light text-[13px] text-champagne/30 leading-[1.7]">{tx.contact.address}</p>
              <p className="font-[var(--font-jost)] font-light text-[13px] text-champagne/30">{tx.contact.hours}</p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              <a href="https://instagram.com/ktequestrian" target="_blank" rel="noopener noreferrer" className="text-champagne/25 hover:text-gold transition-colors duration-200" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://facebook.com/ktequestrian" target="_blank" rel="noopener noreferrer" className="text-champagne/25 hover:text-gold transition-colors duration-200" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-[var(--font-jost)] font-light text-[11px] text-champagne/15 tracking-wide">
            &copy; {new Date().getFullYear()} KT Equestrian. All rights reserved.
          </p>
          <p className="font-[var(--font-jost)] font-light text-[11px] text-champagne/10 tracking-wide">
            Steinsel, Luxembourg
          </p>
        </div>
      </div>
    </footer>
  )
}
