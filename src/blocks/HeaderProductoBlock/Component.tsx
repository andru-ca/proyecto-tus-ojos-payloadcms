import React from 'react'
import Image from 'next/image'
import type { HeaderProductoBlock as HeaderProductoBlockProps, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type Props = HeaderProductoBlockProps

export const HeaderProductoBlock: React.FC<Props> = (props) => {
  const {
    icon,
    titleProduct,
    logoProduct,
    symptoms,
    productBoxImage,
    principioActivo,
    formaPresentacion,
    dosis,
    buyButton,
  } = props

  const iconMedia = icon as Media | undefined
  const iconUrl = iconMedia?.url || null

  const logoProductMedia = logoProduct as Media | undefined
  const logoProductUrl = logoProductMedia?.url || null

  const boxImage = productBoxImage as Media | undefined
  const boxImageUrl = boxImage?.url || null



  return (
    <section className="relative w-full bg-brand-background pb-[100px] md:pb-[150px]">
      <div className="container mx-auto pt-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 items-center my-10">
          
          {/* Columna Izquierda - Contenido */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            {/* Icono */}
            {iconUrl && iconMedia && (
              <div>
                <Image
                  src={iconUrl}
                  alt={iconMedia.alt || 'Icon'}
                  width={62}
                  height={24}
                  className="object-contain"
                  style={{ width: '62px', height: 'auto' }}
                />
              </div>
            )}

            {/* Headline */}
            {titleProduct && (
              <h1 className="text-brand-primary mb-1">
                {titleProduct}
              </h1>
            )}

            {/* Logotipo del Producto */}
            {logoProduct && logoProductUrl && (
              <div className="mb-12">
                <Image
                  src={logoProductUrl}
                  alt={logoProductMedia?.alt || 'Logo'}
                  width={213}
                  height={62}
                  className="object-contain"
                  style={{ width: '213px', height: 'auto' }}
                />
              </div>
            )}


            {/* Tags de Síntomas */}
            {symptoms && symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 rounded-full bg-[rgba(135,141,150,0.12)] backdrop-blur-md"
                  >
                    {symptom.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Columna Central - Imágenes del Producto */}
          <div className="lg:col-span-1 relative flex justify-center items-center min-h-[400px] order-1 lg:order-2">
            {/* Contenedor con position relative para Image fill; ancho completo de la columna */}
            {boxImageUrl && boxImage && (
              <div className="relative w-full min-h-[350px] md:min-h-[480px]">
                <Image
                  src={boxImageUrl}
                  alt={boxImage.alt || 'Product box'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Columna Derecha - Información y CTA */}
          <div className="lg:col-span-1 space-y-4 order-3 lg:order-3">
            <div className="grid grid-cols-2 gap-[5px]">
              {/* Tarjetas de Información: 2 columnas las dos primeras, tercera a ancho completo */}
              {principioActivo && (
                <div className="flex flex-col justify-between gap-2 bg-white rounded-lg p-4 min-w-0">
                  <h5 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Principio Activo:</h5>
                  <p className="text-gray-800">{principioActivo}</p>
                </div>
              )}
              {formaPresentacion && (
                <div className="flex flex-col justify-between gap-2 bg-white rounded-lg p-4 min-w-0">
                  <h5 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Forma Farmacéutica y presentación:</h5>
                  <p className="text-gray-800">{formaPresentacion}</p>
                </div>
              )}
              {dosis && (
                <div className="col-span-2 flex flex-col justify-between gap-2 bg-white rounded-lg p-4 min-w-0">
                  <h5 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Dosis:</h5>
                  <p className="text-gray-800">{dosis}</p>
                </div>
              )}
            </div>
            {/* Botón de Compra */}
            {buyButton && (
              <div className="pt-4 hidden md:block">
                <CMSLink
                  {...buyButton}
                  className="py-4 px-6 rounded-full bg-brand-btnPrimary text-white"
                >
                </CMSLink>
              </div>
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
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
