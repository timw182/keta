import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { bookings } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  let rows = await db.select().from(bookings).orderBy(desc(bookings.id))
  if (status) rows = rows.filter(b => b.status === status)

  return Response.json(rows)
}
