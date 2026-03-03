// src/blocks/InstagramFeed/Component.tsx
import React from 'react'
import { getInstagramData } from '@/lib/instagram'
import { InstagramFeedSlider } from './InstagramFeedSlider.client'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export interface InstagramFeedBlockProps {
  caption?: string | null
  titleSection?: DefaultTypedEditorState | null
  numberOfPosts?: number | null
}

export const InstagramFeedBlockComponent: React.FC<InstagramFeedBlockProps> = async ({
  caption,
  titleSection,
  numberOfPosts = 9,
}) => {
  let profile = null
  let posts: Awaited<ReturnType<typeof getInstagramData>>['posts'] = []

  try {
    const data = await getInstagramData(numberOfPosts ?? 9)
    profile = data.profile
    posts = data.posts ?? []
  } catch {
    // API sin respuesta: el slider muestra placeholders
  }

  return (
    <InstagramFeedSlider
      posts={posts}
      profile={profile}
      caption={caption}
      titleSection={titleSection}
    />
  )
}
