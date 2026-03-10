import { db } from '@/lib/db'
import { bookings } from '@/db/schema'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, phone, type, date, startTime, endTime, notes } = body

    if (!name || !email || !type || !date || !startTime || !endTime) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const [booking] = await db.insert(bookings).values({
      name,
      email,
      phone: phone || null,
      type,
      date,
      startTime,
      endTime,
      notes: notes || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).returning()

    return Response.json(booking, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
