'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

const imgs = ['/images/hero-bg.jpg', '/images/kelly-with-horse.jpg', '/images/hero-bg.jpg']

// Left strip = 38% of card, image/text area = 62%
// Overlay slides left by 62% of its own width (= 62% of card)
// Left strip counter-translates: 62/38 * 100 ≈ 163% of its own width → net position stays fixed
const STRIP = 38   // %
const CONTENT = 62 // %
const COUNTER = `${(CONTENT / STRIP * 100).toFixed(2)}%`

export default function ServiceCards() {
  const [active, setActive] = useState(null)
  const [mobileActive, setMobileActive] = useState(null)
  const { lang } = useLang()
  const tx = t[lang].services
  const cards = tx.cards.map((c, i) => ({ ...c, img: imgs[i] }))

  return (
    <section className="relative bg-champagne px-5 md:px-[80px] pb-16 md:pb-[100px] pt-10 md:pt-14 before:content-[''] before:absolute before:top-0 before:left-5 before:right-5 md:before:left-[80px] md:before:right-[80px] before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/60 before:to-transparent">
      {/* Section header */}
      <div className="mb-10 md:mb-14">
        <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[10px] tracking-[0.5em] text-gold uppercase mb-5
          before:content-[''] before:w-[30px] before:h-px before:bg-gold">
          {tx.label}
        </div>
        <h2
          className="font-[var(--font-cinzel)] font-semibold text-burgundy uppercase tracking-[0.1em] leading-[1.15]"
          style={{ fontSize: 'clamp(26px, 3.2vw, 44px)' }}
        >
          {tx.title1}
          <em className="block font-[var(--font-cormorant)] italic font-light text-[1.2em] text-burgundy tracking-[0.06em]">
            {tx.title2}
          </em>
        </h2>
      </div>

      {/* ── Desktop: sliding overlay cards ── */}
      <div className="hidden md:grid grid-cols-3 gap-7">
        {cards.map((card, i) => {
          const open = active === i
          return (
            <div
              key={i}
              className="relative overflow-hidden cursor-pointer"
              style={{ height: '400px' }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* ── Back layer: champagne text panel ── */}
              <div
                className="absolute inset-0 bg-champagne flex flex-col justify-center"
                style={{ paddingLeft: `calc(${STRIP}% + 1.75rem)`, paddingRight: '1.75rem', paddingTop: '2rem', paddingBottom: '2rem' }}
              >
                <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.55em] text-gold uppercase mb-3 block">
                  {card.tag}
                </span>
                <h3
                  className="font-[var(--font-cinzel)] font-normal text-burgundy uppercase tracking-[0.1em] leading-[1.2] mb-4"
                  style={{ fontSize: 'clamp(16px, 1.6vw, 22px)' }}
                >
                  {card.title}
                </h3>
                <p className="font-[var(--font-jost)] font-light text-[12px] leading-[1.85] text-burgundy/65 mb-4">
                  {card.desc}
                </p>
                <p className="font-[var(--font-jost)] font-light text-[11px] leading-[1.85] text-burgundy/45 mb-6">
                  {card.extra}
                </p>
                <a
                  href="#contact"
                  onClick={e => e.stopPropagation()}
                  className="relative inline-flex items-center gap-3 font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-burgundy uppercase border border-gold/50 px-5 py-2.5 self-start overflow-hidden group/btn transition-colors duration-300 hover:text-champagne hover:border-gold"
                >
                  <span className="absolute inset-0 bg-burgundy translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative">{card.btn}</span>
                  <span className="relative w-[14px] h-px bg-current" />
                </a>
              </div>

              {/* ── Overlay: slides left on hover ── */}
              <div
                className="absolute inset-0 flex bg-burgundy"
                style={{
                  transition: 'transform 0.45s cubic-bezier(0.26,0.53,0.74,1.15)',
                  transform: open ? `translateX(-${CONTENT}%)` : 'translateX(0)',
                  zIndex: 10,
                }}
              >
                {/* Left strip — counter-translates to stay pinned */}
                <div
                  className="flex-shrink-0 flex flex-col justify-between py-7 px-5 relative z-10"
                  style={{
                    width: `${STRIP}%`,
                    borderRight: '1px solid rgba(184,148,106,0.2)',
                    transition: 'transform 0.45s cubic-bezier(0.26,0.53,0.74,1.15)',
                    transform: open ? `translateX(${COUNTER})` : 'translateX(0)',
                  }}
                >
                  <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-gold/80 uppercase">
                    {card.tag}
                  </span>
                  <div>
                    <h3
                      className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.08em] leading-[1.25]"
                      style={{ fontSize: 'clamp(14px, 1.4vw, 19px)' }}
                    >
                      {card.title}
                    </h3>
                    {/* Dot indicators */}
                    <div className="flex gap-1.5 mt-4">
                      {[0,1,2].map(d => (
                        <span
                          key={d}
                          className="block rounded-full transition-all duration-300"
                          style={{
                            width: open && d === 0 ? '16px' : '5px',
                            height: '5px',
                            background: open ? 'rgba(247,242,232,0.9)' : 'rgba(184,148,106,0.5)',
                            transitionDelay: `${d * 0.06}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image — shrinks on hover */}
                <div
                  className="absolute top-0 right-0 h-full overflow-hidden"
                  style={{
                    width: `${CONTENT}%`,
                    transition: 'width 0.45s cubic-bezier(0.26,0.53,0.74,1.15)',
                  }}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover contrast-105"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Mobile: stacked tap-to-expand ── */}
      <div className="flex flex-col gap-8 md:hidden">
        {cards.map((card, i) => {
          const open = mobileActive === i
          return (
            <div key={i} className="cursor-pointer" onClick={() => setMobileActive(p => p === i ? null : i)}>
              {/* Image */}
              <div className="relative h-[200px] overflow-hidden mb-0">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover contrast-105"
                />
              </div>
              {/* Content */}
              <div className="border-l border-gold/25 pl-4 pt-4">
                <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-gold uppercase mb-2 block">{card.tag}</span>
                <h3 className="font-[var(--font-cinzel)] text-[18px] text-burgundy uppercase tracking-[0.08em] leading-[1.2] mb-3">{card.title}</h3>
                <p className="font-[var(--font-jost)] font-light text-[13px] leading-[1.8] text-burgundy/65">{card.desc}</p>
                <div style={{ maxHeight: open ? '160px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p className="font-[var(--font-jost)] font-light text-[12px] leading-[1.8] text-burgundy/45 pt-3 pb-4">{card.extra}</p>
                  <a
                    href="#contact"
                    onClick={e => e.stopPropagation()}
                    className="inline-flex items-center gap-3 font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-burgundy uppercase border border-gold/50 px-5 py-2.5 mb-2 active:bg-gold/10"
                  >
                    {card.btn} <span className="w-[14px] h-px bg-current" />
                  </a>
                </div>
                <p className={`font-[var(--font-cinzel)] text-[7px] tracking-[0.35em] text-gold/50 uppercase mt-2 transition-opacity duration-300 ${open ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                  Tap to discover
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
