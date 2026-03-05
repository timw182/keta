'use client'
import { useEffect, useState } from 'react'
import { Users, FileText, TrendingUp, AlertCircle } from 'lucide-react'

const statusColors = {
  paid:    'bg-emerald-100 text-emerald-700',
  unpaid:  'bg-amber-100 text-amber-700',
  overdue: 'bg-red-100 text-red-700',
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white border border-[#6b1428]/10 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 flex items-center justify-center ${color}`}>
          <Icon size={18} strokeWidth={1.5} />
        </div>
      </div>
      <p className="font-[var(--font-cormorant)] text-3xl font-light text-[#3a1520] mb-1">{value}</p>
      <p className="font-[var(--font-cinzel)] text-[9px] tracking-[0.3em] text-[#6b1428]/50 uppercase">{label}</p>
      {sub && <p className="font-[var(--font-jost)] text-[11px] text-[#6b1428]/40 mt-1">{sub}</p>}
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setData)
  }, [])

  if (!data) return (
    <div className="flex items-center justify-center h-64">
      <p className="font-[var(--font-jost)] text-[#6b1428]/40 text-sm tracking-widest uppercase">Loading…</p>
    </div>
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[#6b1428]/10">
        <p className="font-[var(--font-cinzel)] text-[10px] tracking-[0.4em] text-[#b8946a] uppercase mb-1">Overview</p>
        <h1 className="font-[var(--font-cinzel)] text-2xl font-semibold text-[#3a1520] tracking-wide">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={Users}
          label="Total Clients"
          value={data.clientCount}
          color="bg-[#6b1428]/10 text-[#6b1428]"
        />
        <StatCard
          icon={FileText}
          label="Total Invoices"
          value={data.invoiceCount}
          color="bg-[#b8946a]/15 text-[#b8946a]"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue Collected"
          value={`€${Number(data.totalRevenue).toFixed(2)}`}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          icon={AlertCircle}
          label="Outstanding"
          value={`€${Number(data.outstanding).toFixed(2)}`}
          sub={data.overdueCount > 0 ? `${data.overdueCount} overdue` : null}
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white border border-[#6b1428]/10">
          <div className="px-5 py-4 border-b border-[#6b1428]/10 flex items-center justify-between">
            <h2 className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-[#6b1428] uppercase">Recent Clients</h2>
            <a href="/admin/clients" className="font-[var(--font-jost)] text-[11px] text-[#b8946a] hover:underline">View all</a>
          </div>
          <div className="divide-y divide-[#6b1428]/5">
            {data.recentClients.length === 0 && (
              <p className="px-5 py-6 font-[var(--font-jost)] text-[12px] text-[#6b1428]/30 text-center">No clients yet</p>
            )}
            {data.recentClients.map(c => (
              <div key={c.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-[var(--font-jost)] text-[13px] text-[#3a1520]">{c.name}</p>
                  <p className="font-[var(--font-jost)] text-[11px] text-[#6b1428]/40">{c.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white border border-[#6b1428]/10">
          <div className="px-5 py-4 border-b border-[#6b1428]/10 flex items-center justify-between">
            <h2 className="font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] text-[#6b1428] uppercase">Recent Invoices</h2>
            <a href="/admin/invoices" className="font-[var(--font-jost)] text-[11px] text-[#b8946a] hover:underline">View all</a>
          </div>
          <div className="divide-y divide-[#6b1428]/5">
            {data.recentInvoices.length === 0 && (
              <p className="px-5 py-6 font-[var(--font-jost)] text-[12px] text-[#6b1428]/30 text-center">No invoices yet</p>
            )}
            {data.recentInvoices.map(inv => (
              <div key={inv.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-[var(--font-jost)] text-[13px] text-[#3a1520]">{inv.number}</p>
                  <p className="font-[var(--font-jost)] text-[11px] text-[#6b1428]/40">Due {inv.dueAt?.slice(0,10)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-[var(--font-jost)] text-[13px] text-[#3a1520]">€{Number(inv.amount).toFixed(2)}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-[var(--font-jost)] rounded-sm capitalize ${statusColors[inv.status]}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
