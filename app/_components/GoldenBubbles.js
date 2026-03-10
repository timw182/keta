'use client'

const bubbles = [
  { size: 65,  top: '18%', left: '7%',  anim: 'float1', duration: '18s', delay: '0s',   opacity: 0.45 },
  { size: 100, top: '55%', left: '15%', anim: 'float2', duration: '25s', delay: '3s',   opacity: 0.32 },
  { size: 44,  top: '30%', left: '48%', anim: 'float3', duration: '21s', delay: '7s',   opacity: 0.50 },
  { size: 80,  top: '72%', left: '65%', anim: 'float4', duration: '28s', delay: '1.5s', opacity: 0.36 },
  { size: 52,  top: '12%', left: '82%', anim: 'float5', duration: '16s', delay: '10s',  opacity: 0.48 },
  { size: 90,  top: '45%', left: '90%', anim: 'float6', duration: '23s', delay: '5s',   opacity: 0.30 },
]

export default function GoldenBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {bubbles.map((b, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            border: `1px solid rgba(184,148,106,${(b.opacity * 1.5).toFixed(2)})`,
            background: `radial-gradient(circle at 35% 35%, rgba(212,170,125,${b.opacity}) 0%, rgba(184,148,106,${(b.opacity * 0.35).toFixed(2)}) 55%, transparent 100%)`,
            boxShadow: `0 0 ${Math.round(b.size * 0.55)}px rgba(184,148,106,${(b.opacity * 0.45).toFixed(2)})`,
            animation: `${b.anim} ${b.duration} ${b.delay} infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
