'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType, Page } from '@/payload-types'

type NavLink = NonNullable<NonNullable<HeaderType['navItems']>[number]>['link']

export const HeaderNav: React.FC<{ data: HeaderType; isMobile?: boolean }> = ({ data, isMobile = false }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  const getHref = (link: NavLink) => {
    if (link?.type === 'reference' && link?.reference?.value) {
      const value = link.reference.value
      const page = typeof value === 'object' && value !== null && 'slug' in value ? (value as Page) : null
      if (page?.slug) return `/${page.slug}`
    }
    if (link?.type === 'custom' && link?.url) return link.url
    return '#'
  }

  const getLinkStyles = (href: string) => {
    const baseStyles = isMobile
      ? 'px-6 py-3 rounded-full text-base font-medium transition-all hover:opacity-90 w-full text-center'
      : 'px-6 py-3 rounded-full'
    const isActive =
      href !== '#' &&
      (pathname === href || pathname === `${href}/` || (pathname === '/' && (href === '/' || href === '/home')))
    return `${baseStyles} bg-white ${isActive ? 'text-[#002330] font-semibold' : 'text-brand'}`
  }

  return (
    <nav className={`flex ${isMobile ? 'flex-col' : 'flex-row flex-nowrap md:flex-wrap'} gap-2 md:gap-3 ${isMobile ? 'items-stretch' : 'items-center justify-end'}`}>
      {navItems.map(({ link }, i) => {
        const label = link?.label
        const href = getHref(link)
        const newTab = link?.newTab
        return (
          <Link
            key={i}
            href={href}
            className={getLinkStyles(href)}
            {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(href !== '#' && !newTab && (pathname === href || (pathname === '/' && href === '/home')) ? { 'aria-current': 'page' as const } : {})}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
