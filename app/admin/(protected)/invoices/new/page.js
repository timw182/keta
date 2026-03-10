'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ArrowLeft } from 'lucide-react'

const emptyItem = () => ({ description: '', quantity: 1, unitPrice: 0 })

export default function NewInvoicePage() {
  const router = useRouter()
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState('')
  const [items, setItems] = useState([emptyItem()])
  const [dueAt, setDueAt] = useState('')
  const [status, setStatus] = useState('unpaid')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/clients').then(r => r.json()).then(setClients)
    // Default due date: 30 days from now
    const d = new Date()
    d.setDate(d.getDate() + 30)
    setDueAt(d.toISOString().slice(0, 10))
  }, [])

  function updateItem(i, key, value) {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [key]: value } : item))
  }
  function addItem() { setItems(prev => [...prev, emptyItem()]) }
  function removeItem(i) { setItems(prev => prev.filter((_, idx) => idx !== i)) }

  const total = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unitPrice)), 0)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!clientId) { setError('Please select a client.'); return }
    setLoading(true)
    const res = await fetch('/api/admin/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: Number(clientId),
        amount: total,
        status,
        dueAt: new Date(dueAt).toISOString(),
        items: items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          total: Number(item.quantity) * Number(item.unitPrice),
        })),
      }),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin/invoices')
    } else {
      setError('Failed to create invoice.')
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#6b1428]/10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 font-[var(--font-jost)] text-[11px] tracking-[0.2em] text-[#6b1428]/40 hover:text-[#6b1428] uppercase mb-4 transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          Back
        </button>
        <p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-[#b8946a] uppercase mb-1">Finance</p>
        <h1 className="font-[var(--font-cinzel)] text-2xl font-semibold text-[#3a1520] tracking-wide">New Invoice</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client + Due Date */}
        <div className="bg-white border border-[#6b1428]/10 p-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-[#6b1428]/60 uppercase mb-1.5">Client</label>
            <select
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              className="w-full bg-[#f7f2e8] border border-[#6b1428]/20 px-3 py-2.5 text-[13px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
            >
              <option value="">Select client…</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-[#6b1428]/60 uppercase mb-1.5">Due Date</label>
            <input
              type="date"
              value={dueAt}
              onChange={e => setDueAt(e.target.value)}
              required
              className="w-full bg-[#f7f2e8] border border-[#6b1428]/20 px-3 py-2.5 text-[13px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
            />
          </div>
          <div>
            <label className="block font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-[#6b1428]/60 uppercase mb-1.5">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full bg-[#f7f2e8] border border-[#6b1428]/20 px-3 py-2.5 text-[13px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-white border border-[#6b1428]/10 p-6">
          <h2 className="font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[#6b1428]/50 uppercase mb-4">Line Items</h2>
          <div className="space-y-3">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_80px_100px_80px_32px] gap-3 mb-1">
              {['Description', 'Qty', 'Unit Price', 'Total', ''].map(h => (
                <p key={h} className="font-[var(--font-cinzel)] text-[8px] tracking-[0.25em] text-[#6b1428]/30 uppercase">{h}</p>
              ))}
            </div>
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_100px_80px_32px] gap-3 items-center">
                <input
                  type="text"
                  placeholder="e.g. Riding lesson 1h"
                  value={item.description}
                  onChange={e => updateItem(i, 'description', e.target.value)}
                  className="bg-[#f7f2e8] border border-[#6b1428]/15 px-3 py-2 text-[12px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
                />
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => updateItem(i, 'quantity', e.target.value)}
                  className="bg-[#f7f2e8] border border-[#6b1428]/15 px-3 py-2 text-[12px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors text-center"
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={e => updateItem(i, 'unitPrice', e.target.value)}
                  className="bg-[#f7f2e8] border border-[#6b1428]/15 px-3 py-2 text-[12px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
                />
                <p className="font-[var(--font-jost)] text-[12px] text-[#3a1520] text-right">
                  €{(Number(item.quantity) * Number(item.unitPrice)).toFixed(2)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  disabled={items.length === 1}
                  className="text-[#6b1428]/30 hover:text-red-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <Trash2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-4 flex items-center gap-2 font-[var(--font-jost)] text-[11px] tracking-[0.15em] text-[#b8946a] hover:text-[#6b1428] transition-colors"
          >
            <Plus size={13} strokeWidth={1.5} />
            Add line item
          </button>

          {/* Total */}
          <div className="mt-5 pt-4 border-t border-[#6b1428]/10 flex justify-end">
            <div className="text-right">
              <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[#6b1428]/40 uppercase mb-1">Total</p>
              <p className="font-[var(--font-cormorant)] text-3xl font-light text-[#3a1520]">€{total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {error && <p className="text-red-600 font-[var(--font-jost)] text-[12px]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6b1428] text-[#f7f2e8] font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] uppercase py-3.5 hover:bg-[#8b1a32] transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Create Invoice'}
        </button>
      </form>
    </div>
  )
}
