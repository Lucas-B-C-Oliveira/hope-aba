import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {
  patientNameLabel: string
  therapyNameLabel: string
}

export function AppointmentEventCard({
  patientNameLabel,
  therapyNameLabel,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className=" sm:flex h-full w-full"
      style={{ paddingLeft: '4px', paddingRight: '4px' }}
    >
      <a className="border-gray-100 border-2 w-full h-full  overflow-y-auto flex flex-col rounded-lg bg-yellow-300 px-2 py-1 text-xs leading-4 hover:bg-yellow-400">
        <p className="font-semibold text-gray-700">{patientNameLabel}</p>
        <p className="font-semibold text-gray-700">{therapyNameLabel}</p>
      </a>
    </div>
  )
}
