import React from 'react'
import Image from 'next/image'
import type { Media, HeroGotasBlock } from '@/payload-types'



type Props = HeroGotasBlock

export const HeroGotasComponent: React.FC<Props> = ({
  backgroundImage,
  mainTitle,
  gotasImage,
  leftTags,
  rightTags,
}) => {
  const bgImage = backgroundImage as Media | undefined
  const bgImageUrl = bgImage?.url || null

  const gotas = gotasImage as Media | undefined
  const gotasUrl = gotas?.url || null

  // Dividir el título en líneas específicas
  const getTitleLines = (title: string | null | undefined): string[] => {
    if (!title) return []
    const words = title.split(' ')
    
    // Si hay exactamente 4 palabras, agrupa las últimas 2
    if (words.length === 4) {
      return [words[0], words[1], `${words[2]} ${words[3]}`]
    }
    
    return words
  }

  const titleLines = getTitleLines(mainTitle)

  // Translate-x distinto por tag (izquierda: positivo; derecha: negativo)
  const leftTagTranslate = [
    'translate-x-16 lg:translate-x-12 xl:translate-x-12',
    'translate-x-6 lg:translate-x-6 xl:translate-x-6',
    'translate-x-16 lg:translate-x-12 xl:translate-x-12',
  ]
  const rightTagTranslate = [
    '-translate-x-12 lg:-translate-x-12 xl:-translate-x-12',
    '-translate-x-6 lg:-translate-x-6 xl:-translate-x-6',
    '-translate-x-12 lg:-translate-x-12 xl:-translate-x-12',
  ]

  return (
    <section className="relative w-full min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-x-hidden">
      {/* Imagen de Fondo */}
      {bgImageUrl && bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImageUrl}
            alt={bgImage.alt || 'Background'}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Layout de 3 Columnas */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-8 py-20 min-w-0">
        <div className="grid grid-cols-12 items-center min-h-[600px] min-w-0">
          
          {/* Columna Izquierda - Tags (más cerca del centro) */}
          <div className="col-span-2 col-start-1 flex flex-col justify-around items-end h-[80%] py-20" data-aos="fade-left" data-aos-delay="800">
            {leftTags && leftTags.length > 0 && leftTags.map((tag, index) => (
              <div
                key={index}
                className={`md:block hidden px-5 py-3 rounded-full bg-white/50 backdrop-blur-sm text-[#4D5358] text-base font-medium whitespace-nowrap ${leftTagTranslate[index % leftTagTranslate.length]}`}
              >
                {tag.text}
              </div>
            ))}
          </div>

          {/* Columna Central - Título + Gotas */}
          <div className="md:col-span-8 md:col-start-3  col-span-12 col-star-1 relative flex items-center justify-center min-w-0">
            <div className="relative w-full min-w-0 max-w-full">
              {/* Título dividido en líneas */}
              <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                {titleLines.map((line, index) => (
                  <div key={index} className="heading-hero text-white uppercase">
                    {line}
                  </div>
                ))}
              </div>

              {/* Imagen de Gotas superpuesta */}
              {gotasUrl && gotas && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] lg:max-w-[650px]" data-aos="fade-up" data-aos-delay="500" >
                  <Image
                    src={gotasUrl}
                    alt={gotas.alt || 'Gotas'}
                    width={gotas.width || 600}
                    height={gotas.height || 400}
                    className="object-contain drop-shadow-2xl"
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha - Tags (más cerca del centro) */}
          <div className="col-span-2 col-start-11 flex flex-col justify-around items-start h-[80%] py-20" data-aos="fade-right" data-aos-delay="800">
            {rightTags && rightTags.length > 0 && rightTags.map((tag, index) => (
              <div
                key={index}
                className={`md:block hidden px-5 py-3 rounded-full bg-white/50 backdrop-blur-sm text-[#005373] text-base font-medium whitespace-nowrap ${rightTagTranslate[index % rightTagTranslate.length]}`}
              >
                {tag.text}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg 
          className="relative block w-full h-[100px] md:h-[150px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 180" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 Q600,180 1200,0 L1200,180 L0,180 Z" 
            fill="#F0F5F5"
          ></path>
        </svg>
      </div>
    </section>
  )
}
