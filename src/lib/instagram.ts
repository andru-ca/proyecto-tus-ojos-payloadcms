// src/lib/instagram.ts

const INSTAGRAM_API_VERSION = 'v18.0'
const BASE_URL = `https://graph.instagram.com/${INSTAGRAM_API_VERSION}`

export interface InstagramPost {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
  username: string
}

export interface InstagramProfile {
  id: string
  username: string
  profile_picture_url: string
  followers_count?: number
  media_count?: number
}

export async function getInstagramProfile(): Promise<InstagramProfile | null> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!accessToken || !userId) {
    console.error('Faltan variables de entorno de Instagram')
    return null
  }

  try {
    const url = `${BASE_URL}/${userId}?fields=id,username,profile_picture_url,followers_count,media_count&access_token=${accessToken}`

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      const body = await res.text()
      try {
        const json = JSON.parse(body) as { error?: { message?: string; code?: number; error_subcode?: number } }
        console.error(
          'Instagram profile API error:',
          res.status,
          json?.error?.message ?? (body || res.statusText),
        )
      } catch {
        console.error('Instagram profile API error:', res.status, body || res.statusText)
      }
      return null
    }

    return (await res.json()) as InstagramProfile
  } catch (error) {
    console.error('Error fetching Instagram profile:', error)
    return null
  }
}

export async function getInstagramFeed(limit: number = 9): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!accessToken || !userId) {
    console.error('Faltan variables de entorno de Instagram')
    return []
  }

  try {
    const url = `${BASE_URL}/${userId}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,username&limit=${limit}&access_token=${accessToken}`

    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      const body = await res.text()
      try {
        const json = JSON.parse(body) as { error?: { message?: string; code?: number } }
        console.error(
          'Instagram feed API error:',
          res.status,
          json?.error?.message ?? (body || res.statusText),
        )
      } catch {
        console.error('Instagram feed API error:', res.status, body || res.statusText)
      }
      return []
    }

    const data = (await res.json()) as { data?: InstagramPost[] }
    return data.data ?? []
  } catch (error) {
    console.error('Error fetching Instagram feed:', error)
    return []
  }
}

// Llama ambos en paralelo para mejor performance
export async function getInstagramData(limit: number = 9) {
  const [profile, posts] = await Promise.all([
    getInstagramProfile(),
    getInstagramFeed(limit),
  ])

  return { profile, posts }
}