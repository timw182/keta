'use client'

import { useState, useRef, useEffect } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

function RevealField({ value, href, className }) {
  const [shown, setShown] = useState(false)
  if (shown) {
    return href
      ? <a href={href} className={className}>{value}</a>
      : <span className={className}>{value}</span>
  }
  return (
    <button
      onClick={() => setShown(true)}
      className="font-[var(--font-jost)] font-light text-[13px] text-gold/55 border-b border-dotted border-gold/35 hover:text-gold hover:border-gold transition-colors duration-200 cursor-pointer pb-px"
    >
      Click to reveal
    </button>
  )
}

function FloatField({ name, type = 'text', required, label, rows, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  const shared = {
    name,
    value,
    onChange,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: [
      'w-full bg-white/[0.04] border border-white/10 px-4 font-[var(--font-jost)] font-light',
      'text-[14px] text-champagne/90 focus:outline-none transition-colors duration-300',
      focused ? 'border-gold/50 bg-white/[0.07]' : 'hover:border-white/20',
      rows ? 'pt-7 pb-3 resize-none' : 'pt-6 pb-2',
    ].join(' '),
  }

  return (
    <div className="relative">
      <label
        className={[
          'absolute left-4 pointer-events-none font-[var(--font-jost)] font-light transition-all duration-200',
          isActive
            ? 'top-[9px] text-[9px] tracking-[0.22em] uppercase ' + (focused ? 'text-gold/80' : 'text-gold/55')
            : 'top-4 text-[13px] text-white/30',
        ].join(' ')}
      >
        {label}
      </label>
      {rows
        ? <textarea rows={rows} {...shared} />
        : <input type={type} {...shared} />
      }
    </div>
  )
}

export default function ContactSection() {
  const { lang } = useLang()
  const tx = t[lang].contact
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const fadeClass = (delay = 0) =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`
  const fadeStyle = (delay = 0) => ({ transitionDelay: visible ? `${delay}ms` : '0ms' })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0f0c09' }}
    >
      {/* Ghost KT watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-[5vw]"
      >
        <span
          className="font-[var(--font-cinzel)] font-bold leading-none text-white/[0.022] select-none"
          style={{ fontSize: 'clamp(220px,38vw,520px)', letterSpacing: '-0.04em' }}
        >
          KT
        </span>
      </div>

      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="relative z-10 px-5 py-16 md:px-[80px] md:py-[110px]">

        {/* Section label */}
        <div className={`${fadeClass()} flex items-center gap-3 mb-14`} style={fadeStyle(0)}>
          <span className="w-7 h-px bg-gold/55" />
          <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/65 uppercase">{tx.label}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-16 lg:gap-28 items-start">

          {/* ── LEFT ── */}
          <div className={fadeClass()} style={fadeStyle(100)}>

            {/* Editorial title */}
            <h2
              className="font-[var(--font-cinzel)] font-normal text-champagne uppercase leading-[0.88] mb-14"
              style={{ fontSize: 'clamp(38px, 5.5vw, 78px)', letterSpacing: '0.05em' }}
            >
              {tx.title1}
              <em
                className="block font-[var(--font-cormorant)] not-italic italic text-gold leading-none"
                style={{ letterSpacing: '0.02em', fontSize: '1.1em' }}
              >
                {tx.title2}
              </em>
            </h2>

            {/* Contact detail rows */}
            <div className="border-t border-white/[0.07]">

              {/* Address */}
              <div className="flex items-start gap-5 py-6 border-b border-white/[0.07] group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center mt-0.5 group-hover:border-gold/50 transition-colors duration-300">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.35em] text-gold/45 uppercase mb-1.5">{tx.detailsLabel}</p>
                  <p className="font-[var(--font-jost)] font-light text-[13px] text-champagne/65 leading-[1.75]">{tx.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5 py-6 border-b border-white/[0.07] group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center mt-0.5 group-hover:border-gold/50 transition-colors duration-300">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.35 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.35em] text-gold/45 uppercase mb-1.5">Phone</p>
                  <RevealField
                    value={tx.phone}
                    href={`tel:${tx.phone.replace(/\s/g, '')}`}
                    className="font-[var(--font-jost)] font-light text-[13px] text-champagne/65 hover:text-gold transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 py-6 border-b border-white/[0.07] group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center mt-0.5 group-hover:border-gold/50 transition-colors duration-300">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.35em] text-gold/45 uppercase mb-1.5">Email</p>
                  <RevealField
                    value={tx.email}
                    href={`mailto:${tx.email}`}
                    className="font-[var(--font-jost)] font-light text-[13px] text-champagne/65 hover:text-gold transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5 py-6 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center mt-0.5 group-hover:border-gold/50 transition-colors duration-300">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.35em] text-gold/45 uppercase mb-1.5">Hours</p>
                  <p className="font-[var(--font-jost)] font-light text-[13px] text-champagne/65 leading-[1.75]">{tx.hours}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative mt-8 overflow-hidden" style={{ height: '200px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.0!2d6.1296!3d49.6847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQxJzA1LjAiTiA2wrAwNyc0Ni43IkU!5e0!3m2!1sen!2slu!4v1699000000000"
                width="100%" height="100%"
                style={{ border: 0, filter: 'grayscale(100%) brightness(0.4) contrast(1.15) sepia(15%)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KT Equestrian location"
              />
              <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0f0c09] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className={fadeClass()} style={fadeStyle(200)}>

            {status === 'sent' ? (
              <div className="flex flex-col items-start gap-5 py-12 px-8 border border-gold/20">
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-gold uppercase mb-2">Message Sent</p>
                  <p className="font-[var(--font-jost)] font-light text-[14px] text-champagne/60 leading-[1.8]">{tx.sent}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatField
                    name="name" required label={tx.namePlaceholder}
                    value={form.name} onChange={handleChange}
                  />
                  <FloatField
                    name="email" type="email" required label={tx.emailPlaceholder}
                    value={form.email} onChange={handleChange}
                  />
                </div>

                <FloatField
                  name="phone" label={tx.phonePlaceholder}
                  value={form.phone} onChange={handleChange}
                />

                <FloatField
                  name="message" required rows={5} label={tx.messagePlaceholder}
                  value={form.message} onChange={handleChange}
                />

                {status === 'error' && (
                  <p className="font-[var(--font-jost)] text-[12px] text-champagne/45 border-l-2 border-gold/60 pl-3 py-0.5">
                    {tx.error}
                  </p>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-champagne uppercase bg-burgundy border border-burgundy/80 px-10 py-4 transition-all duration-300 hover:bg-burgundy/80 active:scale-[0.97] disabled:opacity-40"
                  >
                    {status === 'sending' ? tx.sending : tx.send}
                    {status !== 'sending' && (
                      <span className="relative w-[22px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45" />
                    )}
                  </button>
                </div>

                {/* Reassurance note */}
                <p className="font-[var(--font-jost)] font-light text-[11px] text-white/20 pt-1 tracking-wide">
                  We respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
    </section>
  )
}
