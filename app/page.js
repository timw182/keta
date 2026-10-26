'use client'

import Image from 'next/image'
import Link from 'next/link'
import ServiceCards from './_components/ServiceCards'
import ReviewCarousel from './_components/ReviewCarousel'
import Navbar from './_components/Navbar'
import ContactSection from './_components/ContactSection'
import Footer from './_components/Footer'
import Contours from './_components/Contours'
import { Eyebrow, CtaButton, ArrowLink } from './_components/ui'
import { useEffect, useRef, useState } from 'react'
import { useLang } from './_components/LanguageProvider'
import { t } from '../lib/translations'

/* Circular stamp with text on a path — sits on the corner of the hero photo */
function RideBadge({ label }) {
  return (
    <Link
      href="/booking"
      aria-label={label}
      className="group relative block w-[104px] h-[104px] md:w-[132px] md:h-[132px] rounded-full bg-cream shadow-[0_6px_24px_rgba(23,22,19,0.12)]"
    >
      <svg viewBox="0 0 132 132" className="absolute inset-0 w-full h-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M66,66 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="66" cy="66" r="62" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink" />
        <circle cx="66" cy="66" r="57" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink" />
        <text className="fill-ink font-display" fontSize="13" letterSpacing="2.5">
          <textPath href="#badge-circle" textLength="270" lengthAdjust="spacing">
            {`${label.toUpperCase()} ★ KT ★`}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-ink transition-transform duration-300 group-hover:rotate-45">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </Link>
  )
}

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
    <section ref={ref} className="relative overflow-hidden bg-burgundy py-20 md:py-28">
      <Contours className="text-cream/[0.1]" />

      <div className={`relative max-w-[1320px] mx-auto px-5 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10 transition-all duration-[1.2s] ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-2xl">
          <Eyebrow dark className="mb-6">{tx.label}</Eyebrow>
          <h2 className="font-display text-cream uppercase leading-[1] tracking-[0.04em]" style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}>
            {tx.title1}{' '}
            <em className="font-accent italic font-normal normal-case tracking-normal text-[1.15em]">{tx.title2}</em>
          </h2>
          <p className="font-sans text-[16px] text-cream/75 leading-[1.7] mt-5 max-w-md">
            {tx.chooseType}
          </p>
        </div>

        <CtaButton href="/booking" variant="cream" className="self-start md:self-auto">
          {tx.title1} {tx.title2}
        </CtaButton>
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

  const aboutRef = useRef(null)
  const [aboutVisible, setAboutVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAboutVisible(true) },
      { threshold: 0.1 }
    )
    if (aboutRef.current) obs.observe(aboutRef.current)
    return () => obs.disconnect()
  }, [])

  /* Stagger helper */
  const stagger = (delay) => ({
    className: `transition-all duration-[1.2s] ease-out ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`,
    style: { transitionDelay: aboutVisible ? `${delay}ms` : '0ms' },
  })

  /* Hero entrance helper */
  const rise = (delay) => ({
    className: 'opacity-0 animate-fade-up',
    style: { animationDelay: `${delay}s` },
  })

  return (
    <main>
      <Navbar />

      {/* ── HERO — editorial collage on contour lines ── */}
      <section className="relative overflow-hidden">
        <Contours className="text-ink/[0.09]" />

        <div className="relative max-w-[1320px] mx-auto px-5 md:px-12 pt-10 md:pt-14 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10">

            {/* Headline + intro + CTA */}
            <div className="lg:col-span-5 lg:pt-6">
              <h1
                {...rise(0.5)}
                className={`font-display text-ink uppercase leading-[1] tracking-[0.03em] ${rise(0.5).className}`}
                style={{ ...rise(0.5).style, fontSize: 'clamp(38px, 4.4vw, 64px)' }}
              >
                {tx.hero.title1}
                <em className="block font-accent italic font-normal normal-case tracking-normal text-burgundy text-[1.3em] leading-[0.95] mt-1">
                  {tx.hero.title2}
                </em>
              </h1>

              <p {...rise(0.7)} className={`font-sans text-[16px] leading-[1.75] text-ink/80 mt-7 max-w-[340px] ${rise(0.7).className}`}>
                {tx.aboutMe.heroSub}. {tx.hero.tagline}.
              </p>

              <div {...rise(0.9)} className={`mt-10 ${rise(0.9).className}`}>
                <CtaButton href="#contact">{tx.hero.cta1}</CtaButton>
              </div>
            </div>

            {/* Main photo with badge + black tile */}
            <div {...rise(0.6)} className={`relative lg:col-span-7 ${rise(0.6).className}`}>
              <div className="relative aspect-[4/3] overflow-hidden ml-6 md:ml-14">
                <Image
                  src="/images/card1.jpeg"
                  alt="Kelly cantering a black horse in the arena"
                  fill priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 45%' }}
                />
              </div>

              <div className="absolute -top-8 left-0 md:top-10 md:-left-4 z-10">
                <RideBadge label={tx.hero.tagline} />
              </div>

              <Link
                href="/booking"
                className="absolute -bottom-10 right-8 md:right-auto md:left-[38%] z-10 w-[118px] h-[118px] md:w-[138px] md:h-[138px] bg-burgundy text-cream flex items-center justify-center text-center px-4 font-sans font-semibold text-[12px] md:text-[13px] tracking-[0.1em] uppercase leading-[1.5] transition-colors duration-300 hover:bg-ink"
              >
                {tx.contact.bookingNavLabel}
              </Link>
            </div>

            {/* Jumping photo with lime tag */}
            <div {...rise(0.9)} className={`relative lg:col-span-6 lg:-mt-16 ${rise(0.9).className}`}>
              <div className="relative aspect-[5/4] overflow-hidden bg-[#9cc9e8] mr-10 md:mr-16">
                <Image
                  src="/images/IMG_4C607A2186F6-1.jpeg"
                  alt="Show jumping over an oxer"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
              <span className="notch-tag absolute right-0 md:right-4 bottom-16 bg-lime text-ink font-display text-[22px] md:text-[26px] leading-none px-5 py-2.5 -rotate-3 shadow-[0_4px_0_rgba(23,22,19,0.85)]">
                {tx.about.established}
              </span>
            </div>

            {/* Small photo cluster + text link */}
            <div {...rise(1.1)} className={`lg:col-span-6 lg:pt-24 flex flex-col justify-end ${rise(1.1).className}`}>
              <div className="flex items-end justify-end gap-4 md:gap-5">
                <div className="relative w-[24%] aspect-square overflow-hidden mb-12">
                  <Image src="/images/DSC_1721in.jpg" alt="" fill sizes="160px" className="object-cover" />
                </div>
                <div className="relative w-[28%] aspect-[3/4] overflow-hidden mb-24">
                  <Image src="/images/DSC_1753in.jpg" alt="" fill sizes="220px" className="object-cover" style={{ objectPosition: '30% center' }} />
                </div>
                <div className="relative w-[24%] aspect-[3/4] overflow-hidden">
                  <Image src="/images/choice3.jpg" alt="" fill sizes="160px" className="object-cover" />
                </div>
              </div>
              <div className="mt-8 md:-mt-10 md:pr-[34%]">
                <ArrowLink href="#about">{tx.hero.cta2}</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — editorial with portrait ── */}
      <section
        id="about"
        ref={aboutRef}
        className="relative bg-sand overflow-hidden scroll-mt-20"
      >
        <div className="max-w-[1320px] mx-auto px-5 py-24 md:px-12 md:py-36">

          <div {...stagger(0)} className={`mb-12 md:mb-16 ${stagger(0).className}`}>
            <Eyebrow>{tx.about.label}</Eyebrow>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-14 lg:gap-24 items-start">

            {/* Left: text — staggered children */}
            <div>
              <blockquote
                {...stagger(200)}
                className={`font-accent italic text-ink leading-[1.2] mb-12 ${stagger(200).className}`}
                style={{ ...stagger(200).style, fontSize: 'clamp(28px, 3.6vw, 50px)' }}
              >
                &ldquo;{tx.about.bio}&rdquo;
              </blockquote>

              <div {...stagger(350)}>
                <h2 className="font-sans font-semibold text-ink uppercase tracking-[0.12em] text-[13px]">
                  {tx.about.title1} {tx.about.title2}
                </h2>
              </div>

              {t[lang].aboutMe?.storyP1 && (
                <p
                  {...stagger(450)}
                  className={`font-sans text-[16px] leading-[1.8] text-ink/70 max-w-lg mt-4 mb-14 ${stagger(450).className}`}
                >
                  {t[lang].aboutMe.storyP1}
                </p>
              )}

              {/* Animated stats */}
              <div
                {...stagger(550)}
                className={`grid grid-cols-3 max-w-lg border-y border-ink/15 mb-14 ${stagger(550).className}`}
              >
                {[
                  { end: 10, suffix: '+', label: 'Years', delay: 700 },
                  { end: 10, suffix: '+', label: 'Titles', delay: 900 },
                  { end: 2015, suffix: '', label: tx.about.established, delay: 1100 },
                ].map((s, i) => (
                  <div key={i} className={`py-6 ${i > 0 ? 'pl-6 border-l border-ink/15' : ''}`}>
                    <span className="font-display text-burgundy text-[clamp(28px,3vw,42px)] leading-none tabular-nums">
                      <CountUp end={s.end} suffix={s.suffix} visible={aboutVisible} delay={s.delay} />
                    </span>
                    <span className="block font-sans font-medium text-[11px] tracking-[0.18em] text-ink/55 uppercase mt-2">{s.label}</span>
                  </div>
                ))}
              </div>

              <div {...stagger(650)}>
                <ArrowLink href="/about">{tx.about.cta}</ArrowLink>
              </div>
            </div>

            {/* Right: Portrait with clip-path reveal + offset burgundy block */}
            <div className="relative mt-2 lg:mt-0 mr-4 md:mr-6">
              <div
                className={`absolute top-6 left-6 -right-4 -bottom-4 md:top-8 md:left-8 md:-right-6 md:-bottom-6 bg-burgundy transition-opacity duration-[1s] ease-out ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: aboutVisible ? '900ms' : '0ms' }}
                aria-hidden="true"
              />
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
