import { db } from '@/lib/db'
import { invoices } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const updates = {
    status: body.status,
    dueAt: body.dueAt,
    amount: body.amount,
    items: body.items ? JSON.stringify(body.items) : undefined,
  }
  if (body.status === 'paid') updates.paidAt = new Date().toISOString()

  const [updated] = await db
    .update(invoices)
    .set(updates)
    .where(eq(invoices.id, Number(params.id)))
    .returning()

  return Response.json(updated)
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  await db.delete(invoices).where(eq(invoices.id, Number(params.id)))
  return Response.json({ ok: true })
}
