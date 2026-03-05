import { db } from '@/lib/db'
import { clients, invoices } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const [updated] = await db
    .update(clients)
    .set({ name: body.name, email: body.email, phone: body.phone || null })
    .where(eq(clients.id, Number(params.id)))
    .returning()

  return Response.json(updated)
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  await db.delete(invoices).where(eq(invoices.clientId, Number(params.id)))
  await db.delete(clients).where(eq(clients.id, Number(params.id)))

  return Response.json({ ok: true })
}
