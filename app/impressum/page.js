'use client'

import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'
import { useLang } from '../_components/LanguageProvider'
import { t } from '../../lib/translations'
import Contours from '../_components/Contours'
import { Eyebrow } from '../_components/ui'

export default function ImpressumPage() {
  const { lang } = useLang()
  const tx = t[lang].impressum

  return (
    <main className="min-h-screen bg-cream overflow-x-clip">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Contours className="text-ink/[0.09]" />
        <div className="relative max-w-[1320px] mx-auto px-5 md:px-12 pt-14 md:pt-20 pb-14 md:pb-20">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Eyebrow>{tx.label}</Eyebrow>
          </div>
          <h1
            className="font-display text-ink uppercase leading-[1] tracking-[0.04em] mt-6 opacity-0 animate-fade-up"
            style={{ fontSize: 'clamp(40px, 6.5vw, 96px)', animationDelay: '0.5s' }}
          >
            {tx.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 pb-20 md:px-12 md:pb-28">
        <div className="h-px bg-ink/15 mb-14" />

        <div className="max-w-[760px] space-y-12">
          {tx.sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-display text-[18px] md:text-[20px] uppercase tracking-[0.08em] leading-[1.3] text-burgundy mb-4">
                {section.heading}
              </h2>
              <div className="font-sans text-[16px] text-ink/75 leading-[1.85] space-y-3">
                {section.lines.map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
