'use client'

import { HTMLAttributes, ReactNode, memo } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const Container = memo(function Container({
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className="flex flex-col gap-3 w-full h-full p-4" {...rest}>
      {children}
    </div>
  )
})
