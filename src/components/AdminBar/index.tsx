'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Backoffice</span>

type UserWithRole = PayloadMeUser & { role?: 'admin' | 'editor' }

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const [user, setUser] = useState<UserWithRole | null>(null)
  // segments[0] = 'posts' en /posts/..., sino página (home o /slug)
  const collection = (
    segments?.[0] && collectionLabels[segments[0] as keyof typeof collectionLabels]
      ? segments[0]
      : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = React.useCallback((u: PayloadMeUser | null) => {
    setShow(Boolean(u?.id))
    setUser((u as UserWithRole) ?? null)
  }, [])

  // Exponer el estado del AdminBar al DOM para que el header pueda detectarlo
  useEffect(() => {
    if (show) {
      document.documentElement.setAttribute('data-admin-bar', 'visible')
    } else {
      document.documentElement.removeAttribute('data-admin-bar')
    }
  }, [show])

  return (
    <div
      className={cn(baseClass, 'fixed top-0 left-0 right-0 z-[60] h-12 flex items-center bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container flex items-center min-h-0 gap-3">
        <PayloadAdminBar
          {...adminBarProps}
          adminPath="/backoffice"
          className="text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview')
              .then(() => {
                router.push('/')
                router.refresh()
              })
              .catch(() => {
                router.push('/')
                router.refresh()
              })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
        {show && user?.role && (
          <span
            className="rounded bg-white/20 px-2 py-0.5 text-xs font-medium capitalize text-white"
            title="Rol en el backoffice"
          >
            {user.role === 'admin' ? 'Admin' : 'Editor'}
          </span>
        )}
      </div>
    </div>
  )
}
