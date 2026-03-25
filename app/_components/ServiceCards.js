'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

const serviceImages = [
  { src: '/images/DSC_1497in.jpg', pos: 'center 30%' },
  { src: '/images/DSC_1702in.jpg', pos: 'center 40%' },
  { src: '/images/DSC_1481in.jpg', pos: 'center 35%' },
]

/* ── Shared card content (image + text) ───────────── */
function SlideContent({ card, idx, image, active, lg }) {
  const even = idx % 2 === 0
  const clip = even ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'

  /* Stagger helper → returns { cls, sty } */
  const v = (delay) => ({
    cls: `transition-all duration-[1.1s] ease-out ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    sty: { transitionDelay: active ? `${delay}ms` : '0ms' },
  })

  return (
    <div className={`grid items-center ${lg ? 'grid-cols-2 gap-14' : 'grid-cols-1 gap-5'}`}>

      {/* ─ Image ─ */}
      <div
        className={`relative overflow-hidden group ${lg ? 'aspect-[3/4]' : 'aspect-[4/3]'} ${lg && !even ? 'order-2' : ''}`}
        style={{
          clipPath: active ? 'inset(0 0 0 0)' : clip,
          transition: 'clip-path 1.6s cubic-bezier(0.77, 0, 0.175, 1)',
          transitionDelay: active ? '100ms' : '0ms',
        }}
      >
        <div className="absolute inset-[-8%] will-change-transform">
          <Image
            src={image.src}
            alt={card.title}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-[2s] ease-out"
            style={{ objectPosition: image.pos }}
            sizes={lg ? '50vw' : '85vw'}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/10 transition-colors duration-700" />
      </div>

      {/* ─ Text ─ */}
      <div className={`${lg ? 'py-8' : 'py-1'} ${lg && !even ? 'order-1 text-right' : ''}`}>

        {/* Number */}
        <span className={`font-[var(--font-cinzel)] tracking-[0.5em] text-gold/35 inline-block ${lg ? 'text-[11px]' : 'text-[10px]'} ${v(200).cls}`} style={v(200).sty}>
          0{idx + 1}
        </span>

        {/* Gold line */}
        <div
          className={`h-px bg-gold/25 mt-4 mb-7 transition-all duration-[1.3s] ease-out ${active ? 'w-8' : 'w-0'} ${lg && !even ? 'ml-auto' : ''}`}
          style={{ transitionDelay: active ? '300ms' : '0ms' }}
        />

        {/* Tag */}
        <span className={`font-[var(--font-cinzel)] tracking-[0.5em] text-gold/50 uppercase inline-block ${lg ? 'text-[9px]' : 'text-[8px]'} ${v(350).cls}`} style={v(350).sty}>
          {card.tag}
        </span>

        {/* Title */}
        <h3
          className={`font-[var(--font-cinzel)] text-champagne uppercase tracking-[0.06em] leading-[1.1] mt-3 mb-6 ${v(420).cls}`}
          style={{ ...v(420).sty, fontSize: lg ? 'clamp(24px, 3.5vw, 48px)' : '22px' }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p className={`font-[var(--font-jost)] font-light leading-[1.9] text-champagne/40 max-w-md mb-4 ${lg ? 'text-[15px]' : 'text-[14px]'} ${lg && !even ? 'ml-auto' : ''} ${v(500).cls}`} style={v(500).sty}>
          {card.desc}
        </p>

        {/* Extra (desktop only) */}
        {lg && (
          <p className={`font-[var(--font-jost)] font-light text-[14px] leading-[1.85] text-champagne/22 max-w-md mb-10 ${!even ? 'ml-auto' : ''} ${v(580).cls}`} style={v(580).sty}>
            {card.extra}
          </p>
        )}

        {/* CTA */}
        <div className={`${!lg ? 'mt-6' : ''} ${v(lg ? 660 : 580).cls}`} style={v(lg ? 660 : 580).sty}>
          <a
            href="#contact"
            className="group/link inline-flex items-center gap-4 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-gold/55 uppercase hover:text-gold transition-colors duration-300"
          >
            {card.btn}
            <span className="w-6 h-px bg-current group-hover/link:w-12 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
          </a>
        </div>
      </div>
    </div>
  )
}

/* ── Main section ─────────────────────────────────── */
export default function ServiceCards() {
  const { lang } = useLang()
  const tx = t[lang].services
  const cards = tx?.cards || []
  const N = cards.length

  /* Refs */
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const scrubFillRef = useRef(null)
  const scrubDotRef = useRef(null)
  const headerRef = useRef(null)
  const mobileRef = useRef(null)

  /* State */
  const [headerVis, setHeaderVis] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [seen, setSeen] = useState(new Set())
  const [isLg, setIsLg] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  /* Breakpoint */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsLg(mq.matches)
    const fn = (e) => setIsLg(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const desktop = mounted && isLg

  /* Mark card as permanently revealed */
  const reveal = (idx) => {
    setActiveIdx(idx)
    setSeen((prev) => (prev.has(idx) ? prev : new Set(prev).add(idx)))
  }

  /* Header observer — also reveals first card */
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeaderVis(true)
          reveal(0)
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* Desktop: vertical scroll → horizontal translate */
  useEffect(() => {
    if (!desktop) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    function onScroll() {
      const rect = section.getBoundingClientRect()
      const range = section.offsetHeight - window.innerHeight
      if (range <= 0) return
      const p = Math.max(0, Math.min(1, -rect.top / range))

      /* Move track */
      track.style.transform = `translateX(${-p * (N - 1) * window.innerWidth}px)`

      /* Scrub indicator (direct DOM — no re-render) */
      if (scrubFillRef.current) scrubFillRef.current.style.height = `${p * 100}%`
      if (scrubDotRef.current) scrubDotRef.current.style.top = `${p * 100}%`

      /* Reveal active card */
      reveal(Math.round(p * (N - 1)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [desktop, N]) // eslint-disable-line react-hooks/exhaustive-deps

  /* Mobile: snap-scroll position tracking */
  useEffect(() => {
    if (desktop || !mounted) return
    const el = mobileRef.current
    if (!el) return

    function onScroll() {
      const cardW = el.firstElementChild?.offsetWidth || 1
      const idx = Math.min(N - 1, Math.max(0, Math.round(el.scrollLeft / cardW)))
      reveal(idx)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [desktop, mounted, N]) // eslint-disable-line react-hooks/exhaustive-deps

  if (N === 0) return null

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-[#0f0c09]"
      style={{ zIndex: 1, height: desktop ? `${N * 100}vh` : 'auto' }}
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-5 md:inset-x-20 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Sticky wrapper (desktop) / normal flow (mobile) */}
      <div className={desktop ? 'sticky top-0 h-screen flex flex-col' : 'py-20 md:py-32'}>

        {/* ── Section header ──────────────────────── */}
        <div ref={headerRef} className={`max-w-[1320px] mx-auto px-5 md:px-20 ${desktop ? 'pt-10 pb-4' : 'mb-12'}`}>
          {/* Label */}
          <div className={`flex items-center gap-3.5 mb-8 transition-all duration-[1s] ease-out ${headerVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className={`h-px bg-gold/50 transition-all duration-[1.4s] ease-out ${headerVis ? 'w-8' : 'w-0'}`} />
            <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/60 uppercase">{tx.label}</span>
          </div>

          {/* Title + counter */}
          <div className="flex items-end justify-between">
            <h2
              className={`font-[var(--font-cinzel)] text-champagne uppercase leading-[0.88] transition-all duration-[1.4s] ease-out ${headerVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{
                fontSize: desktop ? 'clamp(36px, 4.5vw, 72px)' : 'clamp(36px, 7vw, 100px)',
                letterSpacing: '0.04em',
                transitionDelay: headerVis ? '200ms' : '0ms',
              }}
            >
              {tx.title1}
              <em
                className={`block font-[var(--font-cormorant)] italic font-light text-gold not-italic leading-none transition-all duration-[1.4s] ease-out ${headerVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ letterSpacing: '0.02em', transitionDelay: headerVis ? '350ms' : '0ms' }}
              >
                {tx.title2}
              </em>
            </h2>

            {/* Desktop counter */}
            {desktop && (
              <div
                className={`font-[var(--font-cinzel)] tracking-[0.3em] transition-opacity duration-700 ${headerVis ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: headerVis ? '600ms' : '0ms' }}
              >
                <span className="text-gold/60 text-[20px] tabular-nums">0{Math.max(0, activeIdx) + 1}</span>
                <span className="text-gold/12 mx-2 text-[14px]">/</span>
                <span className="text-champagne/20 text-[13px]">0{N}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Desktop: horizontal track ───────────── */}
        {desktop && (
          <div className="flex-1 relative overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full will-change-transform"
              style={{ width: `${N * 100}vw` }}
            >
              {cards.map((card, i) => (
                <div key={i} className="w-screen h-full flex-shrink-0 flex items-center px-20">
                  <div className="max-w-[1320px] w-full mx-auto">
                    <SlideContent card={card} idx={i} image={serviceImages[i]} active={seen.has(i)} lg />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Mobile: snap scroll ─────────────────── */}
        {!desktop && (
          <div
            ref={mobileRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="w-[7.5vw] flex-shrink-0" aria-hidden />
            {cards.map((card, i) => (
              <div key={i} className="w-[85vw] flex-shrink-0 snap-center">
                <SlideContent card={card} idx={i} image={serviceImages[i]} active={seen.has(i)} lg={false} />
              </div>
            ))}
            <div className="w-[7.5vw] flex-shrink-0" aria-hidden />
          </div>
        )}

        {/* ── Progress dots ───────────────────────── */}
        <div className={`flex items-center justify-center gap-3 ${desktop ? 'pb-6' : 'pt-5'}`}>
          {cards.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to service ${i + 1}`}
              onClick={() => {
                if (!desktop && mobileRef.current) {
                  mobileRef.current.children[i + 1]?.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                  })
                }
              }}
              className={`h-px transition-all duration-700 ${activeIdx === i ? 'w-10 bg-gold/60' : 'w-5 bg-gold/15 hover:bg-gold/25'}`}
            />
          ))}
          {!desktop && (
            <span className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-gold/30 ml-2">
              0{Math.max(0, activeIdx) + 1}
              <span className="text-gold/10 mx-1">/</span>
              0{N}
            </span>
          )}
        </div>

        {/* ── Desktop: scrub line ─────────────────── */}
        {desktop && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 h-[35vh] pointer-events-none">
            <div className="relative w-px h-full bg-gold/6">
              <div ref={scrubFillRef} className="absolute top-0 w-px bg-gold/30" style={{ height: 0 }} />
              <div ref={scrubDotRef} className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/50" style={{ top: 0 }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
