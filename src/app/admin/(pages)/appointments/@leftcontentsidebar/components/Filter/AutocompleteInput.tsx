import { SpinnerLoading } from '@/components/SpinnerLoading'
import { MAGIC_INPUT_CLASSNAME } from '@/style/consts'
import { Combobox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChangeEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
  loading: boolean
  currentOptions: any
  disabled?: boolean
}

export function AutocompleteInput({
  loading,
  onSearchChange,
  currentOptions,
  disabled = false,
}: Props) {
  const [isFocused, setFocus] = useState(false)

  return (
    <div
      className={twMerge(
        MAGIC_INPUT_CLASSNAME,
        'rounded-[0.290rem]  w-56 cursor-default pb-2 items-center flex flex-row gap-1 pr-2 pl-3 justify-between',
        `${!disabled
          ? `${isFocused
            ? 'ring-inset ring-2 ring-indigo-600'
            : 'hover:ring-2  hover:ring-inset hover:ring-indigo-600'
          }`
          : ''
        }`,
      )}
    >
      <Combobox.Input
        className={twMerge(
          'cursor-default text-left p-0 h-fit w-full',
          'border-0  text-gray-900  focus:ring-0 placeholder:text-gray-400text-sm leading-4',
        )}
        onChange={onSearchChange}
        onFocus={() => setFocus(!disabled)}
        onBlur={() => setFocus(false)}
        displayValue={(dataSelected: any) => {
          // console.log('dataSelected', dataSelected)
          // console.log('currentOptions', currentOptions)
          if (currentOptions && dataSelected?.name) {
            return dataSelected?.name
          }
          return ''
        }}
      />

      {!disabled && (
        <Combobox.Button className="flex items-center w-fit h-fit rounded-r-md p-0 pb-[2px] focus:outline-none">
          {loading && <SpinnerLoading height="20" width="20" />}

          {!loading && (
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400 hover:text-gray-300"
              aria-hidden="true"
            />
          )}
        </Combobox.Button>
      )}
    </div>
  )
}
