import { memo } from 'react'

interface Props {
  filterData?: any
}

export const BigCalendarFilterView = memo(function BigCalendarFilterView({ filterData }: Props) {
  console.log('🚀 ~ file: Appointment.tsx:9 ~ filterData:', filterData)

  return (
    <div
      className=" sm:flex h-full w-full"
      style={{ paddingLeft: '1px', paddingRight: '1px' }}
    >
      <a
        href="#"
        // className="border-green-300  w-full h-full bg-opacity-30 overflow-y-auto flex flex-col  bg-emerald-400 px-2 py-1 text-xs leading-4 hover:bg-emerald-500 hover:bg-opacity-30"
        className="border-green-300  w-full h-full bg-opacity-30 overflow-y-auto flex flex-col  bg-emerald-400 px-2 py-1 text-xs leading-4 "
      >
        {/* <p className="font-semibold text-gray-700">
          {appointmentData?.patientNameLabel}
        </p>
        <p className="font-semibold text-gray-700">
          {appointmentData?.therapyNameLabel}
        </p> */}
      </a>
    </div>
  )
})
