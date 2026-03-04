'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import type { InstagramPost, InstagramProfile } from '@/lib/instagram'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import './styles.css'

const PLACEHOLDER_SLIDES = 6

type Props = {
  posts: InstagramPost[]
  profile?: InstagramProfile | null
  caption?: string | null
  titleSection?: DefaultTypedEditorState | null
}

export function InstagramFeedSlider({ posts, profile, caption, titleSection }: Props) {
  const swiperRef = useRef<SwiperType | null>(null)
  const hasPosts = Array.isArray(posts) && posts.length > 0
  const slides = hasPosts ? posts : Array.from({ length: PLACEHOLDER_SLIDES }, (_, i) => i)

  return (
    <section className="instagram-feed container mx-auto py-12" data-aos="fade-up" data-aos-delay="500">
      <div className="flex flex-col gap-2 w-3/4 md:w-1/2">
        {caption && (
          <span className="caption">{caption}</span>
        )}

        {titleSection && (
          <div className="mb-8">
            <RichText data={titleSection} enableGutter={false} enableProse={false} />
          </div>
        )}
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={8}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 16,
          },
        }}
        navigation={false}
        pagination={{
          clickable: true,
          el: '.instagram-feed-pagination-container',
        }}
        loop={slides.length > 5}
        className="instagram-feed-swiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        {slides.map((slide, index) => {
          if (hasPosts && typeof slide !== 'number') {
            const post = slide as InstagramPost
            const imageUrl =
              post.media_type === 'VIDEO'
                ? post.thumbnail_url ?? post.media_url
                : post.media_url

            return (
              <SwiperSlide key={post.id}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden block h-full w-full rounded-3xl"
                >
                  <Image
                    src={imageUrl}
                    alt={post.caption ?? 'Instagram post'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover overflow-hidden transition-transform duration-300 group-hover:scale-105"
                  />

                  {post.username && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end pointer-events-none">
                      <div className="flex flex-row absolute top-6 left-6 z-10 gap-2 items-center">
                        {profile?.profile_picture_url && (
                          <Image
                            src={profile.profile_picture_url}
                            alt={profile.username}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        )}
                        <div className="text-white flex flex-col">
                          <span className="flex flex-row items-center gap-2">
                            @{post.username}
                            <Image src="/images/icon-verified.png" alt="Instagram" width={20} height={20} />
                          </span>
                          <span className="text-xs text-white/50">{profile?.followers_count} seguidores</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {post.media_type === 'VIDEO' && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-5 h-5 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </a>
              </SwiperSlide>
            )
          }

          // Placeholder: misma estructura de slide, contenido reemplazado
          return (
            <SwiperSlide key={`placeholder-${index}`}>
              <div className="relative overflow-hidden block h-full w-full rounded-3xl bg-[#F0F5F5]">
                {/* Placeholder imagen/video */}
                <div className="absolute inset-0 flex items-center justify-center">

                </div>

                {/* Overlay con placeholders: foto perfil, usuario, seguidores */}
                <div className="absolute inset-0 bg-[#F0F5F5] flex flex-col justify-end pointer-events-none">
                  <div className="flex flex-row absolute top-6 left-6 z-10 gap-2 items-center">
                    <div
                      className="w-10 h-10 rounded-full bg-white flex-shrink-0"
                      aria-hidden
                    />
                    <div className="text-white flex flex-col gap-1">
                      <span className="flex flex-row items-center gap-2">
                        <span className="h-4 w-20 bg-white rounded" aria-hidden />
                      </span>
                      <span className="h-3 w-16 bg-white rounded text-xs" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Contenedor para paginación y botones de navegación en una línea (igual que CarouselRecommendationBlock) */}
      <div className="flex items-center justify-between gap-4 mt-4 relative">
        <div className="min-w-[100px] flex-shrink-0" />
        <div className="instagram-feed-pagination-container" />
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex items-center justify-center w-12 h-12 bg-[rgba(135,141,150,0.12)] rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
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
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex items-center justify-center w-12 h-12 bg-[rgba(135,141,150,0.12)] rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
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
    </section>
  )
}
