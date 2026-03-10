'use client'

import { useState, useEffect } from 'react'
import { Check, X, Trash2, Clock, CalendarDays, User, Mail, Phone, List, ChevronLeft, ChevronRight } from 'lucide-react'

const STATUS = {
  pending:   { bg: 'bg-amber-400',   text: 'text-amber-700',   soft: 'bg-amber-50 border-amber-200 text-amber-700',   label: 'Pending'   },
  confirmed: { bg: 'bg-emerald-500', text: 'text-emerald-700', soft: 'bg-emerald-50 border-emerald-200 text-emerald-700', label: 'Confirmed' },
  cancelled: { bg: 'bg-red-400',     text: 'text-red-600',     soft: 'bg-red-50 border-red-200 text-red-600',          label: 'Cancelled' },
}

const TYPE_LABELS = { lesson: 'Riding Lesson', course: 'Theory Course' }
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('calendar') // 'calendar' | 'list'
  const [calDate, setCalDate] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() } })
  const [selected, setSelected] = useState(null)   // booking object in detail panel
  const [listFilter, setListFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { fetchBookings() }, [])

  async function fetchBookings() {
    setLoading(true)
    const res = await fetch('/api/admin/bookings')
    setBookings(await res.json())
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b))
    setSelected(s => s?.id === id ? { ...s, status } : s)
  }

  async function deleteBooking(id) {
    if (!confirm('Delete this booking?')) return
    await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
    setBookings(bs => bs.filter(b => b.id !== id))
    setSelected(s => s?.id === id ? null : s)
  }

  const pendingCount = bookings.filter(b => b.status === 'pending').length

  const fmtDate = (d) => {
    const [y, m, day] = d.split('-')
    return new Date(y, m - 1, day).toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  }

  // ── Calendar helpers ──────────────────────────────────────────
  const firstOfMonth = new Date(calDate.y, calDate.m, 1)
  const daysInMonth  = new Date(calDate.y, calDate.m + 1, 0).getDate()
  const startOffset  = (firstOfMonth.getDay() + 6) % 7   // Mon = 0
  const monthName    = firstOfMonth.toLocaleString('en', { month: 'long', year: 'numeric' })
  const today        = new Date(); today.setHours(0,0,0,0)

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  // pad to full rows
  while (cells.length % 7 !== 0) cells.push(null)

  function bookingsForDay(day) {
    if (!day) return []
    const dateStr = `${calDate.y}-${String(calDate.m + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    return bookings.filter(b => b.date === dateStr)
  }

  function prevMonth() {
    setCalDate(v => v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 })
  }
  function nextMonth() {
    setCalDate(v => v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 })
  }

  const isToday = (day) => {
    if (!day) return false
    const d = new Date(calDate.y, calDate.m, day)
    return d.getTime() === today.getTime()
  }

  // ── Filtered list ─────────────────────────────────────────────
  const filteredList = listFilter === 'all' ? bookings : bookings.filter(b => b.status === listFilter)

  return (
    <div className="p-6 md:p-8 h-full">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-[var(--font-cinzel)] text-[18px] tracking-[0.15em] text-[#3a1520] uppercase">Bookings</h1>
            {pendingCount > 0 && (
              <span className="bg-amber-400 text-white font-[var(--font-jost)] text-[10px] font-medium px-2 py-0.5 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </div>
          <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520]/40">Lesson and course reservations</p>
        </div>

        {/* View toggle */}
        <div className="flex items-center border border-[#b8946a]/20 rounded overflow-hidden">
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-1.5 px-3 py-2 font-[var(--font-jost)] text-[11px] transition-all ${
              view === 'calendar' ? 'bg-[#3a1520] text-[#f7f2e8]' : 'text-[#3a1520]/40 hover:text-[#3a1520]/70'
            }`}
          >
            <CalendarDays size={13} strokeWidth={1.5} /> Calendar
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-1.5 px-3 py-2 font-[var(--font-jost)] text-[11px] border-l border-[#b8946a]/20 transition-all ${
              view === 'list' ? 'bg-[#3a1520] text-[#f7f2e8]' : 'text-[#3a1520]/40 hover:text-[#3a1520]/70'
            }`}
          >
            <List size={13} strokeWidth={1.5} /> List
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-[var(--font-jost)] text-[12px] text-[#3a1520]/30">Loading…</div>
      ) : view === 'calendar' ? (

        /* ══════════ CALENDAR VIEW ══════════ */
        <div className="flex gap-5 items-start">
          <div className="flex-1 min-w-0 bg-white border border-[#b8946a]/15 rounded-lg overflow-hidden">

            {/* Month nav */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#b8946a]/10">
              <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f7f2e8] text-[#3a1520]/40 hover:text-[#3a1520] transition-colors">
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <span className="font-[var(--font-cinzel)] text-[13px] tracking-[0.2em] text-[#3a1520] uppercase">{monthName}</span>
              <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f7f2e8] text-[#3a1520]/40 hover:text-[#3a1520] transition-colors">
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-[#b8946a]/8">
              {DAYS.map(d => (
                <div key={d} className="py-2.5 text-center font-[var(--font-cinzel)] text-[9px] tracking-[0.2em] text-[#3a1520]/30 uppercase">{d}</div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 divide-x divide-y divide-[#b8946a]/8" style={{ gridAutoRows: 'minmax(90px, auto)' }}>
              {cells.map((day, i) => {
                const dayBookings = bookingsForDay(day)
                const isT = isToday(day)
                return (
                  <div key={i} className={`p-1.5 min-h-[90px] ${!day ? 'bg-[#f7f2e8]/40' : 'bg-white hover:bg-[#f7f2e8]/30'} transition-colors`}>
                    {day && (
                      <>
                        <span className={`inline-flex items-center justify-center w-6 h-6 font-[var(--font-jost)] text-[11px] mb-1 ${
                          isT ? 'bg-[#b8946a] text-white rounded-full' : 'text-[#3a1520]/50'
                        }`}>{day}</span>
                        <div className="space-y-0.5">
                          {dayBookings.map(b => (
                            <button
                              key={b.id}
                              onClick={() => setSelected(b)}
                              className={`w-full text-left px-1.5 py-1 rounded text-[9px] font-[var(--font-jost)] truncate transition-all hover:opacity-80 active:scale-[0.98] border ${
                                b.status === 'confirmed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                                b.status === 'cancelled' ? 'bg-red-50 border-red-200 text-red-500' :
                                'bg-amber-50 border-amber-200 text-amber-700'
                              } ${selected?.id === b.id ? 'ring-1 ring-[#b8946a]' : ''}`}
                            >
                              <span className="font-medium">{b.startTime}</span> {b.name}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 px-5 py-3 border-t border-[#b8946a]/8">
              {Object.entries(STATUS).map(([key, s]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${s.bg}`} />
                  <span className="font-[var(--font-jost)] text-[10px] text-[#3a1520]/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Detail panel ── */}
          <div className={`w-[280px] flex-shrink-0 bg-white border border-[#b8946a]/15 rounded-lg overflow-hidden transition-all duration-200 ${
            selected ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            {selected && (
              <>
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#b8946a]/10 bg-[#f7f2e8]/50">
                  <div>
                    <span className={`inline-flex items-center font-[var(--font-cinzel)] text-[8px] tracking-[0.25em] uppercase px-2 py-0.5 border rounded-sm ${STATUS[selected.status]?.soft}`}>
                      {STATUS[selected.status]?.label}
                    </span>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-6 h-6 flex items-center justify-center text-[#3a1520]/30 hover:text-[#3a1520] transition-colors rounded hover:bg-[#f7f2e8]">
                    <X size={13} strokeWidth={2} />
                  </button>
                </div>

                <div className="px-4 py-4 space-y-4">
                  {/* Type */}
                  <div>
                    <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-[#b8946a]/60 uppercase mb-0.5">Type</p>
                    <p className="font-[var(--font-jost)] text-[13px] text-[#3a1520]">{TYPE_LABELS[selected.type] || selected.type}</p>
                  </div>

                  {/* Date & time */}
                  <div>
                    <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-[#b8946a]/60 uppercase mb-0.5">Date & Time</p>
                    <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520]/80">{fmtDate(selected.date)}</p>
                    <p className="font-[var(--font-jost)] text-[12px] text-[#b8946a] mt-0.5">{selected.startTime} – {selected.endTime}</p>
                  </div>

                  {/* Name */}
                  <div>
                    <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-[#b8946a]/60 uppercase mb-0.5">Name</p>
                    <p className="font-[var(--font-jost)] text-[13px] text-[#3a1520]">{selected.name}</p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-[#b8946a]/60 uppercase mb-0.5">Email</p>
                    <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520]/70 break-all">{selected.email}</p>
                  </div>

                  {/* Phone */}
                  {selected.phone && (
                    <div>
                      <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-[#b8946a]/60 uppercase mb-0.5">Phone</p>
                      <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520]/70">{selected.phone}</p>
                    </div>
                  )}

                  {/* Notes */}
                  {selected.notes && (
                    <div>
                      <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-[#b8946a]/60 uppercase mb-0.5">Notes</p>
                      <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520]/60 leading-[1.6]">{selected.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#b8946a]/10 space-y-2">
                    {selected.status === 'pending' && (
                      <button onClick={() => updateStatus(selected.id, 'confirmed')}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] uppercase transition-colors rounded">
                        <Check size={12} strokeWidth={2} /> Confirm
                      </button>
                    )}
                    {selected.status !== 'cancelled' && (
                      <button onClick={() => updateStatus(selected.id, 'cancelled')}
                        className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 hover:bg-red-50 text-red-500 font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] uppercase transition-colors rounded">
                        <X size={12} strokeWidth={2} /> Cancel
                      </button>
                    )}
                    {selected.status === 'cancelled' && (
                      <button onClick={() => updateStatus(selected.id, 'confirmed')}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] uppercase transition-colors rounded">
                        <Check size={12} strokeWidth={2} /> Re-confirm
                      </button>
                    )}
                    <button onClick={() => deleteBooking(selected.id)}
                      className="w-full flex items-center justify-center gap-2 py-2 text-[#3a1520]/25 hover:text-red-400 font-[var(--font-jost)] text-[11px] transition-colors">
                      <Trash2 size={11} strokeWidth={1.5} /> Delete booking
                    </button>
                  </div>
                </div>
              </>
            )}
            {!selected && (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <CalendarDays size={28} strokeWidth={1} className="text-[#b8946a]/20 mb-3" />
                <p className="font-[var(--font-jost)] text-[11px] text-[#3a1520]/25">Click a booking to view details</p>
              </div>
            )}
          </div>
        </div>

      ) : (

        /* ══════════ LIST VIEW ══════════ */
        <>
          <div className="flex gap-1 mb-5 border-b border-[#b8946a]/15">
            {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
              <button key={f} onClick={() => setListFilter(f)}
                className={`font-[var(--font-cinzel)] text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 border-b-2 transition-all -mb-px capitalize ${
                  listFilter === f ? 'border-[#b8946a] text-[#b8946a]' : 'border-transparent text-[#3a1520]/35 hover:text-[#3a1520]/70'
                }`}>
                {f}
                {f === 'pending' && pendingCount > 0 && (
                  <span className="ml-1.5 bg-amber-400 text-white text-[8px] px-1.5 py-0.5 rounded-full font-[var(--font-jost)]">{pendingCount}</span>
                )}
              </button>
            ))}
          </div>

          {filteredList.length === 0 ? (
            <div className="py-20 text-center">
              <CalendarDays size={32} strokeWidth={1} className="mx-auto mb-3 text-[#b8946a]/30" />
              <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520]/30">No bookings found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredList.map(b => {
                const s = STATUS[b.status] || STATUS.pending
                const isOpen = expanded === b.id
                return (
                  <div key={b.id} className="bg-white border border-[#b8946a]/10 rounded overflow-hidden">
                    <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#f7f2e8]/60 transition-colors"
                      onClick={() => setExpanded(isOpen ? null : b.id)}>
                      <span className={`flex-shrink-0 font-[var(--font-cinzel)] text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 border rounded-sm ${s.soft}`}>
                        {s.label}
                      </span>
                      <span className="flex-shrink-0 font-[var(--font-cinzel)] text-[9px] tracking-[0.2em] text-[#b8946a] uppercase w-28 hidden sm:block">
                        {TYPE_LABELS[b.type] || b.type}
                      </span>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <User size={12} strokeWidth={1.5} className="text-[#b8946a]/50 flex-shrink-0" />
                        <span className="font-[var(--font-jost)] text-[13px] text-[#3a1520] truncate">{b.name}</span>
                      </div>
                      <div className="hidden md:flex items-center gap-3 text-[#3a1520]/50">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays size={11} strokeWidth={1.5} />
                          <span className="font-[var(--font-jost)] text-[11px]">{fmtDate(b.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} strokeWidth={1.5} />
                          <span className="font-[var(--font-jost)] text-[11px]">{b.startTime} – {b.endTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0" onClick={e => e.stopPropagation()}>
                        {b.status !== 'confirmed' && (
                          <button onClick={() => updateStatus(b.id, 'confirmed')} title="Confirm"
                            className="w-7 h-7 flex items-center justify-center rounded hover:bg-emerald-50 text-[#3a1520]/30 hover:text-emerald-600 transition-colors">
                            <Check size={14} strokeWidth={2} />
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button onClick={() => updateStatus(b.id, 'cancelled')} title="Cancel"
                            className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 text-[#3a1520]/30 hover:text-red-500 transition-colors">
                            <X size={14} strokeWidth={2} />
                          </button>
                        )}
                        <button onClick={() => deleteBooking(b.id)} title="Delete"
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 text-[#3a1520]/20 hover:text-red-400 transition-colors">
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        className={`text-[#3a1520]/25 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-[#b8946a]/8 bg-[#f7f2e8]/30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Detail icon={<Mail size={12} strokeWidth={1.5} />} label="Email" value={b.email} />
                        <Detail icon={<Phone size={12} strokeWidth={1.5} />} label="Phone" value={b.phone || '—'} />
                        <Detail icon={<CalendarDays size={12} strokeWidth={1.5} />} label="Booked on"
                          value={b.createdAt ? new Date(b.createdAt).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'} />
                        {b.notes && (
                          <div className="col-span-full">
                            <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] text-[#b8946a]/60 uppercase mb-1">Notes</p>
                            <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520]/60 leading-[1.7]">{b.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function Detail({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-0.5 text-[#b8946a]/60">{icon}
        <span className="font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] uppercase">{label}</span>
      </div>
      <p className="font-[var(--font-jost)] text-[13px] text-[#3a1520]/70">{value}</p>
    </div>
  )
}
