'use client'

import Image from 'next/image'
import Link from 'next/link'
import ServiceCards from './_components/ServiceCards'
import ReviewCarousel from './_components/ReviewCarousel'
import Navbar from './_components/Navbar'
import InstagramMosaic from './_components/InstagramMosaic'
import ContactSection from './_components/ContactSection'
import GoldenBubbles from './_components/GoldenBubbles'
import { useEffect, useRef, useState } from 'react'
import { useLang } from './_components/LanguageProvider'
import { t } from '../lib/translations'

export default function Home() {
  const { lang } = useLang()
  const tx = t[lang]

  const imgRef  = useRef(null)
  const textRef = useRef(null)

  const heroImages = [
    '/images/choice2.jpeg',
    '/images/choice3.jpg',
    '/images/choice4.jpg',
    '/images/heropic.jpeg',
  ]
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(i => (i + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (imgRef.current)  imgRef.current.style.transform  = `translateY(${y * 0.38}px) scale(1.18)`
      if (textRef.current) textRef.current.style.transform = `translateY(${y * -0.08}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>
      <GoldenBubbles />
      <Navbar />

      {/* ── HERO ── */}
      <section className="sticky top-0 w-full h-screen overflow-hidden bg-black" style={{ zIndex: 0 }}>
        {/* Outer gold frame — strong inner shadow creates recessed/3D depth */}
        <div className="absolute inset-3 md:inset-8 border border-gold/85 pointer-events-none z-[9999]"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(184,148,106,0.12), inset 0 0 40px 8px rgba(0,0,0,0.55), inset 0 0 8px 1px rgba(184,148,106,0.18)' }} />
        {/* Inner fine line for layered frame depth */}
        <div className="absolute inset-[18px] md:inset-[28px] border border-gold/30 pointer-events-none z-[9999]"
          style={{ boxShadow: 'inset 0 0 20px 4px rgba(0,0,0,0.30)' }} />
        <div ref={imgRef} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.18)' }}>
          {heroImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="KT Equestrian"
              fill
              priority={i === 0}
              className="object-cover grayscale brightness-[0.65] contrast-110 transition-opacity duration-[1500ms] ease-in-out"
              style={{ objectPosition: 'center 18%', opacity: i === activeIdx ? 0.72 : 0 }}
            />
          ))}
        </div>
        {/* Mid frame ring */}
        <div className="absolute inset-[8px] md:inset-[14px] border border-gold/20 pointer-events-none z-10" />
        <div className="absolute inset-0 z-20" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.65) 100%), radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)' }} />

        {/* Hero content */}
        <div ref={textRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 md:px-[120px] will-change-transform">
          <div className="flex items-center gap-3 md:gap-5 mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <span className="w-[25px] md:w-[50px] h-px bg-gold" />
            <span className="font-[var(--font-cinzel)] text-[11px] md:text-[12px] tracking-[0.35em] md:tracking-[0.5em] text-gold uppercase whitespace-nowrap">{tx.hero.tagline}</span>
            <span className="w-[25px] md:w-[50px] h-px bg-gold" />
          </div>
          <h1 className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.08em] md:tracking-[0.12em] leading-[0.9] mb-8" style={{ fontSize: 'clamp(42px, 9vw, 110px)' }}>
            Equestrian
            <em className="block font-[var(--font-cormorant)] not-italic italic text-[1.1em] text-champagne tracking-[0.04em] md:tracking-[0.06em]">
              Excellence
            </em>
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2 opacity-0 animate-fade-up" style={{ animationDelay: '1.3s' }}>
            <a href="#" className="btn-shimmer inline-block font-[var(--font-cinzel)] text-[11px] md:text-[11px] tracking-[0.3em] md:tracking-[0.35em] text-champagne bg-gold/20 uppercase border border-gold px-6 md:px-8 py-3 md:py-3.5 transition-all duration-300 cursor-pointer hover:bg-gold/35 active:scale-[0.97] w-full sm:w-auto text-center">
              {tx.hero.cta1}
            </a>
            <a href="#about" className="inline-block font-[var(--font-cinzel)] text-[11px] md:text-[11px] tracking-[0.3em] md:tracking-[0.45em] text-champagne/75 uppercase border border-gold/35 px-6 md:px-9 py-3 md:py-3.5 transition-all duration-300 cursor-pointer relative overflow-hidden group hover:border-gold hover:text-burgundy active:scale-[0.97] w-full sm:w-auto text-center">
              <span className="absolute bottom-0 left-0 w-0 h-full bg-gold transition-[width] duration-400 ease-in-out group-hover:w-full" />
              <span className="relative">{tx.hero.cta2}</span>
            </a>
          </div>

        </div>

        {/* Bottom-right socials */}
        <div className="absolute bottom-8 md:bottom-[68px] right-8 md:right-[72px] z-30 flex flex-col items-end gap-3 opacity-0 animate-fade-in" style={{ animationDelay: '1.8s' }}>
          <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.45em] text-champagne/40 uppercase">Follow Us</span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-champagne/55 hover:text-gold transition-colors duration-200" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" className="text-champagne/55 hover:text-gold transition-colors duration-200" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 md:bottom-[72px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 opacity-0 animate-fade-in" style={{ animationDelay: '2s' }}>
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
          <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-champagne/50 uppercase">{tx.hero.scroll}</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative bg-champagne px-5 py-14 md:px-[80px] md:py-[90px] grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-[80px] items-center overflow-hidden before:content-[''] before:absolute before:top-0 before:left-5 before:right-5 md:before:left-[80px] md:before:right-[80px] before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold before:to-transparent" style={{ zIndex: 1, boxShadow: '0 -24px 60px 0 rgba(247,242,232,0.18), 0 -2px 0 0 rgba(184,148,106,0.15)' }}>
        {/* Instagram mosaic */}
        <InstagramMosaic />

        {/* Text */}
        <div className="pl-0 md:pl-5">
          <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[11px] tracking-[0.5em] text-gold uppercase mb-5 before:content-[''] before:w-[30px] before:h-px before:bg-gold">
            {tx.about.label}
          </div>
          <h2 className="font-[var(--font-cinzel)] font-semibold text-burgundy uppercase tracking-[0.1em] leading-[1.15] mb-7" style={{ fontSize: 'clamp(30px, 3.7vw, 48px)' }}>
            {tx.about.title1}
            <em className="block font-[var(--font-cormorant)] italic font-light text-[1.2em] text-burgundy tracking-[0.06em]">
              {tx.about.title2}
            </em>
          </h2>
          <p key={lang} className="font-[var(--font-jost)] font-light text-[15px] leading-[1.9] text-burgundy/70 max-w-[400px] mb-10 animate-fade-in">
            {tx.about.bio}
          </p>
          <Link href="/about" className="inline-flex items-center gap-[18px] font-[var(--font-cinzel)] text-[11px] tracking-[0.4em] text-burgundy uppercase no-underline border-b border-gold pb-2 transition-all duration-300 cursor-pointer hover:text-gold hover:gap-[26px]">
            {tx.about.cta}
            <span className="relative w-[30px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[6px] after:h-[6px] after:border-r after:border-t after:border-current after:rotate-45" />
          </Link>
        </div>
      </section>

      <ServiceCards />
      <ContactSection />
      <ReviewCarousel />
    </main>
  )
}
