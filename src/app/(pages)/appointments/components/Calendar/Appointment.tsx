import { memo } from 'react'

interface Props {
  appointmentData: any
}

export const Appointment = memo(function Appointment({
  appointmentData,
}: Props) {
  console.log(
    '🚀 ~ file: Appointment.tsx:9 ~ appointmentData:',
    appointmentData,
  )

  return (
    <div
      className=" sm:flex h-full w-full"
      style={{ paddingLeft: '4px', paddingRight: '4px' }}
    >
      <a
        href="#"
        className="border-gray-100 border-2 w-full h-full  overflow-y-auto flex flex-col rounded-lg bg-yellow-300 px-2 py-1 text-xs leading-4 hover:bg-yellow-400"
      >
        <p className="font-semibold text-gray-700">
          {appointmentData?.patientNameLabel}
        </p>
        <p className="font-semibold text-gray-700">
          {appointmentData?.therapyNameLabel}
        </p>
      </a>
    </div>
  )
})
