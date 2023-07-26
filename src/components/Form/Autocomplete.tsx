'use client'

import { ChangeEvent, memo, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { MAGIC_INPUT_CLASSNAME, MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { isEqual } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { doFetch } from '@/utils/actions/action'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  name?: string
  endPoint?: string
}

export const Autocomplete = memo(function Autocomplete({
  name,
  endPoint,
}: Props) {
  const { setValue, getValues } = useFormContext()
  const [selected, setSelected] = useState(null)
  const [responseData, setResponseData] = useState<any>([]) //! TODO: Trocar o tipo para o tipo correto
  const [isLoading, setIsLoading] = useState(false)

  const formValues = getValues()
  const currentFieldValue = formValues[`${name}`]

  const ARE_THERE_OPTIONS_TO_SHOW =
    typeof responseData?.data !== 'undefined' && responseData?.data.length > 0

  async function onChangeHandle(event: ChangeEvent<HTMLInputElement>) {
    const patientName = event.target.value
    if (patientName?.length > 3) {
      setIsLoading(true)
      try {
        const data = await doFetch<any | { data: any }>(
          `${endPoint}?search=${patientName}`,
        )

        if (typeof currentFieldValue !== 'undefined') {
          setValue(`${name}`, undefined)
        }

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
          {/* <Combobox.Label className="absolute -top-[0.65rem] left-2 inline-block bg-white px-1 text-sm font-bold text-gray-600"> */}
          Nome do Paciente
        </Combobox.Label>

        <Combobox.Input
          className={twMerge(
            MAGIC_INPUT_CLASSNAME,
            ' w-56 cursor-default text-left',
          )}
          onChange={onChangeHandle}
          displayValue={(
            patient: any | { name: string; allowTherapies: any[] },
          ) => {
            if (
              typeof patient?.allowTherapies !== 'undefined' &&
              typeof patient?.allowTherapies !== null &&
              patient?.allowTherapies?.length > 0
            ) {
              if (!isEqual(currentFieldValue, patient)) {
                setValue(`${name}`, patient)
              }
            }
            return patient?.name
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
            {responseData?.data.map((patient: any) => (
              <Combobox.Option
                key={patient.id}
                value={patient}
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
                      {patient?.name}
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
