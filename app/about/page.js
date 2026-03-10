'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../_components/Navbar'
import { useLang } from '../_components/LanguageProvider'
import { t } from '../../lib/translations'

export default function AboutPage() {
  const { lang } = useLang()
  const tx = t[lang].aboutMe
  const footer = t[lang].footer

  return (
    <main className="bg-champagne min-h-screen">
      <Navbar />

      {/* ── HERO — compact ── */}
      <section className="relative w-full overflow-hidden bg-burgundy" style={{ minHeight: '40vh' }}>
        <Image src="/images/kelly-with-horse.jpg" alt="Kelly Trausch" fill priority
          className="object-cover object-top grayscale brightness-[0.45] contrast-110" />
        <div className="absolute inset-3 md:inset-8 border border-gold/40 pointer-events-none z-10" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-10 md:pb-14 text-center px-6">
          <div className="flex items-center gap-3 mb-3 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <span className="w-[20px] h-px bg-gold" />
            <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-gold uppercase">{tx.heroTagline}</span>
            <span className="w-[20px] h-px bg-gold" />
          </div>
          <h1 className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.1em] leading-[0.9] mb-2 opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(36px, 8vw, 90px)', animationDelay: '0.6s' }}>
            {tx.heroTitle1}
            <em className="block font-[var(--font-cormorant)] not-italic italic text-[0.95em] tracking-[0.05em]">{tx.heroTitle2}</em>
          </h1>
          <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-champagne/45 uppercase opacity-0 animate-fade-up"
            style={{ animationDelay: '0.8s' }}>{tx.heroSub}</p>
        </div>
      </section>

      {/* ── RESUME BODY ── */}
      <div className="px-5 py-10 md:px-[80px] md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 md:gap-16
        before:content-[''] before:col-span-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/50 before:to-transparent">

        {/* ── LEFT: bio + stats ── */}
        <div className="flex flex-col gap-7">

          {/* Bio */}
          <div>
            <div className="flex items-center gap-2.5 font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-gold uppercase mb-3
              before:content-[''] before:w-[20px] before:h-px before:bg-gold">
              {tx.storyLabel}
            </div>
            <p className="font-[var(--font-jost)] font-light text-[13px] leading-[1.85] text-burgundy/70">{tx.storyP1}</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 border-t border-b border-gold/15 py-5">
            {[
              { num: '10+', label: 'Years' },
              { num: '10', label: 'Titles' },
              { num: '2015', label: 'Founded' },
            ].map(s => (
              <div key={s.num} className="text-center">
                <span className="font-[var(--font-cinzel)] text-[20px] md:text-[24px] text-burgundy block leading-none mb-1">{s.num}</span>
                <span className="font-[var(--font-jost)] text-[9px] tracking-[0.3em] text-burgundy/40 uppercase">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Education timeline */}
          <div>
            <div className="flex items-center gap-2.5 font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-gold uppercase mb-4
              before:content-[''] before:w-[20px] before:h-px before:bg-gold">
              {tx.educationLabel}
            </div>
            <div className="relative space-y-4">
              <div className="absolute left-[38px] top-0 bottom-0 w-px bg-gold/15" />
              {tx.education.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-[38px] font-[var(--font-cinzel)] text-[9px] tracking-[0.1em] text-gold/50 text-right pt-[2px]">{item.year}</span>
                  <div className="flex-shrink-0 w-[7px] h-[7px] rounded-full border border-gold/40 bg-champagne mt-[4px] relative z-10" />
                  <div className="flex-1">
                    <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.15em] text-burgundy uppercase leading-[1.4]">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: tournament record ── */}
        <div>
          <div className="flex items-center gap-2.5 font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-gold uppercase mb-5
            before:content-[''] before:w-[20px] before:h-px before:bg-gold">
            {tx.tournamentsLabel}
          </div>
          <div>
            {tx.tournaments.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-gold/10 group hover:bg-gold/[0.03] transition-colors duration-200 -mx-2 px-2">
                <span className="flex-shrink-0 font-[var(--font-cinzel)] text-[9px] tracking-[0.1em] text-gold/40 w-8">{item.year}</span>
                <span
                  className="flex-shrink-0 font-[var(--font-cinzel)] text-[7px] tracking-[0.25em] uppercase px-2 py-0.5 border whitespace-nowrap"
                  style={{
                    color: item.result.startsWith('1') ? '#b8946a' : 'rgba(107,20,40,0.5)',
                    borderColor: item.result.startsWith('1') ? 'rgba(184,148,106,0.4)' : 'rgba(107,20,40,0.2)',
                    background: item.result.startsWith('1') ? 'rgba(184,148,106,0.07)' : 'transparent',
                  }}
                >{item.result}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-[var(--font-cinzel)] text-[9px] md:text-[10px] tracking-[0.1em] text-burgundy uppercase truncate">{item.event}</p>
                  <p className="font-[var(--font-jost)] text-[9px] text-burgundy/35 truncate">{item.discipline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-burgundy px-5 py-5 md:px-[80px] md:py-6 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between border-t border-gold/15">
        <Link href="/" className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne/40 uppercase hover:text-gold/60 transition-colors duration-200">
          ← KT Equestrian
        </Link>
        <div className="flex items-center gap-5">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="Facebook">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="X">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
        <span className="font-[var(--font-jost)] text-[10px] tracking-[0.15em] text-champagne/30 uppercase">{footer.sub}</span>
      </footer>
    </main>
  )
}
