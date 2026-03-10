'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'
import SectionHeader from './SectionHeader'

const imgs = ['/images/card1.jpeg', '/images/kelly-with-horse.jpg', '/images/hero-bg.jpg']

export default function ServiceCards() {
  const [hovered, setHovered] = useState(null)
  const { lang } = useLang()
  const tx = t[lang].services
  const cards = tx.cards.map((c, i) => ({ ...c, img: imgs[i] }))

  return (
    <section className="relative bg-champagne px-5 md:px-[80px] pb-16 md:pb-[100px] pt-10 md:pt-14 before:content-[''] before:absolute before:top-0 before:left-5 before:right-5 md:before:left-[80px] md:before:right-[80px] before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/60 before:to-transparent">
      <div className="mb-10 md:mb-16">
        <SectionHeader label={tx.label} title={tx.title1} subtitle={tx.title2} />
      </div>

      {/* ── Mobile: stacked cards ── */}
      <div className="flex flex-col gap-10 md:hidden">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col">
            {/* Image */}
            <div className="relative h-[200px] overflow-hidden mb-5">
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Tag overlay */}
              <span className="absolute bottom-3 left-4 font-[var(--font-cinzel)] text-[8px] tracking-[0.5em] text-champagne/80 uppercase">
                {card.tag}
              </span>
            </div>

            {/* Content */}
            <div className="border-l-2 border-gold/40 pl-5">
              <div className="w-7 h-px bg-gold mb-4" />
              <h3 className="font-[var(--font-cinzel)] font-normal text-burgundy uppercase tracking-[0.06em] leading-[1.15] text-[20px] mb-3">
                {card.title}
              </h3>
              <p className="font-[var(--font-jost)] font-light text-[14px] leading-[1.85] text-burgundy/65 mb-2">
                {card.desc}
              </p>
              <p className="font-[var(--font-jost)] font-light text-[12px] leading-[1.8] text-burgundy/40 mb-5">
                {card.extra}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-4 font-[var(--font-cinzel)] text-[9px] tracking-[0.4em] text-burgundy uppercase border-b border-gold pb-1.5"
              >
                {card.btn}
                <span className="relative w-[22px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop: alternating editorial rows ── */}
      <div className="hidden md:flex flex-col">
        {cards.map((card, i) => {
          const imageRight = i % 2 !== 0
          const isHovered = hovered === i
          return (
            <div
              key={i}
              className="relative flex flex-row border-t border-gold/20 last:border-b last:border-gold/20 overflow-hidden"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Ghost number */}
              <span
                className="absolute font-[var(--font-cinzel)] select-none pointer-events-none leading-none"
                style={{
                  fontSize: 'clamp(90px, 16vw, 200px)',
                  color: 'rgba(184,148,106,0.07)',
                  top: '-0.05em',
                  right: imageRight ? 'auto' : '-0.04em',
                  left: imageRight ? '-0.04em' : 'auto',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Image */}
              <div
                className={`relative overflow-hidden flex-shrink-0 ${imageRight ? 'order-2' : ''}`}
                style={{ flex: '0 0 46%' }}
              >
                <div className="relative h-[360px]">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="46vw"
                    className="object-cover"
                    style={{
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-black"
                    style={{
                      opacity: isHovered ? 0.12 : 0.26,
                      transition: 'opacity 0.5s ease',
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div
                className={`relative z-10 flex flex-col justify-center py-16 ${imageRight ? 'order-1 pr-16' : 'pl-16'}`}
                style={{ flex: '1', minWidth: 0 }}
              >
                <div
                  className="h-px bg-gold mb-6 transition-all duration-500 ease-out"
                  style={{ width: isHovered ? '52px' : '28px' }}
                />

                <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.55em] text-gold uppercase mb-4 block">
                  {card.tag}
                </span>

                <h3
                  className="font-[var(--font-cinzel)] font-normal text-burgundy uppercase tracking-[0.06em] leading-[1.15] mb-5"
                  style={{ fontSize: 'clamp(20px, 2.2vw, 30px)' }}
                >
                  {card.title}
                </h3>

                <p className="font-[var(--font-jost)] font-light text-[14px] leading-[1.9] text-burgundy/65 mb-3 max-w-[400px]">
                  {card.desc}
                </p>

                <p className="font-[var(--font-jost)] font-light text-[12px] leading-[1.9] text-burgundy/40 mb-9 max-w-[380px]">
                  {card.extra}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-5 font-[var(--font-cinzel)] text-[9px] tracking-[0.4em] text-burgundy uppercase border-b border-gold pb-2 self-start transition-all duration-300 hover:text-gold hover:gap-8"
                >
                  {card.btn}
                  <span className="relative w-[28px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[6px] after:h-[6px] after:border-r after:border-t after:border-current after:rotate-45" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
