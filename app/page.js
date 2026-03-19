'use client'

import Image from 'next/image'
import Link from 'next/link'
import ServiceCards from './_components/ServiceCards'
import ReviewCarousel from './_components/ReviewCarousel'
import Navbar from './_components/Navbar'
import ContactSection from './_components/ContactSection'
import Footer from './_components/Footer'
import { useEffect, useRef, useState } from 'react'
import { useLang } from './_components/LanguageProvider'
import { t } from '../lib/translations'

const PARALLAX_TEXT = -0.06

/* Booking CTA band between services and testimonials */
function BookingCTA() {
  const { lang } = useLang()
  const tx = t[lang].booking
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: 'linear-gradient(135deg, #3a1520 0%, #6b1428 50%, #3a1520 100%)', zIndex: 1 }}
    >
      {/* Subtle inner border */}
      <div className="absolute inset-4 md:inset-10 border border-gold/10 pointer-events-none" />

      {/* Top/bottom rules */}
      <div className="absolute top-0 inset-x-5 md:inset-x-20 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-5 md:inset-x-20 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className={`max-w-3xl mx-auto px-5 md:px-20 text-center transition-all duration-[1.4s] ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-center gap-3.5 mb-8">
          <span className={`h-px bg-gold/40 transition-all duration-[1.4s] ease-out ${vis ? 'w-8' : 'w-0'}`} />
          <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/70 uppercase">{tx.label}</span>
          <span className={`h-px bg-gold/40 transition-all duration-[1.4s] ease-out ${vis ? 'w-8' : 'w-0'}`} />
        </div>

        <h2
          className={`font-[var(--font-cinzel)] text-champagne uppercase leading-[0.9] mb-5 transition-all duration-[1.2s] ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontSize: 'clamp(28px, 5vw, 56px)', letterSpacing: '0.05em', transitionDelay: vis ? '200ms' : '0ms' }}
        >
          {tx.title1}
          <em className="block font-[var(--font-cormorant)] italic font-light text-gold not-italic leading-none" style={{ letterSpacing: '0.02em' }}>
            {tx.title2}
          </em>
        </h2>

        <p
          className={`font-[var(--font-jost)] font-light text-[15px] text-champagne/40 leading-[1.8] max-w-md mx-auto mb-10 transition-all duration-[1.2s] ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: vis ? '350ms' : '0ms' }}
        >
          {tx.chooseType}
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-[1.2s] ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: vis ? '500ms' : '0ms' }}
        >
          <Link
            href="/booking"
            className="btn-shimmer inline-flex items-center gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-champagne uppercase bg-gold/20 border border-gold/50 px-8 py-3.5 transition-all duration-300 hover:bg-gold/30 hover:border-gold active:scale-[0.97]"
          >
            {tx.title1} {tx.title2}
            <span className="w-4 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* Animated counter */
function CountUp({ end, suffix = '', visible, delay = 0 }) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [visible, delay])

  useEffect(() => {
    if (!started) return
    let start = null
    const duration = 1800
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      setVal(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, end])

  return <>{val}{suffix}</>
}

