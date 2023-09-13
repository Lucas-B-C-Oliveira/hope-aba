/* eslint-disable prettier/prettier */
'use client'
import { Popover, Transition } from '@headlessui/react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface ErrorMessageProps {
  field: string
  availabilityFieldIndex?: number
  hourRangesIndex?: number
  lastField?: 'start' | 'end'
  specificStyle?: string
  position?: 'right' | 'left' | 'center'
}

function getError(
  errors: any,
  availabilityFieldIndex: number,
  hourRangesIndex: number,
  lastField?: 'start' | 'end',
) {
  try {
    if (typeof lastField !== 'undefined') {
      return errors?.scheduleAvailability[availabilityFieldIndex]?.day[
        hourRangesIndex
      ][lastField]
    } else throw new Error('lastField is undefined')
  } catch (error) {
    return false
  }
}

export const ErrorMessage = memo(function ErrorMessage({
  field,
  availabilityFieldIndex,
  hourRangesIndex,
  lastField,
  specificStyle = '',
  position = 'center'
}: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext()


  let fieldError: any

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
    if (field === 'schedule.day') {
      const currentErrors = errors.schedule;

      if (currentErrors) {
        if ('day' in currentErrors) {
          fieldError = currentErrors.day;
        }
      }
      else {
        fieldError = undefined
      }
    }
    else if (field === 'schedule.start') {
      const currentErrors = errors.schedule;

      if (currentErrors) {
        if ('start' in currentErrors) {
          fieldError = currentErrors.start;
        }
      }
      else {
        fieldError = undefined
      }
    }
    else if (field === 'schedule.end') {
      const currentErrors = errors.schedule;

      if (currentErrors) {
        if ('end' in currentErrors) {
          fieldError = currentErrors.end;
        }
      }
      else {
        fieldError = undefined
      }
    }


    else {
      fieldError = errors[field]
    }
  }


  if (!fieldError || !fieldError?.message) {
    return null
  }

  return (
    <Popover className="relative flex h-fit w-fit z-20">
      {({ open }) => (
        <>
          <Popover.Button className="z-30">
            <ExclamationCircleIcon
              className={twMerge(
                `h-4 w-4 hover:text-red-400 ${open ? 'text-red-500 ' : 'text-red-700 animate-bounce'
                }`,
                specificStyle,
              )}
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
            <Popover.Panel className={`absolute ${position === 'center' ? 'left-1/2 -translate-x-1/2' : position === 'left' ? 'right-0' : 'left-0'}  z-40 mt-4 flex `}>
              <div className="flex w-fit items-center text-center justify-center shrink rounded-md bg-yellow-50 p-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                <span className="text-xs whitespace-nowrap flex flex-row w-fit text-red-500 font-bold">
                  {fieldError?.message?.toString()}
                </span>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
})
