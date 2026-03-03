'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type FaqItem = {
  question?: string | null
  answer?: string | null
}

type Props = {
  titleSectionFaq?: DefaultTypedEditorState | null
  faqInformation?: FaqItem[] | null
  caption?: string | null
}

export const FaqBlockComponent: React.FC<Props> = (props) => {
  const { titleSectionFaq, faqInformation , caption} = props
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Columna 1: Título de la sección */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {caption && (
                <span className="caption">{caption}</span>             
            )}
            {titleSectionFaq && (
              <div className="text-brand-primary">
                <RichText data={titleSectionFaq} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>

          {/* Columna 2: Listado de preguntas y respuestas con toggle */}
          <div className="lg:col-span-7 flex flex-col">
            {faqInformation && faqInformation.length > 0 ? (
              faqInformation.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0 py-5"
                  >
                    {item.question && (
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full text-left flex items-center justify-between gap-4 group"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <h5 className="question-title pr-4"> 
                          {item.question}
                        </h5>
                        <Image
                          src={isOpen ? '/icons/icon-minus.svg' : '/icons/icon-plus.svg'}
                          alt=""
                          width={40}
                          height={40}
                          className="flex-shrink-0 bg-[#E6F4FF] rounded-full p-2 w-10 h-10"
                          aria-hidden
                          unoptimized
                        />
                      </button>
                    )}
                    {item.answer && (
                      <div
                        id={`faq-answer-${index}`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-[1000px]  opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-answer">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
