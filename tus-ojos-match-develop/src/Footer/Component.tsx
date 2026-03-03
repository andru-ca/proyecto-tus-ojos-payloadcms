import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import type { Footer, Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'

export async function Footer() {
 
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer


  const navItems = footerData?.navItems || []
  const logo = footerData?.logo as Media | undefined
  const logoUrl = logo?.url || null

  return (
    <footer className="gap-32mt-auto bg-black text-white relative overflow-hidden">
      {/* Contenido del footer */}
      <div className="container flex flex-col  gap-8 md:gap-24 py-12 relative z-10 overflow-hidden">

        {/* Header con logo y navegación */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8  relative z-10">
          <Link className="flex items-center" href="/">
            {logoUrl && logo ? (
              <Image
                src={logoUrl}
                alt={logo.alt || 'Logo'}
                width={200}
                height={logo.height || 60}
                className="h-auto w-[200px]"
                style={{ height: 'auto' }}
                unoptimized={logoUrl.endsWith('.svg')}
              />
            ) : (
              <Logo loading="eager" priority="high" className="invert w-[200px]" />
            )}
          </Link>

          <nav className="flex  md:flex-wrap lg:flex-row flex-col gap-6 md:gap-8">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink 
                  className="text-white hover:opacity-80 transition-opacity text-sm md:text-base" 
                  key={i} 
                  {...link} 
                />
              )
            })}
          </nav>
        </div>

                {/* Texto de fondo grande con opacidad */}
                <div 
          className="w-full opacity-20"
        >
          <div 
            className="flex flex-col md:flex-row md:whitespace-nowrap select-none uppercase text-white text-left md:text-center tracking-[4px] footer-text-large min-w-0"
            style={{
              fontFamily: '"Sequel Sans", sans-serif',
            }}
          >
            <span style={{ fontWeight: 100 }}>QUEDA</span>
            <span style={{ fontWeight: 900 }}>MUCHO</span>
            <span style={{ fontWeight: 100 }}>POR</span>
            <span style={{ fontWeight: 900 }}>VER</span>
          </div>
        </div>

        {/* Footer bottom */}
        <div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex flex-row gap-1 items-center flex-wrap">
          {footerData?.copyright && (
            <p className="text-white/60 text-xs md:text-sm">
              {footerData.copyright}
            </p>
          )}
          </div>

        </div>
      </div>

      {/* Barra subfooter */}
      {footerData?.subFooter && (
        <div className="relative z-10 bg-[#002330] ">
          <div className="container py-4 flex flex-col items-center gap-4">
            <div className="text-white/70 text-xs md:text-sm [&_.payload-richtext]:max-w-none">
              <RichText data={footerData.subFooter} enableGutter={false} />
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
