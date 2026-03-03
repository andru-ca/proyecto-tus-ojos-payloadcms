import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { CardsBlock as CardsBlockProps, Media } from '@/payload-types'
import './styles.css'

type Props = CardsBlockProps

export const CardsBlock: React.FC<Props> = (props) => {
  const { cardsInformation, titleSectionCards, caption } = props

  return (
    <section className="cards-block relative w-full">
      <div className="container py-12" data-aos="fade-up" data-aos-delay="500">
<div className="flex flex-col gap-2 text-center">

{caption && (
        <span className="caption">{caption}</span>
      )}

      
      {titleSectionCards && (
        <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4 md:px-6 lg:px-0 max-w-1/2 mx-auto">
          <RichText data={titleSectionCards} enableGutter={false} enableProse={false} />
        </div>
      )}
      </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-2 lg:gap-2">
          {cardsInformation && cardsInformation.map((card, index) => {
          const bgImage = card.backgroundCard as Media | undefined
          const bgImageUrl = bgImage?.url || null
          const hasBackground = Boolean(bgImageUrl && bgImage)
          
          const cardImage = card.ImagenCards as Media | undefined
          const cardImageUrl = cardImage?.url || null
          
          const cardLogo = card.ImagenCardLogo as Media | undefined
          const cardLogoUrl = cardLogo?.url || null

          return (
            <div
              key={card.id}
              data-card-index={index}
              className="relative flex flex-col gap-2 md:gap-2 rounded-[20px] md:rounded-[20px] px-8 md:px-8 py-10 md:py-10 w-full overflow-hidden min-h-[698px]"
            >
              {/* Imagen de fondo */}
              {hasBackground && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={bgImageUrl!}
                    alt={bgImage?.alt || 'Card background'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-cover opacity-20"
                  />
                  {/* Overlay oscuro para mejorar legibilidad */}
                  <div className="absolute inset-0 bg-gray-100/50 z-[1]"></div>
                </div>
              )}
              
              {/* Logotipo - posición arriba izquierda */}
              {cardLogoUrl && cardLogo && (
                <div className="absolute top-8 left-8 z-20">
                  <Image
                    src={cardLogoUrl}
                    alt={cardLogo.alt || 'Logotipo Producto'}
                    width={95}
                    height={27}
                    className="max-w-[95px] h-auto"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              )}
              
              {/* Icono SVG - posición arriba derecha */}
              <div className="absolute top-8 right-8 z-20">
                <Image 
                  src="/icons/icon-card.svg" 
                  alt="Icon card" 
                  width={24} 
                  height={70} 
                  sizes="100vw"
                  style={{ width: 'auto', height: '70px' }}
                  className="w-auto"
                  unoptimized
                />
              </div>
              
              {/* Contenido */}
              <div className={`relative z-10 flex flex-col items-center justify-end gap-8 md:gap-8 h-full ${hasBackground ? 'text-black' : 'text-black'}`}>
                {cardImageUrl && cardImage && (
                  <div className="relative w-full max-w-[400px] h-[400px] mb-4">
                    <Image
                      src={cardImageUrl}
                      alt={cardImage.alt || 'Card image'}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain"
                    />
                  </div>
                )}



                {card.titleCardHTML && (
                  <div>
                    <RichText data={card.titleCardHTML} enableGutter={false} enableProse={false} />
                  </div>
                )}
                {card.buttonCard && (
                  <div>
                    <CMSLink {...card.buttonCard} />
                  </div>
                )}
              </div>
              
              {/* Fallback si no hay imagen de fondo */}
              {!hasBackground && (
                <div className="absolute inset-0 bg-gray-100 -z-10 rounded-[12px] md:rounded-[16px]"></div>
              )}
            </div>
          )
        })}
      </div>
      </div>
    </section>
  )
}

