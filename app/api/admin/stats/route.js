import { db } from '@/lib/db'
import { clients, invoices } from '@/db/schema'
import { count, sum, eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const [clientCount] = await db.select({ count: count() }).from(clients)
  const [invoiceCount] = await db.select({ count: count() }).from(invoices)
  const [totalRevenue] = await db.select({ sum: sum(invoices.amount) }).from(invoices).where(eq(invoices.status, 'paid'))
  const [outstanding] = await db.select({ sum: sum(invoices.amount) }).from(invoices).where(eq(invoices.status, 'unpaid'))
  const [overdue] = await db.select({ count: count() }).from(invoices).where(eq(invoices.status, 'overdue'))

  const recentClients = await db.select().from(clients).orderBy(clients.id).limit(5)
  const recentInvoices = await db.select().from(invoices).orderBy(invoices.id).limit(5)

  return Response.json({
    clientCount: clientCount.count,
    invoiceCount: invoiceCount.count,
    totalRevenue: totalRevenue.sum ?? 0,
    outstanding: outstanding.sum ?? 0,
    overdueCount: overdue.count,
    recentClients,
    recentInvoices,
  })
}
