'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'

type TabItem = {
  tabName?: string | null
  tabDescription?: DefaultTypedEditorState | null
  archiveDocuments?: (string | Media)[] | null
}

type Props = {
  caption?: string | null
  titleProductDetails?: DefaultTypedEditorState | null
  tabsInformation?: TabItem[] | null
  image?: string | Media | null
}

export const ProductDetailsBlockComponent: React.FC<Props> = (props) => {
  const { caption, titleProductDetails, tabsInformation, image } = props
  const [activeTab, setActiveTab] = useState<number>(0)

  const media = image as Media | undefined
  const imageUrl = media?.url ?? null


  return (
    <section className="relative w-full bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-3 items-stretch">
          {/* Columna 1: caption, título y tabs — mínimo 680px */}
          <div className="lg:col-span-6 flex flex-col gap-6 bg-gray-100 p-8 rounded-3xl min-h-[680px]">
            <div className="flex flex-col gap-2">
            {caption && (
              <span className="caption">{caption}</span>
            )}
            {titleProductDetails && (
              <div className="text-brand-primary">
                <RichText data={titleProductDetails} enableGutter={false} enableProse={false} />
              </div>
            )}
            </div>
            {tabsInformation && tabsInformation.length > 0 && (
              <div className="flex flex-col gap-6 min-h-0 flex-1">
                {/* Mobile: selector */}
                <div className="md:hidden w-full">
                  <label htmlFor="product-details-tab-select" className="sr-only">
                    Seleccionar sección
                  </label>
                  <select
                    id="product-details-tab-select"
                    value={activeTab}
                    onChange={(e) => setActiveTab(Number(e.target.value))}
                    className="label-tab w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 bg-white text-gray-800 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0063B5] focus:border-transparent bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    }}
                    aria-label="Seleccionar sección"
                  >
                    {tabsInformation.map((tab, index) => (
                      <option key={index} value={index}>
                        {tab.tabName ?? `Opción ${index + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Desktop: botones tipo tab */}
                <div className="hidden md:flex flex-wrap justify-between gap-1 border-b border-gray-200 bg-gray-200 rounded-full p-1">
                  {tabsInformation.map((tab, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveTab(index)}
                      className={`label-tab px-5 py-3 rounded-full transition-colors ${
                        activeTab === index
                          ? 'bg-white text-brand-primary'
                          : 'text-gray-700'
                      }`}
                    >
                      {tab.tabName}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col flex-1 min-h-0 gap-4">
                  <div className="text-gray-700 text-sm md:text-base leading-relaxed flex-1 min-h-0 overflow-auto">
                    {tabsInformation[activeTab]?.tabDescription &&
                      typeof tabsInformation[activeTab].tabDescription === 'object' &&
                      tabsInformation[activeTab].tabDescription !== null &&
                      'root' in tabsInformation[activeTab].tabDescription && (
                        <RichText
                          data={tabsInformation[activeTab].tabDescription}
                          enableGutter={false}
                          enableProse={false}
                        />
                      )}
                  </div>

                  {tabsInformation[activeTab]?.archiveDocuments &&
                    tabsInformation[activeTab].archiveDocuments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {tabsInformation[activeTab].archiveDocuments.map((doc, docIndex) => {
                          const document = typeof doc === 'string' ? null : (doc as Media)
                          if (!document) return null
                          return (
                            <a
                              key={docIndex}
                              href={document.url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-4 bg-transparent border border-[#0063B5] rounded-full"
                            >
                              <span>Descargar Folleto</span>
                              <Image
                                src="/icons/icon-download.svg"
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                                aria-hidden
                                unoptimized
                              />
                            </a>
                          )
                        })}
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Columna 2: imagen — mínimo 680px, misma altura que la columna de contenido en desktop */}
          <div className="lg:col-span-6 relative w-full min-h-[680px] rounded-3xl overflow-hidden lg:h-full">
            {imageUrl && media && (
              <Image
                src={imageUrl}
                alt={media.alt ?? 'Detalle de producto'}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
        {/* Curva inferior */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg 
          className="relative block w-full h-[100px] md:h-[150px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 180" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 Q600,180 1200,0 L1200,180 L0,180 Z" 
            fill="#F0F5F5"
          />
        </svg>
      </div>
    </section>
  )
}
