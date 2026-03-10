/**
 * Reusable section header — label strip + h2 + italic subtitle.
 * Props:
 *   label    {string}  — small all-caps gold label
 *   title    {string}  — main heading (optional — renders label only if omitted)
 *   subtitle {string}  — italic cormorant subtitle (optional)
 *   mb       {string}  — bottom margin class on h2 (default 'mb-7')
 *   light    {bool}    — champagne text variant for dark backgrounds
 */
export default function SectionHeader({ label, title, subtitle, mb = 'mb-7', light = false }) {
  const textColor = light ? 'text-champagne' : 'text-burgundy'

  return (
    <>
      <div className="flex items-center gap-3.5 font-[var(--font-cinzel)] text-[11px] tracking-[0.5em] text-gold uppercase mb-5 before:content-[''] before:w-[30px] before:h-px before:bg-gold">
        {label}
      </div>
      {title && (
        <h2
          className={`font-[var(--font-cinzel)] font-semibold ${textColor} uppercase tracking-[0.1em] leading-[1.15] ${mb}`}
          style={{ fontSize: 'clamp(28px, 3.4vw, 46px)' }}
        >
          {title}
          {subtitle && (
            <em className={`block font-[var(--font-cormorant)] italic font-light text-[1.2em] ${textColor} tracking-[0.06em]`}>
              {subtitle}
            </em>
          )}
        </h2>
      )}
    </>
  )
}
