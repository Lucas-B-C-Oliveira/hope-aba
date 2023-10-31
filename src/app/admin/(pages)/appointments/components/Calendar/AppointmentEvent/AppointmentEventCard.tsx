import { HTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends HTMLProps<HTMLDivElement> {
  patientNameLabel: string
  therapyNameLabel: string
  status: 'canceled' | 'confirmed' | 'done' | 'pending'
  statusLabel?: string
  classNameToMerge?: string
}

export function AppointmentEventCard({
  patientNameLabel,
  therapyNameLabel,
  status,
  statusLabel,
  classNameToMerge,
  ...rest
}: Props) {
  console.log('patientNameLabel', patientNameLabel)
  return (
    <div
      {...rest}
      className=" sm:flex h-full w-full"
      style={{ paddingLeft: '4px', paddingRight: '4px' }}
    >
      <a
        className={twMerge(
          'border-gray-100 border-2 w-full h-full  flex flex-col rounded-lg bg-yellow-500 px-2 py-1 text-xs leading-4 hover:bg-yellow-400 overflow-hidden',
          classNameToMerge,
        )}
      >
        <p className="text-xs font-bold text-white">{patientNameLabel}</p>
        <p className="text-xs font-bold text-white">{therapyNameLabel}</p>
      </a>
    </div>
  )
}
