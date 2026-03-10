'use client'

import { useState } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'
import SectionHeader from './SectionHeader'

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
      className="font-[var(--font-jost)] font-light text-[14px] text-gold/70 underline underline-offset-2 decoration-dotted hover:text-gold transition-colors duration-200 cursor-pointer"
    >
      Click to reveal
    </button>
  )
}

const inputClass = 'input-field'

export default function ContactSection() {
  const { lang } = useLang()
  const tx = t[lang].contact

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

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
    <section
      id="contact"
      className="relative bg-champagne px-5 py-16 md:px-[80px] md:py-[100px]
        before:content-[''] before:absolute before:top-0 before:left-5 before:right-5
        md:before:left-[80px] md:before:right-[80px] before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-gold/60 before:to-transparent"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-[80px]">

        {/* ── Left: form ── */}
        <div>
          <SectionHeader label={tx.label} title={tx.title1} subtitle={tx.title2} mb="mb-10" />

          {status === 'sent' ? (
            <div className="flex items-center gap-4 py-6 border-l-2 border-gold pl-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <p className="font-[var(--font-jost)] text-[14px] text-burgundy/70">{tx.sent}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input name="name" value={form.name} onChange={handleChange} required
                  placeholder={tx.namePlaceholder} className={inputClass} />
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder={tx.emailPlaceholder} className={inputClass} />
              </div>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder={tx.phonePlaceholder} className={inputClass} />
              <textarea name="message" value={form.message} onChange={handleChange} required rows={4}
                placeholder={tx.messagePlaceholder}
                className={`${inputClass} resize-none`} />

              {status === 'error' && (
                <p className="font-[var(--font-jost)] text-[12px] text-burgundy/60 border-l-2 border-gold pl-3">{tx.error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-shimmer inline-flex items-center gap-4 font-[var(--font-cinzel)] text-[11px] tracking-[0.4em] text-champagne uppercase bg-burgundy px-8 py-3.5 transition-all duration-300 hover:bg-burgundy/80 active:scale-[0.97] disabled:opacity-50 mt-2"
              >
                {status === 'sending' ? tx.sending : tx.send}
                {status !== 'sending' && (
                  <span className="relative w-[20px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45" />
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Right: details ── */}
        <div className="flex flex-col gap-10">
          <div>
            <SectionHeader label={tx.detailsLabel} mb="mb-7" />

            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="text-gold mt-0.5 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <span className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/70 leading-[1.7]">{tx.address}</span>
              </div>
              {/* Phone — reveal on click */}
              <div className="flex items-start gap-4">
                <span className="text-gold mt-0.5 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.35 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <RevealField value={tx.phone} href={`tel:${tx.phone.replace(/\s/g, '')}`} className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/70" />
              </div>
              {/* Hours */}
              <div className="flex items-start gap-4">
                <span className="text-gold mt-0.5 flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                <span className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/70 leading-[1.7]">{tx.hours}</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.0!2d6.1296!3d49.6847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQxJzA1LjAiTiA2wrAwNyc0Ni43IkU!5e0!3m2!1sen!2slu!4v1699000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) contrast(1.1) sepia(10%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KT Equestrian location"
            />
            <div className="absolute inset-0 border border-gold/25 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
