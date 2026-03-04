import type { SanitizedConfig } from 'payload'
import payload from 'payload'

const ADMIN_EMAIL = 'acarrion@agenciamatch.cl'

export const script = async (config: SanitizedConfig): Promise<void> => {
  await payload.init({ config })

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: ADMIN_EMAIL } },
    limit: 1,
  })

  if (docs.length === 0) {
    payload.logger.warn(`No se encontró usuario con email ${ADMIN_EMAIL}. Crea el usuario primero en el backoffice.`)
    process.exit(1)
  }

  const user = docs[0]
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { role: 'admin' },
  })

  payload.logger.info(`Usuario ${ADMIN_EMAIL} actualizado a rol admin.`)
  process.exit(0)
}
