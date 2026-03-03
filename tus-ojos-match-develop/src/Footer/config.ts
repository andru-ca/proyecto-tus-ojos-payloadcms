import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

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

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Logo del footer. Si no se selecciona, se usará el logo por defecto.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
      required: true,
      admin: {
        description: 'Copyright del footer',
      },
    },
    {
      name: 'subFooter',
      type: 'richText',
      label: 'Subfooter',
      required: true,
      editor: lexicalEditor({}),
      defaultValue: emptyCarruselTabTitleLexicalState,
      admin: {
        description: 'Subfooter del footer',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
