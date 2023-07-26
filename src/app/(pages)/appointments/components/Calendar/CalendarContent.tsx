'use client'

import { ReactElement, cloneElement, memo, useEffect, useRef } from 'react'
import { CalendarViews } from '../CalendarContainer'

interface CalendarContentProps {
  weekdayBar: ReactElement
  hourGrid: ReactElement
  currentView?: CalendarViews
  calendarData?: any
}

export const CalendarContent = memo(function CalendarContent({
  weekdayBar,
  hourGrid,
  currentView,
  calendarData,
}: CalendarContentProps) {
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60
    // container.current.scrollTop =
    //   ((container.current.scrollHeight -
    //     containerNav.current.offsetHeight -
    //     containerOffset.current.offsetHeight) *
    //     currentMinute) /
    //   1440
  }, [])

  return (
    <div
      ref={container}
      className="isolate flex flex-auto flex-col rounded-md overflow-auto bg-white max-h-full"
    >
      <div
        style={{ width: '165%' }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        {weekdayBar &&
          cloneElement(weekdayBar, {
            containerNav,
          })}

        {hourGrid &&
          cloneElement(hourGrid, {
            containerOffset,
          })}
      </div>
    </div>
  )
})
