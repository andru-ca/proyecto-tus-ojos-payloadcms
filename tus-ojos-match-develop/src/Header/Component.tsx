import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

type HeaderProps = {
  /** Si se pasa desde el layout, evita doble fetch y garantiza mismo dato que MobileCTA */
  data?: Header
}

export async function Header({ data: initialData }: HeaderProps = {}) {
  const headerData: Header = initialData ?? (await getCachedGlobal('header', 1)())

  return <HeaderClient data={headerData} />
}
