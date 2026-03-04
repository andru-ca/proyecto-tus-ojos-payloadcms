import type { Block } from 'payload'

export const HeroGotas: Block = {
  slug: 'heroGotas',
  interfaceName: 'HeroGotasBlock',
  labels: {
    plural: 'Hero Gotas Blocks',
    singular: 'Hero Gotas Block',
  },
  imageURL: '/images/thumb/HeroGotasBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Hero Gotas Block',

  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de Fondo',
      required: true,
      admin: {
        description: 'Imagen de fondo para el hero',
      },
    },
    {
      name: 'mainTitle',
      type: 'text',
      label: 'Título Principal',
      required: true,
      admin: {
        description: 'Título principal del hero',
      },
    },
    {
      name: 'gotasImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de Gotas',
      required: true,
      admin: {
        description: 'Imagen decorativa de gotas',
      },
    },
    {
      name: 'leftTags',
      type: 'array',
      label: 'Síntomas Izquierdos',
      admin: {
        description: 'Síntomas que aparecerán en el lado izquierdo',
      },
      maxRows: 3,
      minRows:0,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto',
          required: true,
        },
      ],
    },
    {
      name: 'rightTags',
      type: 'array',
      label: 'Síntomas Derechos',
      admin: {
        description: 'Síntomas que aparecerán en el lado derecho',
      },
      maxRows: 3,
      minRows:0,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto',
          required: true,
        },
      ],
    },
  ],
}
