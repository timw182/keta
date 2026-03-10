import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { bookings } from '@/db/schema'
import { eq } from 'drizzle-orm'

const ALLOWED_STATUSES = ['pending', 'confirmed', 'cancelled']

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { status } = await req.json()
  if (!ALLOWED_STATUSES.includes(status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 })
  }

  const [updated] = await db
    .update(bookings)
    .set({ status })
    .where(eq(bookings.id, Number(params.id)))
    .returning()

  return Response.json(updated)
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  await db.delete(bookings).where(eq(bookings.id, Number(params.id)))
  return Response.json({ ok: true })
}
