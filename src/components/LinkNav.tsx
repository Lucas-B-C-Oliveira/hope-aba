'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, ReactElement, ReactNode, memo } from 'react'

import { usePathname } from 'next/navigation'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ReactElement
  href: string
}

export const LinkNav = memo(function LinkNav({ children, icon, href }: Props) {
  const currentPath = usePathname()

  const currentState =
    currentPath === href
      ? 'bg-gray-800 text-white'
      : 'text-gray-400 hover:text-white hover:bg-gray-800'

  return (
    <Link
      className={`${currentState} group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`}
      href={href}
    >
      {children}

      {icon}
    </Link>
  )
})
