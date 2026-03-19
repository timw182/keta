'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'

const TYPES = [
  { key: 'lesson', icon: '🐎' },
  { key: 'course', icon: '📚' },
]

const TIME_SLOTS = [
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
  { start: '16:00', end: '17:00' },
]

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function Calendar({ selected, onSelect }) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }))

  const firstDay = new Date(view.year, view.month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const monthName = firstDay.toLocaleString('en', { month: 'long', year: 'numeric' })

  function prevMonth() {
    setView(v => {
      const m = v.month === 0 ? 11 : v.month - 1
      const y = v.month === 0 ? v.year - 1 : v.year
      return { year: y, month: m }
    })
  }
  function nextMonth() {
    setView(v => {
      const m = v.month === 11 ? 0 : v.month + 1
      const y = v.month === 11 ? v.year + 1 : v.year
      return { year: y, month: m }
    })
  }

  const isToday = (day) => {
    return view.year === today.getFullYear() && view.month === today.getMonth() && day === today.getDate()
  }

  return (
    <div className="w-full max-w-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-burgundy/35 hover:text-gold transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-burgundy uppercase">{monthName}</span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-burgundy/35 hover:text-gold transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center font-[var(--font-cinzel)] text-[9px] tracking-[0.15em] text-burgundy/30 uppercase py-1">{d}</div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const date = new Date(view.year, view.month, day)
          const isPast = date < today
          const isSunday = date.getDay() === 0
          const disabled = isPast || isSunday
          const dateStr = `${view.year}-${String(view.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isSelected = selected === dateStr

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`
                h-9 w-full flex items-center justify-center font-[var(--font-jost)] text-[12px] transition-all duration-150 rounded cursor-pointer
                ${disabled ? 'text-burgundy/15 !cursor-not-allowed' : ''}
                ${isSelected ? 'bg-gold text-champagne' : !disabled ? 'hover:bg-gold/15 hover:text-gold text-burgundy' : ''}
                ${isToday(day) && !isSelected ? 'ring-1 ring-gold/30' : ''}
              `}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function BookingSection() {
  const { lang } = useLang()
  const tx = t[lang].booking

  const [step, setStep] = useState(1)
  const [type, setType] = useState(null)
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [status, setStatus] = useState(null)

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  function handleFormChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          type,
          date,
          startTime: slot.start,
          endTime: slot.end,
        }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const formatDate = (d) => {
    if (!d) return ''
    const [y, m, day] = d.split('-')
    return new Date(y, m - 1, day).toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long' })
  }

  const stepLabel = [
    { n: 1, label: tx.step1 },
    { n: 2, label: tx.step2 },
    { n: 3, label: tx.step3 },
    { n: 4, label: tx.step4 },
  ]

  /* Stagger helper */
  const s = (delay) => ({
    className: `transition-all duration-[1.2s] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`,
    style: { transitionDelay: visible ? `${delay}ms` : '0ms' },
  })

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative bg-champagne overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-5 md:inset-x-20 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-[1320px] mx-auto px-5 py-20 md:px-20 md:py-32">

        {/* Header — staggered */}
        <div className="mb-12 md:mb-16">
          <div {...s(0)} className={`flex items-center gap-3.5 mb-8 ${s(0).className}`}>
            <span className={`h-px bg-gold transition-all duration-[1.4s] ease-out ${visible ? 'w-8' : 'w-0'}`} />
            <span className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold uppercase">{tx.label}</span>
          </div>
          <h2
            {...s(150)}
            className={`font-[var(--font-cinzel)] text-burgundy uppercase tracking-[0.08em] leading-[1.1] ${s(150).className}`}
            style={{ ...s(150).style, fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            {tx.title1}
            <em className="block font-[var(--font-cormorant)] italic font-light text-[1.15em] text-burgundy tracking-[0.04em]">
              {tx.title2}
            </em>
          </h2>
        </div>

        {status === 'done' ? (
          <div {...s(0)} className={`max-w-[520px] border border-gold/25 px-8 py-12 ${s(0).className}`}>
            <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="font-[var(--font-cinzel)] text-[12px] tracking-[0.3em] text-burgundy uppercase mb-3">{tx.successTitle}</h3>
            <p className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/55 leading-[1.8] mb-8">{tx.successMsg}</p>
            <button onClick={() => { setStep(1); setType(null); setDate(null); setSlot(null); setForm({ name: '', email: '', phone: '', notes: '' }); setStatus(null) }}
              className="group inline-flex items-center gap-4 font-[var(--font-cinzel)] text-[10px] tracking-[0.35em] text-gold uppercase cursor-pointer">
              {tx.bookAnother}
              <span className="w-6 h-px bg-current group-hover:w-12 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            </button>
          </div>
        ) : (
          <div {...s(250)} className={`grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 md:gap-20 ${s(250).className}`}>

            {/* ── Left: steps ── */}
            <div>
              {/* Step indicator */}
              <div className="flex items-center gap-0 mb-12">
                {stepLabel.map(({ n, label }, i) => (
                  <div key={n} className="flex items-center">
                    <button
                      onClick={() => { if (n < step) setStep(n) }}
                      className={`flex items-center gap-2 transition-all ${n < step ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-[var(--font-cinzel)] text-[9px] border transition-all duration-300 ${
                        step === n ? 'bg-gold border-gold text-champagne' :
                        step > n ? 'bg-gold/15 border-gold/40 text-gold' :
                        'border-burgundy/15 text-burgundy/25'
                      }`}>{n}</span>
                      <span className={`font-[var(--font-cinzel)] text-[9px] tracking-[0.2em] uppercase hidden sm:block transition-all duration-300 ${
                        step === n ? 'text-burgundy' : step > n ? 'text-gold/60' : 'text-burgundy/20'
                      }`}>{label}</span>
                    </button>
                    {i < 3 && (
                      <div className={`w-6 md:w-12 h-px mx-2 transition-all duration-500 ${step > n ? 'bg-gold/40' : 'bg-burgundy/10'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Type */}
              {step === 1 && (
                <div className="animate-fade-up" style={{ animationDuration: '0.6s' }}>
                  <p className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/50 mb-7">{tx.chooseType}</p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-[500px]">
                    {TYPES.map(({ key, icon }) => {
                      const sel = type === key
                      return (
                        <button
                          key={key}
                          onClick={() => { setType(key); setStep(2) }}
                          className={`relative flex-1 flex items-center gap-4 px-6 py-5 text-left border transition-all duration-200 active:scale-[0.97] overflow-hidden group cursor-pointer ${
                            sel
                              ? 'bg-burgundy border-burgundy text-champagne'
                              : 'bg-white border-burgundy/10 text-burgundy hover:border-gold/50 hover:shadow-sm'
                          }`}
                        >
                          {!sel && <span className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
                          <span className="text-xl flex-shrink-0 relative">{icon}</span>
                          <span className="relative">
                            <span className={`font-[var(--font-cinzel)] text-[11px] tracking-[0.25em] uppercase block mb-0.5 ${sel ? 'text-champagne' : 'text-burgundy'}`}>
                              {tx.types[key]}
                            </span>
                            <span className={`font-[var(--font-jost)] font-light text-[11px] ${sel ? 'text-champagne/65' : 'text-burgundy/40'}`}>
                              {tx.typeDesc[key]}
                            </span>
                          </span>
                          {sel && (
                            <span className="ml-auto flex-shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Date */}
              {step === 2 && (
                <div className="animate-fade-up" style={{ animationDuration: '0.6s' }}>
                  <p className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/50 mb-7">{tx.chooseDate}</p>
                  <Calendar selected={date} onSelect={(d) => { setDate(d); setSlot(null); setStep(3) }} />
                </div>
              )}

              {/* Step 3: Time slot */}
              {step === 3 && (
                <div className="animate-fade-up" style={{ animationDuration: '0.6s' }}>
                  <p className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/50 mb-2">{formatDate(date)}</p>
                  <p className="font-[var(--font-jost)] font-light text-[12px] text-burgundy/35 mb-7">{tx.chooseSlot}</p>
                  <div className="grid grid-cols-3 gap-3 max-w-[380px]">
                    {TIME_SLOTS.map((sl) => {
                      const isSel = slot?.start === sl.start
                      return (
                        <button
                          key={sl.start}
                          onClick={() => { setSlot(sl); setStep(4) }}
                          className={`relative py-4 font-[var(--font-cinzel)] text-[10px] tracking-[0.2em] transition-all duration-200 active:scale-[0.97] overflow-hidden group cursor-pointer ${
                            isSel
                              ? 'bg-gold text-champagne'
                              : 'bg-white border border-burgundy/10 text-burgundy hover:border-gold/40'
                          }`}
                        >
                          {!isSel && <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-[0.08] transition-opacity duration-150" />}
                          <span className="relative">{sl.start}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Details */}
              {step === 4 && (
                <div className="max-w-[500px] animate-fade-up" style={{ animationDuration: '0.6s' }}>
                  <p className="font-[var(--font-jost)] font-light text-[14px] text-burgundy/50 mb-7">{tx.fillDetails}</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <input name="name" value={form.name} onChange={handleFormChange} required
                        placeholder={tx.namePlaceholder}
                        className="input-field" />
                      <input name="email" type="email" value={form.email} onChange={handleFormChange} required
                        placeholder={tx.emailPlaceholder}
                        className="input-field" />
                    </div>
                    <input name="phone" value={form.phone} onChange={handleFormChange}
                      placeholder={tx.phonePlaceholder}
                      className="input-field" />
                    <textarea name="notes" value={form.notes} onChange={handleFormChange} rows={3}
                      placeholder={tx.notesPlaceholder}
                      className="input-field resize-none" />

                    {status === 'error' && (
                      <p className="font-[var(--font-jost)] text-[12px] text-burgundy/60 border-l-2 border-gold/50 pl-3">{tx.error}</p>
                    )}

                    <div className="pt-3">
                      <button type="submit" disabled={status === 'sending'}
                        className="btn-shimmer inline-flex items-center gap-5 font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-champagne uppercase bg-burgundy border border-burgundy/80 px-8 py-3.5 transition-all duration-300 hover:bg-burgundy/80 active:scale-[0.97] disabled:opacity-40 cursor-pointer">
                        {status === 'sending' ? tx.sending : tx.submit}
                        {status !== 'sending' && (
                          <span className="relative w-[20px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45" />
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* ── Right: summary card ── */}
            <div className="hidden lg:block">
              <div className="border border-gold/20 px-7 py-8 sticky top-28">
                <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold uppercase mb-7">{tx.summary}</p>
                <div className="space-y-6">
                  <SummaryRow label={tx.summaryType} value={type ? tx.types[type] : '—'} active={!!type} />
                  <SummaryRow label={tx.summaryDate} value={date ? formatDate(date) : '—'} active={!!date} />
                  <SummaryRow label={tx.summaryTime} value={slot ? `${slot.start} – ${slot.end}` : '—'} active={!!slot} />
                  <SummaryRow label={tx.summaryName} value={form.name || '—'} active={!!form.name} />
                </div>
                {type && date && slot && (
                  <div className="mt-8 pt-6 border-t border-gold/15">
                    <p className="font-[var(--font-jost)] font-light text-[11px] text-burgundy/40 leading-[1.8]">{tx.summaryNote}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function SummaryRow({ label, value, active }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-burgundy/30 uppercase">{label}</span>
      <span className={`font-[var(--font-jost)] font-light text-[13px] transition-all duration-300 ${active ? 'text-burgundy' : 'text-burgundy/20'}`}>{value}</span>
    </div>
  )
}
