'use client'
import { MAGIC_INPUT_CLASSNAME } from '@/style/consts'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, InputHTMLAttributes, memo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string
  placeholder: string
  options: any[]
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function getError(errors: any, name: string) {
  try {
    const currentError = errors[name]

    if (currentError?.message) {
      return true
    }
    return false
  } catch (errors) {
    return false
  }
}

const defaultSelected = { key: 'Selecione', value: 'Selecione' }

export const SelectByData = memo(function SelectByData({
  name,
  options,
  placeholder,
  ...rest
}: SelectProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [selected, setSelected] = useState(defaultSelected)

  const currentError = getError(errors, name)

  // return (
  //   <select
  //     id={name}
  //     {...rest}
  //     {...register(name)}
  //     className={twMerge(
  //       rest?.className,
  //       `${currentError ? 'outline  outline-red-500 outline-1' : ''}`,
  //     )}
  //   >
  //     <option value="">{placeholder}</option>
  //     {options?.length > 0 &&
  //       options.map((data: any) => (
  //         <option key={data.key} value={data.key}>
  //           {data.value}
  //         </option>
  //       ))}
  //   </select>
  // )

  function handleOnSelected(newData: any) {
    setValue(`${name}`, newData.key)

    setSelected(newData)
  }

  return (
    <Listbox value={selected} onChange={handleOnSelected}>
      {({ open }) => (
        <div className="flex flex-col">
          <div className="relative">
            <Listbox.Button
              // onClick={handleClick}
              className={twMerge(
                MAGIC_INPUT_CLASSNAME,
                ' w-56 cursor-default text-left',
                `${currentError ? 'outline  outline-red-500 outline-1' : ''}`,
              )}
            >
              <span className="block truncate">{selected?.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open && options?.length > 0}
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
                {typeof options !== 'undefined' &&
                  options?.length > 0 &&
                  options?.map((data: any) => (
                    <Listbox.Option
                      key={data.key}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-8 pr-4',
                        )
                      }
                      value={data}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {data.value}
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
