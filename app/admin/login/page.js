'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.ok) {
      router.push('/admin')
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="min-h-screen bg-[#3a1520] flex items-center justify-center px-4">
      {/* Gold border */}
      <div className="fixed inset-8 border border-[#b8946a]/40 pointer-events-none z-10" />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Image src="/images/kt_logo.png" alt="KT Equestrian" width={52} height={52} className="brightness-0 invert opacity-80 mb-4" />
          <h1 className="font-[var(--font-cinzel)] text-[13px] tracking-[0.4em] text-[#f7f2e8]/80 uppercase">KT Equestrian</h1>
          <p className="font-[var(--font-jost)] text-[10px] tracking-[0.3em] text-[#b8946a]/70 uppercase mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-[#f7f2e8] p-8">
          <h2 className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-[#6b1428] uppercase mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-[#6b1428]/60 uppercase mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-[#6b1428]/20 px-3 py-2.5 text-[13px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
              />
            </div>
            <div>
              <label className="block font-[var(--font-jost)] text-[10px] tracking-[0.2em] text-[#6b1428]/60 uppercase mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-[#6b1428]/20 px-3 py-2.5 text-[13px] font-[var(--font-jost)] text-[#3a1520] focus:outline-none focus:border-[#b8946a] transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-600 font-[var(--font-jost)] text-[11px]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6b1428] text-[#f7f2e8] font-[var(--font-cinzel)] text-[10px] tracking-[0.3em] uppercase py-3 mt-2 hover:bg-[#8b1a32] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
