'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const FALLBACK_POSTS = [
  { src: '/images/kelly-with-horse.jpg', alt: 'Kelly with her horse', href: 'https://instagram.com', objectPosition: 'center 30%' },
  { src: '/images/hero-bg.jpg',          alt: 'Equestrian arena',    href: 'https://instagram.com', objectPosition: 'center 40%' },
  { src: '/images/kelly-with-horse.jpg', alt: 'Training session',    href: 'https://instagram.com', objectPosition: 'center 60%' },
  { src: '/images/hero-bg.jpg',          alt: 'Morning ride',        href: 'https://instagram.com', objectPosition: 'left 50%'   },
  { src: '/images/kelly-with-horse.jpg', alt: 'Competition day',     href: 'https://instagram.com', objectPosition: 'right 40%'  },
  { src: '/images/hero-bg.jpg',          alt: 'Stable life',         href: 'https://instagram.com', objectPosition: 'center 20%' },
]

function useInstagramPosts() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.data?.length) {
          const mapped = data.data
            .filter(p => p.media_type !== 'VIDEO' || p.thumbnail_url)
            .map(p => ({
              src: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
              alt: 'KT Equestrian',
              href: p.permalink,
              objectPosition: 'center center',
            }))
          if (mapped.length) setPosts(mapped)
        }
      })
      .catch(() => {})
  }, [])

  return posts ?? FALLBACK_POSTS
}

export default function InstagramMosaic() {
  const posts = useInstagramPosts()

  return (
    <div className="relative">
      {/* Instagram badge */}
      <a
        href="https://instagram.com/ktequestrian"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -top-4 left-0 z-10 flex items-center gap-2 bg-champagne border border-gold/30 px-3 py-1.5 transition-all duration-200 hover:border-gold/60 group"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b8946a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="#b8946a" stroke="none"/>
        </svg>
        <span className="font-[var(--font-cinzel)] text-[7px] tracking-[0.4em] text-gold/70 uppercase group-hover:text-gold transition-colors duration-200">
          @ktequestrian
        </span>
      </a>

      {/* 3×2 grid */}
      <div className="grid grid-cols-3 gap-1 w-full" style={{ aspectRatio: '1 / 1' }}>
        {posts.map((post, i) => (
          <a
            key={i}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden group block"
          >
            <Image
              src={post.src}
              alt={post.alt}
              fill
              unoptimized={post.src.startsWith('https://')}
              className="object-cover sepia-[5%] contrast-105 transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: post.objectPosition }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-burgundy/0 group-hover:bg-burgundy/40 transition-all duration-300 flex items-center justify-center">
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(247,242,232,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100"
                style={{ transition: 'opacity 0.3s, transform 0.3s' }}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="rgba(247,242,232,0.9)" stroke="none"/>
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Est. badge */}
      <div className="absolute top-5 -right-5 bg-burgundy text-champagne font-[var(--font-cinzel)] text-[8px] tracking-[0.4em] uppercase px-[18px] py-2.5 [writing-mode:vertical-rl]">
        Est. 2015
      </div>
    </div>
  )
}
