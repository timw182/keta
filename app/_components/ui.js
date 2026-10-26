import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/* Small uppercase section label with a sun dot */
export function Eyebrow({ children, dark = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-sans font-medium text-[12px] tracking-[0.18em] uppercase ${dark ? 'text-cream/70' : 'text-ink/70'} ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-sun" aria-hidden="true" />
      {children}
    </span>
  )
}

/* Primary call-to-action: sun-yellow block with divider and arrow */
export function SunButton({ href, children, className = '', variant = 'sun', ...rest }) {
  const colors = {
    sun: 'bg-sun text-ink hover:bg-ink hover:text-cream',
    ink: 'bg-ink text-cream hover:bg-sun hover:text-ink',
  }[variant]

  const cls = `group inline-flex items-center justify-center gap-4 font-sans font-semibold text-[13px] tracking-[0.06em] uppercase pl-6 pr-5 py-4 transition-colors duration-300 active:scale-[0.98] disabled:opacity-40 cursor-pointer ${colors} ${className}`

  const inner = (
    <>
      {children}
      <span className="w-px h-4 bg-current opacity-40" aria-hidden="true" />
      <ArrowUpRight size={18} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </>
  )

  if (href) {
    const external = href.startsWith('#')
    return external
      ? <a href={href} className={cls} {...rest}>{inner}</a>
      : <Link href={href} className={cls} {...rest}>{inner}</Link>
  }
  return <button className={cls} {...rest}>{inner}</button>
}

/* Text link with underline and arrow, as in "Let's grab our offer ↗" */
export function ArrowLink({ href, children, dark = false, className = '' }) {
  const cls = `group inline-flex items-center gap-3 font-sans font-medium text-[15px] tracking-[0.04em] uppercase ${dark ? 'text-cream' : 'text-ink'} ${className}`
  const inner = (
    <>
      <span className="link-underline pb-1">{children}</span>
      <ArrowUpRight size={20} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </>
  )
  return href.startsWith('#')
    ? <a href={href} className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>
}
