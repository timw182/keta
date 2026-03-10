'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, Users, FileText, CalendarDays, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/clients',  label: 'Clients',   icon: Users },
  { href: '/admin/invoices', label: 'Invoices',  icon: FileText },
  { href: '/admin/bookings', label: 'Bookings',  icon: CalendarDays },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 min-h-screen bg-[#3a1520] flex flex-col fixed left-0 top-0 z-40 border-r border-white/5">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image src="/images/kt_logo.png" alt="KT" width={30} height={30} className="brightness-0 invert opacity-90" />
          <div>
            <p className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-[#f7f2e8] uppercase">KT Equestrian</p>
            <p className="font-[var(--font-jost)] text-[9px] tracking-widest text-[#f7f2e8]/30 uppercase mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-[13px] font-[var(--font-jost)] font-light transition-all ${
                active
                  ? 'bg-[#b8946a]/20 text-[#b8946a] border-l-2 border-[#b8946a] pl-[10px]'
                  : 'text-[#f7f2e8]/50 hover:text-[#f7f2e8] hover:bg-white/5'
              }`}
            >
              <Icon size={15} strokeWidth={1.5} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-5 border-t border-white/10 pt-4">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded text-[13px] font-[var(--font-jost)] font-light text-[#f7f2e8]/40 hover:text-red-400 hover:bg-white/5 transition-all"
        >
          <LogOut size={15} strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
