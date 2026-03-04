import type { CollectionConfig } from 'payload'

import { adminOrSelf } from '../../access/adminOrSelf'
import { canAccessAdmin } from '../../access/canAccessAdmin'
import { isAdmin } from '../../access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: canAccessAdmin,
    create: isAdmin,
    delete: isAdmin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      saveToJWT: true,
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
      admin: {
        position: 'sidebar',
        description: 'Solo los admins pueden cambiar el rol.',
      },
    },
  ],
  timestamps: true,
}
