'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import './styles.css'

import type { MenuLateral, Media } from '@/payload-types'

interface MenuLateralClientProps {
  data: MenuLateral
  isOpen: boolean
  onClose: () => void
}

const TABS_UI = [
  { slug: 'dryoff', nombre: 'DryOff' },
  { slug: 'redoff', nombre: 'RedOff' },
] as const

export const MenuLateralClient: React.FC<MenuLateralClientProps> = ({ data, isOpen, onClose }) => {
  const [tabActiva, setTabActiva] = useState<string>('dryoff')

  // Farmacias según la pestaña activa (DryOff o RedOff)
  const farmaciasFiltradas =
    tabActiva === 'dryoff'
      ? (data.dryOffFarmacias ?? [])
      : (data.redOffFarmacias ?? [])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[60] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between p-6">
            <div>
              <div className="title-menu-lateral">{data.titulo}</div>
              <p className="subtitle-menu-lateral mt-1">{data.subtitulo}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-[#E6F4FF] hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" color="#0063B5" />
            </button>
          </div>

          {/* Tabs DryOff / RedOff */}
          <div className="px-6 pt-4 inline-block w-full">
            <div className="flex  p-1 rounded-full bg-[#F1F1F2]">
              {TABS_UI.map((tab) => (
                <button
                  key={tab.slug}
                  onClick={() => setTabActiva(tab.slug)}
                  className={`py-3 px-5 rounded-full text-base font-medium transition-all ${
                    tabActiva === tab.slug ? 'text-[#0063B5]' : 'text-[#002330] hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: tabActiva === tab.slug ? '#FFFFFF' : 'transparent',
                    width: '50%',
                  }}
                >
                  {tab.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de farmacias */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
            <div className="flex flex-col gap-2">
              {farmaciasFiltradas && farmaciasFiltradas.length > 0 ? (
                farmaciasFiltradas.map((farmacia, index) => {
                  const logo = farmacia.logo as Media | undefined
                  const logoUrl = logo?.url || ''

                  return (
                    <a
                      key={index}
                      href={farmacia.url || '#'}
                      target={farmacia.abrirEnNuevaTab ? '_blank' : '_self'}
                      rel={farmacia.abrirEnNuevaTab ? 'noopener noreferrer' : undefined}
                      className="items-farmacias flex items-center justify-between p-4 bg-[#F0F5F5] hover:bg-gray-100 rounded-[20px] transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        {logoUrl && logo && (
                          <div className="w-12 h-12 relative flex-shrink-0  rounded-lg p-2">
                            <Image
                              src={logoUrl}
                              alt={logo.alt || farmacia.nombre || 'Logo farmacia'}
                              width={48}
                              height={48}
                              className="object-contain w-full h-full"
                              unoptimized={logoUrl.endsWith('.svg')}
                            />
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{farmacia.nombre}</span>
                      </div>
                      <div 
                        className="flex items-center justify-center"
                        style={{
                          padding: '15px',
                        }}
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

<path d="M17.7352 7.45493L6.10448 19.0857C5.93981 19.2503 5.74546 19.3317 5.52143 19.3297C5.29741 19.328 5.10169 19.2434 4.93429 19.076C4.76688 18.9086 4.68232 18.7129 4.68061 18.4889C4.67863 18.2648 4.75997 18.0705 4.92464 17.9058L16.5554 6.2751L8.49005 6.2086C8.2581 6.20669 8.06443 6.12663 7.90906 5.96843C7.75383 5.81009 7.67514 5.60994 7.67302 5.36797C7.67915 5.134 7.75607 4.93909 7.90378 4.78326C8.05149 4.62742 8.24639 4.5505 8.48849 4.5525L18.3809 4.63405C18.527 4.63526 18.6557 4.66187 18.7671 4.71388C18.8785 4.76577 18.9816 4.8391 19.0764 4.93388C19.1712 5.02866 19.2445 5.13178 19.2964 5.24323C19.3484 5.35456 19.375 5.4833 19.3762 5.62944L19.4578 15.5218C19.4596 15.7379 19.3826 15.9263 19.2269 16.087C19.0712 16.2477 18.8763 16.3312 18.6423 16.3373C18.4004 16.3352 18.2003 16.255 18.042 16.0968C17.8837 15.9384 17.8034 15.7382 17.8013 15.4963L17.7352 7.45493Z" fill="#0063B5"/>


</svg>
                      </div>
                    </a>
                  )
                })
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No hay farmacias disponibles en esta categoría
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
