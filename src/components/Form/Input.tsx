'use client'
import { InputHTMLAttributes, memo } from 'react'
import { useFormContext } from 'react-hook-form'
import TimePicker from 'react-time-picker'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

function getError(errors: any, name: string) {
  try {
    let currentError: any | undefined

    if (name.length > 26) {
      const parts = name.split('.')
      const availabilityFieldIndex = parseInt(parts[1])
      const hourRangesIndex = parseInt(parts[3])
      const endOrStartStr = parts[4]
      currentError =
        errors?.scheduleAvailability[availabilityFieldIndex]?.day[
        hourRangesIndex
        ][endOrStartStr]
    } else {
      currentError = errors[name]
    }

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

  // if (props.type === 'time') {
  //   return (
  //     <TimePicker
  //     // className={twMerge(
  //     //   props?.className,
  //     //   `${currentError ? 'outline  outline-red-500 outline-1' : ''}`,
  //     // )}
  //     />
  //   )
  // }

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
