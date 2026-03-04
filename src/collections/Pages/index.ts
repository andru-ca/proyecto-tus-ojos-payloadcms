import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdminOrEditor } from '../../access/isAdminOrEditor'

import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { HeroGotas } from '../../blocks/HeroGotas/config'
import { CarruselTab } from '../../blocks/TabsInformationBlock/config'
import { CardsBlock } from '../../blocks/CardsBlock/config'
import { StepToStepBlock } from '../../blocks/StepToStepBlock/config'
import { CarouselRecommendationBlock } from '../../blocks/CarouselRecommendationBlock/config'
import { HeaderProductoBlock } from '../../blocks/HeaderProductoBlock/config'
import { FaqBlock } from '../../blocks/FaqBlock/config'
import { ProductDetailsBlock } from '../../blocks/ProductDetailsBlock/config'
import { ProductInfoBlock } from '../../blocks/ProductInfoBlock/config'
import { CallToActionBlock } from '../../blocks/CallToActionBlock/config'
import { InstagramFeedBlock } from '../../blocks/InstagramFeed/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { normalizeProductDetailsLexical } from './hooks/normalizeProductDetailsLexical'


import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: isAdminOrEditor,
    delete: isAdminOrEditor,
    read: authenticatedOrPublished,
    update: isAdminOrEditor,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
    
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [HeroGotas, 
                CarruselTab, 
                CallToActionBlock, 
                StepToStepBlock, 
                CarouselRecommendationBlock, 
                HeaderProductoBlock, 
                CardsBlock, 
                FaqBlock, 
                ProductDetailsBlock, 
                ProductInfoBlock, 
                InstagramFeedBlock, 
                Archive, 
                Content, 
                FormBlock, 
                MediaBlock,
                CallToAction,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            {
              type: 'text',
              name: 'canonicalUrl',
              label: 'Canonical URL',
              hooks: { 
                beforeChange: [
                  async ({data, value}) => !value ? `https://example.com/${data?.slug}` : value
                ]
              }
            },

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterRead: [normalizeProductDetailsLexical],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
