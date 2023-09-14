'use client'
import { ButtonHTMLAttributes, ElementType, ReactNode, memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ElementType
  errors?: boolean
  classNameToMerge?: string
  setOpen?: (value: boolean) => void
  actionFn?: () => void
}

export const ActionButton = memo(function ActionButton({
  children,
  icon: Icon,
  errors,
  classNameToMerge,
  setOpen,
  actionFn,
  ...rest
}: ActionButtonProps) {
  function onClickHandle() {
    if (actionFn) {
      actionFn()
    }
    if (setOpen) {
      setOpen(false)
    }
  }

  return (
    <button
      className={twMerge(
        `flex flex-row gap-1 h-fit w-fit items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
        classNameToMerge,
      )}
      onClick={onClickHandle}
      {...rest}
    >
      {children && children}

      {Icon && <Icon className={twMerge('', '')} />}
    </button>
  )
})
