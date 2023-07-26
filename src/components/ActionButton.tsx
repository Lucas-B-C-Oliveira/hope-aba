'use client'
import { ButtonHTMLAttributes, ElementType, ReactNode, memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ElementType
}

export const ActionButton = memo(function ActionButton({
  children,
  icon: Icon,
  ...rest
}: ActionButtonProps) {
  return (
    <button
      className={twMerge(
        `flex flex-row gap-1 h-fit w-fit items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
        rest?.className,
      )}
      {...rest}
    >
      {children && children}

      {Icon && <Icon className={twMerge('', '')} />}
    </button>
  )
})
