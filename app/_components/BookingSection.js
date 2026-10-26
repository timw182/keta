'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'
import Contours from './Contours'
import { Eyebrow, SunButton } from './ui'

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
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center text-ink/50 hover:text-ink hover:bg-sun rounded-full transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span className="font-display text-[22px] text-ink">{monthName}</span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center text-ink/50 hover:text-ink hover:bg-sun rounded-full transition-colors cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center font-sans font-medium text-[11px] tracking-[0.12em] text-ink/45 uppercase py-1">{d}</div>
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
                h-10 w-full flex items-center justify-center font-sans text-[14px] transition-all duration-150 rounded-full cursor-pointer
                ${disabled ? 'text-ink/20 !cursor-not-allowed' : ''}
                ${isSelected ? 'bg-ink text-cream' : !disabled ? 'hover:bg-sun text-ink' : ''}
                ${isToday(day) && !isSelected ? 'ring-1 ring-ink/40' : ''}
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
      className="relative bg-cream overflow-hidden"
    >
      <Contours className="text-ink/[0.07]" />

      <div className="relative max-w-[1320px] mx-auto px-5 pt-12 pb-20 md:px-12 md:pt-16 md:pb-28">

        {/* Header — staggered */}
        <div className="mb-12 md:mb-16">
          <div {...s(0)} className={`mb-6 ${s(0).className}`}>
            <Eyebrow>{tx.label}</Eyebrow>
          </div>
          <h2
            {...s(150)}
            className={`font-display text-ink leading-[0.95] tracking-[-0.02em] ${s(150).className}`}
            style={{ ...s(150).style, fontSize: 'clamp(52px, 9vw, 120px)' }}
          >
            {tx.title1} {tx.title2}
          </h2>
        </div>

        {status === 'done' ? (
          <div {...s(0)} className={`max-w-[520px] bg-white/70 border border-ink/10 px-8 py-12 ${s(0).className}`}>
            <div className="w-11 h-11 rounded-full bg-sun flex items-center justify-center mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171613" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="font-display text-[30px] leading-none text-ink mb-3">{tx.successTitle}</h3>
            <p className="font-sans text-[15px] text-ink/75 leading-[1.8] mb-8">{tx.successMsg}</p>
            <button onClick={() => { setStep(1); setType(null); setDate(null); setSlot(null); setForm({ name: '', email: '', phone: '', notes: '' }); setStatus(null) }}
              className="group inline-flex items-center gap-3 font-sans font-medium text-[14px] tracking-[0.04em] text-ink uppercase cursor-pointer">
              <span className="link-underline pb-1">{tx.bookAnother}</span>
              <span aria-hidden="true">↗</span>
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
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-[12px] border transition-all duration-300 ${
                        step === n ? 'bg-sun border-sun text-ink' :
                        step > n ? 'bg-ink border-ink text-cream' :
                        'border-ink/20 text-ink/40'
                      }`}>{n}</span>
                      <span className={`font-sans font-medium text-[12px] tracking-[0.12em] uppercase hidden sm:block transition-all duration-300 ${
                        step === n ? 'text-ink' : step > n ? 'text-ink/70' : 'text-ink/35'
                      }`}>{label}</span>
                    </button>
                    {i < 3 && (
                      <div className={`w-6 md:w-12 h-px mx-2 transition-all duration-500 ${step > n ? 'bg-ink' : 'bg-ink/15'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Type */}
              {step === 1 && (
                <div className="animate-fade-up" style={{ animationDuration: '0.6s' }}>
                  <p className="font-sans text-[16px] text-ink/70 mb-7">{tx.chooseType}</p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-[500px]">
                    {TYPES.map(({ key, icon }) => {
                      const sel = type === key
                      return (
                        <button
                          key={key}
                          onClick={() => { setType(key); setStep(2) }}
                          className={`relative flex-1 flex items-center gap-4 px-6 py-5 text-left border transition-all duration-200 active:scale-[0.97] overflow-hidden group cursor-pointer ${
                            sel
                              ? 'bg-ink border-ink text-cream'
                              : 'bg-white/80 border-ink/10 text-ink hover:border-ink/40 hover:shadow-sm'
                          }`}
                        >
                          {!sel && <span className="absolute inset-0 bg-sun/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
                          <span className="text-xl flex-shrink-0 relative">{icon}</span>
                          <span className="relative">
                            <span className={`font-display text-[22px] leading-tight block mb-1 ${sel ? 'text-cream' : 'text-ink'}`}>
                              {tx.types[key]}
                            </span>
                            <span className={`font-sans text-[13px] ${sel ? 'text-cream/70' : 'text-ink/60'}`}>
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
                  <p className="font-sans text-[16px] text-ink/70 mb-7">{tx.chooseDate}</p>
                  <Calendar selected={date} onSelect={(d) => { setDate(d); setSlot(null); setStep(3) }} />
                </div>
              )}

              {/* Step 3: Time slot */}
              {step === 3 && (
                <div className="animate-fade-up" style={{ animationDuration: '0.6s' }}>
                  <p className="font-display text-[24px] text-ink mb-2">{formatDate(date)}</p>
                  <p className="font-sans text-[14px] text-ink/60 mb-7">{tx.chooseSlot}</p>
                  <div className="grid grid-cols-3 gap-3 max-w-[380px]">
                    {TIME_SLOTS.map((sl) => {
                      const isSel = slot?.start === sl.start
                      return (
                        <button
                          key={sl.start}
                          onClick={() => { setSlot(sl); setStep(4) }}
                          className={`relative py-4 font-sans font-medium text-[14px] tracking-[0.06em] transition-all duration-200 active:scale-[0.97] overflow-hidden group cursor-pointer ${
                            isSel
                              ? 'bg-ink text-cream'
                              : 'bg-white/80 border border-ink/10 text-ink hover:border-ink/40'
                          }`}
                        >
                          {!isSel && <span className="absolute inset-0 bg-sun opacity-0 group-hover:opacity-100 transition-opacity duration-150" />}
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
                  <p className="font-sans text-[16px] text-ink/70 mb-7">{tx.fillDetails}</p>
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
                      <p className="font-sans text-[13px] text-ink/80 border-l-2 border-sun pl-3">{tx.error}</p>
                    )}

                    <div className="pt-3">
                      <SunButton type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? tx.sending : tx.submit}
                      </SunButton>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* ── Right: summary card ── */}
            <div className="hidden lg:block">
              <div className="bg-ink text-cream px-7 py-8 sticky top-28">
                <p className="font-display text-[28px] leading-none text-cream mb-7">{tx.summary}</p>
                <div className="space-y-6">
                  <SummaryRow label={tx.summaryType} value={type ? tx.types[type] : '—'} active={!!type} />
                  <SummaryRow label={tx.summaryDate} value={date ? formatDate(date) : '—'} active={!!date} />
                  <SummaryRow label={tx.summaryTime} value={slot ? `${slot.start} – ${slot.end}` : '—'} active={!!slot} />
                  <SummaryRow label={tx.summaryName} value={form.name || '—'} active={!!form.name} />
                </div>
                {type && date && slot && (
                  <div className="mt-8 pt-6 border-t border-cream/15">
                    <p className="font-sans text-[13px] text-cream/60 leading-[1.8]">{tx.summaryNote}</p>
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
      <span className="font-sans font-medium text-[11px] tracking-[0.16em] text-sun uppercase">{label}</span>
      <span className={`font-sans text-[15px] transition-all duration-300 ${active ? 'text-cream' : 'text-cream/30'}`}>{value}</span>
    </div>
  )
}
