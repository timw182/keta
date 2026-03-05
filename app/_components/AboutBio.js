'use client'

import { useState } from 'react'

const bio = {
  LB: 'Moien, ech sinn d\'Kelly — eng leidenschaftlech Reiderin, Trainerin a Paerdeliebhaberin mat iwwer 10 Joer Erfahrung am Reitsport. Ech léieren net nëmmen d\'Konscht vum Reiden, mee ech liewen et.',
  EN: 'Hi, I\'m Kelly — a passionate rider, trainer and horse lover with over 10 years of experience in equestrian sport. I don\'t just teach the art of riding, I live it.',
  FR: 'Bonjour, je suis Kelly — cavalière, entraîneuse et passionnée de chevaux avec plus de 10 ans d\'expérience dans le sport équestre. Je n\'enseigne pas seulement l\'art de l\'équitation, je le vis.',
}

const langs = [
  { key: 'EN', label: 'EN' },
  { key: 'FR', label: 'FR' },
  { key: 'LB', label: 'LB' },
]

export default function AboutBio() {
  const [lang, setLang] = useState('EN')

  return (
    <div className="mb-10">
      {/* Language toggle */}
      <div className="flex items-center gap-1 mb-5">
        {langs.map((l, i) => (
          <button
            key={l.key}
            onClick={() => setLang(l.key)}
            className="font-[var(--font-cinzel)] text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 transition-all duration-200 cursor-pointer"
            style={{
              color: lang === l.key ? 'var(--color-burgundy)' : 'rgba(107,20,40,0.35)',
              borderBottom: lang === l.key ? '1px solid var(--color-gold)' : '1px solid transparent',
            }}
          >
            {l.label}
          </button>
        ))}
        <span className="ml-1 w-px h-3 bg-gold/30" />
        <span className="font-[var(--font-jost)] text-[9px] tracking-[0.15em] text-burgundy/30 ml-2 uppercase">language</span>
      </div>

      {/* Bio text */}
      <p
        key={lang}
        className="font-[var(--font-jost)] font-light text-[14px] leading-[1.9] text-burgundy/70 max-w-[400px] animate-fade-in"
      >
        {bio[lang]}
      </p>
    </div>
  )
}
