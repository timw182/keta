import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request) {
  const { name, email, phone, message } = await request.json()

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email) || email.includes('\n') || email.includes('\r')) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }
  if (typeof name !== 'string' || name.length > 100) {
    return Response.json({ error: 'Invalid name.' }, { status: 400 })
  }
  if (typeof message !== 'string' || message.length > 2000) {
    return Response.json({ error: 'Message too long.' }, { status: 400 })
  }

  const safeName    = escapeHtml(name.trim())
  const safeEmail   = escapeHtml(email.trim())
  const safePhone   = phone ? escapeHtml(phone.trim()) : null
  const safeMessage = escapeHtml(message.trim())

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"KT Equestrian Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email.trim(),
      subject: `New enquiry from ${safeName}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#3a1520">
          <h2 style="font-size:18px;border-bottom:1px solid #b8946a;padding-bottom:12px;margin-bottom:20px">
            New Enquiry — KT Equestrian
          </h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
          <p style="margin-top:20px"><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;background:#f7f2e8;padding:16px;border-left:3px solid #b8946a">${safeMessage}</p>
        </div>
      `,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return Response.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
