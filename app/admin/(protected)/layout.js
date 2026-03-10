import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from './_components/Sidebar'
import SessionProvider from './_components/SessionProvider'

export const metadata = { title: 'KT Admin' }

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-[#f7f2e8]">
        <Sidebar />
        <main className="flex-1 ml-60 min-h-screen">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
