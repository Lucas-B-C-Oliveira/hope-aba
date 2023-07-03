'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '../Form'
import { memo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CSFetch } from '@/utils/api/clientFetch'

const searchSchema = z.object({
  search: z
    .string()
    .nonempty({ message: 'Digite alguma coisa no campo de busca' }),
})

export type SearchData = z.infer<typeof searchSchema>

interface Props {
  queryKey: string
  endPoint: string
}

export const Filters = memo(function Filters({ endPoint, queryKey }: Props) {
  const inputSearchData = useRef<SearchData | undefined>(undefined)
  const {
    refetch,
    status,
    // data: queryData,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        if (typeof inputSearchData?.current === 'undefined')
          throw new Error('searchData is undefined')

        const response = await CSFetch<any>(
          `${endPoint}?search=${inputSearchData?.current?.search}`,
        )

        if (response?.error) {
          throw new Error(response?.error)
        }

        return { ...response }
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },
    // enabled: typeof inputSearchData?.current?.search !== 'undefined',
    enabled: false,
  })

  if (status === 'success') {
    // console.log('queryData onSucess', queryData)
  }

  const createSearchForm = useForm<SearchData>({
    resolver: zodResolver(searchSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createSearchForm

  function search(data: SearchData) {
    inputSearchData.current = data
    refetch()
  }

  return (
    <FormProvider {...createSearchForm}>
      <form onSubmit={handleSubmit(search)} className="flex gap-6">
        <div className="flex flex-row items-center gap-1">
          <Form.Input
            className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Pesquisar..."
            type="search"
            name="search"
          />
          <Form.ErrorMessage field="search" />
        </div>

        <Button type="submit" disabled={isSubmitting} queryKeys={[queryKey]}>
          <MagnifyingGlassIcon
            className="pointer-events-none h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          Pesquisar
        </Button>
      </form>
    </FormProvider>
  )
})
