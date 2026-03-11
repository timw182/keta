export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN

  if (!token) {
    return Response.json({ error: 'No token configured' }, { status: 500 })
  }

  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,media_url,permalink,media_type,thumbnail_url&limit=6&access_token=${token}`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    return Response.json({ error: 'Instagram API error' }, { status: 502 })
  }

  const data = await res.json()
  return Response.json(data)
}
