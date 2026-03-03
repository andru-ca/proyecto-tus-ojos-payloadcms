import type { Block } from 'payload'
import { link } from '@/fields/link'

export const HeaderProductoBlock: Block = {
  slug: 'headerProducto',
  interfaceName: 'HeaderProductoBlock',
  labels: {
    plural: 'Header Producto Blocks',
    singular: 'Header Producto Block',
  },
  imageURL: '/images/thumb/HeaderProductoBlock.png', // 👈 imagen de portada en el admin
  imageAltText: 'Vista previa de Header Producto Block',


  fields: [
    {
      name: 'icon',
      type: 'upload',
      label: 'Icono',
      relationTo: 'media',
      admin: {
        description: 'Icono pequeño en la esquina superior izquierda',
      },
    },
    {
      name: 'titleProduct',
      type: 'text',
      label: 'Título del Producto',
      required: true,
      admin: {
        description: 'Título del producto',
      },
    },
  
    {
      name: 'logoProduct',
      type: 'upload',
      label: 'Logotipo del Producto',
      relationTo: 'media',
      admin: {
        description: 'Logotipo del producto',
      },
    },
    {
      name: 'symptoms',
      type: 'array',
      label: 'Síntomas/Tags',
      admin: {
        description: 'Tags de síntomas que trata el producto',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto del Síntoma',
          required: true,
        },
      ],
    },

    {
      name: 'productBoxImage',
      type: 'upload',
      label: 'Imagen de la Caja del Producto',
      relationTo: 'media',
      admin: {
        description: 'Imagen de la caja del producto',
      },
    },
 {
  name:'principioActivo',
  type:'text',
  label: 'Principio Activo',
  required: true,
  admin: {
    description: 'Principio activo del producto',
  },
 },
 {
  name:'formaPresentacion',
  type:'text',
  label: 'Forma y presentación',
  required: true,
  admin: {
    description: 'Forma Farmacéutica y presentación',
  },
 },
 {
  name:'dosis',
  type:'text',
  label: 'Dosis',
  required: true,
  admin: {
    description: 'Dosis del producto', 
  },
 },
    link({
      overrides: {
        name: 'buyButton',
        label: 'Botón de Compra',
      },
    }),
  ],
}
