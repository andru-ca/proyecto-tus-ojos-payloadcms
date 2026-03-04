import { MenuLateralWrapper } from './MenuLateralWrapper'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { MenuLateral } from '@/payload-types'

export async function MenuLateral() {
  const menuLateralData = (await getCachedGlobal('menuLateral', 1)()) as MenuLateral

  return <MenuLateralWrapper data={menuLateralData} />
}
