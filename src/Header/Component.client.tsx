'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useMenuLateral } from '@/providers/MenuLateral'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasAdminBar, setHasAdminBar] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { openMenu } = useMenuLateral()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      setIsScrolled(scrollPosition > 10)
    }

    // Verificar posición inicial
    handleScroll()

    // Agregar listener con throttling para mejor rendimiento
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  useEffect(() => {
    // Detectar si el AdminBar está visible
    const checkAdminBar = () => {
      setHasAdminBar(document.documentElement.hasAttribute('data-admin-bar'))
    }
    
    // Verificar inicialmente
    checkAdminBar()
    
    // Observar cambios en el atributo
    const observer = new MutationObserver(checkAdminBar)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-admin-bar'],
    })
    
    return () => observer.disconnect()
  }, [])

  const logo = data.logo as Media | undefined
  const logoTransparent = (data as Header & { logoTransparent?: string | Media | null }).logoTransparent as Media | undefined
  const logoUrl = logo?.url ? getMediaUrl(logo.url) : null
  const logoTransparentUrl = logoTransparent?.url ? getMediaUrl(logoTransparent.url) : null

  // Verificar si estamos en la página principal
  const isHomePage = pathname === '/'

  // Mostrar logo transparente solo en la página principal cuando NO está scrolleado y existe logoTransparent
  // En páginas internas siempre mostrar el logo principal
  const shouldShowTransparentLogo = isHomePage && !isScrolled && logoTransparentUrl && logoTransparentUrl.length > 0 && logoTransparent

  return (
    <header 
      className={`fixed rounded-b-[16px] rounded-t-none left-0 right-0 z-50 transition-all duration-300 ${
        hasAdminBar ? 'top-12' : 'top-0'
      } ${
        isScrolled ? 'bg-[#F0F5F5] shadow-md' : 'bg-transparent'
      }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto py-2 flex justify-between items-center gap-4">
        <Link href="/" className="flex-shrink-0">
          {shouldShowTransparentLogo ? (
            <Image
              key="transparent-logo"
              src={logoTransparentUrl}
              alt={logoTransparent.alt || 'Logo'}
              width={200}
              height={logoTransparent.height || 50}
              className="h-auto w-[150px] md:w-[200px]"
              style={{ height: 'auto' }}
              priority
              unoptimized={logoTransparentUrl.endsWith('.svg')}
            />
          ) : logoUrl && logo ? (
            <Image
              key="normal-logo"
              src={logoUrl}
              alt={logo.alt || 'Logo'}
              width={200}
              height={logo.height || 50}
              className="h-auto w-[150px] md:w-[200px] "
              style={{ height: 'auto' }}
              priority
              unoptimized={logoUrl.endsWith('.svg')}
            />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0 w-[200px]" />
          )}
        </Link>

        {/* Menú de navegación (desktop y mobile en la barra) */}
        <nav className="flex flex-1 justify-end min-w-0">
          <HeaderNav data={data} isMobile={false} />
        </nav>

        {/* Call to action button (desktop): en el header */}
        {(data.callToActionBtn ?? []).length > 0 && (
          <div className="flex items-center shrink-0 btn-cta hidden md:block">
            {(data.callToActionBtn ?? []).map(({ link }, i) => {
              const label = link?.label
              const ctaClassName =
                'px-6 py-3 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all hover:opacity-90 bg-[#007FE8] text-white whitespace-nowrap'

              return (
                <button
                  key={i}
                  type="button"
                  onClick={openMenu}
                  className={ctaClassName}
                >
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* CTA móvil: se muestra en todo el sitio desde layout (componente MobileCTA) */}
    </header>
  )
}
