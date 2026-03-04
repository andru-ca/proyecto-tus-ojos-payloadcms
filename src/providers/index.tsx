import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { MenuLateralProvider } from './MenuLateral'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <MenuLateralProvider>{children}</MenuLateralProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
