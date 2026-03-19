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

function ServiceBlock({ card, index, image }) {
  const ref = useRef(null)
  const imgInnerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  /* Parallax drift on service image */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    function onScroll() {
      if (!ref.current || !imgInnerRef.current) return
      const rect = ref.current.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = (vh - rect.top) / (vh + rect.height)
      const offset = (progress - 0.5) * 50 // -25px to +25px
      imgInnerRef.current.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const even = index % 2 === 0
  const clipFrom = even ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'

  /* Stagger helper for text children */
  const s = (delay) => ({
    className: `transition-all duration-[1.1s] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`,
    style: { transitionDelay: visible ? `${delay}ms` : '0ms' },
  })

  return (
    <div ref={ref} className="max-w-[1320px] mx-auto px-5 md:px-20">
      {/* Thin divider — animates width */}
      {index > 0 && (
        <div className="flex justify-center mb-20 md:mb-36">
          <div
            className={`h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-all duration-[1.4s] ease-out ${visible ? 'w-[200px]' : 'w-0'}`}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

        {/* Image — clip-path reveal + parallax */}
        <div
          className={`relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden group ${!even ? 'lg:order-2' : ''}`}
          style={{
            clipPath: visible ? 'inset(0 0 0 0)' : clipFrom,
            transition: 'clip-path 1.6s cubic-bezier(0.77, 0, 0.175, 1)',
            transitionDelay: visible ? '100ms' : '0ms',
          }}
        >
          {/* Inner wrapper for parallax — slightly oversized to avoid edge bleed */}
          <div ref={imgInnerRef} className="absolute inset-[-8%] will-change-transform">
            <Image
              src={image.src}
              alt={card.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-[2s] ease-out"
              style={{ objectPosition: image.pos }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          {/* Hover overlay tint */}
          <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/10 transition-colors duration-700" />
        </div>

        {/* Text — staggered reveals */}
        <div className={`py-4 lg:py-12 ${!even ? 'lg:order-1 lg:text-right' : ''}`}>

          {/* Number */}
          <span {...s(200)} className={`font-[var(--font-cinzel)] text-[11px] tracking-[0.5em] text-gold/35 inline-block ${s(200).className}`}>
            0{index + 1}
          </span>

          {/* Gold line — grows width */}
          <div
            className={`h-px bg-gold/25 mt-4 mb-7 transition-all duration-[1.3s] ease-out ${visible ? 'w-8' : 'w-0'} ${!even ? 'lg:ml-auto' : ''}`}
            style={{ transitionDelay: visible ? '300ms' : '0ms' }}
          />

          {/* Tag */}
          <span {...s(350)} className={`font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/50 uppercase inline-block ${s(350).className}`}>
            {card.tag}
          </span>

          {/* Title */}
          <h3
            {...s(420)}
            className={`font-[var(--font-cinzel)] text-champagne uppercase tracking-[0.06em] leading-[1.1] mt-3 mb-6 ${s(420).className}`}
            style={{ ...s(420).style, fontSize: 'clamp(24px, 3.5vw, 48px)' }}
          >
            {card.title}
          </h3>

          {/* Description */}
          <p {...s(500)} className={`font-[var(--font-jost)] font-light text-[15px] leading-[1.9] text-champagne/40 max-w-md mb-4 ${!even ? 'lg:ml-auto' : ''} ${s(500).className}`}>
            {card.desc}
          </p>

          {/* Extra */}
          <p {...s(580)} className={`font-[var(--font-jost)] font-light text-[14px] leading-[1.85] text-champagne/22 max-w-md mb-10 ${!even ? 'lg:ml-auto' : ''} ${s(580).className}`}>
            {card.extra}
          </p>

          {/* CTA — arrow bounces on hover */}
          <div {...s(660)}>
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
    </div>
  )
}

export default function ServiceCards() {
  const { lang } = useLang()
  const tx = t[lang].services
  const cards = tx?.cards || []

  /* Section header scroll trigger */
  const headerRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true) },
      { threshold: 0.3 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" className="relative bg-[#0f0c09] py-24 md:py-40 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Top rule */}
      <div className="absolute top-0 inset-x-5 md:inset-x-20 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Section header — staggered */}
      <div ref={headerRef} className="max-w-[1320px] mx-auto px-5 md:px-20 mb-20 md:mb-32">
        <div className={`flex items-center gap-3.5 mb-10 transition-all duration-[1s] ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className={`h-px bg-gold/50 transition-all duration-[1.4s] ease-out ${headerVisible ? 'w-8' : 'w-0'}`} />
          <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/60 uppercase">{tx.label}</span>
        </div>
        <h2
          className={`font-[var(--font-cinzel)] text-champagne uppercase leading-[0.88] transition-all duration-[1.4s] ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ fontSize: 'clamp(36px, 7vw, 100px)', letterSpacing: '0.04em', transitionDelay: headerVisible ? '200ms' : '0ms' }}
        >
          {tx.title1}
          <em
            className={`block font-[var(--font-cormorant)] italic font-light text-gold not-italic leading-none transition-all duration-[1.4s] ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ letterSpacing: '0.02em', transitionDelay: headerVisible ? '350ms' : '0ms' }}
          >
            {tx.title2}
          </em>
        </h2>
      </div>

      {/* Service blocks */}
      <div className="space-y-16 md:space-y-0">
        {cards.map((card, i) => (
          <ServiceBlock key={i} card={card} index={i} image={serviceImages[i]} />
        ))}
      </div>
    </section>
  )
}
