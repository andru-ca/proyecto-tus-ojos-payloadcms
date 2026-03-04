'use client'
import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { MenuLateral } from '@/payload-types'

// RowLabel para Farmacias (DryOff y RedOff usan la misma estructura)
type FarmaciaItem = NonNullable<MenuLateral['dryOffFarmacias']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<FarmaciaItem>()
  const label = data?.data?.nombre
    ? `${data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''}${data?.data?.nombre}`
    : 'Sin nombre'
  return <div>{label}</div>
}
