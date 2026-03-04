// src/blocks/InstagramFeed/config.ts
import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const InstagramFeedBlock: Block = {
  slug: 'instagramFeed',
  interfaceName: 'InstagramFeedBlock',
  labels: {
    singular: 'Instagram Feed',
    plural: 'Instagram Feeds',
  },
  imageURL: '/images/thumb/InstagramFeedBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Instagram Feed',
  fields: [
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      required: false,
      admin: {
        description: 'Texto de introducción',
      },
    },
    {
      name: 'titleSection',
      type: 'richText',
      label: 'Título de la sección',
      editor: lexicalEditor({}),
      admin: {
        description: 'Título de la sección',
      },
    },

    {
      name: 'numberOfPosts',
      type: 'number',
      label: 'Número de publicaciones',
      defaultValue: 9,
      min: 1,
      max: 24,
    },
  ],
}