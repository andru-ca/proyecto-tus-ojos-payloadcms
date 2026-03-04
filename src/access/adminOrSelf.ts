import type { Access } from 'payload'

/**
 * Admin: acceso total.
 * Resto: solo al documento del usuario actual (por id).
 */
export const adminOrSelf: Access = ({ req }) => {
  if (req.user?.role === 'admin') return true
  if (!req.user?.id) return false
  return { id: { equals: req.user.id } }
}
