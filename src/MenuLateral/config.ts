import type { GlobalConfig } from 'payload'

import { revalidateMenuLateral } from './hooks/revalidateMenuLateral'

export const MenuLateral: GlobalConfig = {
  slug: 'menuLateral',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'titulo',
              type: 'text',
              required: true,
              defaultValue: 'Compra Online',
              admin: {
                description: 'Título principal del menú lateral',
              },
            },
            {
              name: 'subtitulo',
              type: 'text',
              required: true,
              defaultValue: 'Encuentra tus productos en las siguientes farmacias',
              admin: {
                description: 'Subtítulo descriptivo del menú',
              },
            },
          ],
        },
        {
          label: 'DryOff',
          description: 'Listado de farmacias para el producto DryOff.',
          fields: [
            {
              name: 'dryOffFarmacias',
              type: 'array',
              label: 'Farmacias DryOff',
              admin: {
                description: 'Farmacias donde se puede comprar DryOff',
                initCollapsed: true,
                components: {
                  RowLabel: '@/MenuLateral/RowLabel#RowLabel',
                },
              },
              fields: [
                { name: 'nombre', type: 'text', required: true, admin: { description: 'Nombre de la farmacia' } },
                { name: 'logo', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Logo' } },
                { name: 'url', type: 'text', required: true, admin: { description: 'URL del sitio web' } },
                { name: 'abrirEnNuevaTab', type: 'checkbox', defaultValue: true, label: 'Abrir en nueva pestaña' },
              ],
            },
          ],
        },
        {
          label: 'RedOff',
          description: 'Listado de farmacias para el producto RedOff.',
          fields: [
            {
              name: 'redOffFarmacias',
              type: 'array',
              label: 'Farmacias RedOff',
              admin: {
                description: 'Farmacias donde se puede comprar RedOff',
                initCollapsed: true,
                components: {
                  RowLabel: '@/MenuLateral/RowLabel#RowLabel',
                },
              },
              fields: [
                { name: 'nombre', type: 'text', required: true, admin: { description: 'Nombre de la farmacia' } },
                { name: 'logo', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Logo' } },
                { name: 'url', type: 'text', required: true, admin: { description: 'URL del sitio web' } },
                { name: 'abrirEnNuevaTab', type: 'checkbox', defaultValue: true, label: 'Abrir en nueva pestaña' },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateMenuLateral],
  },
}
