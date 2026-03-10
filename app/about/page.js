'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../_components/Navbar'
import { useLang } from '../_components/LanguageProvider'
import { t } from '../../lib/translations'

const PLACE_STYLES = {
  '1': { color: '#b8946a', border: 'rgba(184,148,106,0.45)', bg: 'rgba(184,148,106,0.08)', dot: '#b8946a' },
  '2': { color: 'rgba(107,20,40,0.65)', border: 'rgba(107,20,40,0.2)', bg: 'transparent', dot: 'rgba(184,148,106,0.4)' },
  '3': { color: 'rgba(107,20,40,0.45)', border: 'rgba(107,20,40,0.12)', bg: 'transparent', dot: 'rgba(107,20,40,0.2)' },
}

function placeStyle(result) {
  const key = result.charAt(0)
  return PLACE_STYLES[key] ?? PLACE_STYLES['3']
}

export default function AboutPage() {
  const { lang } = useLang()
  const tx = t[lang].aboutMe
  const footer = t[lang].footer

  return (
    <main className="bg-champagne min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ── HERO — full screen portrait ── */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <Image
          src="/images/kelly-with-horse.jpg"
          alt="Kelly Trausch"
          fill priority sizes="100vw"
          className="object-cover object-top"
          style={{ filter: 'grayscale(1) brightness(0.35) contrast(1.1)' }}
        />

        {/* Gold frame */}
        <div className="absolute inset-4 md:inset-10 border border-gold/50 pointer-events-none z-10"
          style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)' }} />
        <div className="absolute inset-[20px] md:inset-[44px] border border-gold/15 pointer-events-none z-10" />

        {/* Gradient — heavy at bottom */}
        <div className="absolute inset-0 z-20"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.95) 100%)' }} />

        {/* Hero content */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end px-5 pb-12 md:px-[80px] md:pb-16">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <span className="w-6 h-px bg-gold/70" />
            <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/80 uppercase">{tx.heroTagline}</span>
          </div>

          {/* Name — massive */}
          <h1
            className="font-[var(--font-cinzel)] font-normal text-champagne uppercase leading-[0.85] opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(64px, 12vw, 160px)', animationDelay: '0.7s', letterSpacing: '0.04em' }}
          >
            {tx.heroTitle1}
            <em className="block font-[var(--font-cormorant)] not-italic italic text-[0.9em] text-gold leading-none" style={{ letterSpacing: '0.02em' }}>
              {tx.heroTitle2}
            </em>
          </h1>

          {/* Sub */}
          <p className="font-[var(--font-jost)] font-light text-[11px] tracking-[0.5em] text-champagne/40 uppercase mt-5 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.9s' }}>
            {tx.heroSub}
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-10 z-30 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent animate-scroll-pulse" />
        </div>
      </section>

      {/* ── STORY — editorial pull quote ── */}
      <section className="relative bg-champagne px-5 pt-16 pb-12 md:px-[80px] md:pt-24 md:pb-20
        before:content-[''] before:absolute before:top-0 before:left-5 before:right-5
        md:before:left-[80px] md:before:right-[80px] before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-gold/50 before:to-transparent">

        <div className="max-w-[900px]">
          {/* Pull quote */}
          <blockquote
            className="font-[var(--font-cormorant)] italic font-light text-burgundy leading-[1.25] mb-12"
            style={{ fontSize: 'clamp(28px, 4.5vw, 58px)' }}
          >
            "{tx.storyP1}"
          </blockquote>

          {/* Two-column body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <p className="font-[var(--font-jost)] font-light text-[14px] leading-[1.9] text-burgundy/65">{tx.storyP2}</p>
            <p className="font-[var(--font-jost)] font-light text-[14px] leading-[1.9] text-burgundy/65">{tx.storyP3}</p>
          </div>
        </div>
      </section>

      {/* ── STATS — oversized numbers on dark band ── */}
      <section className="bg-burgundy py-14 md:py-20 px-5 md:px-[80px]">
        <div className="grid grid-cols-3 divide-x divide-gold/15">
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '10',  label: 'Competition Titles' },
            { num: '2015', label: 'Year Founded' },
          ].map((s, i) => (
            <div key={i} className="text-center px-4 md:px-10 flex flex-col items-center gap-2">
              <span
                className="font-[var(--font-cinzel)] text-gold leading-none"
                style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
              >
                {s.num}
              </span>
              <span className="font-[var(--font-jost)] font-light text-[9px] md:text-[10px] tracking-[0.4em] text-champagne/35 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMATION — large-scale timeline ── */}
      <section className="relative bg-champagne px-5 py-16 md:px-[80px] md:py-24
        before:content-[''] before:absolute before:top-0 before:left-5 before:right-5
        md:before:left-[80px] md:before:right-[80px] before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-gold/50 before:to-transparent">

        <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[10px] tracking-[0.5em] text-gold uppercase mb-14
          before:content-[''] before:w-[30px] before:h-px before:bg-gold">
          {tx.educationLabel}
        </div>

        <div className="space-y-0">
          {tx.education.map((item, i) => (
            <div
              key={i}
              className="group grid grid-cols-[80px_1px_1fr] md:grid-cols-[120px_1px_1fr] gap-x-8 py-7 border-b border-gold/10 hover:border-gold/25 transition-colors duration-300"
            >
              {/* Year */}
              <span
                className="font-[var(--font-cinzel)] text-gold/40 group-hover:text-gold/70 transition-colors duration-300 leading-none self-start pt-1"
                style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
              >
                {item.year}
              </span>

              {/* Vertical line + dot */}
              <div className="relative flex justify-center">
                <div className="absolute top-0 bottom-0 w-px bg-gold/15 group-hover:bg-gold/30 transition-colors duration-300" />
                <div className="w-[7px] h-[7px] rounded-full border border-gold/40 bg-champagne z-10 mt-2 flex-shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="pl-2">
                <h3 className="font-[var(--font-cinzel)] text-[11px] md:text-[12px] tracking-[0.2em] text-burgundy uppercase leading-[1.5] mb-2 group-hover:text-burgundy transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-[var(--font-jost)] font-light text-[13px] leading-[1.75] text-burgundy/50">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPETITION RECORD ── */}
      <section className="relative bg-burgundy px-5 py-16 md:px-[80px] md:py-24">
        {/* Gold line top */}
        <div className="absolute top-0 left-5 right-5 md:left-[80px] md:right-[80px] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[10px] tracking-[0.5em] text-gold uppercase mb-14
          before:content-[''] before:w-[30px] before:h-px before:bg-gold">
          {tx.tournamentsLabel}
        </div>

        {/* Record table */}
        <div className="space-y-0">
          {tx.tournaments.map((item, i) => {
            const style = placeStyle(item.result)
            const isFirst = item.result.startsWith('1')
            return (
              <div
                key={i}
                className="group grid grid-cols-[48px_1fr_auto] md:grid-cols-[64px_1fr_160px] items-center gap-4 md:gap-8 py-5 border-b border-white/5 hover:border-gold/20 transition-all duration-200"
                style={{ background: isFirst ? 'rgba(184,148,106,0.04)' : 'transparent' }}
              >
                {/* Year */}
                <span className="font-[var(--font-cinzel)] text-[10px] tracking-[0.1em] text-champagne/25 group-hover:text-gold/50 transition-colors duration-200">
                  {item.year}
                </span>

                {/* Event */}
                <div>
                  <p className="font-[var(--font-cinzel)] text-[10px] md:text-[11px] tracking-[0.15em] text-champagne/75 uppercase leading-[1.4] group-hover:text-champagne transition-colors duration-200">
                    {item.event}
                  </p>
                  <p className="font-[var(--font-jost)] font-light text-[11px] text-champagne/25 mt-0.5">
                    {item.discipline}
                  </p>
                </div>

                {/* Result badge */}
                <div className="flex justify-end">
                  <span
                    className="font-[var(--font-cinzel)] text-[9px] tracking-[0.25em] uppercase px-3 py-1 border whitespace-nowrap"
                    style={{ color: style.color, borderColor: style.border, background: style.bg }}
                  >
                    {item.result}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Gold count summary */}
        <div className="mt-10 pt-8 border-t border-gold/15 flex items-center gap-4">
          <span className="font-[var(--font-cinzel)] text-[28px] md:text-[36px] text-gold leading-none">
            {tx.tournaments.filter(t => t.result.startsWith('1')).length}
          </span>
          <div>
            <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.4em] text-gold uppercase">First Place Victories</p>
            <p className="font-[var(--font-jost)] font-light text-[11px] text-champagne/30 mt-0.5">across international & national competition</p>
          </div>
        </div>
      </section>

      {/* ── CTA — book a session ── */}
      <section className="bg-champagne px-5 py-16 md:px-[80px] md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8
        before:content-[''] before:absolute before:left-0 before:right-0 before:h-px before:bg-gold/10 relative">
        <div className="absolute top-0 left-5 right-5 md:left-[80px] md:right-[80px] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div>
          <div className="flex items-center gap-3 mb-3 font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold uppercase
            before:content-[''] before:w-[24px] before:h-px before:bg-gold">
            {lang === 'FR' ? 'Travailler Avec Kelly' : lang === 'LB' ? 'Mat Kelly Schaffen' : 'Work With Kelly'}
          </div>
          <p className="font-[var(--font-cormorant)] italic font-light text-burgundy leading-[1.2]"
            style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}>
            {lang === 'FR' ? 'Prêt à commencer\nvotre voyage ?' : lang === 'LB' ? 'Prett fir Äre Wee\nunzefänken?' : 'Ready to begin\nyour journey?'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/booking"
            className="btn-shimmer inline-flex items-center justify-center gap-4 font-[var(--font-cinzel)] text-[10px] tracking-[0.35em] text-champagne uppercase bg-burgundy border border-burgundy px-8 py-3.5 transition-all duration-300 hover:bg-burgundy/80 active:scale-[0.97] whitespace-nowrap">
            {lang === 'FR' ? 'Réserver une Séance' : lang === 'LB' ? 'Eng Séance Buchen' : 'Book a Session'}
            <span className="w-4 h-px bg-current" />
          </Link>
          <Link href="/#contact"
            className="inline-flex items-center justify-center gap-4 font-[var(--font-cinzel)] text-[10px] tracking-[0.35em] text-burgundy uppercase border border-gold/40 px-8 py-3.5 transition-all duration-300 hover:border-gold active:scale-[0.97] whitespace-nowrap">
            {lang === 'FR' ? 'Nous Contacter' : lang === 'LB' ? 'Kontakt' : 'Get in Touch'}
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-burgundy px-5 py-5 md:px-[80px] md:py-6 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between border-t border-gold/15">
        <Link href="/" className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne/40 uppercase hover:text-gold/60 transition-colors duration-200">
          ← KT Equestrian
        </Link>
        <div className="flex items-center gap-5">
          <a href="#" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="Facebook">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
        <span className="font-[var(--font-jost)] text-[10px] tracking-[0.15em] text-champagne/30 uppercase">{footer.sub}</span>
      </footer>
    </main>
  )
}
