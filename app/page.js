'use client'

import Image from 'next/image'
import ServiceCards from './_components/ServiceCards'
import ReviewCarousel from './_components/ReviewCarousel'
import Navbar from './_components/Navbar'
import { useLang } from './_components/LanguageProvider'
import { t } from '../lib/translations'

export default function Home() {
  const { lang } = useLang()
  const tx = t[lang]

  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section className="sticky top-0 w-full h-screen overflow-hidden bg-black" style={{ zIndex: 0 }}>
        <div className="absolute inset-3 md:inset-8 border border-gold/85 pointer-events-none z-[9999] shadow-[inset_0_0_80px_rgba(184,148,106,0.04),inset_0_0_2px_rgba(184,148,106,0.15)] before:content-[''] before:absolute before:inset-[4px] md:before:inset-[5px] before:border before:border-gold/25" />
        <Image src="/images/hero-bg.jpg" alt="KT Equestrian" fill priority className="object-cover object-center grayscale brightness-[0.65] contrast-110 opacity-72" />
        <div className="absolute inset-[8px] md:inset-[14px] border border-gold/25 pointer-events-none z-10" />
        <div className="absolute inset-0 z-20" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.65) 100%), radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)' }} />

        {/* Hero content */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 md:px-[120px]">
          <div className="flex items-center gap-3 md:gap-5 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <span className="w-[25px] md:w-[50px] h-px bg-gold" />
            <span className="font-[var(--font-cinzel)] text-[9px] md:text-[11px] tracking-[0.35em] md:tracking-[0.5em] text-gold uppercase whitespace-nowrap">{tx.hero.tagline}</span>
            <span className="w-[25px] md:w-[50px] h-px bg-gold" />
          </div>
          <h1 className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.08em] md:tracking-[0.12em] leading-[0.9] mb-8" style={{ fontSize: 'clamp(42px, 9vw, 110px)' }}>
            Equestrian
            <em className="block font-[var(--font-cormorant)] not-italic italic text-[1.1em] text-champagne tracking-[0.04em] md:tracking-[0.06em]">
              Excellence
            </em>
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2 opacity-0 animate-fade-up" style={{ animationDelay: '1.3s' }}>
            <a href="#contact" className="inline-block font-[var(--font-cinzel)] text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.35em] text-champagne bg-gold/20 uppercase border border-gold px-6 md:px-8 py-3 md:py-3.5 transition-all duration-300 cursor-pointer hover:bg-gold/35 w-full sm:w-auto text-center">
              {tx.hero.cta1}
            </a>
            <a href="#about" className="inline-block font-[var(--font-cinzel)] text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.45em] text-champagne/75 uppercase border border-gold/35 px-6 md:px-9 py-3 md:py-3.5 transition-all duration-300 cursor-pointer relative overflow-hidden group hover:border-gold/70 hover:text-champagne w-full sm:w-auto text-center">
              <span className="absolute bottom-0 left-0 w-0 h-full bg-gold/10 transition-all duration-400 group-hover:w-full" />
              <span className="relative">{tx.hero.cta2}</span>
            </a>
          </div>
        </div>

        {/* Side socials */}
        <div className="hidden lg:flex absolute right-[90px] top-1/2 -translate-y-1/2 z-30 flex-col gap-[18px] items-center opacity-0 animate-fade-in before:content-[''] before:w-px before:h-[50px] before:bg-gold/40 before:mb-2.5" style={{ animationDelay: '1.5s' }}>
          <a href="#" className="font-[var(--font-cinzel)] text-[9px] tracking-[0.25em] text-champagne/60 no-underline [writing-mode:vertical-rl] uppercase transition-colors hover:text-gold">Instagram</a>
          <a href="#" className="font-[var(--font-cinzel)] text-[9px] tracking-[0.25em] text-champagne/60 no-underline [writing-mode:vertical-rl] uppercase transition-colors hover:text-gold">Facebook</a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 md:bottom-[72px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 opacity-0 animate-fade-in" style={{ animationDelay: '2s' }}>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
          <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-champagne/50 uppercase">{tx.hero.scroll}</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative bg-champagne px-5 py-14 md:px-[80px] md:py-[90px] grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-[80px] items-center overflow-hidden before:content-[''] before:absolute before:top-0 before:left-5 before:right-5 md:before:left-[80px] md:before:right-[80px] before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent" style={{ zIndex: 1, boxShadow: '0 -24px 60px 0 rgba(247,242,232,0.18), 0 -2px 0 0 rgba(184,148,106,0.15)' }}>
        {/* Image */}
        <div className="relative">
          <Image src="/images/kelly-with-horse.jpg" alt="Kelly with her horse" width={600} height={480} className="w-full h-[280px] md:h-[480px] object-cover sepia-[5%] contrast-105" />
          <div className="absolute inset-[-12px_-12px_12px_12px] border border-burgundy/20 pointer-events-none -z-10" />
          <div className="absolute top-5 -right-5 bg-burgundy text-champagne font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] uppercase px-[18px] py-2.5 [writing-mode:vertical-rl]">
            {tx.about.established}
          </div>
        </div>

        {/* Text */}
        <div className="pl-0 md:pl-5">
          <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[10px] tracking-[0.5em] text-gold uppercase mb-5 before:content-[''] before:w-[30px] before:h-px before:bg-gold">
            {tx.about.label}
          </div>
          <h2 className="font-[var(--font-cinzel)] font-semibold text-burgundy uppercase tracking-[0.1em] leading-[1.15] mb-7" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            {tx.about.title1}
            <em className="block font-[var(--font-cormorant)] italic font-light text-[1.2em] text-burgundy tracking-[0.06em]">
              {tx.about.title2}
            </em>
          </h2>
          <p key={lang} className="font-[var(--font-jost)] font-light text-[14px] leading-[1.9] text-burgundy/70 max-w-[400px] mb-10 animate-fade-in">
            {tx.about.bio}
          </p>
          <a href="#contact" className="inline-flex items-center gap-[18px] font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-burgundy uppercase no-underline border-b border-gold pb-2 transition-all duration-300 cursor-pointer hover:text-gold hover:gap-[26px]">
            {tx.about.cta}
            <span className="relative w-[30px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[6px] after:h-[6px] after:border-r after:border-t after:border-current after:rotate-45" />
          </a>
        </div>
      </section>

      <ServiceCards />
      <ReviewCarousel />

      {/* ── FOOTER ── */}
      <footer className="bg-text-dark px-5 py-8 md:px-[80px] md:py-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne/40 uppercase">
          © {new Date().getFullYear()} KT Equestrian
        </span>
        <span className="font-[var(--font-jost)] text-[10px] tracking-[0.15em] text-champagne/30 uppercase">
          {tx.footer.sub}
        </span>
      </footer>
    </main>
  )
}
