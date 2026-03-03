import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
export const CarouselRecommendationBlock: Block = {
  slug: 'carouselRecommendation',
  interfaceName: 'CarouselRecommendationBlock', 
  labels: {
    plural: 'Carousel Recommendation Blocks',
    singular: 'Carousel Recommendation Block',
  },
  imageURL: '/images/thumb/CarouselRecommendationBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Carousel Recommendation Block',

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
      name: 'titleSectionSlider',
      type: 'richText',
      label: 'Título de la sección del Slider',
      required: false,
      editor: lexicalEditor({}),
      admin: {
        description: 'Título de la sección del Slider',
      },
    },
    {
      name:'recommendations',
      type:'array',
      label: 'Recomendaciones',
      required: true,
      admin: {
        description: 'Recomendaciones',
      },
      fields: [
        {
            name: 'titleSlider',
            type: 'text',
            label: 'Título del Slider',
            required: false,
          },
          {
             name: 'descriptionSlider',
             type: 'textarea',
             label: 'Descripción del Slider',
             required: false,
          },
        {
          name: 'imageSlider',
          type: 'upload',
          label: 'Imagen del Slider',
          required: false,
          relationTo: 'media',
          admin: {
            description: 'Imagen del Slider',
          },
        },
      ],
    },
  ],
}



