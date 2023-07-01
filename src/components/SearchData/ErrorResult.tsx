'use client'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'

// interface ErrorMessageProps {
//   field: string
// }

interface Props {
  queryKey: string
}

export const ErrorResult = memo(function ErrorResult({ queryKey }: Props) {
  const { isError, error } = useQuery({
    queryKey: [queryKey],
    enabled: false,
  })

  // console.log('Error - isError', isError)
  // console.log('Error - error', error)

  // const {
  //   formState: { errors },
  // } = useFormContext()

  // const fieldError = errors[field]

  // if (!fieldError) {
  //   return null
  // }

  // return (
  //   <span className="text-xs text-red-500 mt-1">
  //     {fieldError.message?.toString()}
  //   </span>
  // )

  if (!isError) {
    return null
  }

  return <span className="text-xs text-red-500 mt-1">DEU ERRO!!</span>
})
