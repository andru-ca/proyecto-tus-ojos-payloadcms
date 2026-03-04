import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock', 
  labels: {
    plural: 'Faq Blocks',
    singular: 'Faq Block',
  },
  imageURL: '/images/thumb/FaqBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Faq Block',

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
      name: 'titleSectionFaq',
      type: 'richText',
      label: 'Título de la sección',
      required: false,
      editor: lexicalEditor({}),
      admin: {
        description: 'Título de la sección',
      },
    },
    {
      name:'faqInformation',
      type:'array',
      label: 'Faq Productos',
      required: true,
      admin: {
        description: 'Faq informativas Productos',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Pregunta',
          required: true,
          admin: {
            description: 'Pregunta',
          },
        },

        {
            name: 'answer',
            type: 'text',
            label: 'Respuesta',
            required: true,
            admin: {
                description: 'Respuesta',
            },
        }
      ],
    },
  ],
}
