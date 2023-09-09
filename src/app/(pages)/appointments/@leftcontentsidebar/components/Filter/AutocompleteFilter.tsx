'use client'

import { ChangeEvent, memo, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { MAGIC_INPUT_CLASSNAME, MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { isEqual } from 'lodash'
import { twMerge } from 'tailwind-merge'
import { doFetch } from '@/utils/actions/action'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { FilterKey } from '@/types'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  filterKey: FilterKey,
  endPoint: string
  labelText: string
}

export const AutocompleteFilter = memo(function AutocompleteFilter({
  filterKey,
  endPoint,
  labelText
}: Props) {
  const [selected, setSelected] = useState(null)
  const [responseData, setResponseData] = useState<any>([]) //! TODO: Trocar o tipo para o tipo correto
  const [isLoading, setIsLoading] = useState(false)
  const { addFilter, filters } = useAppointmentFilterStore()


  const ARE_THERE_OPTIONS_TO_SHOW =
    typeof responseData?.data !== 'undefined' && responseData?.data.length > 0

  async function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (value?.length > 3) {
      setIsLoading(true)
      try {
        const data = await doFetch<any | { data: any }>(
          `${endPoint}?search=${value}`,
        )

        if (typeof data?.data === 'undefined' && data?.data?.length <= 0) {
          setSelected(null)
        }

        if (!isEqual(selected, data)) {
          setResponseData(data)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('SERVER ACTION ERROR - endPoint: ', endPoint, error)
      }
    }
  }

  return (
    <Combobox as="div" value={selected} onChange={setSelected}>
      <div className="relative ">
        <Combobox.Label className={MAGIC_LABEL_CLASSNAME}>
          {labelText}
        </Combobox.Label>

        <Combobox.Input
          className={twMerge(
            MAGIC_INPUT_CLASSNAME,
            ' w-56 cursor-default text-left',
          )}
          onChange={onChangeHandle}
          displayValue={(dataSelected: any,) => {

            if (dataSelected) {
              const filterKeyValue = filters[filterKey]
              if (filterKeyValue?.id !== dataSelected?.id) {
                const filterData = {
                  name: dataSelected?.name,
                  id: dataSelected?.id,
                }
                addFilter(filterKey, filterData)
              }
            }

            return dataSelected?.name
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {isLoading ? <span className="text-red-500 ">Loading...</span> : null}

          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {ARE_THERE_OPTIONS_TO_SHOW && (
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {responseData?.data.map((data: any) => (
              <Combobox.Option
                key={data.id}
                value={data}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold',
                      )}
                    >
                      {data?.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-indigo-600',
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
})
