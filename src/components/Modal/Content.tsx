'use client'
import { Fragment, ReactNode, memo, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

interface Props {
  open?: boolean
  setOpen?: (value: boolean) => void
  children: ReactNode
  noExitButton?: boolean
  staticModal?: boolean
}

type Size = {
  width: string
  height: string
}

function convertPxToRem(value: number): string {
  const remValue = value / 16
  return `${remValue.toFixed(2)}rem`
}

function getSizeClass(widthPx: number, heightPx: number): Size {
  const width = convertPxToRem(widthPx)
  const height = convertPxToRem(heightPx)

  return {
    width,
    height,
  }
}

export const Content = memo(function Content({
  open,
  setOpen,
  children,
  noExitButton = false,
  staticModal = false,
}: Props) {
  const cancelButtonRef = useRef(null)

  const { sidebarIsOpen } = useMainLayoutStore()

  const [sizeClass, setSizeClass] = useState<Size | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refMainElement = document?.getElementById('main')
      const mainRef = refMainElement?.getBoundingClientRect()

      if (typeof mainRef?.width !== 'undefined' && typeof mainRef?.height) {
        setSizeClass(getSizeClass(mainRef?.width, mainRef?.height))
      }
    }
  }, [sidebarIsOpen])



  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        static={staticModal}
        initialFocus={cancelButtonRef}
        onClose={(value: any) => {
          if (typeof setOpen !== 'undefined') {
            setOpen(value)
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className={` fixed inset-0`}>
          <div
            className={`flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                style={{
                  position: 'absolute',
                  width: `${sizeClass?.width}`,
                  height: `${sizeClass?.height}`,
                  bottom: '0px',
                  right: '0px',
                }}
                className={`pointer-events-none p-6 flex flex-row items-center justify-center `}
              >
                <Dialog.Panel
                  style={{
                    maxWidth: `${sizeClass?.width}`,
                    maxHeight: `${sizeClass?.height}`,
                  }}
                  className={twMerge(
                    'pointer-events-auto transform  flex gap-1 flex-col rounded-lg bg-white p-6 text-left shadow-xl transition-all',
                    ` overflow-y-auto`,
                  )}
                >
                  {!noExitButton && (
                    <button
                      className="absolute top-3 right-3"
                      onClick={() => {
                        if (typeof setOpen !== 'undefined') {
                          setOpen(false)
                        }
                      }}
                    >
                      <XMarkIcon className="w-6 h-6 text-pink-400 hover:text-pink-300" />
                    </button>
                  )}

                  {children}
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
})
