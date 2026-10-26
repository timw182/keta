'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'
import Contours from './Contours'
import { Eyebrow } from './ui'

const reviews = [
  {
    name: 'Sophie M.',
    rating: 5,
    text: 'Kelly is an exceptional trainer — patient, precise, and genuinely passionate. My horse and I have improved more in three months than in the previous two years.',
  },
  {
    name: 'Lucas B.',
    rating: 5,
    text: 'The facilities are immaculate and the atmosphere is calm and professional. My horse is so settled here. Could not ask for better boarding.',
  },
  {
    name: 'Amélie D.',
    rating: 5,
    text: 'Attended the autumn clinic and it was simply incredible. Kelly\'s eye for detail and her ability to explain complex movements clearly is a rare gift.',
  },
  {
    name: 'Thomas K.',
    rating: 5,
    text: 'From the first lesson I knew this was something special. The personal attention, the structured progression — it shows real expertise and dedication.',
  },
  {
    name: 'Marie-Claire F.',
    rating: 5,
    text: 'My daughter has gained so much confidence since joining KT Equestrian. The environment is safe, encouraging, and truly built around the horse and rider.',
  },
]

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const [paused, setPaused] = useState(false)
  const { lang } = useLang()
  const tx = t[lang].reviews
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const goTo = useCallback((idx) => {
    setFade(false)
    setTimeout(() => {
      setCurrent(idx)
      setFade(true)
    }, 350)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      goTo((current + 1) % reviews.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [current, paused, goTo])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const review = reviews[current]

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream pt-40 pb-28 md:pt-52 md:pb-40 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Contours className="text-ink/[0.07]" />

      {/* Decorative oversized quote mark — floats slowly */}
      <div
        className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="animate-float-slow">
          <span
            className="font-accent leading-none text-burgundy block"
            style={{ fontSize: 'clamp(120px, 12vw, 170px)', lineHeight: 0.8 }}
          >
            &ldquo;
          </span>
        </div>
      </div>

      <div className={`max-w-3xl mx-auto px-5 md:px-12 text-center relative transition-all duration-[1.2s] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        <div className="flex justify-center mb-14 md:mb-16">
          <Eyebrow>{tx.badge}</Eyebrow>
        </div>

        {/* Quote */}
        <blockquote
          className={`font-accent italic text-ink leading-[1.3] mb-10 transition-all duration-500 ease-out ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ fontSize: 'clamp(26px, 3.6vw, 44px)' }}
        >
          &ldquo;{review.text}&rdquo;
        </blockquote>

        {/* Stars */}
        <div className={`flex justify-center gap-1 mb-4 transition-all duration-500 delay-75 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {[...Array(review.rating)].map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#6b1428">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ))}
        </div>

        {/* Attribution */}
        <div className={`transition-all duration-500 delay-100 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <span className="notch-tag inline-block bg-lime text-ink font-sans font-semibold text-[12px] tracking-[0.14em] uppercase px-4 py-1.5">
            {review.name}
          </span>
        </div>

        {/* Navigation dots — active one pulses */}
        <div className="flex items-center justify-center gap-2.5 mt-14">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full cursor-pointer transition-all duration-300 ${
                i === current
                  ? 'w-8 h-[6px] bg-ink animate-dot-pulse'
                  : 'w-[6px] h-[6px] bg-ink/20 hover:bg-ink/40'
              }`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>

        {/* Google badge */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="font-sans font-medium text-[13px] text-ink/70 tracking-wide">5.0 on Google</span>
        </div>
      </div>
    </section>
  )
}
