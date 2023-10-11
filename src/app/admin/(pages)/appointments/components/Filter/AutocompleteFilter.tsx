'use client'

import { ChangeEvent, Dispatch, memo } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { MAGIC_LABEL_CLASSNAME } from '@/style/consts'
import { twMerge } from 'tailwind-merge'
import { ActionButton } from '@/components/ActionButton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { AutocompleteInput } from '@/components/Form/AutocompleteInput'

interface Props {
  labelText: string
  useAutocompleteLogic: <T extends any[]>(
    ...args: T
  ) => {
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
    ARE_THERE_OPTIONS_TO_SHOW: any
    setSelected: Dispatch<any>
    loading: boolean
    selected: any
    currentOptions: any
    searchAllData: () => void
  }
  disabled?: boolean
}

export const AutocompleteFilter = memo(function AutocompleteFilter({
  labelText,
  useAutocompleteLogic,
  disabled = false,
}: Props) {
  const {
    ARE_THERE_OPTIONS_TO_SHOW,
    loading,
    onSearchChange,
    setSelected,
    selected,
    currentOptions,
    searchAllData,
  } = useAutocompleteLogic(disabled)

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={setSelected}
      disabled={disabled}
    >
      <div className="relative ">
        {!disabled && (
          <div className="absolute -top-[0.6rem] z-10 bg-white w-fit px-2 py-0 right-2">
            <ActionButton
              onClick={searchAllData}
              classNameToMerge={
                ' gap-[2px] bg-gray-500 hover:bg-gray-400 rounded-[4px] text-sm font-medium  w-fit h-fit px-[6px] py-[0px]'
              }
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              Todos
            </ActionButton>
          </div>
        )}

        <Combobox.Label className={MAGIC_LABEL_CLASSNAME}>
          {labelText}
        </Combobox.Label>

        <AutocompleteInput
          loading={loading}
          onSearchChange={onSearchChange}
          currentOptions={currentOptions}
          disabled={disabled}
        />

        {!disabled && ARE_THERE_OPTIONS_TO_SHOW && (
          <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {currentOptions?.map((data: any) => (
              <Combobox.Option
                key={data.id}
                value={data}
                className={({ active }) =>
                  twMerge(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={twMerge(
                        'block truncate',
                        selected && 'font-semibold',
                      )}
                    >
                      {data?.name}
                    </span>

                    {selected && (
                      <span
                        className={twMerge(
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
