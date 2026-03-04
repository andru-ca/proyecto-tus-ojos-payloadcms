'use client'

import React from 'react'
import { useMenuLateral } from '@/providers/MenuLateral'
import { MapPin } from 'lucide-react'

interface DondeComprarButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'text'
  showIcon?: boolean
}

export const DondeComprarButton: React.FC<DondeComprarButtonProps> = ({
  className = '',
  variant = 'default',
  showIcon = true,
}) => {
  const { openMenu } = useMenuLateral()

  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'text-blue-600 hover:bg-blue-50',
  }

  return (
    <button
      onClick={openMenu}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${variantClasses[variant]} ${className}`}
      type="button"
    >
      {showIcon && <MapPin className="w-5 h-5" />}
      Donde Comprar
    </button>
  )
}
