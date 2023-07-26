'use client'

import { memo } from 'react'

interface WeekdayBarWeekdayBarProps {
  weekdayLabel: string
  weekday: number
  currentCalendarDate: any
  currentDate: any
}

export const WeekdayBarWeekday = memo(function WeekdayBarWeekday({
  weekdayLabel,
  weekday,
  currentCalendarDate,
  currentDate,
}: WeekdayBarWeekdayBarProps) {
  const currentCalendarMonth = currentCalendarDate.get('M')
  const currentCalendarYear = currentCalendarDate.get('y')

  const calendarDate = `${currentCalendarYear}-${currentCalendarMonth}-${weekday}`

  const currentDay = currentDate.get('D')
  const currentMonth = currentDate.get('M')
  const currentYear = currentDate.get('y')

  const date = `${currentYear}-${currentMonth}-${currentDay}`

  const isCurrentDate = date === calendarDate

  return (
    <>
      {isCurrentDate && (
        <button
          type="button"
          className="sm:hidden flex flex-col items-center pb-3 pt-2"
        >
          {weekdayLabel}{' '}
          <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {weekday}
          </span>
        </button>
      )}

      {!isCurrentDate && (
        <button
          type="button"
          className="sm:hidden flex flex-col items-center pb-3 pt-2"
        >
          {weekdayLabel}{' '}
          <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
            {weekday}
          </span>
        </button>
      )}

      {isCurrentDate && (
        <div className="flex items-center justify-center py-3">
          <span className="flex items-baseline">
            {weekdayLabel}{' '}
            <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white bg-indigo-600">
              {weekday}
            </span>
          </span>
        </div>
      )}

      {!isCurrentDate && (
        <div className="flex items-center justify-center py-3">
          <span className="flex items-baseline">
            {weekdayLabel}{' '}
            <span className=" h-8 w-8 flex items-center justify-center font-semibold text-gray-900">
              {weekday}
            </span>
          </span>
        </div>
      )}
    </>
  )
})
