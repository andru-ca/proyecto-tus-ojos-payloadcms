import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import RichText from '@/components/RichText'
import './styles.css'

type Props = {
  heading?: string | null
  description?: string | null
  backgroundImage?: string | Media | null
  blockType?: 'callToAction'
  cards?: {
    titleCard?: string | null
    id?: string | null
    editorCardHTML?: DefaultTypedEditorState | null   
  }[] | null
}

export const CallToActionBlock: React.FC<Props> = ({
  heading,
  description,
  backgroundImage,
  cards,
}) => {
  const bgImage = backgroundImage as Media | undefined
  const bgImageUrl = bgImage?.url || null

  return (
    <section className="call-to-action-block w-full bg-brand-background py-16">
      <div className="container relative w-full min-h-[732px] md:min-h-[500px] lg:min-h-[310px] flex flex-col" data-aos="fade-up" data-aos-delay="500" >
        {/* Imagen de Fondo */}
        {bgImageUrl && bgImage && (
          <div className="absolute left-4 right-4 md:left-8 md:right-8 top-0 bottom-0 z-0 overflow-hidden rounded-[24px] md:rounded-[32px] lg:rounded-[48px]">
            <Image
              src={bgImageUrl}
              alt={bgImage.alt || 'Background'}
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover"
              priority
            />

            {/* Overlay oscuro */}
            <div className="absolute inset-0 z-5 bg-black/40"></div>

            {/* Patrón de puntos */}
            <div className="pointer-events-none absolute z-10 inset-0 opacity-70 mix-blend-overlay bg-[url('/icons/noise-dot.svg')] bg-[size:3rem_3rem] bg-repeat"></div>
          </div>
        )}

      {/* Contenido */}
      <div className="flex flex-col md:grid md:grid-cols-2 lg:justify-items-start lg:items-center justify-end md:items-end gap-8 md:gap-12 lg:gap-16 relative z-20 w-full max-w-7xl mx-auto px-6  py-8 md:py-12 lg:py-24 h-full min-h-[732px] md:min-h-0">
        <div className="text-left md:max-w-[367px]">
          {heading && (
            <h2>{heading}</h2>
          )}
          {description && (
            <p className="text-white text-sm md:text-base">
              {description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 w-full justify-items-end self-end">
            {cards && cards.map((card) => (
                <div key={card.id} className="flex flex-col gap-3 md:gap-4 rounded-[12px] md:rounded-[16px] bg-black/50 backdrop-blur-[22px] p-4 md:p-5 max-w-full md:max-w-[321px] w-full md:w-auto">
                    <h5 className="text-white">{card.titleCard}</h5>
                    {card.editorCardHTML && (
                      <div className="text-white">
                        <RichText data={card.editorCardHTML} enableGutter={false} enableProse={false} />
                      </div>
                    )}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  )
}
