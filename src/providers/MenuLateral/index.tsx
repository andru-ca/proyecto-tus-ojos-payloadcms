'use client'

import React, { createContext, useCallback, useState } from 'react'
import { use } from 'react'

export interface MenuLateralContextType {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

const initialContext: MenuLateralContextType = {
  isOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  toggleMenu: () => {},
}

const MenuLateralContext = createContext<MenuLateralContextType>(initialContext)

export const MenuLateralProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const openMenu = useCallback(() => setIsOpen(true), [])
  const closeMenu = useCallback(() => setIsOpen(false), [])
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <MenuLateralContext.Provider value={{ isOpen, openMenu, closeMenu, toggleMenu }}>
      {children}
    </MenuLateralContext.Provider>
  )
}

export const useMenuLateral = (): MenuLateralContextType => use(MenuLateralContext)
