'use client'
import { Transition } from '@headlessui/react'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { Fragment, ReactElement, ReactNode } from 'react'

interface Props {
  isOpen: boolean
  content: ReactElement
}

export function ContentSidebarContainer({ content, isOpen }: Props) {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`
          pointer-events-auto transform  h-full rounded-2xl bg-white
           text-left shadow-xl transition-all w-fit 
        `}
      >
        {content && content}
      </div>
    </Transition>
  )
}
