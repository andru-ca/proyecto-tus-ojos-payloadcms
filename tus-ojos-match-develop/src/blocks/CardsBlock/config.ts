import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const CardsBlock: Block = {
  slug: 'cards',
  interfaceName: 'CardsBlock', 
  labels: {
    plural: 'Cards Blocks',
    singular: 'Cards Block',
  },
  imageURL: '/images/thumb/CardsBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Cards Block',


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
      name: 'titleSectionCards',
      type: 'richText',
      label: 'Título de la sección',
      required: false,
      editor: lexicalEditor({}),
      admin: {
        description: 'Título de la sección',
      },
    },
    {
      name:'cardsInformation',
      type:'array',
      label: 'Cards Productos',
      required: true,
      admin: {
        description: 'Cards informativas Productos',
      },
      fields: [
        {
          name: 'ImagenCardLogo',
          type: 'upload',
          label: 'Logotipo Producto',
          required: false,
          relationTo: 'media',
          admin: {
            description: 'Logotipo Producto',
          },
        },
        {
          name: 'ImagenCards',
          type: 'upload',
          label: 'Imagen de la Card',
          required: false,
          relationTo: 'media',
          admin: {
            description: 'Imagen principal',
          },
        },
        {
          name: 'titleCardHTML',
          type: 'richText',
          label: 'Título',
          required: false,
          editor: lexicalEditor({}),
        },
        link({
          overrides: {
            name: 'buttonCard',
            label: 'Botón',
          },
        }),
        {
            name: 'backgroundCard',
            type: 'upload',
            label: 'Fondo de la Card',
            required: false,
            relationTo: 'media',
            admin: {
                description: 'Fondo de la Card',
            },
        }
      ],
    },
  ],
}
