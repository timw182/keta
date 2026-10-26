/* Decorative topographic contour lines — pure SVG, generated once at module load */

function ring(cx, cy, r, k, seed) {
  const pts = []
  const steps = 96
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const wobble =
      0.16 * Math.sin(3 * a + seed + k * 0.22) +
      0.09 * Math.sin(5 * a - seed * 1.7 + k * 0.15) +
      0.05 * Math.sin(8 * a + seed * 0.6 - k * 0.1)
    const rr = r * (1 + wobble)
    pts.push(`${(cx + Math.cos(a) * rr * 1.25).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
}

function field(cx, cy, count, gap, seed) {
  return Array.from({ length: count }, (_, k) => ring(cx, cy, 18 + k * gap, k, seed))
}

const PATHS = [
  ...field(720, 330, 16, 26, 1.3),
  ...field(150, 760, 9, 30, 4.1),
  ...field(1300, 820, 8, 28, 2.4),
]

export default function Contours({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 1000"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {PATHS.map((d, i) => <path key={i} d={d} vectorEffect="non-scaling-stroke" />)}
    </svg>
  )
}
