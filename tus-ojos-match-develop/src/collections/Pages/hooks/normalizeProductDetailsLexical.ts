import type { CollectionAfterReadHook } from 'payload'
import { emptyCarruselTabTitleLexicalState } from '@/blocks/TabsInformationBlock/config'
import { emptyProductDetailsLexicalState } from '@/blocks/ProductDetailsBlock/config'

function isValidLexicalObject(v: unknown): v is { root: unknown } {
  return v !== null && typeof v === 'object' && v !== undefined && 'root' in (v as object)
}

/**
 * Normaliza campos richText/Lexical en bloques del layout cuando vienen como string o null
 * (p. ej. datos creados cuando el campo era type: 'text') para evitar el error
 * "The value passed to the Lexical editor is not an object".
 */
type CarruselTabOption = {
  description?: unknown
  consejos?: unknown
}

export const normalizeProductDetailsLexical: CollectionAfterReadHook = ({ doc }) => {
  const layout = doc.layout as Array<{
    blockType?: string
    title?: unknown
    options?: CarruselTabOption[]
    tabsInformation?: Array<{ tabDescription?: unknown }>
  }> | undefined
  if (!layout || !Array.isArray(layout)) return doc

  for (const block of layout) {
    if (block.blockType === 'productDetails' && block.tabsInformation) {
      for (const tab of block.tabsInformation) {
        const v = tab.tabDescription
        if (isValidLexicalObject(v)) continue
        tab.tabDescription = emptyProductDetailsLexicalState
      }
    }
    if (block.blockType === 'carruselTab') {
      const v = block.title
      if (!isValidLexicalObject(v) && 'title' in block) {
        block.title = emptyCarruselTabTitleLexicalState
      }
      const options = block.options
      if (options && Array.isArray(options)) {
        for (const option of options) {
          if (!isValidLexicalObject(option.description)) {
            option.description = emptyCarruselTabTitleLexicalState
          }
          if (!isValidLexicalObject(option.consejos)) {
            option.consejos = emptyCarruselTabTitleLexicalState
          }
        }
      }
    }
  }

  return doc
}
