'use client'

import { CSFetch } from '@/utils/api/clientFetch'
import { queryClient } from '@/utils/lib/react-query'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useMutation } from '@tanstack/react-query'
import { memo } from 'react'
import { Button } from '../Button'

interface Props {
  endPoint?: string
  mutationKey?: string
  setOpen?: (value: boolean) => void
  title?: string
  text?: string
  queryKeys?: string[]
}

export const ConfirmToRemoveDataModal = memo(function ConfirmToRemoveDataModal({
  endPoint,
  mutationKey,
  setOpen,
  title,
  text,
  queryKeys,
}: Props) {
  const { mutateAsync, status } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async () => {
      try {
        const response = await CSFetch(endPoint, {
          method: 'DELETE',
        })

        if (response?.error) {
          throw new Error(response?.error)
        }

        return { ...response }
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
  })

  async function deleteHandle() {
    try {
      await mutateAsync()
      queryClient.resetQueries({
        queryKey: [queryKeys],
        exact: true,
        stale: true,
      })
    } catch (error) {
      console.log('error dentro do catch do deleteHandle')
      console.error(error)
    }
  }

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
        <Button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={deleteHandle}
          mutationStatus={status}
          isMutationAction={true}
        >
          Deletar
        </Button>

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
