'use client'
import { memo, Fragment } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import {
  MAGIC_INPUT_CLASSNAME,
  MAGIC_INPUT_FOCUS,
  MAGIC_INPUT_HOVER,
  MAGIC_LABEL_CLASSNAME,
} from '@/style/consts'
import { twMerge } from 'tailwind-merge'
import { UseSelectOptionsByFetchProps } from './useSelectOptionsByFetch'

interface Props {
  labelText?: string
  magicInputClassName?: string
  magicInputHover?: string
  magicInputFocus?: string
  useLogic: (args?: UseSelectOptionsByFetchProps) => {
    handleSelectOnChange: (selectedData: any) => void
    handleOnClickSelect: () => void
    ARE_THERE_OPTIONS_TO_SHOW: boolean
    responseData: any
    selected: {
      id: string
      name: string
    }
    isError: boolean
    error: unknown
    isFetching: boolean
  }
}

export const SelectOptionsByFetch = memo(function SelectOptionsByFetch({
  labelText,
  magicInputClassName = MAGIC_INPUT_CLASSNAME,
  magicInputFocus = MAGIC_INPUT_FOCUS,
  magicInputHover = MAGIC_INPUT_HOVER,
  useLogic,
}: Props) {
  const {
    ARE_THERE_OPTIONS_TO_SHOW,
    handleOnClickSelect,
    handleSelectOnChange,
    responseData,
    selected,
    error,
    isError,
    isFetching,
  } = useLogic()

  return (
    <Listbox value={selected} onChange={handleSelectOnChange}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Label className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10 ')}>
            {labelText}
          </Listbox.Label>

          <div className="absolute right-0" />

          <Listbox.Button
            onClick={handleOnClickSelect}
            className={twMerge(
              magicInputClassName,
              'w-56 cursor-default text-left',
              magicInputFocus,
              magicInputHover,
            )}
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open && ARE_THERE_OPTIONS_TO_SHOW}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute z-20 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg
                ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
            >
              {ARE_THERE_OPTIONS_TO_SHOW &&
                responseData?.data.map((data: any) => (
                  <Listbox.Option
                    key={data.id}
                    className={({ active }) =>
                      twMerge(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4',
                      )
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={twMerge(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {data.name}
                        </span>

                        {selected ? (
                          <span
                            className={twMerge(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
})
