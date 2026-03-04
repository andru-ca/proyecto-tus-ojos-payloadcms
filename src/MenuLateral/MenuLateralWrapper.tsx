'use client'
import React from 'react'
import { useMenuLateral } from '@/providers/MenuLateral'
import { MenuLateralClient } from './Component.client'

import type { MenuLateral } from '@/payload-types'

interface MenuLateralWrapperProps {
  data: MenuLateral
}

export const MenuLateralWrapper: React.FC<MenuLateralWrapperProps> = ({ data }) => {
  const { isOpen, closeMenu } = useMenuLateral()

  return <MenuLateralClient data={data} isOpen={isOpen} onClose={closeMenu} />
}
