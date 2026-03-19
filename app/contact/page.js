'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'
import { useLang } from '../_components/LanguageProvider'
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
      className="font-[var(--font-jost)] font-light text-[13px] text-gold/50 border-b border-dotted border-gold/30 hover:text-gold hover:border-gold transition-colors duration-200 cursor-pointer pb-px"
    >
      Click to reveal
    </button>
  )
}

function FloatField({ name, type = 'text', required, label, rows, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const isActive = focused || value.length > 0

  const shared = {
    id: name,
    name,
    value,
    onChange,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: [
      'w-full bg-white/[0.03] border border-white/[0.08] px-4 font-[var(--font-jost)] font-light',
      'text-[14px] text-champagne/90 focus:outline-none transition-all duration-300',
      focused ? 'border-gold/40 bg-white/[0.06]' : 'hover:border-white/15',
      rows ? 'pt-7 pb-3 resize-none' : 'pt-6 pb-2',
    ].join(' '),
  }

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={[
          'absolute left-4 pointer-events-none font-[var(--font-jost)] font-light transition-all duration-200',
          isActive
            ? 'top-[9px] text-[9px] tracking-[0.22em] uppercase ' + (focused ? 'text-gold/70' : 'text-gold/45')
            : 'top-4 text-[13px] text-white/25',
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

export default function ContactPage() {
  const { lang } = useLang()
  const tx = t[lang].contact

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

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

  return (
    <main className="min-h-screen" style={{ background: '#0f0c09' }}>
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative flex flex-col items-center justify-end px-6 text-center pb-14 md:pb-20 pt-[160px] md:pt-[200px]">
        {/* Inner border frame */}
        <div className="absolute inset-3 md:inset-8 border border-gold/15 pointer-events-none" />

        <div className="flex items-center gap-3 md:gap-5 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <span className="w-[25px] md:w-[40px] h-px bg-gold/50" />
          <span className="font-[var(--font-cinzel)] text-[9px] md:text-[11px] tracking-[0.4em] text-gold/70 uppercase">{tx.label}</span>
          <span className="w-[25px] md:w-[40px] h-px bg-gold/50" />
        </div>
        <h1
          className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.08em] leading-[0.9] opacity-0 animate-fade-up"
          style={{ fontSize: 'clamp(48px, 10vw, 110px)', animationDelay: '0.5s' }}
        >
          {tx.title1}
          <em className="block font-[var(--font-cormorant)] not-italic italic text-gold text-[0.95em] tracking-[0.05em]">
            {tx.title2}
          </em>
        </h1>
      </div>

      {/* Logo watermark */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-[3vw]">
        <div className="animate-drift-slow">
          <svg viewBox="338 146 165 165" className="w-[clamp(280px,45vw,620px)] h-auto opacity-[0.03]" fill="#b8946a">
            <path d="M389.12,226.12h.38l32.14-40.49h67.01c-14.14-22.51-39.17-37.48-67.7-37.48-11.31,0-22.07,2.37-31.83,6.61v71.36Z"/>
            <path d="M469.72,198.87v71.63l-16.95-18.54v-53.09h-22.33l-22.18,28.06,60.49,65.17c19.49-14.57,32.1-37.83,32.1-64.04,0-10.31-1.97-20.15-5.52-29.19h-25.61Z"/>
            <path d="M389.12,230.26v43.06h-16.95v-108.54c-18.93,14.61-31.14,37.52-31.14,63.28,0,44.14,35.78,79.91,79.91,79.91,12.09,0,23.54-2.7,33.82-7.5l-65.64-70.21Z"/>
          </svg>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 pb-20 md:px-20 md:pb-28">
        {/* Gold rule */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-24">

          {/* ── Form ── */}
          <div>
            {status === 'sent' ? (
              <div className="flex flex-col items-start gap-5 py-14 px-8 border border-gold/15">
                <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-gold uppercase mb-2">Message Sent</p>
                  <p className="font-[var(--font-jost)] font-light text-[14px] text-champagne/55 leading-[1.8]">{tx.sent}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatField name="name" required label={tx.namePlaceholder} value={form.name} onChange={handleChange} />
                  <FloatField name="email" type="email" required label={tx.emailPlaceholder} value={form.email} onChange={handleChange} />
                </div>
                <FloatField name="phone" label={tx.phonePlaceholder} value={form.phone} onChange={handleChange} />
                <FloatField name="message" required rows={5} label={tx.messagePlaceholder} value={form.message} onChange={handleChange} />

                {status === 'error' && (
                  <p className="font-[var(--font-jost)] text-[12px] text-champagne/40 border-l-2 border-gold/50 pl-3 py-0.5">{tx.error}</p>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-champagne uppercase bg-burgundy border border-burgundy/80 px-10 py-4 transition-all duration-300 hover:bg-burgundy/80 active:scale-[0.97] disabled:opacity-40 cursor-pointer"
                  >
                    {status === 'sending' ? tx.sending : tx.send}
                    {status !== 'sending' && (
                      <span className="relative w-[22px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Details + map ── */}
          <div className="flex flex-col gap-10">

            <h3 className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold/40 uppercase">{tx.detailsLabel}</h3>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-50">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="font-[var(--font-jost)] font-light text-[14px] text-champagne/50 leading-[1.7]">{tx.address}</p>
              </div>
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-50">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.35 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <RevealField value={tx.phone} href={`tel:${tx.phone.replace(/\s/g, '')}`} className="font-[var(--font-jost)] font-light text-[14px] text-champagne/50 hover:text-gold transition-colors duration-200" />
              </div>
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-50">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <RevealField value={tx.email} href={`mailto:${tx.email}`} className="font-[var(--font-jost)] font-light text-[14px] text-champagne/50 hover:text-gold transition-colors duration-200" />
              </div>
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 opacity-50">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <p className="font-[var(--font-jost)] font-light text-[14px] text-champagne/50 leading-[1.7]">{tx.hours}</p>
              </div>
            </div>

            {/* Map */}
            <div className="relative overflow-hidden" style={{ height: '280px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.0!2d6.1296!3d49.6847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQxJzA1LjAiTiA2wrAwNyc0Ni43IkU!5e0!3m2!1sen!2slu!4v1699000000000"
                width="100%" height="100%"
                style={{ border: 0, filter: 'grayscale(100%) brightness(0.55) contrast(1.1) sepia(20%)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KT Equestrian location"
              />
              <div className="absolute inset-0 border border-gold/15 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0f0c09] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
