'use client'

import Image from 'next/image'
import Navbar from '../_components/Navbar'
import Footer from '../_components/Footer'
import Contours from '../_components/Contours'
import { Eyebrow, CtaButton, ArrowLink } from '../_components/ui'
import { useLang } from '../_components/LanguageProvider'
import { t } from '../../lib/translations'

const PLACE_STYLES = {
  '1': 'notch-tag bg-lime text-ink',
  '2': 'bg-burgundy text-cream',
  '3': 'border border-cream/30 text-cream/80',
}

function placeStyle(result) {
  return PLACE_STYLES[result.charAt(0)] ?? PLACE_STYLES['3']
}

export default function AboutPage() {
  const { lang } = useLang()
  const tx = t[lang].aboutMe
  const established = t[lang].about.established

  return (
    <main className="bg-cream min-h-screen overflow-x-clip">
      <Navbar />

      {/* ── HERO — name + portrait on contour lines ── */}
      <section className="relative overflow-hidden">
        <Contours className="text-ink/[0.09]" />

        <div className="relative max-w-[1320px] mx-auto px-5 md:px-12 pt-12 md:pt-16 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Eyebrow>{tx.heroTagline}</Eyebrow>
            </div>

            <h1
              className="font-display text-ink uppercase leading-[1] tracking-[0.04em] mt-6 opacity-0 animate-fade-up"
              style={{ fontSize: 'clamp(52px, 7vw, 108px)', animationDelay: '0.6s' }}
            >
              {tx.heroTitle1}
              <em className="block font-accent italic font-normal normal-case tracking-normal text-[1.2em] leading-[0.95] text-burgundy">
                {tx.heroTitle2}
              </em>
            </h1>

            <p className="font-sans font-medium text-[13px] tracking-[0.18em] text-ink/70 uppercase mt-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
              {tx.heroSub}
            </p>
          </div>

          <div className="relative lg:col-span-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <div className="absolute top-8 left-8 -right-4 -bottom-4 md:-right-6 md:-bottom-6 bg-burgundy" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden mr-4 md:mr-6">
              <Image
                src="/images/kelly-with-horse.jpg"
                alt="Kelly Trausch"
                fill priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
            <span className="notch-tag absolute -left-2 md:-left-6 bottom-12 bg-lime text-ink font-display text-[24px] md:text-[28px] leading-none px-5 py-2.5 -rotate-3 shadow-[0_4px_0_rgba(23,22,19,0.85)]">
              {established}
            </span>
          </div>
        </div>
      </section>

      {/* ── STORY — editorial pull quote ── */}
      <section className="bg-sand">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-20 md:py-28">
          <Eyebrow className="mb-10">{tx.storyLabel}</Eyebrow>

          <blockquote
            className="font-accent italic text-ink leading-[1.2] mb-14 max-w-[1000px]"
            style={{ fontSize: 'clamp(30px, 4vw, 56px)' }}
          >
            &ldquo;{tx.storyP1}&rdquo;
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[1000px]">
            <p className="font-sans text-[16px] leading-[1.85] text-ink/75">{tx.storyP2}</p>
            <p className="font-sans text-[16px] leading-[1.85] text-ink/75">{tx.storyP3}</p>
          </div>
        </div>
      </section>

      {/* ── STATS — big numbers on burgundy band ── */}
      <section className="relative overflow-hidden bg-burgundy">
        <Contours className="text-cream/[0.1]" />
        <div className="relative max-w-[1320px] mx-auto px-5 md:px-12 py-14 md:py-20 grid grid-cols-3 divide-x divide-cream/20">
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '10', label: 'Competition Titles' },
            { num: '2015', label: 'Year Founded' },
          ].map((s, i) => (
            <div key={i} className="text-center px-4 md:px-10 flex flex-col items-center gap-3">
              <span className="font-display text-cream leading-none" style={{ fontSize: 'clamp(34px, 6vw, 84px)' }}>
                {s.num}
              </span>
              <span className="font-sans font-semibold text-[10px] md:text-[12px] tracking-[0.18em] text-cream/75 uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMATION — timeline ── */}
      <section className="max-w-[1320px] mx-auto px-5 md:px-12 py-20 md:py-28">
        <Eyebrow className="mb-6">{tx.educationLabel}</Eyebrow>
        <h2 className="font-display text-ink uppercase leading-[1.05] tracking-[0.04em] mb-14" style={{ fontSize: 'clamp(30px, 4.2vw, 60px)' }}>
          {tx.educationTitle1}{' '}
          <em className="font-accent italic font-normal normal-case tracking-normal text-[1.2em] text-burgundy">{tx.educationTitle2}</em>
        </h2>

        <div className="border-t border-ink/15">
          {tx.education.map((item, i) => (
            <div
              key={i}
              className="group grid grid-cols-[72px_1fr] md:grid-cols-[160px_1fr_1.2fr] gap-x-6 md:gap-x-10 gap-y-2 py-7 border-b border-ink/15"
            >
              <span className="font-display text-ink/40 group-hover:text-burgundy transition-colors duration-300 leading-none" style={{ fontSize: 'clamp(24px, 2.6vw, 36px)' }}>
                {item.year}
              </span>
              <h3 className="font-display text-[16px] md:text-[18px] uppercase tracking-[0.06em] leading-[1.35] text-ink">
                {item.title}
              </h3>
              <p className="col-start-2 md:col-start-auto font-sans text-[15px] leading-[1.75] text-ink/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPETITION RECORD ── */}
      <section className="bg-ink">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-20 md:py-28">
          <Eyebrow dark className="mb-6">{tx.tournamentsLabel}</Eyebrow>
          <h2 className="font-display text-cream uppercase leading-[1.05] tracking-[0.04em] mb-14" style={{ fontSize: 'clamp(30px, 4.2vw, 60px)' }}>
            {tx.tournamentsTitle1}{' '}
            <em className="font-accent italic font-normal normal-case tracking-normal text-[1.2em] text-blush">{tx.tournamentsTitle2}</em>
          </h2>

          <div className="border-t border-cream/10">
            {tx.tournaments.map((item, i) => (
              <div
                key={i}
                className="group grid grid-cols-[52px_1fr_auto] md:grid-cols-[96px_1fr_160px] items-center gap-4 md:gap-8 py-5 border-b border-cream/10"
              >
                <span className="font-display text-[18px] md:text-[22px] text-cream/40 group-hover:text-blush transition-colors duration-200">
                  {item.year}
                </span>

                <div>
                  <p className="font-sans font-medium text-[15px] md:text-[17px] text-cream leading-[1.4]">
                    {item.event}
                  </p>
                  <p className="font-sans text-[13px] text-cream/50 mt-0.5">
                    {item.discipline}
                  </p>
                </div>

                <div className="flex justify-end">
                  <span className={`font-sans font-semibold text-[11px] tracking-[0.12em] uppercase px-3.5 py-1.5 whitespace-nowrap ${placeStyle(item.result)}`}>
                    {item.result}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-5">
            <span className="font-display text-[56px] md:text-[72px] text-blush leading-none">
              {tx.tournaments.filter(t => t.result.startsWith('1')).length}
            </span>
            <div>
              <p className="font-sans font-semibold text-[12px] tracking-[0.18em] text-cream uppercase">First Place Victories</p>
              <p className="font-sans text-[14px] text-cream/55 mt-1">across international &amp; national competition</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — book a session ── */}
      <section className="relative overflow-hidden">
        <Contours className="text-ink/[0.08]" />
        <div className="relative max-w-[1320px] mx-auto px-5 md:px-12 py-20 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <Eyebrow className="mb-6">
              {lang === 'FR' ? 'Travailler Avec Kelly' : lang === 'LB' ? 'Mat Kelly Schaffen' : 'Work With Kelly'}
            </Eyebrow>
            <p className="font-accent italic text-ink leading-[1.05] whitespace-pre-line" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
              {lang === 'FR' ? 'Prêt à commencer\nvotre voyage ?' : lang === 'LB' ? 'Prett fir Äre Wee\nunzefänken?' : 'Ready to begin\nyour journey?'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <CtaButton href="/booking">
              {lang === 'FR' ? 'Réserver une Séance' : lang === 'LB' ? 'Eng Séance Buchen' : 'Book a Session'}
            </CtaButton>
            <ArrowLink href="/contact">
              {lang === 'FR' ? 'Nous Contacter' : lang === 'LB' ? 'Kontakt' : 'Get in Touch'}
            </ArrowLink>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
