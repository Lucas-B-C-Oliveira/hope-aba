'use client'
import { LabelHTMLAttributes, memo } from 'react'

export const Label = memo(function Label(
  props: LabelHTMLAttributes<HTMLLabelElement>,
) {
  return (
    <label
      className="text-base font-semibold text-black flex items-center justify-between"
      {...props}
    />
  )
})
