'use client'

import { useLang } from './LanguageProvider'

const LANGS = ['EN', 'FR', 'LB']

/**
 * Reusable language toggle.
 * Props:
 *   theme  'light' | 'dark'  — 'light' for cream backgrounds, 'dark' for ink backgrounds
 *   size   'sm' | 'md'       — text size
 */
export default function LanguageToggle({ theme = 'light', size = 'sm' }) {
  const { lang, setLang } = useLang()

  const active   = theme === 'dark' ? 'bg-cream text-ink' : 'bg-ink text-cream'
  const inactive = theme === 'dark' ? 'text-cream/50 hover:text-cream' : 'text-ink/50 hover:text-ink'
  const textSize = size === 'md' ? 'text-[12px]' : 'text-[11px]'

  return (
    <div className="flex items-center gap-1">
      {LANGS.map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`font-sans font-medium ${textSize} tracking-[0.12em] uppercase px-2 py-1 rounded-full cursor-pointer transition-colors duration-200 ${lang === l ? active : inactive}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
