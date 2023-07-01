'use client'

import { CSFetch } from '@/utils/api/clientFetch'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useMutation } from '@tanstack/react-query'
import { memo } from 'react'

interface Props {
  endPoint: string
  mutationKey: string
  setOpen?: (value: boolean) => void
  dataIdsToDelete: string[]
  title: string
  text: string
}

export const ConfirmToRemoveDataModal = memo(function ConfirmToRemoveDataModal({
  endPoint,
  mutationKey,
  setOpen,
  dataIdsToDelete,
  title,
  text,
}: Props) {
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const promises = dataIdsToDelete.map((id: string) => {
          return CSFetch(`${endPoint}/${id}`, {
            method: 'DELETE',
          })
        })
        return await Promise.all(promises)
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
    mutationKey: [mutationKey],
  })

  return (
    <div className="flex flex-col gap-2 w-96">
      <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block"></div>
      <div className="flex flex-row gap-3">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col gap-2 w-fit">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h3>

          <p className="text-sm text-gray-500 ">{text}</p>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => mutate()}
        >
          Deletar
        </button>
        <button
          type="button"
          className=" inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  sm:w-auto"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
})
