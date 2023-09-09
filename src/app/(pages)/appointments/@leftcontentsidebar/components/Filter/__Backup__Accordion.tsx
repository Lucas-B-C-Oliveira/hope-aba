'use client'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { ReactNode, memo } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  children: ReactNode[]
}

export const Accordion = memo(function Accordion({ children }: Props) {
  const titles = ['Filtros para Cadastro', 'Outros filtros']

  return (
    <div className="flex flex-col  gap-4 w-56 rounded-2xl bg-white">
      {children &&
        children.length > 0 &&
        children.map((child: ReactNode, index: number) => (
          <Disclosure key={uuidv4()}>
            {({ open }) => {
              return (
                <div className="flex flex-col w-full">
                  <Disclosure.Button className="flex flex-row w-full items-center gap-2 rounded-lg  py-2">
                    <span className="text-base font-bold text-gray-600">
                      {titles[index]}
                    </span>
                    <ChevronUpIcon
                      className={`${open ? 'rotate-180' : ''
                        } h-5 w-5 text-gray-600 font-bold stroke-2`}
                    />
                  </Disclosure.Button>

                  <Transition
                    show={open}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel className="flex flex-col w-56 h-fit items-center justify-center content-center text-center pt-2 pb-2 text-sm text-gray-600">
                      {child}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )
            }}
          </Disclosure>
        ))}
    </div>
  )
})
