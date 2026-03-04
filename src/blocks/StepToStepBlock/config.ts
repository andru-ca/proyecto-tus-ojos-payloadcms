import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const StepToStepBlock: Block = {
  slug: 'stepToStep',
  interfaceName: 'StepToStepBlock', 
  labels: {
    plural: 'Step To Step Blocks',
    singular: 'Step To Step Block',
  },
  imageURL: '/images/thumb/StepToStepBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Step To Step Block',

  fields: [
    {
        name: 'ImagenStep',
        type: 'upload',
        label: 'Imagen',
        required: true,
        relationTo: 'media',
        admin: {
          description: 'Imagen',
        },
      },
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
      name: 'titleSectionStep',
      type: 'richText',
      label: 'Título de la sección Paso a Paso',
      required: false,
      editor: lexicalEditor({}),
      admin: {
        description: 'Título de la sección Paso a paso',
      },
    },
    {
      name:'ListStep',
      type:'array',
      label: 'Lista de Pasos',
      required: true,
      admin: {
        description: 'Lista de Pasos',
      },
      fields: [
        {
          name: "iconStep",
          type: 'upload',
          label: 'Icono',
          relationTo: 'media',
          admin: {
            description: 'Icono del item',
          },
        },
        {
          name: 'titleStep',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'descriptionStep',
          type: 'text',
          label: 'Descripción',
          required: true,
        },

      ],
    },
  ],
}
