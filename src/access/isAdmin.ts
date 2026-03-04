import type { Access } from 'payload'

/** Solo usuarios con rol `admin`. */
export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}
