'use client'

import Image from 'next/image'
import Link from 'next/link'
import ServiceCards from './_components/ServiceCards'
import ReviewCarousel from './_components/ReviewCarousel'
import Navbar from './_components/Navbar'
import InstagramMosaic from './_components/InstagramMosaic'
import ContactSection from './_components/ContactSection'
import { useEffect, useRef } from 'react'
import { useLang } from './_components/LanguageProvider'
import { t } from '../lib/translations'

const PARALLAX_TEXT = -0.06

export default function Home() {
  const { lang } = useLang()
  const tx = t[lang]

  const textRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      const vh = window.innerHeight
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${y * PARALLAX_TEXT}px)`
        textRef.current.style.opacity = Math.max(0, 1 - y / (vh * 0.45)).toString()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>
      <Navbar />

      {/* ── HERO ── */}
      <section className="sticky top-0 w-full h-screen overflow-hidden bg-black" style={{ zIndex: 0 }}>

        {/* Gold frame — matches about page */}
        <div className="absolute inset-4 md:inset-10 border border-gold/50 pointer-events-none z-10"
          style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)' }} />
        <div className="absolute inset-[20px] md:inset-[44px] border border-gold/15 pointer-events-none z-10" />

        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/choice2.jpeg"
            alt="KT Equestrian"
            fill priority sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 18%', filter: 'grayscale(1) brightness(0.38) contrast(1.1)' }}
          />
        </div>

        {/* Gradient — heavier at bottom */}
        <div className="absolute inset-0 z-20"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.9) 100%)' }} />

        {/* Hero content — bottom left, editorial */}
        <div ref={textRef} className="absolute inset-0 z-30 flex flex-col justify-end px-5 pb-14 md:px-[80px] md:pb-20 will-change-transform">

          {/* Tagline */}
          <div className="flex items-center gap-3 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <span className="w-6 h-px bg-gold/70" />
            <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/80 uppercase">{tx.hero.tagline}</span>
          </div>

          {/* Main title */}
          <h1
            className="font-[var(--font-cinzel)] font-normal text-champagne uppercase leading-[0.85] opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(38px, 11vw, 148px)', letterSpacing: '0.04em', animationDelay: '0.8s' }}
          >
            Equestrian
            <em className="block font-[var(--font-cormorant)] not-italic italic text-gold leading-none" style={{ letterSpacing: '0.02em' }}>
              Excellence
            </em>
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 mt-8 opacity-0 animate-fade-up" style={{ animationDelay: '1.1s' }}>
            <a href="#contact"
              className="btn-shimmer inline-flex items-center justify-center sm:justify-start gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-champagne uppercase bg-burgundy border border-burgundy/80 px-8 py-3.5 transition-all duration-300 hover:bg-burgundy/80 active:scale-[0.97]">
              {tx.hero.cta1}
              <span className="w-4 h-px bg-current" />
            </a>
            <a href="#about"
              className="inline-flex items-center justify-center sm:justify-start gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-champagne/60 uppercase border border-gold/30 px-8 py-3.5 transition-all duration-300 hover:text-champagne hover:border-gold/60 active:scale-[0.97]">
              {tx.hero.cta2}
            </a>
          </div>
        </div>

        {/* Bottom-right socials */}
        <div className="absolute bottom-12 md:bottom-[72px] right-8 md:right-[72px] z-30 flex flex-col items-end gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '1.6s' }}>
          <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.45em] text-champagne/35 uppercase">Follow</span>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/ktequestrian" target="_blank" rel="noopener noreferrer" className="text-champagne/45 hover:text-gold transition-colors duration-200" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://facebook.com/ktequestrian" target="_blank" rel="noopener noreferrer" className="text-champagne/45 hover:text-gold transition-colors duration-200" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '2s' }}>
          <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent animate-scroll-pulse" />
          <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-champagne/35 uppercase">{tx.hero.scroll}</span>
        </div>
      </section>

      {/* ── ABOUT — editorial pull quote ── */}
      <section id="about" className="relative bg-champagne px-5 pt-16 pb-14 md:px-[80px] md:pt-24 md:pb-20 overflow-hidden"
        style={{ zIndex: 1 }}>
        {/* Top rule */}
        <div className="absolute top-0 left-5 right-5 md:left-[80px] md:right-[80px] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        {/* Label */}
        <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[10px] tracking-[0.5em] text-gold uppercase mb-10
          before:content-[''] before:w-[30px] before:h-px before:bg-gold">
          {tx.about.label}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 md:gap-20 items-start">

          {/* Left: pull quote + bio + link */}
          <div>
            <blockquote
              className="font-[var(--font-cormorant)] italic font-light text-burgundy leading-[1.25] mb-10"
              style={{ fontSize: 'clamp(22px, 4vw, 52px)' }}
            >
              "{tx.about.bio}"
            </blockquote>

            <div className="mb-10">
              <h2 className="font-[var(--font-cinzel)] font-semibold text-burgundy uppercase tracking-[0.1em] leading-[1.2] mb-4"
                style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                {tx.about.title1}
                <em className="block font-[var(--font-cormorant)] italic font-light text-[1.15em] text-burgundy tracking-[0.05em]">
                  {tx.about.title2}
                </em>
              </h2>
              {t[lang].aboutMe?.storyP1 && (
                <p className="font-[var(--font-jost)] font-light text-[14px] leading-[1.9] text-burgundy/60 mt-4">
                  {t[lang].aboutMe.storyP1}
                </p>
              )}
            </div>

            <Link href="/about"
              className="inline-flex items-center gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-burgundy uppercase border-b border-gold pb-2 transition-all duration-300 hover:text-gold hover:gap-8">
              {tx.about.cta}
              <span className="relative w-[28px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[6px] after:h-[6px] after:border-r after:border-t after:border-current after:rotate-45" />
            </Link>
          </div>

          {/* Right: Instagram mosaic */}
          <div className="hidden lg:block">
            <InstagramMosaic />
          </div>
        </div>
      </section>

      {/* ── STATS — dark band ── */}
      <section className="bg-burgundy py-12 md:py-18 px-5 md:px-[80px]">
        {/* Mobile: vertical list */}
        <div className="flex flex-col divide-y divide-gold/15 sm:hidden">
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '10',  label: 'Competition Titles' },
            { num: '2015', label: t[lang].about?.established ?? 'Est. 2015' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-4 px-2">
              <span className="font-[var(--font-jost)] font-light text-[10px] tracking-[0.35em] text-champagne/35 uppercase">{s.label}</span>
              <span className="font-[var(--font-cinzel)] text-gold text-[28px] leading-none">{s.num}</span>
            </div>
          ))}
        </div>
        {/* Tablet+: 3 columns */}
        <div className="hidden sm:grid grid-cols-3 divide-x divide-gold/15">
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '10',  label: 'Competition Titles' },
            { num: '2015', label: t[lang].about?.established ?? 'Est. 2015' },
          ].map((s, i) => (
            <div key={i} className="text-center px-4 md:px-10 flex flex-col items-center gap-2">
              <span className="font-[var(--font-cinzel)] text-gold leading-none" style={{ fontSize: 'clamp(32px, 5.5vw, 72px)' }}>
                {s.num}
              </span>
              <span className="font-[var(--font-jost)] font-light text-[9px] md:text-[10px] tracking-[0.4em] text-champagne/35 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <ServiceCards />
      <ContactSection />
      <ReviewCarousel />
    </main>
  )
}
