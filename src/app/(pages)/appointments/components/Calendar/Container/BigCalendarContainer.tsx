'use client'
import { memo, useEffect, useState } from 'react'

import { dateAdapter } from '@/utils/dateAdapter'
import { OpenModalButton } from '@/components/OpenModalButton'
import { Calendar } from '..'
import {
  getAppointmentsByRangeDate,
  getProfessionalScheduleAvailability,
} from '@/utils/actions/action'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { useCalendarStore } from '@/store/calendarStore'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { Filter, FilterKey } from '@/types'

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
        return <Calendar.FilterView />

      default:
        return <Calendar.AppointmentCard dataAppointment={event?.data} />
    }
  },
  toolbar: (props: any) => {
    const { openAndCloseRightContentSidebar, rightContentSidebarIsOpen, leftContentSidebarIsOpen, openAndCloseLeftContentSidebar } =
      useMainLayoutStore()

    function openAndCloseRightContentSidebarHandle() {
      openAndCloseRightContentSidebar(!rightContentSidebarIsOpen)
    }

    function openAndCloseLeftContentSidebarHandle() {
      openAndCloseLeftContentSidebar(!leftContentSidebarIsOpen)
    }

    return (
      <>
        <Calendar.Header
          openLeftContentSidebarButton={
            <OpenModalButton onClick={openAndCloseLeftContentSidebarHandle}>
              {!leftContentSidebarIsOpen && 'Filtros'}
              {leftContentSidebarIsOpen && 'Fechar'}
            </OpenModalButton>
          }
          calendarDate={props.date}
          onNavigatePrev={() => props.onNavigate('PREV')}
          onNavigateNext={() => props.onNavigate('NEXT')}
          onNavigateToday={() => props.onNavigate('TODAY')}
          openRightContentSidebarButton={
            <OpenModalButton onClick={openAndCloseRightContentSidebarHandle}>
              {!rightContentSidebarIsOpen && 'Agendar'}
              {rightContentSidebarIsOpen && 'Fechar'}
            </OpenModalButton>
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
          <Calendar.Weekday dateProps={props} currentDate={currentDate} />
        </>
      )
    },
  },
}

interface Props { }

const API_FORMAT_DEFAULT = 'YYYY-MM-DD'

function makeQuery(queryKey: string, value: Filter | Filter[] | undefined) {
  if (Array.isArray(value) && value.length > 0) {
    const ids = value.map((val: { id: string, name: string }) => val?.id)
    const values = ids.join(',')
    return `&${queryKey}=${values}`
  }
  else if (typeof value?.id === 'string') {
    return `&${queryKey}=${value?.id}`
  }
  return `__`
}

export const BigCalendarContainer = memo(function BigCalendarContainer() {
  const [appointments, setAppointments] = useState<
    AppointmentCard[] | undefined
  >(undefined)

  const { professionalId } = useCalendarStore()
  const { setButtonStatus, filters, filterButtonStatus } = useAppointmentFilterStore()

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
    if (filterButtonStatus !== 'idle') {
      const startDayOfTheWeek = dateAdapter().day(0).format(API_FORMAT_DEFAULT)
      const endDayOfTheWeek = dateAdapter().day(6).format(API_FORMAT_DEFAULT)

      const professionalId = makeQuery('professionalId', filters?.professionals)
      const patientId = makeQuery('patientId', filters?.patients)
      const roomId = makeQuery('roomId', filters?.rooms)
      const therapyId = makeQuery('therapyId', filters?.therapies)
      // console.log('filters?.therapies', filters?.therapies)

      // const filterQuery = `from=${startDayOfTheWeek}&to=${endDayOfTheWeek}${professionalId}${patientId}${roomId}${therapyId}`
      const filterQuery = `${professionalId}${patientId}${roomId}${therapyId}`
      const filterQueryWithoutSpaces = filterQuery.replace(/__/g, '')
      const query = filterQueryWithoutSpaces.substring(1)

      console.log('query', query)
      // console.log('filterQueryWithoutSpaces', filterQueryWithoutSpaces)
      // console.log('filterQuery', filterQuery)
      console.log('filters?.therapies', filters?.therapies)
      console.log('filters', filters)

      getAppointmentsByRangeDate(
        `appointments?${query}`,
      ).then(async (data) => {
        console.log('data', data)
        setAppointments(data)
        setButtonStatus('idle')
      })
    }
  }, [filterButtonStatus])

  useEffect(() => {
    console.log("Mudou o ID do profissional")
    const professionalId = filters?.professionals?.id
    if (typeof professionalId !== 'undefined') {
      // const startDayOfTheWeek = dateAdapter().day(0).format(API_FORMAT_DEFAULT)
      const endDayOfTheWeek = dateAdapter().day(6).format(API_FORMAT_DEFAULT)

      console.log('______ endDayOfTheWeek ', endDayOfTheWeek)
      getProfessionalScheduleAvailability(professionalId, endDayOfTheWeek).then(async (data) => {
        console.log('data do id', data)
        console.log('professionalId', professionalId)
        setProfessionalScheduleAvailable(data)
      })
    }
  }, [filters?.professionals?.id])

  return (
    <div
      id="calendar"
      className="flex flex-col h-full rounded-md shadow-md"
    >
      <Calendar.Content
        defaultView="week"
        view={'week'}
        events={appointments}
        components={components}
        style={{ height: '100%' }}

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