export default function Home() {
  const { lang } = useLang()
  const tx = t[lang]

  const textRef = useRef(null)
  const aboutRef = useRef(null)
  const [aboutVisible, setAboutVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    function onScroll() {
      if (mq.matches) return
      const y = window.scrollY
      const vh = window.innerHeight
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${y * PARALLAX_TEXT}px)`
        textRef.current.style.opacity = Math.max(0, 1 - y / (vh * 0.45)).toString()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAboutVisible(true) },
      { threshold: 0.1 }
    )
    if (aboutRef.current) obs.observe(aboutRef.current)

    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  /* Stagger helper */
  const stagger = (delay) => ({
    className: `transition-all duration-[1.2s] ease-out ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`,
    style: { transitionDelay: aboutVisible ? `${delay}ms` : '0ms' },
  })

  return (
    <main>
      <Navbar />

      {/* ── HERO (kept) ── */}
      <section className="sticky top-0 w-full h-screen overflow-hidden bg-black" style={{ zIndex: 0 }}>

        {/* Gold frame */}
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
            style={{ objectPosition: 'center 18%', filter: 'grayscale(0.65) brightness(0.52) contrast(1.08)' }}
          />
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 z-20"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.9) 100%)' }} />

        {/* Hero content */}
        <div ref={textRef} className="absolute inset-0 z-30 flex flex-col justify-end px-5 pb-14 md:px-[80px] md:pb-20 will-change-transform">

          <div className="flex items-center gap-3 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <span className="w-6 h-px bg-gold/70" />
            <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/80 uppercase">{tx.hero.tagline}</span>
          </div>

          <h1
            className="font-[var(--font-cinzel)] font-normal text-champagne uppercase leading-[0.85] opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(38px, 11vw, 148px)', letterSpacing: '0.04em', animationDelay: '0.8s' }}
          >
            Equestrian
            <em className="block font-[var(--font-cormorant)] not-italic italic text-gold leading-none" style={{ letterSpacing: '0.02em' }}>
              Excellence
            </em>
          </h1>

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

        {/* Socials */}
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

      {/* ── ABOUT — editorial with portrait ── */}
      <section
        id="about"
        ref={aboutRef}
        className="relative bg-champagne overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Top rule */}
        <div className="absolute top-0 inset-x-5 md:inset-x-20 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="max-w-[1320px] mx-auto px-5 py-24 md:px-20 md:py-40">

          {/* Label — gold line animates width */}
          <div {...stagger(0)} className={`flex items-center gap-3.5 mb-16 md:mb-20 ${stagger(0).className}`}>
            <span className={`h-px bg-gold transition-all duration-[1.4s] ease-out ${aboutVisible ? 'w-8' : 'w-0'}`} />
            <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold uppercase">{tx.about.label}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.82fr] gap-14 lg:gap-24 items-start">

            {/* Left: text — staggered children */}
            <div>
              {/* Pull quote */}
              <blockquote
                {...stagger(200)}
                className={`font-[var(--font-cormorant)] italic font-light text-burgundy leading-[1.2] mb-12 ${stagger(200).className}`}
                style={{ ...stagger(200).style, fontSize: 'clamp(24px, 4.2vw, 52px)' }}
              >
                &ldquo;{tx.about.bio}&rdquo;
              </blockquote>

              {/* Title */}
              <div {...stagger(350)}>
                <h2 className="font-[var(--font-cinzel)] text-burgundy uppercase tracking-[0.12em] text-sm mb-3">
                  {tx.about.title1}
                  <em className="block font-[var(--font-cormorant)] italic font-light text-[1.3em] text-burgundy tracking-[0.04em]">
                    {tx.about.title2}
                  </em>
                </h2>
              </div>

              {/* Body text */}
              {t[lang].aboutMe?.storyP1 && (
                <p
                  {...stagger(450)}
                  className={`font-[var(--font-jost)] font-light text-[15px] leading-[1.9] text-burgundy/50 max-w-lg mt-5 mb-14 ${stagger(450).className}`}
                >
                  {t[lang].aboutMe.storyP1}
                </p>
              )}

              {/* Animated stats */}
              <div
                {...stagger(550)}
                className={`flex items-center gap-8 md:gap-14 mb-14 ${stagger(550).className}`}
              >
                {[
                  { end: 10, suffix: '+', label: 'Years', delay: 700 },
                  { end: 10, suffix: '+', label: 'Titles', delay: 900 },
                  { end: 2015, suffix: '', label: tx.about.established, delay: 1100 },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-8 md:gap-14">
                    {i > 0 && <div className="w-px h-10 bg-gold/20 -ml-8 md:-ml-14" />}
                    <div>
                      <span className="font-[var(--font-cinzel)] text-burgundy text-[clamp(22px,3vw,36px)] leading-none tabular-nums">
                        <CountUp end={s.end} suffix={s.suffix} visible={aboutVisible} delay={s.delay} />
                      </span>
                      <span className="block font-[var(--font-jost)] font-light text-[10px] tracking-[0.3em] text-burgundy/30 uppercase mt-1.5">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA with animated arrow */}
              <div {...stagger(650)}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-burgundy uppercase"
                >
                  {tx.about.cta}
                  <span className="w-8 h-px bg-gold group-hover:w-16 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
                </Link>
              </div>
            </div>

            {/* Right: Portrait with clip-path reveal + offset frame */}
            <div className="relative mt-2 lg:mt-0">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{
                  clipPath: aboutVisible ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
                  transition: 'clip-path 1.6s cubic-bezier(0.77, 0, 0.175, 1)',
                  transitionDelay: aboutVisible ? '300ms' : '0ms',
                }}
              >
                <Image
                  src="/images/kelly-with-horse.jpg"
                  alt="Kelly Trausch with horse"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              {/* Offset gold frame — fades in after image reveals */}
              <div
                className={`absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 top-3 left-3 md:top-5 md:left-5 border border-gold/25 pointer-events-none transition-opacity duration-[1s] ease-out ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: aboutVisible ? '1200ms' : '0ms' }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceCards />
      <BookingCTA />
      <ReviewCarousel />
      <ContactSection />
      <Footer />
    </main>
  )
}
