import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'
import './styles.css'

type GalleryItem = {
  imageProductInfo?: string | Media | null
}

type Props = {
  caption?: string | null
  titleProductInfo?: DefaultTypedEditorState | null
  descriptionProductInfo?: DefaultTypedEditorState | null
  galleryProductInfo?: GalleryItem[] | null
}

export const ProductInfoBlockComponent: React.FC<Props> = (props) => {
  const { caption, titleProductInfo, descriptionProductInfo, galleryProductInfo } = props

  return (
    <section className="product-info-block relative w-full bg-white py-16 md:py-8">
      <div className="container px-4">

         {/* Caption */}
         {caption && (
            <span className="caption mb-2">{caption}</span>
          )}
        <div className="flex flex-col gap-2 md:gap-12">
          {/* Título */}
          {titleProductInfo && (
            <div className="text-brand-primary">
              <RichText data={titleProductInfo} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Descripción alineada a la derecha */}
          {descriptionProductInfo && (
            <div className="ml-auto lg:w-1/2">
              <RichText data={descriptionProductInfo} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Galería: desktop = solo 2ª imagen ovalada; mobile = 2ª y 3ª ovaladas */}
          {galleryProductInfo && galleryProductInfo.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-0 py-16">
              {galleryProductInfo.map((item, index) => {
                const imageMedia = item.imageProductInfo as Media | undefined
                const imageUrl = imageMedia?.url ?? null
                const isOvalMobile = index === 1 || index === 2
                const isOvalDesktop = index === 1
                const shapeClass = [
                  'relative overflow-hidden rounded-full',
                  isOvalMobile ? 'w-[221px] h-[121px]' : 'w-[121px] h-[121px]',
                  isOvalDesktop ? 'md:w-[418px] md:h-[298px]' : 'md:w-[298px] md:h-[298px]',
                ].join(' ')

                if (!imageUrl || !imageMedia) return null

                return (
                  <div key={index} className={shapeClass}>
                    <Image
                      src={imageUrl}
                      alt={imageMedia.alt ?? `Imagen ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
