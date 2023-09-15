'use client'

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { setCookie, deleteCookie } from 'cookies-next'
import { ActionButton } from '@/components/ActionButton'
import { useRouter } from 'next/navigation'
import { capitalizeFirstLetter } from '@/utils/functions/helpers'
import { SpinnerLoading } from '@/components/SpinnerLoading'
import {
  ACCESS_TOKEN,
  CLINICS_DATA,
  CURRENT_CLINIC_DATA_INDEX,
} from '@/utils/functions/constants'

interface LayoutHeaderProps {
  clinicsData: any
  currentClinicDataIndex: number
  userData: {
    id: string
    name: string
    email: string
    accountId: string
    clinicsIds: string[]
    role: string
  }
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function LayoutHeader({
  clinicsData,
  currentClinicDataIndex,
  userData,
}: LayoutHeaderProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleChange(value: { id: string; name: string }) {
    const currentIndex =
      clinicsData.findIndex(
        (clinicData: { id: string }) => clinicData?.id === value?.id,
      ) ?? 0
    setCookie(CURRENT_CLINIC_DATA_INDEX, currentIndex)
  }

  async function logout() {
    setLoading(true)
    deleteCookie(CURRENT_CLINIC_DATA_INDEX)
    deleteCookie(CLINICS_DATA)
    deleteCookie(ACCESS_TOKEN)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="z-40 flex h-11  justify-end gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 ">
      <div className="flex items-center gap-x-4 lg:gap-x-6 al">
        <div className="flex flex-row gap-3 items-center">
          <span
            className=" text-base font-semibold text-gray-900"
            aria-hidden="true"
          >
            {capitalizeFirstLetter(userData?.name ?? '')}
          </span>
          <ActionButton onClick={logout} classNameToMerge="py-1">
            {loading && <SpinnerLoading height="20" width="20" />}
            {!loading && <span>Sair</span>}
          </ActionButton>
        </div>

        <div
          className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          aria-hidden="true"
        />

        <Listbox
          defaultValue={clinicsData[currentClinicDataIndex]}
          onChange={handleChange}
          as="div"
          className="relative"
        >
          <Listbox.Button className="flex items-center p-1.5">
            {/* <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> */}

            {({ value }) => (
              <>
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className=" text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    Clínica: {value?.name}
                  </span>
                  {clinicsData.length > 1 && (
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </>
            )}
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options className="absolute right-0 z-10 mt-2.5 w-fit origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {clinicsData &&
                clinicsData.length > 1 &&
                clinicsData.map((clinic: { id: string; name: string }) => (
                  <Listbox.Option
                    key={clinic?.id}
                    value={clinic}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none  pl-8 pr-4',
                      )
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <p
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate px-3 py-1 text-sm leading-6 ',
                          )}
                        >
                          {clinic?.name}
                        </p>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5',
                            )}
                          >
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  )
}
