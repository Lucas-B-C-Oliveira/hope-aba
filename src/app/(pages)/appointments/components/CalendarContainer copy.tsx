'use client'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { Calendar } from './Calendar'
import dayjs from 'dayjs'

import dayOfYear from 'dayjs/plugin/dayOfYear'

import { OpenModalButton } from '@/components/OpenModalButton'
import { useRouter } from 'next/navigation'
import { AvailableTimeCard } from '../page'
import { isEqual } from 'lodash'
import { getAppointmentsByRangeDate } from '@/utils/actions/action'
import { AdapterCalendar } from './Calendar/AdapterCalendar'
dayjs.extend(dayOfYear)

export type CalendarViews = 'week' | 'day' | 'month'
const DEFAULT_CALENDAR_VIEW: CalendarViews = 'week'

function createCalendarData(
  currentView: CalendarViews,
  currentCalendarDate: any,
  currentDate: any,
  setCurrentDate: (newValue: any) => void,
) {
  function handlePreviousMonth() {
    const previousMonthDate = currentCalendarDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const previousMonthDate = currentCalendarDate.add(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handlePreviousWeek() {
    const previousWeekDate = currentCalendarDate.subtract(1, 'week')
    setCurrentDate(previousWeekDate)
  }

  function handleNextWeek() {
    const previousWeekDate = currentCalendarDate.add(1, 'week')
    setCurrentDate(previousWeekDate)
  }

  if (currentView === 'week') {
    // console.log('currentCalendarDate', currentCalendarDate)
    // console.log('currentCalendarDate.day(1)', currentCalendarDate.day(1).get())

    const startDate = `${currentCalendarDate.day(1).get('y')}-${currentCalendarDate.day(1).get('M') + 1
      }-${currentCalendarDate.day(1).get('D')}`

    const endDate = `${currentCalendarDate.day(7).get('y')}-${currentCalendarDate.day(7).get('M') + 1
      }-${currentCalendarDate.day(7).get('D')}`

    return {
      monday: {
        dayNumber: currentCalendarDate.day(1).get('D'),
        dayDate: `${currentCalendarDate.day(1).get('y')}-${currentCalendarDate.day(1).get('M') + 1
          }-${currentCalendarDate.day(1).get('D')}`,
      },
      tuesday: {
        dayNumber: currentCalendarDate.day(2).get('D'),
        dayDate: `${currentCalendarDate.day(2).get('y')}-${currentCalendarDate.day(2).get('M') + 1
          }-${currentCalendarDate.day(2).get('D')}`,
      },
      wednesday: {
        dayNumber: currentCalendarDate.day(3).get('D'),
        dayDate: `${currentCalendarDate.day(3).get('y')}-${currentCalendarDate.day(3).get('M') + 1
          }-${currentCalendarDate.day(3).get('D')}`,
      },
      thursday: {
        dayNumber: currentCalendarDate.day(4).get('D'),
        dayDate: `${currentCalendarDate.day(4).get('y')}-${currentCalendarDate.day(4).get('M') + 1
          }-${currentCalendarDate.day(4).get('D')}`,
      },
      friday: {
        dayNumber: currentCalendarDate.day(5).get('D'),
        dayDate: `${currentCalendarDate.day(5).get('y')}-${currentCalendarDate.day(5).get('M') + 1
          }-${currentCalendarDate.day(5).get('D')}`,
      },
      saturday: {
        dayNumber: currentCalendarDate.day(6).get('D'),
        dayDate: `${currentCalendarDate.day(6).get('y')}-${currentCalendarDate.day(6).get('M') + 1
          }-${currentCalendarDate.day(6).get('D')}`,
      },
      sunday: {
        dayNumber: currentCalendarDate.day(7).get('D'),
        dayDate: `${currentCalendarDate.day(7).get('y')}-${currentCalendarDate.day(7).get('M') + 1
          }-${currentCalendarDate.day(7).get('D')}`,
      },
      currentMonth: currentCalendarDate.format('MMMM'),
      currentYear: currentCalendarDate.format('YYYY'),
      currentCalendarDate,
      currentDate,
      previousAction: handlePreviousWeek,
      currentView,
      dayOfStartWeek: '',
      dayOfEndWeek: '',
      nextAction: handleNextWeek,
      from: startDate,
      to: endDate,
    }
  }

  if (currentView === 'month') {
    return {
      currentMonth: currentCalendarDate.format('MMMM'),
      currentYear: currentCalendarDate.format('YYYY'),
      previousAction: handlePreviousMonth,
      nextAction: handleNextMonth,
    }
  }
}

function generateURLParams(currentCalendarDate: any) {
  const { currentView, startDate, endDate } = currentCalendarDate

  if (currentView === 'week') {
    return `/appointments?startDate=${startDate}&endDate=${endDate}`
  }

  if (currentView === 'month') {
    return ``
  }
}

interface Props {
  availableTimeCards?: AvailableTimeCard[]
}

export const CalendarContainer = memo(function CalendarContainer({
  availableTimeCards,
}: Props) {
  const [currentCalendarView, setCurrentCalendarView] = useState<CalendarViews>(
    DEFAULT_CALENDAR_VIEW,
  )

  const [currentAppointmentsByDate, setCurrentAppointmentsByDate] =
    useState(undefined)

  const currentAppointmentSaved = useRef<any>(null)

  const currentDate = useRef(dayjs())

  const memoizedSetCalendarView = useCallback((newView: CalendarViews) => {
    setCurrentCalendarView(newView)
  }, [])

  const [currentCalendarDate, setCurrentCalendarDate] = useState(() => {
    return dayjs()
  })

  // if (
  //   typeof appointments !== 'undefined' &&
  //   !isEqual(appointments, currentAppointments)
  // ) {
  //   setCurrentAppointments(appointments)
  // }

  const calendarData = createCalendarData(
    currentCalendarView,
    currentCalendarDate,
    currentDate.current,
    setCurrentCalendarDate,
  )

  const router = useRouter()

  function handleOpenModal() {
    router.push(`/appointments/appointmentmodal`)
  }

  // const { startDate, endDate } = calendarData

  // const responseAppointmentData = getAppointmentsByRangeDate(
  //   `/appointments?startDate=${startDate}&endDate=${endDate}`,
  // ).then((data) => data)

  // console.log('responseAppointmentData', responseAppointmentData)

  if (!isEqual(currentAppointmentSaved.current, currentAppointmentsByDate)) {
    const { from, to } = calendarData
    getAppointmentsByRangeDate(`appointments?from=${from}&to=${to}`).then(
      async (data) => {
        console.log('data', data)
        currentAppointmentSaved.current = data
        setCurrentAppointmentsByDate(data)
      },
    )
  }

  return (
    <div
      id="calendar"
      className="flex flex-col h-full max-h-[907px] rounded-md shadow-md"
    >
      <AdapterCalendar />

      {/* <Calendar.Header
        changeView={memoizedSetCalendarView}
        calendarData={calendarData}
        createAppointmentButton={
          <OpenModalButton onClick={handleOpenModal}>
            Adicionar Agendamento
          </OpenModalButton>
        }
      />
      <Calendar.Content
        currentView={currentCalendarView}
        calendarData={calendarData}
        weekdayBar={<Calendar.WeekdayBar calendarData={calendarData} />}
        hourGrid={
          <Calendar.HourGrid
            availableTimeCards={availableTimeCards}
            currentAppointmentsByDate={currentAppointmentsByDate}
          />
        }
      /> */}
    </div>
  )
})
