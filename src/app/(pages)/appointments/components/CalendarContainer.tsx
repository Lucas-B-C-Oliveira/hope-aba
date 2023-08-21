'use client'
import { memo, useEffect, useState } from 'react'

import { AvailableTimeCard } from '../page'
import { AdapterCalendar } from './Calendar/AdapterCalendar'
import { BigCalendarHeader } from './Calendar/BigCalendarHeader'
import { dateAdapter } from '@/utils/dateAdapter'
import { OpenModalButton } from '@/components/OpenModalButton'
import { WeekdayBarWeekday } from './Calendar/WeekdayBarWeekday copy'
import { Appointment } from './Calendar/Appointment'
import {
  getAppointmentsByRangeDate,
  getProfessionalScheduleAvailability,
} from '@/utils/actions/action'
import { FilterView } from './Calendar/FilterView'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { useCalendarStore } from '@/store/calendarStore'

interface AppointmentCard {
  start: Date
  end: Date
  title?: string
  data: any
}

const eventsTest = [
  {
    start: dateAdapter('2023-07-30T10:00:00').toDate(),
    end: dateAdapter('2023-07-30T10:40:00').toDate(),
    title: 'MRI Registration',
    data: {
      patient: 'Marcos',
      therapy: 'Fono',
    },
  },
  {
    start: dateAdapter('2023-07-30T10:00:00').toDate(),
    end: dateAdapter('2023-07-30T10:40:00').toDate(),
    title: 'TESTE',
    data: {
      patient: 'José',
      therapy: 'Fisio',
    },
  },
]

const components = {
  event: (props: any) => {
    const { event } = props

    const type = event?.type

    switch (type) {
      case 'filter':
        return <FilterView />

      default:
        return <Appointment appointmentData={event?.data} />
    }
  },
  toolbar: (props: any) => {
    const { openAndCloseRightContentSidebar, rightContentSidebarIsOpen } =
      useMainLayoutStore()

    function handle() {
      openAndCloseRightContentSidebar(!rightContentSidebarIsOpen)
    }

    return (
      <>
        <BigCalendarHeader
          calendarDate={props.date}
          onNavigatePrev={() => props.onNavigate('PREV')}
          onNavigateNext={() => props.onNavigate('NEXT')}
          onNavigateToday={() => props.onNavigate('TODAY')}
          createAppointmentButton={
            <OpenModalButton onClick={handle}>Agendar</OpenModalButton>
          }
        />
      </>
    )
  },

  week: {
    header: (props: any) => {
      const currentDate = dateAdapter()
      return (
        <>
          <WeekdayBarWeekday dateProps={props} currentDate={currentDate} />
        </>
      )
    },
  },
}

interface Props { }

const API_FORMAT_DEFAULT = 'YYYY-MM-DD'

export const CalendarContainer = memo(function CalendarContainer() {
  const [appointments, setAppointments] = useState<
    AppointmentCard[] | undefined
  >(undefined)

  const { professionalId } = useCalendarStore()

  const [professionalScheduleAvailable, setProfessionalScheduleAvailable] =
    useState<any[] | undefined>(undefined)

  useEffect(() => {
    const startDayOfTheWeek = dateAdapter().day(0).format(API_FORMAT_DEFAULT)
    const endDayOfTheWeek = dateAdapter().day(6).format(API_FORMAT_DEFAULT)

    getAppointmentsByRangeDate(
      `appointments?from=${startDayOfTheWeek}&to=${endDayOfTheWeek}`,
    ).then(async (data) => {
      setAppointments(data)
    })
  }, [])

  useEffect(() => {
    if (typeof professionalId !== 'undefined') {
      getProfessionalScheduleAvailability(professionalId).then(async (data) => {
        setProfessionalScheduleAvailable(data)
      })
    }
  }, [professionalId])

  return (
    <div
      id="calendar"
      // className="flex flex-col h-full  border-gray-100 border-2 rounded-md shadow-md"
      className="flex flex-col h-full rounded-md shadow-md"
    >
      <AdapterCalendar
        defaultView="week"
        // views={['week', 'day']}

        view={'week'}
        events={appointments}
        components={components}
        style={{ height: '100%' }}
        // backgroundEvents={[
        //   {
        //     start: dateAdapter('2023-07-31T07:00:00'),
        //     end: dateAdapter('2023-07-31T18:00:00'),

        //     type: 'filter',
        //   },
        // ]}

        backgroundEvents={professionalScheduleAvailable}
        min={dateAdapter('2023-07-30T07:00:00')}
        max={dateAdapter('2023-07-30T18:00:00')}
        onRangeChange={(dates: any) => {
          const startDate = dates[0]
          const endDate = dates[dates.length - 1]

          const startDayOfTheWeek =
            dateAdapter(startDate).format(API_FORMAT_DEFAULT)
          const endDayOfTheWeek =
            dateAdapter(endDate).format(API_FORMAT_DEFAULT)

          getAppointmentsByRangeDate(
            `appointments?from=${startDayOfTheWeek}&to=${endDayOfTheWeek}`,
          ).then(async (data) => {
            // console.log('data', data) //! TODO: verify if data saved is the same of the new Data with useRef
            setAppointments(data)
          })

          if (typeof professionalId !== 'undefined') {
            getProfessionalScheduleAvailability(
              professionalId,
              dateAdapter(endDate),
            ).then(async (data) => {
              setProfessionalScheduleAvailable(data)
            })
          }
        }}
      />
    </div>
  )
})
