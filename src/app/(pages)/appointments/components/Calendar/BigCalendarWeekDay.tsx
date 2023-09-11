'use client'

import { capitalizedText } from '@/utils/functions'
import { memo } from 'react'

interface BigCalendarWeekDayProps {
  weekdayLabel?: string
  weekday?: number
  currentCalendarDate?: any
  currentDate?: any
  dateProps: any
}

export const BigCalendarWeekDay = memo(function BigCalendarWeekDay({
  currentDate,
  dateProps,
}: BigCalendarWeekDayProps) {
  const { label, localizer, date } = dateProps
  const [weekdayNumber, weekdayLabel] = label.split(' ')
  const capitalizedWeekdayLabel = capitalizedText(weekdayLabel)
  const isCurrentDate = localizer.isSameDate(date, currentDate)

  return (
    <>
      {isCurrentDate && (
        <div className="flex items-center justify-center py-3 font-medium text-gray-500">
          <span className="flex items-baseline ">
            {capitalizedWeekdayLabel}{' '}
            <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white bg-indigo-600">
              {weekdayNumber}
            </span>
          </span>
        </div>
      )}

      {!isCurrentDate && (
        <div className="flex items-center justify-center py-3 font-medium text-gray-500">
          <span className="flex items-baseline">
            {capitalizedWeekdayLabel}{' '}
            <span className=" h-8 w-8 flex items-center justify-center font-semibold text-gray-900">
              {weekdayNumber}
            </span>
          </span>
        </div>
      )}
    </>
  )
})
