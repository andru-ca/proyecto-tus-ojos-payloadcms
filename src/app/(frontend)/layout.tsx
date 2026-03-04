import '@/lib/polyfill-file'

import type { Metadata } from 'next'

import React from 'react'

import AOSInit from '@/components/AOS/AOSInit'
import { AdminBar } from '@/components/AdminBar'
import { MobileCTA } from '@/components/MobileCTA/Component'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { MenuLateral } from '@/MenuLateral/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const headerData = await getCachedGlobal('header', 1)()

  return (
    <html className="font-sans" lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
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
      <body>
        <AOSInit />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header data={headerData} />
          {children}
          <Footer />
          <MenuLateral />
          <MobileCTA data={headerData} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
