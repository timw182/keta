'use client'

import { useState } from 'react'
import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'
import { useLang } from '../_components/LanguageProvider'
import { t } from '../../lib/translations'
import Contours from '../_components/Contours'
import { Eyebrow, SunButton } from '../_components/ui'

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
      className="font-sans font-medium text-[15px] text-ink border-b border-dotted border-ink/50 hover:border-ink transition-colors duration-200 cursor-pointer pb-px"
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
      'w-full bg-white/70 border border-ink/15 px-4 font-sans',
      'text-[15px] text-ink focus:outline-none transition-all duration-300',
      focused ? 'border-ink bg-white' : 'hover:border-ink/35',
      rows ? 'pt-7 pb-3 resize-none' : 'pt-6 pb-2',
    ].join(' '),
  }

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={[
          'absolute left-4 pointer-events-none font-sans transition-all duration-200',
          isActive
            ? 'top-[9px] text-[10px] font-medium tracking-[0.18em] uppercase ' + (focused ? 'text-ink' : 'text-ink/55')
            : 'top-4 text-[14px] text-ink/50',
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
    <main className="min-h-screen bg-cream overflow-x-clip">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <Contours className="text-ink/[0.09]" />
        <div className="relative max-w-[1320px] mx-auto px-5 md:px-12 pt-14 md:pt-20 pb-14 md:pb-20">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Eyebrow>{tx.label}</Eyebrow>
          </div>
          <h1
            className="font-display text-ink leading-[0.95] tracking-[-0.02em] mt-6 opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(56px, 10vw, 140px)', animationDelay: '0.5s' }}
          >
            {tx.title1} {tx.title2}
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 pb-20 md:px-12 md:pb-28">
        <div className="h-px bg-ink/15 mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-24">

          {/* ── Form ── */}
          <div>
            {status === 'sent' ? (
              <div className="flex flex-col items-start gap-5 py-14 px-8 bg-white/70 border border-ink/10">
                <div className="w-11 h-11 rounded-full bg-sun flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="font-display text-[28px] text-ink mb-2">Message Sent</p>
                  <p className="font-sans text-[15px] text-ink/75 leading-[1.8]">{tx.sent}</p>
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
                  <p className="font-sans text-[13px] text-ink/80 border-l-2 border-sun pl-3 py-0.5">{tx.error}</p>
                )}

                <div className="pt-4">
                  <SunButton
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto"
                  >
                    {status === 'sending' ? tx.sending : tx.send}
                  </SunButton>
                </div>
              </form>
            )}
          </div>

          {/* ── Details + map ── */}
          <div className="flex flex-col gap-10">

            <h3 className="font-display text-[34px] leading-none text-ink">{tx.detailsLabel}</h3>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#171613" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="font-sans text-[16px] text-ink/80 leading-[1.7]">{tx.address}</p>
              </div>
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#171613" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.35 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <RevealField value={tx.phone} href={`tel:${tx.phone.replace(/\s/g, '')}`} className="font-sans text-[16px] text-ink/80 hover:text-ink transition-colors duration-200" />
              </div>
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#171613" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <RevealField value={tx.email} href={`mailto:${tx.email}`} className="font-sans text-[16px] text-ink/80 hover:text-ink transition-colors duration-200" />
              </div>
              <div className="flex items-start gap-4">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#171613" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <p className="font-sans text-[16px] text-ink/80 leading-[1.7]">{tx.hours}</p>
              </div>
            </div>

            {/* Map */}
            <div className="relative overflow-hidden" style={{ height: '280px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.0!2d6.1296!3d49.6847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQxJzA1LjAiTiA2wrAwNyc0Ni43IkU!5e0!3m2!1sen!2slu!4v1699000000000"
                width="100%" height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.05)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KT Equestrian location"
              />
              <div className="absolute inset-0 border border-ink/15 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
