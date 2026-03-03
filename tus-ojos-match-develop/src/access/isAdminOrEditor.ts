import type { Access } from 'payload'

/** Usuarios con rol `admin` o `editor` (acceso a contenido del backoffice). */
export const isAdminOrEditor: Access = ({ req }) => {
  return req.user?.role === 'admin' || req.user?.role === 'editor'
}
