'use client'
import { InputHTMLAttributes, memo } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const Input = memo(function Input(props: InputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={props.name}
      className={`
        rounded-lg
        bg-white
        px-3.5
        py-3
        text-sm text-gray-yellow-cc-750 font-medium
        shadow-inputs-checkouts-cc
        shadow-color-inputs-checkout-cc
        focus:outline-none focus:ring-2 focus:ring-gray-yellow-cc-600
        outline-none border-0
      `}
      {...register(props.name)}
      {...props}
    />
  )
})
