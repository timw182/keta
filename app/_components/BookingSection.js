'use client'

import { useState } from 'react'
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
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [view, setView] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const firstDay = new Date(view.year, view.month, 1)
  // Monday-first offset
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

  return (
    <div className="w-full max-w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center text-burgundy/40 hover:text-gold transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-burgundy uppercase">{monthName}</span>
        <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center text-burgundy/40 hover:text-gold transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center font-[var(--font-cinzel)] text-[9px] tracking-[0.15em] text-burgundy/35 uppercase py-1">{d}</div>
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
                h-8 w-full flex items-center justify-center font-[var(--font-jost)] text-[12px] transition-all duration-150
                ${disabled ? 'text-burgundy/20 cursor-not-allowed' : 'cursor-pointer'}
                ${isSelected ? 'bg-gold text-champagne rounded' : !disabled ? 'hover:bg-gold/15 hover:text-gold rounded' : ''}
                ${!disabled && !isSelected ? 'text-burgundy' : ''}
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

  const [step, setStep] = useState(1) // 1=type, 2=date, 3=slot, 4=details
  const [type, setType] = useState(null)
  const [date, setDate] = useState(null)
  const [slot, setSlot] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'done' | 'error'

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

  return (
    <section
      id="booking"
      className="relative bg-champagne px-5 py-16 md:px-[80px] md:py-[100px]
        before:content-[''] before:absolute before:top-0 before:left-5 before:right-5
        md:before:left-[80px] md:before:right-[80px] before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-gold/60 before:to-transparent"
    >
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[11px] tracking-[0.5em] text-gold uppercase mb-5
          before:content-[''] before:w-[30px] before:h-px before:bg-gold">
          {tx.label}
        </div>
        <h2 className="font-[var(--font-cinzel)] font-semibold text-burgundy uppercase tracking-[0.1em] leading-[1.15]"
          style={{ fontSize: 'clamp(28px, 3.4vw, 46px)' }}>
          {tx.title1}
          <em className="block font-[var(--font-cormorant)] italic font-light text-[1.2em] text-burgundy tracking-[0.06em]">
            {tx.title2}
          </em>
        </h2>
      </div>

      {status === 'done' ? (
        /* ── Success state ── */
        <div className="max-w-[520px] border border-gold/30 px-8 py-10 text-center">
          <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3 className="font-[var(--font-cinzel)] text-[13px] tracking-[0.3em] text-burgundy uppercase mb-3">{tx.successTitle}</h3>
          <p className="font-[var(--font-jost)] font-light text-[13px] text-burgundy/60 leading-[1.8] mb-6">{tx.successMsg}</p>
          <button onClick={() => { setStep(1); setType(null); setDate(null); setSlot(null); setForm({ name: '', email: '', phone: '', notes: '' }); setStatus(null) }}
            className="font-[var(--font-cinzel)] text-[10px] tracking-[0.35em] text-gold uppercase border-b border-gold pb-1 hover:text-burgundy transition-colors">
            {tx.bookAnother}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 md:gap-16">

          {/* ── Left: steps ── */}
          <div>
            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-10">
              {stepLabel.map(({ n, label }, i) => (
                <div key={n} className="flex items-center">
                  <button
                    onClick={() => { if (n < step) setStep(n) }}
                    className={`flex items-center gap-2 transition-all ${n < step ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-[var(--font-cinzel)] text-[9px] border transition-all ${
                      step === n ? 'bg-gold border-gold text-champagne' :
                      step > n ? 'bg-gold/20 border-gold/50 text-gold' :
                      'border-burgundy/20 text-burgundy/30'
                    }`}>{n}</span>
                    <span className={`font-[var(--font-cinzel)] text-[9px] tracking-[0.2em] uppercase hidden sm:block transition-all ${
                      step === n ? 'text-burgundy' : step > n ? 'text-gold/70' : 'text-burgundy/25'
                    }`}>{label}</span>
                  </button>
                  {i < 3 && <div className={`w-6 md:w-10 h-px mx-2 transition-all ${step > n ? 'bg-gold/50' : 'bg-burgundy/15'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Type */}
            {step === 1 && (
              <div>
                <p className="font-[var(--font-jost)] font-light text-[13px] text-burgundy/60 mb-6">{tx.chooseType}</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-[480px]">
                  {TYPES.map(({ key, icon }) => {
                    const selected = type === key
                    return (
                      <button
                        key={key}
                        onClick={() => { setType(key); setStep(2) }}
                        className={`relative flex-1 flex items-center gap-4 px-6 py-5 text-left border transition-all duration-200 active:scale-[0.98] overflow-hidden group ${
                          selected
                            ? 'bg-burgundy border-burgundy text-champagne shadow-md'
                            : 'bg-white border-burgundy/15 text-burgundy hover:border-gold hover:shadow-sm'
                        }`}
                      >
                        {/* Hover fill */}
                        {!selected && <span className="absolute inset-0 bg-gold/8 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
                        <span className="text-xl flex-shrink-0 relative">{icon}</span>
                        <span className="relative">
                          <span className={`font-[var(--font-cinzel)] text-[11px] tracking-[0.25em] uppercase block mb-0.5 ${selected ? 'text-champagne' : 'text-burgundy'}`}>
                            {tx.types[key]}
                          </span>
                          <span className={`font-[var(--font-jost)] font-light text-[11px] ${selected ? 'text-champagne/70' : 'text-burgundy/45'}`}>
                            {tx.typeDesc[key]}
                          </span>
                        </span>
                        {selected && (
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
              <div>
                <p className="font-[var(--font-jost)] font-light text-[13px] text-burgundy/60 mb-6">{tx.chooseDate}</p>
                <Calendar selected={date} onSelect={(d) => { setDate(d); setSlot(null); setStep(3) }} />
              </div>
            )}

            {/* Step 3: Time slot */}
            {step === 3 && (
              <div>
                <p className="font-[var(--font-jost)] font-light text-[13px] text-burgundy/60 mb-2">{formatDate(date)}</p>
                <p className="font-[var(--font-jost)] font-light text-[12px] text-burgundy/40 mb-6">{tx.chooseSlot}</p>
                <div className="grid grid-cols-3 gap-2.5 max-w-[360px]">
                  {TIME_SLOTS.map((s) => {
                    const isSelected = slot?.start === s.start
                    return (
                      <button
                        key={s.start}
                        onClick={() => { setSlot(s); setStep(4) }}
                        className={`relative py-3.5 font-[var(--font-cinzel)] text-[10px] tracking-[0.2em] transition-all duration-150 active:scale-[0.96] overflow-hidden group ${
                          isSelected
                            ? 'bg-gold text-champagne shadow-sm'
                            : 'bg-white border border-burgundy/15 text-burgundy hover:border-gold hover:shadow-sm'
                        }`}
                      >
                        {!isSelected && <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-10 transition-opacity duration-150" />}
                        <span className="relative">{s.start}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {step === 4 && (
              <div className="max-w-[480px]">
                <p className="font-[var(--font-jost)] font-light text-[13px] text-burgundy/60 mb-6">{tx.fillDetails}</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input name="name" value={form.name} onChange={handleFormChange} required
                      placeholder={tx.namePlaceholder}
                      className="w-full bg-transparent border-b border-burgundy/20 px-0 py-3 font-[var(--font-jost)] font-light text-[13px] text-burgundy placeholder:text-burgundy/35 focus:outline-none focus:border-gold transition-colors duration-200" />
                    <input name="email" type="email" value={form.email} onChange={handleFormChange} required
                      placeholder={tx.emailPlaceholder}
                      className="w-full bg-transparent border-b border-burgundy/20 px-0 py-3 font-[var(--font-jost)] font-light text-[13px] text-burgundy placeholder:text-burgundy/35 focus:outline-none focus:border-gold transition-colors duration-200" />
                  </div>
                  <input name="phone" value={form.phone} onChange={handleFormChange}
                    placeholder={tx.phonePlaceholder}
                    className="w-full bg-transparent border-b border-burgundy/20 px-0 py-3 font-[var(--font-jost)] font-light text-[13px] text-burgundy placeholder:text-burgundy/35 focus:outline-none focus:border-gold transition-colors duration-200" />
                  <textarea name="notes" value={form.notes} onChange={handleFormChange} rows={3}
                    placeholder={tx.notesPlaceholder}
                    className="w-full bg-transparent border-b border-burgundy/20 px-0 py-3 font-[var(--font-jost)] font-light text-[13px] text-burgundy placeholder:text-burgundy/35 focus:outline-none focus:border-gold transition-colors duration-200 resize-none" />

                  {status === 'error' && (
                    <p className="font-[var(--font-jost)] text-[11px] text-red-700">{tx.error}</p>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    className="btn-shimmer inline-flex items-center gap-4 font-[var(--font-cinzel)] text-[11px] tracking-[0.4em] text-champagne uppercase bg-burgundy px-8 py-3.5 transition-all duration-300 hover:bg-burgundy/80 active:scale-[0.97] disabled:opacity-50 mt-2">
                    {status === 'sending' ? tx.sending : tx.submit}
                    {status !== 'sending' && (
                      <span className="relative w-[20px] h-px bg-current after:content-[''] after:absolute after:right-0 after:top-[-3px] after:w-[5px] after:h-[5px] after:border-r after:border-t after:border-current after:rotate-45" />
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* ── Right: summary card ── */}
          <div className="hidden lg:block">
            <div className="border border-gold/25 px-7 py-8 sticky top-24">
              <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.5em] text-gold uppercase mb-6">{tx.summary}</p>
              <div className="space-y-5">
                <SummaryRow icon="◈" label={tx.summaryType} value={type ? tx.types[type] : '—'} active={!!type} />
                <SummaryRow icon="◈" label={tx.summaryDate} value={date ? formatDate(date) : '—'} active={!!date} />
                <SummaryRow icon="◈" label={tx.summaryTime} value={slot ? `${slot.start} – ${slot.end}` : '—'} active={!!slot} />
                <SummaryRow icon="◈" label={tx.summaryName} value={form.name || '—'} active={!!form.name} />
              </div>
              {type && date && slot && (
                <div className="mt-8 pt-6 border-t border-gold/20">
                  <p className="font-[var(--font-jost)] font-light text-[11px] text-burgundy/50 leading-[1.8]">{tx.summaryNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function SummaryRow({ label, value, active }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-burgundy/35 uppercase">{label}</span>
      <span className={`font-[var(--font-jost)] font-light text-[13px] transition-all ${active ? 'text-burgundy' : 'text-burgundy/25'}`}>{value}</span>
    </div>
  )
}
