'use client'

import React from 'react'
import type { Header } from '@/payload-types'
import { useMenuLateral } from '@/providers/MenuLateral'

interface MobileCTAProps {
  data: Header
}

/**
 * Botón CTA flotante en mobile, visible en todo el sitio.
 * Usa el mismo global "header" que el Header para mantener un solo lugar de configuración.
 */
export function MobileCTA({ data }: MobileCTAProps) {
  const { openMenu } = useMenuLateral()
  const ctaItems = data?.callToActionBtn ?? []

  if (ctaItems.length === 0) return null

  return (
    <div className="fixed bottom-6 right-4 z-40 md:hidden flex justify-end pointer-events-auto">
      {ctaItems.map(({ link }, i) => {
        const label = link?.label
        return (
          <button
            key={i}
            type="button"
            onClick={openMenu}
            className="py-4 px-6 rounded-full text-base font-medium transition-all hover:opacity-90 bg-[#007FE8] text-white shadow-lg whitespace-nowrap"
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
