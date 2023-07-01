'use client'
import { Popover, Transition } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'

interface ErrorMessageProps {
  field: string
  availabilityFieldIndex?: number
  hourRangesIndex?: number
  lastField?: 'start' | 'end'
}

function getError(
  errors: any,
  availabilityFieldIndex: number,
  hourRangesIndex: number,
  lastField: number,
) {
  try {
    return errors?.scheduleAvailability[availabilityFieldIndex]?.day[
      hourRangesIndex
    ][lastField]
  } catch (error) {
    return false
  }
}

export const ErrorMessage = memo(function ErrorMessage({
  field,
  availabilityFieldIndex,
  hourRangesIndex,
  lastField,
}: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext()

  let fieldError

  if (
    typeof availabilityFieldIndex !== 'undefined' &&
    typeof hourRangesIndex !== 'undefined' &&
    typeof lastField !== 'undefined' &&
    typeof errors.scheduleAvailability === 'object'
  ) {
    fieldError = getError(
      errors,
      availabilityFieldIndex,
      hourRangesIndex,
      lastField,
    )
  } else {
    fieldError = errors[field]
  }

  // if (field === 'scheduleAvailability') {
  //   fieldError = errors[field]

  //   if (!fieldError?.message) {
  //     return null
  //   }
  // }

  if (!fieldError || !fieldError?.message) {
    return null
  }

  return (
    <Popover className="relative flex h-fit w-fit z-20">
      {({ open }) => (
        <>
          <Popover.Button className="z-30">
            <ExclamationCircleIcon
              className={` h-4 w-4  hover:text-red-400 ${open ? 'text-red-500 ' : 'text-red-700 animate-bounce'
                }`}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0 z-40"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-40 mt-5 flex -translate-x-1/2 ">
              <div className="flex w-fit items-center text-center justify-center shrink rounded-xl bg-white p-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                <span className="text-xs whitespace-nowrap flex flex-row w-fit text-red-500">
                  {fieldError?.message?.toString()}
                </span>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )

  // return (
  //   <span className="text-xs text-red-500 whitespace-nowrap overflow-hidden truncate">
  //     {fieldError?.message?.toString()}
  //   </span>
  // )
})
