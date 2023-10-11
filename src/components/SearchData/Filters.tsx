'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { FormProvider } from 'react-hook-form'
import { Form } from '../Form'
import { memo } from 'react'
import { ActionButton } from '../ActionButton'
import { useFilters } from './useFilters'
import { SpinnerLoading } from '../SpinnerLoading'


export const Filters = memo(function Filters() {
  const { createSearchForm, handleSearch, handleSearchAll, handleSubmit, isSubmitting, loading } = useFilters()

  return (
    <FormProvider {...createSearchForm}>
      <form onSubmit={handleSubmit(handleSearch)} className="flex gap-6">
        <div className="flex flex-row items-center gap-1">
          <Form.Input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Pesquisar..."
            type="search"
            name="search"
          />
          <Form.ErrorMessage field="search" />
        </div>

        <ActionButton type="submit" disabled={isSubmitting}>
          {loading && <SpinnerLoading />}
          {!loading && (
            <>
              <MagnifyingGlassIcon
                className="pointer-events-none h-full w-5 text-gray-400"
                aria-hidden="true"
              />
              Pesquisar
            </>
          )}
        </ActionButton>
      </form>
    </FormProvider>
  )
})
