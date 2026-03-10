'use client'

import { useLang } from './LanguageProvider'
import LanguageToggle from './LanguageToggle'
import { t } from '../../lib/translations'

export default function AboutBio() {
  const { lang } = useLang()
  const bio = t[lang].about.bio

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <LanguageToggle theme="light" size="sm" />
        <span className="w-px h-3 bg-gold/30" />
        <span className="font-[var(--font-jost)] text-[10px] tracking-[0.15em] text-burgundy/30 uppercase">language</span>
      </div>
      <p
        key={lang}
        className="font-[var(--font-jost)] font-light text-[15px] leading-[1.9] text-burgundy/70 max-w-[400px] animate-fade-in"
      >
        {bio}
      </p>
    </div>
  )
}
