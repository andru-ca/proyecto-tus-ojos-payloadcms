// src/app/api/refresh-instagram-token/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Proteger el endpoint con un secret
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  )
  const data = await res.json()

  // Aquí podrías guardar el nuevo token en tu base de datos o env
  return NextResponse.json(data)
}