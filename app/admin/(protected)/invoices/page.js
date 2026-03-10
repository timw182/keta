'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilePlus, Folder, FolderOpen, User, Pencil, Trash2, CheckCircle, X } from 'lucide-react'
import { Suspense } from 'react'

const statusColors = {
  paid:    'bg-emerald-100 text-emerald-700',
  unpaid:  'bg-amber-100 text-amber-700',
  overdue: 'bg-red-100 text-red-700',
}

const folders = [
  { key: null,      label: 'All Invoices',  icon: Folder },
  { key: 'unpaid',  label: 'Unpaid',        icon: Folder },
  { key: 'paid',    label: 'Paid',          icon: Folder },
  { key: 'overdue', label: 'Overdue',       icon: Folder },
]

function InvoicesInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeStatus = searchParams.get('status')
  const activeClient = searchParams.get('clientId') ? Number(searchParams.get('clientId')) : null

  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [editInvoice, setEditInvoice] = useState(null)
  const [editStatus, setEditStatus] = useState('')

  async function loadInvoices() {
    const params = new URLSearchParams()
    if (activeStatus) params.set('status', activeStatus)
    if (activeClient) params.set('clientId', activeClient)
    const data = await fetch(`/api/admin/invoices?${params}`).then(r => r.json())
    setInvoices(Array.isArray(data) ? data : [])
  }

  async function loadClients() {
    const data = await fetch('/api/admin/clients').then(r => r.json())
    setClients(Array.isArray(data) ? data : [])
  }

  useEffect(() => { loadInvoices(); loadClients() }, [activeStatus, activeClient])

  function setFolder(status, clientId) {
    const p = new URLSearchParams()
    if (status) p.set('status', status)
    if (clientId) p.set('clientId', clientId)
    router.push(`/admin/invoices?${p}`)
  }

  async function handleDelete(id) {
    await fetch(`/api/admin/invoices/${id}`, { method: 'DELETE' })
    setDeleteId(null)
    loadInvoices()
  }

  async function handleStatusUpdate() {
    await fetch(`/api/admin/invoices/${editInvoice.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: editStatus, dueAt: editInvoice.dueAt, amount: editInvoice.amount }),
    })
    setEditInvoice(null)
    loadInvoices()
  }

  const clientsWithInvoices = clients.filter(c => invoices.some(inv => inv.clientId === c.id) || !activeClient)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#6b1428]/10 flex items-center justify-between">
        <div>
          <p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-[#b8946a] uppercase mb-1">Finance</p>
          <h1 className="font-[var(--font-cinzel)] text-2xl font-semibold text-[#3a1520] tracking-wide">Invoices</h1>
        </div>
        <a
          href="/admin/invoices/new"
          className="flex items-center gap-2 bg-[#6b1428] text-[#f7f2e8] font-[var(--font-cinzel)] text-[10px] tracking-[0.25em] uppercase px-4 py-2.5 hover:bg-[#8b1a32] transition-colors"
        >
          <FilePlus size={14} strokeWidth={1.5} />
          New Invoice
        </a>
      </div>

      <div className="flex gap-6">
        {/* Folder Sidebar */}
        <aside className="w-52 shrink-0">
          <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.35em] text-[#6b1428]/30 uppercase mb-2 px-2">Folders</p>
          <div className="space-y-0.5 mb-5">
            {folders.map(({ key, label, icon: Icon }) => {
              const active = activeStatus === key && !activeClient
              const FIcon = active ? FolderOpen : Icon
              return (
                <button
                  key={label}
                  onClick={() => setFolder(key, null)}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded text-left text-[12px] font-[var(--font-jost)] transition-all ${
                    active ? 'bg-[#6b1428]/10 text-[#6b1428] font-medium' : 'text-[#6b1428]/60 hover:text-[#6b1428] hover:bg-[#6b1428]/5'
                  }`}
                >
                  <FIcon size={13} strokeWidth={1.5} className={active ? 'text-[#b8946a]' : ''} />
                  {label}
                </button>
              )
            })}
          </div>

          {clients.length > 0 && (
            <>
              <p className="font-[var(--font-cinzel)] text-[8px] tracking-[0.35em] text-[#6b1428]/30 uppercase mb-2 px-2">By Client</p>
              <div className="space-y-0.5">
                {clients.map(c => {
                  const active = activeClient === c.id
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFolder(null, c.id)}
                      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded text-left text-[12px] font-[var(--font-jost)] transition-all ${
                        active ? 'bg-[#6b1428]/10 text-[#6b1428] font-medium' : 'text-[#6b1428]/60 hover:text-[#6b1428] hover:bg-[#6b1428]/5'
                      }`}
                    >
                      <User size={12} strokeWidth={1.5} className={active ? 'text-[#b8946a]' : ''} />
                      <span className="truncate">{c.name}</span>
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </aside>

        {/* Invoice Table */}
        <div className="flex-1 bg-white border border-[#6b1428]/10 overflow-hidden self-start">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#6b1428]/10 bg-[#f7f2e8]">
                {['Invoice #', 'Client', 'Amount', 'Status', 'Issued', 'Due', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-[var(--font-cinzel)] text-[8px] tracking-[0.3em] text-[#6b1428]/50 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6b1428]/5">
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center font-[var(--font-jost)] text-[12px] text-[#6b1428]/30">
                    No invoices in this folder.
                  </td>
                </tr>
              )}
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-[#f7f2e8]/40 transition-colors">
                  <td className="px-4 py-3.5 font-[var(--font-jost)] text-[12px] text-[#3a1520] font-medium">{inv.number}</td>
                  <td className="px-4 py-3.5 font-[var(--font-jost)] text-[12px] text-[#6b1428]/70">{inv.clientName || '—'}</td>
                  <td className="px-4 py-3.5 font-[var(--font-jost)] text-[13px] text-[#3a1520]">€{Number(inv.amount).toFixed(2)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 text-[10px] font-[var(--font-jost)] rounded-sm capitalize ${statusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-[var(--font-jost)] text-[11px] text-[#6b1428]/50">{inv.issuedAt?.slice(0,10)}</td>
                  <td className="px-4 py-3.5 font-[var(--font-jost)] text-[11px] text-[#6b1428]/50">{inv.dueAt?.slice(0,10)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {inv.status !== 'paid' && (
                        <button
                          onClick={() => { setEditInvoice(inv); setEditStatus(inv.status) }}
                          className="p-1.5 text-[#6b1428]/40 hover:text-[#b8946a] transition-colors rounded"
                          title="Edit status"
                        >
                          <Pencil size={12} strokeWidth={1.5} />
                        </button>
                      )}
                      {inv.status === 'unpaid' && (
                        <button
                          onClick={async () => {
                            await fetch(`/api/admin/invoices/${inv.id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ status: 'paid', dueAt: inv.dueAt, amount: inv.amount }) })
                            loadInvoices()
                          }}
                          className="p-1.5 text-[#6b1428]/40 hover:text-emerald-600 transition-colors rounded"
                          title="Mark as paid"
                        >
                          <CheckCircle size={12} strokeWidth={1.5} />
                        </button>
                      )}
                      <button onClick={() => setDeleteId(inv.id)} className="p-1.5 text-[#6b1428]/40 hover:text-red-500 transition-colors rounded">
                        <Trash2 size={12} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {editInvoice && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f7f2e8] w-full max-w-sm p-8 relative">
            <button onClick={() => setEditInvoice(null)} className="absolute top-4 right-4 text-[#6b1428]/40 hover:text-[#6b1428]">
              <X size={16} strokeWidth={1.5} />
            </button>
            <h2 className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-[#6b1428] uppercase mb-1">Update Status</h2>
            <p className="font-[var(--font-jost)] text-[12px] text-[#6b1428]/50 mb-5">{editInvoice.number}</p>
            <div className="space-y-2 mb-6">
              {['unpaid', 'paid', 'overdue'].map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" value={s} checked={editStatus === s} onChange={() => setEditStatus(s)} className="accent-[#6b1428]" />
                  <span className={`px-2.5 py-1 text-[11px] font-[var(--font-jost)] rounded-sm capitalize ${statusColors[s]}`}>{s}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleStatusUpdate}
              className="w-full bg-[#6b1428] text-[#f7f2e8] font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] uppercase py-3 hover:bg-[#8b1a32] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f7f2e8] w-full max-w-sm p-8">
            <h2 className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-[#6b1428] uppercase mb-3">Delete Invoice</h2>
            <p className="font-[var(--font-jost)] text-[13px] text-[#6b1428]/70 mb-6">This action cannot be undone.</p>
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

export default function InvoicesPage() {
  return (
    <Suspense>
      <InvoicesInner />
    </Suspense>
  )
}
