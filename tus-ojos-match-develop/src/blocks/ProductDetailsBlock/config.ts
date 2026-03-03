import type { Block } from 'payload'
import {
  lexicalEditor,
  ParagraphFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  AlignFeature,
  IndentFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

/** Estado vacío válido para el editor Lexical (evita "value is not an object"). Exportado para uso en hooks. */
export const emptyProductDetailsLexicalState = {
  root: {
    type: 'root' as const,
    children: [
      {
        type: 'paragraph' as const,
        children: [
          {
            type: 'text' as const,
            detail: 0,
            format: 0,
            mode: 'normal' as const,
            style: '',
            text: '',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '',
    indent: 0,
    version: 1,
  },
}

export const ProductDetailsBlock: Block = {
  slug: 'productDetails',
  interfaceName: 'ProductDetailsBlock', 
  labels: {
    plural: 'Product Details Blocks',
    singular: 'Product Details Block',
  },
  imageURL: '/images/thumb/ProductDetailsBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Product Details Block',
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
      name: 'titleProductDetails',
      type: 'richText',
      label: 'Título de la sección Productos',
      required: false,
      editor: lexicalEditor({
        features: [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          InlineCodeFeature(),
          LinkFeature({
            enabledCollections: ['pages', 'posts'],
          }),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          AlignFeature(),
          IndentFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        description: 'Título de la sección Productos',
      },
    },
    {
      name:'tabsInformation',
      type:'array',
      label: 'Tabs Productos',
      required: true,
      maxRows: 3,
      admin: {
        description: 'Tabs informativas Productos',
      },
      fields: [
        {
          name: 'tabName',
          type: 'text',
          label: 'Nombre de la pestaña',
          required: true,
          admin: {
            description: 'Nombre de la pestaña',
          },
        },

        {
          name: 'tabDescription',
          type: 'richText',
          label: 'Descripción de la pestaña',
          required: true,
          editor: lexicalEditor({
            features: [
              ParagraphFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
              BoldFeature(),
              ItalicFeature(),
              UnderlineFeature(),
              StrikethroughFeature(),
              SubscriptFeature(),
              SuperscriptFeature(),
              InlineCodeFeature(),
              LinkFeature({
                enabledCollections: ['pages', 'posts'],
              }),
              UnorderedListFeature(),
              OrderedListFeature(),
              ChecklistFeature(),
              BlockquoteFeature(),
              HorizontalRuleFeature(),
              AlignFeature(),
              IndentFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          defaultValue: emptyProductDetailsLexicalState,
          admin: {
            description: 'Descripción de la pestaña',
          },
        },
        {
          name: 'archiveDocuments',
          type: 'relationship',
          label: 'Documentos de la pestaña',
          relationTo: 'media',
          hasMany: true,
          admin: {
            description: 'Documentos de la pestaña',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
      required: true,
      admin: {
        description: 'Imagen de la columna derecha',
      },
    },
  ],
}
