'use client'
import { InputHTMLAttributes, memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

function getError(errors: any, name: string) {
  try {
    const currentError = errors[name]

    if (currentError?.message) {
      return true
    }
    return false
  } catch (errors) {
    return false
  }
}

export const Input = memo(function Input(props: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const currentError = getError(errors, props?.name)

  return (
    <input
      id={props.name}
      {...props}
      {...register(props.name)}
      className={twMerge(
        props?.className,
        `${currentError ? 'outline  outline-red-500 outline-1' : ''}`,
      )}
    />
  )
})

// rounded-lg
//   bg-white
//   px-3.5
//   py-3
//   text-sm text-gray-yellow-cc-750 font-medium
//   shadow-inputs-checkouts-cc
//   shadow-color-inputs-checkout-cc
//   focus:outline-none focus:ring-2 focus:ring-gray-yellow-cc-600
//   outline-none border-0
