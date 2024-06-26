'use client'
import { HTMLAttributes, memo } from 'react'

interface FieldProps<T = HTMLDivElement | HTMLLabelElement>
  extends HTMLAttributes<T> {
  as?: string
}

interface FieldProps {
  as?: string
}

export const Field = memo(function Field(props: FieldProps) {
  if (props?.as === 'label') {
    return <label {...props} />
  } else {
    return <div className="flex flex-col w-full h-fit" {...props} />
  }
})
