import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  interfaceName: 'CallToActionBlock', 
  labels: {
    plural: 'Calls to Action Blocks',
    singular: 'Call to Action Block',
  },
    
  imageURL: '/images/thumb/CallToActionBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Call to Action Block',

  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título Principal',
      required: true,
      admin: {
        description: 'Título principal de la sección',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Descripción',
      required: true,
      admin: {
        description: 'Descripción de la sección',
      },
     
    },
    {
        name: 'backgroundImage',
        type: 'upload',
        label: 'Imagen de Fondo',
        required: true,
        relationTo: 'media',
        admin: {
          description: 'Imagen de fondo de la sección',
        },
      },

      {
        name:'cards',
        type:'array',
        label: 'Cards Informativas',
        required: true,
        admin: {
          description: 'Cards informativas',
        },
        fields: [
          {
            name: 'titleCard',
            type: 'text',
            label: 'Título',
            required: true,
          },
          {
            name: 'editorCardHTML',
            type: 'richText',
            label: 'Descripción HTML',
            required: false,
            editor: lexicalEditor({}),
          },
        ],
      },
    ],
}
