'use client'

import { useLang } from './LanguageProvider'

const LANGS = ['EN', 'FR', 'LB']

/**
 * Reusable language toggle.
 * Props:
 *   theme  'light' | 'dark'  — 'light' for champagne bg, 'dark' for burgundy bg
 *   size   'sm' | 'md'       — text size
 */
export default function LanguageToggle({ theme = 'dark', size = 'sm' }) {
  const { lang, setLang } = useLang()

  const activeColor   = '#d4aa7d'
  const inactiveColor = theme === 'dark' ? 'rgba(247,242,232,0.30)' : 'rgba(107,20,40,0.35)'
  const activeBorder  = theme === 'dark' ? 'rgba(184,148,106,0.65)' : 'var(--color-gold)'
  const textSize      = size === 'md' ? 'text-[10px]' : 'text-[9px]'

  return (
    <div className="flex items-center gap-0.5">
      {LANGS.map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`font-[var(--font-cinzel)] ${textSize} tracking-[0.25em] uppercase px-2 py-1 cursor-pointer transition-colors duration-200`}
          style={{
            color: lang === l ? activeColor : inactiveColor,
            borderBottom: lang === l ? `1px solid ${activeBorder}` : '1px solid transparent',
          }}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
