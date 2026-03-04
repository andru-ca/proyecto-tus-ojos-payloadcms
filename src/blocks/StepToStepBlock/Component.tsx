import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import './styles.css'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Media } from '@/payload-types'

type StepItem = {
  titleStep?: string | null
  descriptionStep?: string | null
  iconStep?: string | Media | null
}

type Props = {
  titleSectionStep?: DefaultTypedEditorState | null
  ImagenStep?: string | Media | null
  ListStep?: StepItem[] | null
  caption?: string | null
}

export const StepToStepBlock: React.FC<Props> = (props) => {
  const { titleSectionStep, ImagenStep, ListStep, caption } = props

  const stepImage = ImagenStep as Media | undefined
  const stepImageUrl = stepImage?.url || null

  return (
    <section className="relative w-full bg-brand-background">
      <div className="container py-16" data-aos="fade-up" data-aos-delay="500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 items-start pb-16">
        {/* Imagen a la izquierda con máscara de gota */}
        {stepImageUrl && stepImage && (
          <div className="relative w-full aspect-[584/604] step-to-step__image-mask">
            <Image
              src={stepImageUrl}
              alt={stepImage.alt || 'Step image'}
              fill
              sizes="(max-width: 584px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Lista de pasos a la derecha */}
        <div className="flex flex-col gap-2 md:gap-2 py-8">
<div className="flex flex-col gap-2"> 
          {caption && (
            <span className="caption">{caption}</span>
          )}
        {titleSectionStep && (
        <div className="text-left text-brand-primary mb-8 md:mb-6 lg:mb-6 px-4 md:px-6 lg:px-0 max-w-2xl mx-auto">
          <RichText data={titleSectionStep} enableGutter={false} enableProse={false} />
        </div>
      )}
</div>
          {ListStep && ListStep.map((step: StepItem, index: number) => {
            const iconMedia = typeof step.iconStep === 'object' && step.iconStep !== null ? step.iconStep as Media : undefined
            const iconUrl = iconMedia?.url ?? null

            return (
            <div key={index} className="flex flex-row gap-4 bg-white p-4 rounded-[16px]">
                {iconUrl && (
                  <div className="flex-shrink-0">
                    <Image
                      src={iconUrl}
                      alt={iconMedia?.alt ?? step.titleStep ?? 'Step icon'}
                      width={120}
                      height={104}
                      className="object-contain"
                    />
                  </div>
                )}

              <div className="flex flex-col gap-1 flex-1">
              <span className="text-brand-primary">0{index + 1}</span>
                {step.titleStep && (
                  <h3 className="font-bold text-brand-primary m-0">
                    {step.titleStep}
                  </h3>
                )}
                {step.descriptionStep && (
                  <p className="text-gray-700 m-0">
                    {step.descriptionStep}
                  </p>
                )}
              </div>
            </div>
            )
          })}
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
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  )
}

