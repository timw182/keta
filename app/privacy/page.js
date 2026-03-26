'use client'

import Link from 'next/link'
import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'
import { useLang } from '../_components/LanguageProvider'
import { t } from '../../lib/translations'

export default function PrivacyPage() {
  const { lang } = useLang()
  const tx = t[lang].privacy

  return (
    <main className="min-h-screen" style={{ background: '#0f0c09' }}>
      <Navbar />

      {/* Hero */}
      <div className="relative flex flex-col items-center justify-end px-6 text-center pb-14 md:pb-20 pt-[160px] md:pt-[200px]">
        <div className="absolute inset-3 md:inset-8 border border-gold/15 pointer-events-none" />

        <div className="flex items-center gap-3 md:gap-5 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <span className="w-[25px] md:w-[40px] h-px bg-gold/50" />
          <span className="font-[var(--font-cinzel)] text-[9px] md:text-[11px] tracking-[0.4em] text-gold/70 uppercase">{tx.label}</span>
          <span className="w-[25px] md:w-[40px] h-px bg-gold/50" />
        </div>
        <h1
          className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.08em] leading-[0.9] opacity-0 animate-fade-up"
          style={{ fontSize: 'clamp(48px, 10vw, 110px)', animationDelay: '0.5s' }}
        >
          {tx.title}
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-5 pb-20 md:px-20 md:pb-28">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent mb-16" />

        <div className="space-y-12">
          {tx.sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-[var(--font-cinzel)] text-[10px] tracking-[0.5em] text-gold/50 uppercase mb-5">
                {section.heading}
              </h2>
              <div className="font-[var(--font-jost)] font-light text-[14px] text-champagne/50 leading-[1.9] space-y-3">
                {section.lines.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
