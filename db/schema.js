import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const clients = sqliteTable('clients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  createdAt: text('created_at').default(new Date().toISOString()),
})

export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').references(() => clients.id),
  type: text('type').notNull(), // 'lesson' | 'course' | 'training'
  date: text('date').notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  status: text('status').default('pending'), // 'pending' | 'confirmed' | 'cancelled'
  notes: text('notes'),
})

export const invoices = sqliteTable('invoices', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id').references(() => clients.id),
  number: text('number').notNull().unique(),
  amount: real('amount').notNull(),
  status: text('status').default('unpaid'), // 'unpaid' | 'paid' | 'overdue'
  issuedAt: text('issued_at').notNull(),
  dueAt: text('due_at').notNull(),
  paidAt: text('paid_at'),
  items: text('items'), // JSON string
})
