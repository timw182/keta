'use client'

import { useState, useRef, useEffect } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'
import { Eyebrow, SunButton } from './ui'

/* Anti-scrape reveal for phone/email */
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
      className="font-sans text-[14px] text-sun border-b border-dotted border-sun/50 hover:border-sun transition-colors duration-200 cursor-pointer pb-px"
    >
      Click to reveal
    </button>
  )
}

/* Floating label input */
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
      'w-full bg-white/[0.04] border border-cream/15 px-4 font-sans',
      'text-[15px] text-cream focus:outline-none transition-all duration-300',
      focused ? 'border-sun bg-white/[0.07]' : 'hover:border-cream/30',
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
            ? 'top-[9px] text-[10px] tracking-[0.18em] uppercase font-medium ' + (focused ? 'text-sun' : 'text-cream/55')
            : 'top-4 text-[14px] text-cream/50',
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

/* Contact detail row data */
const detailIcons = {
  address: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5b52e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  phone: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5b52e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.35 2 2 0 0 1 3.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  email: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5b52e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  hours: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5b52e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
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
      { threshold: 0.06 }
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

  /* Stagger helpers */
  const s = (delay) => ({
    className: `transition-all duration-[1s] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`,
    style: { transitionDelay: visible ? `${delay}ms` : '0ms' },
  })

  /* Contact detail rows */
  const details = [
    { icon: detailIcons.address, label: tx.detailsLabel, content: <p className="font-sans text-[15px] text-cream/80 leading-[1.7]">{tx.address}</p> },
    { icon: detailIcons.phone, label: 'Phone', content: <RevealField value={tx.phone} href={`tel:${tx.phone.replace(/\s/g, '')}`} className="font-sans text-[15px] text-cream/80 hover:text-sun transition-colors duration-200" /> },
    { icon: detailIcons.email, label: 'Email', content: <RevealField value={tx.email} href={`mailto:${tx.email}`} className="font-sans text-[15px] text-cream/80 hover:text-sun transition-colors duration-200" /> },
    { icon: detailIcons.hours, label: 'Hours', content: <p className="font-sans text-[15px] text-cream/80 leading-[1.7]">{tx.hours}</p> },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink scroll-mt-20"
    >
      {/* Logo watermark — slow drift */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:flex items-center justify-end pointer-events-none select-none overflow-hidden pr-[3vw]"
      >
        <div className="animate-drift-slow">
          <svg
            viewBox="338 146 165 165"
            className="w-[clamp(280px,45vw,620px)] h-auto opacity-[0.05]"
            fill="#f5b52e"
          >
            <path d="M389.12,226.12h.38l32.14-40.49h67.01c-14.14-22.51-39.17-37.48-67.7-37.48-11.31,0-22.07,2.37-31.83,6.61v71.36Z"/>
            <path d="M469.72,198.87v71.63l-16.95-18.54v-53.09h-22.33l-22.18,28.06,60.49,65.17c19.49-14.57,32.1-37.83,32.1-64.04,0-10.31-1.97-20.15-5.52-29.19h-25.61Z"/>
            <path d="M389.12,230.26v43.06h-16.95v-108.54c-18.93,14.61-31.14,37.52-31.14,63.28,0,44.14,35.78,79.91,79.91,79.91,12.09,0,23.54-2.7,33.82-7.5l-65.64-70.21Z"/>
          </svg>
        </div>
      </div>


      <div className="relative z-10 max-w-[1320px] mx-auto px-5 py-24 md:px-12 md:py-36">

        {/* Section header — staggered */}
        <div {...s(0)}>
          <Eyebrow dark className="mb-6">{tx.label}</Eyebrow>
        </div>
        <h2
          {...s(150)}
          className={`font-display text-cream leading-[0.95] tracking-[-0.01em] mb-16 md:mb-24 ${s(150).className}`}
          style={{ ...s(150).style, fontSize: 'clamp(40px, 6vw, 88px)' }}
        >
          {tx.title1}{' '}
          <em className="font-display not-italic text-sun">
            {tx.title2}
          </em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-28 items-start">

          {/* ── LEFT: Contact details — staggered rows ── */}
          <div>
            <h3 {...s(250)} className={`font-sans font-medium text-[12px] tracking-[0.18em] text-cream/55 uppercase mb-8 ${s(250).className}`}>
              {tx.detailsLabel}
            </h3>

            <div className="space-y-7 mb-12">
              {details.map((d, i) => (
                <div
                  key={i}
                  {...s(320 + i * 100)}
                  className={`flex items-start gap-4 ${s(320 + i * 100).className}`}
                >
                  <span className="mt-1 shrink-0">{d.icon}</span>
                  {d.content}
                </div>
              ))}
            </div>

            {/* Map */}
            <div
              {...s(750)}
              className={`relative overflow-hidden ${s(750).className}`}
              style={{ ...s(750).style, height: '220px' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.0!2d6.1296!3d49.6847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQxJzA1LjAiTiA2wrAwNyc0Ni43IkU!5e0!3m2!1sen!2slu!4v1699000000000"
                width="100%" height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.05)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KT Equestrian location"
              />
                          </div>
          </div>

          {/* ── RIGHT: Form — staggered fields ── */}
          <div>
            {status === 'sent' ? (
              <div {...s(300)} className={`flex flex-col items-start gap-5 py-14 px-8 border border-cream/15 ${s(300).className}`}>
                <div className="w-11 h-11 rounded-full bg-sun flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="font-display text-[26px] text-cream mb-2">Message Sent</p>
                  <p className="font-sans text-[15px] text-cream/75 leading-[1.8]">{tx.sent}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div {...s(300)}>
                    <FloatField
                      name="name" required label={tx.namePlaceholder}
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div {...s(400)}>
                    <FloatField
                      name="email" type="email" required label={tx.emailPlaceholder}
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div {...s(500)}>
                  <FloatField
                    name="phone" label={tx.phonePlaceholder}
                    value={form.phone} onChange={handleChange}
                  />
                </div>

                <div {...s(600)}>
                  <FloatField
                    name="message" required rows={5} label={tx.messagePlaceholder}
                    value={form.message} onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-sans text-[13px] text-cream/80 border-l-2 border-sun pl-3 py-0.5">
                    {tx.error}
                  </p>
                )}

                <div {...s(700)}>
                  <div className="pt-4">
                    <SunButton
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full sm:w-auto"
                    >
                      {status === 'sending' ? tx.sending : tx.send}
                    </SunButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
