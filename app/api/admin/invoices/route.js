import { db } from '@/lib/db'
import { invoices, clients } from '@/db/schema'
import { eq, count, desc } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const clientId = searchParams.get('clientId')

  let query = db
    .select({
      invoice: invoices,
      clientName: clients.name,
      clientEmail: clients.email,
    })
    .from(invoices)
    .leftJoin(clients, eq(invoices.clientId, clients.id))

  const rows = await query.orderBy(desc(invoices.id))

  let filtered = rows
  if (status) filtered = filtered.filter(r => r.invoice.status === status)
  if (clientId) filtered = filtered.filter(r => r.invoice.clientId === Number(clientId))

  return Response.json(
    filtered.map(r => ({ ...r.invoice, clientName: r.clientName, clientEmail: r.clientEmail }))
  )
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Auto-generate invoice number KT-YYYY-NNN
  const [{ count: total }] = await db.select({ count: count() }).from(invoices)
  const year = new Date().getFullYear()
  const number = `KT-${year}-${String(Number(total) + 1).padStart(3, '0')}`

  const [invoice] = await db.insert(invoices).values({
    clientId: body.clientId,
    number,
    amount: body.amount,
    status: body.status || 'unpaid',
    issuedAt: new Date().toISOString(),
    dueAt: body.dueAt,
    items: JSON.stringify(body.items || []),
  }).returning()

  return Response.json(invoice, { status: 201 })
}
