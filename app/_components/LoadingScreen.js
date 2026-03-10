'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen({ children }) {
  const [loaded, setLoaded] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar to reflect real loading
    let raf
    const start = performance.now()

    function tick(now) {
      // Ease toward 90% over ~800ms while waiting, snap to 100% on done
      const elapsed = now - start
      const natural = 1 - Math.exp(-elapsed / 600)
      setProgress(p => Math.max(p, natural * 90))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const heroImg = new window.Image()
    heroImg.onload = heroImg.onerror = () => {
      cancelAnimationFrame(raf)
      setProgress(100)
      // Small delay only for the bar to visually reach 100% before fade
      setTimeout(() => {
        setLoaded(true)
        setTimeout(() => setHidden(true), 500)
      }, 150)
    }
    heroImg.src = '/images/choice2.jpeg'

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {!hidden && (
        <div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0e0507]"
          style={{
            transition: 'opacity 0.5s ease',
            opacity: loaded ? 0 : 1,
            pointerEvents: loaded ? 'none' : 'auto',
          }}
        >
          <div style={{ width: 56, height: 56 }} className="mb-8">
            <img
              src="/picture-repo/logo/logo-svg.svg"
              alt="KT Equestrian"
              style={{ width: 56, height: 56, filter: 'brightness(0) invert(1)', opacity: 0.85 }}
            />
          </div>

          {/* Loading bar — width driven by real progress */}
          <div className="relative w-[140px] h-px bg-gold/15">
            <div
              className="absolute top-0 left-0 h-full bg-gold"
              style={{
                width: `${progress}%`,
                transition: progress === 100 ? 'width 0.15s ease' : 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      )}

      <div style={{ visibility: hidden ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </>
  )
}
