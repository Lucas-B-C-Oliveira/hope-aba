'use client'
import { memo, useEffect, useRef, useState } from 'react'

import { dateAdapter } from '@/utils/dateAdapter'
import { Calendar } from '..'
import { getProfessionalScheduleAvailability } from '@/utils/actions/action'
import { useAppointmentFilterStore } from '@/store/appointmentFilterStore'
import { Filter, TokenData } from '@/types'
import { isEqual } from 'lodash'
import { Toolbar } from './Toolbar'
import { ACCESS_TOKEN } from '@/utils/functions/constants'
import { getCookie } from 'cookies-next'
import {
  makeQuery,
  removeFirstCharacter,
  removeSpacesOfString,
  tokenDecode,
} from '@/utils/functions/helpers'
import { CSFetch } from '@/utils/api/clientFetch'

interface AppointmentCard {
  start: Date
  end: Date
  title?: string
  data: any
}

interface Response {
  data?: any[]
}

export async function getAppointmentsByRangeDate<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined | any,
) {
  try {
    const response = (await CSFetch<T>(input, init)) as Response
    const cardsAppointment = response?.data
      ? response?.data.map((appointmentData: any) => {
          const { day, start, end } = appointmentData.schedule

          const { patient, therapy } = appointmentData

          const patientNameSplited = patient.name.split(' ')

          const patientNameLabel = `${patientNameSplited[0]} ${
            patientNameSplited[patientNameSplited.length - 1]
          }` //! TODO: Format this name to First upercase first lether

          //   const startDate = dateAdapter(`${day}T${start}:00`).local().toDate()
          //   const endDate = dateAdapter(`${day}T${end}:00`).local().toDate()

          //   const startDate = new Date(`${day}T${start}:00Z`)
          // const endDate = new Date(`${day}T${end}:00Z`)

          const startDate = `${day}T${start}:00`
          const endDate = `${day}T${end}:00`

          return {
            start: startDate,
            end: endDate,
            data: {
              ...appointmentData,
              patientNameLabel,
              therapyNameLabel: therapy?.name,
            },
          }
        })
      : []

    return cardsAppointment
  } catch (error: unknown | string | undefined) {
    throw new Error(`${error}`)
  }
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

  const filterQueryWithoutSpaces = removeSpacesOfString(filterQuery)
  const queryFilters = removeFirstCharacter(filterQueryWithoutSpaces)
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

  const [contentHeight, setContentHeight] = useState('0rem')
  const [startComponent, setStartComponent] = useState(false)

  const currentCalendarWeekday = useRef<string>(
    dateAdapter().format(API_FORMAT_DEFAULT),
  )

  const [appointments, setAppointments] = useState<
    AppointmentCard[] | undefined
  >(undefined)

  const [professionalScheduleAvailable, setProfessionalScheduleAvailable] =
    useState<any[] | undefined>(undefined)

  const token =
    typeof getCookie(ACCESS_TOKEN) === 'string' ? getCookie(ACCESS_TOKEN) : null
  const tokenData: TokenData | null = tokenDecode(
    token as string | undefined | null,
  )

  async function makeFeedbackOfProfessionalAvailableHour(
    currentWeekday: string,
    professionalId: string | undefined = undefined,
  ) {
    if (professionalId) {
      console.log('professionalId', professionalId)

      const data = await getProfessionalScheduleAvailability(
        professionalId,
        dateAdapter(currentWeekday),
      )
      if (!isEqual(data, professionalScheduleAvailable) && data) {
        console.log('data', data)

        setProfessionalScheduleAvailable(data)
      }
    } else {
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
  }

  async function makeAppointmentFeedback(currentWeekday: string) {
    try {
      const { firstWeekdayFormated, lastWeekdayFormated } =
        getFirstAndLastWeekdayByCurrentWeekday(currentWeekday)
      const queryRangeDate = getQueryRangeDate(
        firstWeekdayFormated,
        lastWeekdayFormated,
      )

      const professionalFilterByTokenData: Filter = {
        id: tokenData?.professionalId as string,
        name: tokenData?.name as string,
      }
      const isProfessionalRole = tokenData?.role === 'professional'

      const currentFilter =
        isProfessionalRole && !professionalsAppointment
          ? professionalFilterByTokenData
          : professionalsAppointment

      const filters = {
        patientsAppointment,
        professionalsAppointment: currentFilter,
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
      console.log('query', endpointWithQuery + '&page=1&pageSize=90')
      const data = await getAppointmentsByRangeDate(
        endpointWithQuery + '&page=1&pageSize=90',
        {
          cache: 'no-store',
        },
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
    if (tokenData?.role === 'professional' && tokenData?.professionalId) {
      makeFeedbackOfProfessionalAvailableHour(
        currentCalendarWeekday.current,
        tokenData?.professionalId,
      )
    }
  }, [])

  useEffect(() => {
    console.log(
      'useEffect que verifica o filterButtonStatusAppointment',
      filterButtonStatusAppointment,
    )
    if (filterButtonStatusAppointment !== 'idle') {
      console.log(
        'currentCalendarWeekday.current',
        currentCalendarWeekday.current,
      )
      makeAppointmentFeedback(currentCalendarWeekday.current)
    }

    if (filterButtonStatusAppointment === 'clicked') {
      setButtonStatusAppointment('idle')
    }
  }, [filterButtonStatusAppointment])

  useEffect(() => {
    makeFeedbackOfProfessionalAvailableHour(currentCalendarWeekday.current)
  }, [professionalAvailable?.id, filterButtonStatusAvailable])

  useEffect(() => {
    if (window && startComponent) {
      const main = document.getElementById('main')
      const mainRef = main?.getBoundingClientRect()

      if (mainRef?.height) {
        const newContentHeight = `${mainRef?.height - 25}px`
        setContentHeight(newContentHeight)
      }
    }
  }, [startComponent])

  useEffect(() => {
    setStartComponent(true)
  }, [])

  return (
    <div
      style={{
        maxHeight: contentHeight,
      }}
      id="calendar"
      className="flex flex-col h-full rounded-md shadow-md"
    >
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
