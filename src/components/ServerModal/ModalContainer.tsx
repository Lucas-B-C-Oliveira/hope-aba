'use client'
import { Fragment, ReactNode, memo, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface Props {
  children: ReactNode
  containerId?: string
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

export const ModalContainer = memo(function ModalContainer({
  children,
  containerId = 'main',
}: Props) {
  // const cancelButtonRef = useRef(null)
  // const isFirstRender = useRef(true)

  const { sidebarIsOpen } = useMainLayoutStore()

  const [sizeClass, setSizeClass] = useState<Size | undefined>(undefined)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refMainElement = document?.getElementById(containerId)
      const mainRef = refMainElement?.getBoundingClientRect()

      if (
        typeof mainRef?.height !== 'undefined' &&
        typeof mainRef?.width !== 'undefined'
      ) {
        setSizeClass(getSizeClass(mainRef?.width, mainRef?.height))
      }
    }
  }, [sidebarIsOpen])

  // useEffect(() => {
  //   if (open === false && isFirstRender.current === false) {
  //     router.back()
  //   }
  // }, [open])

  useEffect(() => {
    // isFirstRender.current = false
    setOpen(true)
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        // initialFocus={cancelButtonRef}
        // onClose={setOpen}
        onClose={() => setOpen(false)}
        static={true}
      >
        {/* <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity" />
        </Transition.Child> */}

        <div className={` fixed inset-0 z-10 overflow-y-auto `}>
          <div
            className={`flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0`}
          >
            {/* <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            > */}

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            // afterLeave={() => router.back()}
            >
              <div
                style={{
                  position: 'absolute',
                  width: `${sizeClass?.width}`,
                  height: `${sizeClass?.height}`,
                  bottom: '0px',
                  right: '0px',
                }}
                // className={`pointer-events-none p-6 flex flex-row items-center justify-center`}
                // className={`pointer-events-none p-6 flex flex-row items-start justify-center `}
                className={`pointer-events-none  flex flex-row items-start justify-end `}
              >
                <Dialog.Panel
                  // style={{ backgroundColor: '#f9fafc' }}
                  className={`
                    pointer-events-auto transform  h-full rounded-2xl bg-white p-6 text-left shadow-2xl transition-all w-fit 
                `}
                >
                  <button
                    className="absolute top-2 left-2"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="w-6 h-6 text-pink-400 hover:text-pink-300" />
                  </button>
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
