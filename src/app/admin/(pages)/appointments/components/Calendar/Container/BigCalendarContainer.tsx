'use client'
import { memo, useEffect, useRef, useState } from 'react'

import { dateAdapter } from '@/utils/dateAdapter'
import { Calendar } from '..'
import {
  getAppointmentsByRangeDate,
  getProfessionalScheduleAvailability,
} from '@/utils/actions/action'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { Filter } from '@/types'
import { isEqual } from 'lodash'
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

    // console.log('props', props)
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

function getFirstAndLastWeekdayByCurrentWeekday(currentWeekDay: string) {
  const currentWeekdayMoment = dateAdapter(currentWeekDay)

  const firstDayOfWeek = currentWeekdayMoment.clone().isoWeekday(0)
  const firstWeekdayFormated = firstDayOfWeek.format(API_FORMAT_DEFAULT)

  const lastDayOfWeek = currentWeekdayMoment.clone().isoWeekday(6)
  const lastWeekdayFormated = lastDayOfWeek.format(API_FORMAT_DEFAULT)

  return {
    firstWeekdayFormated,
    lastWeekdayFormated,
  }
}

function getFiltersQuery(filters: any) {
  const professionalId = makeQuery(
    'professionalId',
    filters?.professionalsAppointment,
  )
  const patientId = makeQuery('patientId', filters?.patientsAppointment)
  const roomId = makeQuery('roomId', filters?.roomsAppointment)
  const therapyId = makeQuery('therapyId', filters?.therapiesAppointment)
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
  const {
    setButtonStatusAppointment,
    patientsAppointment,
    professionalsAppointment,
    therapiesAppointment,
    roomsAppointment,
    filterButtonStatusAppointment,
    professionalAvailable,
    filterButtonStatusAvailable,
    setButtonStatusAvailable,
  } = useAppointmentFilterStore()

  const currentCalendarWeekday = useRef<string>(
    dateAdapter().format(API_FORMAT_DEFAULT),
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

    const newData = data.map((data) => {
      return {
        ...data,
        start: new Date(data?.start),
        end: new Date(data?.end),
      }
    })

    if (!isEqual(newData, appointments) && newData) {
      // console.log('getAppointmentsByRangeDate newData', newData)
      setAppointments(newData)
    }
  }

  async function makeFeedbackOfProfessionalAvailableHour(
    currentWeekday: string,
  ) {
    if (typeof professionalAvailable?.id !== 'undefined') {
      const data = await getProfessionalScheduleAvailability(
        professionalAvailable?.id,
        dateAdapter(currentWeekday),
      )
      if (!isEqual(data, professionalScheduleAvailable) && data) {
        setProfessionalScheduleAvailable(data)
      }
    } else {
      setProfessionalScheduleAvailable(undefined)
    }

    if (filterButtonStatusAvailable === 'clicked') {
      setButtonStatusAvailable('idle')
    }
  }

  async function makeAppointmentFeedback(currentWeekday: string) {
    try {
      const { firstWeekdayFormated, lastWeekdayFormated } =
        getFirstAndLastWeekdayByCurrentWeekday(currentWeekday)
      const queryRangeDate = getQueryRangeDate(
        firstWeekdayFormated,
        lastWeekdayFormated,
      )
      const filters = {
        patientsAppointment,
        professionalsAppointment,
        therapiesAppointment,
        roomsAppointment,
      }
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
      // console.log(
      //   '______ endpointWithQuery',
      //   endpointWithQuery + '&page=1&pageSize=90',
      // )
      const data = await getAppointmentsByRangeDate(
        endpointWithQuery + '&page=1&pageSize=90',
      )

      const newData = data.map((data) => {
        return {
          ...data,
          start: new Date(data?.start),
          end: new Date(data?.end),
        }
      })

      // console.log('getAppointmentsByRangeDate newData', newData)
      // console.log('getAppointmentsByRangeDate newData', newData)

      if (!isEqual(newData, appointments) && newData) {
        setAppointments(newData)
        if (filterButtonStatusAppointment === 'clicked') {
          setButtonStatusAppointment('idle')
        }
      }
    } catch (error) {
      console.log('error => makeAppointmentFeedbackByFilters 169', error)
    }
  }

  useEffect(() => {
    makeAppointmentFeedback(currentCalendarWeekday.current)
  }, [])

  useEffect(() => {
    if (filterButtonStatusAppointment !== 'idle') {
      makeAppointmentFeedback(currentCalendarWeekday.current)
    }
  }, [filterButtonStatusAppointment])

  useEffect(() => {
    makeFeedbackOfProfessionalAvailableHour(currentCalendarWeekday.current)
  }, [professionalAvailable?.id, filterButtonStatusAvailable])

  // console.log('appointments', appointments)

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
          // console.log('onViewData', onViewData)
        }}
        onNavigate={(currentWeekDate) => {
          const currentDayOfTheWeek =
            dateAdapter(currentWeekDate).format(API_FORMAT_DEFAULT)
          currentCalendarWeekday.current = currentDayOfTheWeek

          makeAppointmentFeedback(currentDayOfTheWeek)
          makeFeedbackOfProfessionalAvailableHour(currentDayOfTheWeek)
        }}
      />
    </div>
  )
})
