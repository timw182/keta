'use client'

import { useState, useEffect, useRef } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

const reviews = [
  {
    name: 'Sophie M.',
    initials: 'SM',
    rating: 5,
    date: 'November 2024',
    text: 'Kelly is an exceptional trainer — patient, precise, and genuinely passionate. My horse and I have improved more in three months than in the previous two years.',
  },
  {
    name: 'Lucas B.',
    initials: 'LB',
    rating: 5,
    date: 'October 2024',
    text: 'The facilities are immaculate and the atmosphere is calm and professional. My horse is so settled here. Could not ask for better boarding.',
  },
  {
    name: 'Amélie D.',
    initials: 'AD',
    rating: 5,
    date: 'September 2024',
    text: 'Attended the autumn clinic and it was simply incredible. Kelly\'s eye for detail and her ability to explain complex movements clearly is a rare gift.',
  },
  {
    name: 'Thomas K.',
    initials: 'TK',
    rating: 5,
    date: 'August 2024',
    text: 'From the first lesson I knew this was something special. The personal attention, the structured progression — it shows real expertise and dedication.',
  },
  {
    name: 'Marie-Claire F.',
    initials: 'MF',
    rating: 5,
    date: 'July 2024',
    text: 'My daughter has gained so much confidence since joining KT Equestrian. The environment is safe, encouraging, and truly built around the horse and rider.',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < count ? '#b8946a' : 'none'} stroke="#b8946a" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const { lang } = useLang()
  const tx = t[lang].reviews
  const footer = t[lang].footer

  const next = () => setCurrent(c => (c + 1) % reviews.length)
  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length)

  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [paused, current])

  return (
    <section
      className="relative bg-burgundy overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle inner border */}
      <div className="absolute top-2 left-3 right-3 md:left-[30px] md:right-[30px] bottom-2 border border-gold/20 pointer-events-none" />

      <div className="relative px-5 md:px-[80px] py-7 md:py-8 flex flex-col items-center">

        {/* Google badge */}
        <div className="flex items-center gap-2.5 mb-4 opacity-60">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#b8946a" opacity=".7"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#b8946a" opacity=".5"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#b8946a" opacity=".4"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#b8946a" opacity=".6"/>
          </svg>
          <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-champagne/40 uppercase">{tx.badge}</span>
        </div>

        {/* Review card */}
        <div className="relative w-full max-w-[640px] text-center h-[190px] md:h-[150px]">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="absolute inset-x-0 top-0 transition-all duration-500 px-2 md:px-0"
              style={{
                opacity: i === current ? 1 : 0,
                transform: `translateY(${i === current ? '0px' : '12px'})`,
                pointerEvents: i === current ? 'auto' : 'none',
              }}
            >
              <div className="flex justify-center mb-2">
                <Stars count={r.rating} />
              </div>
              <p className="font-[var(--font-cormorant)] text-[15px] md:text-[17px] italic font-light text-champagne/90 leading-[1.65] mb-3">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                  <span className="font-[var(--font-cinzel)] text-[8px] text-gold">{r.initials}</span>
                </div>
                <div className="text-left">
                  <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] text-champagne/70 uppercase block">{r.name}</span>
                  <span className="font-[var(--font-jost)] text-[9px] text-champagne/35">{r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-4">
          <button
            onClick={prev}
            className="text-champagne/30 hover:text-gold transition-colors duration-200 p-1"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300"
                aria-label={`Review ${i + 1}`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '20px' : '5px',
                    height: '5px',
                    background: i === current ? '#b8946a' : 'rgba(184,148,106,0.25)',
                  }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="text-champagne/30 hover:text-gold transition-colors duration-200 p-1"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative px-5 py-6 md:px-[80px] md:py-7 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between border-t border-gold/15">
        <span className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne/40 uppercase">
          © {new Date().getFullYear()} KT Equestrian
        </span>

        {/* Social links — centered absolutely on desktop */}
        <div className="flex items-center gap-5 md:absolute md:left-1/2 md:-translate-x-1/2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label="X">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>

        <span className="font-[var(--font-jost)] text-[10px] tracking-[0.15em] text-champagne/30 uppercase">
          {footer.sub}
        </span>
      </div>
    </section>
  )
}
