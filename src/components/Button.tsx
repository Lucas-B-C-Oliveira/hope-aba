'use client'
import { useQueries } from '@tanstack/react-query'
import {
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
  cloneElement,
  memo,
} from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ReactElement
  queryKeys?: string[]
  isMutationAction?: boolean
  isItToRefetchQuery?: boolean
  mutationStatus?: 'error' | 'loading' | 'success' | 'idle'
}

export const Button = memo(function Button({
  children,
  icon,
  queryKeys = [],
  isItToRefetchQuery = false,
  isMutationAction = false,
  mutationStatus,
  ...rest
}: Props) {
  const queryResults = useQueries({
    queries: queryKeys?.map((key: string) => ({
      queryKey: [key],
      enabled: false,
    })),
  })

  const isFetching = queryResults.some((query) => query.isFetching)

  function handleButton() {
    if (queryKeys.length > 0 && isItToRefetchQuery) {
      queryResults[0].refetch()
    }
  }

  return (
    <button
      onClick={handleButton}
      className="flex h-fit w-fit gap-2 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      {...rest}
    >
      {!isFetching && children}
      {isFetching && <span>Loading...</span>}
      {isMutationAction && mutationStatus === 'loading' && (
        <span>Loading...</span>
      )}
      {icon &&
        cloneElement(icon, {
          className: '',
        })}
    </button>
  )
})
