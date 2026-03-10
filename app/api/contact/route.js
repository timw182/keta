import nodemailer from 'nodemailer'

export async function POST(request) {
  const { name, email, phone, message } = await request.json()

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 })
  }

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
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#3a1520">
          <h2 style="font-size:18px;border-bottom:1px solid #b8946a;padding-bottom:12px;margin-bottom:20px">
            New Enquiry — KT Equestrian
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p style="margin-top:20px"><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;background:#f7f2e8;padding:16px;border-left:3px solid #b8946a">${message}</p>
        </div>
      `,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return Response.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
