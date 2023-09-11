'use client'

import { memo, useState, Fragment, useRef } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import { MAGIC_INPUT_CLASSNAME, MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { Form } from '.'
import { useFormContext, useWatch } from 'react-hook-form'
import { isEqual } from 'lodash'
import { twMerge } from 'tailwind-merge'
import { doFetch } from '@/utils/actions/action'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  name?: string
  title?: string
  endPoint?: string
  fieldNameToObserve?: string
  setProfessionalData?: (data: any) => void
}

const defaultSelected = { name: 'Selecione', id: '123123' }

export const SelectFetchOptionsById = memo(function SelectFetchOptionsById({
  name,
  title,
  endPoint,
  fieldNameToObserve,
  setProfessionalData,
}: Props) {
  const [selected, setSelected] = useState(defaultSelected)
  const [responseData, setResponseData] = useState<any>([]) //! TODO: Trocar o tipo para o tipo correto
  const [isLoading, setIsLoading] = useState(false) //! TODO: Coloque esse isLoading no visual do componente

  const {
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
    control,
  } = useFormContext()

  const observedField = useWatch({
    name: `${fieldNameToObserve}`,
    control,
  })

  const formValues = getValues()
  const currentFieldValue = formValues[`${name}`]

  const idFetchSaved = useRef('')

  const ARE_THERE_OPTIONS_TO_SHOW =
    typeof responseData?.data !== 'undefined' && responseData?.data.length > 0

  if (typeof observedField?.id !== 'undefined') {
    if (idFetchSaved.current !== observedField?.id) {
      idFetchSaved.current = observedField?.id
      getResponseData(observedField?.id)
    }
  } else {
    if (typeof currentFieldValue !== 'undefined') {
      setValue(`${name}`, undefined)
    }

    if (!isEqual(selected, defaultSelected)) {
      setSelected(defaultSelected)
    }
  }

  async function getResponseData(id: string) {
    setIsLoading(true)
    try {
      const data = await doFetch<any | { data: any }>(
        `${endPoint}?therapyIds=${id}`,
      )
      if (typeof currentFieldValue !== 'undefined') {
        setValue(`${name}`, undefined)
      }
      if (typeof data?.data === 'undefined' && data?.data?.length <= 0) {
        setSelected(defaultSelected)
      } else {
        if (!isEqual(selected, data)) {
          setResponseData(data)
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.error('SERVER ACTION ERROR - endPoint: ', endPoint, error)
    }
  }

  function handleClick() {
    if (typeof observedField?.id === 'undefined') {
      setError(`${name}`, {
        message: 'Selecione uma terapia primeiro',
        type: 'string',
      })
    } else {
      if (typeof errors[`${name}`]?.message !== 'undefined') {
        clearErrors()
      }
    }
  }

  return (
    <Listbox
      value={selected}
      onChange={(selectedData) => {
        if (!isEqual(currentFieldValue, selectedData)) {
          setValue(`${name}`, selectedData)
        }

        if (!isEqual(selected, selectedData)) {
          if (typeof setProfessionalData !== 'undefined') {
            const newData = {
              id: selectedData?.id,
              name: selectedData?.name,
            }
            setProfessionalData(newData)
          }
          setSelected(selectedData)
        }
      }}
    >
      {({ open }) => (
        <div className="relative">
          <Listbox.Label className={twMerge(MAGIC_LABEL_CLASSNAME, 'z-10 ')}>
            {title}
          </Listbox.Label>

          <div className="absolute right-0">
            {/* <Form.ErrorMessage
              field={`${name}`}
              specificStyle="z-40 absolute -top-[0.65rem] right-0 animate-pulse bg-white"
            /> */}
          </div>

          <Listbox.Button
            onClick={handleClick}
            className={twMerge(
              MAGIC_INPUT_CLASSNAME,
              ' w-56 cursor-default text-left',
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
                          {data.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
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
