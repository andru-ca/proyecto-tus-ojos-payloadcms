import type { PayloadRequest } from 'payload'

/**
 * Quién puede acceder al panel de administración (backoffice).
 * Solo roles admin y editor. Retorna solo boolean (requerido por access.admin).
 */
export const canAccessAdmin = ({ req }: { req: PayloadRequest }): boolean => {
  return req.user?.role === 'admin' || req.user?.role === 'editor'
}
