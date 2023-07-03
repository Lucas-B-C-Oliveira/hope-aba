'use client'
import { InputHTMLAttributes, memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string
  placeholder: string
  options: any[]
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

export const Select = memo(function Select(props: SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const currentError = getError(errors, props?.name)

  return (
    <select
      id={props.name}
      {...props}
      {...register(props.name)}
      className={twMerge(
        props?.className,
        `${currentError ? 'outline  outline-red-500 outline-1' : ''}`,
      )}
    >
      <option value="">{props.placeholder}</option>
      {props?.options?.length > 0 &&
        props.options.map((data: any) => (
          <option key={data.key} value={data.key}>
            {data.value}
          </option>
        ))}
    </select>
  )
})
