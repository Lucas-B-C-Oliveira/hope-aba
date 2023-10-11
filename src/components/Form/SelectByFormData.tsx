'use client'
import { memo, useState, Fragment, useEffect } from 'react'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { Listbox, Transition } from '@headlessui/react'

import { MAGIC_INPUT_CLASSNAME, MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { Form } from '.'
import { useFormContext, useWatch } from 'react-hook-form'
import { TherapyData } from '@/types'
import { twMerge } from 'tailwind-merge'
import { isEqual } from 'lodash'
import { useSelectByFormData } from './useSelectByFormData'



interface Props {
  name?: string
  fieldNameToObserve?: string
}


export const SelectByFormData = memo(function SelectByFormData({
  name,
  fieldNameToObserve,
}: Props) {

  const { classNames, handleClick, handleOnSelected, observedField, selected } = useSelectByFormData({ name, fieldNameToObserve })

  return (
    <Listbox value={selected} onChange={handleOnSelected}>
      {({ open }) => (
        <div className="flex flex-col">
          <div className="relative">
            <Listbox.Label className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10')}>
              Terapia
            </Listbox.Label>

            <div className="absolute right-0">
              <Form.ErrorMessage
                field={`${name}`}
                specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
              />
            </div>

            <Listbox.Button
              onClick={handleClick}
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
              )}
            >
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open && observedField?.allowTherapies?.length > 0}
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute z-20 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg
                ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
              >
                {typeof observedField?.allowTherapies !== 'undefined' &&
                  observedField?.allowTherapies?.length > 0 &&
                  observedField?.allowTherapies?.map((therapy: TherapyData) => (
                    <Listbox.Option
                      key={therapy.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-8 pr-4',
                        )
                      }
                      value={therapy}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {therapy.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
})
