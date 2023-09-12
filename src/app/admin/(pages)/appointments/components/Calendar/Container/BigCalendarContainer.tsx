'use client'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { dateAdapter } from '@/utils/dateAdapter'
import { OpenModalButton } from '@/components/OpenModalButton'
import { Calendar } from '..'
import {
  getAppointmentsByRangeDate,
  getProfessionalScheduleAvailability,
} from '@/utils/actions/action'
import { useMainLayoutStore } from '@/store/mainLayoutStore'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { Filter, FilterKey } from '@/types'
import { isEqual } from 'lodash'
import { useToolbar } from './useToolbar'
import { Toolbar } from './Toolbar'

interface AppointmentCard {
  start: Date
  end: Date
  title?: string
  data: any
}

const components = {
  event: (props: any) => {
    const { event } = props
    const type = event?.type

    console.log('props', props)
    switch (type) {
      case 'filter':
        return <Calendar.FilterView />

      default:
        return <Calendar.AppointmentCard dataAppointment={event?.data} />
    }
  },
  toolbar: (props: any) => {
    return <Toolbar {...props} />
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

const API_FORMAT_DEFAULT = 'YYYY-MM-DD'

function makeQuery(queryKey: string, value: Filter | Filter[] | undefined) {
  if (Array.isArray(value) && value.length > 0) {
    const ids = value.map((val: { id: string; name: string }) => val?.id)
    const values = ids.join(',')
    return `&${queryKey}=${values}`
  } else if (!Array.isArray(value) && typeof value?.id === 'string') {
    return `&${queryKey}=${value?.id}`
  }
  return `__`
}

function getFirstWeekdayByLastWeekday(lastWeekday: string) {
  const lastWeekdayMoment = dateAdapter(lastWeekday)
  const firstDayOfWeek = lastWeekdayMoment.clone().isoWeekday(1)
  const firstWeekdayFormated = firstDayOfWeek.format(API_FORMAT_DEFAULT)
  return firstWeekdayFormated
}

function getFiltersQuery(filters: any) {
  const professionalId = makeQuery('professionalId', filters?.professionals)
  const patientId = makeQuery('patientId', filters?.patients)
  const roomId = makeQuery('roomId', filters?.rooms)
  const therapyId = makeQuery('therapyId', filters?.therapies)
  const filterQuery = `${professionalId}${patientId}${roomId}${therapyId}`

  const filterQueryWithoutSpaces = filterQuery.replace(/__/g, '')
  const queryFilters = filterQueryWithoutSpaces.substring(1)
  return queryFilters
}

function getQueryRangeDate(firstWeekday: string, lastWeekday: string) {
  if (typeof firstWeekday === 'string' && typeof lastWeekday === 'string') {
    return `to-scheduleDate=${lastWeekday}&from-scheduleDate=${firstWeekday}`
  }
  return undefined
}

export const BigCalendarContainer = memo(function BigCalendarContainer() {
  const { setButtonStatus, filters, filterButtonStatus } =
    useAppointmentFilterStore()

  const lastCalendarWeekday = useRef<string>(
    dateAdapter().day(6).format(API_FORMAT_DEFAULT),
  )

  const [appointments, setAppointments] = useState<
    AppointmentCard[] | undefined
  >(undefined)

  const [professionalScheduleAvailable, setProfessionalScheduleAvailable] =
    useState<any[] | undefined>(undefined)

  async function makeAppointmentFeedbacka(
    toScheduleDate: string,
    fromScheduleDate: string,
  ) {
    const query = `appointments?to-scheduleDate=${toScheduleDate}&from-scheduleDate=${fromScheduleDate}`
    const data = await getAppointmentsByRangeDate(query)
    if (!isEqual(data, appointments) && data) {
      setAppointments(data)
    }
  }

  async function makeFeedbackOfProfessionalAvailableHour(lastWeekday: string) {
    if (typeof filters?.professionals?.id !== 'undefined') {
      const data = await getProfessionalScheduleAvailability(
        filters?.professionals?.id,
        dateAdapter(lastWeekday),
      )
      if (!isEqual(data, professionalScheduleAvailable) && data) {
        setProfessionalScheduleAvailable(data)
      }
    }
  }

  async function makeAppointmentFeedback(lastWeekday: string) {
    try {
      const firstWeekday = getFirstWeekdayByLastWeekday(lastWeekday)
      const queryRangeDate = getQueryRangeDate(firstWeekday, lastWeekday)
      const queryFilters = getFiltersQuery(filters)
      const endpoint = `appointments?`
      let endpointWithQuery = endpoint

      if (queryRangeDate) {
        endpointWithQuery = endpointWithQuery + queryRangeDate
      }

      if (queryFilters) {
        if (endpointWithQuery.endsWith('?')) {
          endpointWithQuery = endpointWithQuery + queryFilters
        } else {
          endpointWithQuery = endpointWithQuery + '&' + queryFilters
        }
      }
      console.log('_________________ endpointWithQuery', endpointWithQuery)
      const data = await getAppointmentsByRangeDate(endpointWithQuery)
      console.log('data', data)
      if (!isEqual(data, appointments) && data) {
        setAppointments(data)
        if (filterButtonStatus === 'clicked') {
          setButtonStatus('idle')
        }
      }
    } catch (error) {
      console.log('error => makeAppointmentFeedbackByFilters 169', error)
    }
  }

  useEffect(() => {
    makeAppointmentFeedback(lastCalendarWeekday.current)
  }, [])

  useEffect(() => {
    if (filterButtonStatus !== 'idle') {
      makeAppointmentFeedback(lastCalendarWeekday.current)
    }
  }, [filterButtonStatus])

  // useEffect(() => {
  //   if (filterButtonStatus !== 'idle') {
  //     const startDayOfTheWeek = dateAdapter().day(0).format(API_FORMAT_DEFAULT)
  //     const endDayOfTheWeek = dateAdapter().day(6).format(API_FORMAT_DEFAULT)

  //     const professionalId = makeQuery('professionalId', filters?.professionals)
  //     const patientId = makeQuery('patientId', filters?.patients)
  //     const roomId = makeQuery('roomId', filters?.rooms)
  //     const therapyId = makeQuery('therapyId', filters?.therapies)
  //     // console.log('filters?.therapies', filters?.therapies)

  //     // const filterQuery = `from=${startDayOfTheWeek}&to=${endDayOfTheWeek}${professionalId}${patientId}${roomId}${therapyId}`
  //     const filterQuery = `${professionalId}${patientId}${roomId}${therapyId}`
  //     const filterQueryWithoutSpaces = filterQuery.replace(/__/g, '')
  //     const query = filterQueryWithoutSpaces.substring(1)

  //     // console.log('query', query)
  //     // console.log('filterQueryWithoutSpaces', filterQueryWithoutSpaces)
  //     // console.log('filterQuery', filterQuery)
  //     // console.log('filters?.therapies', filters?.therapies)
  //     // console.log('filters', filters)

  //     console.log('_______________________________________ query', query)

  //     getAppointmentsByRangeDate(
  //       `appointments?${query}`,
  //     ).then(async (data) => {
  //       console.log('data', data)
  //       setAppointments(data)
  //       setButtonStatus('idle')
  //     })
  //   }
  // }, [filterButtonStatus])

  useEffect(() => {
    makeFeedbackOfProfessionalAvailableHour(lastCalendarWeekday.current)
  }, [filters?.professionals?.id])

  return (
    <div id="calendar" className="flex flex-col h-full rounded-md shadow-md">
      <Calendar.Content
        view={'week'}
        events={appointments}
        components={components}
        style={{ height: '100%' }}
        backgroundEvents={professionalScheduleAvailable}
        min={new Date('2023-07-30T07:00:00')}
        max={new Date('2023-07-30T18:00:00')}
        onView={(onViewData) => {
          console.log('onViewData', onViewData)
        }}
        onNavigate={(endWeekDate) => {
          const endDayOfTheWeek =
            dateAdapter(endWeekDate).format(API_FORMAT_DEFAULT)
          lastCalendarWeekday.current = endDayOfTheWeek
          // makeAppointmentFeedback(endDayOfTheWeek)
          makeAppointmentFeedbacka(endDayOfTheWeek, "a")
          makeFeedbackOfProfessionalAvailableHour(endDayOfTheWeek)
        }}
      />
    </div>
  )
})
