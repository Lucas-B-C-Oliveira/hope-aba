'use client'

import { memo } from 'react'
import { Calendar } from '.'

interface CalendarWeekdayBarBarProps {
  containerNav?: any
  calendarData?: any
}

export const CalendarWeekdayBar = memo(function CalendarWeekdayBar({
  containerNav,
  calendarData,
}: CalendarWeekdayBarBarProps) {
  return (
    <div
      ref={containerNav}
      className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
    >
      <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.monday.dayNumber}
          weekdayLabel="S"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.tuesday.dayNumber}
          weekdayLabel="T"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.wednesday.dayNumber}
          weekdayLabel="Q"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.thursday.dayNumber}
          weekdayLabel="Q"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.friday.dayNumber}
          weekdayLabel="S"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.saturday.dayNumber}
          weekdayLabel="S"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.sunday.dayNumber}
          weekdayLabel="D"
        />
      </div>

      <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
        <div className="col-end-1 w-14" />
        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.monday.dayNumber}
          weekdayLabel="Seg"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.tuesday.dayNumber}
          weekdayLabel="Ter"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.wednesday.dayNumber}
          weekdayLabel="Qua"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.thursday.dayNumber}
          weekdayLabel="Qui"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.friday.dayNumber}
          weekdayLabel="Sex"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.saturday.dayNumber}
          weekdayLabel="Sab"
        />

        <Calendar.Weekday
          currentCalendarDate={calendarData.currentCalendarDate}
          currentDate={calendarData.currentDate}
          weekday={calendarData.sunday.dayNumber}
          weekdayLabel="Dom"
        />
      </div>
    </div>
  )
})
