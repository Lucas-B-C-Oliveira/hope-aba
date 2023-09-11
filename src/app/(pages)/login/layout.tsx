'use client'
import { Providers } from '@/components/Providers'
import { useAuth } from '@/hooks/useAuth'
import '@/style/globals.css'
import { ReactNode } from 'react'


interface RootLayoutProps {

  children: ReactNode
}

export default function LoginLayout({
  children,
}: RootLayoutProps) {

  return (
    <>
      <Providers>
        {children}
      </Providers>
    </>
  )
}
