'use client'
import { useEffect, useState } from 'react'
import { UserPlus, Search, Pencil, Trash2, X } from 'lucide-react'

const empty = { name: '', email: '', phone: '' }

export default function ClientsPage() {
  const [clients, setClients] = useState([])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)   // null | 'add' | client object (edit)
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    const data = await fetch('/api/admin/clients').then(r => r.json())
    setClients(data)
  }

  useEffect(() => { load() }, [])

  function openAdd() { setForm(empty); setModal('add') }
  function openEdit(c) { setForm({ name: c.name, email: c.email, phone: c.phone || '' }); setModal(c) }
  function closeModal() { setModal(null) }

  async function handleSave() {
    setLoading(true)
    if (modal === 'add') {
      await fetch('/api/admin/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch(`/api/admin/clients/${modal.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setLoading(false)
    closeModal()
    load()
  }

  async function handleDelete(id) {
    await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' })
    setDeleteId(null)
    load()
  }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#6b1428]/10 flex items-center justify-between">
        <div>
          <p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-[#b8946a] uppercase mb-1">Database</p>
          <h1 className="font-[var(--font-cinzel)] text-2xl font-semibold text-[#3a1520] tracking-wide">Clients</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#6b1428] text-[#f7f2e8] font-[var(--font-cinzel)] text-[10px] tracking-[0.25em] uppercase px-4 py-2.5 hover:bg-[#8b1a32] transition-colors"
        >
          <UserPlus size={14} strokeWidth={1.5} />
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b1428]/30" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search clients…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-[#6b1428]/15 pl-9 pr-4 py-2.5 text-[13px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#6b1428]/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#6b1428]/10 bg-[#f7f2e8]">
              {['Name', 'Email', 'Phone', 'Invoices', 'Total Spent', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[#6b1428]/50 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#6b1428]/5">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center font-[var(--font-jost)] text-[12px] text-[#6b1428]/30">
                  {search ? 'No clients match your search.' : 'No clients yet. Add your first client.'}
                </td>
              </tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-[#f7f2e8]/50 transition-colors">
                <td className="px-5 py-3.5 font-[var(--font-jost)] text-[13px] text-[#3a1520] font-medium">{c.name}</td>
                <td className="px-5 py-3.5 font-[var(--font-jost)] text-[12px] text-[#6b1428]/60">{c.email}</td>
                <td className="px-5 py-3.5 font-[var(--font-jost)] text-[12px] text-[#6b1428]/60">{c.phone || '—'}</td>
                <td className="px-5 py-3.5 font-[var(--font-jost)] text-[13px] text-[#3a1520]">{c.invoiceCount}</td>
                <td className="px-5 py-3.5 font-[var(--font-jost)] text-[13px] text-[#3a1520]">€{Number(c.totalAmount).toFixed(2)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(c)} className="p-1.5 text-[#6b1428]/40 hover:text-[#b8946a] transition-colors rounded">
                      <Pencil size={13} strokeWidth={1.5} />
                    </button>
                    <button onClick={() => setDeleteId(c.id)} className="p-1.5 text-[#6b1428]/40 hover:text-red-500 transition-colors rounded">
                      <Trash2 size={13} strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f7f2e8] w-full max-w-md p-8 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-[#6b1428]/40 hover:text-[#6b1428]">
              <X size={16} strokeWidth={1.5} />
            </button>
            <h2 className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-[#6b1428] uppercase mb-6">
              {modal === 'add' ? 'Add Client' : 'Edit Client'}
            </h2>
            <div className="space-y-4">
              {[['Name', 'name', 'text', true], ['Email', 'email', 'email', true], ['Phone', 'phone', 'tel', false]].map(([label, key, type, required]) => (
                <div key={key}>
                  <label className="block font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-[#6b1428]/60 uppercase mb-1.5">{label}</label>
                  <input
                    type={type}
                    required={required}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-white border border-[#6b1428]/20 px-3 py-2.5 text-[13px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
                  />
                </div>
              ))}
              <button
                onClick={handleSave}
                disabled={loading || !form.name || !form.email}
                className="w-full bg-[#6b1428] text-[#f7f2e8] font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] uppercase py-3 mt-2 hover:bg-[#8b1a32] transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving…' : 'Save Client'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f7f2e8] w-full max-w-sm p-8">
            <h2 className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-[#6b1428] uppercase mb-3">Delete Client</h2>
            <p className="font-[var(--font-jost)] text-[13px] text-[#6b1428]/70 mb-6">This will also delete all their invoices. Are you sure?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-[#6b1428]/20 text-[#6b1428] font-[var(--font-cinzel)] text-[10px] tracking-[0.25em] uppercase py-2.5 hover:bg-[#6b1428]/5 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white font-[var(--font-cinzel)] text-[10px] tracking-[0.25em] uppercase py-2.5 hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
