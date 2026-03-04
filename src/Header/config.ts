import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
        description: 'Logo del sitio. Si no se selecciona, se usará el logo por defecto.',
      },
    },
    {
      name: 'logoTransparent',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Logo cuando la barra está transparente (ej. versión clara para fondos oscuros). Si no se selecciona, se usa el logo principal.',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'callToActionBtn',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 1,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
