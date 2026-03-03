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
  const { profile, posts } = await getInstagramData(numberOfPosts ?? 9)

  if (!posts || posts.length === 0) {
    return null
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
