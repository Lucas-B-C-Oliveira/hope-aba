/* eslint-disable prettier/prettier */
'use client'
import { Popover, Transition } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { HTMLAttributes, memo } from 'react'


interface ErrorFeedbackProps extends HTMLAttributes<HTMLDivElement> {
  errors?: string[][] | []
}

export const ErrorFeedback = memo(function ErrorMessage({
  errors,
  ...rest
}: ErrorFeedbackProps) {

  return (
    <div className="relative">
      {errors && errors.length > 0 && (
        <>
          <h3 className="absolute -top-[0.72rem] px-1 left-2 inline-block bg-white font-bold text-gray-600">Erro de agendamento</h3>
          <div style={{ height: 'full', maxHeight: '19.2rem' }} className="  rounded-md border-0  max-w-[15rem] w-full py-2 pt-3 pl-2 box-content text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
            <div className="flex shadow-lg p-3  rounded-lg flex-col gap-4 overflow-y-auto  max-w-[13rem] w-full" style={{ height: 'full', maxHeight: '19.2rem' }}>
              {errors.map(([date, message]) => (
                <span key={`${date}-${message}`} className="text-sm w-fit text-red-500 font-bold">
                  * {date} - {message}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )

  // return (
  //   <Popover className="relative flex h-fit w-fit z-20">
  //     {({ open }) => (
  //       <>
  //         <Popover.Button className="z-30">
  //           <ExclamationCircleIcon
  //             className={twMerge(
  //               `h-4 w-4 hover:text-red-400 ${open ? 'text-red-500 ' : 'text-red-700 animate-bounce'
  //               }`,
  //               specificStyle,
  //             )}
  //             aria-hidden="true"
  //           />
  //         </Popover.Button>

  //         <Transition
  //           show={open}
  //           enter="transition ease-out duration-200"
  //           enterFrom="opacity-0 translate-y-1"
  //           enterTo="opacity-100 translate-y-0 z-40"
  //           leave="transition ease-in duration-150"
  //           leaveFrom="opacity-100 translate-y-0"
  //           leaveTo="opacity-0 translate-y-1"
  //         >
  //           <Popover.Panel className="absolute left-1/2 z-40 mt-5 flex -translate-x-1/2 ">
  //             <div className="flex w-fit items-center text-center justify-center shrink rounded-md bg-yellow-50 p-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
  //               <span className="text-xs whitespace-nowrap flex flex-row w-fit text-red-500 font-bold">
  //                 {fieldError?.message?.toString()}
  //               </span>
  //             </div>
  //           </Popover.Panel>
  //         </Transition>
  //       </>
  //     )}
  //   </Popover>
  // )
})
