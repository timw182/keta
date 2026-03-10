import { db } from '@/lib/db'
import { bookings } from '@/db/schema'

const ALLOWED_TYPES = ['lesson', 'course']
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{2}:\d{2}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, phone, type, date, startTime, endTime, notes } = body

    if (!name || !email || !type || !date || !startTime || !endTime) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!ALLOWED_TYPES.includes(type)) {
      return Response.json({ error: 'Invalid booking type' }, { status: 400 })
    }
    if (!DATE_RE.test(date)) {
      return Response.json({ error: 'Invalid date format' }, { status: 400 })
    }
    if (!TIME_RE.test(startTime) || !TIME_RE.test(endTime)) {
      return Response.json({ error: 'Invalid time format' }, { status: 400 })
    }
    if (typeof name !== 'string' || name.length > 100) {
      return Response.json({ error: 'Invalid name' }, { status: 400 })
    }

    const [booking] = await db.insert(bookings).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      type,
      date,
      startTime,
      endTime,
      notes: notes?.trim().slice(0, 1000) || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).returning()

    return Response.json(booking, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
