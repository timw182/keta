'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../_components/Navbar'
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
      className="font-[var(--font-jost)] font-light text-[13px] text-gold/70 underline underline-offset-2 decoration-dotted hover:text-gold transition-colors duration-200 cursor-pointer"
    >
      Click to reveal
    </button>
  )
}

const inputClass = `
  w-full bg-transparent border-b border-champagne/20 px-0 py-3
  font-[var(--font-jost)] font-light text-[13px] text-champagne placeholder:text-champagne/30
  focus:outline-none focus:border-gold transition-colors duration-200
`.trim()

export default function ContactPage() {
  const { lang } = useLang()
  const tx = t[lang].contact
  const footer = t[lang].footer

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
    <main className="bg-burgundy min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative flex flex-col items-center justify-end px-6 text-center pb-14 md:pb-20 pt-[160px] md:pt-[200px]
        before:content-[''] before:absolute before:inset-3 md:before:inset-8 before:border before:border-gold/30 before:pointer-events-none">
        <div className="flex items-center gap-3 md:gap-5 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <span className="w-[25px] md:w-[40px] h-px bg-gold" />
          <span className="font-[var(--font-cinzel)] text-[9px] md:text-[11px] tracking-[0.4em] text-gold uppercase">{tx.label}</span>
          <span className="w-[25px] md:w-[40px] h-px bg-gold" />
        </div>
        <h1
          className="font-[var(--font-cinzel)] font-normal text-champagne uppercase tracking-[0.1em] leading-[0.9] opacity-0 animate-fade-up"
          style={{ fontSize: 'clamp(48px, 10vw, 110px)', animationDelay: '0.5s' }}
        >
          {tx.title1}
          <em className="block font-[var(--font-cormorant)] not-italic italic text-[0.95em] tracking-[0.05em]">
            {tx.title2}
          </em>
        </h1>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-5 pb-20 md:px-[80px] md:pb-[100px] grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-[80px]
        before:content-[''] before:col-span-full before:h-px before:bg-gradient-to-r before:from-transparent before:via-gold/30 before:to-transparent before:mb-4">

        {/* ── Form ── */}
        <div className="pt-10">
          {status === 'sent' ? (
            <div className="flex items-start gap-4 py-8 border-l-2 border-gold pl-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <p className="font-[var(--font-jost)] text-[14px] text-champagne/70 leading-[1.8]">{tx.sent}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <input name="name" value={form.name} onChange={handleChange} required
                  placeholder={tx.namePlaceholder} className={inputClass} />
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder={tx.emailPlaceholder} className={inputClass} />
              </div>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder={tx.phonePlaceholder} className={inputClass} />
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                placeholder={tx.messagePlaceholder}
                className={`${inputClass} resize-none`} />

              {status === 'error' && (
                <p className="font-[var(--font-jost)] text-[11px] text-red-400">{tx.error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-4 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-champagne uppercase border border-gold/50 px-8 py-3.5 transition-all duration-300 hover:bg-gold/15 hover:border-gold disabled:opacity-50 mt-2"
              >
                {status === 'sending' ? tx.sending : tx.send}
                {status !== 'sending' && (
                  <span className="relative w-[20px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45" />
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Details + map ── */}
        <div className="pt-10 flex flex-col gap-10">

          {/* Contact details */}
          <div className="space-y-5">
            {/* Address */}
            <div className="flex items-start gap-4">
              <span className="text-gold mt-0.5 flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
              <span className="font-[var(--font-jost)] font-light text-[13px] text-champagne/60 leading-[1.7]">{tx.address}</span>
            </div>
            {/* Phone — reveal on click */}
            <div className="flex items-start gap-4">
              <span className="text-gold mt-0.5 flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.35 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              <RevealField value={tx.phone} href={`tel:${tx.phone.replace(/\s/g, '')}`} className="font-[var(--font-jost)] font-light text-[13px] text-champagne/60" />
            </div>
            {/* Hours */}
            <div className="flex items-start gap-4">
              <span className="text-gold mt-0.5 flex-shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
              <span className="font-[var(--font-jost)] font-light text-[13px] text-champagne/60 leading-[1.7]">{tx.hours}</span>
            </div>
          </div>

          {/* Map */}
          <div className="relative w-full overflow-hidden flex-1" style={{ minHeight: '300px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.0!2d6.1296!3d49.6847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQxJzA1LjAiTiA2wrAwNyc0Ni43IkU!5e0!3m2!1sen!2slu!4v1699000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(90%) contrast(1.1) sepia(15%)', position: 'absolute', inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KT Equestrian location"
            />
            <div className="absolute inset-0 border border-gold/20 pointer-events-none z-10" />
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5 pt-2 border-t border-gold/10">
            <span className="font-[var(--font-cinzel)] text-[7px] tracking-[0.5em] text-champagne/25 uppercase mr-2">Follow</span>
            {[
              { label: 'Facebook', href: 'https://facebook.com', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { label: 'Instagram', href: 'https://instagram.com', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
              { label: 'X', href: 'https://x.com', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="px-5 py-6 md:px-[80px] md:py-7 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between border-t border-gold/15">
        <Link href="/" className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-champagne/40 uppercase hover:text-gold/60 transition-colors duration-200">
          ← KT Equestrian
        </Link>
        <div className="flex items-center gap-5">
          {[
            { label: 'Facebook', href: 'https://facebook.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
            { label: 'Instagram', href: 'https://instagram.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
            { label: 'X', href: 'https://x.com', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="text-champagne/30 hover:text-gold transition-colors duration-200" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
        <span className="font-[var(--font-jost)] text-[10px] tracking-[0.15em] text-champagne/30 uppercase">{footer.sub}</span>
      </footer>
    </main>
  )
}
