/**
 * Polyfill para el global `File` en Node (build/SSR). Importar antes de cargar Payload
 * para evitar "ReferenceError: File is not defined" durante next build.
 */
import { createRequire } from 'node:module'

if (typeof globalThis.File === 'undefined') {
  try {
    const require = createRequire(import.meta.url)
    // Sync load needed for polyfill before other modules run; createRequire is ESM-friendly
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Blob } = require('node:buffer') as { Blob: new (parts?: BlobPart[], options?: BlobPropertyBag) => Blob }
    const FilePolyfill = class extends Blob {
      name: string
      lastModified: number
      constructor(
        bits: BlobPart[],
        name: string,
        options?: { type?: string; lastModified?: number },
      ) {
        super(bits, options)
        this.name = name
        this.lastModified = options?.lastModified ?? Date.now()
      }
    }
    ;(globalThis as Record<string, unknown>).File = FilePolyfill
  } catch {
    // Ignorar si node:buffer no está disponible (edge)
  }
}
