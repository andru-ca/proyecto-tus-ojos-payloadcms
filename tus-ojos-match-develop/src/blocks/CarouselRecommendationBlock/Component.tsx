'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './styles.css'

type Recommendation = {
  titleSlider?: string | null
  descriptionSlider?: string | null
  imageSlider?: string | Media | null
  id?: string | null
}

type Props = {
  titleSectionSlider?: DefaultTypedEditorState | null
  recommendations?: Recommendation[] | null
  caption?: string | null
}

export const CarouselRecommendationBlock: React.FC<Props> = (props) => {
  const { recommendations, titleSectionSlider, caption } = props
  const swiperRef = useRef<SwiperType | null>(null)

  if (!recommendations || recommendations.length === 0) {
    return null
  }

  const totalSlides = recommendations.length
  // En desktop solo mostramos barra de paginación si hay 5+ slides; en mobile siempre visible
  const hidePaginationOnDesktop = totalSlides < 5

  return (
    <section className="relative w-full bg-brand-background">
        <div className="container py-12" data-aos="fade-up" data-aos-delay="500">
          <div className="flex flex-col gap-2">

          
          {caption && (
            <span className="caption">{caption}</span>
          )}
          {titleSectionSlider && (
            <div className="text-left text-brand-primary mb-8 md:mb-12 lg:mb-16 max-w-3/4">
              <RichText data={titleSectionSlider} enableGutter={false} enableProse={false} />
            </div>
          )}
       </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
        }}
        navigation={false}
        pagination={{
          clickable: true,
          el: '.carousel-recommendation-pagination',
        }}
        loop={totalSlides > 4}
        className="carousel-recommendation"
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {recommendations.map((recommendation) => {
          const sliderImage = recommendation.imageSlider as Media | undefined
          const sliderImageUrl = sliderImage?.url || null

          return (
            <SwiperSlide key={recommendation.id} style={{ height: '494px' }}>
              <div className="flex flex-col bg-white rounded-[16px] overflow-hidden  w-full h-full">
                <div className="flex flex-col gap-2 p-8 md:p-8 flex-shrink-0">
                  {recommendation.titleSlider && (
                    <h5 className="text-brand-primary text-lowercase font-bold text-[20px]">
                      {recommendation.titleSlider}
                    </h5>
                  )}
                  {recommendation.descriptionSlider && (
                    <p className="text-gray-700 text-sm">
                      {recommendation.descriptionSlider}
                    </p>
                  )}
                </div>
                {sliderImageUrl && sliderImage && (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="absolute bottom-[32px] left-0z-10 w-[258px] aspect-[584/604] carousel-recommendation__image-mask flex-shrink-0">
                      <Image
                        src={sliderImageUrl}
                        alt={sliderImage.alt || recommendation.titleSlider || 'Slider image'}
                        fill
                        sizes="258px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      
      {/* Contenedor para paginación y botones: siempre en DOM para que Swiper cree los bullets; en desktop se oculta con CSS si hay &lt;5 slides */}
      <div
        className={`flex items-center justify-between gap-4 mt-4 relative ${hidePaginationOnDesktop ? 'lg:hidden' : ''}`}
      >
        {/* Espacio izquierdo para centrar los bullets */}
        <div className="min-w-[100px] flex-shrink-0" aria-hidden="true" />
        {/* Contenedor para los bullets (Swiper lo rellena); clase única por instancia si hubiera varios carrusels */}
        <div className="carousel-pagination-container carousel-recommendation-pagination" />
          {/* Contenedor para ambas flechas a la derecha */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="carousel-custom-prev flex items-center justify-center w-12 h-12 bg-[rgba(135,141,150,0.12)] rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="Anterior"
            >
              <Image
                src="/icons/icon-arrow-slider.svg"
                alt="Anterior"
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="carousel-custom-next flex items-center justify-center w-12 h-12 bg-[rgba(135,141,150,0.12)] rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="Siguiente"
            >
              <Image
                src="/icons/icon-arrow-slider.svg"
                alt="Siguiente"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


