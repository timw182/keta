import { db } from '@/lib/db'
import { clients, invoices } from '@/db/schema'
import { eq, count, sum } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const all = await db.select().from(clients).orderBy(clients.name)

  // Attach invoice stats per client
  const enriched = await Promise.all(
    all.map(async (c) => {
      const [stats] = await db
        .select({ count: count(), total: sum(invoices.amount) })
        .from(invoices)
        .where(eq(invoices.clientId, c.id))
      return { ...c, invoiceCount: stats.count, totalAmount: stats.total ?? 0 }
    })
  )

  return Response.json(enriched)
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const [client] = await db.insert(clients).values({
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    createdAt: new Date().toISOString(),
  }).returning()

  return Response.json(client, { status: 201 })
}
