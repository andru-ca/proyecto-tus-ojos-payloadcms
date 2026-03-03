import type { ReactNode } from 'react'

/**
 * Layout raíz requerido por Next.js App Router.
 * Sin este archivo, en producción (p. ej. Vercel) puede aparecer 404 en la raíz o en rutas.
 * Los layouts de (frontend) y (payload) se anidan dentro de este.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="font-sans" lang="es" suppressHydrationWarning>
      <head>
        <link
          href="/fonts/WOFF2/NunitoSans.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/WOFF2/SequelSans-RomanDisp.woff2"
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}
