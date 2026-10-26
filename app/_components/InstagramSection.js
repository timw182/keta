'use client'

import Script from 'next/script'
import { useLang } from './LanguageProvider'
import { t } from '../../lib/translations'
import { Eyebrow, ArrowLink } from './ui'

const PROFILE_URL = 'https://www.instagram.com/trauschkelly/'
const POST_URL = 'https://www.instagram.com/p/DRIEKyDjCdo/'

/* Instagram's embed.js swaps this blockquote for an iframe. It is injected as
   static HTML so React never tries to reconcile the node Instagram replaced. */
const EMBED_HTML = `
<blockquote class="instagram-media"
  data-instgrm-permalink="${POST_URL}?utm_source=ig_embed&amp;utm_campaign=loading"
  data-instgrm-version="14"
  style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:0; max-width:540px; min-width:326px; padding:0; width:100%;">
  <a href="${POST_URL}" target="_blank" rel="noopener">View this post on Instagram</a>
</blockquote>`

export default function InstagramSection() {
  const { lang } = useLang()
  const tx = t[lang].instagram

  return (
    <section className="relative bg-sand overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">

        {/* Text */}
        <div className="lg:col-span-5">
          <Eyebrow className="mb-6">{tx.label}</Eyebrow>
          <h2 className="font-display text-ink uppercase leading-[1] tracking-[0.04em]" style={{ fontSize: 'clamp(34px, 4.6vw, 66px)' }}>
            {tx.title1}{' '}
            <em className="font-accent italic font-normal normal-case tracking-normal text-[1.2em] text-burgundy">{tx.title2}</em>
          </h2>
          <p className="font-sans text-[16px] leading-[1.8] text-ink/75 mt-6 max-w-sm">
            {tx.text}
          </p>
          <div className="mt-10">
            <ArrowLink href={PROFILE_URL}>{tx.cta}</ArrowLink>
          </div>
        </div>

        {/* Embedded post with offset burgundy block */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[460px] mr-4 md:mr-6">
            <div className="absolute top-8 left-8 -right-4 -bottom-4 md:-right-6 md:-bottom-6 bg-burgundy" aria-hidden="true" />
            <div className="relative" dangerouslySetInnerHTML={{ __html: EMBED_HTML }} />
          </div>
        </div>
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => window.instgrm?.Embeds.process()}
      />
    </section>
  )
}
