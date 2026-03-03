import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/** Estado vacío válido para el editor Lexical del título (evita "value is not an object"). */
export const emptyCarruselTabTitleLexicalState = {
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





export const CarruselTab: Block = {
  slug: 'carruselTab',
  interfaceName: 'CarruselTabBlock',
  labels: {
    plural: 'Carrusel Tab Blocks',
    singular: 'Carrusel Tab Block',
  },
  imageURL: '/images/thumb/CarruselTab.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Carrusel Tab Block',

  fields: [
    {
      name: 'topText',
      type: 'text',
      label: 'Texto Superior',
      admin: {
        description: 'Texto pequeño que aparece arriba del título',
      },
    },
    {
      name: 'title',
      type: 'richText',
      label: 'Título Principal',
      required: true,
      editor: lexicalEditor({}),
      defaultValue: emptyCarruselTabTitleLexicalState,
      admin: {
        description: 'Título principal de la sección',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
      required: true,
      admin: {
        description: 'Una sola imagen global para la sección (segunda columna)',
      },
    },
    // Lista única de opciones con su contenido
    {
      name: 'options',
      type: 'array',
      label: 'Sintomas',
      minRows: 1,
      admin: {
        description: 'Lista de sintomas',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nombre del Sintoma',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Descripción del Sintoma',
          required: true,
          editor: lexicalEditor({}),
          defaultValue: emptyCarruselTabTitleLexicalState,
        },
        {
          name: 'statTitle',
          type: 'text',
          label: 'Título de Estadística',
        },
        {
          name: 'statValue',
          type: 'text',
          label: 'Valor de Estadística',
        },
        {
          name: 'statDescription',
          type: 'text',
          label: 'Descripción de Estadística',
        },
        {
          name: "recommendations",
          type: "select",
          label: "Se recomienda el uso de:",
          required: true,
          options: [
            {
              label: "DryOff",
              value: "dryOff",
            },
            {
              label: "RedOff",
              value: "redOff",
            },
          ],
        },
        {
          name: 'consejos',
          type: 'richText',
          label: 'Consejos breves para evitarlo',
          required: true,
          editor: lexicalEditor({}),
          defaultValue: emptyCarruselTabTitleLexicalState,
        },
      ],
    },
    {
      name: "condition",
      type: "text",
      label: "Condiciones",
      required: true,
      admin: {
        description: "Condiciones",
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Color de Fondo',
      defaultValue: '#F0F5F5',
      admin: {
        description: 'Color de fondo de la sección (formato hex)',
      },
    },
  ],
}
