import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock as CTABlock } from '@/blocks/CallToAction/Component'
import { CallToActionBlock } from '@/blocks/CallToActionBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroGotasComponent } from '@/blocks/HeroGotas/Component'
import { CarruselTabComponent } from '@/blocks/TabsInformationBlock/Component'
import { CardsBlock } from '@/blocks/CardsBlock/Component'
import { StepToStepBlock } from '@/blocks/StepToStepBlock/Component'
import { CarouselRecommendationBlock } from '@/blocks/CarouselRecommendationBlock/Component'
import { HeaderProductoBlock } from '@/blocks/HeaderProductoBlock/Component'
import { FaqBlockComponent } from '@/blocks/FaqBlock/Component'
import { ProductDetailsBlockComponent } from '@/blocks/ProductDetailsBlock/Component'
import { ProductInfoBlockComponent } from '@/blocks/ProductInfoBlock/Component'
import { InstagramFeedBlockComponent } from '@/blocks/InstagramFeed/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CTABlock,
  callToAction: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  heroGotas: HeroGotasComponent,
  carruselTab: CarruselTabComponent,
  cards: CardsBlock,
  stepToStep: StepToStepBlock,
  carouselRecommendation: CarouselRecommendationBlock,
  headerProducto: HeaderProductoBlock,
  faq: FaqBlockComponent,
  productDetails: ProductDetailsBlockComponent,
  productInfo: ProductInfoBlockComponent,
  instagramFeed: InstagramFeedBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
